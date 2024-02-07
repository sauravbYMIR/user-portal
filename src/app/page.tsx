'use client';

import { FbtAccordion, FbtButton } from '@frontbase/components-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import pageStyle from '@/app/page.module.scss';
import AccordionItem from '@/components/AccordionItem/AccordionItem';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LandingPageContentCard from '@/components/LandingPageContentCard/LandingPageContentCard';
import LandingPageImage from '@/components/LandingPageImage/LandingPageImage';
import LandingPageStepper from '@/components/LandingPageStepper/LandingPageStepper';
import { useScreenWidth } from '@/hooks/useWindowWidth';
import appointmentIcon from '@/public/assets/icons/landingPageAppointment.svg';
import bandageIcon from '@/public/assets/icons/landingPageBandage.svg';
import hospitalIcon from '@/public/assets/icons/landingPageHospital.svg';
import locationIcon from '@/public/assets/icons/landingPageLocation.svg';
import mobileAppointmentIcon from '@/public/assets/icons/mobileLandingAppoint.svg';
import mobileBandageIcon from '@/public/assets/icons/mobileLandingBandage.svg';
import mobileHospitalIcon from '@/public/assets/icons/mobileLandingHospital.svg';
import mobileLocationIcon from '@/public/assets/icons/mobileLandingLocation.svg';

import carouselActiveCircle from '../../public/assets/icons/carouselActiveCircle.svg';
import carouselCircle from '../../public/assets/icons/carouselCircle.svg';
import arrowIcon from '../../public/assets/icons/whiteArrow.svg';
import hosiptalImg1 from '../../public/assets/images/hospitalImg1.png';
import hosiptalImg1Tag from '../../public/assets/images/hospitalImg1Tag.svg';
import hosiptalImg2 from '../../public/assets/images/hospitalImg2.png';
import hosiptalImg2Tag from '../../public/assets/images/hospitalImg2Tag.svg';
import hosiptalImg3 from '../../public/assets/images/hospitalImg3.png';
import hosiptalImg3Tag from '../../public/assets/images/hospitalImg3Tag.svg';
import landingPageBannerImg from '../../public/assets/images/landingPageBannerImg.png';

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

const images = [hosiptalImg1, hosiptalImg2, hosiptalImg3];
const imagesTag = [hosiptalImg1Tag, hosiptalImg2Tag, hosiptalImg3Tag];

const faqData = [
  {
    question: 'Is it accessible?',
    ans: 'In publishing and graphic design, Lorem ipsum In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conte.',
  },
  {
    question: 'Is it Useful?',
    ans: 'In publishing and graphic design, Lorem ipsum In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conte.',
  },
  {
    question: 'What is the specifications of the product?',
    ans: 'In publishing and graphic design, Lorem ipsum In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful conte.',
  },
];

const landingPageIconList = [
  { src: locationIcon, alt: 'location icon' },
  { src: bandageIcon, alt: 'bandage icon' },
  { src: hospitalIcon, alt: 'hospital icon' },
  { src: appointmentIcon, alt: 'appointment icon' },
];

const landingMobIconList = [
  { src: mobileLocationIcon, alt: 'location icon' },
  { src: mobileBandageIcon, alt: 'bandage icon' },
  { src: mobileHospitalIcon, alt: 'hospital icon' },
  { src: mobileAppointmentIcon, alt: 'appointment icon' },
];

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { matches } = useScreenWidth(500);

  const howItWorksRef = useRef(null);
  const ourHospitalRef = useRef(null);
  const faqsRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { ref: section3Ref, inView: section3InView } = useInView({
    threshold: 0,
  });

  const stepCount = 4;

  return (
    <div>
      <Header
        howItWorksRef={howItWorksRef}
        ourHospitalRef={ourHospitalRef}
        faqsRef={faqsRef}
      />

      <div className={pageStyle.firstSectionContainer}>
        <div className={pageStyle.firstSecLeftContainer}>
          <div className={pageStyle.firstSecLeftWrapper}>
            <h1 className={pageStyle.firstSecTitle}>
              Are you still <br /> waiting in line for <br /> treatment?
            </h1>
            <p className={pageStyle.firstSecDesc}>
              Making it easier for EU & EEA citizens to get access to treatments
              through our network of premium hospitals
            </p>

            <FbtButton
              className={pageStyle.landingPageCtaBtn}
              size="sm"
              variant="solid"
            >
              <p className={pageStyle.ctaBtnText}>Get me started</p>
              <Image src={arrowIcon} alt="arrow icon cta button" />
            </FbtButton>
          </div>
        </div>

        <div className={pageStyle.firstSecRightContainer}>
          <Image
            className={pageStyle.landingPageBannerImg}
            width={matches ? 375 : 571}
            height={matches ? 340 : 601}
            src={landingPageBannerImg}
            alt="landing page banner img"
          />
        </div>
      </div>

      <div ref={howItWorksRef} className={pageStyle.secondSectionMainContainer}>
        <h1 className={pageStyle.secondSecTitle}>Getting started is easy</h1>

        <div ref={ref} className={pageStyle.secondSectionContainer}>
          <div className={pageStyle.imgComponentWrapper}>
            {matches
              ? landingMobIconList.map(({ src, alt }, index) => {
                  return (
                    <LandingPageImage
                      key={alt}
                      src={src}
                      alt={alt}
                      index={index}
                      inView={inView}
                    />
                  );
                })
              : landingPageIconList.map(({ src, alt }, index) => {
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

        {!matches && (
          <FbtButton
            className={pageStyle.secondSecCtaBtn}
            size="sm"
            variant="solid"
          >
            <p className={pageStyle.secondSecCtaBtnText}>Get me started</p>
            <Image src={arrowIcon} alt="arrow icon cta button" />
          </FbtButton>
        )}
      </div>

      <div ref={ourHospitalRef} className={pageStyle.thirdSectionContainer}>
        <div className={pageStyle.hospitalInfoContainer}>
          <div
            ref={section3Ref}
            className={`${pageStyle.hospitalInfoInnerContainer} ${section3InView ? pageStyle.visible : pageStyle.blur}`}
          >
            <h1
              className={`${pageStyle.hospitalInfoTitle} ${section3InView && matches && pageStyle.titleAnimateMobile} ${section3InView && !matches && pageStyle.titleAnimate}`}
            >
              Hospitals <br /> vetted for you
            </h1>

            <div className={pageStyle.hospitalInfoDescContainer}>
              <p className={pageStyle.hospitalInfoDesc}>
                With low MRSA-risk, extensive experience all{matches && <br />}
                our partner
                {!matches && <br />}
                hospitals offer the highest{matches && <br />} quality health
                care
              </p>

              <p className={pageStyle.hospitalInfoDesc}>
                The average waiting time for a treatment at{matches && <br />}
                one of out partner
                {!matches && <br />} hospitals is 1- 6 weeks
              </p>
            </div>
          </div>
        </div>

        <div className={pageStyle.hospitalImgCarouselContainer}>
          <Image
            className={pageStyle.carouselImg}
            width={535}
            height={matches ? 386 : 768}
            src={images[currentIndex] || hosiptalImg1}
            alt="carousel img"
          />

          <Image
            className={pageStyle.carouselImgTag}
            src={imagesTag[currentIndex] || ''}
            alt="carousel image tag"
          />

          <div className={pageStyle.carouselImgCircleContainer}>
            <Image
              src={currentIndex === 0 ? carouselActiveCircle : carouselCircle}
              alt="carousel image cicle"
              width={matches ? 12 : 16}
              height={matches ? 12 : 16}
            />

            <Image
              src={currentIndex === 1 ? carouselActiveCircle : carouselCircle}
              alt="carousel image cicle"
              width={matches ? 12 : 16}
              height={matches ? 12 : 16}
            />

            <Image
              src={currentIndex === 2 ? carouselActiveCircle : carouselCircle}
              alt="carousel image cicle"
              width={matches ? 12 : 16}
              height={matches ? 12 : 16}
            />
          </div>
        </div>
      </div>

      <div ref={faqsRef} className={pageStyle.faqSectionContainer}>
        <h1 className={pageStyle.faqSectionTitle}>FAQs</h1>

        <p className={pageStyle.faqSectionDesc}>
          Get started within minutes and take charge of your own health.
        </p>

        <div className={pageStyle.faqContainer}>
          <FbtAccordion
            type="single"
            collapsible
            className={pageStyle.faqAccordion}
          >
            {faqData.map(({ question, ans }, index) => {
              return (
                <AccordionItem
                  key={question}
                  value={`${index}`}
                  question={question}
                  ans={ans}
                />
              );
            })}
          </FbtAccordion>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
