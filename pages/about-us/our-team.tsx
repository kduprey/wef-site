import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import BioCard from "../../components/BioCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import graphcms from "../../config/graphCMSConfig";
import { Profile, contactInfo } from "../../types";

type Props = {
	profiles: Profile[];
	contactInfo: contactInfo;
};

const ourTeam: NextPage<Props> = ({ profiles, contactInfo }) => {
	let pgData = "";

	if (!profiles) {
		return (
			<div className="vh-100 d-flex flex-column">
				<Head>
					<title>Our Team - World Eye Foundation</title>
					<meta
						name="description"
						content="Our Team - World Eye Foundation"
					/>
					<link rel="icon" href="/wef_icon.png" />
				</Head>
				<NavBar active="/about-us/our-team" contactInfo={contactInfo} />
				<h1 className="text-center pt-3">Our Team</h1>
				<div className="display-3 text-center pt-5">
					Unfortunately, this page is currently getting updated.
					Please check back soon.
				</div>

				<Footer contactInfo={contactInfo} active="/about-us/our-team" />
			</div>
		);
	}

	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Our Team - World Eye Foundation</title>
				<meta
					name="description"
					content="Our Team - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>

			<NavBar active="/about-us/our-team" contactInfo={contactInfo} />

			<div className="d-flex flex-column align-items-center py-3">
				<h1 className="text-center pt-3">Our Team</h1>

				<div className="d-flex justify-content-evenly flex-wrap w-75">
					{profiles.map((e, i) => {
						return <BioCard Profile={e} key={i} />;
					})}
				</div>
			</div>

			<Footer contactInfo={contactInfo} active="/about-us/our-team" />
		</div>
	);
};

export default ourTeam;

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

	const QUERY2 = gql`
		query MyQuery {
			profiles(where: { sectionOfSite: Our_Team }) {
				smallProfileBlurb
				sectionOfSite
				profilePicture {
					url
					width
					height
				}
				name
				postiion
				fullBiography {
					html
				}
			}
		}
	`;

	const { profiles } = await graphcms.request<{ profiles: Profile[] }>(
		QUERY2
	);

	return {
		props: {
			profiles,
			contactInfo: contactInfos[0],
		},
	};
};
