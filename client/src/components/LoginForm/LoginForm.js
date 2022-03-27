import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import isEmail from "validator/lib/isEmail";
// import { ReactComponent as LoginSvg } from "../../image/svg/Black-And-White-Flowers.svg";
import styles from "./LoginForm.module.css";
import axios from "axios";

const LoginForm = ({ closeModal, seConnecter }) => {
	const [isChoixInscriptionActif, setIsChoixInscriptionActif] = useState(true);
	const [passwordShown, setPasswordShown] = useState(false);
	const [MDP, setMDP] = useState("");
	const [MDP2, setMDP2] = useState("");
	// const [identifiant, setIdentifiant] = useState("");
	const [email, setEmail] = useState("");
	const [emailForNewPassword, setEmailForNewPassword] = useState(null);
	const [emailForLogin, setEmailForLogin] = useState(null);
	const [emailVisibleforNewPassword, setEmailVisibleforNewPassword] = useState(false);
	const [emailVisibleforLogin, setEmailVisibleforLogin] = useState(false);

	// Password toggle handler
	const togglePassword = () => {
		// When the handler is invoked
		// inverse the boolean state of passwordShown
		setPasswordShown(!passwordShown);
	};
	const seConnecterViaButton = () => {
		setIsChoixInscriptionActif(true);
	};
	const sInscrireViaButton = () => {
		setIsChoixInscriptionActif(false);
	};
	const validerForm = () => {
		closeModal();
	};
	const validerInscription = () => {
		console.log(email)
		console.log(MDP)
		if (MDP === MDP2) {
			axios
				.post("/auth/signup", { email, password: MDP, roles: ["user"] })
				.then((e) => {
					if (e.data.message == "Erreur! l'email est déja utilisé!") {
						window.alert(e.data.message);
						return;
					}
					window.alert("Inscription Réussie");
					closeModal();
				})
				.catch((err) => console.log(err));
		} else window.alert("les mdp se sont pas les mêmes !");
	};
	const validerConnexion = () => {
		axios
			.post("/auth/signin", { email, password: MDP })
			.then((e) => {
				if (e.data.message == "Mot de passe erroné!") {
					window.alert(e.data.message);
					return;
				}
				console.log("e.data");
				console.log(e.data);
				window.localStorage.setItem("token", e.data.accessToken);

				seConnecter({ userId: e.data.id, username: e.data.email, roles: e.data.roles });

				closeModal();
			})
			.catch((err) => console.log(err));
		// seConnecter("ludo");
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleMDP = (e) => {
		setMDP(e.target.value);
	};
	const handleMDP2 = (e) => {
		setMDP2(e.target.value);
	};
	const retrievePassword = () => {
		console.log("RETROUVER MOT DE PASSE")
		setEmailVisibleforNewPassword(true);
		setEmailVisibleforLogin(false);
	};
	// const retrieveLogin = () => {
	// 	setEmailVisibleforNewPassword(false);
	// 	setEmailVisibleforLogin(true);
	// };
	const handleEmailForNewPasswordInput = (e) => {
		setEmailForNewPassword(e.target.value);
	};
	const handleEmailForLoginInput = (e) => {
		setEmailForLogin(e.target.value);
	};

	const handleSendmailForPassword = () => {
		if (emailForNewPassword) {
			console.log("clickSendMail for password");
			// const header = {
			// 	headers: {
			// 		"x-access-Token": window.localStorage.getItem("token"),
			// 		"content-type": "application/json",
			// 	},
			// };
			axios
				.post("/api/forgot-password", { email: emailForNewPassword })
				// .get("/api/sendmail")
				.then((e) => {
					console.log("ca marche !", e);
					window.alert("Un mail de réinitialisation a été envoyé à " + emailForNewPassword + " .\n\n merci de consulter vos mails");
				})
				.catch((err) => console.log("bye", err));
		} else {
			window.alert("veuillez entrer votre email !");
		}
	};
	const handleSendmailForLogin = () => {
		if (emailForLogin) {
			console.log("clickSendMail for login");
			axios
				.post("/api/forgot-login", { email: emailForLogin })
				// .get("/api/sendmail")
				.then((e) => {
					console.log("ca marche !", e);
					window.alert("Un mail contenant votre login a été envoyé à " + emailForLogin + " .\n\n merci de consulter vos mails");
				})
				.catch((err) => console.log("bye", err));
		} else {
			window.alert("veuillez entrer votre email !");
		}
	};
	return (
		<div className="LoginForm">
			{/* <button className="buttonConnexionDansModal">Se connecter</button> */}
			<div className="buttonLoginGroupDansModal">
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--actif" : "button--calypso--inactif"}`}
					onClick={seConnecterViaButton}
				>
					<span>Se connecter</span>
				</button>
				<button
					className={`button button--calypso
				 ${isChoixInscriptionActif ? "button--calypso--inactif" : "button--calypso--actif"}`}
					onClick={sInscrireViaButton}
				>
					<span>S'inscrire</span>
				</button>
			</div>
			<div className="labelGroupModal">
				<span>
					<label data-tip data-for="email">
						Adresse email
					</label>
				</span>
				<input type="text" onChange={handleEmail} value={email} />
				<span>
					<label>Mot de passe</label>	
					<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
					{isChoixInscriptionActif && (
						<span className={styles.buttonMotDePasseOublié} onClick={retrievePassword}>
							mot de passe oublié ?
						</span>
					)}
				</span>
				<input type={passwordShown ? "text" : "password"} onChange={handleMDP} value={MDP} />
				
				{isChoixInscriptionActif && emailVisibleforNewPassword && (
					<>
						<label>Email pour renouveller le mot de passe</label>
						<input onChange={handleEmailForNewPasswordInput} value={emailForNewPassword} type="text" />
						<button className={styles.buttonMotDePasseOublié} onClick={handleSendmailForPassword}>
							Valider
						</button>
					</>
				)}
				{isChoixInscriptionActif && emailVisibleforLogin && (
					<>
						<label>Email pour récupérer login</label>
						<input onChange={handleEmailForLoginInput} value={emailForLogin} type="text" />
						<button className={styles.buttonMotDePasseOublié} onClick={handleSendmailForLogin}>
							Valider
						</button>
					</>
				)}
				{!isChoixInscriptionActif && (
					<span>
						<label>Confirmation mot de passe</label>
						<VisibilityIcon onClick={togglePassword} style={{ verticalAlign: "middle", marginLeft: "0.5REM", fontSize: "20", cursor: "pointer" }} />
					</span>
				)}
				{!isChoixInscriptionActif && <input type={passwordShown ? "text" : "password"} onChange={handleMDP2} value={MDP2} />}
				{/* {!isChoixInscriptionActif && (
					<span>
						<label data-tip data-for="mail">
							Email
						</label>{" "}
						<HelpOutlineOutlinedIcon style={{ position: "relative", top: "10" }} sx={{ fontSize: 15 }} />
					</span>
				)} */}
				{/* console.log(isEmail('foo@bar.com')); pour verifier si mail ok */}
				{/* {!isChoixInscriptionActif && <input type="email" onChange={handleEmail} value={email} />} */}
			</div>
			<button className={styles.buttonValidation} onClick={!isChoixInscriptionActif ? validerInscription : validerConnexion}>
				valider
			</button>
			{/* <button className={styles.dev } data-testid="devAdmin" onClick={validerFormFake}>
					se connecter pour developpement
				</button> */}
		</div>
	);
};

export default LoginForm;
