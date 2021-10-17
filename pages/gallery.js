import Head from "next/head";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import client from "../config/sanityClientConstructor";

export default function Home({ contactInfo }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Gallery - World Eye Foundation</title>
				<meta name="description" content="World Eye Foundation" />
				<link rel="icon" href="/wef_icon.png" />
			</Head>
			<div className="vh-100 d-flex flex-column">
				<NavBar active="gallery" info={contactInfo} />

				<Footer active="gallery" info={contactInfo} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const infoQuery = `*[_type == "contact"]{
		email,
		phone,
		address,
		taglineText,
	  }`;
	let contactData;

	await client.fetch(infoQuery).then((res) => {
		contactData = res;
	});

	return {
		props: {
			contactInfo: contactData[0],
		},
	};
}