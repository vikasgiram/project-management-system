import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../context/UserContext";

export const EmployeeHeader = (props) => {
	const { toggle, isopen} = props
	const [sticky, setSticky] = useState(false)

	const {user} = useContext(UserContext);

	const change = () => {
		const scrollValue = document.documentElement.scrollTop
		if (scrollValue > 50) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}
// console.log(user.id,"user id");

	

function toggleuser(event) {
	event.stopPropagation();
	let side = document.getElementById("userdata")
	side.classList.toggle("hidden1")
	side.classList.toggle("visible")
}

document.addEventListener("click", function(event) {
const side = document.getElementById("userdata");
const toggleButton = document.getElementById("profileDropdown");

if (toggleButton?.contains(event.target) === false && side?.contains(event.target) === false) {
	side?.classList.add("visible");
	side?.classList.remove("hidden1");
}
});

	window.addEventListener("scroll", change)

	// const handleLogout = async () => {
	// 	try {
	// 	  await logout();
	// 	  setUser(null); 
	// 	} catch (error) {
	// 	  console.error(error);
	// 	}
	//   };
	

	return (
		<div className="wrapper  mb-5" >
			<nav className="navbar fixed-top d-flex header dark-shadow " style={{ width: isopen ? "" : "calc(100% - 144px)", marginLeft: isopen ? "" : "120px", marginTop: sticky ? "1px" : "", }} >
				{/* dark-shadow */}
				<div className="navbar-menu-wrapper d-flex align-items-center justify-content-between" >
					<button onClick={toggle}
						className=" navbar-toggler align-self-center"
						type="button"
						data-toggle="minimize"
					>
						<span className="icon-menu"></span>
					</button>
					<div className="nav_swaraj_slogon">
						<span className="nav_slogon_heading ms-2 header_fontsize" >
						Project Management System
						</span>
					</div>

					<ul className="navbar-nav navbar-nav-right">

						{/* <LanguageDDL
							Language={Language}
							setLanguage={setLanguage} /> */}



						<li className="nav-item nav-profile dropdown">
							<a
								onClick={toggleuser}
								className="nav-link dropdown-toggle me-4"
								href="#"
								data-toggle="dropdown"
								id="profileDropdown"
							>
								<img src={user.profilePic || 'path/to/fallback/image.jpg'} alt="profile" />

								<i
									className="align-self-center ml-1"
								>
									{/* <ChevronDown />> */}
								</i>
							</a>
							<div id="userdata"
								className="dropdown-menu dropdown-menu-right navbar-dropdown"
								aria-labelledby="profileDropdown"
							>

								<Link to="/UserProfile" className="dropdown-item">
									<div className="drop_item_one my-1 fw-bold">
										{/* {user.name} */}
										{user ? user.name : "Guest"}
										<i class=" ms-3 fa-solid fa-angle-right"></i>
									</div>
								</Link>

								<Link to="/ChangePassword"  className="dropdown-item">
									<div className="drop_item_one my-1">
										Change Password
										
									</div>
								</Link>

								<Link to="/" className="dropdown-item" 
                                // onClick={handleLogout}
                                >

									<div className="drop_item_two my-1">
										<i className="text-danger mr-2" >
										<i class="fa-solid fa-power-off"></i> Log Out
										</i>

									</div>
								</Link>


							</div>
						</li>
					</ul>
				</div>

			</nav>

		</div>
	);
}
