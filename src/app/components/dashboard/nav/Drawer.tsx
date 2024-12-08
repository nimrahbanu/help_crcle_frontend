import React from 'react';
import Link from 'next/link';

interface DrawerProps {
  links: { href: string; label: string; icon: React.ReactNode }[];

  isOpen: boolean;
  onClose: () => void;
  pathname:string;
}

const Drawer: React.FC<DrawerProps> = ({ links, isOpen, onClose,pathname }) => {
//   const path = usePathname();
   const path = pathname.replace(/^\//, "");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center pr-32">
          <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>

          <div className="relative bg-white w-64 p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <nav className="mt-8 ">
              {links.map((link) => {
                const isActive = path === link.href.replace(/^\//, "");
                return (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    <span
                      className={`flex py-2 px-4 text-indigo-700 hover:bg-gray-200 rounded mt-2 space-x-2  ${
                        isActive ? 'bg-indigo-200' : ''
                      }`}
                    >
                      {link.icon} <p className='text-gray-600  '>{link.label}</p>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;