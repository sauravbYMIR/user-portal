import { useEffect, useRef } from 'react';

import accordionItemStyle from '@/components/AccordionItem/accordionItem.module.scss';
import { useScreenWidth } from '@/hooks/useWindowWidth';

import {
  FbtAccordionContent,
  FbtAccordionItem,
  FbtAccordionTrigger,
} from '../ui';

interface AccordionItemType {
  value: string;
  question: string;
  ans: string;
}

function AccordionItem({ value, question, ans }: AccordionItemType) {
  const accordionContentRef = useRef<HTMLDivElement | null>(null);
  const { matches } = useScreenWidth(500);

  useEffect(() => {
    if (accordionContentRef.current) {
      accordionContentRef.current.style.background = 'white';

      if (matches) {
        accordionContentRef.current.style.padding = '4px 8px';
      } else {
        accordionContentRef.current.style.padding = '20px 28px';
      }
    }
  }, [matches]);

  return (
    <FbtAccordionItem
      className={accordionItemStyle.faqAccordionItem}
      value={value}
    >
      <FbtAccordionTrigger
        className={accordionItemStyle.faqAccordionItemTrigger}
      >
        {question}
      </FbtAccordionTrigger>

      <FbtAccordionContent
        ref={accordionContentRef}
        className={accordionItemStyle.faqAccordionItemContent}
      >
        {ans}
      </FbtAccordionContent>
    </FbtAccordionItem>
  );
}

export default AccordionItem;
