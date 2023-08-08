import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import ScreeningCard from "../../components/ScreeningCard";
import graphcms from "../../config/graphCMSConfig";
import { Screening, contactInfo } from "../../types";

type Props = {
	contactInfo: contactInfo;
	screenings: Screening[];
};

const Screenings: NextPage<Props> = ({ contactInfo, screenings }) => {
	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Change Title - World Eye Foundation</title>
				<meta
					name="description"
					content="Change Description - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>

			{/* Change active link prop */}
			<NavBar contactInfo={contactInfo} active={"/our-work/screenings"} />

			<div className="display-2 text-center py-3">Screenings</div>
			<div className="container">
				{screenings.map((screening) => (
					<ScreeningCard screening={screening} key={screening.id} />
				))}
			</div>

			{/* Change active link prop */}
			<Footer contactInfo={contactInfo} active={"/screenings"} />
		</div>
	);
};

export default Screenings;

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

	const QUERY2 = gql`
		query screenings {
			screenings {
				id
				location
				photosFromScreening {
					height
					width
					url
					id
				}
			}
		}
	`;

	const { contactInfos } = await graphcms.request<{
		contactInfos: contactInfo;
	}>(QUERY);
	const { screenings } = await graphcms.request<{ screenings: Screening[] }>(
		QUERY2
	);

	return {
		props: {
			contactInfo: contactInfos[0],
			screenings,
		},
	};
};
