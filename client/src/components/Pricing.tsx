import { pricingItems } from "../helpers/pricing";
import { PricingList } from "./PricingList";

export const Pricing = () => {
  return (
    <section className='flex flex-col text-primary font-inter'>
      <h1 className='text-4xl font-bold  ml-36'>Pricing</h1>
      <section className='flex justify-between  mt-20 mb-20 lg:mx-60 md:mx-28 '>
        {pricingItems.map((item) => {
          return <PricingList item={item} />;
        })}
      </section>
    </section>
  );
};
