import React from 'react'
import "./ModalStyles.css"
import { useGlobalState } from '../../store/appContext'

const Modal = () => {
    const {store:{showModal,contactToDelete},actions:{showModalHandler,deleteContact,fetchAgenda}}=useGlobalState()
const {name,id}=contactToDelete
    const deleteHandler=async(id)=>{
        console.log(id)
        await deleteContact(id)
        await fetchAgenda()
        showModalHandler()
      }
  return (
    <div onClick={()=>showModalHandler()} style={{display: showModal ? "flex" : "none"}} className='modalBack'>
        <div  onClick={(e)=> e.stopPropagation()} className='modalBody'>
            <h1>{`Delete the contact ${name}?`}</h1>
            <p>Do you want to delete the contact? This is change is permanet</p>
            <div className='d-flex justify-content-evenly align-items-center flex-row'>
                <button  onClick={()=>showModalHandler()} className='btn btn-primary'>Cancelar</button>
                <button onClick={()=>deleteHandler(id)} className='btn btn-danger'>Eliminar</button>
            </div>

        </div>

    </div>
  )
}

export default Modal