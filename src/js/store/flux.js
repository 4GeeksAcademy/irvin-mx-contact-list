const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			listaDeContactos: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: async () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/user54321/contacts');
					if (response.ok) {
						const data = await response.json();
						// getStore().listaDeContactos = data.contacts
						setStore({ ...getStore(), listaDeContactos: data.contacts });
						return data;
					} else {
						//console.log('error: ', response.status, response.statusText);
						/* Handle the error returned by the HTTP request */
						return { error: { status: response.status, statusText: response.statusText } };
					};
				} catch (e) {
					console.log({ errorInLoadSomeData: e })
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createContact: async (contactInfo) => {
				const response = await fetch('https://playground.4geeks.com/contact/agendas/user54321/contacts', {
					method: 'POST',
					body: JSON.stringify(contactInfo),  // the variable dataToSend can be a 'string' or an {object} that comes from somewhere else in our application
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if (response.ok) {
					const data = await response.json();
					console.log(data)
					return data;
				} else {
					console.log('error: ', response.status, response.statusText);
					/* Handle the error returned by the HTTP request */
					return { error: { status: response.status, statusText: response.statusText } };
				};
			},
			deleteContact: async (contactID) => {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/user54321/contacts/${contactID}`, {
					method: 'DELETE',
				});
				if (response.ok) {
					console.log(response)
					const data = response.statusText
					console.log(data)
					return data;
				} else {
					console.log('error: ', response.status, response.statusText);
					/* Handle the error returned by the HTTP request */
					return { error: { status: response.status, statusText: response.statusText } };
				};
			},
			editContact: async (contactInfo, contactID) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/user54321/contacts/${contactID}`, {
						method: "PUT",
						body: JSON.stringify(contactInfo), //Contact info will be sent to edit previous value(s)
						headers: {
							'Content-Type': 'application/json'
						}
					})

					if (response.ok) {
						const data = await response.json()
						console.log("data below")
						console.log(data)
						return data
					}

					// setStore(prevStore => ({
					// 	...prevStore,
					// 	listaDeContactos: prevStore.listaDeContactos.map(contact =>
					// 		contact.id === contactID ? { ...contact, ...contactInfo } : contact
					// 	)
					// }));

					// return updatedContact;


				} catch (e) {
					console.log({ "Error message": e })
				}
			}
		}
	};
};

export default getState;
