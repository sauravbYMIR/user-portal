'use client';

import { useInView } from 'react-intersection-observer';

import pageStyle from '@/app/page.module.scss';
import LandingPageContentCard from '@/components/LandingPageContentCard/LandingPageContentCard';
import LandingPageImage from '@/components/LandingPageImage/LandingPageImage';
import LandingPageStepper from '@/components/LandingPageStepper/LandingPageStepper';
import appointmentIcon from '@/public/assets/icons/landingPageAppointment.svg';
import bandageIcon from '@/public/assets/icons/landingPageBandage.svg';
import hospitalIcon from '@/public/assets/icons/landingPageHospital.svg';
import locationIcon from '@/public/assets/icons/landingPageLocation.svg';

const landingCardsInfo = [
  {
    title: 'Tell us where you live',
    desc: 'To begin we are piloting with Norway and Ireland, more countries will be added in the near future.',
  },
  {
    title: 'Select the treatment you need',
    desc: 'To begin we are piloting with a limited number of non elective procedures, more procedures will be added in the near future.',
  },
  {
    title: 'Choose your preferred hospital',
    desc: 'To begin we are piloting with a limited number of Hospitals, more locations will be added in the near future.',
  },
  {
    title: 'Book your treatment',
    desc: 'Once your enquiry has been sent the hospital will be in touch with you within 48hrs to confirm and complete the booking process',
  },
];

const landingPageIconList = [
  { src: locationIcon, alt: 'location icon' },
  { src: bandageIcon, alt: 'bandage icon' },
  { src: hospitalIcon, alt: 'hospital icon' },
  { src: appointmentIcon, alt: 'appointment icon' },
];

function LandingPage() {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const stepCount = 4;

  return (
    <div>
      <div className={pageStyle.firstDiv} />
      <div ref={ref} className={pageStyle.secondDiv}>
        <div className={pageStyle.imgComponentWrapper}>
          {landingPageIconList.map(({ src, alt }, index) => {
            return (
              <LandingPageImage
                key={alt}
                src={src}
                alt={alt}
                index={index}
                inView={inView}
              />
            );
          })}
        </div>

        <div className={pageStyle.stepperContainer}>
          {Array.from({ length: stepCount }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <LandingPageStepper key={index} index={index} inView={inView} />
          ))}
        </div>

        <div className={pageStyle.cardContainer}>
          {landingCardsInfo.map(({ title, desc }, index) => (
            <LandingPageContentCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              inView={inView}
              title={title}
              desc={desc}
            />
          ))}
        </div>
      </div>
      <div className={pageStyle.firstDiv} />
    </div>
  );
}

export default LandingPage;
