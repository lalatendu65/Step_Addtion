import { useState } from "react";
import axios from "axios";
import "./Home.css"

function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
   const [error, setError] = useState(null);

  const handleNum1Change = (event) => {
    setNum1(event.target.value);
  };

  const handleNum2Change = (event) => {
    setNum2(event.target.value);
  };

  const handleAddition = async () => {
    // Validate input before sending the request
    const regex = /^[0-9]*$/;
    if (!regex.test(num1) || !regex.test(num2)) {
      setError("Please enter positive numbers only.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/addition", {
        num1,
        num2,
      });
      setResult(response.data);
    } catch (error) {
      setError("An error occurred while generating steps.");
    }
  };

  return (
    <div>
      <label>
        FirstNumber:
        <input
          className="input"
          type="number"
          value={num1}
          onChange={handleNum1Change}
        />
      </label>
      <br />
      <label>
        SecondNumber:
        <input
          className="input"
          type="number"
          value={num2}
          onChange={handleNum2Change}
        />
      </label>
      <br />
      <button className="button" onClick={handleAddition}>
        Generate Steps
      </button>
      {error && <div>{error}</div>}
      {result && (
        <pre className="result">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default Home;
