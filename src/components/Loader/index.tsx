import { SpinnerProps } from '@heroui/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader: React.FC<SpinnerProps> = () => {

  return <div className='flex flex-col items-center justify-center min-h-[200px] gap-4'>
    <Loader2 className='h-10 w-10 animate-spin text-primary' />
    <p className='text-sm text-muted-foreground animate-pulse'>Učitavanje... </p>
  </div>
}
export default Loader