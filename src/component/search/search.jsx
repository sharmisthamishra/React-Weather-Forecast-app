import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { placeholderText, GEO_API_URL } from "../../constants/constants";
import { getApiOptions } from "../../api-requests/api-request";

const Search = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState(null);

  const handleOnChange = (searchData) => {
    setSearchText(searchData);
    console.log("yay search is working", searchData);
    onSearchChange(searchData); // to change the widget and all - will be passed from the parent component.
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        getApiOptions
      );
      const result = await response.json();
      const options = result.data.map((city) => ({
        label: `${city.name},${city.countryCode}`,
        // value: city.id,
        value: `${city.latitude} ${city.longitude}`, // using lat and long as value
      }));
      console.log(options, "this is the options");
      return {
        options,
      };
    } catch (error) {
      console.error(error);
      return {
        options: [],
      };
    }
  };

  return (
    <AsyncPaginate
      placeholder={placeholderText}
      debounceTimeout={1000}
      value={searchText}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
