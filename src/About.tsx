import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className='AboutPage mx-4 space-y-4'>
      <div className='w-fit-content'>
        <h2 className='text-4xl'>Our Mission</h2>
        <div className='border-2 border-red-600'></div>
      </div>
      <div className='text-lg w-1/3 space-y-4'>
        <p>
          In today's world, it can be difficult for aspiring artists to
          get their name out there. Barriers such as more traditionalist museums
          and critics prevent new and innovative forms. Social media platforms lack 
          the focus required for a bright and artistic community to thrive.
        </p>
        <p>
          Our platform exists to give you artists an equal and fair voice.
        </p>
        <p>
          There are no barriers here to upload your work, gain attention, and gain acclaim. Artists, critics,
          and the public alike can view your work. All you need to do is click upload.
        </p>
        <p>
          In addition, our world gallery map helps artists from traditionally underrepresented
          countries and cultures find prominence and attention.
          These artists' works can find their way to anyone's eyes easier than ever before.
        </p>
      </div>
      <div className='mt-40 w-fit-content'>
        <h2 className='text-5xl'>
          Join Us, and Change the World
        </h2>
        <div className='border-2 border-red-600'></div>
      </div>
    </div>
  );
}
export default AboutPage;