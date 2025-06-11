import React, { useState, useEffect, useContext } from "react"
import { Context } from "../store/appContext"

const CreateContact = () => {

    const {store,actions} = useContext(Context)

    //local state
    const [contactInfo,setContactInfo] = useState(
        {
            name: "",
            email: "",
            phone: "",
            address: ""
        }
    )


    const handleSubmit = async (event) =>{
         event.preventDefault()
        console.log(contactInfo)
        const a = await actions.createContact(contactInfo)
        console.log(a)
     }

    const handleFormInput = (event) => {
        console.log(event.target.id)

        event.target.id === "inputFullName" ? setContactInfo({...contactInfo, name:event.target.value}) : null

        event.target.id === "inputEmail" ? setContactInfo({...contactInfo, email:event.target.value}) : null

        event.target.id === "inputPhoneNumber" ? setContactInfo({...contactInfo, phone:event.target.value}) : null

        event.target.id === "inputAddress" ? setContactInfo({...contactInfo, address:event.target.value}) : null

    }


    return (
        <div>
            <div>Add a new contact</div>

            {/* Form */}
            <form className="row g-3" onSubmit={(e)=>handleSubmit(e)}> 
                <div className="col-md-6">
                    <label htmlFor="inputFullName" className="form-label">Full Name</label>
                    <input onChange={(e)=>handleFormInput(e)} type="text" className="form-control" id="inputFullName"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input onChange={(e)=>handleFormInput(e)} type="text" className="form-control" id="inputEmail"/>
                </div>

                <div className="col-12">
                    <label htmlFor="inputPhoneNumber" className="form-label">Phone</label>
                    <input onChange={(e)=>handleFormInput(e)} type="text" className="form-control" id="inputPhoneNumber" placeholder="1234 Main St"/>
                </div>

                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address </label>
                    <input onChange={(e)=>handleFormInput(e)} type="text" className="form-control" id="inputAddress" placeholder="Apartment, studio, or floor"/>
                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateContact