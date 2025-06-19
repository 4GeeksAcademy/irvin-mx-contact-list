import React from "react";
import "./ContactCardStyles.css";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store/appContext";


const ContactCard = ({ address, email, id, name, phone }) => {
  const {store,actions:{showModalHandler,setContactToDelete}}=useGlobalState()
  const navigate=useNavigate()

  const handlerShowModal=({name,id})=>{
    showModalHandler()
    setContactToDelete({name,id})
  } 

 
 
  
  // const PHOTO_URL=`https://avatar.iran.liara.run/public/${id}`
  const PHOTO_URL=`https://i.pravatar.cc/150?img=${id}`
  
  return (
    <div className="contactCardBody py-2 m-0">
      <div className="contactCardImage m-0 ">
        <img  alt="photo img" src={PHOTO_URL} />
      </div>
      <div className="contactCardInfo m-0">
        <div className="infoLine d-flex justify-content-between">
          <p className="m-0 nameText">{name}</p>
          <div   className="d-flex justify-content-between align-items-center flex-row ">
            <i   onClick={()=>navigate(`/contact/${id}`)} className="fa-solid fa-pen updateIcon"></i>
            <i  onClick={()=>handlerShowModal({name,id})} className="fa-solid fa-trash trashIcon"></i>
          </div>
        </div>
        <div className="infoLine">
          <i className="fa-solid fa-location-dot ml-2"></i> <p className="">{address}</p> 
        </div>
        <div className="infoLine">
          <i className="fa-solid fa-phone-flip ml-2"></i><p className="">{phone}</p>
        </div>
        <div className="infoLine">
        <i className="fa-solid fa-envelope ml-2"></i><p className="">{email}</p>
        </div>
      </div>
    </div>
    
  );
};

export default ContactCard;