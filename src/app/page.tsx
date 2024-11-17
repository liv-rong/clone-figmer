'use client'
import * as fabric from 'fabric'
import { Live, Navbar, LeftSidebar, RightSidebar } from '@/components'
import { defaultNavElement } from '@/constants'
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas'
import { handleImageUpload } from '@/lib/shapes'
import type { ActiveElement } from '@/types/type'
import { useMutation } from '@liveblocks/react'
import { useEffect, useRef, useState } from 'react'
import type { IEvent } from 'fabric/fabric-impl'
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef<boolean>(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: ''
  })
  useEffect(() => {
    const canvas = initializeFabric({
      canvasRef,
      fabricRef
    })
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options: options as unknown as IEvent<Event>,
        canvas: canvas as any,
        selectedShapeRef: selectedShapeRef.current,
        isDrawing: isDrawing,
        shapeRef: shapeRef.current as any
      })
    })
    window.addEventListener('resize', () => {
      handleResize({ canvas: fabricRef.current })
    })
  }, [])

  const deleteAllShapes = useMutation(() => {
    // // get the canvasObjects store
    // const canvasObjects = storage.get('canvasObjects')
    // // if the store doesn't exist or is empty, return
    // if (!canvasObjects || canvasObjects.size === 0) return true
    // // delete all the shapes from the store
    // for (const [key, value] of canvasObjects.entries()) {
    //   canvasObjects.delete(key)
    // }
    // // return true if the store is empty
    // return canvasObjects.size === 0
  }, [])

  const handleActiveElement = (element: ActiveElement) => {
    console.log('element', element)
    setActiveElement(element)
    switch (element?.value) {
      case 'reset':
        deleteAllShapes()
        fabricRef.current?.clear()
        // setActiveElement(defaultNavElement)

        break
      case 'delete':
        // handleDelete(fabricRef.current as any, deleteShapeFromStorage)
        // setActiveElement(defaultNavElement)
        break
      case 'image':
        imageInputRef.current?.click()
        isDrawing.current = false
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false
        }
      case 'comments':
        break

      default:
        selectedShapeRef.current = element?.value as string
        break
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center">
      <Navbar
        imageInputRef={imageInputRef}
        activeElement={activeElement}
        handleImageUpload={(e: any) => {
          // prevent the default behavior of the input element
          e.stopPropagation()

          // handleImageUpload({
          //   file: e.target.files[0],
          //   canvas: fabricRef.current as any,
          //   shapeRef: shapeRef.current
          //   // syncShapeInStorage: syncShapeInStorage
          // })
        }}
        handleActiveElement={handleActiveElement}
      />
      <div className="h-[calc(100vh-64px)] w-full flex  justify-center items-center ">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </div>
    </div>
  )
}
