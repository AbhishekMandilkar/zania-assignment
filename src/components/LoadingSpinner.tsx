import loader from "../assets/loader.svg";

const LoadingSpinner = (props: {
    size?: number;
}) => {
    const { size = 24 } = props;
  return <img className="spinning" src={loader} alt="loading spinner" style={{ width: size, height: size }} />;
};

export default LoadingSpinner;
