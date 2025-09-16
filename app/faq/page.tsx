import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqData = [
  {
    question: "What is VistaForge?",
    answer: "VistaForge is an AI-powered real estate visualization platform that transforms ordinary properties into extraordinary visual experiences. Our technology reveals the hidden potential in every space through advanced AI-powered visualization."
  },
  {
    question: "How does the AI visualization work?",
    answer: "Our AI technology analyzes property details, architectural elements, and design preferences to generate realistic 2D and 3D visualizations. The system uses advanced machine learning models trained on thousands of property designs to create stunning, accurate representations."
  },
  {
    question: "What types of properties can I visualize?",
    answer: "VistaForge supports all types of residential and commercial properties including houses, apartments, condos, townhouses, office buildings, retail spaces, and more. Our AI adapts to different architectural styles and property types."
  },
  {
    question: "How accurate are the visualizations?",
    answer: "Our AI-generated visualizations are highly accurate and realistic. They're based on actual property dimensions, architectural details, and design principles. While they represent potential outcomes, they provide an excellent preview of what's possible."
  },
  {
    question: "Can I customize the visualization style?",
    answer: "Yes! VistaForge offers multiple visualization styles including modern, traditional, minimalist, luxury, and custom styles. You can specify your preferences and the AI will adapt the visualization accordingly."
  },
  {
    question: "How long does it take to generate a visualization?",
    answer: "Most visualizations are generated within 2-5 minutes. Complex 3D renderings may take up to 10 minutes. You'll receive real-time updates on the generation progress."
  },
  {
    question: "What file formats do you support?",
    answer: "We support various input formats including images, floor plans, and property descriptions. Output formats include high-resolution images, 3D models, and interactive previews."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to get started. You can create up to 5 visualizations during the trial period."
  },
  {
    question: "What are your pricing plans?",
    answer: "We offer flexible pricing plans starting from $29/month for individual users, $99/month for professionals, and custom enterprise solutions. All plans include access to our AI visualization tools and customer support."
  },
  {
    question: "Do you offer customer support?",
    answer: "Absolutely! We provide comprehensive customer support via email, chat, and phone. Our team is available to help you get the most out of VistaForge and answer any questions you may have."
  },
  {
    question: "Can I use VistaForge for commercial purposes?",
    answer: "Yes, VistaForge is designed for both personal and commercial use. Our professional and enterprise plans include commercial licensing and additional features for real estate professionals, architects, and developers."
  },
  {
    question: "How secure is my data?",
    answer: "Data security is our top priority. All data is encrypted in transit and at rest. We use industry-standard security practices and comply with data protection regulations. Your property information and visualizations are kept private and secure."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Find answers to common questions about VistaForge and our AI-powered real estate visualization platform.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <Card>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <CardTitle className="text-left text-lg font-semibold">
                          {faq.question}
                        </CardTitle>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <CardContent className="p-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@vistaforge.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Get Started
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
