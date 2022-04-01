import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const Reservation = () => {
    const navigate=useNavigate()
	const { state } = useLocation();
	console.log("state from resa");
	console.log(state);
	const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = state;
  return (
    <div>Reservation</div>
  )
}

export default Reservation