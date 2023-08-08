import axios from "axios";
import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import graphcms from "../../config/graphCMSConfig";
import { contactInfo } from "../../types";

type Props = {
	contactInfo: contactInfo;
};

const ContactUs: NextPage<Props> = ({ contactInfo }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [disabled, setDisabled] = useState(false);

	const onChangeHandler = (e) => {
		switch (e.target.id) {
			case "name":
				setName(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case "message":
				setMessage(e.target.value);
				break;
			default:
				break;
		}
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setDisabled(true);

		await axios
			.post("/api/contact", {
				name: name,
				email: email,
				message: message,
			})
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					router.push("/form-submitted");
				} else {
					document
						.getElementById("errorMsg")
						.classList.remove("visually-hidden");
					setDisabled(false);
				}
			});
	};

	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Partners - World Eye Foundation</title>
				<meta
					name="description"
					content="Partners - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>
			<NavBar active="/about-us/contact-us" contactInfo={contactInfo} />
			<h1 className="text-center pt-3">Contact Us</h1>
			<form
				className="container col-10 pb-3 col-md-8 col-lg-6 col-xl-4"
				id="contactForm"
				onSubmit={onSubmitHandler}
			>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="Name"
						value={name}
						required
						onChange={onChangeHandler}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						name="Email"
						value={email}
						required
						onChange={onChangeHandler}
					/>
					<div id="emailHelp" className="form-text">
						We&apos;ll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="message" className="form-label">
						Message
					</label>
					<textarea
						className="form-control"
						rows={3}
						id="message"
						name="Message"
						value={message}
						required
						onChange={onChangeHandler}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary text-white"
					disabled={disabled}
				>
					Submit
				</button>
				<h3
					className="text-warning text-center fst-italic py-2 visually-hidden"
					id="errorMsg"
				>
					Apologies, there was an error with the submission.
					<br />
					Please try again later.
				</h3>
			</form>

			<Footer active="/about-us/contact-us" contactInfo={contactInfo} />
		</div>
	);
};

export default ContactUs;

export const getStaticProps: GetStaticProps = async () => {
	const QUERY = gql`
		query ContactInfo {
			contactInfos {
				email
				id
				phoneNumber
				fullAddress
				address {
					latitude
					longitude
				}
				taglineText
			}
		}
	`;

	const { contactInfos } = await graphcms.request<{
		contactInfos: contactInfo[];
	}>(QUERY);

	return {
		props: {
			contactInfo: contactInfos[0],
		},
	};
};
