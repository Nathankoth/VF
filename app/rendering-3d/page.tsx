'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Property3DViewer from '@/components/3d/Property3DViewer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  RotateCcw, 
  Download, 
  Share2, 
  Settings, 
  Eye,
  Maximize2,
  Minimize2,
  Palette,
  Sun,
  Moon
} from 'lucide-react'

const styleOptions = [
  { id: 'modern', name: 'Modern', color: '#3B82F6' },
  { id: 'traditional', name: 'Traditional', color: '#8B4513' },
  { id: 'luxury', name: 'Luxury', color: '#FFD700' },
  { id: 'minimalist', name: 'Minimalist', color: '#F3F4F6' },
  { id: 'industrial', name: 'Industrial', color: '#6B7280' },
  { id: 'scandinavian', name: 'Scandinavian', color: '#FEF3C7' }
]

export default function Rendering3DPage() {
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lighting, setLighting] = useState('day')

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const handleDownload = () => {
    // TODO: Implement 3D model download
    console.log('Downloading 3D model...')
  }

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Sharing 3D model...')
  }

  const handleReset = () => {
    // TODO: Implement view reset
    console.log('Resetting view...')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">3D Property Rendering</h1>
                <p className="text-muted-foreground">Interactive 3D visualization of your property</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Live Preview</Badge>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 3D Viewer */}
              <div className="lg:col-span-3">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5" />
                          3D Property Viewer
                        </CardTitle>
                        <CardDescription>
                          Interactive 3D model with real-time rendering
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleReset}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className={`${isFullscreen ? 'h-screen' : 'h-96'} w-full`}>
                      <Property3DViewer className="h-full w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Controls Panel */}
              <div className="space-y-6">
                {/* Style Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Style
                    </CardTitle>
                    <CardDescription>
                      Choose your preferred design style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {styleOptions.map((style) => (
                        <Button
                          key={style.id}
                          variant={selectedStyle === style.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleStyleChange(style.id)}
                          className="justify-start"
                        >
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: style.color }}
                          />
                          {style.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Lighting Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {lighting === 'day' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      Lighting
                    </CardTitle>
                    <CardDescription>
                      Adjust the lighting conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={lighting === 'day' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLighting('day')}
                        className="w-full justify-start"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Day
                      </Button>
                      <Button
                        variant={lighting === 'night' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLighting('night')}
                        className="w-full justify-start"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Night
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                    <CardDescription>
                      Export and share your 3D model
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button onClick={handleDownload} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Model
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </CardContent>
                </Card>

                {/* Property Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <span>Single Family</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bedrooms:</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bathrooms:</span>
                      <span>2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Square Feet:</span>
                      <span>2,400</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Style:</span>
                      <span className="capitalize">{selectedStyle}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
