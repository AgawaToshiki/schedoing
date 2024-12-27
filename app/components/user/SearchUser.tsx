'use client'
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';

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
          <div className="relative w-[300px] max-sm:w-auto">
            <Input
              type="text"
              placeholder="ユーザー名で検索"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            {!search && (
              <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[90%] pointer-events-none max-md:hidden">
                <Icon icon="search" size={20} color="#a3a9b4" />
              </div>
            )}
          </div>
          <div>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              form="square"
              position="center"
            >
              <div className="max-md:hidden">検索する</div>
              <Icon icon="search" size={20} color="#fff" className="hidden max-md:block" />
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default SearchUser