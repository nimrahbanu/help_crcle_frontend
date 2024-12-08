'use client'

import { HelpCircle, Home, KeyRound, User, Wallet } from 'lucide-react';
import NavItem from './NavItem';
import { usePathname } from 'next/navigation';

const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const hiddenPaths = ['/login','/phone','/register', '/dashboard/support','/register-phone','/play','/deposit','/deposit-history','/withdraw','/withdraw-history','/k3'];

  return (
      <div className='flex items-center justify-between mx-4 lg:hidden '>
        {!hiddenPaths.includes(pathname) && (
       <>
       <NavItem href="/dashboard" icon={Home} label="Home" />
       <NavItem href="/dashboard/help/giving" icon={HelpCircle} label="Help" />
       <NavItem href="/dashboard/e-pin" icon={KeyRound } label="E-Pin " />
       <NavItem href="/dashboard/details/direct" icon={Wallet} label="Details" />   
       <NavItem href="/dashboard/account" icon={User} label="Account" />
     </>
     
        )}
      </div>
   
  );
};

export default BottomNav;
