// 'use client'

// import {
//   CircleHelp,
//   LogOut,
//   Mail,
//   Settings,
//   Ticket,
//   UserPen,
//   UserRound,
//   Users,
//   House,
//   KeyRound,
//   X,
//   Menu,
// } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useGlobalStore } from '../store/useLogoutStore';

// const NavItem = ({
//   icon,
//   label,
//   href,
//   onClick,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   href: string;
//   isDashboard?: boolean;
//   onClick?: () => void;
// }) => {
//   const pathname = usePathname();
// const isActive = pathname === href;




//   return (
//     <div className="mt-2 flex items-center justify-center">
//       <Link href={href} className="w-full">
//         <div
//           className={`flex items-center justify-between p-3 rounded-lg w-full text-black font-medium ${isActive ? 'btn_bg text-white' : 'bg-[#E9E8E8]'
//             }`}
//           onClick={onClick}
//         >
//           <div className="flex items-center space-x-2">
//             {icon}
//             <span>{label}</span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// const SideBarProfile = ({ user_id, name }: any) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout } = useGlobalStore();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout(router);
//   };

//   const handleNavItemClick = () => {
//     setIsOpen(false); // Close sidebar when any item is clicked
//   };
//   const pathname = usePathname(); // Get the current pathname

//   // Function to extract tab name from the pathname
//   const getTabNameFromPath = (path: string) => {
//     // Split the path and get the last part (tab name)
//     const parts = path.split('/'); // Split the pathname by '/'
//     return parts[parts.length - 1]; // Return the last part (e.g., 'tabone' or 'tabtwo')
//   };

//   const currentTab = getTabNameFromPath(pathname); // Get the current tab name


// console.log("dfdf",currentTab)

//   const [tab, setTab] = useState('tabone'); // Default to 'tabone'

//   // Example: Simulating a condition to change to 'tabtwo'
//   useEffect(() => {
   
//       if(tab === 'tabone'){

//         setTab('tabone'); // Dynamically switch to 'tabtwo'
//       }else{

//         setTab('tabtwo'); // Dynamically switch to 'tabtwo'

//       }
   
//   }, []);

//   return (
//     <div className="btn_bg md:bg-transparent">
//       {/* Toggle Button for Small Screens */}
//       <button
//         className="lg:hidden p-2 bg-black z-20 fixed top-2 left-2 text-white rounded"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-md transition-transform duration-300 ease-in-out overflow-y-auto lg:relative lg:w-72 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//       >
//         <div className="p-4">

//           <button
//             className="lg:hidden p-2 bg-black z-20 fixed top-2 left-2 text-white rounded"
//             onClick={() => setIsOpen(!isOpen)}
//           ><X /></button>
//           {/* Profile Picture Section */}
//           <div className="flex flex-col items-center mt-12">
//             <div className="h-28 w-28 bg-gray-300 rounded-full mb-4"></div>
//             <div className="text-center">
//               <div className="font-semibold text-lg">{user_id}</div>
//               <div className="font-medium -mt-1">{name}</div>
//             </div>
//           </div>

//           {/* Icons Section */}
//           <div className="flex items-center justify-center mt-8 space-x-2">
//             <Link href="/dashboard/account" passHref>
//               <div
//                 className={`flex items-center justify-center h-14 w-14 rounded-full 
//                     ${pathname === '/dashboard/account' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
//                     cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
//               >
//                 <Settings size={28} strokeWidth={2} />
//               </div>
//             </Link>
//             <Link href="/dashboard/support" passHref>
//               <div
//                 className={`flex items-center justify-center h-14 w-14 rounded-full 
//                     ${pathname === '/dashboard/support' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
//                     cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
//               >
//                 <Mail size={28} strokeWidth={2} />
//               </div>
//             </Link>
//             <Link href="/dashboard/account" passHref>
//               <div
//                 className={`flex items-center justify-center h-14 w-14 rounded-full 
//                     ${pathname === '/dashboard/account' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
//                     cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
//               >
//                 <UserRound size={28} strokeWidth={2} />
//               </div>
//             </Link>
//             <div
//               onClick={handleLogout}
//               className="flex items-center justify-center h-14 w-14 rounded-full bg-[#D9D9D9] cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200"
//             >
//               <LogOut size={28} strokeWidth={2} />
//             </div>
//           </div>

//           {/* Navigation Links Section */}
//           <div className="mt-12">
//             <NavItem
//               icon={<House />}
//               label="Dashboard"
//               href="/dashboard"
//               isDashboard
//               onClick={handleNavItemClick}
//             />
//             <NavItem
//               icon={<UserPen />}
//               label="Manage Profile"
//               href="/dashboard/account"
//               onClick={handleNavItemClick}
//             />
//             <NavItem
//               icon={<Users />}
//               label="Members Details"
//               href={`/dashboard/details/${'direct'}`} // Dynamic URL based on the tab
//               onClick={handleNavItemClick}
//             />
//             <NavItem
//               icon={<CircleHelp />}
//               label="Help"
//               href={`/dashboard/help/${'giving'}`} // Dynamic URL based on the tab
//               onClick={handleNavItemClick}
//             />
//             <NavItem
//               icon={<KeyRound />}
//               label="Manage E Pin"
//               href="/dashboard/e-pin"
//               onClick={handleNavItemClick}
//             />
//             <NavItem
//               icon={<Ticket />}
//               label="Ticket Support"
//               href="/dashboard/support"
//               onClick={handleNavItemClick}
//             />
//             <nav className="flex flex-col">

//               <NavItem
             
//                 icon={<Ticket />}
//                 label={`Level Income`} // Capitalize the first letter
//                 href={`/dashboard/level_income/${tab}`}
//                 onClick={handleNavItemClick}
//               />

//             </nav>
//           </div>

//           {/* Logout Section */}
//           <div className="mt-20 flex items-center justify-center">
//             <div
//               onClick={handleLogout}
//               className="flex items-center justify-start p-2 bg-[#E9E8E8] rounded-lg w-full text-black font-medium cursor-pointer"
//             >
//               <LogOut />
//               <span className="ml-2">Log Out</span>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default SideBarProfile;


'use client';

import {
  CircleHelp,
  LogOut,
  Mail,
  Settings,
  Ticket,
  UserPen,
  UserRound,
  Users,
  House,
  KeyRound,
  X,
  Menu,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGlobalStore } from '../store/useLogoutStore';

const NavItem = ({
  icon,
  label,
  href,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div className="mt-2 flex items-center justify-center">
      <Link href={href} className="w-full">
        <div
          className={`flex items-center justify-between p-3 rounded-lg w-full text-black font-medium ${
            isActive ? 'btn_bg text-white' : 'bg-[#E9E8E8]'
          }`}
          onClick={onClick}
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span>{label}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const SideBarProfile = ({ user_id, name }: { user_id: string; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useGlobalStore();
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // State for sub-menu visibility

  const handleLogout = async () => {
    await logout(router);
  };

  const handleNavItemClick = () => {
    setIsOpen(false); // Close sidebar when any item is clicked

  };
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen); // Toggle sub-menu visibility
  };
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="btn_bg md:bg-transparent">
      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden p-2 bg-black z-20 fixed top-2 left-2 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-md transition-transform duration-300 ease-in-out overflow-y-auto lg:relative lg:w-72 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-4">
          <button
            className="lg:hidden p-2 bg-black z-20 fixed top-2 left-2 text-white rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            <X />
          </button>
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mt-12">
            <div className="h-28 w-28 bg-gray-300 rounded-full mb-4"></div>
            <div className="text-center">
              <div className="font-semibold text-lg">{user_id}</div>
              <div className="font-medium -mt-1">{name}</div>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <Link href="/dashboard/account" passHref>
              <div
                className={`flex items-center justify-center h-14 w-14 rounded-full 
                    ${pathname === '/dashboard/account' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
                    cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
              >
                <Settings size={28} strokeWidth={2} />
              </div>
            </Link>
            <Link href="/dashboard/support" passHref>
              <div
                className={`flex items-center justify-center h-14 w-14 rounded-full 
                    ${pathname === '/dashboard/support' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
                    cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
              >
                <Mail size={28} strokeWidth={2} />
              </div>
            </Link>
            <Link href="/dashboard/account" passHref>
              <div
                className={`flex items-center justify-center h-14 w-14 rounded-full 
                    ${pathname === '/dashboard/account' ? 'bg-[#B0B0B0]' : 'bg-[#D9D9D9]'} 
                    cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200`}
              >
                <UserRound size={28} strokeWidth={2} />
              </div>
            </Link>
            <div
              onClick={handleLogout}
              className="flex items-center justify-center h-14 w-14 rounded-full bg-[#D9D9D9] cursor-pointer hover:bg-[#B0B0B0] transition-colors duration-200"
            >
              <LogOut size={28} strokeWidth={2} />
            </div>
          </div>

          {/* Navigation Links Section */}
          <div className="mt-12">
            <NavItem
              icon={<House />}
              label="Dashboard"
              href="/dashboard"
              onClick={handleNavItemClick}
              isActive={pathname === '/dashboard'} // Highlight if current tab is 'dashboard'
            />
            <NavItem
              icon={<UserPen />}
              label="Manage Profile"
              href="/dashboard/account"
              onClick={handleNavItemClick}
              isActive={pathname === '/dashboard/account'} // Highlight if current tab is 'account'
            />
            <NavItem
              icon={<Users />}
              label="Members Details"
              href={`/dashboard/details/${'direct'}`} // Dynamic URL based on the tab
              onClick={handleNavItemClick}
              isActive={pathname.startsWith('/dashboard/details')} // Highlight if current tab starts with 'details'
            />
            <NavItem
              icon={<CircleHelp />}
              label="Help"
              href={`/dashboard/help/${'giving'}`} // Dynamic URL based on the tab
              onClick={handleNavItemClick}
              isActive={pathname.startsWith('/dashboard/help')} // Highlight if current tab starts with 'help'
            />
            <NavItem
              icon={<KeyRound />}
              label="Manage E Pin"
              href="/dashboard/e-pin"
              onClick={handleNavItemClick}
              isActive={pathname === '/dashboard/e-pin'} // Highlight if current tab is 'e-pin'
            />
            <NavItem
              icon={<Ticket />}
              label="Ticket Support"
              href="/dashboard/support"
              onClick={handleNavItemClick}
              isActive={pathname === '/dashboard/support'} // Highlight if current tab is 'support'
            />
            {/* <nav className="flex flex-col">
              <NavItem
                icon={<Ticket />}
                label={`Level Income`} // Capitalize the first letter
                href={`/dashboard/level_income/tabone`} // Modify based on your condition
                onClick={handleNavItemClick}
                isActive={pathname === '/dashboard/level_income/tabone'} // Highlight if current tab is 'tabone'
              />
              <NavItem
                icon={<Ticket />}
                label={`Receiving Help`} // Capitalize the first letter
                href={`/dashboard/level_income/tabtwo`} // Modify based on your condition
                onClick={handleNavItemClick}
                isActive={pathname === '/dashboard/level_income/tabtwo'} // Highlight if current tab is 'tabtwo'
              />
            </nav> */}

 {/* Combined Level Income Tabs with Sub-menu */}
 <div className="flex flex-col">
              <NavItem
                icon={<Ticket />}
                label="Level Income"
                href={`/dashboard/level_income/tabone`} // Default tab for the label
                onClick={() => {
                  handleNavItemClick(); // Handle main click
                  toggleSubMenu(); // Toggle sub-menu visibility
                }}
                isActive={pathname === '/dashboard/level_income/tabone' || pathname === '/dashboard/level_income/tabtwo'} // Highlight if either tab is active
              />
              {/* {isSubMenuOpen && ( // Render sub-menu conditionally
                <div className="flex flex-col ml-4">
                  <NavItem
                    icon={<Ticket />}
                    label="Giving Help Level"
                    href={`/dashboard/level_income/tabone`}
                    onClick={handleNavItemClick}
                    isActive={pathname === '/dashboard/level_income/tabone'} // Highlight if current tab is 'tabone'
                  />
                  <NavItem
                    icon={<Ticket />}
                    label="Tab Two"
                    href={`/dashboard/level_income/tabtwo`}
                    onClick={handleNavItemClick}
                    isActive={pathname === '/dashboard/level_income/tabtwo'} // Highlight if current tab is 'tabtwo'
                  />
                </div>
              )} */}
            </div>
          </div>

          {/* Logout Section */}
          <div className="mt-20 flex items-center justify-center">
            <div
              onClick={handleLogout}
              className="flex items-center justify-start p-2 bg-[#E9E8E8] rounded-lg w-full text-black font-medium cursor-pointer"
            >
              <LogOut />
              <span className="ml-2">Log Out</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBarProfile;
