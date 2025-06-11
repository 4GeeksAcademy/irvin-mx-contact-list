import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { useParams,useNavigate } from "react-router"

const EditContact = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const { store,actions } = useContext(Context);
    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {

        if (store.listaDeContactos.length > 0) {
            const contact = store.listaDeContactos.find((item)=> item.id==id)
            setContactInfo({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: contact.address
            });
        }
    }, [store.listaDeContactos]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Save edited values");
        console.log(contactInfo);
        // Call actions.editContact(contactInfo) or similar
        const b = await actions.editContact(contactInfo,id)
        console.log(b)
        if(b){
            navigate("/contacts")
        }
    };

    const handleFormInput = (event) => {
        const { id, value } = event.target;
        setContactInfo(prev => ({
            ...prev,
            [id === "inputFullName" ? "name" :
             id === "inputEmail" ? "email" :
             id === "inputPhoneNumber" ? "phone" :
             id === "inputAddress" ? "address" : ""]: value
        }));
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="inputFullName" className="form-label">Full Name</label>
                    <input
                        onChange={handleFormInput}
                        type="text"
                        className="form-control"
                        id="inputFullName"
                        value={contactInfo.name}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input
                        onChange={handleFormInput}
                        type="text"
                        className="form-control"
                        id="inputEmail"
                        value={contactInfo.email}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="inputPhoneNumber" className="form-label">Phone</label>
                    <input
                        onChange={handleFormInput}
                        type="text"
                        className="form-control"
                        id="inputPhoneNumber"
                        placeholder="1234 Main St"
                        value={contactInfo.phone}
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input
                        onChange={handleFormInput}
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Apartment, studio, or floor"
                        value={contactInfo.address}
                    />
                </div>

                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;