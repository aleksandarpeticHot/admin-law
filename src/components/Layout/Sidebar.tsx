
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Users,
  Home,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';
import { Image } from '@heroui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface NavItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, href, label }) => {
  const router = useRouter();
  const isActive = router.pathname.includes(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        "hover:bg-[#F4F4F5] hover:text-sidebar-accent-foreground hover:shadow-md hover:scale-105",
        isActive
          ? "bg-[#006FEE] text-white shadow-md scale-105"
          : "hover:bg-[#F4F4F5] hover:text-sidebar-accent-foreground hover:shadow-md hover:scale-105"
      )}
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
      </div>
      <span className="group-hover:text-primary transition-colors">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 ease-in-out",
          "flex flex-col",
          "bg-sidebar backdrop-blur-sm border-r",
          "md:relative md:translate-x-0"
        )}
      >
        {/* Logo section */}
        <div className="h-16 flex items-center px-4 border-b gap-[5px]">
          <Image
            isBlurred
            isZoomed
            alt=""
            src="/radusinovic.jpg"
            width={35}
          />
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-lg font-semibold tracking-tight animate-fade-in">Radusinović</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto scrollbar-thin min-w-[220px]">
          <div className="space-y-1">
            <NavItem icon={Home} href="/dashboard" label="Dashboard" />
            <NavItem icon={Users} href="/clients" label="Klijenti" />
            <NavItem icon={Briefcase} href="/projects" label="Projekti" />
            <NavItem icon={Calendar} href="/calendar" label="Kalendar" />
            <NavItem icon={FileText} href="/documents" label="Dokumenti" />
            {/*  <NavItem icon={BarChart4} href="/analytics" label="Analytics" /> */}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-3">
          <div className="flex items-center justify-between">
            <NavItem icon={Settings} href="/settings" label="Settings" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
