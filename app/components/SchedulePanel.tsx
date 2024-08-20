import React from 'react'
import CurrentTimeBorder from '../components/CurrentTimeBorder'

const SchedulePanel = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const currentTimeHeight = hours *60 + minutes;
  const timeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  return (
    <>
      <div className="w-full h-full mx-4 p-6 border border-gray-200 rounded-md shadow-md bg-white">
        {/* <div className="mb-6">
          <h2>SchedulePanel</h2>
        </div> */}
        <div className="relative h-full overflow-y-scroll">
          <div className="absolute w-full h-full">
            {/* <div className="absolute top-[0px]">
              <div>0:00</div>
            </div>
            <div className="absolute top-[0px] w-full h-[1px] bg-gray-300"></div>
            <div className="absolute top-[60px]">
              <div>1:00</div>
            </div>
            <div className="absolute top-[60px] w-full h-[1px] bg-gray-300"></div>
            <div className="absolute top-[120px]">
              <div>2:00</div>
            </div>
            <div className="absolute top-[120px] w-full h-[1px] bg-gray-300"></div> */}
            <CurrentTimeBorder currentTimeHeight={currentTimeHeight}/>
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

