import Link from "next/link";

type Props = {
	active: string;
	title: string;
	route: string;
	classes?: string;
};

const NavLink: React.FunctionComponent<Props> = ({
	title,
	route,
	active,
	classes,
}) => {
	if (active === route) {
		return (
			<Link
				aria-current="page"
				href={route}
				className={`nav-link active ${classes}`}
			>
				{title}
			</Link>
		);
	} else {
		return (
			<Link href={route} className={`nav-link ${classes}`}>
				{title}
			</Link>
		);
	}
};

export default NavLink;
