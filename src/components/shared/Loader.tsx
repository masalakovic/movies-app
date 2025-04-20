interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({className}) => {
  return (
    <div
      className={`flex items-center justify-center h-full  ${
        className ? className.trim() : ''
      }`}
    >
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
