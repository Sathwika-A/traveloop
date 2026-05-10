import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

      <h1
        onClick={() => navigate(token ? "/dashboard" : "/")}
        className="text-3xl font-bold text-indigo-700 cursor-pointer"
      >
        Traveloop ✈️
      </h1>

      <div className="flex gap-6 items-center">

        {
          token ? (

            <>

              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Link>

              <Link
                to="/my-trips"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                My Trips
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Signup
              </Link>

            </>

          )
        }

      </div>

    </nav>

  );
}

export default Navbar;