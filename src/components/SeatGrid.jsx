import Seat from "./Seat";
import Empty from "./Empty";

const SeatGrid = ({
  seats,
  selectedSeats,
  setSelectedSeats,
}) => {
  if (!seats?.length) {
    return (
      <Empty message="No Seats Available" />
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {seats.map((seat) => (
        <Seat
          key={seat._id}
          seat={seat}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      ))}
    </div>
  );
};

export default SeatGrid;