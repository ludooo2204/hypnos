import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AjoutEtablissement from "./components/Admin/AjoutEtablissement";
import Etablissements from "./components/Etablissements/Etablissements";
import Suites from "./components/Suites/Suites";
import Suite from "./components/Suites/Suite";
import Reservation from "./components/User/Reservation";
import Manager from "./components/Manager/Manager";
import AjoutSuite from "./components/Manager/AjoutSuite";
import MesReservations from "./components/User/MesReservations";
import Contact from "./components/Contact/Contact";
// import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const App = () => {
	const [userData, setUserData] = useState(null);
	const [role, setRole] = useState(null);
	// const [userConnected, setUserConnected] = useState(null);

	useEffect(() => {
		if (userData) {
			const isAdmin = userData.roles.includes("ROLE_ADMIN");
			const isManager = userData.roles.includes("ROLE_MANAGER") && !userData.roles.includes("ROLE_ADMIN");
			if (isAdmin) setRole("Admin");
			if (isManager) setRole("Manager");
			console.log("is admin = ", isAdmin);
			console.log("is manager = ", isManager);
		}
	}, [userData]);

	const setUserFromNavBar = (user) => {
		console.log("user connecté depuis la navbar !!!!");
		console.log("user connecté depuis la navbar !!!!");
		console.log("user connecté depuis la navbar !!!!");
		console.log("user connecté depuis la navbar !!!!");
		console.log(user);
		// setUserData(user.data);
	};

	useEffect(() => {
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		console.log("headers!!");
		console.log("headers!!");
		console.log("headers!!");
		console.log(header);
		axios
			.get("/auth/signinAuto", header)
			// .get("/api/sendmail")
			.then((user) => {
				console.log("signinauto");
				console.log(user.data);
				setUserData(user.data);
				// setUserConnected(true);
			})
			.catch((err) => console.log("bye", err));
	}, []);

	return (
		<Router>
			{console.log("role")}
			{console.log("role")}
			{console.log("role")}
			{console.log("role")}
			{console.log("role")}
			{console.log(role)}
			<Navbar userGlobal={setUserFromNavBar} userProp={userData} />
			<Routes>
				<Route path="/" element={<Home />} />
				{role == "Admin" && <Route path="/admin" element={<Admin userData={userData} />} />}
				{role == "Manager" && <Route path="/AjoutSuite" element={<AjoutSuite user={userData} />} />}
				{role == "Manager" && <Route path="/manager" element={<Manager user={userData} />} />}
				{role == "Admin" && <Route path="/AjoutEtablissement" element={<AjoutEtablissement user={userData} />} />}
				<Route path="/etablissements" element={<Etablissements user={userData} />} />
				<Route path="/suites" element={<Suites user={userData} />} />
				<Route path="/suite" element={<Suite user={userData} />} />
				<Route path="/reservation" element={<Reservation user={userData} />} />
				<Route path="/mesReservations" element={<MesReservations user={userData} />} />
				<Route path="contact" element={<Contact user={userData} />} />
			</Routes>
		</Router>
	);
};

export default App;
