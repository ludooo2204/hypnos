import React,{useState} from "react";
import Navbar from "./Navbar/Navbar";
// import Main from "./Main";
import RenouvellerPassword from "./RenouvellerPassword/RenouvellerPassword";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
const App = () => {
	const [isAdminProp, setIsAdminProp] = useState(false);
	const [defaultIsOpen, setDefaultIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const isAdmin=(info)=>{
		setIsAdminProp(true)
	}
	return (
		<Router>
            <Navbar isAdmin={isAdmin} defaultIsOpen={defaultIsOpen} setUser={setUser}/>
			<Routes>
				{/* <Route path="/" element={<Main defaultIsOpen={setDefaultIsOpen}/>} /> */}
				<Route path="reset-password" element={<RenouvellerPassword />} />
			</Routes>
		</Router>
	);
};

export default App;
