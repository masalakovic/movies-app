import {FaStar} from 'react-icons/fa';

interface RatingProps {
  vote: number;
}

const Rating: React.FC<RatingProps> = ({vote}) => {
  return (
    <div className="text-yellow-500 bg-yellow-100 dark:bg-yellow-700/40 border border-yellow-500 h-9 w-fit px-4 rounded-full flex gap-1 sm:gap-2 flex-nowrap items-center">
      <FaStar />

      <span className="whitespace-nowrap text-xs sm:text-sm">
        {vote.toFixed(1)} / 10
      </span>
    </div>
  );
};

export default Rating;
