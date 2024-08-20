import React from 'react'
import CurrentTimeBorder from '../components/CurrentTimeBorder'
import ScheduleCard from '../components/ScheduleCard'

type Props = {
  schedules: {
    id: string,
    title: string,
    start_time: Date,
    end_time: Date
  }[] | undefined
}

const SchedulePanel = ({schedules}: Props) => {

  const timeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  return (
    <>
      <div className="w-full h-full mx-4 p-6 border border-gray-200 rounded-md shadow-md bg-white">
        <div className="relative h-full overflow-y-scroll">
          <div className="absolute w-full h-full">
            <CurrentTimeBorder />
            {schedules?.map((schedule) => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))}

            {timeArray.map((index) => (
              <div key={index}>
                <div className="absolute" style={{ top: `${index * 60}px`}}>
                  <div>{index}:00</div>
                </div>
                <div className="absolute w-full h-[1px] bg-gray-300" style={{ top: `${index * 60}px`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SchedulePanel

