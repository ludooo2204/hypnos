import React,{useState} from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AjoutEtablissement from "./components/Admin/AjoutEtablissement";
import Etablissements from "./components/Etablissements/Etablissements";
import Suites from "./components/Suites/Suites";
import Suite from "./components/Suites/Suite";
import Reservation from "./components/Suites/Reservation";
import Manager from "./components/Manager/Manager";
import AjoutSuite from "./components/Manager/AjoutSuite";
// import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const App = () => {
	const [user, setUser] = useState(null)
	console.log("user from App")
	console.log(user)
	return (
		<Router>
            <Navbar   userGlobal={setUser}/>
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
				{/* <Route path="contact" element={<Contact />} />  */}
			</Routes>
		</Router>
	);
};

export default App;
