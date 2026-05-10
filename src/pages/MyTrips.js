import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";

import {
  getTrips,
  deleteTrip
} from "../services/tripService";

function MyTrips() {

  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {

    try {

      const response = await getTrips();

      setTrips(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {

    try {

      await deleteTrip(id);

      fetchTrips();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold text-indigo-700 mb-10">
          My Trips 🌍
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {trips.map((trip) => (

            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={handleDelete}
            />

          ))}

        </div>

      </div>

    </div>

  );
}

export default MyTrips;