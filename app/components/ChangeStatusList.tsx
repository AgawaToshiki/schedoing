'use client'
import React, { useEffect, useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import Icon from '../components/elements/Icon'
import { supabase } from '../lib/supabase'
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { getUser } from '../utils/supabase/supabaseFunctions';
import { BASE_URL } from '../constants/paths';


type Props = {
  id: string;
}

const ChangeStatusList = ({ id }: Props) => {

  const statusList = [
    { id: 1, status: 'online', name: 'オンライン', style: 'bg-green-400' },
    { id: 2, status: 'leave', name: '退席中', style: 'bg-yellow-400' },
    { id: 3, status: 'busy', name: '取り込み中', style: 'bg-red-400' },
  ]

  const [selectedItem, setSelectedItem] = useState<{ id: number, name: string, style: string }>(statusList[0]);

  useEffect(() => {
    (async () => {
      const data = await getUser(id);
      if(data){
        const item = statusList.find(item => item.status === data.status) || statusList[0];
        setSelectedItem(item);
      }
    })()

    const channel = supabase
    .channel('users')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'users',
      filter: `id=eq.${id}`
    },
    (payload: RealtimePostgresUpdatePayload<{ [key: string]: string }>) => {
      const updatedStatus = payload.new.status;
      const updatedItem = statusList.find(item => item.status === updatedStatus);
      if (updatedItem) {
        setSelectedItem(updatedItem);
      }
    }
    )
    .subscribe();

    return () => {
      channel.unsubscribe();
    }
  }, [])



  const handleChangeStatus = async(item: { id: number, name: string, style: string, status: string }) => {

    const oldSelectedItem = selectedItem;
    setSelectedItem(item);

    try {
      const response = await fetch(`${BASE_URL}/api/users/${id}/status`, {
        cache: 'no-store',
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: item.status })
      })

      const data = await response.json();

      if(!response.ok) {
				console.error(response.status, data.error);
				alert(`${response.status}:${data.error}`);
        setSelectedItem(oldSelectedItem);
        return
			}

    } catch(error) {
      console.error("fetch Error:", error);
      alert("ステータス更新に失敗しました。ネットワーク接続を確認してください。");
      setSelectedItem(oldSelectedItem);
    }
  }

  return (
    <Listbox value={selectedItem} onChange={handleChangeStatus}>
      <ListboxButton className="flex items-center justify-center gap-1.5 w-[120px] p-1 border rounded-md">
        <div>
          {selectedItem.name}
        </div>
        <div className={`w-4 h-4 rounded-full ${selectedItem.style}`}></div>
      </ListboxButton>
      <ListboxOptions
        anchor="right"
        transition
        className="bg-red-100 w-[150px] [--anchor-gap:5px] border origin-top transition duration-200 ease-out cursor-pointer data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {statusList.map((item) => (
          <ListboxOption key={item.id} value={item} className="group flex items-center gap-1.5 p-2 data-[focus]:bg-green-100">
            <div className="invisible group-data-[selected]:visible">
              <Icon
                icon="check"
                size={20}
                className="text-gray-800"
              />
            </div>
            <div>
              {item.name}
            </div>
            <div className={`w-4 h-4 rounded-full ml-auto ${item.style}`}></div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default ChangeStatusList
