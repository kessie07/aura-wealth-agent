import pandas as pd
import random
from datetime import datetime, timedelta

# --- Configuration ---
START_DATE = datetime(2025, 3, 1)
DAYS_TO_GENERATE = 365
NUM_USERS = 100

all_transactions = []

print(f"Generating data for {NUM_USERS} users... Grab a coffee, this will take a second!")

for user_id in range(1, NUM_USERS + 1):
    # --- Persona Variance: Give each user a unique financial profile ---
    salary = random.randint(40000, 150000)
    # Rent is typically 20-30% of salary
    rent = int(salary * random.uniform(0.2, 0.3)) 
    electricity = random.randint(1000, 3000)
    streaming = random.choice([499, 999, 1499]) # Different subscription tiers
    emi = random.choice([0, 2500, 5000, 10000]) # Not everyone has a loan
    
    current_balance = random.randint(20000, 100000) # Random starting balance
    
    for day_offset in range(DAYS_TO_GENERATE):
        current_date = START_DATE + timedelta(days=day_offset)
        day_of_month = current_date.day
        day_of_week = current_date.weekday()
        
        daily_txns = []

        # -- Fixed Monthly Patterns --
        if day_of_month == 1:
            daily_txns.append({'amount': salary, 'category': 'Income', 'merchant': 'TechCorp India', 'type': 'credit'})
        if day_of_month == 2:
            daily_txns.append({'amount': rent, 'category': 'Housing', 'merchant': 'Landlord Transfer', 'type': 'debit'})
        if day_of_month == 5:
            daily_txns.append({'amount': streaming, 'category': 'Subscription', 'merchant': 'Netflix/Spotify', 'type': 'debit'})
        if day_of_month == 10 and emi > 0:
            daily_txns.append({'amount': emi, 'category': 'Debt', 'merchant': 'Bank Loan EMI', 'type': 'debit'})
        if day_of_month == 20:
            daily_txns.append({'amount': electricity, 'category': 'Utilities', 'merchant': 'Electricity Board', 'type': 'debit'})

        # -- Weekly Habits --
        if day_of_week == 4: # Friday Food
            daily_txns.append({'amount': random.randint(500, 1500), 'category': 'Food', 'merchant': random.choice(['Zomato', 'Swiggy', 'Social Pub']), 'type': 'debit'})
        if day_of_week == 6: # Sunday Groceries
            daily_txns.append({'amount': random.randint(1000, 3000), 'category': 'Groceries', 'merchant': random.choice(['Blinkit', 'Zepto', "Nature's Basket"]), 'type': 'debit'})
        if day_of_week in [5, 6] and random.random() < 0.20: # Weekend Shopping (20% chance)
            daily_txns.append({'amount': random.randint(1500, 6000), 'category': 'Shopping', 'merchant': random.choice(['Myntra', 'Amazon', 'Zara']), 'type': 'debit'})
        
        # -- Quarterly Travel --
        if current_date.month in [3, 6, 9, 12] and day_of_month == 15:
            daily_txns.append({'amount': random.randint(5000, 20000), 'category': 'Travel', 'merchant': random.choice(['MakeMyTrip', 'IndiGo', 'Airbnb']), 'type': 'debit'})

        # -- Process Transactions and Update Balance --
        for tx in daily_txns:
            if tx['type'] == 'credit':
                current_balance += tx['amount']
            else:
                current_balance -= tx['amount']
                
            all_transactions.append({
                'user_id': f"USER_{user_id:03d}", # E.g., USER_001, USER_002
                'date': current_date.strftime('%Y-%m-%d'),
                'merchant_name': tx['merchant'],
                'category': tx['category'],
                'amount': tx['amount'] if tx['type'] == 'credit' else -tx['amount'],
                'balance_after': current_balance
            })

# --- Export ---
df = pd.DataFrame(all_transactions)
df.to_csv('multi_user_banking_data.csv', index=False)
print(f"✅ Awesome! Generated {len(df)} total transactions across {NUM_USERS} users.")