import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
import pickle

# --- 1. Configuration ---
DATA_FILE = 'multi_user_banking_data.csv'
SEQ_LENGTH = 14  # Look at the last 14 transactions to predict the next one
EPOCHS = 50      # Perfect balance of speed and accuracy for a hackathon
LEARNING_RATE = 0.01

print("🔄 Loading and Preprocessing Data...")

# --- 2. Load and Sort Data ---
df = pd.read_csv(DATA_FILE)
df['date'] = pd.to_datetime(df['date'])
# Crucial: Sort by user, then date, so the AI learns chronological patterns
df = df.sort_values(by=['user_id', 'date'])

# --- 3. Scale the Data (The Secret Sauce) ---
# Neural networks hate large numbers (like ₹85,000). We compress them to values between 0 and 1.
features = df[['amount', 'balance_after']].values
scaler = MinMaxScaler()
scaled_features = scaler.fit_transform(features)

df['amount_scaled'] = scaled_features[:, 0]
df['balance_scaled'] = scaled_features[:, 1]

# Save the scaler so the Streamlit App can un-compress the predictions later
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
print("✅ Scaler saved as 'scaler.pkl'")

# --- 4. Build Sequences (Per User) ---
print("🧩 Building Training Sequences...")
X_data, y_data = [], []

def create_sequences(data, seq_length):
    xs, ys = [], []
    for i in range(len(data) - seq_length):
        x = data[i:(i + seq_length)]
        y = data[i + seq_length][1] # We want to predict the 'balance_scaled'
        xs.append(x)
        ys.append(y)
    return np.array(xs), np.array(ys)

# We loop through each user so their histories don't mix together!
for user_id, group in df.groupby('user_id'):
    user_data = group[['amount_scaled', 'balance_scaled']].values
    if len(user_data) > SEQ_LENGTH:
        x_u, y_u = create_sequences(user_data, SEQ_LENGTH)
        X_data.append(x_u)
        y_data.append(y_u)

# Stack everything into giant PyTorch Tensors
X_tensor = torch.tensor(np.vstack(X_data), dtype=torch.float32)
y_tensor = torch.tensor(np.concatenate(y_data), dtype=torch.float32).unsqueeze(1)

print(f"✅ Created {len(X_tensor)} sequences for training.")

# --- 5. Define the Featherweight GRU Model ---
class LightweightOracle(nn.Module):
    def __init__(self, input_size=2, hidden_size=16, num_layers=1): 
        super(LightweightOracle, self).__init__()
        self.gru = nn.GRU(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        out, _ = self.gru(x)
        return self.fc(out[:, -1, :]) # Output the final prediction

model = LightweightOracle()

# --- 6. Train the Model ---
criterion = nn.MSELoss() # Mean Squared Error
optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)

print("🔥 Starting Training Engine...")

for epoch in range(EPOCHS):
    model.train()
    optimizer.zero_grad()
    
    # Forward Pass
    outputs = model(X_tensor)
    loss = criterion(outputs, y_tensor)
    
    # Backward Pass (Learning)
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 10 == 0:
        print(f"Epoch [{epoch+1}/{EPOCHS}], Loss: {loss.item():.6f}")

print("✅ Training Complete!")

# --- 7. Export the Model ---
torch.save(model.state_dict(), 'oracle_model.pth')
print("🎉 Model successfully exported as 'oracle_model.pth'!")