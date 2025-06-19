import React from "react";
import Form from "../component/ContactComponents/Form.jsx";
import { Link } from "react-router-dom";

const NewContact = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1>Add a new contact</h1>
      <Form method={"POST"} />
      <Link style={{ textDecoration: "none" }} to="/">
        <button className="btn btn-light d-flex align-items-center justify-content-center flex-row">
          {" "}
          <i className="fa-solid fa-circle-left ml-2"></i>
          <p className="m-0">Return</p>
        </button>
      </Link>
    </div>
  );
};

export default NewContact;