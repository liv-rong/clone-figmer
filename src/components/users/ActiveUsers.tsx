'use client'

import { useMemo } from 'react'

import { generateRandomName } from '@/lib/utils'

import Avatar from './Avatar'
import { useOthers, useSelf } from '@liveblocks/react'

const ActiveUsers = () => {
  const others = useOthers()

  const currentUser = useSelf()

  console.log('others', others)

  console.log('currentUser', currentUser)

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2

    return (
      <div className="flex items-center justify-center gap-1">
        {currentUser && (
          <Avatar
            name="You"
            otherStyles="border-[3px] border-primary-green"
          />
        )}
        {others.slice(0, 2).map(({ connectionId }) => (
          <Avatar
            key={connectionId}
            name={generateRandomName()}
            otherStyles="-ml-3"
          />
        ))}
        {hasMoreUsers && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black text-white">
            +{others.length - 2}
          </div>
        )}
      </div>
    )
  }, [others.length])

  return memoizedUsers
}

export default ActiveUsers
