"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label?: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="flex-1 group font-medium h-[85px]">
      <Link href={href}>
        <div
          className={`flex items-end justify-center text-center mx-auto pt-2 px-4  ${isActive
              ? "text-gradient border-gradient"
              : "border-transparent"
            } group-hover:text-indigo-500 border-t-[3px]`}
        >
          <span className="flex flex-col items-center justify-center h-[63px]">
            <span className={`text-center ${isActive ? "bg-[#ffc37e] rounded-lg p-2" : "text-[#3E4462]"}`}>
              <Icon size={24} color={isActive ? '#D97706' : '#3E4462'} />
            </span>
            <span className={`block text-[10px] ${isActive ? "text-[#D97706]" : "text-black"}`}>
              {label}
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NavItem;
