import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/nav";
import Login from "./components/login"
import Register from "./components/register"
import Home from "./components/home"
import Use from "./components/usePopup"

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/navbar" element={<Navbar />} />
				<Route exact path="/" element={<Login />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/reg" element={<Register />} />
				<Route exact path="/usePop" element={<Use />} />
			</Routes>
		</>
	);
};
 export default App;