import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Shows the brand loader on every route change (skipped on the very first
 * render, where the static HTML splash in index.html already runs).
 */
const RouteTransition = () => {
  const { pathname } = useLocation();
  const isFirst = useRef(true);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    setFading(false);
    setVisible(true);

    const fadeTimer = window.setTimeout(() => setFading(true), 900);
    const hideTimer = window.setTimeout(() => setVisible(false), 1250);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-white transition-opacity duration-[350ms] ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/loading-logo.png"
        alt=""
        width={320}
        height={400}
        className="h-40 w-32 object-contain animate-fade-in"
      />
      <p className="mt-6 h-7 font-serif text-xl leading-7 tracking-[0.1em] text-[#413432]">
        KÜHEYLAN HUKUK
      </p>
      <div className="route-rule mt-8 h-0.5 w-[220px] rounded-full bg-[#A80B06]" />
    </div>
  );
};

export default RouteTransition;
