'use client';

import { useEffect, useRef } from 'react';

const useClickOutside = ({ ref, callback }: { ref: any; callback: any }) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickedOutside = (e: any) => {
      if (!ref.current || !callbackRef) {
        return;
      }
      if (!(ref?.current?.contains(e.target) && callbackRef.current)) {
        callbackRef.current();
      }
    };
    window.document.addEventListener('click', handleClickedOutside, true);

    return () => {
      window.document.removeEventListener('click', handleClickedOutside, true);
    };
  }, [callbackRef, callback, ref]);
};

export { useClickOutside };
