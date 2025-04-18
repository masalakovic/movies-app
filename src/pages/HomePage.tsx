import {signOut} from 'firebase/auth';
import {auth} from '../utils/firebase';
import Button from '../components/shared/Button';

const Home: React.FC = () => {
  const onSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      //TODO: toast
    }
  };

  return (
    <>
      <Button onClick={onSignOut}>Log out</Button>
    </>
  );
};

export default Home;
