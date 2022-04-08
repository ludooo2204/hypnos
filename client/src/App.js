import React,{useState,useEffect} from "react";
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
// import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const App = () => {
const [user, setuserGlobal] = useState(null)
const [userData, setUserData] = useState(null)
const [userConnected, setUserConnected] = useState(null);

	console.log("user from App")
	const setUserF=(aa)=>{
		console.log("aa")
		console.log(aa)
		setuserGlobal(aa)
	}


	useEffect(() => {
		const header = {
			headers: {
				"x-access-Token": window.localStorage.getItem("token"),
				"content-type": "application/json",
			},
		};
		console.log("headers!!")
		console.log("headers!!")
		console.log("headers!!")
		console.log(header)
		axios
			.get("/auth/signinAuto", header)
			// .get("/api/sendmail")
			.then((user) => {
				console.log("signinauto");
				console.log(user.data)
				setUserData(user.data);
				setUserConnected(true);
			

			})
			.catch((err) => console.log("bye", err));
	}, []);

	return (
		<Router>
            <Navbar   userGlobal={setUserF} userProp={userData}/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/AjoutSuite" element={<AjoutSuite />} />
				<Route path="/manager" element={<Manager />} />
				<Route path="/AjoutEtablissement" element={<AjoutEtablissement />} />
				<Route path="/etablissements" element={<Etablissements />} />
				<Route path="/suites" element={<Suites />} />
				<Route path="/suite" element={<Suite />} />
				<Route path="/reservation" element={<Reservation user={user}  />} />
				<Route path="/mesReservations" element={<MesReservations user={userData}  />} />
				{/* <Route path="contact" element={<Contact />} />  */}
			</Routes>
		</Router>
	);
};

export default App;
