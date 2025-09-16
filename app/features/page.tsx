import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Palette, 
  Camera, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Globe, 
  Users,
  Building2,
  Eye,
  Cpu,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description: "Advanced AI algorithms create stunning property visualizations in seconds, not hours.",
    category: "Core"
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    description: "Choose from modern, traditional, luxury, and custom design styles for your properties.",
    category: "Design"
  },
  {
    icon: Camera,
    title: "2D & 3D Rendering",
    description: "Generate both 2D images and immersive 3D models for complete property visualization.",
    category: "Rendering"
  },
  {
    icon: BarChart3,
    title: "ROI Analysis",
    description: "Built-in ROI calculator helps you analyze investment potential and market trends.",
    category: "Analytics"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security ensures your property data and visualizations remain private.",
    category: "Security"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Access and manage your projects from any device with our responsive design.",
    category: "Accessibility"
  },
  {
    icon: Globe,
    title: "Global Properties",
    description: "Support for properties worldwide with location-specific market data and insights.",
    category: "Global"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share projects with team members and clients for seamless collaboration.",
    category: "Collaboration"
  },
  {
    icon: Building2,
    title: "Property Management",
    description: "Organize and manage multiple properties with our intuitive project dashboard.",
    category: "Management"
  },
  {
    icon: Eye,
    title: "Real-time Preview",
    description: "See your visualizations come to life with real-time generation and preview.",
    category: "Experience"
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "Optimized rendering engine delivers fast results without compromising quality.",
    category: "Performance"
  },
  {
    icon: Sparkles,
    title: "Custom Branding",
    description: "Add your own branding and watermarks to professional presentations.",
    category: "Professional"
  }
]

const categories = ["All", "Core", "Design", "Rendering", "Analytics", "Security", "Accessibility", "Global", "Collaboration", "Management", "Experience", "Performance", "Professional"]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Powerful Features
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Everything you need to visualize properties
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                VistaForge combines cutting-edge AI technology with intuitive design tools to deliver professional-grade property visualizations.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {feature.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Experience the power of AI-driven property visualization with VistaForge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/auth/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start Free Trial
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  View Dashboard
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
