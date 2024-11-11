'use client'
import React, { useState } from 'react';
import Switch from '../elements/switch/Switch';


type Props = {
  id: string;
  title: string;
  name: string;
  flag: boolean;
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const ChangeResetSchedule = ({ id, title, name, flag }: Props) => {

  const [enabled, setEnabled] = useState<boolean>(flag);

  const handleChangeToggle = async() => {

    const newFlag = !enabled;

    setEnabled(newFlag);

    try {
      const response = await fetch(`${base_url}/api/users/${id}/${name}`, {
        cache: 'no-store',
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ flag: newFlag })
      });

      const data = await response.json();

      if(!response.ok) {
				console.error(response.status, data.error);
				alert(`${response.status}:${data.error}`);
        setEnabled(!newFlag);
        return
			}

    } catch(error) {
      console.error("fetch Error:", error);
      alert("変更に失敗しました。ネットワーク接続を確認してください。");
      setEnabled(!newFlag);
    }
  }

  return (
    <>
      {/* <div className="flex items-center gap-1.5">
        <div className="cursor-default select-none">日付変更時にスケジュールをリセット</div>
        <Switch
          checked={enabled}
          onChange={handleChangeToggle}
          name="toggle"
          className="group inline-flex items-center h-6 w-12 cursor-pointer rounded-full bg-gray-200 data-[checked]:bg-green-500 p-1 transition-colors duration-200 ease-in-out"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>
      </div> */}
      <div className="flex items-center gap-1.5">
        <div className="cursor-default select-none">{title}</div>
        <Switch checked={enabled} onChange={handleChangeToggle} />
      </div>

    </>
  )
}

export default ChangeResetSchedule