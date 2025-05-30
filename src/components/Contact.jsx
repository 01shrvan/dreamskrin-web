import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const Contact = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:mail@dreamskrin.com";
  };

  return (
    <div id="contact" className="my-20 w-full px-6 sm:px-12 lg:px-20">
      <div className="relative rounded-lg bg-black py-24 text-blue-50">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
          <p className="mb-8 font-general text-xs uppercase sm:text-sm tracking-widest">
            Ready to Transform Your Business?
          </p>

          <AnimatedTitle
            title={`let&#39;s c<b>r</b>eate something <br /> extraord<b>i</b>nary <br /> t<b>o</b>gether.`}
            className="
              special-font
              font-zentry
              font-black
              leading-[0.9]
              text-[3.4rem]
              sm:text-[4.5rem]
              md:text-[5.5rem]
              lg:text-[6.5rem]
              max-w-full
              break-words
              whitespace-pre-line
              tracking-tight
            "
          />

          <div onClick={handleContactClick} className="mt-12">
            <Button
              title="start your journey"
              containerClass="cursor-pointer"
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
