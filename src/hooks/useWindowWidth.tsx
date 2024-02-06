import * as React from 'react';

export const useScreenWidth = (
  width: number,
): { matches: boolean; setMatches: (value: boolean) => void } => {
  const [matches, setMatches] = React.useState<boolean>(false);

  const updateTarget = React.useCallback((e: { matches: boolean }) => {
    if (e.matches) {
      setMatches(true);
    } else {
      setMatches(false);
    }
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', updateTarget);

    if (media.matches) {
      setMatches(true);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, [updateTarget, width]);

  return {
    matches,
    setMatches,
  };
};
