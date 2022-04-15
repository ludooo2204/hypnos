import React, { useEffect, useRef, useState } from "react";

import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import ReactTooltip from "react-tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "react-modal";
import styles from "./Navbar.module.css";
import LoginForm from "../LoginForm/LoginForm";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		width: "50VW",
		height: "80VH",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		backgroundColor: "#f1f1f120",
		display: "flex",
		justifyContent: "center",
		padding: "0.5REM",
		boxShadow: "3px 3px 30px 2px",
		borderRadius: "6px",
	},
};
const customStylesMobile = {
	content: {
		top: "50%",
		left: "30%",
		width: "80VW",
		height: "90VH",
		right: "auto",
		bottom: "auto",
		marginRight: "-30%",
		transform: "translate(-30%, -50%)",
		backgroundColor: "#f1f1f120",
		display: "flex",
		justifyContent: "center",
		padding: "0.5REM",
		boxShadow: "3px 3px 30px 2px",
		borderRadius: "6px",
	},
};

Modal.setAppElement("body");

const Navbar = ({ userGlobal, userProp }) => {
	const [userConnected, setUserConnected] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [isManager, setManager] = useState(false);
	const [isUser, setUser] = useState(false);
	const [navBg, setNavBg] = useState(styles.navBg1);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const location = useLocation();
	const toggleNav = () => {
		console.log(toggleMenu);
		setToggleMenu(!toggleMenu);
	};
	//Permet de recuperer la screenWidth en cas de redimensionnement
	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", changeWidth);

		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);

	useEffect(() => {
		if (window.location.pathname === "/") {
			setNavBg(styles.navBg1);
		} else {
			setNavBg(styles.navBg2);
		}
	}, [location]);
	React.useEffect(() => {
		if (userProp) {
			console.log("userProp ");
			console.log("userProp");
			console.log("userProp");
			console.log("userProp");
			console.log(userProp);
			setUserConnected(true);
			if (userProp.roles.includes("ROLE_ADMIN")) {
				console.log("ROLE ADMIN");
				setAdmin(true);
			} else if (userProp.roles.includes("ROLE_MANAGER")) {
				console.log("ROLE MANAGER");
				setManager(true);
			} else if (userProp.roles.includes("ROLE_USER")) {
				console.log("ROLE USER");
				setUser(true);
			}
		}
	}, [userProp]);

	const seConnecter = (user) => {
		if (user.roles.includes("ROLE_ADMIN")) {
			console.log("ROLE ADMIN");
			setAdmin(true);
		} else if (user.roles.includes("ROLE_MANAGER")) {
			console.log("ROLE MANAGER");
			setManager(true);
		} else if (user.roles.includes("ROLE_USER")) {
			console.log("ROLE USER");
			setUser(true);
		}
		setUserConnected(true);
		userGlobal(user);
		window.location.reload();
	};
	const seDeconnecter = () => {
		window.localStorage.removeItem("token");
		toggleNav()
		setUserConnected(null);
		window.location.reload(false);
	};
	function openModal() {
		toggleNav()
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<nav className={`${styles.navbar} ${navBg}`}>
				{(toggleMenu || screenWidth > 600) && (<>
					<ol className={styles.ol}>
						<li className={styles.items} onClick={toggleNav}>
							<Link to="/" className={styles.text}>
								<div className={styles.logoHypnos}></div>
							</Link>
						</li>
						<li className={styles.items} onClick={toggleNav}>
							<Link to="/etablissements" className={styles.text}>
								Nos hôtels
							</Link>
						</li>
						<li className={styles.items} onClick={toggleNav}>
							<Link to="/contact" className={styles.text}>
								Nous contacter
							</Link>
						</li>
						<li className={styles.items} onClick={toggleNav}>
							<Link to="/reservation" className={styles.text}>
								Réservez un séjour
							</Link>
						</li>

						{isAdmin && (
							<li className={styles.items} onClick={toggleNav}>
								<Link to="/admin" className={styles.text}>
									Section Admin
								</Link>
							</li>
						)}
						{isManager && (
							<li className={styles.items} onClick={toggleNav}>
								<Link to="/manager" className={styles.text}>
									Section Manager
								</Link>
							</li>
						)}
						{isUser && (
							<li className={styles.items} onClick={toggleNav}>
								<Link to="/mesReservations" className={styles.text}>
									Mes réservations
								</Link>
							</li>
						)}
					</ol>	{userConnected ? (
					<div onClick={seDeconnecter} className={`${styles.text}  ${styles.connexionButton} `}>
						<LogoutIcon sx={{fontSize:screenWidth > 600? 25:35,paddingTop:screenWidth > 600?0:2 }} />
						{/* <LogoutIcon className={styles.itemsLog}/> */}
					</div>
				) : (
					<div onClick={openModal} className={`${styles.text}  ${styles.connexionButton} `}>
						<AccountCircleIcon data-tip data-for="AccountCircleIcon" sx={{fontSize:screenWidth > 600? 25:35,paddingTop:screenWidth > 600?0:2 }} />
						{/* <AccountCircleIcon data-tip data-for="AccountCircleIcon" className={styles.itemsLog} /> */}
					</div>
				)}
				</>
				)}
				<div onClick={toggleNav} className={styles.btn}>
					<svg viewBox="0 0 100 80" width="30" height="25">
						<rect width="100" height="20" stroke="blue" fill="#f1f1f1" rx="8" ry="8"></rect>
						<rect y="30" width="100" height="20" stroke="blue" fill="#f1f1f1" rx="8" ry="8"></rect>
						<rect y="60" width="100" height="20" stroke="blue" fill="#f1f1f1" rx="8" ry="8"></rect>
					</svg>
				</div>
			

				<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={screenWidth > 600?customStyles:customStylesMobile} contentLabel="Example Modal">
					<LoginForm closeModal={closeModal} seConnecter={seConnecter} />
				</Modal>
			</nav>
		</>
	);
};

export default Navbar;
