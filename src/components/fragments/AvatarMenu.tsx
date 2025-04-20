import {HiMiniUserCircle} from 'react-icons/hi2';
import useUser from '../../context/useUser';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase/firebase';
import {ButtonVariant} from '../../enums';
import Dropdown from '../shared/Dropdown';
import Button from '../shared/Button';
import {TbLogout2} from 'react-icons/tb';
import {toast} from 'react-toastify';

const AvatarMenu: React.FC = () => {
  const {user} = useUser();

  const onSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  if (!user) return null;

  return (
    <Dropdown
      head={
        <div className="text-blue-600 flex font-medium gap-2 items-center">
          <HiMiniUserCircle className="text-blue-600 w-8 h-8" />
          <span className="hidden md:inline">{user.displayName}</span>
        </div>
      }
    >
      <p className="md:hidden block border-b border-zinc-300 pb-1 dark:text-zinc-50 mb-2 font-semibold">
        {user.displayName}
      </p>
      <Button
        variant={ButtonVariant.SECONDARY}
        children="Logout"
        onClick={onSignOut}
        leftIcon={<TbLogout2 />}
      />
    </Dropdown>
  );
};

export default AvatarMenu;
