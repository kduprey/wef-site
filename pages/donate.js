import styles from "../styles/Donate.module.scss";
import DonateBlock from "./components/DonateBlock";
import Head from "next/head";
import Script from "next/script";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { gql } from "graphql-request";
import graphcms from "../config/graphCMSConfig";

const Donate = ({ contactInfo }) => {
	return (
		<div>
			<Head>
				<title>Donate to WEF</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					name="description"
					content="Donate to Support World Eye Foundation"
				/>
			</Head>
			<Script src="https://js.paystack.co/v1/inline.js"></Script>
			<div className="vh-100 d-flex flex-column">
				<NavBar active="donate" info={contactInfo} />
				<div className="align-self-center h-75 d-flex flex-column justify-content-center">
					<DonateBlock />
				</div>
				<Footer active="donate" info={contactInfo} />
			</div>
		</div>
	);
};

export default Donate;

export async function getStaticProps() {
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

	const { contactInfos } = await graphcms.request(QUERY);

	return {
		props: {
			contactInfo: contactInfos[0],
		},
	};
}
