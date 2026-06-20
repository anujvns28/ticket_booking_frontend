import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5">

      <h2 className="text-xl font-bold">
        {event.name}
      </h2>

      <p className="mt-2 text-gray-600">
        Venue: {event.venue}
      </p>

      <p className="text-gray-600">
  Date:{" "}
  {new Date(event.date).toLocaleDateString()}
</p>

      <p className="text-gray-600">
        Total Seats: {event.totalSeats}
      </p>

      <Link
        to={`/events/${event._id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        View Seats
      </Link>
    </div>
  );
};

export default EventCard;