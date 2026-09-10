import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles, Stars } from '@react-three/drei'
import type { Group } from 'three'

const nodes = [
  [-2.3, 0.5, 0], [-1.2, 1.7, -0.4], [0.1, 1.15, 0.25],
  [1.75, 1.75, -0.5], [2.3, 0.3, 0.1], [1.05, -1.45, 0.35],
  [-0.55, -1.25, -0.15], [-2.1, -0.85, -0.4],
] as const

const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 2], [2, 4], [2, 6], [4, 6],
] as const

function OrbitalNetwork() {
  const group = useRef<Group>(null)
  const orbit = useMemo(
    () => Array.from({ length: 65 }, (_, index) => {
      const angle = (index / 64) * Math.PI * 2
      return [Math.cos(angle) * 2.9, Math.sin(angle) * 1.9, 0] as [number, number, number]
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    const easing = Math.min(delta * 2.4, 1)
    group.current.rotation.x += (state.pointer.y * 0.12 - group.current.rotation.x) * easing
    group.current.rotation.y += (state.pointer.x * 0.22 - group.current.rotation.y) * easing
    group.current.rotation.z += delta * 0.025
  })

  return (
    <group ref={group}>
      <Line points={orbit} color="#2563eb" opacity={0.3} transparent lineWidth={0.6} />
      <group rotation={[0.25, 0.15, -0.45]}>
        <Line points={orbit} color="#22d3ee" opacity={0.16} transparent lineWidth={0.5} />
      </group>
      {edges.map(([from, to]) => (
        <Line key={`${from}-${to}`} points={[nodes[from], nodes[to]]} color="#22d3ee" opacity={0.42} transparent lineWidth={0.8} />
      ))}
      {nodes.map((position, index) => (
        <Float key={index} speed={1.1 + (index % 3) * 0.2} floatIntensity={0.18}>
          <mesh position={position}>
            <sphereGeometry args={[index % 3 === 0 ? 0.08 : 0.045, 16, 16]} />
            <meshBasicMaterial color={index % 3 === 0 ? '#fb923c' : '#67e8f9'} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 46 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.5} />
      <Stars radius={22} depth={18} count={650} factor={2} fade speed={0.25} />
      <Sparkles count={45} scale={[7, 5, 3]} size={1.4} speed={0.18} color="#67e8f9" />
      <OrbitalNetwork />
    </Canvas>
  )
}
