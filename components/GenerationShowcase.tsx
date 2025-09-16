import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Eye, Download } from 'lucide-react';
import roundHouseCity from '@/assets/round-house-city.jpg';
import texturedInterior from '@/assets/textured-interior.jpg';

const GenerationShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('generation-showcase');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const showcaseItems = [
    {
      id: 1,
      title: "Architectural Visualization",
      description: "Transform architectural concepts into stunning photorealistic renders with AI-powered generation",
      image: roundHouseCity,
      category: "Exterior Design",
      prompt: "Modern circular house with city skyline backdrop",
      metrics: {
        renderTime: "2.3s",
        resolution: "4K",
        accuracy: "98%"
      }
    },
    {
      id: 2,
      title: "Interior Space Design",
      description: "Generate immersive interior environments with advanced texturing and lighting",
      image: texturedInterior,
      category: "Interior Design",
      prompt: "Organic cave-like interior with natural textures",
      metrics: {
        renderTime: "1.8s",
        resolution: "8K",
        accuracy: "97%"
      }
    }
  ];

  return (
    <section id="generation-showcase" className="w-full py-16 md:py-20 px-6 md:px-12 bg-background/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div 
          className={`text-center space-y-4 max-w-3xl mx-auto transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="border-primary/30 text-primary">
              AI Generation
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Next-Generation 2D & 3D Rendering
          </h2>
          <p className="text-muted-foreground text-lg">
            Create stunning architectural visualizations and interior designs with our advanced AI-powered rendering engine
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {showcaseItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 ${
                activeTab === index ? 'ring-2 ring-primary/20' : ''
              }`}
              onMouseEnter={() => setActiveTab(index)}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                
                {/* Overlay Content */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-background/80 text-foreground border-primary/20">
                      {item.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-background/80 hover:bg-background">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground font-mono">
                        "{item.prompt}"
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(item.metrics).map(([key, value], metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-lg font-semibold text-foreground">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                    Try Generation
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    Live Demo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center pt-8 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore AI Generation Tools
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GenerationShowcase;