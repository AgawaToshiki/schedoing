'use client'
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Icon from '../../components/elements/Icon';
import { User } from '@/app/types';

type Props = {
  user: User;
}

const MobileEditUser = ({ user }: Props) => {
  return (
    <div>
      <Menu>
        <MenuButton>
          <Icon color="red" icon="signout" />
        </MenuButton>
        <MenuItems
          transition
          anchor="right"
          className="bg-green-200"
        >
          <MenuItem>
            <button className="w-full rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Icon icon="signout" />
            </button>
          </MenuItem>
          <MenuItem>
            <button className="w-full rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <Icon icon="signout" />
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default MobileEditUser