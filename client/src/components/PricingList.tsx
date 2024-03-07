export const PricingList = ({ item }) => {
  console.log(item);

  return (
    <div
      className={`${item.titleColor} ${item.background} flex-col rounded-xl shadow-lg shadow-primary/50 ${
        item.title === "Standard" && "scale-110"
      } lg:w-[440px]  lg:h-[580px] md:w-[360px]  md:h-[500px] relative p-6`}
    >
      <span className='font-poppins ml-4 lg:text-3xl md:text-2xl font-bold'>{item.title}</span>
      <div>
        <ul className='list-disc ml-6 p-2 space-y-4 font-poppins lg:mt-10 md:mt-6 lg:text-lg md:text-normal'>
          {item.items.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
      <span className='font-bold font-manrope lg:text-4xl md:text-2xl absolute right-0 left-0 bottom-28 text-center'>{item.price}</span>
      <button
        className={`${
          item.background === "bg-primary" ? "bg-tertiary text-primary hover:bg-secondary hover:text-tertiary" : "bg-primary text-tertiary hover:bg-secondary"
        } duration-300  absolute right-0 left-0 bottom-6 p-3 rounded-3xl  w-fit text-center justify-center mx-auto`}
      >
        Get Started
      </button>
    </div>
  );
};
