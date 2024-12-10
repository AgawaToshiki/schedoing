'use client'
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Icon from '../../components/elements/Icon';
import { User } from '@/app/types';

type Props = {
  user: User;
}

const MobileEditUser = ({ user }: Props) => {

  return (
    <>
      <div className="relative z-[100]">
        <Menu>
          <MenuButton>
            <Icon color="red" icon="signout" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="absolute z-[200] rounded-xl border bg-gray-900 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <Icon icon="signout" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <Icon icon="signout" />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  )
}

export default MobileEditUser