import Head from "next/head";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import graphcms from "../config/graphCMSConfig.js";
import { gql } from "graphql-request";

const Gallery = ({ contactInfo }) => {
	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Gallery- World Eye Foundation</title>
				<meta
					name="description"
					content="Gallery - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>

			<NavBar info={contactInfo} active="/gallery" />

			<div className="display-4 text-center py-3">Gallery</div>

			<Footer info={contactInfo} active="gallery" />
		</div>
	);
};

export default Gallery;

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
