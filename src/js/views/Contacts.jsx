import React, {useEffect,useContext} from 'react'
import { Context } from '../store/appContext'
import ContactCard from '../component/ContactCard.jsx'


const Contacts = () => {


    const {store,actions} = useContext(Context)

     useEffect(() => {
        actions.loadSomeData(); // Fetches and updates store.listaDeContactos
    }, []);


    useEffect(()=>{
        console.log(store["listaDeContactos"])
        console.log(store,"store value")
        console.log(store["listaDeContactos"])
    },[store.listaDeContactos])

    return (
        <div>
            <p>Contact list here</p>
            <div>
                {store.listaDeContactos.length > 0? store.listaDeContactos.map((item,index)=> {
                return <ContactCard id={item.id} key={item.id} contactInfo={item} imgUrl={`https://picsum.photos/203`} />
                }) : <div>no contacts in list</div>}
            </div>
        </div>
    )
}

export default Contacts