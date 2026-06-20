const Empty = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl text-gray-500">
        {message}
      </h2>
    </div>
  );
};

export default Empty;