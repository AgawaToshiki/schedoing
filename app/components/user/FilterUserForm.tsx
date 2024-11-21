'use client'
import React, { useEffect, useState } from 'react';
import Button from '../../components/elements/Button';


type Props = {
  onClick: (role: string, createTime: string) => void;
  defaultFilter: {
    role: string,
    createTime: string;
  }
}

const FilterUserForm = ({ onClick, defaultFilter }: Props) => {
  const [role, setRole] = useState<string>(defaultFilter.role);
  const [createTime, setCreateTime] = useState<string>(defaultFilter.createTime);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if(role || createTime){
      setDisabled(false);
    }
  }, [role, createTime])

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  }

  const handleChangeCreateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTime(e.target.value);
  }

const handleFilter = () => {
  onClick(role, createTime);
}

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col mb-6">
          <p className="mb-2 border-b-2 border-gray-600">役職</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={handleChangeRole}
                className="hidden peer"
              />
              <label
                htmlFor="admin"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer select-none transition duration-200 ease-in-out hover:bg-white"
              >
                admin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={handleChangeRole}
                className="hidden peer"
              />
              <label
                htmlFor="user"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer select-none transition duration-200 ease-in-out hover:bg-white"
              >
                user
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <p className="mb-2 border-b-2 border-gray-600">追加日時</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="asc"
                name="create_time"
                value="asc"
                checked={createTime === "asc"}
                onChange={handleChangeCreateTime}
                className="hidden peer"
              />
              <label
                htmlFor="asc"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer select-none transition duration-200 ease-in-out hover:bg-white"
              >
                昇順
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="desc"
                name="create_time"
                value="desc"
                checked={createTime === "desc"}
                onChange={handleChangeCreateTime}
                className="hidden peer"
              />
              <label
                htmlFor="desc"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer select-none transition duration-200 ease-in-out hover:bg-white"
              >
                降順
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
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

export default FilterUserForm