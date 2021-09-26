import React, { useState, useEffect } from "react";
import { Button, Container, Jumbotron } from "reactstrap";
import Logo from "./logo.svg";
import Form from "./components/Form";
import List from "./components/List";

const ALL_EXPENSES = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleName = (event) => {
    console.log("Name ", event.target.value);
    setName(event.target.value);
  };

  const handleAmount = (event) => {
    console.log("Amount ", event.target.value);
    setAmount(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (name !== "" && amount >= 0) {
      const expense = { name, amount };
      setExpenses([...expenses, expense]);
      setName("");
      setAmount("");
    } else {
      console.log("Invalid expense name or amount");
    }
  };

  const handleClearExpenses = () => {
    setExpenses([]);
  };

  return (
    <Container className="text-center">
      <Jumbotron fluid>
        <h3 className="display-6">Expense Tracker</h3>
        <img src={Logo} style={{ width: 50, height: 50 }} alt="react-logo" />
        <div>
          <p>
            Total Expense:{" "}
            <span className="text-success">
              ${" "}
              {expenses.reduce((accummulator, currentValue) => {
                return (accummulator += parseInt(currentValue.amount));
              }, 0)}
            </span>
          </p>
        </div>
        <Form
          name={name}
          amount={amount}
          handleName={handleName}
          handleAmount={handleAmount}
          handleSubmitForm={handleSubmitForm}
          handleClearExpenses={handleClearExpenses}
        />
        <List expenses={expenses} />
      </Jumbotron>
    </Container>
  );
}

export default App;
