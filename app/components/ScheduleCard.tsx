import React from 'react'

type Props = {
  schedule: {
    id: string,
    title: string,
    start_time: Date,
    end_time: Date
  }
}

const ScheduleCard = ({schedule}: Props) => {
  return (
    <>
      <div className="flex flex-col bg-green-400">
        <div>{schedule.title}</div>
        <div>{schedule.start_time.toString()}</div>
        <div>{schedule.end_time.toString()}</div>
      </div>
    </>
  )
}

export default ScheduleCard