import { useForm } from "react-hook-form";
import { Divider } from ".";
import { useNavigateTo } from "../hooks";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { renderErrorMessage } from "../helpers/renderErrorMessage";

export const RegisterForm = () => {
  const { loading, startRegisteringUser, errorMessage } = useAuthSlice();
  const { handleNavigate } = useNavigateTo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => startRegisteringUser(data);
  console.log(errors);

  return (
    <section>
      <form className='flex flex-col space-y-2 pt-4 w-[250px]' onSubmit={handleSubmit(onSubmit)}>
        <label className=' text-tertiary text-lg font-normal' htmlFor='name'>
          Name (*)
        </label>
        <input
          className='h-12 w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
          type='text'
          placeholder='Name'
          {...register("first_name", {
            required: "This field is required",
            maxLength: 20,
          })}
        />
        {errors.name && <p className='w-fit text-red-500 font-poppins m-auto'>{renderErrorMessage(errors.name)}</p>}

        <label className=' text-tertiary text-lg font-normal' htmlFor='email'>
          Email (*)
        </label>
        <input
          className='h-12 w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
          type='email'
          placeholder='Email'
          {...register("email", {
            required: "This field is required",
            maxLength: 40,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          })}
        />
        {errors.email && <p className='w-fit text-red-500 font-poppins m-auto'>{renderErrorMessage(errors.email)}</p>}
        <label className=' text-tertiary text-lg font-normal' htmlFor='password'>
          Password (*)
        </label>
        <input
          className='h-12 w-64 rounded-md p-2 text-sm font-thin  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
          type='password'
          {...register("password", {
            required: "This field is required",

            pattern: {
              value: /.{8,}$/,
              message: "The password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <p className='w-fit text-red-500 font-poppins m-auto'>{renderErrorMessage(errors.password)}</p>
        )}

        <button
          type='submit'
          disabled={loading}
          className={
            loading
              ? "btn-disabled  p-2 rounded-lg font-poppins text-lg"
              : "btn-primary p-2 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
          }
        >
          Register
        </button>
        {errorMessage && <p className='font-poppins text-red-500 m-auto'>{errorMessage}</p>}
      </form>
      <div className='m-auto flex flex-col'>
        <div className='mt-6'>
          <Divider width={"w-[400px]"} />
        </div>
        <span
          onClick={() => handleNavigate("/auth/login")}
          className='text-tertiary font-normal mt-6 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '
        >
          Have an account? <span>Log In</span>
        </span>
      </div>
    </section>
  );
};
