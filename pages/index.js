import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Property from "../components/Property";

import { fetchApi, baseUrl } from "../utils/fetchApi";

export default function Home({ propertiesForRent, propertiesForSale }) {
	console.log(propertiesForRent, propertiesForSale);
	return (
		<main>
			<div className="flex flex-col sm:gap-20 md:gap-30 gap-40">
				<Banner
					purpose="For Rent"
					title1="Rental homes for everyone"
					title2=""
					description="expolre villas, apartment and more"
					linkName="/search?purpose=for-rent"
					imageUrl="https://images.bayut.com/thumbnails/168824276-800x600.webp"
					buttonText="Rent"
				/>
				<div className="container mx-auto shadow-lg shadow-grey-400">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{propertiesForRent.map((property) => (
							<Property property={property} />
						))}
					</div>
				</div>
				<Banner
					purpose="For Buy"
					title1="Buy homes for everyone"
					title2=""
					description="expolre villas, apartment and more"
					linkName="/search?purpose=for-sell"
					imageUrl="https://images.bayut.com/thumbnails/172207708-800x600.webp"
					buttonText="Buy"
				/>

				<div className="container mx-auto shadow-lg shadow-grey-400">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{propertiesForSale.map((property) => (
							<Property property={property} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

export async function getStaticProps() {
	const propertiesForRent = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
	);
	const propertiesForSale = await fetchApi(
		`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
	);

	return {
		props: {
			propertiesForRent: propertiesForRent?.hits,
			propertiesForSale: propertiesForSale?.hits,
		},
	};
}
