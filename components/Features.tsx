
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, TrendingUp, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";
import warmInterior from '@/assets/warm-interior.jpg';
import traditionalArchitecture from '@/assets/traditional-architecture.jpg';

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Market Analysis Overview",
      description: "Real-time insights on residential, commercial, and land assets with comprehensive market data.",
      expandedDescription: "Access live property valuations, market trends, and comparative analysis across different neighborhoods and property types. Track price movements, inventory levels, and market activity with detailed analytics and reporting tools.",
      icon: (
        <TrendingUp size={24} className="text-primary" />
      )
    },
    {
      title: "2D & 3D Rendering",
      description: "Visualize properties and interior designs before they're built with advanced rendering tools.",
      expandedDescription: "Create stunning 2D floor plans and immersive 3D visualizations of properties. Design interior layouts, experiment with different configurations, and showcase projects to clients with photorealistic rendering capabilities.",
      icon: (
        <Grid3x3 size={24} className="text-accent" />
      )
    },
    {
      title: "ROI Calculator",
      description: "Forecast your returns with precision-driven financial models and investment analysis.",
      expandedDescription: "Calculate potential returns on investment with detailed financial modeling. Factor in purchase price, renovation costs, rental income, appreciation rates, and tax implications to make informed investment decisions.",
      icon: (
        <LayoutDashboard size={24} className="text-fintech-teal" />
      )
    },
    {
      title: "Property Search",
      description: "Explore verified listings and existing assets in your target market with advanced filtering.",
      expandedDescription: "Search through comprehensive property databases with detailed filters for location, price, property type, and investment criteria. Access verified listings, market history, and neighborhood analytics to find the perfect investment opportunities.",
      icon: (
        <ListCheck size={24} className="text-primary" />
      )
    },
    {
      title: "Marketplace",
      description: "Buy, sell, or showcase properties with AI-driven recommendations and smart matching.",
      expandedDescription: "Connect with buyers, sellers, and investors through our intelligent marketplace. Get AI-powered property recommendations, automated valuation models, and smart matching based on your investment preferences and criteria.",
      icon: (
        <Star size={24} className="text-accent" />
      )
    },
    {
      title: "Portfolio Visualization",
      description: "Track, compare, and manage your entire real estate portfolio in one comprehensive dashboard.",
      expandedDescription: "Monitor all your properties with detailed performance analytics, cash flow tracking, and portfolio optimization tools. Compare properties side-by-side and get insights on asset allocation and diversification strategies.",
      icon: (
        <BookOpen size={24} className="text-fintech-teal" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12 relative">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 opacity-5">
          <img src={warmInterior} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-5">
          <img src={traditionalArchitecture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-transparent"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            All-in-One Real Estate Analytics & Visualization
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive tools to analyze markets, visualize properties, and maximize your real estate investment opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-cosmic-muted">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-cosmic-light/10">
                  <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
