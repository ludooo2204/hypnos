import { useNavigate, useLocation } from "react-router-dom";
import React, { forwardRef, useEffect, useState } from "react";
import styles from "../Suites/Suites.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { addDays, subDays } from "date-fns";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
// import { style } from "@mui/system";

registerLocale("fr", fr);
// setDefaultLocale('fr');
const Reservation = ({ user }) => {
	const [etablissements, setEtablissements] = useState(null);
	const [suites, setSuites] = useState(null);
	const [reservations, setReservations] = useState(null);
	const [suiteChoisi, setSuiteChoisi] = useState(null);
	const [etablissementChoisi, setEtablissementChoisi] = useState(null);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const navigate = useNavigate();

	console.log("user from RESERVAZTION");
	console.log("user from RESERVAZTION");
	console.log("user from RESERVAZTION");
	console.log("user from RESERVAZTION");
	console.log("user from RESERVAZTION");
	console.log(user);
	const { state } = useLocation();
	// console.log("state from resa");
	// console.log(state);
	useEffect(() => {
		axios.get("user/etablissements").then((_etablissements) => {
			console.log("refresh from useEffet");
			let etablissementsTemp = _etablissements.data.etablissement;
			etablissementsTemp.unshift({ nom: "---" });
			setEtablissements(etablissementsTemp);
			// setEtablissements(_etablissements.data.etablissement);
			if (state) {
				setSuites(_etablissements.data.etablissement.filter((e) => e.id === state.etablissementId)[0].suites);
				setEtablissementChoisi(_etablissements.data.etablissement.filter((e) => e.id === state.id)[0]);
				setSuiteChoisi(state);
				// setSuiteChoisi(state.nom);
				const resaSuiteChoisi = _etablissements.data.etablissement.filter((e) => e.id === state.id)[0].suites.filter((_suite) => _suite.id === state.id)[0].reservations;
				let resaTemp = [];
				for (const resa of resaSuiteChoisi) {
					resaTemp.push({ start: new Date(resa.dateDebut), end: new Date(resa.dateFin) });
				}
				setReservations(resaTemp);
			}
		});
	}, []);
	useEffect(() => {
		if (etablissementChoisi) {
			let suitesTemp = etablissementChoisi.suites;
			suitesTemp.unshift({ nom: "---" });
			setSuites(suitesTemp);
		}
	}, [etablissementChoisi]);
	useEffect(() => {
		if (suiteChoisi) {
			console.log(suiteChoisi);
			let resaTemp = [];
			for (const resa of suiteChoisi.reservations) {
				resaTemp.push({ start: new Date(resa.dateDebut).setDate(new Date(resa.dateDebut).getDate() - 1), end: new Date(resa.dateFin) });
			}
			setReservations(resaTemp);
		}
	}, [suiteChoisi]);
	// const { id, nom, UrlBooking, description, images, etablissementId, imageMiseEnAvant, prix } = state;
	const CustomInput = forwardRef(({ onClick }, ref) => (
		<button className={styles.datePicker} onClick={onClick} ref={ref}>
			<CalendarMonthIcon /> Nuitées à choisir
		</button>
	));
	const handleChangeEtablissement = (e) => {
		console.log(etablissements);
		console.log(e.target.value);
		console.log(etablissements.filter((element) => element.nom == e.target.value)[0]);
		setEtablissementChoisi(etablissements.filter((element) => element.nom == e.target.value)[0]);
	};
	const handleChangeSuite = (e) => {
		console.log(suiteChoisi);
		console.log(e.target.value);
		console.log(suites.filter((element) => element.nom == e.target.value)[0]);
		setSuiteChoisi(suites.filter((element) => element.nom == e.target.value)[0]);
	};
	const validerReservation = () => {
		console.log("valider");
		console.log("suiteChoisi");
		console.log(suiteChoisi);
		console.log("user id == ", user.id);
		axios.post("/user/reservation", { dateDebut: startDate, dateFin: endDate, userId: user.id, suiteId: suiteChoisi.id }).then((e) => {
			if (e.data.validation === "ok") {
				alert("la reservation à été validé du " + new Date(e.data.dateDebut).toLocaleDateString() + " au " + new Date(e.data.dateFin).toLocaleDateString());
				navigate("../");
			} else alert("la reservation à échoué!");

			// ;
		});
	};
	const annulerReservation = () => {
		console.log("valider");
	};
	const onChangeDate = (dates) => {
		const [start, end] = dates;
		console.log(start);
		// if (start) start.setHours(0);
		console.log(start);
		console.log(end);
		// if (end) end.setHours(0);
		console.log(end);
		setStartDate(start);
		setEndDate(end);
	};
	return (
		<div className={styles.mainResa}>
			{etablissements && (
				<div className={styles.agence}>
					<label> Agence de : </label>
					<select className={styles.selectAgence} value={etablissementChoisi ? etablissementChoisi.nom : "---"} onChange={handleChangeEtablissement}>
						{/* <select className={styles.selectAgence} value={etablissementChoisi ? etablissementChoisi.nom : "---"} onChange={handleChangeEtablissement}> */}
						{etablissements.map((x, y) => (
							<option key={y}>{x.nom}</option>
						))}
					</select>
				</div>
			)}
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Suites </label>
					<select className={styles.selectAgence} value={suiteChoisi ? suiteChoisi.nom : "suiteChoisi"} onChange={handleChangeSuite}>
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
					<label>Première nuitée : </label>
					{startDate && startDate.toLocaleDateString()}
					{/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy"  startDate={startDate} locale="fr" includeDateIntervals={[{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) },{ start: addDays(new Date(), 8), end: addDays(new Date(), 25) }]} selectsRange withPortal endDate={endDate} /> */}
					{/* <input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input> */}
				</div>
				<div className={styles.input}>
					<label>Dernière nuitée : </label>
					{endDate && endDate.toLocaleDateString()}
					{/* <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}  dateFormat="dd/MM/yyyy" selectsEnd startDate={startDate} locale="fr" includeDateIntervals={[{ start: subDays(new Date(), 5), end: addDays(new Date(), 5) }]} withPortal endDate={endDate} minDate={startDate} /> */}
					{/* <input type="text" className={styles.inputText} value={nom} onChange={handleNom}></input> */}
				</div>
			</div>
			<div className={styles.buttonGroup}>
				{user ? (
					<button className={styles.buttonReserver} onClick={validerReservation}>
						Valider
					</button>
				) : (
					<button className={styles.buttonReserverOpaque} onClick={() => alert("pour reserver, merci de vous connecter")}>
						Valider
					</button>
				)}
				<button className={styles.buttonAnnulation} onClick={annulerReservation}>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default Reservation;

// VOIR POUR RESTREINDRE LA ROUTE ADMIN SELON ACCORD DU BACKEND
