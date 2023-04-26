const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(cors());



// created post request 
app.post("/api/addition", (req, res) => {
  const { num1, num2 } = req.body;
  const regex = /^\d+$/;

  if (!regex.test(num1) || !regex.test(num2)) {
    return res
      .status(400)
      .json({ message: "Invalid input. Please enter valid positive numbers." });
  }


  let carryString = "";
  let sumString = "";

  let carry = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;

  const steps = {};

  while (i >= 0 || j >= 0 || carry > 0) {
    const a = i >= 0 ? parseInt(num1.charAt(i)) : 0;
    const b = j >= 0 ? parseInt(num2.charAt(j)) : 0;
    const sum = a + b + carry;
    const digit = sum % 10;
    sumString = digit + sumString;
    carry = Math.floor(sum / 10);

    if (i >= 0 || j >= 0) {
      const stepName = `step${num1.length - i}`;
      if (carry === 1) {
        carryString = "1" + carryString.slice(0, carryString.length - 1) + "_";
      } else if (carryString.charAt(0) === "1") {
        carryString = "0" + carryString.slice(0, carryString.length - 1) + "_";
      }
      steps[stepName] = { carryString: carryString, sumString };
    } else if (carry === 1) {
      steps["step" + sumString.length] = { carryString: "1_", sumString };
    }

    i--;
    j--;
  }

  res.json(steps);
});

  



app.listen(port, () => {
  try {
    console.log(`server listen at ${port}`);
  } catch (err) {
    console.log(err);
  }
  
});
