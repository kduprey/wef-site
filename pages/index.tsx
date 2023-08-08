import { gql } from "graphql-request";
import { GetStaticProps } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainJumbotron from "../components/Index/MainJumbotron";
import NavBar from "../components/NavBar";
import graphcms from "../config/graphCMSConfig";
import styles from "../styles/Home.module.scss";
import { contactInfo } from "../types";

type Props = {
	contactInfo: contactInfo;
};

export default function Home({ contactInfo }: Props) {
	return (
		<div className={styles.container}>
			<Header
				title="World Eye Foundation"
				description="World Eye Foundation"
			/>
			<div className="vh-100 d-flex flex-column">
				<NavBar active="/" contactInfo={contactInfo} />

				<MainJumbotron contactInfo={contactInfo} />

				<Footer active="home" contactInfo={contactInfo} />
			</div>
		</div>
	);
}

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
