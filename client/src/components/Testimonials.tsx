export const Testimonials = () => {
  return (
    <div className='min-w-screen bg-primary lg:h-[300px] md:h-[300px] sm:h-fit sm:pb-10 text-tertiary font-inter mb-12'>
      <div className='flex flex-col sm:ml-10 sm:mr-10'>
        <div className='lg:text-4xl md:text-4xl sm:text-3xl font-bold lg:ml-28 md:ml-28  mt-10'>
          Everyone <span className='text-secondary'>loves</span> it!
        </div>
        <section className='lg:flex-row md:flex-row sm:flex sm:flex-col mr-14  lg:justify-between lg:ml-28 md:justify-around mt-10'>
          <div className='lg:w-1/6 md:w-1/6 sm:w-5/6 italic sm:mb-8'>
            “Our surveys weave the fabric of our team's success. Paired with retrospectives, a narrative of growth and continuous improvement.”
          </div>
          <div className='lg:w-1/6 md:w-1/6 sm:w-5/6 italic sm:mb-8'>
            "Essencia App redefines teamwork. Surveys capture our pulse, retrospectives turn insights into action. A game-changer for success!"
          </div>
          <div className='lg:w-1/6 md:w-1/6 sm:w-5/6 italic sm:mb-8'>“No more boring meeting. We always having fun and laught”</div>
        </section>
      </div>
    </div>
  );
};
