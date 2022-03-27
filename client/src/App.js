import React,{useState} from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import AjoutEtablissement from "./components/Admin/AjoutEtablissement";
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
				{/* <Route path="etablissements" element={<Creations isAdmin={isAdminProp} user={user}/>} />
				<Route path="reservation" element={<QuiSuisJe />} />
				<Route path="contact" element={<Contact />} /> */}
			</Routes>
		</Router>
	);
};

export default App;
