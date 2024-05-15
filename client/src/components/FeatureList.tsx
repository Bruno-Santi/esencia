export const FeatureList = ({ feature }) => {
  const isOdd = feature.id % 2 !== 0;
  return (
    <div
      className={`min-w-screen lg:mb-2 md:mb-20 sm:mb-2 -space-y-10  flex md:items-center ${
        isOdd ? "lg:flex-row-reverse md:flex-row-reverse sm:flex-col sm:items-center" : "lg:flex-row md:flex-row sm:flex-col sm:items-center"
      }`}
    >
      <div className='md:w-4/6 md:order-2 lg:w-1/3 items-center md:ml-20 md:mr-20 sm:mx-6 sm:ml-8 sm:text-left md:mb-0'>
        <span className='lg:text-2xl md:text-2xl sm:text-xl font-bold text-secondary'>{feature.title}</span>
        <span className='sm:text-normal lg:text-lg md:text-normal sm:text-left'>{feature.description}</span>
        <br></br>
        {/* <span className='p-2 rounded-md bg-primary text-tertiary font-poppins cursor-pointer mt-6 hover:bg-secondary hover:text-primary'>Quiero saber más</span> */}
      </div>
      <div className={`md:w-3/6 md:order-1 sm:w-[360px]   ${isOdd ? "lg:mr-20 md:mr-20 sm:mr-0" : "lg:ml-20 md:ml-20 sm:ml-0"}`}>
        <img src={feature.image} alt={feature.title} className='lg:scale-110 md:scale-110 sm:scale-110 sm:ml-0 sm:mt-6' />
      </div>
    </div>
  );
};
