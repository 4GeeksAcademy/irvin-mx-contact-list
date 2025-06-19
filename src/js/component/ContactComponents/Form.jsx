import React, { useEffect, useState } from "react";
import "./FormStyles.css";

import { useGlobalState } from "../../store/appContext.js";

const FormInput = ({ type, name, setFormState, value, labelText }) => {
  const changeHandler = (e) => {
    setFormState((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  return (
    <div className="w-100">
      <label style={{ fontSize: "20px" }} htmlFor={name}>
        {labelText}
      </label>
      <input
        style={{ height: "40px" }}
        id={name}
        placeholder={`Enter ${labelText.toLowerCase()} `}
        value={value[name]}
        name={name}
        onChange={changeHandler}
        className="w-100"
        type={type}
      />
    </div>
  );
};

const Form = ({formInitialValues,method}) => {

  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowError(false);
      setShowSuccess(false);
      setErrorMsg("");
      setSuccMsg("");
    }, 7000);

    return () => {
      clearInterval(interval);
    };
    
  }, [showError, showSuccess]);
  const {
    store,
    actions: { addContact,patchContact },
  } = useGlobalState();

  const [contactInfo, setContactInfo] = useState({
    id:formInitialValues?.id || "" ,
    name:formInitialValues?.name || "" ,
    phone: formInitialValues?.phone || "",
    email: formInitialValues?.email || "",
    address: formInitialValues?.address || ""
  });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succrMsg, setSuccMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (contactInfo.name === "") {
      setShowError(true);
      setErrorMsg("Add a valid name.");
      return;
    }
    
    if(method==="POST"){
      const statusOfCall = addContact(contactInfo);
      if (statusOfCall) {
        setShowSuccess(true);
        setSuccMsg("Created")
      } else {
        setShowError(true);
        setErrorMsg("Error at creating messsge");
      }
      setContactInfo({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

    }
    if(method==="PATCH"){
      const statusOfCall = patchContact( contactInfo.id,contactInfo);
      if (statusOfCall) {
        setShowSuccess(true);
        setSuccMsg("Edited")
      } else {
        setShowError(true);
        setErrorMsg("Error at editing contact");
      }
    }
   


  };

  return (
    <div className="formBody">
      <form
        onSubmit={submitHandler}
        className="d-flex justify-content-lg-center align-items-center flex-column gap-3"
        action=""
      >
        <FormInput
          type={"text"}
          labelText={"Full Name"}
          name={"name"}
          setFormState={setContactInfo}
          value={contactInfo}
        />
        <FormInput
          type={"email"}
          labelText={"Email"}
          name={"email"}
          setFormState={setContactInfo}
          value={contactInfo}
        />
        <FormInput
          type={"text"}
          labelText={"Phone"}
          name={"phone"}
          setFormState={setContactInfo}
          value={contactInfo}
        />
        <FormInput
          type={"text"}
          labelText={"Address"}
          name={"address"}
          setFormState={setContactInfo}
          value={contactInfo}
        />
        {showError && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        {showSuccess && (
          <div className="alert alert-success" role="alert">
            {succrMsg}
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          {method==="POST"? "Add New Contact" : "Edit the contact"}
        </button>
      </form>
    </div>
  );
};

export default Form;