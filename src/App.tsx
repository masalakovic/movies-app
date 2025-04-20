import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/firebase';
import useUser from './context/useUser';
import Loader from './components/shared/Loader';
import Header from './layout/Header';
import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from './router/ProtectedRoute';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {PanelType} from './enums';
import {saveGenresToStorage} from './utils';
import useFetchGenres from './hooks/useFetchGenres';
import {ToastContainer} from 'react-toastify';

const AuthenticationPage = React.lazy(
  () => import('./pages/AuthenticationPage')
);
const HomePage = React.lazy(() => import('./pages/HomePage'));
const MoviePage = React.lazy(() => import('./pages/MoviePage'));
const WatchListPage = React.lazy(() => import('./pages/WatchListPage'));
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage'));

const App: React.FC = () => {
  const navigate = useNavigate();
  const {addUser, removeUser} = useUser();
  const [activePanel, setActivePanel] = useState<PanelType | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();

  const {genres, loading} = useFetchGenres();

  const handleOpenSearch = () => {
    setActivePanel((prev) =>
      prev === PanelType.SEARCH ? null : PanelType.SEARCH
    );
  };
  const handleOpenFilter = () => {
    setActivePanel((prev) =>
      prev === PanelType.FILTERS ? null : PanelType.FILTERS
    );
  };
  const handleClosePanel = () => setActivePanel(null);

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

  useEffect(() => {
    setActivePanel(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && genres.length > 0) {
      saveGenresToStorage(genres);
    }
  }, [genres]);

  return (
    <>
      <Header
        onOpenSearch={handleOpenSearch}
        onOpenFilter={handleOpenFilter}
        activePanel={activePanel}
      />
      <main className="h-[calc(100vh-10rem)] mt-16">
        {authLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader />
          </div>
        ) : (
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* public */}
              <Route path="/" element={<AuthenticationPage />} />

              {/* protected */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage
                      activePanel={activePanel}
                      onCloseActivePanel={handleClosePanel}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:id"
                element={
                  <ProtectedRoute>
                    <MoviePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <WatchListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        )}
      </main>
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;
