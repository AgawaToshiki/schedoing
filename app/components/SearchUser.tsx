import React from 'react';
import Icon from '../components/elements/Icon'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  is_set: boolean;
}

const SearchUser = ({ onChange, is_set }: Props) => {

  return (
    <>
      <div className="relative w-[300px]">
        <input
          type="text"
          onChange={onChange}
          placeholder="ユーザー名で検索"
          className="w-[300px] border border-gray-200 shadow-md text-base block p-1 h-12"
        />
        {!is_set && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <Icon icon="search" size={20} color="#a3a9b4" />
          </div>
        )}
      </div>
    </>
  )
}

export default SearchUser