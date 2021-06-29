import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../features/trello";

function Form() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addList(task));
    setTask("");
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <button className="form-btn">create</button>
        <input
          type="text"
          className="form-input"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
        />
      </form>
    </>
  );
}

export default Form;
