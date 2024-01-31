import Image from 'next/image';
import { useEffect, useState } from 'react';

import landingPageStepperStyle from '@/components/LandingPageStepper/landingPageStepper.module.scss';
import circleIcon from '@/public/assets/icons/ellipse.svg';
import lineIcon from '@/public/assets/icons/vectorLine.svg';

interface LandingPageStepperProp {
  index: number;
  inView: boolean;
}

const LandingPageStepper = ({ index, inView }: LandingPageStepperProp) => {
  const [isVisible, setIsVisible] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let timer: any;

    if (inView) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, index * 1000);
    }

    setIsVisible(false);
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <div
      className={`${landingPageStepperStyle.stepperWrapper} ${isVisible ? landingPageStepperStyle.visible : landingPageStepperStyle.blur}`}
    >
      {index !== 0 && <Image src={lineIcon} alt="stepper line icon" />}

      <Image src={circleIcon} alt="stepper circle icon" />
    </div>
  );
};

export default LandingPageStepper;
