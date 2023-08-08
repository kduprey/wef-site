import Image from "next/legacy/image";
import { Profile } from "../types";

type Props = {
	Profile: Profile;
};

const BioCard: React.FunctionComponent<Props> = ({ Profile }) => {
	if (!Profile) {
		return (
			<div className="display-3">
				The card was not rendered properly. Missing profile
			</div>
		);
	}

	return (
		<div
			className="container d-flex flex-column align-items-center py-3"
			style={{ width: "24rem" }}
		>
			<div className="card align-items-center pt-3">
				<div>
					<Image
						src={Profile.profilePicture.url}
						alt={`Image of ${Profile.name}`}
						height={200}
						width={200}
						loading="lazy"
						className="card-img-top rounded-circle"
					/>
				</div>
				<div className="card-body">
					<h4 className="card-title">{Profile.name}</h4>
					<p className="card-subtitle text-muted mb-2">
						{Profile.postiion}
					</p>
					<div className="text-center">
						<div className="card-text">
							{Profile.smallProfileBlurb}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BioCard;
