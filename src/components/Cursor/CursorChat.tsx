import { CursorMode, type CursorChatProps } from '@/types/type'
import CursorSvg from '../../../public/assets/CursorSVG'

const CursorsChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence
}: CursorChatProps) => {
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`
      }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSvg color={'#000'} />
          <div className="absolute top-5 left-2  bg-blue-500 rounded-full px-4 py-2 text-white text-sm leading-relaxed">
            {cursorState.previousMessage && <div>{cursorState.previousMessage}</div>}
          </div>
        </>
      )}
    </div>
  )
}
export default CursorsChat
