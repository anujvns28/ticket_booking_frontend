import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import Error from "../components/Error";

import api from "../services/api";
import Navbar from "../components/Navbar";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/events");

      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch events"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

  if (loading)
    return <Loading message="Loading Events..." />;

  if (error)
    return <Error message={error} />;

  if (events.length === 0)
    return <Empty message="No Events Found" />;

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          Available Events
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}
        </div>

      </div>

    </div>
    </>
  );
};

export default Events;