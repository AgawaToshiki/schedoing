import React from 'react';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  filterFlag: boolean;
}

const FilterUser = ({ onClick, filterFlag }: Props) => {

  return (
    <>
    {filterFlag ? (
      <Button
        onClick={onClick}
        variant="primary"
        size="medium"
        form="square"
        className="bg-green-500 border-green-500"
        attrs={{
          type: 'button'
        }}
      >
        <div className="flex items-center gap-1.5">
          <p>フィルター中</p>
          <Icon icon="filter" size={20} />
        </div>
      </Button>
    ) : (
      <Button
        onClick={onClick}
        variant="primary"
        size="medium"
        form="square"
        attrs={{
          type: 'button'
        }}
      >
        <div className="flex items-center gap-1.5">
          <p>フィルター</p>
          <Icon icon="filter" size={20} />
        </div>
      </Button>
    )}

    </>
  )
}

export default FilterUser