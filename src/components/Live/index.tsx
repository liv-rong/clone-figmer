import LiveCursors from '@/components/Cursor/LiveCursors'
import { useOthers, useMyPresence } from '@liveblocks/react'
import { useCallback } from 'react'

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y
    updateMyPresence({ cursor: { x, y } })
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    updateMyPresence({ cursor: null, message: null })
  }, [])
  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="w-full h-[100vh] bg-green-700 flex justify-center items-center text-center"
    >
      dsfdsfdsfds
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
