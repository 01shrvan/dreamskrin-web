import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const dreamSkrinRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useGSAP(() => {
    gsap.set("#hero-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#hero-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#hero-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.fromTo(
      dreamSkrinRef.current,
      {
        scale: 1,
        opacity: 0.15,
      },
      {
        scale: 3,
        opacity: 0.05,
        scrollTrigger: {
          trigger: "#hero-frame",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });

  const handleContactClick = () => {
    window.location.href =
      "mailto:hello@dreamskrin.com?subject=Let's Get Started&body=Hi there! I'm interested in transforming my brand with DreamSkrin. Let's discuss how we can work together.";
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="hero-frame"
        className="relative z-10 h-dvh w-screen overflow-visible rounded-lg bg-black"
      >
        <div
          ref={dreamSkrinRef}
          className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-none overflow-visible"
        >
          <h1 className="special-font text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black text-white opacity-40 md:opacity-30 leading-none whitespace-nowrap">
            <b>DS</b>
          </h1>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          INNOV<b>A</b>TION
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-white">
              revo<b>l</b>ution
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-white">
              Transform Your Digital Presence <br /> Accelerate Business Growth
            </p>
            <Button
              id="cta"
              title="transform now"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1 cursor-pointer"
              mailto="mail@dreamskrin.com"
              subject="Let's Get Started"
              body="Hi there! I'm interested in transforming my brand with DreamSkrin. Let's discuss how we can work together."
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        INNOV<b>A</b>TION
      </h1>
    </div>
  );
};

export default Hero;
