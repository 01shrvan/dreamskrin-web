import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  const handleDiscoverClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="story" className="min-h-screen w-full bg-black text-blue-50 flex flex-col items-center py-10 px-4 md:px-20">
      <p className="font-general text-sm uppercase md:text-xs mb-2">
        Comprehensive Digital Excellence
      </p>

      <AnimatedTitle
        title="the p<b>o</b>wer of <br /> strategic innov<b>a</b>tion"
        containerClass="pointer-events-none mix-blend-difference relative z-10 text-center md:text-left mb-8"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full max-w-7xl gap-10">
        {/* Text Section */}
        <div className="flex flex-col max-w-md text-center md:text-left">
          <p className="font-circular-web text-violet-50 mb-6">
            Where innovation meets execution, DreamSkrin transforms businesses through strategic digital solutions. Experience unprecedented growth through our comprehensive approach to brand development, digital marketing, and customer engagement. Your success story begins here.
          </p>
          <div className="self-center md:self-start">
            <Button
              id="realm-btn"
              title="explore solutions"
              containerClass="cursor-pointer"
              onClick={handleDiscoverClick}
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end max-w-md w-full">
          <img
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseLeave}
            onMouseEnter={handleMouseLeave}
            src="/img/entrance.png"
            alt="entrance.png"
            className="object-contain max-w-full max-h-80 md:max-h-[28rem] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
