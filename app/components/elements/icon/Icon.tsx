import { iconList } from '@/app/utils/iconList'

type Props = {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
}

const Icon = ({ icon, color, size, className }: Props) => {

  const IconType = iconList[icon];

  return (
    <IconType color={color} size={size} className={className} />
  )
}

export default Icon