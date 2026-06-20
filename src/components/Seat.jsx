const Seat = ({
  seat,
  selectedSeats,
  setSelectedSeats,
}) => {
  const isSelected = selectedSeats.includes(
    seat.seatNumber
  );

  const handleClick = () => {
    if (seat.status !== "available") return;

    if (isSelected) {
      setSelectedSeats((prev) =>
        prev.filter(
          (s) => s !== seat.seatNumber
        )
      );
    } else {
      setSelectedSeats((prev) => [
        ...prev,
        seat.seatNumber,
      ]);
    }
  };

  let color = "bg-green-500";

  if (seat.status === "reserved") {
    color = "bg-yellow-500";
  }

  if (seat.status === "booked") {
    color = "bg-red-500";
  }

  if (
    seat.status === "available" &&
    isSelected
  ) {
    color = "bg-blue-600";
  }

  return (
    <button
      onClick={handleClick}
      disabled={
        seat.status !== "available"
      }
      className={`${color}
      h-12
      w-12
      rounded-lg
      text-white
      font-medium
      transition
      hover:scale-105
      disabled:cursor-not-allowed`}
    >
      {seat.seatNumber}
    </button>
  );
};

export default Seat;