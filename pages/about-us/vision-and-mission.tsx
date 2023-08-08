import { RichText } from "@graphcms/rich-text-react-renderer";
import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import graphcms from "../../config/graphCMSConfig";
import renderers from "../../config/richTextRenders";
import { Article, contactInfo } from "../../types";

type Props = {
	contactInfo: contactInfo;
	article: Article;
};

const visionAndMission: NextPage<Props> = ({ article, contactInfo }) => {
	return (
		<div className="vh-100 d-flex flex-column">
			<Head>
				<title>Vision & Mission - World Eye Foundation</title>
				<meta
					name="description"
					content="Vision and Mission - World Eye Foundation"
				/>
				<link rel="icon" href="/wef_icon.png" />
			</Head>
			<NavBar
				active="/about-us/vision-and-mission"
				contactInfo={contactInfo}
			/>
			<div className="container">
				<h1 className="text-center py-3">{article.title}</h1>
				<RichText
					content={article.content.raw.children}
					renderers={renderers()}
				/>
			</div>

			<Footer
				contactInfo={contactInfo}
				active="/about-us/vision-and-mission"
			/>
		</div>
	);
};

export default visionAndMission;

export const getStaticProps: GetStaticProps = async () => {
	const QUERY2 = gql`
		query MissionAndVision {
			articles(where: { section: Vision_And_Mission }) {
				author {
					name
				}
				content {
					raw
				}
				title
				publishedAt
			}
		}
	`;
	const { articles } = await graphcms.request<{ articles: Article[] }>(
		QUERY2
	);

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
			article: articles[0],
			contactInfo: contactInfos[0],
		},
	};
};
