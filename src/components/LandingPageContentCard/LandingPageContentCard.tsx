import { useEffect, useState } from 'react';

import landingPageCardStyle from '@/components/LandingPageContentCard/landingPageCard.module.scss';

interface LandingPageCardProp {
  index: number;
  inView: boolean;
  title: string;
  desc: string;
}

const LandingPageContentCard = ({
  index,
  inView,
  title,
  desc,
}: LandingPageCardProp) => {
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
      className={`${landingPageCardStyle.card} ${isVisible ? landingPageCardStyle.visible : landingPageCardStyle.blur}`}
    >
      <h1
        style={index === 0 || index === 3 ? { padding: '0 2rem' } : {}}
        className={landingPageCardStyle.title}
      >
        {title}
      </h1>
      <p className={landingPageCardStyle.desc}>{desc}</p>
    </div>
  );
};

export default LandingPageContentCard;
