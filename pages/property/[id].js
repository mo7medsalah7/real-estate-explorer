import { baseUrl, fetchApi } from "../../utils/fetchApi";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import defaultImage from "../../public/assets/images/defaultImage.jpg";

const PropertyDetails = ({
	details: {
		title,
		price,
		rentFrequency,
		rooms,
		baths,
		isVerified,
		area,
		agency,
		description,
		purpose,
		type,
		furnishingStatus,
		photos,
		amenities,
	},
}) => {
	console.log(baseUrl);
	return (
		<div>
			<div className=" container mx-auto ">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
					{photos.slice(1, 7).map((photo) => {
						return (
							<Image
								key={photo.id}
								src={photo.url}
								width="300px"
								height="300px"
								layout="intrinsic"
								alt={photo.id}
							/>
						);
					})}
				</div>

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
				<div className="flex mt-2 font-bold justify-start text-xl pl-2 py-2 ">
					{title}
				</div>
				<div>
					<p className="mt-2 mb-4 text-gray-700 text-lg">
						{description}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
					<div className="flex justify-evenly items-center">
						<span>TYPE: </span>
						<span className="font-bold text-lg capitalize ">
							{type}
						</span>
					</div>
					<div className="flex justify-evenly items-center">
						<span>Purpose: </span>
						<span className="font-bold text-lg capitalize ">
							{purpose}
						</span>
					</div>
					{furnishingStatus && (
						<div className="flex justify-evenly items-center">
							<span>Furnishing Status: </span>
							<span className="font-bold text-lg capitalize ">
								{furnishingStatus}
							</span>
						</div>
					)}
				</div>
				<div className="container mx-auto flex flex-col">
					{amenities.length && (
						<span className="text-lg font-bold mt-6 mb-4">
							Amenties:{" "}
						</span>
					)}

					<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
						{amenities.map((item) => {
							return item.amenities.map((amenitiy) => {
								return (
									<span
										className="bg-sky-200 p-4 flex items-center justify-items-start text-sky-700"
										key={amenitiy.text}
									>
										{amenitiy.text}
									</span>
								);
							});
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
	const data = await fetchApi(
		`${baseUrl}/properties/detail?externalID=${id}`
	);

	return {
		props: {
			details: data,
		},
	};
}
