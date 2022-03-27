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
import axios from "axios";
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

Modal.setAppElement("body");

const Navbar = () => {
	const [userConnected, setUserConnected] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isAdmin, setAdmin] = useState(false);
	const [navBg, setNavBg] = React.useState(styles.navBg1);
	const location = useLocation();
	React.useEffect(() => {
		if (window.location.pathname === "/") {
			setNavBg(styles.navBg1);
		} else {
			setNavBg(styles.navBg2);
		}
	}, [location]);
	// useEffect(() => {
	// 	if (defaultIsOpen) setIsOpen(true);
	// }, []);
	// useEffect(() => {
	// 	const header = {
	// 		headers: {
	// 			"x-access-Token": window.localStorage.getItem("token"),
	// 			"content-type": "application/json",
	// 		},
	// 	};
	// 	axios
	// 		.get("/api/signinAuto", header)
	// 		// .get("/api/sendmail")
	// 		.then((e) => {
	// 			console.log("signinauto");
	// 			console.log(e.data);
	// 			setUserConnected(e.data.username);
	// 			setUser(e.data);

	// 			isAdmin(true);
	// 		})
	// 		.catch((err) => console.log("bye", err));
	// }, []);

	const seConnecter = (user) => {
		console.log("user");
		console.log(user);
		// setUsername(user.username)
		if (user.roles.includes("ROLE_ADMIN")) {
			console.log("ROLE ADMIN");
			setAdmin(true);
		}
		setUserConnected(user.username);
	};
	const seDeconnecter = () => {
		setUserConnected(null);
		window.location.reload(false);
	};
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<nav className={`${styles.navbar} ${navBg}`}>
				<ol className={styles.ol}>
					<li>
						<Link to="/" className={styles.text}>
							<div className={styles.logoHypnos}></div>
						</Link>
					</li>
					<li>
						<Link to="/etablissements" className={styles.text}>
							Nos hôtels
						</Link>
					</li>
					<li>
						<Link to="/contact" className={styles.text}>
							Nous contacter
						</Link>
					</li>
					<li>
						<Link to="/reservation" className={styles.text}>
							Réservez un séjour
						</Link>
					</li>

					{isAdmin && (
						<li>
							<Link to="/admin" className={styles.text}>
								Section Admin
							</Link>
						</li>
					)}
				</ol>

				{userConnected ? (
					<div onClick={seDeconnecter} className={`${styles.text}  ${styles.connexionButton}`}>
						<LogoutIcon />
					</div>
				) : (
					<div onClick={openModal} className={`${styles.text}  ${styles.connexionButton}`}>
						<AccountCircleIcon data-tip data-for="AccountCircleIcon" />
					</div>
				)}

				<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
					<LoginForm closeModal={closeModal} seConnecter={seConnecter} />
				</Modal>
			</nav>
		</>
	);
};

export default Navbar;
