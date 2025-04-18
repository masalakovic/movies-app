import {InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  name: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  name,
  id,
  required,
  className,
  ...props
}) => {
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
          className="block text-sm sm:text-base text-zinc-500 self-start"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="icon-wrapper absolute left-3 lg:left-4 text-gray-500 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          className={`pr-3 bg-white border-gray-300 w-full border rounded-md outline-none h-9 sm:h-10 focus:ring-1 focus:ring-blue-500  focus:border-blue-500 text-sm sm:text-base;
            ${error ? 'input-error' : ''} ${
            leftIcon ? 'pl-10 lg:pl-12' : 'pl-3'
          }`}
          {...props}
        />
      </div>

      {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
