'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ThemeToggle } from '../ui/theme-toggle';
import { UserMenu } from './user-menu';
import { useSearch } from '@/hooks/useSearch';

export function Header() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="ml-4 flex items-center gap-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}