import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "../components/Loading";
import Error from "../components/Error";
import SeatGrid from "../components/SeatGrid";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reservation, setReservation] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [reserving, setReserving] = useState(false);
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();

  const fetchEventDetails = async () => {
    try {
      setError("");
      setLoading(true);

      const response = await api.get(`/events/${id}`);

      if (response.data.success) {
        setEvent(response.data.event);
        setSeats(response.data.seats);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch event",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const handleReservationExpire = async () => {
    toast.error("Reservation expired");

    setReservation(null);
    setShowTimer(false);
    setSelectedSeats([]);
    localStorage.removeItem("reservation");

    await fetchEventDetails();
  };

  const reserveSeats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);

      toast.error("Please login to reserve seats");

      navigate("/login");

      return;
    }

    if (!selectedSeats.length) {
      toast.error("Please select seats");
      return;
    }

    if (reservation) {
      toast.error(
        "You already have an active reservation. Complete booking or wait for expiry.",
      );
      return;
    }

    try {
      setReserving(true);

      const response = await api.post(
        "/reserve",
        {
          eventId: event._id,
          seatNumbers: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setReservation(response.data.reservation);
        setShowTimer(true);

        toast.success(response.data.message);

        localStorage.setItem(
          "reservation",
          JSON.stringify(response.data.reservation),
        );

        await fetchEventDetails();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reservation failed");
    } finally {
      setReserving(false);
    }
  };

  const confirmBooking = async () => {
    if (!reservation) {
      toast.error("Please reserve seats first");
      return;
    }

    try {
      setBooking(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/bookings",
        {
          reservationId: reservation._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setBookingSuccess(true);
        setSelectedSeats([]);
        setShowTimer(false);
        setReservation(null);

        localStorage.removeItem("reservation");

        await fetchEventDetails();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    const savedReservation = localStorage.getItem("reservation");

    if (savedReservation) {
      const reservationData = JSON.parse(savedReservation);

      if (new Date(reservationData.expiresAt) > new Date()) {
        setReservation(reservationData);

        setShowTimer(true);
      } else {
        localStorage.removeItem("reservation");
      }
    }
  }, []);

  if (loading) {
    return <Loading message="Loading Event..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Event Not Found
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold">{event.name}</h1>

          <p className="mt-3 text-gray-600">Venue: {event.venue}</p>

          <p className="text-gray-600">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>

          <p className="text-gray-600">Total Seats: {event.totalSeats}</p>

          <div className="mt-10">
            <SeatGrid
              seats={seats}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
          </div>

          <div className="mt-8 bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold text-lg">Selected Seats</h2>

            <p className="mt-2">
              {selectedSeats.length
                ? selectedSeats.join(", ")
                : "No seat selected"}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={reserveSeats}
              disabled={reserving}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {reserving ? "Reserving..." : "Reserve Seats"}
            </button>

            <button
              onClick={confirmBooking}
              disabled={!reservation || booking}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>
          </div>

          {showTimer && reservation && (
            <CountdownTimer
              expiresAt={reservation.expiresAt}
              onExpire={handleReservationExpire}
            />
          )}

          {bookingSuccess && (
            <div className="mt-6 bg-green-100 border border-green-500 text-green-700 p-4 rounded-lg">
              Booking Confirmed Successfully 🎉
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
