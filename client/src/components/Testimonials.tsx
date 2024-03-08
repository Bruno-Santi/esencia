import { testimonials } from "../helpers/testimonials";
import { TestimonialItem } from "./TestimonialItem";

export const Testimonials = () => {
  return (
    <div className='min-w-screen bg-primary lg:h-[310px] md:h-[360px] sm:h-fit sm:pb-10 text-tertiary font-inter mb-12 mt-16 '>
      <div className='flex flex-col sm:ml-10 sm:mr-10'>
        <div className='lg:text-4xl md:text-4xl sm:text-3xl font-bold lg:ml-32 md:ml-28  mt-10'>
          Everyone <span className='text-secondary'>loves</span> it!
        </div>
        <section className='lg:flex-row md:flex-row sm:flex sm:flex-col   lg:justify-between lg:ml-24 md:justify-around mt-6'>
          {testimonials.map((testimonial) => {
            return <TestimonialItem key={testimonial.id} testimonial={testimonial} />;
          })}
        </section>
      </div>
    </div>
  );
};
