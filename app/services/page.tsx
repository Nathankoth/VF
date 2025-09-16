import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Building2, 
  Store, 
  Factory, 
  Hotel, 
  School,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Shield
} from 'lucide-react'

const services = [
  {
    icon: Home,
    title: "Residential Properties",
    description: "Transform houses, apartments, and condos with stunning AI-generated visualizations.",
    features: [
      "Interior & exterior rendering",
      "Multiple design styles",
      "Virtual staging",
      "Before/after comparisons"
    ],
    price: "Starting at $29/month",
    popular: false
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    description: "Professional visualizations for office buildings, retail spaces, and commercial properties.",
    features: [
      "3D architectural models",
      "Space planning",
      "Brand integration",
      "Client presentations"
    ],
    price: "Starting at $99/month",
    popular: true
  },
  {
    icon: Store,
    title: "Retail Spaces",
    description: "Create compelling visualizations for retail stores, restaurants, and shopping centers.",
    features: [
      "Store layout design",
      "Product placement",
      "Customer flow analysis",
      "Brand consistency"
    ],
    price: "Starting at $79/month",
    popular: false
  },
  {
    icon: Factory,
    title: "Industrial Properties",
    description: "Specialized visualizations for warehouses, manufacturing facilities, and industrial complexes.",
    features: [
      "Large-scale rendering",
      "Equipment integration",
      "Safety compliance",
      "Operational efficiency"
    ],
    price: "Custom pricing",
    popular: false
  },
  {
    icon: Hotel,
    title: "Hospitality",
    description: "Luxury visualizations for hotels, resorts, and hospitality venues.",
    features: [
      "Luxury design styles",
      "Guest experience focus",
      "Amenity highlighting",
      "Marketing materials"
    ],
    price: "Starting at $149/month",
    popular: false
  },
  {
    icon: School,
    title: "Educational Facilities",
    description: "Educational and institutional property visualizations for schools and universities.",
    features: [
      "Educational layouts",
      "Accessibility compliance",
      "Learning environment design",
      "Community integration"
    ],
    price: "Starting at $99/month",
    popular: false
  }
]

const benefits = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Get professional visualizations in minutes, not days"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your property data is protected with enterprise-grade security"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated support team to help you succeed"
  },
  {
    icon: Star,
    title: "Quality Guarantee",
    description: "Satisfaction guaranteed or your money back"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <Building2 className="w-3 h-3 mr-1" />
                Our Services
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Professional property visualization services
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                From residential homes to commercial complexes, we provide AI-powered visualization solutions for every property type.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <p className="text-primary font-semibold">{service.price}</p>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Why choose VistaForge?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine cutting-edge AI technology with professional expertise to deliver exceptional results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to transform your properties?
              </h2>
              <p className="text-muted-foreground mb-8">
                Start your free trial today and experience the power of AI-driven property visualization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
