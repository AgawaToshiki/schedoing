import React from 'react';
import Icon from '../../components/elements/Icon'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  is_set: boolean;
}

const SearchUser = ({ onChange, is_set }: Props) => {

  return (
    <>
      <div className="relative max-w-[300px]">
        <input
          type="text"
          onChange={onChange}
          placeholder="ユーザー名で検索"
          className="w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 max-md:h-10 max-md:shadow-sm"
        />
        {!is_set && (
          <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[90%] pointer-events-none">
            <Icon icon="search" size={20} color="#a3a9b4" />
          </div>
        )}
      </div>
    </>
  )
}

export default SearchUser