import { useState } from "react";
import { filterData, getFilterValues } from "../utils/filterData";
import { useRouter } from "next/router";

const SearchFilters = () => {
	const [filters, setFilters] = useState(filterData);
	const router = useRouter();

	console.log(router.pathname);

	const searchProperties = (filterValues) => {
		const path = router.pathname;
		const { query } = router;

		console.log(query);

		const values = getFilterValues(filterValues);
		console.log(values);
		values.forEach((item) => {
			if (item.value && filterValues?.[item.name]) {
				// this condition to prevent the bug happens when adding more filters to set the query in the url of the whole filterValues (only the clicked filterValues)
				return (query[item.name] = item.value);
			}
		});

		router.push({ pathname: path, query });

		console.log(path);
	};

	return (
		<div className="sm:container mx-auto  mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
			{filters.map((filter) => {
				return (
					<div className="flex flex-col" key={filter.queryName}>
						<label className="text-sm" htmlFor={filter.placeholder}>
							{filter.placeholder}
						</label>

						<select
							onChange={(e) =>
								searchProperties({
									[filter.queryName]: e.target.value,
								})
							}
							className="p-4 cursor-pointer bg-sky-100"
						>
							{filter?.items?.map((item) => {
								return (
									<option
										className="mt-4 bg-sky-700 text-white"
										value={item.value}
										key={item.value}
									>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
				);
			})}
		</div>
	);
};

export default SearchFilters;
