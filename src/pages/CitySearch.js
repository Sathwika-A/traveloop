import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

function CitySearch() {

  const citiesData = [

    {
      city: "Paris",
      country: "France",
      costIndex: "High",
      popularity: "★★★★★"
    },

    {
      city: "Tokyo",
      country: "Japan",
      costIndex: "High",
      popularity: "★★★★★"
    },

    {
      city: "Goa",
      country: "India",
      costIndex: "Medium",
      popularity: "★★★★☆"
    },

    {
      city: "Dubai",
      country: "UAE",
      costIndex: "High",
      popularity: "★★★★★"
    },

    {
      city: "Bali",
      country: "Indonesia",
      costIndex: "Low",
      popularity: "★★★★★"
    },

    {
      city: "Maldives",
      country: "Maldives",
      costIndex: "Very High",
      popularity: "★★★★★"
    }

  ];

  const [search, setSearch] = useState("");

  const [countryFilter, setCountryFilter] = useState("");

  const [selectedCities, setSelectedCities] = useState(() => {

    const savedCities = localStorage.getItem(
      "selectedCities"
    );

    return savedCities
      ? JSON.parse(savedCities)
      : [];

  });

  // SAVE TO LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(

      "selectedCities",

      JSON.stringify(selectedCities)

    );

  }, [selectedCities]);

  // FILTER

  const filteredCities = citiesData.filter((city) => {

    return (

      city.city.toLowerCase().includes(
        search.toLowerCase()
      )

      &&

      city.country.toLowerCase().includes(
        countryFilter.toLowerCase()
      )

    );

  });

  // ADD CITY

  const addToTrip = (city) => {

    const alreadyExists = selectedCities.find(

      (item) => item.city === city.city

    );

    if (alreadyExists) {

      alert("City already added");

      return;

    }

    setSelectedCities([

      ...selectedCities,

      city

    ]);

  };

  // REMOVE CITY

  const removeCity = (cityName) => {

    const updatedCities = selectedCities.filter(

      (city) => city.city !== cityName

    );

    setSelectedCities(updatedCities);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">

      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-5xl font-bold text-indigo-700">
            City Search 🌍
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Discover amazing cities for your trip
          </p>

          {/* SEARCH */}

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <input
              type="text"
              placeholder="Search City..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              placeholder="Filter by Country..."
              value={countryFilter}
              onChange={(e) =>
                setCountryFilter(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

          </div>

        </div>

        {/* CITY CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

          {
            filteredCities.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition"
              >

                <h2 className="text-3xl font-bold text-indigo-700">
                  {item.city}
                </h2>

                <p className="mt-4 text-gray-700">
                  🌎 Country: {item.country}
                </p>

                <p className="mt-3 text-gray-700">
                  💰 Cost Index: {item.costIndex}
                </p>

                <p className="mt-3 text-gray-700">
                  ⭐ Popularity: {item.popularity}
                </p>

                <button
                  onClick={() => addToTrip(item)}
                  className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl"
                >
                  Add To Trip
                </button>

              </div>

            ))
          }

        </div>

        {/* ADDED CITIES */}

        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-pink-700">
            Added Cities ✈️
          </h2>

          {
            selectedCities.length > 0 ? (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                {
                  selectedCities.map((city, index) => (

                    <div
                      key={index}
                      className="bg-pink-100 p-6 rounded-2xl shadow-md"
                    >

                      <h3 className="text-2xl font-bold text-pink-700">
                        {city.city}
                      </h3>

                      <p className="mt-2 text-gray-700">
                        🌎 {city.country}
                      </p>

                      <button
                        onClick={() =>
                          removeCity(city.city)
                        }
                        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
                      >
                        Remove
                      </button>

                    </div>

                  ))
                }

              </div>

            ) : (

              <p className="text-gray-500 mt-5">
                No cities added yet
              </p>

            )
          }

        </div>

      </div>

    </div>

  );
}

export default CitySearch;