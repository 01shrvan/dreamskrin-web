import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const handleContactClick = () => {
    window.location.href =
      mailto="mail@dreamskrin.com";
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Ready to Transform Your Business?
          </p>

          <AnimatedTitle
            title="let&#39;s c<b>r</b>eate something <br /> extraord<b>i</b>nary <br /> t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <div onClick={handleContactClick}>
            <Button
              title="start your journey"
              containerClass="mt-10 cursor-pointer"
              mailto="mail@dreamskrin.com"
              subject="Business Inquiry"
              body="Hello, I'm interested in learning more about DreamSkrin's services."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
