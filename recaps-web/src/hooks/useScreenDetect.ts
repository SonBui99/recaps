import { useCallback, useEffect, useState } from 'react';

const getScreenDetect = (width: number) => {
  const isMediumScreen = () => Boolean(width <= 768);
  const isLargeScreen = () => Boolean(width > 768);

  return {
    isMediumScreen,
    isLargeScreen,
    currentWidthScreen: width,
  };
};

const useScreenDetect = (initialScreenWidth: number = 0) => {
  const [currentDeviceWidth, setCurrentDeviceWidth] = useState<number>(initialScreenWidth);

  const handleResize = useCallback(() => {
    setCurrentDeviceWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setCurrentDeviceWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.addEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return getScreenDetect(currentDeviceWidth);
};

export default useScreenDetect;
