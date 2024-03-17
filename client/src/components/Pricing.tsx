import { pricingItems } from "../helpers/pricing";
import { PricingList } from "./PricingList";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
export const Pricing = () => {
  console.log(pricingItems[0]);

  return (
    <section className='flex flex-col text-primary font-inter mt-16'>
      <h1 className='text-3xl font-bold  lg:ml-44 md:ml-28 sm:ml-10'>Pricing</h1>
      <section className='md:flex-row lg:flex-row sm:flex sm:flex-col justify-between  mt-20 mb-20 lg:justify-center md:justify-center     '>
        <div className='sm:block lg:hidden md:hidden sm:mx-6'>
          <Slide autoPlay={false} transitionDuration={500}>
            <PricingList {...pricingItems[0]} />
            <PricingList {...pricingItems[1]} />
            <PricingList {...pricingItems[2]} />
          </Slide>
        </div>
        <div className='lg:flex  md:flex sm:hidden lg:space-x-10 md:space-x-10  '>
          <PricingList {...pricingItems[0]} />
          <PricingList {...pricingItems[1]} />
          <PricingList {...pricingItems[2]} />
        </div>
      </section>
    </section>
  );
};
