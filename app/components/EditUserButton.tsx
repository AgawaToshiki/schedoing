'use client'
import React from 'react'

type Props = {
  id: string;
}

const EditUserButton = ({ id }: Props) => {
  const handleEdit = (id: string) => {

  }
  return (
    <button className="p-1 border bg-green-400" onClick={ () => handleEdit(id) }>編集</button>
  )
}

export default EditUserButton