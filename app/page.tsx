'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat/chat-interface';
import { CompanyInfo } from '@/components/company-info';
import { ModeToggle } from '@/components/mode-toggle';
import { MenuIcon, XIcon } from 'lucide-react';
import { AnimatedLogo } from '@/components/animated-logo';
import { cn } from '@/lib/utils';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex justify-between items-center px-4 sm:px-6 py-3 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
          <AnimatedLogo />
          <h1 className="font-semibold text-lg sm:text-xl">DigiRocket AI Assistant</h1>
        </div>
        <ModeToggle />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 h-[calc(100vh-60px)] overflow-hidden">
        {/* Sidebar (Company Info) */}
        <aside
          className={cn(
            "fixed md:static inset-y-0 left-0 z-20 w-full sm:w-80 md:w-96 bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0 h-[calc(100vh-60px)] overflow-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <CompanyInfo onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Chat Interface */}
        <main className="flex-1 relative h-full overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}