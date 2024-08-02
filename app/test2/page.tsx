import React from 'react'

async function getData() {
  const res = await fetch('http://localhost:3000/api',{ cache: 'no-store' })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page2() {
  const data = await getData()
  console.log(data)
  return (
    <div>
      {data.map((item: any) => (
        <p key={item.id}>{item.message}</p>
      ))}
    </div>
  )
}
