import { IconType } from 'react-icons';
import { FaUser, FaPlus } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { MdSpaceDashboard, MdSchedule, MdDelete } from "react-icons/md";

export const iconList: Record<string, IconType> = {
  'dashboard': MdSpaceDashboard,
  'schedule': MdSchedule,
  'user': FaUser,
  'plus': FaPlus,
  'delete': MdDelete,
  'close': IoClose
}