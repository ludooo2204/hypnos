import React,{useState} from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AjoutEtablissement from "./components/Admin/AjoutEtablissement";
import Etablissements from "./components/Etablissements/Etablissements";
import Suites from "./components/Suites/Suites";
// import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const App = () => {
	return (
		<Router>
            <Navbar   />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/AjoutEtablissement" element={<AjoutEtablissement />} />
				<Route path="/etablissements" element={<Etablissements />} />
				<Route path="/suites" element={<Suites />} />
				{/* <Route path="reservation" element={<QuiSuisJe />} /> */}
				{/* <Route path="contact" element={<Contact />} />  */}
			</Routes>
		</Router>
	);
};

export default App;
