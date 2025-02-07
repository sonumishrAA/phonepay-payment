// src/App.js
import { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    const merchantId = "M22PU06UWBZNO";
    const apiKey = "1";
    const hostURL = "https://api.phonepe.com/apis/hermes";
    const redirectURL = "https://your-redirect-url.com";

    const payload = {
      merchantId,
      amount: parseInt(amount) * 100, // Convert to paisa
      redirectUrl: redirectURL,
      transactionId: `TXN${Date.now()}`,
      callbackUrl: redirectURL,
    };

    try {
      const response = await axios.post(`${hostURL}/pay`, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": apiKey, // In production, generate X-VERIFY using SHA256
        },
      });

      if (response.data.success) {
        window.location.href = response.data.paymentUrl; // Redirect to PhonePe
      } else {
        alert("Payment failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment request failed.");
    }
  };

  return (
    <div className="App">
      <h2>PhonePe Payment</h2>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default App;
