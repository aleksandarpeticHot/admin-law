
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { Routes } from '@/constants';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const shouldHideLayout = router.pathname.includes(Routes.LOGIN)

  function renderLayoutWithChildren() {
    return <div className='min-h-screen flex flex-col'>
      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />
        <div className='flex flex-col flex-1 w-full overflow-hidden'>
          <Topbar />
          <main className={cn(
            'flex-1 overflow-auto md:p-5',
            'bg-gray-100 shadow-sm',
            'transition-all duration-300 ease-in-out'
          )}>
            <div className='mx-auto w-full'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  }

  if (shouldHideLayout) {
    return <main>{children}</main>
  }

  return renderLayoutWithChildren()
};

export default Layout;
