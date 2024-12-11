'use client'
import React, { useState } from 'react';
import Modal from '../../components/layouts/Modal';
import FilterUserField from '../../components/user/FilterUserField';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';


type Props = {
  query: {
    role: string;
    create_time: string;
  };
}

const FilterUser = ({ query }: Props) => {

  const defaultFilterFlag = !!query.role || !!query.create_time;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  }
  

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="primary"
        size="medium"
        form="square"
        className={`${defaultFilterFlag ? ("bg-green-500 border-green-500") : ""}`}
        attrs={{
          type: 'button'
        }}
      >
        <div className="flex items-center gap-1.5">
          {defaultFilterFlag ? (
            <p className="max-md:hidden">フィルター中</p>
          ) : (
            <p className="max-md:hidden">フィルター</p>
          )}
          <Icon icon="filter" size={20} />
        </div>
      </Button>

      <Modal isOpen={isOpen} setter={setIsOpen} title="絞り込み・並び替え">
        <FilterUserField
          defaultFilter={{
            role: query.role,
            createTime: query.create_time
          }}
          setter={setIsOpen}
        />
      </Modal>
    </>
  )
}

export default FilterUser