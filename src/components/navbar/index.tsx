import { ActiveUsers } from '..'
import Image from 'next/image'
import { memo } from 'react'
import { navElements } from '@/constants'
import { ActiveElement, NavbarProps } from '@/types/type'

const Navbar: React.FC = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement
}: NavbarProps) => {
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value))

  return (
    <header className="w-full h-16 bg-primary-black px-5 flex justify-between items-center">
      <Image
        src="/assets/logo.svg"
        alt="FigPro Logo"
        width={58}
        height={20}
      />
      <ul className="flex flex-row">
        {navElements.map((item: ActiveElement | any, index) => (
          <li
            key={index}
            onClick={() => {
              if (Array.isArray(item.value)) return
              handleActiveElement(item)
            }}
            className={`group px-2.5 py-5 flex justify-center items-center
              ${isActive(item.value) ? 'bg-primary-green' : 'hover:bg-primary-grey-200'}
              `}
          >
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === 'comments' ? (
              <Button className="relative w-5 h-5 object-contain">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? 'invert' : ''}
                />
              </Button>
            ) : (
              <Button className="relative w-5 h-5 object-contain">
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? 'invert' : ''}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>

      <ActiveUsers />
    </header>
  )
}

export default Navbar
