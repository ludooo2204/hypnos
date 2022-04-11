import axios from "axios";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styles from "../Suites/Suites.module.css";

const MesReservations = ({ user }) => {
	const [mesReservations, setMesReservations] = useState(null);
	console.log("MesResa");
	console.log(mesReservations);
	console.log("user");
	console.log(user);
	useEffect(() => {
		if (user) {
			axios.get("user/reservations/" + user.id).then((resa) => {
				let mesReservationsTemp = resa.data.reservations;
				axios.get("user/etablissements/").then((etablissement) => {
					let etablissements = etablissement.data.etablissement;

					for (let iterator of mesReservationsTemp) {
						iterator.etablissement = etablissements.filter((e) => e.id == iterator.suite.etablissementId)[0].nom;
					}
					setMesReservations(mesReservationsTemp);
				});
			});
		}
	}, [user]);
	const onDelete = (resa) => {
		console.log("resa a virer", JSON.stringify(resa, null, 2));
		axios.delete("user/reservation/" + resa.id).then(() => {
			if (window.confirm("Confirmez vous l'annulation de la reservation?")) window.location.reload();
		});
	};

	return (
		<>
			<div className={styles.header}>Vos reservations</div>
			<div className={styles.mainMesResa}>
				{mesReservations &&
					mesReservations.map((resa, i) => (
						<div className={styles.reservationItem}>
							{(new Date(resa.dateDebut).getTime() - new Date().getTime()) / 86400000 > 3 && <HighlightOffIcon onClick={() => onDelete(mesReservations[i])} />} {new Date(resa.dateDebut).toLocaleDateString()} - {new Date(resa.dateFin).toLocaleDateString()} - {resa.etablissement} - {resa.suite.nom}
							
						</div>
					))}
			</div>
		</>
	);
};

export default MesReservations;
