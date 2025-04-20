import {NavLink} from 'react-router-dom';
import {TbDeviceTvFilled} from 'react-icons/tb';
import {IoIosHeart} from 'react-icons/io';
import useUser from '../../context/useUser';
import {ListType} from '../../enums';

interface NavItemProps {
  type: ListType;
}

const NavItem: React.FC<NavItemProps> = ({type}) => {
  const {watchList, favorites} = useUser();

  const isFavorite = type === ListType.FAVORITES;
  const to = isFavorite ? '/favorites' : '/watchlist';
  const label = isFavorite ? 'Favorites' : 'WatchList';
  const Icon = isFavorite ? IoIosHeart : TbDeviceTvFilled;
  const activeColor = isFavorite ? 'text-pink-500' : 'text-green-500';
  const hoverColor = isFavorite
    ? 'hover:text-pink-500'
    : 'hover:text-green-500';

  const count = isFavorite ? favorites.length : watchList.length;

  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `h-9 flex items-center gap-0 sm:gap-2 transition-colors ${
          isActive ? activeColor : `text-zinc-500 ${hoverColor}`
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <p className="flex items-center">
        <span className="hidden sm:inline">{label}</span>
        {count > 0 && (
          <span className="ml-1 text-xs sm:text-sm">({count})</span>
        )}
      </p>
    </NavLink>
  );
};

export default NavItem;
