import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md border-b-4 border-red-600 z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link
          to="/"
          className="text-3xl font-extrabold text-red-600 hover:text-gray-900 transition-colors"
        >
          Pokedex
        </Link>
        <button
          ref={buttonRef}
          className="lg:hidden p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          onClick={toggleDropdown}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <ul className="hidden lg:flex lg:space-x-4 text-lg">
          <li>
            <Link
              to="/"
              className="font-bold text-red-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="font-bold bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Login
            </Link>
          </li>
        </ul>
        <ul
          ref={dropdownRef}
          className={`lg:hidden absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg z-40 border-t-4 border-red-600 transition-transform duration-300 ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[-20px]'
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-center font-bold text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block px-4 py-2 text-center font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
