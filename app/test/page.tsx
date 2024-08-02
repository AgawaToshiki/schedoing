'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const page = () => {
  const [data, setData] = useState<{ id: string, message: string }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api')
      const result = await response.json()
      setData(result)
    }
    fetchData();
  },[])
  return (
    <>
      {data.map((item) => (
        <div key={item.id}>{item.message}</div>
      ))}
    </>
  )
}

export default page