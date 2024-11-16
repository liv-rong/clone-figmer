import CursorSvg from '../../../public/assets/CursorSVG'

interface Props {
  color: string
  x: number
  y: number
  message: string
}

const Cursors = ({ color, x, y, message }: Props) => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
    >
      <CursorSvg color={color} />
      {message && (
        <div
          style={{ backgroundColor: color }}
          className="absolute top-5 left-0 text-white text-xs  py-2  px-4 rounded-full"
        >
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">{message}</p>
        </div>
      )}
    </div>
  )
}
export default Cursors
