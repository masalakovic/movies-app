import {useForm} from 'react-hook-form';
import Input from '../shared/Input';
import Button from '../shared/Button';
import {auth} from '../../utils/firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${data.name} ${data.lastName}`,
      });

      console.log(user);
      //TODO: toast
    } catch (error) {
      console.error(error);
      //TODO: toast
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:p-4 grid grid-cols-2 gap-4"
    >
      <Input
        required
        className="col-span-2 sm:col-span-1"
        label="Name"
        {...register('name', {
          required: 'Name is required',
        })}
        error={errors.name?.message}
      />

      <Input
        required
        className="col-span-2 sm:col-span-1"
        label="Last Name"
        {...register('lastName', {
          required: 'Last name is required',
        })}
        error={errors.lastName?.message}
      />

      <Input
        required
        className="col-span-2"
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
        className="col-span-2"
        label="Password"
        type="password"
        {...register('password', {
          required: 'Password is required',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message:
              'Password must be at least 8 characters long and include uppercase, lowercase, and a number',
          },
        })}
        error={errors.password?.message}
      />

      <div className="col-span-2 flex sm:justify-end mt-2">
        <Button type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
