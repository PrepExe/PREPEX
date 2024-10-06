
'use client';
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuAlt1Icon, ClipboardListIcon, CogIcon, AcademicCapIcon, CalendarIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/solid';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const currentPath = usePathname();
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  interface SidebarLinkProps {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    href: string;
  }

  const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, text, href }) => {
    const isActive = currentPath === href;

    return (
      <li>
        <Link href={href}>
          <div
            className={`relative group flex items-center p-2 rounded transition-all duration-300 ${
              isActive ? 'bg-purple-800' : 'hover:bg-purple-700'
            }`}
          >
            <Icon className="h-6 w-6" />
            {!isSidebarCollapsed && <span className="ml-2">{text}</span>}
            {isSidebarCollapsed && (
              <div className="absolute left-12 bg-indigo-600 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {text}
              </div>
            )}
          </div>
        </Link>
      </li>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-800 to-indigo-800">
      {/* Sidebar */}
      <nav
        className={`bg-purple-900 text-white ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } transition-all duration-300 p-4 flex flex-col items-start shadow-lg`}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={toggleSidebar}
            className="text-white bg-purple-700 p-2 rounded hover:gray-100 focus:outline-none flex items-center"
          >
            <MenuAlt1Icon className="h-6 w-6" />
          </button>
          {!isSidebarCollapsed && <span className="font-semibold text-2xl ml-4">Prepex</span>}
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-4 w-full">
          <SidebarLink icon={ChartBarIcon} text="Dashboard" href="/dashboard" />
          <SidebarLink icon={ClipboardListIcon} text="Roadmap" href="/roadmap" />
          <SidebarLink icon={CalendarIcon} text="Exams" href="/exams" />
          <SidebarLink icon={AcademicCapIcon} text="Achievements" href="/achievements" />
          <SidebarLink icon={BookOpenIcon} text="Study Materials" href="/materials" />
          <SidebarLink icon={CogIcon} text="Settings" href="/settings" />
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">{children}</main>
    </div>
  );
}

export default Layout;
