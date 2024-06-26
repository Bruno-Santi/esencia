import { useDocumentTitle, useNavigateTo } from "../../hooks";
import { useAuthSlice } from "../../hooks/useAuthSlice";
import { OnBoardingLayout } from "../../layaout";

export const Welcome = () => {
  useDocumentTitle("Onboard | Esencia.app");
  const { handleNavigate } = useNavigateTo();
  const { user } = useAuthSlice();
  console.log(user);

  return (
    <OnBoardingLayout>
      <div className='flex flex-col justify-center md:w-2/6 lg:w-2/6 sm:w-4/6 m-auto animate__animated animate__fadeIn animate__slower'>
        <div className='text-center'>
          <span className='md:w-2/3 lg:w-2/3 sm:w-full font-bold text-center font-manrope sm:text-4xl md:text-3xl lg:text-6xl text-tertiary mx-auto'>
            Bienvenido, <span className='text-secondary'>{user.name}</span>
          </span>
        </div>
        <span className='font-poppins font-light text-tertiary md:text-lg lg:text-2xl text-center sm:w-full md:w-2/3 lg:w-2/3 mx-auto sm:mt-10 md:mt-20 lg:mt-20'>
          Solo quedan unos pocos pasos antes de sumergirte en el mundo del Liderazgo Ágil con {""}
          <span className='text-secondary'>Esencia.app</span>.
        </span>
        <button
          onClick={() => handleNavigate("/onboarding/stepone")}
          className='btn-primary p-2 md:w-2/6 lg:w-2/6 mx-auto md:mt-20 lg:mt-20 sm:mt-10 rounded-lg font-poppins lg:text-lg md:text-sm duration-700 hover:bg-tertiary hover:text-primary'
        >
          Continuar
        </button>
      </div>
    </OnBoardingLayout>
  );
};
