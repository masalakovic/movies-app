import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Loader from '../components/shared/Loader';
import ProtectedRoute from './ProtectedRoute';

const AuthenticationPage = React.lazy(() => import('../pages/Authentication'));
const Home = React.lazy(() => import('../pages/HomePage'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/*public */}
        <Route path="/" element={<AuthenticationPage />} />

        {/*protected*/}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
