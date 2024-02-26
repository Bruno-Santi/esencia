import React, { useState } from "react";
import { useAuthSlice } from "../../hooks/useAuthSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { startLoginMember } = useAuthSlice();
  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log("Email:", email);
    console.log("Password:", password);
    const data = { email, password };
    startLoginMember(data);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-primary'>
      <div className='justify-center items-center text-center w-2/6 absolute lg:top-48 md:top-24 space-y-2'>
        <h2 className='text-tertiary font-poppins text-4xl'>
          Bienvenido a <span className='text-secondary'>Esencia</span>.
        </h2>
        <p className='font-poppins text-tertiary text-lg'>
          A continuación puedes ingresar a la plataforma con las credenciales que te enviamos por correo electrónico.
        </p>
      </div>
      <div className='max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md mt-10'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>Iniciar sesión</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Correo electrónico
            </label>
            <input
              type='email'
              className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Contraseña
            </label>
            <input
              type='password'
              className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full bg-primary duration-300 hover:bg-secondary hover:text-tertiary text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:bg-opacity-75'
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
