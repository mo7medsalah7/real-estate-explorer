import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchFilters from "../components/SearchFilters";
import { BsFilter } from "react-icons/bs";
import noresult from "../public/assets/images/no-result.png";
import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Head from "next/head";
const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(true);
  const router = useRouter();
  return (
    <div className="">
      <Head>
        <title>Filtering You Favourite</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        className="capitalize w-full  bg-gray-300 cursor-pointer"
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
      >
        search property by filters
      </div>
      {searchFilters && <SearchFilters />}
      {/* filtering depending on purpose (buy or rent) */}
      <div className="container mx-auto py-4  my-4">
        <span className="mr-2">Properties</span>
        <span className="bg-yellow-300 p-4 italic">
          {router?.query?.purpose}
        </span>
      </div>
      {/* Mapping the result */}
      <div className="container mx-auto shadow-lg shadow-grey-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </div>
      </div>
      {/* if no result  */}
      {properties.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-6 h-screen">
          <Image
            src={noresult}
            className="object-cover"
            width="200px "
            height="200px"
            alt={"no result"}
          />

          <p className="text-lg">No Result Found</p>
        </div>
      )}
    </div>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&sort=${sort}&purpose=${purpose}&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&areaMax=${areaMax}&categoryExternalID=${categoryExternalID} hitsPerPage=6&min`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
