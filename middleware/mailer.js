// import express from "express";
// import nodemailer from "nodemailer";
// import validator from "validator";
// import xssFilters from "xss-filters";

// const app = express();

// app.use(express.json());

// const rejectFunctions = new Map([
//   ["name", v => v.length < 4],
//   ["email", v => !validator.isEmail(v)],
//   ["msg", v => v.length < 25]
// ]);

// const validateAndSanitize = (key, value) => {
//   // If map has key and function returns false, return sanitized input. Else, return false
//   return (
//     rejectFunctions.has(key) &&
//     !rejectFunctions.get(key)(value) &&
//     xssFilters.inHTMLData(value)
//   );
// };

// const sendMail = (name, email, msg) => {
//   var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "3094967a125512",
//       pass: "2f31a37399352d"
//     }
//   });
//   const message = {
//     from: "elonmusk@tesla.com", // Sender address
//     to: "to@email.com", // List of recipients
//     subject: "Design Your Model S | Tesla", // Subject line
//     text: "Have the most fun you can in a car. Get your Tesla today!" // Plain text body
//   };
//   transport.sendMail(message, function(err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };

// app.post("/", (req, res) => {
//   const attributes = ["name", "email", "msg"]; // Our three form fields, all required

//   // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
//   const sanitizedAttributes = attributes.map(n =>
//     validateAndSanitize(n, req.body[n])
//   );

//   // True if some of the attributes new values are false -> validation failed
//   const someInvalid = sanitizedAttributes.some(r => !r);

//   if (someInvalid) {
//     // Throw a 422 with a neat error message if validation failed
//     return res.status(422).json({ error: "Ugh.. That looks unprocessable!" });
//   }

//   sendMail(...sanitizedAttributes);
//   res.status(200).json({ message: "OH YEAH" });
// });

// export default {
//   path: "/api/contact",
//   handler: app
// };
