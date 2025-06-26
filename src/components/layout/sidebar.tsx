'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Bookmark, 
  BarChart3, 
  Settings, 
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Employees', href: '/', icon: Users },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            className={cn(
              "relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-900 pb-4 pt-5",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            initial={false}
            animate={{ x: sidebarOpen ? 0 : "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="absolute right-0 top-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <SidebarContent pathname={pathname} />
          </motion.div>
          <div className="w-14 flex-shrink-0" />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 shadow-xl">
          <SidebarContent pathname={pathname} />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white dark:bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
          HR Dashboard
        </div>
      </div>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          HR Dashboard
        </h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}