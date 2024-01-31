import Image from 'next/image';
import { useEffect, useState } from 'react';

import pageStyle from '@/app/page.module.scss';
import arrowIcon from '@/public/assets/icons/arrowForward.svg';

interface LandingPageImageProp {
  src: any;
  alt: string;
  index: number;
  inView: boolean;
}

function LandingPageImage({ src, alt, index, inView }: LandingPageImageProp) {
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
      className={`${pageStyle.animationImgWrapper} ${isVisible ? pageStyle.visible : pageStyle.blur}`}
    >
      <Image key={alt} src={src} alt={alt} width={85} height={85} />

      {index !== 3 && (
        <Image
          src={arrowIcon}
          alt="arrow forward icon"
          width={20}
          height={20}
        />
      )}
    </div>
  );
}

export default LandingPageImage;
