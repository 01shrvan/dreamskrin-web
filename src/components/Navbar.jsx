import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Button from "./Button";

// Register the ScrollTo plugin
gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "Nexus", id: "features" }, // Maps to Features section
  { name: "Vault", id: "story" },    // Maps to Story section  
  { name: "Prologue", id: "story" }, // Also maps to Story section
  { name: "About", id: "about" },    // Maps to About section
  { name: "Contact", id: "contact" } // Maps to Contact section
];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Smooth scroll to section with GSAP
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    // Add active state animation to the clicked link
    const clickedLink = event.currentTarget;
    gsap.to(clickedLink, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Smooth scroll animation
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: targetElement,
        offsetY: 80, // Account for fixed navbar height
      },
      ease: "power3.inOut",
      onStart: () => {
        // Add a subtle pulse effect to the target section
        gsap.fromTo(targetElement, 
          { 
            scale: 1,
            transformOrigin: "center center"
          },
          {
            scale: 1.02,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
          }
        );
      },
      onComplete: () => {
        setActiveSection(sectionId);
        
        // Add a subtle highlight effect
        gsap.fromTo(targetElement,
          {
            boxShadow: "0 0 0 rgba(139, 92, 246, 0)"
          },
          {
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          }
        );
      }
    });
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Handle navbar visibility and floating state
  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate navbar visibility
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-80px 0px -50% 0px"
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className={clsx(
                    "nav-hover-btn transition-all duration-300 hover:text-violet-300",
                    {
                      "text-violet-400 after:scale-x-100": activeSection === item.id,
                      "text-blue-50": activeSection !== item.id
                    }
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;