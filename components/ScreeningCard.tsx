import Image from "next/image";
import { Screening } from "../types";

type Props = {
	screening: Screening;
};

const ScreeningCard = ({ screening }: Props) => {
	return (
		<div className="p-3">
			<h2>{screening.location}</h2>
			<div className="row row-cols-auto">
				{screening.photosFromScreening.map((image) => (
					<div
						key={image.id}
						className="col"
						style={{ width: "20em" }}
					>
						<Image
							src={image.url}
							width={image.width}
							height={image.height}
							alt={image.id}
							loading="lazy"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ScreeningCard;
