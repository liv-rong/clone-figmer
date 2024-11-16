import { ActiveUsers } from '..'
import Image from 'next/image'
import { memo } from 'react'

const Navbar: React.FC = () => {
  return (
    <header className="w-full h-16 bg-primary-black px-5 flex justify-between items-center">
      <Image
        src="/assets/logo.svg"
        alt="FigPro Logo"
        width={58}
        height={20}
      />

      <ActiveUsers />
    </header>
  )
}

export default Navbar
