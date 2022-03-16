const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

console.log('coucou from sendmail')


const sendEMail = async (message)=>{
	const options = {
		host:"node183-eu.n0c.com",
		port:465,
		secure:true,
		auth:{
			user:process.env.EMAIL,
			pass:process.env.PASSWORD,
		},
	tls:{
		rejectUnauthorized :false
	}
	
	}
	let transporter = nodemailer.createTransport(options)
	transporter.verify((err,success)=>{
		if (err) {
			console.log("err")
			console.log(err)
		} else {
			console.log("serveur pret a prendre les messages !")
		}
	})


	// let info = await transporter.sendMail({
	// 	from :'christele@lomano.fr',
	// 	to:"vachon.ludovic@gmail.com",
	// 	subject:"hello world",
	// 	text:"coucou le monde !"
	// })
	let info = await transporter.sendMail(message)
	console.log("message envoyé")
	console.log(info.messageId)
}



// sendEMail().catch(console.error)





// const createTransporter = async () => {
// 	const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "https://developers.google.com/oauthplayground");

// 	oauth2Client.setCredentials({
// 		refresh_token: process.env.REFRESH_TOKEN,
// 	});
// // console.log("oauth2Client")
// // console.log(oauth2Client)
// 	const accessToken = "ya29.A0ARrdaM-XGR0UdHh9B0Qd1QUX9jiH5FSnCdeVcPCEe2ODNB25rFlpSamSYnytd84K8h1LDDSODyT2ySTQzsT6VFRDTnIDHsKraTK8axKUBbnfUTvdhLW9ZbJl0maRwzvVG6g1y1Vo99FbdJiwvMCjHdnyM0ZV"
// 	// const accessToken = await new Promise((resolve, reject) => {
// 	// 	oauth2Client.getAccessToken((err, token) => {
// 	// 		if (err) {
//   //       console.log("err")
//   //       // console.log(err)
// 	// 		  reject("Failed to create access token :(");
// 	// 		}
// 	// 		resolve(token);
// 	// 	});
// 	// });
// // console.log("accessToken")
// // console.log(accessToken)
// 	const transporter = nodemailer.createTransport({
// 		service: "gmail",
// 		auth: {
// 			type: "OAuth2",
// 			user: process.env.EMAIL,
// 			accessToken,
// 			clientId: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			refreshToken: process.env.REFRESH_TOKEN,
// 		},
//     tls: {
//       rejectUnauthorized: false
//     }
// 	});

// 	return transporter;
// };
// //  console.log("transporter")
// //  console.log(transporter)
// const sendEmail = async (emailOptions,err) => {
//   try{
//   let emailTransporter = await createTransporter();
//   await emailTransporter.sendMail(emailOptions);
//   console.log("ca a marché !! ")
// }
// catch {
//   console.log("erreur from cotaclaefa",emailOptions,err)
// }
// };

// sendEmail({
//   subject: "Renouvellement mot de passe",
//   text: "Vous avez perdiu votre mot de passe ?",
//   to: "vachon.ludovic@gmail.com",
//   from: process.env.EMAIL
// });


// const sendEmail = async (email, subject, payload, template) => {
// 	try {
// 		console.log("allo");
// 		console.log(email);
// 		console.log(subject);
// 		//   let testAccount = await nodemailer.createTestAccount()
// 		// create reusable transporter object using the default SMTP transport
// 		const transporter = nodemailer.createTransport({
// 			service: "Gmail",
// 			//   port: 587,
// 			//   secure:false,
// 			auth: {
// 				user: "ludotest2204",
// 				pass: "Pistache+9", // naturally, replace both with your real credentials or an application-specific password
// 			},
// 		});


// 		const source = fs.readFileSync(path.join(__dirname, template), "utf8");
// 		const compiledTemplate = handlebars.compile(source);
// 		const options = () => {
// 			return {
// 				from: "Guy Haley",
// 				to: email,
// 				subject: subject,
// 				html: compiledTemplate(payload),
// 			};
// 		};
// 		console.log(options);
// 		// Send email
// 		transporter.sendMail(options(), (error, info) => {
// 			if (error) {
// 				console.log("error");
// 				console.log(error);
// 				return error;
// 			} else {
// 				console.log("ca marche");
// 				console.log(info);
// 				//   return res.send("toto")
// 				return res.status(200).json({
// 					success: true,
// 				});
// 			}
// 		});
// 	} catch (error) {
// 		console.log("error2");
// 		console.log(error);
// 		return error;
// 	}
// };

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEMail;
