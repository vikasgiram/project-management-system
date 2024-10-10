import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../hooks/useAuth";

export const Header = (props) => {
	const { toggle, isopen, Click, language, Language, setLanguage } = props
	const [sticky, setSticky] = useState(false)

	const {user} = useContext(UserContext);
	const { t } = useTranslation()
	const { setUser } = useContext(UserContext);
	const change = () => {
		const scrollValue = document.documentElement.scrollTop
		if (scrollValue > 50) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}


	function toggleuser() {
		let side = document.getElementById("userdata")
		side.classList.toggle("hidden1")
		side.classList.toggle("visible")

	}

	window.addEventListener("scroll", change)

	const handleLogout = async () => {
		try {
		  await logout();
		  setUser(null); 
		} catch (error) {
		  console.error(error);
		}
	  };

	

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
							PMS
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
								<img src="static/assets/img/nav/man.png" alt="profile" />

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

								<Link to="#" className="dropdown-item">
									<div className="drop_item_one my-1">
										{/* {user.name} */}
										{user ? user.name : "Guest"}
										
									</div>
								</Link>

								<Link to="/ChangePassword"  className="dropdown-item">
									<div className="drop_item_one my-1">
										Change Password
										
									</div>
								</Link>

								<Link to="/" className="dropdown-item" onClick={handleLogout}>

									<div className="drop_item_two my-1">
										<i className="text-danger mr-2" >
											signoff
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
