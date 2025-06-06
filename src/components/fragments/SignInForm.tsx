import {useForm} from 'react-hook-form';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/firebase';
import Input from '../shared/Input';
import Button from '../shared/Button';
import {toast} from 'react-toastify';

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Success!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:p-4 grid grid-cols-1 gap-4"
    >
      <Input
        required
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        })}
        error={errors.email?.message}
      />
      <Input
        required
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
        })}
        error={errors.password?.message}
      />
      <div className="col-span-1 flex sm:justify-end mt-2">
        <Button type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
