import React from 'react';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilterUser = ({ onClick }: Props) => {

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default FilterUser