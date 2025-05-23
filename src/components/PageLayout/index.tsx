import React from 'react';
import { cn } from '@/lib/utils';
import Loader from '../Loader';
import Segment from '../Segment';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import styled from 'styled-components';
import { Form } from '@heroui/react';

interface Props {
  children: React.ReactNode
  isLoading?: boolean
  title: string
  actions?: () => React.ReactNode,
  closeUrl?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledWrapper = styled.div`
position: relative;
display: block !important;
`

const PageLayout: React.FC<Props> = (props) => {
  const {
    children,
    isLoading,
    title,
    actions,
    closeUrl,
    onSubmit
  } = props

  function renderContent() {
    return <div className={cn(
      'min-h-[70vh]',
      'flex-1 overflow-auto md:p-10',
      isLoading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0',
      'transition-all duration-300 ease-in-out'
    )}>
      <div className='mx-auto w-full'>
        {children}
      </div>
    </div>
  }

  function renderHeader() {
    return <header className={cn(
      'animate-fade-in'
    )}>
      <Segment>
        <div className='w-[100%] py-2 px-5 flex h-16 items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h1 className='text-xl font-semibold tracking-tight animate-slide-in flex align-baseline gap-[5px]'>
              {closeUrl && <Link className='mt-[2px]' href={closeUrl}>
                <ArrowLeftCircle />
              </Link>
              }
              {title}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            {actions ? actions() : <></>}
          </div>
        </div>
      </Segment>
    </header>
  }

  return <StyledWrapper
    as={onSubmit ? Form : 'div'}
    onSubmit={onSubmit}
    autoComplete={'off'}
  >
    {renderHeader()}
    <div>
      {isLoading && <Loader />}
      {!isLoading && <Segment className='p-[20px]'>
        {renderContent()}
      </Segment>}
    </div>
  </StyledWrapper>
}
export default PageLayout