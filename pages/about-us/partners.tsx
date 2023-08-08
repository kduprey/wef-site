import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";
import BioCard from "../../components/BioCard";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import graphcms from "../../config/graphCMSConfig";
import { Profile, contactInfo } from "../../types";

type Props = {
	contactInfo: contactInfo;
	profiles: Profile[];
};

const partners: NextPage<Props> = ({ profiles, contactInfo }) => {
	if (!profiles) {
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

				<NavBar active="/about-us/partners" contactInfo={contactInfo} />
				<h1 className="text-center pt-3">Partners</h1>
				<div className="display-3 text-center pt-5">
					Unfortunately, this page is currently getting updated.
					Please check back soon.
				</div>

				<Footer
					contactInfo={contactInfo}
					active={"/about-us/partners"}
				/>
			</div>
		);
	} else
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

				<NavBar active="/about-us/partners" contactInfo={contactInfo} />
				<h1 className="text-center pt-3">Partners</h1>
				<div className="d-flex justify-content-evenly flex-wrap">
					{profiles.map((e, i) => {
						return <BioCard Profile={e} key={i} />;
					})}
				</div>

				<Footer
					contactInfo={contactInfo}
					active={"/about-us/partners"}
				/>
			</div>
		);
};

export default partners;

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
		query Partners {
			profiles(where: { sectionOfSite: Partners }) {
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

	const { contactInfos } = await graphcms.request<{
		contactInfos: contactInfo[];
	}>(QUERY);

	const { profiles } = await graphcms.request<{ profiles: Profile[] }>(
		QUERY2
	);

	return {
		props: {
			data: profiles,
			contactInfo: contactInfos[0],
		},
	};
};
