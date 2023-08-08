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

const Custom404: NextPage<Props> = ({ contactInfo }) => {
	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Page Not Found</title>
				<meta
					name="description"
					content="Page Not Found - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>

			<NavBar contactInfo={contactInfo} active={""} />

			<div className="text-center py-5">
				<h1 className="display-3">Sorry, this page was not found!</h1>
				<h3>Navigate above to another page.</h3>
			</div>

			<Footer contactInfo={contactInfo} active={""} />
		</div>
	);
};

export default Custom404;

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
