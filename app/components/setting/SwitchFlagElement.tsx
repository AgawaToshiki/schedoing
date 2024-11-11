'use client'
import React, { useState } from 'react';
import Switch from '../../components/elements/Switch';


type Props = {
  id: string;
  title: string;
  name: string;
  flag: boolean;
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const SwitchFlagElement = ({ id, title, name, flag }: Props) => {

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
      <div className="flex items-center gap-1.5">
        <div className="cursor-default select-none">{title}</div>
        <Switch checked={enabled} onChange={handleChangeToggle} />
      </div>
    </>
  )
}

export default SwitchFlagElement