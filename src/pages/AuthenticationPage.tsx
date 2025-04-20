import {useState} from 'react';
import RegisterForm from '../components/fragments/RegisterForm';
import SignInForm from '../components/fragments/SignInForm';
import Button from '../components/shared/Button';
import {ButtonVariant} from '../enums';

const AuthenticationPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex sm:items-center sm:justify-center mt-16 pt-4 sm:pt-8">
      <div
        className={`w-full pb-4 px-4 sm:p-6 sm:mx-8 sm:rounded-2xl sm:shadow-lg flex flex-col
          sm:bg-white dark:sm:bg-zinc-700 sm:border sm:border-zinc-100 dark:sm:border-zinc-800
          ${isRegistering ? 'sm:max-w-2xl' : 'sm:max-w-xl'}`}
      >
        <h1 className="text-blue-600 mb-8">
          {isRegistering ? 'Register' : 'Sign In'}
        </h1>

        {isRegistering ? <RegisterForm /> : <SignInForm />}

        <div className="mt-4 text-center text-sm sm:text-base dark:text-zinc-200">
          <p className="block sm:inline">
            {isRegistering
              ? 'Already have an account? '
              : "Don't have an account? "}
          </p>
          <p className="block sm:inline">
            Click&#32;
            <Button
              className="inline"
              variant={ButtonVariant.UNDERLINED}
              onClick={() => setIsRegistering((prev) => !prev)}
            >
              here
            </Button>
            &#32; to {isRegistering ? 'Sign In' : 'Register'}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
