import LiveCursors from '@/components/Cursor/LiveCursors'
import { useOthers, useMyPresence, useBroadcastEvent, useEventListener } from '@liveblocks/react'
import { useCallback, useEffect, useState } from 'react'
import CursorChat from '../Cursor/CursorChat'
import { CursorMode, type CursorState, Reaction, type ReactionEvent } from '@/types/type'
import ReactionSelector from '../reaction/ReactionButton'
import FlyingReaction from '../reaction/FlyingReaction'
import useInterval from '@/hooks/useInterval'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

interface Props {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
}

const Live = ({ canvasRef }: Props) => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden
  })

  const [reaction, setReaction] = useState<Reaction[]>([])

  const broadcast = useBroadcastEvent()

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReaction((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now()
          }
        ])
      )
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction
      })
    }
  }, 100)

  useInterval(() => {
    setReaction((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    )
  }, 1000)

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent
    setReaction((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now()
        }
      ])
    )
  })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y
      updateMyPresence({ cursor: { x, y } })
    }
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault()
    setCursorState({ mode: CursorMode.Hidden })
    updateMyPresence({ cursor: null, message: null })
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    // event.preventDefault()
    console.log('handlePointerDown')
    updateMyPresence({ cursor: null, message: null })
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.ReactionSelector
        ? {
            ...state,
            isPressed: true
          }
        : state
    )
  }, [])

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()
      updateMyPresence({ cursor: null, message: null })
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? {
              ...state,
              isPressed: true
            }
          : state
      )
    },
    [cursorState.mode, setCursorState]
  )

  const setReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: true })
  }, [])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setCursorState({ mode: CursorMode.Chat, previousMessage: null, message: '' })
      } else if (e.key === 'Escape') {
        setCursorState({ mode: CursorMode.Hidden })
        updateMyPresence({ message: '' })
      } else if (e.key === 'e') {
        setCursorState({ mode: CursorMode.ReactionSelector })
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault()
      }
    }
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [updateMyPresence])
  return (
    <div
      id="canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="w-full h-full flex justify-center items-center text-center"
    >
      <canvas
        ref={canvasRef}
        className="border border-red-400"
      />

      {reaction.map((r) => (
        <FlyingReaction
          key={r.timestamp.toString()}
          x={r.point.x}
          y={r.point.y}
          timestamp={r.timestamp}
          value={r.value}
        />
      ))}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <>
          <ReactionSelector setReaction={setReactions} />
        </>
      )}
      <LiveCursors others={others} />
    </div>
  )
}

export default Live
