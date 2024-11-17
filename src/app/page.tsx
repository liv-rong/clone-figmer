'use client'
import * as fabric from 'fabric'
import { Live, Navbar, LeftSidebar, RightSidebar } from '@/components'
import { defaultNavElement } from '@/constants'
import { handleCanvasMouseDown, handleResize, initializeFabric, renderCanvas } from '@/lib/canvas'
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
  const selectedShapeRef = useRef<string | null>('rectangle')
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
    console.log('111111')

    // export type CanvasMouseDown = {
    //   options: fabric.IEvent
    //   canvas: fabric.Canvas
    //   selectedShapeRef: any
    //   isDrawing: React.MutableRefObject<boolean>
    //   shapeRef: React.MutableRefObject<fabric.Object | null>
    // }
    console.log(canvas, 'canvas1111111')
    canvas.add(new fabric.Rect({ width: 100, height: 100, fill: 'red' }))
    canvas.on('mouse:down', (options) => {
      console.log('mouse2222222222')
      console.log(options, 'mouse:down')
      handleCanvasMouseDown({
        options: options as unknown as IEvent<Event>,
        canvas: canvas as any,
        selectedShapeRef: selectedShapeRef,
        isDrawing: isDrawing,
        shapeRef: shapeRef as any
      })
    })
    canvas.on('mouse:move', () => {
      console.log('mouse:move')
    })
    canvas.on('mouse:down:before', () => {
      console.log('mouse:down:before')
    })
    canvas.on('mouse:up:before', () => {
      console.log('mouse:up:before')
    })

    canvas.on('mouse:up', () => {
      console.log('mouse:up')
    })
    window.addEventListener('resize', () => {
      handleResize({ canvas: fabricRef.current })
    })
  }, [canvasRef])

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
  }, [canvasRef])

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

  // useEffect(() => {
  //   renderCanvas({
  //     fabricRef,
  //     canvasObjects,
  //     activeObjectRef
  //   })
  // }, [canvasObjects])

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
        {/* <div className="w-full h-full">
          <canvas
            ref={canvasRef}
            className="border-2 border-red-400 bg-white"
          />
        </div> */}
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </div>
    </div>
  )
}
