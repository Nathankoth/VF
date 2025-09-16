'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CircleDot } from 'lucide-react';
import AnalyticsCarousel from './AnalyticsCarousel';
import Image from 'next/image';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const dashboardTimer = setTimeout(() => {
      setDashboardVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(dashboardTimer);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden hero-background">
      <Image
        src="/assets/hero-analytics.jpg"
        alt="Hero Analytics Background"
        fill
        className="object-cover"
        priority
      />
      {/* Enhanced gradient overlay is now handled by CSS */}
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-30 z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-accent/50 rounded-full animate-ping delay-500"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-20 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs sm:text-sm font-medium animate-fade-in">
            <CircleDot className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2" />
            <span className="hidden sm:inline">AI-Powered Real Estate Platform</span>
            <span className="sm:hidden">AI Real Estate Platform</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight text-white leading-tight px-2 sm:px-0">
            <span className="block sm:inline">Visualize Properties</span>
            <span className="block sm:inline"> Beyond Reality</span>
            <br className="hidden sm:block" />
            <span className="block mt-2 sm:mt-0 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI-Powered Real Estate Visualization.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-body px-4 sm:px-0">
            <span className="hidden sm:inline">Transform ordinary properties into extraordinary visual experiences with AI-powered visualization technology that reveals the hidden potential in every space.</span>
            <span className="sm:hidden">Transform properties with AI-powered visualization technology.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-500 hover:scale-105 shadow-luxury hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white/30 text-white hover:bg-white/10 hover:border-primary/50 font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">Explore Dashboard Demo</span>
            <span className="sm:hidden">Demo</span>
          </Button>
        </div>
        
        <div className="text-xs sm:text-sm text-gray-300 font-body px-4 sm:px-0">
          <span className="hidden sm:inline">Free 14-day trial • No credit card required • Real-time data included</span>
          <span className="sm:hidden">Free 14-day trial • No credit card required</span>
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className={`w-full max-w-7xl mt-8 md:mt-16 px-4 sm:px-6 lg:px-8 z-20 transition-all duration-1000 delay-500 ${dashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/20 shadow-glass backdrop-blur-xl" style={{ background: 'var(--gradient-glass)' }}>
          {/* Dashboard Header */}
          <div className="bg-background/10 backdrop-blur-md w-full border-b border-white/10">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-md md:rounded-lg bg-primary/20 flex items-center justify-center">
                  <div className="h-3 w-3 md:h-5 md:w-5 rounded bg-primary/80"></div>
                </div>
                <span className="text-white font-heading font-semibold text-sm sm:text-base md:text-lg">
                  <span className="hidden sm:inline">VistaForge Analytics Dashboard</span>
                  <span className="sm:hidden">VistaForge Analytics</span>
                </span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="hidden sm:flex -space-x-1 md:-space-x-2">
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/30 border-2 border-white/20"></div>
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-accent/30 border-2 border-white/20"></div>
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white/20 border-2 border-white/20"></div>
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-xs text-white">+12</div>
                </div>
                
                <Button size="sm" className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 backdrop-blur-sm text-xs sm:text-sm px-2 sm:px-3">
                  <span className="hidden sm:inline">Share Dashboard</span>
                  <span className="sm:hidden">Share</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Analytics Carousel */}
          <div className="p-3 sm:p-4 md:p-6">
            <AnalyticsCarousel />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;