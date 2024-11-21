import { CursorMode, type CursorChatProps } from '@/types/type'
import CursorSvg from '../../../public/assets/CursorSVG'
import { useEffect, useState } from 'react'

const CursorsChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence
}: CursorChatProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({
      message: e.target.value
    })
    setCursorState({
      mode: CursorMode.Chat,
      message: e.target.value,
      previousMessage: null
    })
  }

  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCursorState({
        mode: CursorMode.Chat,
        message: '',
        previousMessage: cursorState?.message
      })
    } else if (e.key === 'Escape') {
      setCursorState({
        mode: CursorMode.Hidden
      })
    }
  }

  return (
    <div
      className="absolute top-0 left-0 "
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSvg color={'#000'} />
          <div className="absolute top-5  left-2  bg-blue-500 rounded-full px-4 py-2 text-white text-sm leading-relaxed">
            {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
            <input
              autoFocus={true}
              onKeyDown={handlekeyDown}
              onChange={handleChange}
              value={cursorState.message ?? ''}
              placeholder={cursorState.previousMessage ? '' : 'Type a message ..'}
              className="z-10 w-60 border-none bg-transparent text-white outline-none placeholder-blue-300"
            />
          </div>
        </>
      )}
    </div>
  )
}
export default CursorsChat
