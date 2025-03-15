import React from 'react'
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode
  className?: string
}

const Segment: React.FC<Props> = ({ children, className }) => {

  return <div
    className={cn(
      'shadow-sm mt-5 mb-4 border-none rounded-[10px] bg-white flex items-baseline',
      className
    )}
  >
    {children}
  </div>
}
export default Segment