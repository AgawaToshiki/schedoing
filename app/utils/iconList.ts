import { IconType } from 'react-icons';
import { FaUser, FaPlus, FaChevronDown, FaRegTrashAlt } from 'react-icons/fa';
import { IoClose, IoSearch } from "react-icons/io5";
import { MdSpaceDashboard, MdEditCalendar, MdEdit, MdSettings, MdFilterListAlt, MdOutlineLogout } from "react-icons/md";
import { FaEllipsis } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";

export const iconList: Record<string, IconType> = {
  'dashboard': MdSpaceDashboard,
  'schedule': MdEditCalendar,
  'user': FaUser,
  'plus': FaPlus,
  'edit': MdEdit,
  'delete': FaRegTrashAlt,
  'close': IoClose,
  'down': FaChevronDown,
  'setting': MdSettings,
  'search': IoSearch,
  'filter': MdFilterListAlt,
  'signout' : MdOutlineLogout,
  'ellipsis': FaEllipsis,
  'message': TbMessage
}