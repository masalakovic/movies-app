import useUser from '../context/useUser';
import {IoSearch, IoFilter} from 'react-icons/io5';
import {ButtonVariant} from '../enums';
import Button from '../components/shared/Button';
import {useLocation} from 'react-router-dom';
import NavItem from '../components/shared/NavItem';
import AvatarMenu from '../components/fragments/AvatarMenu';
import {ListType} from '../enums';
import {PanelType} from '../enums';
import ThemeToggle from '../components/shared/ThemeToggler';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenFilter: () => void;
  activePanel: PanelType | null;
}

const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenFilter,
  activePanel,
}) => {
  const {user} = useUser();
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <header className="fixed top-0 left-0  w-full h-16 bg-zinc-100 dark:bg-zinc-900 z-50 px-6 flex items-center">
      {user && (
        <div className="flex gap-4 items-center justify-between w-full">
          <div className="flex gap-4 sm:gap-8 items-center">
            {/* watch list, fav list */}
            <nav className=" flex gap-4 items-center font-semibold">
              <NavItem type={ListType.WATCH_LIST} />
              <NavItem type={ListType.FAVORITES} />
            </nav>

            {/* search and filter btns */}
            {isHomePage && (
              <div className="flex gap-4 items-center border-l border-zinc-800 dark:border-zinc-300 pl-4 sm:pl-8">
                <Button
                  variant={
                    activePanel === PanelType.SEARCH
                      ? ButtonVariant.SECONDARY
                      : ButtonVariant.MUTED
                  }
                  leftIcon={<IoSearch />}
                  onClick={onOpenSearch}
                  children={<span className="hidden sm:flex ">Search</span>}
                />
                <Button
                  variant={
                    activePanel === PanelType.FILTERS
                      ? ButtonVariant.SECONDARY
                      : ButtonVariant.MUTED
                  }
                  leftIcon={<IoFilter />}
                  onClick={onOpenFilter}
                  children={<span className="hidden sm:flex ">Filters</span>}
                />
              </div>
            )}
          </div>

          <AvatarMenu />
        </div>
      )}
      <ThemeToggle className={`${user ? 'ml-4' : 'ml-auto'}`} />
    </header>
  );
};

export default Header;
