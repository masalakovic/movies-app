import {forwardRef, InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  name: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({label, error, leftIcon, name, id, required, className, ...props}, ref) => {
    const inputId = id || name;

    return (
      <div
        className={`flex flex-col gap-1 w-full ${
          className ? className?.trim() : ''
        }`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm sm:text-base text-zinc-500 dark:text-zinc-200 self-start"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 lg:left-4 text-zinc-500 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            className={`pr-3 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 w-full border rounded-md outline-none h-9
              focus:border-blue-600 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
              hover:cursor-pointer hover:border-blue-500 dark:hover:border-blue-500
              text-sm sm:text-base text-zinc-900 dark:text-zinc-100
              ${error ? 'input-error' : ''}
              ${leftIcon ? 'pl-10 lg:pl-12' : 'pl-3'}`}
            {...props}
          />
        </div>

        {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;
