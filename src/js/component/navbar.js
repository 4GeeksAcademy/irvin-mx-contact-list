import React from "react";
import { Link,useLocation } from "react-router-dom";

export const Navbar = () => {
	let location =useLocation()

	return (
		<nav style={{minHeight:"50px"}} className="navbar navbar-light border-bottom mb-3 px-5 d-flex justify-content-end">

			<div className="ml-auto ">
				<Link to="/new-contact" style={{display:location.pathname==="/new-contact" ? "none": "block"}}  >
					<button className="btn btn-success">New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
