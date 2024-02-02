'use client';

import {
  FbtAccordion,
  FbtButton,
  FbtHeader,
  FbtHeaderBrand,
  FbtHeaderContent,
  FbtHeaderItem,
  FbtHeaderMenu,
  FbtHeaderMenuItem,
  FbtHeaderMenuToggle,
} from '@frontbase/components-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import pageStyle from '@/app/page.module.scss';
import AccordionItem from '@/components/AccordionItem/AccordionItem';
import LandingPageContentCard from '@/components/LandingPageContentCard/LandingPageContentCard';
import LandingPageImage from '@/components/LandingPageImage/LandingPageImage';
import LandingPageStepper from '@/components/LandingPageStepper/LandingPageStepper';
import appointmentIcon from '@/public/assets/icons/landingPageAppointment.svg';
import bandageIcon from '@/public/assets/icons/landingPageBandage.svg';
import hospitalIcon from '@/public/assets/icons/landingPageHospital.svg';
import locationIcon from '@/public/assets/icons/landingPageLocation.svg';

import arrowIcon from '../../public/assets/icons/whiteArrow.svg';
import brandLogo from '../../public/assets/images/brandLogo.svg';
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

const menuItems = ['How it works', 'Our Hospitals', 'FAQs'];

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

function LandingPage() {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const stepCount = 4;

  return (
    <div>
      <FbtHeader className={pageStyle.headerContainer}>
        <FbtHeaderBrand>
          <Image alt="branch icon" src={brandLogo} />
        </FbtHeaderBrand>

        <FbtHeaderContent className={pageStyle.headerLinkContainer}>
          <FbtHeaderItem>
            <Link className={pageStyle.headerLink} href="./">
              How it works
            </Link>
          </FbtHeaderItem>

          <FbtHeaderItem>
            <Link className={pageStyle.headerLink} href="./">
              Our Hospitals
            </Link>
          </FbtHeaderItem>

          <FbtHeaderItem>
            <Link className={pageStyle.headerLink} href="./">
              FAQS
            </Link>
          </FbtHeaderItem>
        </FbtHeaderContent>

        <FbtHeaderContent>
          <FbtHeaderItem>
            <FbtButton
              className={pageStyle.headerLoginBtn}
              size="lg"
              variant="outline"
            >
              Log in
            </FbtButton>
          </FbtHeaderItem>
        </FbtHeaderContent>

        <FbtHeaderMenuToggle
          clickHandler={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
          isMenuOpen={isHeaderMenuOpen}
        />

        {isHeaderMenuOpen && (
          <FbtHeaderMenu>
            {menuItems.map((menu) => {
              return (
                <FbtHeaderMenuItem className={pageStyle.liWrapper} key={menu}>
                  <Link className={pageStyle.menuItem} href="./">
                    {menu}
                  </Link>
                </FbtHeaderMenuItem>
              );
            })}

            <FbtHeaderMenuItem className={pageStyle.liWrapper}>
              <Link className={pageStyle.menuItem} href="./">
                Log in
              </Link>
            </FbtHeaderMenuItem>
          </FbtHeaderMenu>
        )}
      </FbtHeader>

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
          <Image src={landingPageBannerImg} alt="landing page banner img" />
        </div>
      </div>

      <div className={pageStyle.secondSectionMainContainer}>
        <h1 className={pageStyle.secondSecTitle}>Getting started is easy</h1>

        <div ref={ref} className={pageStyle.secondSectionContainer}>
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

        <FbtButton
          className={pageStyle.secondSecCtaBtn}
          size="sm"
          variant="solid"
        >
          <p className={pageStyle.secondSecCtaBtnText}>Get me started</p>
          <Image src={arrowIcon} alt="arrow icon cta button" />
        </FbtButton>
      </div>

      <div className={pageStyle.faqSectionContainer}>
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
    </div>
  );
}

export default LandingPage;
