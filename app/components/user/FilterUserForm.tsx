'use client'
import React from 'react';
import Button from '../../components/elements/Button';


type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  filter: {
    role: string;
    createTime: string;
  }
  setter: {
    role: React.Dispatch<React.SetStateAction<string>>;
    createTime: React.Dispatch<React.SetStateAction<string>>;
  },
  disabled: boolean;
}

const FilterUserForm = ({ onClick, filter, setter, disabled }: Props) => {

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter.role(e.target.value);
  }

  const handleChangeCreateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setter.createTime(e.target.value);
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
                checked={filter.role === "admin"}
                onChange={handleChangeRole}
                className="hidden peer"
              />
              <label
                htmlFor="admin"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer"
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
                checked={filter.role === "user"}
                onChange={handleChangeRole}
                className="hidden peer"
              />
              <label
                htmlFor="user"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer"
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
                checked={filter.createTime === "asc"}
                onChange={handleChangeCreateTime}
                className="hidden peer"
              />
              <label
                htmlFor="asc"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer"
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
                checked={filter.createTime === "desc"}
                onChange={handleChangeCreateTime}
                className="hidden peer"
              />
              <label
                htmlFor="desc"
                className="p-1 border-2 rounded-md border-gray-600 peer-checked:bg-green-300 cursor-pointer"
              >
                降順
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
          <Button
            onClick={onClick}
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