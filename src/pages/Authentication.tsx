import {useState} from 'react';
import RegisterForm from '../components/fragments/RegisterForm';
import SignInForm from '../components/fragments/SignInForm';
import Button from '../components/shared/Button';
import {ButtonVariant} from '../types';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen flex sm:items-center sm:justify-center bg-white sm:bg-gray-100">
      <div className="w-full sm:max-w-xl bg-white p-6 sm:rounded-2xl sm:shadow sm:m-8">
        <h1 className="text-blue-600 mb-8">
          {isRegistering ? 'Register' : 'Sign In'}
        </h1>

        {isRegistering ? <RegisterForm /> : <SignInForm />}

        <div className="mt-4">
          <span>
            {isRegistering
              ? 'Already have an account? Click '
              : "Don't have an account? Click "}
          </span>

          <Button
            className="inline"
            variant={ButtonVariant.UNDERLINED}
            onClick={() => setIsRegistering((prev) => !prev)}
            children="here"
          />

          <span> to </span>
          <span className="font-semibold">
            {isRegistering ? 'Sign In' : 'Register'}
          </span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
