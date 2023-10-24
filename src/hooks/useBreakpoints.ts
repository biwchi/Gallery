import { Breakpoints } from "@/common";
import { useEffect, useState } from "react";

const breakpointsOff = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export function useBreakpoints() {
  const [breakpoint, setBreakpoint] = useState<Breakpoints>(breakpointsOff);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    if (0 < windowSize.width && windowSize.width < 600) {
      setBreakpoint({ ...breakpointsOff, xs: true });
    }
    if (600 < windowSize.width && windowSize.width < 960) {
      setBreakpoint({ ...breakpointsOff, sm: true });
    }
    if (960 < windowSize.width && windowSize.width < 1280) {
      setBreakpoint({ ...breakpointsOff, md: true });
    }
    if (1280 < windowSize.width && windowSize.width < 1920) {
      setBreakpoint({ ...breakpointsOff, lg: true });
    }
    if (windowSize.width >= 1920) {
      setBreakpoint({ ...breakpointsOff, xl: true });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  return {
    breakpoint,
    windowSize,
  };
}
