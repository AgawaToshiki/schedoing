'use client'
import React, { useEffect, useState } from 'react';
import Button from '../../components/elements/Button';
import SelectRadioElement from '../../components/user/SelectRadioElement';


type Props = {
  onClick: (role: string, createTime: string, flag: boolean) => void;
  defaultFilter: {
    role: string;
    createTime: string;
  }
}

const FilterUserField = ({ onClick, defaultFilter }: Props) => {
  const [role, setRole] = useState<string>(defaultFilter.role);
  const [createTime, setCreateTime] = useState<string>(defaultFilter.createTime);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if(role || createTime){
      setDisabled(false);
    }
  }, [role, createTime])

  const handleFilter = () => {
    onClick(role, createTime, true);
  }

  const handleResetFilter = () => {
    onClick("", "", false);
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
          onClick={handleResetFilter}
          variant="secondary"
          size="medium"
          form="square"
          attrs={
            { type: "button" }
          }
        >
          リセット
        </Button>
        <Button
          onClick={handleFilter}
          variant="primary"
          size="medium"
          form="square"
          attrs={
            {
              type: "button",
              disabled: disabled
            }
          }
        >
          適用する
        </Button>
      </div>
    </>
  )
}

export default FilterUserField