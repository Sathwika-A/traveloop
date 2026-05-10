import axios from "axios";

const API = "http://localhost:5000/api/trips";

export const createTrip = async (tripData) => {

    const token = localStorage.getItem("token");

    return await axios.post(
        `${API}/create`,
        tripData,
        {
            headers: {
                authorization: token
            }
        }
    );
};

export const getTrips = async () => {

    const token = localStorage.getItem("token");

    return await axios.get(
        `${API}/all`,
        {
            headers: {
                authorization: token
            }
        }
    );
};

export const deleteTrip = async (id) => {

    const token = localStorage.getItem("token");

    return await axios.delete(
        `${API}/${id}`,
        {
            headers: {
                authorization: token
            }
        }
    );
};

export const updateTrip = async (id, tripData) => {

    const token = localStorage.getItem("token");

    return await axios.put(

        `${API}/update/${id}`,

        tripData,

        {
            headers: {
                authorization: token
            }
        }

    );

};