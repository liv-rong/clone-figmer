'use client'

import { Live, Navbar, LeftSidebar, RightSidebar } from '@/components'
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas'

import { useEffect, useRef } from 'react'
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef<boolean>(false)
  const shapeRef = useRef<fabric.Rect | null>(null)
  const selectedShapeRef = useRef<string | null>(null)

  useEffect(() => {
    const canvas = initializeFabric({ fabricRef, canvasRef })
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({ options, fabricRef, isDrawing, shapeRef, selectedShapeRef })
    })
    window.addEventListener('resize', () => {
      handleResize({ fabricRef })
    })
  }, [])

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <Navbar />
      <div className="h-[calc(100vh-64px)] w-full flex  justify-center items-center ">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </div>
    </div>
  )
}
