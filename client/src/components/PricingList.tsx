import { useNavigateTo } from "../hooks";
import { useAuthSlice } from "../hooks/useAuthSlice";

export const PricingList = ({ title, titleColor, background, price, items }) => {
  console.log(title);

  const { handleNavigate } = useNavigateTo();
  const { user } = useAuthSlice();
  const handleRedirect = () => {
    if (!user) handleNavigate("/auth/register");
    handleNavigate("/dashboard");
  };

  return (
    <div
      className={`${titleColor} ${background} flex-col rounded-xl lg:shadow-lg md:shadow-lg  lg:shadow-primary/50 md:shadow-primary/50 ${
        title === "Éstandar" && "lg:scale-110 md:scale-110"
      } lg:w-[440px] lg:h-[580px] md:w-[360px]  md:h-[500px] sm:h-[460px] relative p-6 `}
    >
      <span className='font-poppins ml-4 lg:text-3xl md:text-2xl sm:text-3xl  font-bold'>{title}</span>
      <div>
        <ul className='list-disc ml-6 p-2 space-y-4 font-poppins lg:mt-10 md:mt-6 sm:mt-6 lg:text-lg md:text-normal'>
          {items.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <span className='font-bold font-manrope lg:text-4xl md:text-2xl sm:text-4xl absolute right-0 left-0 bottom-28 text-center'>{price}</span>
      <button
        onClick={handleRedirect}
        className={`${
          background === "bg-primary" ? "bg-tertiary text-primary hover:bg-secondary hover:text-tertiary" : "bg-primary text-tertiary hover:bg-secondary"
        } duration-300  absolute right-0 left-0 bottom-6 p-3 rounded-3xl  w-fit text-center justify-center mx-auto`}
      >
        Comienza ya!
      </button>
    </div>
  );
};
