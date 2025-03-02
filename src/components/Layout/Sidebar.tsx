
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Users,
  BookOpen,
  Home,
  BarChart4,
  Calendar,
  FileText,
  Settings
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  label: string;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, href }) => {
  const content = (
    <a
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )
      }
    >
      <div className="flex items-center justify-center w-6 h-6">
        <Icon
          className={cn(
            "h-5 w-5 transition-transform"
          )}
        />
      </div>
    </a>
  );

  return content;
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
        <div className="h-16 flex items-center px-4 border-b">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-lg font-semibold tracking-tight animate-fade-in">LegalPro</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto scrollbar-thin">
          <div className="space-y-1">
            <NavItem icon={Home} href="/" label="Dashboard" />
            <NavItem icon={BookOpen} href="/subjects" label="Subjects" />
            <NavItem icon={Briefcase} href="/projects" label="Projects" />
            <NavItem icon={Users} href="/clients" label="Clients" />
            <NavItem icon={Calendar} href="/calendar" label="Calendar" />
            <NavItem icon={FileText} href="/documents" label="Documents" />
            <NavItem icon={BarChart4} href="/analytics" label="Analytics" />
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
