import clsx from "clsx";

const Button = ({ 
  id, 
  title, 
  rightIcon, 
  leftIcon, 
  containerClass, 
  onClick,
  mailto,
  subject = "Business Inquiry",
  body = "Hello, I'm interested in learning more about DreamSkrin's services."
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Button clicked!', { mailto, onClick }); // Debug log
    
    if (mailto) {
      const mailtoUrl = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      console.log('Opening mailto:', mailtoUrl); // Debug log
      
      // Try multiple methods to ensure it works
      try {
        window.location.href = mailtoUrl;
      } catch (error) {
        console.error('Error opening mailto:', error);
        // Fallback method
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.click();
      }
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      type="button"
      style={{ pointerEvents: 'auto' }}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transition-all duration-300 hover:scale-105",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;