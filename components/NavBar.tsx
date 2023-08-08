import Link from "next/link";
import { contactInfo } from "../types";
import NavDropdown from "./NavDropdown";
import NavLink from "./NavLink";
import styles from "/styles/components/NavBar.module.scss";

type Props = {
	active: string;
	contactInfo: contactInfo;
};

const NavBar: React.FunctionComponent<Props> = ({ active, contactInfo }) => {
	const pages = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "About Us",
			sublinks: [
				{
					name: "History",
					link: "/about-us/history",
				},
				{
					name: "Vision and Mission",
					link: "/about-us/vision-and-mission",
				},
				{
					name: "Our Team",
					link: "/about-us/our-team",
				},
				{
					name: "Partners",
					link: "/about-us/partners",
				},
				{
					name: "Contact Us",
					link: "/about-us/contact-us",
				},
			],
		},
		{
			name: "Our Work",
			sublinks: [
				{
					name: "Screenings",
					link: "/our-work/screenings",
				},
			],
		},
		{
			name: "Gallery",
			link: "/gallery",
		},
		{
			name: "Get Involved",
			sublinks: [
				{
					name: "Donate",
					link: "/donate",
				},
				{
					name: "Contact Us",
					link: "/about-us/contact-us",
				},
			],
		},
		{
			name: "News",
			link: "/news",
		},
	];

	return (
		<div className="bg-light">
			{/* Header bar to navbar */}

			<div className="container-fluid d-lg-flex justify-content-between border-bottom py-3 align-items-center text-black d-none fw-lighter">
				<div className="d-flex justify-content-evenly col-6">
					<a
						href={`tel:${contactInfo.phoneNumber || ""}`}
						className="text-black text-decoration-none"
					>
						{contactInfo.phoneNumber || "+44 000 000 0000"}
					</a>
					<span>|</span>

					<a
						className="text-black text-decoration-none"
						href="mailto:test@test.com?subject=Touching Base with World Eye Foundation"
					>
						{contactInfo.email || "test@email.com"}
					</a>
					<span>|</span>
					<div className="d-flex justify-content-evenly">
						<a href="#" className="px-2">
							<i className="bi bi-facebook"></i>
						</a>
						<a href="#" className="px-2">
							<i className="bi bi-twitter"></i>
						</a>
						<a href="#" className="px-2">
							<i className="bi bi-linkedin"></i>
						</a>
						<a href="#" className="px-2">
							<i className="bi bi-google"></i>
						</a>
					</div>
				</div>
				<div>
					<a
						href="#emailInput"
						className="text-black text-decoration-none"
					>
						Subscribe Now
					</a>
				</div>
			</div>

			{/* MAIN NAVBAR */}

			<nav className="navbar navbar-expand-lg navbar-light shadow sticky-top">
				<div className="container-fluid">
					<Link className="navbar-brand fw-bolder fs-2" href="/">
						World Eye Foundation
					</Link>
					<button
						className="navbar-toggler border-0"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<div className="d-flex flex-column">
							<span className={styles.tealTogglerLine}></span>
							<span className={styles.tealTogglerLine}></span>
							<span className={styles.tealTogglerLine}></span>
						</div>
					</button>
					<div
						className="collapse navbar-collapse justify-content-end text-secondary"
						id="navbarNavAltMarkup"
					>
						{/* Navbar links */}

						{pages.map((e, i) => {
							if (e.sublinks) {
								return (
									<NavDropdown
										key={i}
										links={e}
										active={active}
									/>
								);
							} else {
								return (
									<NavLink
										key={i}
										title={e.name}
										route={e.link}
										active={active}
									/>
								);
							}
						})}

						<Link
							href="/donate"
							passHref
							className="col-3 col-sm-2 col-md-2 p-2 ms-3"
						>
							<button className="btn btn-primary">Donate</button>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
