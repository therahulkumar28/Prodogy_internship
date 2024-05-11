import { useState, useEffect } from 'react';

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-10 shadow-md transition-colors duration-300 ease-in-out ${isScrolled ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Prodigy</div>
        <div className="flex items-center">
          <ul className={`hidden md:flex justify-between w-50% items-center space-x-4 ${isMenuOpen ? 'hidden' : 'block'}`}>
            <li><a href="/home" className={`hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>Home</a></li>
            <li><a href="/news" className={`hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>News</a></li>
            <li><a href="/contact" className={`hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>Contact</a></li>
            <li><a href="/about" className={`hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>About</a></li>
          </ul>
          <button
            className="md:hidden ml-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <ul className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li><a href="/home" className={`block py-2 hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>Home</a></li>
          <li><a href="/news" className={`block py-2 hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>News</a></li>
          <li><a href="/contact" className={`block py-2 hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>Contact</a></li>
          <li><a href="/about" className={`block py-2 hover:text-${isScrolled ? 'gray-900' : 'gray-300'}`}>About</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Appbar;
