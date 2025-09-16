'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('[data-mobile-menu]') && !target.closest('[data-menu-button]')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleToggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const navigationLinks = [
    { label: "Features", link: "/#features" },
    { label: "Services", link: "/#services" },
    { label: "Pricing", link: "/#pricing" },
    { label: "FAQ", link: "/faq" }
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <header className="container mx-auto px-4 py-3 flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center lg:justify-start">
            <Logo />
          </div>
          
          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex items-center justify-center lg:justify-center space-x-4 lg:space-x-8">
            {navigationLinks.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop & Tablet Right Actions */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleToggleTheme} 
                className="data-[state=checked]:bg-primary"
              />
              <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-primary"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button 
              variant="default" 
              size="sm"
              asChild
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
          
          {/* Mobile Hamburger Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            data-menu-button
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-md">
          <div 
            className="absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg p-6"
            data-mobile-menu
          >
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              {navigationLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  className="text-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Divider */}
              <div className="h-px bg-border my-4"></div>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={handleToggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
              
              {/* Authentication Buttons */}
              <div className="pt-4 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center"
                  asChild
                >
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-center"
                  asChild
                >
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;