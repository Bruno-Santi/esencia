export const FeatureList = ({ feature }) => {
  const isOdd = feature.id % 2 !== 0;
  return (
    <div
      className={`min-w-screen lg:mb-2 md:mb-2 sm:mb-2 -space-y-10 flex md:items-center ${
        isOdd ? "lg:flex-row-reverse md:flex-row-reverse sm:flex-col" : "lg:flex-row md:flex-row sm:flex-col"
      }`}
    >
      <div className='md:w-2/6 md:order-2 items-center md:ml-40 md:mr-40 sm:mx-8 sm:text-left md:mb-0'>
        <span className='lg:text-2xl md:text-2xl sm:text-xl font-bold text-secondary'>{feature.title}</span>
        <p className='sm:text-normal lg:text-lg md:text-lg sm:text-left'>{feature.description}</p>
      </div>
      <div className={`md:w-3/6 md:order-1 sm:w-[380px]   ${isOdd ? "lg:mr-40 md:mr-40" : "lg:ml-40 md:ml-40"}`}>
        <img src={feature.image} alt={feature.title} />
      </div>
    </div>
  );
};
