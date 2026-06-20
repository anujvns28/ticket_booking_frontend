import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged Out");

  navigate("/login");
};

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/events"
          className="text-2xl font-bold text-blue-600"
        >
          SortMyScene
        </Link>

        <div className="flex items-center gap-4">

          <Link
            to="/events"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Events
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  Logout
</button>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;