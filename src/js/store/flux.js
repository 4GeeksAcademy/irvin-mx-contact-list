const BASE_URL = "https://playground.4geeks.com/contact/agendas/";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contactList: [],
      showModal:false,
      contactToDelete:{name:"",id:0}
    },
    actions: {
      fetchAgenda: async () => {
        try {
          const response = await fetch(`${BASE_URL}irvin`);
          if (!response.ok && response.status === 404) {
            // throw new Error(response.status)
            const response = await fetch(`${BASE_URL}irvin`, {
              method: "POST",
            });
            const data = await response.json();
            setStore({ ...getStore(), contactList: data.contacts });

            return;
          }

          const data = await response.json();
          setStore({ ...getStore(), contactList: data.contacts });
          return;
        } catch (error) {
          console.log(error);
        }
      },

      addContact: async (body) => {
        try {
          const response = await fetch(`${BASE_URL}irvin/contacts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) return false;

          const data = await response.json();
          if (data.id) return true;
        } catch (error) {
          console.log(error);
        }
      },

      deleteContact: async (id) => {
        try {
          const response = await fetch(
            `${BASE_URL}irvin/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) throw new Error("Error al elimminar");
          return;
        } catch (error) {
          console.log(error);
        }
      },
      patchContact: async (id, body) => {
        console.log(id, body);
        try {
          const response = await fetch(
            `${BASE_URL}irvin/contacts/${id}`,
            {
              method: "PUT",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) return false;

          const data = await response.json();
          if (data.id) return true;
        } catch (error) {
          console.log(error);
        }
      },

      showModalHandler:(value)=>{
        setStore({...getStore(), showModal:value?value :  !getStore().showModal})
      },
      setContactToDelete:(contact)=>{
        
        setStore({...getStore(),contactToDelete:contact})
      }
    },
  };
};

export default getState;