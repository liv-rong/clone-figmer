'use client'

import { Room } from './Room'
import { CollaborativeApp } from './CollaborativeApp'
import { Live } from '@/components'
export default function Home() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center text-center">
      <Live />
    </div>
  )
}
