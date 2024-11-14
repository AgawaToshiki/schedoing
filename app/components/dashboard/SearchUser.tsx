import React from 'react';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUser = ({ onChange }: Props) => {

  return (
    <input
      type="text"
      onChange={onChange}
      placeholder="ユーザー名で検索"
      className="w-[300px] border border-gray-200 shadow-md text-base block p-1 h-12"
    />
  )
}

export default SearchUser