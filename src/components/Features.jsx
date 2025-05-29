import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = "ontouchstart" in window || window.innerWidth < 768;
    setIsMobile(mobileCheck);
    if (mobileCheck) {
      setTransformStyle("perspective(1000px) rotateX(2deg) rotateY(-2deg) scale3d(1,1,1)");
    }
  }, []);

  const calculateTilt = (clientX, clientY) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (clientX - left) / width;
    const relativeY = (clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;
    return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
  };

  const frameId = useRef(null);
  const pendingTransform = useRef(null);

  const updateTransform = () => {
    if (pendingTransform.current) {
      setTransformStyle(pendingTransform.current);
      pendingTransform.current = null;
    }
    frameId.current = null;
  };

  const requestUpdate = (newTransform) => {
    pendingTransform.current = newTransform;
    if (!frameId.current) {
      frameId.current = requestAnimationFrame(updateTransform);
    }
  };

  const handleMouseMove = (event) => {
    if (isMobile) return;
    const newTransform = calculateTilt(event.clientX, event.clientY);
    if (newTransform) requestUpdate(newTransform);
  };

  const handleTouchMove = (event) => {
    if (!isMobile) return;
    if (event.touches.length === 0) return;
    const touch = event.touches[0];
    const newTransform = calculateTilt(touch.clientX, touch.clientY);
    if (newTransform) requestUpdate(newTransform);
  };

  const resetTransform = () => {
    if (isMobile) {
      setTransformStyle("perspective(1000px) rotateX(2deg) rotateY(-2deg) scale3d(1, 1, 1)");
    } else {
      setTransformStyle("");
    }
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ease-out touch-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTransform}
      style={{
        transform: transformStyle,
        touchAction: "none" 
      }}
    >
      {children}
    </div>
  );
};

const ImageCard = ({ src, isBig = false, className = "" }) => (
  <div
    className={`relative h-full w-full overflow-hidden rounded-xl ${
      isBig ? "border border-gray-700/40 shadow-sm" : ""
    } ${className}`}
  >
    {src && (
      <img
        src={src}
        alt=""
        className={`absolute inset-0 h-full w-full ${
          isBig ? "object-cover" : "object-contain"
        }`}
        draggable={false}
      />
    )}
  </div>
);

const Features = () => {
  return (
    <section className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="text-lg text-blue-50 md:text-xl">Into the Digital Revolution</p>
          <p className="mt-4 text-base text-blue-50/60 md:text-lg">
            Immerse yourself in a rich and ever-expanding universe where a vibrant array of
            services converge into an interconnected growth experience for your brand
          </p>
        </div>

        <BentoTilt className="mb-8">
          <ImageCard src="img/1.jpg" isBig className="h-[400px] md:h-[500px]" />
        </BentoTilt>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BentoTilt>
            <ImageCard src="img/1.jpg" className="h-[300px]" />
          </BentoTilt>

          <BentoTilt>
            <ImageCard src="img/1.jpg" className="h-[300px]" />
          </BentoTilt>

          <BentoTilt>
            <div className="flex h-[300px] flex-col justify-between rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 p-6">
              <h1 className="max-w-48 text-2xl font-bold text-black md:text-3xl">
                M<span className="font-black">o</span>re co
                <span className="font-black">m</span>ing s
                <span className="font-black">o</span>on.
              </h1>
              <ArrowUpRight className="ml-auto h-8 w-8 text-black" />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
