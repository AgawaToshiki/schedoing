'use client'
import React, { useEffect, useState } from 'react'
import TimePicker from '../../components/TimePicker';
import Button from '../../components/elements/Button';
import Icon from '../../components/elements/Icon';
import Ellipses from '../../components/elements/Ellipses';
import { handleSetEmptyErrorMessage } from '@/app/utils/functions';
import { toZonedTime } from 'date-fns-tz';
import { BASE_URL } from '../../constants/paths';

type Props = {
  scheduleId?: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  userId: string;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
}

const ScheduleForm = (props: Props) => {

  const defaultStartDate = toZonedTime(new Date(props.startTime), 'Asia/Tokyo');
  const defaultEndDate = toZonedTime(new Date(props.endTime), 'Asia/Tokyo');

  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);
  const [startTime, setStartTime] = useState<Date>(defaultStartDate);
  const [endTime, setEndTime] = useState<Date>(defaultEndDate);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const checkChangeState = (): void => {
    if(props.name === "update") {
      const isSetTitle = !!title;
      const hasChanged = 
        title !== props.title ||
        description !== props.description ||
        startTime.getTime() !== props.startTime.getTime() ||
        endTime.getTime() !== props.endTime.getTime();
      setDisabled(!isSetTitle || !hasChanged);
    } else if (props.name === "register") {
      setDisabled(title === props.title);
    }
  }

  useEffect(() => {
    checkChangeState();
  }, [title, description, startTime, endTime])


  const handleChangeStartTime = (newStartTime: Date) => {
    //設定した開始時刻が終了時刻より後の場合は終了時刻を開始時刻+15分に設定
    if(newStartTime.getTime() >= endTime.getTime()){
      const newEndTime = new Date(newStartTime.getTime());
      newEndTime.setMinutes(newEndTime.getMinutes() + 15);
      setEndTime(newEndTime);
    }
  }

  const handleChangeEndTime = (newEndTime: Date) => {
    //設定した終了時刻が開始時刻より前の場合は開始時刻を終了時刻-15分に設定
    if(newEndTime.getTime() <= startTime.getTime()){
      const newStartTime = new Date(newEndTime.getTime());
      newStartTime.setMinutes(newStartTime.getMinutes() - 15);
      setStartTime(newStartTime);
    }
  }

  const filterStartTime = (time: Date): boolean => {
    const selectedDate = new Date(time);

    // 23:45 を選択不可にする
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    return !(hour === 23 && minutes === 45);
  };

  const filterEndTime = (time: Date): boolean => {
    const selectedDate = new Date(time);

    // 00:00 を選択不可にする
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    return !(hour === 0 && minutes === 0);
  };

  const renderSubmitButton = (): React.JSX.Element | null => {
    if(props.name === 'register') {
      return (
        <Button
          variant="primary"
          size="medium"
          form="circle"
          attrs={
            {
              type: "submit",
              disabled: disabled
            }
          }
          className="w-[50px] h-[50px]"
        >
          <Icon icon="plus" color="#fff" size={20} />
        </Button>
      )
    }
    if(props.name === 'update') {
      return (
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="medium"
            form="square"
            attrs={
              {
                type: "submit",
                disabled: disabled
              }
            }
          >
            {isProcessing ? (
              <Ellipses>更新中</Ellipses>
            ) : (
              "更新する"
            )}
          </Button>
        </div>
      )
    }
    return null
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isProcessing) {
      return
    }
    setIsProcessing(true);
    try{
      if(props.name === "register") {
        const response = await fetch(`${BASE_URL}/api/schedules`, {
          cache: "no-store",
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, startTime, endTime, userId: props.userId }),
        })
        const data = await response.json();

        if(!response.ok){
          console.error(response.status, data.error);
          alert(`${response.status}:${data.error}`);
          setIsProcessing(false);
        }
      }

      if(props.name === "update") {
        const response = await fetch(`${BASE_URL}/api/schedules/${props.scheduleId}`, {
          cache: "no-store",
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, startTime, endTime, userId: props.userId }),
        })
  
        const data = await response.json();
  
        if(!response.ok){
          console.error(response.status, data.error);
          alert(`${response.status}:${data.error}`);
          setIsProcessing(false);
        }
      }

      if(props.setter){
        props.setter(false);
      }
      setStartTime(props.startTime);
      setEndTime(props.endTime);
      setTitle("");
      setDescription("");
      setIsProcessing(false);
    }catch(error){
			console.error("fetch Error:", error);
      alert("スケジュール作成に失敗しました。ネットワーク接続を確認してください。");
      setIsProcessing(false);
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-6 max-md:mb-4">
          <div className="mb-2">
            <label htmlFor={`${props.name}title`}>タイトル</label>
            <input 
              type="text"
              name="title"
              id={`${props.name}title`}
              placeholder={`${props.name === "register" ? ("例）会議") : ("")}`}
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              onFocus={() => window.scrollTo(0, 0)}
							onBlur={() => handleSetEmptyErrorMessage(title === "", setTitleErrorMessage)}
              className={`w-full border rounded-sm shadow-md block px-2 h-12 ${titleErrorMessage ? ("border-red-400") : ("border-gray-200")} max-md:h-10`}
              required
            />
            {titleErrorMessage && (<p className="pt-2 text-sm text-red-400">{titleErrorMessage}</p>)}
          </div>
          <div className="flex items-end w-full mb-2">
            <div className="flex flex-col w-full mr-2">
              <label htmlFor={`${props.name}startTime`}>開始</label>
              <TimePicker
                id={`${props.name}startTime`}
                name='startTime'
                title='開始'
                value={startTime}
                filterTime={filterStartTime}
                setter={setStartTime}
                onChange={handleChangeStartTime}
              />
            </div>
            <div className="flex items-center h-12 max-md:h-10">～</div>
            <div className="flex flex-col w-full ml-2">
              <label htmlFor={`${props.name}endTime`}>終了</label>
              <TimePicker
                id={`${props.name}endTime`}
                name='endTime'
                title='終了'
                value={endTime}
                filterTime={filterEndTime}
                setter={setEndTime}
                onChange={handleChangeEndTime}
              />
            </div>
          </div>
          <div>
            <label htmlFor={`${props.name}description`}>備考</label>
            <input
              type="text"
              name="description"
              id={`${props.name}description`}
              value={description ? description : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              onFocus={() => window.scrollTo(0, 0)}
              className="w-full border rounded-sm border-gray-200 shadow-md block px-2 h-12 max-md:h-10"
            />
          </div>
        </div>
        {renderSubmitButton()}
      </form>
    </>
  )
}

export default ScheduleForm