import { UserOption } from "../types/User"
import { highlightMatch } from "../utils/search"



export function OptionItem({ option, search }: {
  option: UserOption
  search?: string
}) {
  return (
    <span className="flex gap-3 items-center">
      <img width={40} height={40} src={option.image} alt={`${option.firstName} ${option.lastName}`}
        className="rounded-full bg-green-300 border shadow-sm" />
      <b dangerouslySetInnerHTML={{ __html: highlightMatch(`${option.firstName} ${option.lastName}`, search as string) }} className="text-sm font-bold"></b>
      <span dangerouslySetInnerHTML={{ __html: highlightMatch(option.email, search as string) }} className="text-gray-500 text-sm" />
    </span>
  )
}

export function ChipItem({ option }: {
  option: UserOption,
}) {
  return (
    <span className="flex gap-3 items-center">
      <img width={25} height={25} src={option.image} alt={`${option.firstName} ${option.lastName}`}
        className="rounded-full bg-green-300 border shadow-sm" />
      <b className="text-sm font-bold">{option.firstName} {option.lastName}</b>
    </span>
  )
}