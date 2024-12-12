import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type Props = {
  id: string;
  name: string;
  title: string;
  value: Date;
  filterTime: (time: Date) => boolean;
  setter: React.Dispatch<React.SetStateAction<Date>>;
  onChange?: (date: Date) => void;
};

const TimePicker = (props: Props) => {
  
  const handleChange = (date: Date | null) => {
    if(date) {
      props.setter(date);
      props.onChange && props.onChange(date);
    }
  }


  return (
    <>
      <DatePicker
        id={props.id}
        timeFormat={'HH:mm'}
        selected={props.value}
        onChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        filterTime={props.filterTime}
        timeCaption={props.title}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.blur()}
        dateFormat='HH:mm'
        className="w-full border rounded-sm border-gray-200 shadow-md block p-1 h-12 max-md:h-10"
      />
    </>

  );
}

export default TimePicker