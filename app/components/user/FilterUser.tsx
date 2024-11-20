import React from 'react';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

const FilterUser = () => {

  return (
    <>
      <div>
        <Button
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