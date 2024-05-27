import { useForm } from "react-hook-form";
import { Divider } from ".";
import { useNavigateTo } from "../hooks";
import { useAuthSlice } from "../hooks/useAuthSlice";
import { renderErrorMessage } from "../helpers/renderErrorMessage";
import { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export const RegisterForm = () => {
  const { loading, startRegisteringUser, errorMessage, cleanErrorMessage } = useAuthSlice();
  const { handleNavigate } = useNavigateTo();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => startRegisteringUser(data);
  console.log(errors);
  const handleVisibility = () => setPasswordVisible(!passwordVisible);
  return (
    <section>
      <form className='flex flex-col space-y-2 pt-4 w-[250px]' onSubmit={handleSubmit(onSubmit)}>
        <label className=' text-tertiary font-poppins  text-lg font-normal' htmlFor='name'>
          Nombre <span className='text-sm'>(*)</span>
        </label>
        <input
          autoComplete='off'
          className='h-12 w-64 rounded-md p-2 font-poppins  text-sm font-normal  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 '
          type='text'
          placeholder='Nombre'
          {...register("name", {
            required: "This field is required",
            maxLength: 20,
          })}
        />
        {errors.name && <p className='w-fit text-red-500 font-poppins m-auto'>{renderErrorMessage(errors.name)}</p>}

        <label className=' text-tertiary text-lg font-poppins  font-normal' htmlFor='email'>
          Email <span className='text-sm'>(*)</span>
        </label>
        <input
          className='h-12 w-64 rounded-md p-2 text-sm font-normal  font-poppins  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 '
          type='email'
          placeholder='Email'
          autoComplete='off'
          {...register("email", {
            required: "This field is required",
            maxLength: 40,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
          })}
        />
        {errors.email && <p className='w-fit text-red-500 font-poppins   m-auto'>{renderErrorMessage(errors.email)}</p>}
        <div className='flex flex-col relative pb-2'>
          <label className=' text-tertiary text-lg font-poppins  font-normal' htmlFor='password'>
            Contraseña <span className='text-sm'>(*)</span>
          </label>
          <input
            className='h-12 w-64 rounded-md p-2 text-sm font-normal font-poppins  border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80'
            type={passwordVisible ? "text" : "password"}
            {...register("password", {
              required: "This field is required",

              pattern: {
                value: /.{8,}$/,
                message: "The password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && <p className='w-fit text-red-500 font-poppins m-auto'>{renderErrorMessage(errors.password)}</p>}
          <p className='absolute right-2 top-11'>
            {passwordVisible ? (
              <MdOutlineVisibility onClick={handleVisibility} className='text-xl text-primary/50 cursor-pointer' />
            ) : (
              <MdOutlineVisibilityOff onClick={handleVisibility} className='text-xl text-primary/50 cursor-pointer' />
            )}
          </p>
        </div>
        <button
          type='submit'
          disabled={loading}
          className={
            loading
              ? "btn-disabled  w-3/4 justify-center items-center text-center mx-auto mt-10 p-2 rounded-lg font-poppins text-lg"
              : "btn-primary w-3/4 justify-center items-center text-center mx-auto mt-10 p-2 rounded-lg font-poppins text-lg duration-700 hover:bg-tertiary hover:text-primary"
          }
        >
          Registrarme
        </button>
        {errorMessage && <p className='font-poppins text-red-500 m-auto'>{errorMessage}</p>}
      </form>
      <div className='m-auto flex flex-col'>
        <div className='mt-6'>
          <Divider width={"w-[400px]"} />
        </div>
        <span
          onClick={() => {
            cleanErrorMessage();
            handleNavigate("/auth/login");
          }}
          className='text-tertiary font-normal mt-6 font-poppins cursor-pointer text-lg m-auto  duration-500 hover:text-secondary '
        >
          ¿Ya tienes una cuenta? <span>Ingresa</span>
        </span>
      </div>
    </section>
  );
};
