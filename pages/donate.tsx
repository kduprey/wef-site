import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import DonateBlock from "../components/DonateBlock";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import graphcms from "../config/graphCMSConfig";
import styles from "../styles/Donate.module.scss";
import { contactInfo } from "../types";

type Props = {
	contactInfo: contactInfo;
};

const Donate: NextPage<Props> = ({ contactInfo }) => {
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
				<NavBar active="/donate" contactInfo={contactInfo} />
				<div className="align-self-center h-75 d-flex flex-column justify-content-center">
					<DonateBlock />
				</div>
				<Footer active="donate" contactInfo={contactInfo} />
			</div>
		</div>
	);
};

export default Donate;

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
