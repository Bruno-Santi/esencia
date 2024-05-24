import { useForm } from "react-hook-form";
import { Divider } from "./";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { useNavigateTo } from "../hooks";
import { renderErrorMessage } from "../helpers/renderErrorMessage";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { SignIn } from "../auth/helpers/SignIn";

export const LoginForm = () => {
  const { startLoginUser, loading, errorMessage, cleanErrorMessage } = useAuthSlice();
  const { handleNavigate } = useNavigateTo();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    startLoginUser({ email, password });
  };
  console.log(errors);
  const handleVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <>
      <form className='flex flex-col space-y-6 pt-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col '>
          <label className=' text-tertiary md:text-md font-poppins  lg:text-lg font-normal' htmlFor='email'>
            Email
          </label>
          <input
            autoComplete='off'
            type='email'
            className='md:h-12 lg:h-12 sm:h-12 w-23 rounded-md p-2 text-sm font-normal font-poppins  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 '
            placeholder='Email'
            {...register("email", {
              required: "This field is required",
              min: 5,
              maxLength: 30,
            })}
          />
          {errors.email && <span className='text-lg m-auto text-red-500 font-normal'>{errors.email.message}</span>}{" "}
        </div>
        <div className='flex flex-col relative'>
          <label className=' text-tertiary font-poppins  text-lg font-normal' htmlFor='password'>
            Contraseña
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            autoComplete='off'
            className='h-12 w-68 rounded-md p-2 text-sm font-normal font-poppins  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80'
            placeholder='Password'
            {...register("password", {
              required: "This field is required",
              maxLength: {
                value: 30,
                message: "La contraseña no puede tener más de 30 caracteres",
              },
            })}
          />
          <p className='absolute right-5 top-11'>
            {passwordVisible ? (
              <MdOutlineVisibility onClick={handleVisibility} className='text-xl text-primary/50 cursor-pointer' />
            ) : (
              <MdOutlineVisibilityOff onClick={handleVisibility} className='text-xl text-primary/50 cursor-pointer' />
            )}
          </p>
          {errors.Password && <span className='text-lg m-auto text-red-500 font-normal'>{renderErrorMessage(errors.Password)}</span>}
        </div>
        <button
          type='submit'
          disabled={loading}
          className={
            loading
              ? "btn-disabled  w-3/4 sm:w-full justify-center items-center text-center mx-auto mt-10 p-2 rounded-lg font-poppins text-lg"
              : "btn-primary  w-3/4  sm:w-full justify-center items-center text-center mx-auto mt-10 p-2 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
          }
        >
          Ingresar
        </button>

        {errorMessage && <p className='font-poppins text-red-500 m-auto'>{errorMessage}</p>}
      </form>
      <SignIn />
      <span className='text-tertiary sm:w-[200px] font-normal mt-6 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '>
        Olvidé mi contraseña.
      </span>
      <div className='pt-10'>
        <Divider width={"w-[400px]"} />
      </div>
      <span className='text-tertiary font-normal mt-10 font-poppins  text-lg m-auto  duration-500 '>
        ¿Nuevo en Esencia?{" "}
        <span
          onClick={() => {
            cleanErrorMessage();
            handleNavigate("/auth/register");
          }}
          className='text-secondary duration-300 cursor-pointer hover:text-tertiary'
        >
          Registrate
        </span>
      </span>
    </>
  );
};
