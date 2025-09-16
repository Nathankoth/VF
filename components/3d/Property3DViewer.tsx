'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Box, Sphere } from '@react-three/drei'
import { Mesh } from 'three'

// Simple 3D house component
function House() {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* House base */}
      <Box args={[4, 2, 4]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Roof */}
      <Box args={[4.5, 1, 4.5]} position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#DC143C" />
      </Box>
      
      {/* Door */}
      <Box args={[0.5, 1.5, 0.1]} position={[0, 0.75, 2.05]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      
      {/* Windows */}
      <Box args={[0.8, 0.8, 0.1]} position={[-1, 1.2, 2.05]}>
        <meshStandardMaterial color="#87CEEB" />
      </Box>
      <Box args={[0.8, 0.8, 0.1]} position={[1, 1.2, 2.05]}>
        <meshStandardMaterial color="#87CEEB" />
      </Box>
      
      {/* Trees */}
      <Sphere args={[0.5, 8, 6]} position={[-3, 0.5, 2]}>
        <meshStandardMaterial color="#228B22" />
      </Sphere>
      <Box args={[0.2, 1, 0.2]} position={[-3, 0, 2]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      <Sphere args={[0.4, 8, 6]} position={[3, 0.4, 1]}>
        <meshStandardMaterial color="#228B22" />
      </Sphere>
      <Box args={[0.15, 0.8, 0.15]} position={[3, 0, 1]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  )
}

// Loading component
function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

interface Property3DViewerProps {
  className?: string
}

export default function Property3DViewer({ className = "h-96 w-full" }: Property3DViewerProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [8, 4, 8], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* 3D House */}
          <House />
          
          {/* Ground */}
          <Box args={[20, 0.1, 20]} position={[0, -0.05, 0]} receiveShadow>
            <meshStandardMaterial color="#90EE90" />
          </Box>
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
