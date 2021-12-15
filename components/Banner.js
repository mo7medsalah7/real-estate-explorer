import Image from "next/image";
import Link from "next/link";

function Banner({
	purpose,
	title1,
	title2,
	description,
	linkName,
	imageUrl,
	buttonText,
}) {
	return (
		<div className="flex flex-row gap-8 justify-center items-center">
			<div className="">
				<Image src={imageUrl} width="400px" height="400px" />
			</div>
			<div>
				<span className="text-2xl text-gray-400 mb-4">{purpose}</span>
				<h2 className="text-3xl font-bold mb-4">{title1}</h2>
				<h3 className="">{title2}</h3>
				<p className="capitalize text-gray-700 mb-4">{description}</p>
				<button className="bg-sky-500 text-white shadow-md rounded-md px-10 py-4 w-full m-auto text-lg hover:shadow-lg">
					<Link href={linkName} passHref>
						<p>{buttonText}</p>
					</Link>
				</button>
			</div>
		</div>
	);
}

export default Banner;
