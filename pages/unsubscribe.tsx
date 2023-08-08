import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import graphcms from "../config/graphCMSConfig";
import { contactInfo } from "../types";

type Props = {
	contactInfo: contactInfo;
};

const Unsubscribe: NextPage<Props> = ({ contactInfo }) => {
	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>
					Unsubscribe from Newsletter - World Eye Foundation
				</title>
				<meta
					name="description"
					content="Unsubscribe - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>

			<NavBar contactInfo={contactInfo} active="/unsubscribe" />

			<div className=""></div>

			<Footer contactInfo={contactInfo} active="/unsubscribe" />
		</div>
	);
};

export default Unsubscribe;

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
		contactInfos: contactInfo;
	}>(QUERY);

	return {
		props: {
			contactInfo: contactInfos[0],
		},
	};
};
