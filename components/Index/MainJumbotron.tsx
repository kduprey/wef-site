import styles from "/styles/components/jumbotron.module.scss";
import Image from "next/legacy/image";
import Link from "next/link";

type Props = {
	contactInfo;
};

const MainJumbotron: React.FC<Props> = ({ contactInfo }) => {
	if (!contactInfo) {
		contactInfo = {
			phone: "+44 000 000 0000",
			mainText:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem vitae laborum eum officiis repudiandae! Earum voluptate natus qui, ut molestias, distinctio consequatur accusamus vitae incidunt repellat nisi molestiae? Quos, id.",
		};
	}

	return (
		<div className="container-fluid position-relative col-10 col-lg-12 rounded my-3 pb-3 shadow">
			<div className="d-none d-lg-block">
				<Image
					src="/h1_hero.png"
					alt="Boy smiling with notebook"
					width={1922}
					height={844}
				/>
			</div>
			<div
				className={`${styles.heroImg} d-flex flex-column d-lg-block align-items-center`}
			>
				<h1
					className={`align-lg-left display-2 text-secondary fw-bolder ${styles.headerText}`}
				>
					Our Helping To
					<br />
					The World
				</h1>
				<p className="col-lg-8 col-sm-6 w-75 text-center fw-lighter">
					{contactInfo.taglineText}
				</p>
				<div className="d-flex align-items-center justify-content-center w-75 flex-column flex-md-row">
					<button className="btn btn-primary px-4 py-2">
						<Link href="/donate">
							<a className="text-white text-decoration-none">
								Donate
							</a>
						</Link>
					</button>
					<a
						className="px-3 text-secondary fw-lighter py-3 py-md-0"
						href={`tel:${contactInfo.phoneNumber}`}
					>
						<i className="bi bi-telephone text-secondary pe-1"></i>
						{contactInfo.phoneNumber}
					</a>
				</div>
			</div>
		</div>
	);
};

export default MainJumbotron;
