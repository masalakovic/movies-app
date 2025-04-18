import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './utils/firebase';
import {useUser} from './context/UserContext';
import Loader from './components/shared/Loader';
import AppRoutes from './router/AppRoutes';

const App: React.FC = () => {
  const navigate = useNavigate();
  const {addUser, removeUser} = useUser();

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        addUser(user);
        navigate('/home', {replace: true});
      } else {
        removeUser();
        navigate('/', {replace: true});
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <Loader />;
  }

  return <AppRoutes />;
};

export default App;
