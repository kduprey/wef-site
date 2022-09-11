import { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		document ? require("bootstrap/dist/js/bootstrap") : null;
	}, []);
	return <Component {...pageProps} />;
}

export default MyApp;
