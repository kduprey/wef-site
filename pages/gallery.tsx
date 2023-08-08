import { gql } from "graphql-request";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import graphcms from "../config/graphCMSConfig";
import { Article, contactInfo } from "../types";

type Props = {
	contactInfo: contactInfo;
	gallery: any;
};

const Gallery: NextPage<Props> = ({ contactInfo, gallery }) => {
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

			<NavBar contactInfo={contactInfo} active="/gallery" />

			<div className="display-4 text-center py-3">Gallery</div>

			<div className="container">
				<div className="row">
					{gallery.map((image) => (
						<div
							key={image.id}
							className="col-md-6 col-lg-4"
							style={{ width: "20em" }}
						>
							<Image
								width={image.width}
								height={image.height}
								src={image.url}
								alt={image.id}
							/>
						</div>
					))}
				</div>
			</div>

			<Footer contactInfo={contactInfo} active="gallery" />
		</div>
	);
};

export default Gallery;

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
		query gallery {
			articles(where: { section: Gallery }) {
				imagesOrVideos {
					url
					height
					id
					width
				}
			}
		}
	`;

	const { contactInfos } = await graphcms.request<{
		contactInfos: contactInfo;
	}>(QUERY);
	const { articles } = await graphcms.request<{
		articles: {
			imagesOrVideos: {
				url: string;
				height: number;
				id: string;
				width: number;
			}[];
		}[];
	}>(QUERY2);

	return {
		props: {
			contactInfo: contactInfos[0],
			gallery: articles[0].imagesOrVideos,
		},
	};
};
