'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Switch from '../../components/elements/Switch';
import { BASE_URL } from '../../constants/paths';
import { useToast } from '../../context/ToastContext';


type Props = {
  id: string;
  title: string;
  name: string;
  defaultFlag: boolean;
}


const SwitchFlagElement = ({ id, title, name, defaultFlag }: Props) => {

  const router = useRouter();

  const { showToast } = useToast();

  const [enabled, setEnabled] = useState<boolean>(defaultFlag);

  const handleChangeToggle = async() => {

    const newFlag = !enabled;

    setEnabled(newFlag);

    try {
      const response = await fetch(`${BASE_URL}/api/users/${id}/${name}`, {
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
        showToast(`${data.error}`, 'error');
        setEnabled(!newFlag);
        return
			}

      router.refresh();

    } catch(error) {
      console.error("fetch Error:", error);
      showToast('変更に失敗しました、ネットワーク接続を確認してください', 'error');
      setEnabled(!newFlag);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="select-none">{title}</div>
        <Switch checked={enabled} onChange={handleChangeToggle} />
      </div>
    </>
  )
}

export default SwitchFlagElement