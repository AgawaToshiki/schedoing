import { IconType } from 'react-icons';
import { FaUser, FaPlus, FaChevronDown } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdSpaceDashboard, MdEditCalendar, MdSchedule, MdDelete, MdSettings } from "react-icons/md";

export const iconList: Record<string, IconType> = {
  'dashboard': MdSpaceDashboard,
  'schedule': MdEditCalendar,
  'work': MdSchedule,
  'user': FaUser,
  'plus': FaPlus,
  'delete': MdDelete,
  'close': IoClose,
  'down': FaChevronDown,
  'setting': MdSettings
}