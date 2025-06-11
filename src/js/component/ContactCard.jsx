import React, { useEffect, useContext } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router"

const ContactCard = (props) => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)



    const handleDelete = (e) => {
        const idToDelete = e.target.getAttribute("data-id-to-delete");
        actions.deleteContact(idToDelete)
        navigate("/contacts")
    }

    const handleEdit = (e) => {
        const idToEdit = e.target.getAttribute("data-id-to-edit");
        navigate(`/contact/edit/${idToEdit}`)
    }

    return (
        <div className="border">
            <div>

                <img src={props.imgUrl} alt="" />
            </div>
            <div>
                <p>{props.contactInfo.name}</p>
            </div>
            <div>
                <p>{props.contactInfo.email}</p>
            </div>
            <div>
                <p>{props.contactInfo.phone}</p>
            </div>
            <div>
                <p>{props.contactInfo.address}</p>
            </div>
            <div>
                <button type="button" class="btn btn-warning" data-id-to-edit={props.contactInfo.id} onClick={(e) => handleEdit(e)}>Edit</button>
                {/* <button>Delete</button> */}
                {/* <!-- Button trigger modal --> */}
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${props.contactInfo.id}`}>
                    Delete modal
                </button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id={`exampleModal${props.contactInfo.id}`}  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Estas seguro de querer eliminar el usuario con id {props.contactInfo.id}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" data-id-to-delete={props.contactInfo.id} onClick={(e) => handleDelete(e)} type="button" class="btn btn-primary">Confirm delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard