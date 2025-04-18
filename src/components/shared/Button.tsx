import {ButtonVariant} from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  leftIcon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`rounded-lg cursor-pointer font-medium px-4 transition h-9 sm:h-10 text-base sm:text-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed 
        btn-${variant} 
        ${className?.trim()}`}
      {...props}
    >
      {leftIcon && <span className="icon-wrapper">{leftIcon}</span>}
      {children ? children : ''}
    </button>
  );
};

export default Button;
