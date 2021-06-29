import React from "react";
import Form from "../components/trello/Form";
import List from "../components/trello/List";
import "../assets/styles/trello.css";

function Trello() {
  return (
    <>
      <div className="trello">
        <h1> Simple Trello Application </h1>
        <Form />
        <List />
      </div>
    </>
  );
}

export default Trello;
