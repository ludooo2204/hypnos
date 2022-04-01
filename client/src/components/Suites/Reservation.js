import { useNavigate, useLocation } from "react-router-dom";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "./Suites.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { addDays, subDays } from "date-fns";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);
// setDefaultLocale('fr');
const Reservation = () => {
	const [etablissements, setEtablissements] = useState(null);
	const [suites, setSuites] = useState(null);
	const [reservations, setReservations] = useState(null);
	const [suiteChoisi, setSuiteChoisi] = useState(null);
	const [etablissementChoisi, setEtablissementChoisi] = useState(null);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const navigate = useNavigate();
	const { state } = useLocation();
	console.log("state from resa");
	console.log(state);
	useEffect(() => {
		axios.get("user/etablissements").then((_etablissements) => {
			setEtablissements(_etablissements.data.etablissement);
			setEtablissementChoisi(_etablissements.data.etablissement.filter((e) => e.id === state.id)[0]);
			setSuites(_etablissements.data.etablissement.filter((e) => e.id === state.id)[0].suites);
			setSuiteChoisi(state.nom);
			let resaTemp=[]
			for (const resa of state.reservations) {
				console.log(resa.dateDebut)
				resaTemp.push({start:new Date(resa.dateDebut),end:new Date(resa.dateFin)})
			}
			console.log(resaTemp)
			setReservations(resaTemp)
		});
	}, []);
	const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = state;
	const CustomInput = forwardRef(({onClick }, ref) => (
		<button className="example-custom-input" onClick={onClick} ref={ref}>
	<CalendarMonthIcon /> Arrivée - Départ
		</button>
	));
	const handleChangeEtablissement = (e) => {
		console.log(etablissements);
		console.log(e.target.value);
		console.log(etablissements.filter((element) => element.nom == e.target.value)[0]);
		setEtablissementChoisi(e.target.value);
	};
	const handleChangeSuite = (e) => {
		console.log(suiteChoisi);
		console.log(e.target.value);
		// console.log(etablissements.filter((element) => element.nom == e.target.value)[0]);
		setSuiteChoisi(e.target.value);
	};
	const validerReservation = () => {
		console.log("valider");
	};
	const annulerReservation = () => {
		console.log("valider");
	};
	const onChangeDate = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};
	return (
		<div className={styles.mainResa}>
			{etablissements && (
				<div className={styles.agence}>
					<label> Agence de : </label>
					<select className={styles.selectAgence} value={etablissementChoisi ? etablissementChoisi.nom : "---"} onChange={handleChangeEtablissement}>
						{etablissements.map((x, y) => (
							<option key={y}>{x.nom}</option>
						))}
					</select>
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Suites </label>
					<select className={styles.selectAgence} value={suiteChoisi} onChange={handleChangeSuite}>
						{suites && suites.map((x, y) => <option key={y}>{x.nom}</option>)}
					</select>
				</div>
				<div className={styles.input}>
					<DatePicker
						selected={startDate}
						onChange={onChangeDate}
						dateFormat="dd/MM/yyyy"
						startDate={startDate}
						locale="fr"
						endDate={endDate}
						selectsRange
						withPortal
						excludeDateIntervals={reservations}
						// inline
						customInput={<CustomInput />}
					/>
					<label>Date debut : </label>
					{startDate && startDate.toLocaleDateString()}
					{/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"  startDate={startDate} locale="fr" includeDateIntervals={[{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) },{ start: addDays(new Date(), 8), end: addDays(new Date(), 25) }]} selectsRange withPortal endDate={endDate} /> */}
					{/* <input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input> */}
				</div>
				<div className={styles.input}>
					<label>Date fin : </label>
					{endDate && endDate.toLocaleDateString()}
					{/* <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}  dateFormat="dd/MM/yyyy" selectsEnd startDate={startDate} locale="fr" includeDateIntervals={[{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) }]} withPortal endDate={endDate} minDate={startDate} /> */}
					{/* <input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input> */}
				</div>
			</div>
			<div className={styles.buttonGroup}>
				<button className={styles.buttonValidation} onClick={validerReservation}>
					Valider
				</button>
				<button className={styles.buttonAnnulation} onClick={annulerReservation}>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default Reservation;

// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND
