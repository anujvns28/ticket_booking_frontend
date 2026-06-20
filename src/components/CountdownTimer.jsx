import { useEffect, useState } from "react";

const CountdownTimer = ({
  expiresAt,
  onExpire,
}) => {
  const calculateTimeLeft = () => {
    const difference =
      new Date(expiresAt).getTime() -
      Date.now();

    return Math.max(
      0,
      Math.floor(difference / 1000)
    );
  };

  const [timeLeft, setTimeLeft] =
    useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining =
        calculateTimeLeft();

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);

        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds = timeLeft % 60;

  return (
    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mt-6">
      <h3 className="font-semibold text-yellow-700">
        Reservation Expires In
      </h3>

      <p className="text-2xl font-bold mt-2">
        {String(minutes).padStart(
          2,
          "0"
        )}
        :
        {String(seconds).padStart(
          2,
          "0"
        )}
      </p>
    </div>
  );
};

export default CountdownTimer;