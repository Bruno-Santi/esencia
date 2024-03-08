import { pricingItems } from "../helpers/pricing";
import { PricingList } from "./PricingList";

export const Pricing = () => {
  return (
    <section className='flex flex-col text-primary font-inter mt-16'>
      <h1 className='text-4xl font-bold  ml-36'>Pricing</h1>
      <section className='md:flex-row lg:flex-row sm:flex sm:flex-col justify-between  mt-20 mb-20 lg:mx-60 md:space-x-16 md:mx-16 md:px-6  '>
        {pricingItems.map((item) => {
          return <PricingList item={item} />;
        })}
      </section>
    </section>
  );
};
