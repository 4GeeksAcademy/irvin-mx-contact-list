import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Form from "../component/ContactComponents/Form.jsx";
import { useGlobalState } from "../store/appContext.js";

const ContactInfo = () => {
  const { idInfo } = useParams();
  const {
    store: { contactList },
    actions: { fetchAgenda },
  } = useGlobalState();

  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contactList.length === 0) {
      fetchAgenda()
    } 

  }, []);

  useEffect(()=>{
    if(contactList.length !==0){
        const userInfo = contactList.find((elem) => elem.id == idInfo);
        setFormValues(userInfo)
        setIsLoading(false)
    }
  },[contactList])

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h1>Contact Info</h1>
      {!isLoading && <Form formInitialValues={formValues} method={"PATCH"}/>}

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

export default ContactInfo;