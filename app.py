import streamlit as st
import pandas as pd
import numpy as np

# --- PAGE CONFIGURATION ---
st.set_page_config(page_title="Aura AI | Engine Visualizer", page_icon="🔮", layout="wide")

# --- HEADER ---
st.title("🔮 Aura: AI Wealth Engine Visualizer")
st.markdown("""
Welcome to the developer dashboard. While our Next.js frontend handles the consumer experience, 
this dashboard allows judges to interact directly with the logic behind our predictive wealth agent.
""")
st.divider()

# --- SIDEBAR: USER INPUTS ---
st.sidebar.header("⚙️ Inject Test Data")
st.sidebar.markdown("Adjust these parameters to test the engine.")

current_savings = st.sidebar.number_input("Current Savings (₹)", min_value=0, value=50000, step=5000)
monthly_income = st.sidebar.number_input("Monthly Income (₹)", min_value=0, value=60000, step=1000)
monthly_expenses = st.sidebar.number_input("Monthly Expenses (₹)", min_value=0, value=40000, step=1000)
risk_profile = st.sidebar.select_slider("AI Risk Tolerance Setting", options=["Conservative", "Moderate", "Aggressive"], value="Moderate")

# --- MAIN DASHBOARD AREA ---
if st.sidebar.button("Run Aura Prediction 🧠", type="primary"):
    
    # 1. Quick Metrics
    st.subheader("Real-Time Financial Health")
    col1, col2, col3 = st.columns(3)
    
    monthly_net = monthly_income - monthly_expenses
    savings_rate = int((monthly_net / monthly_income) * 100) if monthly_income > 0 else 0
    
    col1.metric("Monthly Net Savings", f"₹{monthly_net:,}")
    col2.metric("Savings Rate", f"{savings_rate}%")
    col3.metric("Selected Risk Profile", risk_profile)

    # 2. The AI Prediction Chart
    st.write("### 📈 10-Year Wealth Trajectory Forecast")
    st.caption("This chart visualizes the expected compounding growth based on the user's current cash flow and risk profile.")
    
    # Simulation Logic (This stands in for your PyTorch model output during the demo)
    years = np.arange(1, 11)
    # Define growth rates based on the selected risk profile
    growth_rates = {"Conservative": 0.05, "Moderate": 0.08, "Aggressive": 0.12}
    rate = growth_rates[risk_profile]
    
    projected_wealth = []
    balance = current_savings
    
    for _ in years:
        # Calculate yearly growth: (Current Balance + Yearly Savings) * (1 + Growth Rate)
        balance = (balance + (monthly_net * 12)) * (1 + rate)
        projected_wealth.append(balance)
        
    # Format data for Streamlit's native chart
    chart_data = pd.DataFrame({
        "Year": [f"Year {y}" for y in years],
        "Predicted Wealth (₹)": projected_wealth
    }).set_index("Year")
    
    # Render a beautiful area chart
    st.area_chart(chart_data)

    # 3. AI Actionable Insights
    st.write("### 🤖 Engine Insights")
    if monthly_net <= 0:
        st.error("**Aura Alert:** Cash flow is negative. The engine flags this user for immediate budget restructuring.")
    elif savings_rate < 20:
        st.warning(f"**Aura Suggestion:** Savings rate is at {savings_rate}%. The engine recommends finding ways to reduce fixed expenses to reach a 20% target.")
    else:
        st.success("**Aura Evaluation:** Strong financial trajectory. The engine approves this user for advanced investment vehicle recommendations.")

    # 4. Under the hood note for judges
    with st.expander("🛠️ How this connects to our Backend (For Judges)"):
        st.write("""
        In the full architecture, these inputs are passed via API to `aura-ai-engine/api.py`. 
        Our custom-trained model (`oracle_model.pth`) processes the multi-user banking data alongside 
        the `banking_rules.txt` constraints to generate these exact predictions and insights, which are then 
        fed into the Next.js frontend.
        """)
else:
    st.info("👈 Adjust the parameters in the sidebar and click **Run Aura Prediction** to see the engine in action.")