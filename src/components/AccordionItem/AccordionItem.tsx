import {
  FbtAccordionContent,
  FbtAccordionItem,
  FbtAccordionTrigger,
} from '@frontbase/components-react';
import { useEffect, useRef } from 'react';

import accordionItemStyle from './accordionItem.module.scss';

interface AccordionItemType {
  value: string;
  question: string;
  ans: string;
}

function AccordionItem({ value, question, ans }: AccordionItemType) {
  const accordionContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (accordionContentRef.current) {
      accordionContentRef.current.style.background = 'white';
    }
  }, []);

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
