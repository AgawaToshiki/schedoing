import React from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortUser = ({ value, onChange }: Props) => {

  return (
    <>
      <select
        name="role"
        id="editRole"
        value={value}
        onChange={onChange}
        className="w-[300px] border border-gray-200 shadow-md text-base block p-1 h-12 appearance-none"
        required
      >
        <option value="" >すべて表示</option>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
    </>
  )
}

export default SortUser