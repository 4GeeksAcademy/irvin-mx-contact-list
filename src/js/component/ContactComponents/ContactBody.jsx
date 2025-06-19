import React,{useEffect} from 'react'
import "./ContactBodyStyles.css"
import { useGlobalState } from '../../store/appContext'

import ContactCard from './ContactCard.jsx'
import Modal from './Modal.jsx'

const ContactBody = () => {
    const {store:{contactList},actions:{fetchAgenda}}=useGlobalState()
  useEffect(()=>{
fetchAgenda()
  },[])
    return (

      <>
    <div className='contactBody pb-5 pt-2 container-fluid d-flex flex-column gap-5'>
        {
          
            contactList.length !== 0 ? 
            contactList.map((elem)=>
            <ContactCard key={elem.id} {...elem}/>
            )
            : contactList.length===0 ? "There are no contacts, add one , NOW !!" :"Cargando"
        }


    </div>
    <Modal/>
    </>
  )
}

export default ContactBody