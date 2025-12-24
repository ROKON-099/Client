const LoadingSpinner = ({ size = "lg", fullScreen = true }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <span className={`loading loading-spinner loading-${size} text-primary`} />
    </div>
  );
};

export default LoadingSpinner;
