import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Features from '@/components/Features'
import GenerationShowcase from '@/components/GenerationShowcase'
import DashboardPreview from '@/components/DashboardPreview'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <GenerationShowcase />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
