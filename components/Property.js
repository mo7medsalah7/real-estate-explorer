import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import defaultImage from "../public/assets/images/defaultImage.jpg";

const Property = ({
	property: {
		title1,
		coverPhoto,
		price,
		rentFrequency,
		rooms,
		baths,
		title,
		area,
		agency,
		isVerified,
		externalID,
	},
}) => {
	return (
		<Link href={`/property/${externalID}`} passHref>
			<div className="cursor-pointer shadow-gray-400 shadow-xl">
				<Image
					src={coverPhoto ? coverPhoto.url : defaultImage}
					alt="hola"
					width="500px"
					height="400px"
					layout="intrinsic"
					className="object-fit"
				/>
				<div className="flex justify-evenly items-center">
					<span>{isVerified && <GoVerified />}</span>
					<span>
						AED {price} {rentFrequency && `/${rentFrequency}`}
					</span>
					<div>
						<Image
							src={agency?.logo?.url}
							width="50px"
							height="50px"
							layout="intrinsic"
							className="object-fit"
						/>
					</div>
				</div>
				<div className="flex justify-evenly items-center py-4 bg-yellow-400">
					<span className="flex gap-2 items-center">
						<span>{rooms}</span> <FaBed />
					</span>
					<span className="flex gap-2 items-center">
						<span>{baths}</span> <FaBath />
					</span>
					<span className="flex gap-2 items-center">
						<span>{millify(area)} sqft</span> <BsGridFill />
					</span>
				</div>
				<div className="flex justify-start pl-2 py-2 bg-yellow-200">
					{title.length > 30
						? `${title.substring(0, 30)} ...`
						: title}
				</div>
			</div>
		</Link>
	);
};

export default Property;
