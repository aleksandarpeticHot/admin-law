
import React from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User
} from '@heroui/react';
import { AuthService } from '@/lib/api/auth';
import { notify } from '@/pages/lib/notify';
import { Routes } from '@/constants';
import { useRouter } from 'next/router';

const Topbar: React.FC = () => {
  const router = useRouter()

  async function handleLogout() {
    try {
      const response = await AuthService.logout()
      notify(response.data.message, 'success')
      router.push(Routes.LOGIN)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <div className="relative max-w-md w-full hidden md:flex">
          {/*  <Input
            isClearable
            classNames={{
              inputWrapper: [
                "bg-white",
                "border-[1px] border-solid border-[rgba(148,163,184,var(--tw-text-opacity,1))]"
              ],
            }}
            placeholder="Type to search..."
            radius="lg"
            startContent={
              <Search className="text-black/50 mb-0.5 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          /> */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "/rakic.png",
              }}
              className="transition-transform"
              description="@rakic.gmail.com"
              name="Rakic Nikola"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as Rakic</p>
              <p className="font-bold">@rakic.gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem
              onPress={() => handleLogout()}
              key="logout"
              color="danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Topbar;
