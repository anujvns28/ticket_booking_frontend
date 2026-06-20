const Error = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl text-red-500">
        {message}
      </h2>
    </div>
  );
};

export default Error;