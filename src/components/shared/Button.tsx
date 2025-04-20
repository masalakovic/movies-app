import {ButtonVariant} from '../../enums';

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
      className={`rounded-lg cursor-pointer px-4 font-semibold transition h-9 text-sm sm:text-base flex items-center flex-nowrap justify-center gap-2 disabled:cursor-not-allowed 
        btn-${variant} 
        ${className ? className.trim() : ''}`}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children ? children : ''}
    </button>
  );
};

export default Button;
