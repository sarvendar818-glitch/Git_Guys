'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimateOnScroll({ children, animationClass = "animate-fadeInUp", delay = "0ms" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${isVisible ? animationClass : 'opacity-0'}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}
