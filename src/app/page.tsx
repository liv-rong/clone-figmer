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
import { handleDelete } from '@/lib'
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

    const res = new fabric.Rect({
      width: 100,
      height: 100,
      stroke: 'green',
      fill: 'red',
      left: 0,
      top: 0
    })

    const text = new fabric.FabricText('Hello World!') // Will have Lobster font

    canvas.add(res)
    canvas.add(text)
    canvas.renderAll()

    // export type CanvasMouseDown = {
    //   options: fabric.IEvent
    //   canvas: fabric.Canvas
    //   selectedShapeRef: any
    //   isDrawing: React.MutableRefObject<boolean>
    //   shapeRef: React.MutableRefObject<fabric.Object | null>
    // }
    // console.log(canvas, 'canvas1111111')
    // canvas.add(
    //   new fabric.Rect({ width: 10, height: 10, fill: 'red', x: 100, y: 100, stroke: 'red' })
    // )
    // const json = canvas.toJSON()
    // console.log(json, 'json')

    canvas.on('mouse:down', (options) => {
      console.log('处理鼠标按下', 'mouse:down')
      console.log(options, 'mouse:down')
      handleCanvasMouseDown({
        options: options as unknown as IEvent<Event>,
        canvas: canvas as any,
        selectedShapeRef: selectedShapeRef,
        isDrawing: isDrawing,
        shapeRef: shapeRef as any
      })
    })
    // canvas.on('mouse:move', () => {
    //   console.log('mouse:move')
    // })
    // canvas.on('mouse:down:before', () => {
    //   console.log('mouse:down:before')
    // })
    // canvas.on('mouse:up:before', () => {
    //   console.log('mouse:up:before')
    // })

    // canvas.on('mouse:up', () => {
    //   console.log('mouse:up')
    // })
    window.addEventListener('resize', () => {
      handleResize({ canvas: fabricRef.current })
    })

    return () => {
      canvas.dispose()
    }
  }, [canvasRef])

  const deleteAllShapes = useMutation(() => {}, [canvasRef])

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
        // console.log('selectedShapeRef.current')

        // const res = new fabric.Rect({
        //   left: 200,
        //   top: 200,
        //   width: 100,
        //   height: 100,
        //   fill: 'red',
        //   objectId: '11111'
        // }) as fabric.Rect
        // canvas.add(res as any)

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
            id="canvasId"
            height={800}
            width={800}
            className="border-2 border-red-400 w-[800px] h-[800px] "
          />
        </div> */}
        {/* <div className="w-full h-full">erewrwe</div> */}
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </div>
    </div>
  )
}
