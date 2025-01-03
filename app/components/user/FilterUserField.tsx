'use client'
import React, { useEffect, useState } from 'react';
import Button from '../../components/elements/Button';
import SelectRadioElement from '../../components/user/SelectRadioElement';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


type Props = {
  defaultFilter: {
    role: string;
    createTime: string;
  }
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUserField = ({ defaultFilter, setter }: Props) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [role, setRole] = useState<string>(defaultFilter.role);
  const [createTime, setCreateTime] = useState<string>(defaultFilter.createTime);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if(role || createTime){
      setDisabled(false);
    }
  }, [role, createTime])

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    if(role){
      params.set('role', role);
    }
    if(createTime){
      params.set('create_time', createTime);
    }
    router.push(`${pathname}?${params.toString()}`)
    setter(false);
  }

  const handleResetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('role');
    params.delete('create_time');
    router.push(`${pathname}?${params.toString()}`);
    setter(false);
  }

  return (
    <>
      <div className="flex flex-col">
        <SelectRadioElement
          title="権限"
          name="role"
          selected={role}
          valueList={[
            { label: 'admin', value: 'admin' }, 
            { label: 'user', value: 'user' }
          ]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
        />
        <SelectRadioElement
          title="登録日時"
          name="create_time"
          selected={createTime}
          valueList={[
            { label: '古い順', value: 'asc' }, 
            { label: '新しい順', value: 'desc' }
          ]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreateTime(e.target.value)}
        />
      </div>
      <div className="flex gap-4 justify-end items-center">
        <Button
          type="button"
          onClick={handleResetFilter}
          variant="secondary"
          size="medium"
          form="square"
          position="center"
        >
          リセット
        </Button>
        <Button
          type="button"
          disabled={disabled}
          onClick={handleFilter}
          variant="primary"
          size="medium"
          form="square"
          position="center"
        >
          適用する
        </Button>
      </div>
    </>
  )
}

export default FilterUserField