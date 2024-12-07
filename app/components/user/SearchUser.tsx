'use client'
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

type Props = {
  query: string;
}

const SearchUser = ({ query = "" }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState<string>(query);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if(!search || search.trim() === ""){
      params.delete('search');
      router.push(`${pathname}?${params.toString()}`);
      setSearch("");
      return
    }
    params.set('search', search);
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div className="relative max-w-[300px]">
            <input
              type="text"
              placeholder="ユーザー名で検索"
              className="w-full border border-gray-200 shadow-md text-base block px-2 h-12"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            {!search && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <Icon icon="search" size={20} color="#a3a9b4" />
              </div>
            )}
          </div>
          <Button
            variant="primary"
            size="medium"
            form="square"
            attrs={{
              type: "submit"
            }}
          >
            検索する
          </Button>
        </div>
      </form>
    </>
  )
}

export default SearchUser