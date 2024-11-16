'use client'

import { Room } from './Room'
import { CollaborativeApp } from './CollaborativeApp'
import { Live, Navbar } from '@/components'
export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <Navbar />
      <Live />
    </div>
  )
}
