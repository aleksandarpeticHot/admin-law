
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { Routes } from '@/constants';
import { useEffect, useState } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  const shouldHideLayout = router.pathname.includes(Routes.LOGIN)

  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayedChildren(children);
      setIsPageTransitioning(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [children])

  function renderLayoutWithChildren() {
    return <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <Topbar />
          <main className={cn(
            "flex-1 overflow-auto p-4 md:p-6",
            isPageTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0",
            "transition-all duration-300 ease-in-out"
          )}>
            <div className="max-w-7xl mx-auto w-full">
              {displayedChildren}
            </div>
          </main>
        </div>
      </div>
    </div>
  }

  if (shouldHideLayout) {
    return <main>{displayedChildren}</main>
  }

  return renderLayoutWithChildren()
};

export default Layout;
