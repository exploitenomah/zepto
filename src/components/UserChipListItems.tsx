import { highlightMatch } from "../utils/search"


type UserOption = {
  firstName: string,
  lastName: string,
  email: string,
  id: number
  image: string
}

export function UserOptionItem({ option, search }: {
  option: { [x: string]: string | number }
  search?: string
}) {
  const typedOption = option as UserOption
  return (
    <span className="flex gap-3 items-center">
      <img width={40} height={40} src={typedOption.image} alt={`${typedOption.firstName} ${typedOption.lastName}`}
        className="rounded-full bg-green-300 border shadow-sm" />
      <b dangerouslySetInnerHTML={{ __html: highlightMatch(`${typedOption.firstName} ${typedOption.lastName}`, search as string)}} className="text-sm font-bold capper"></b>
      <span dangerouslySetInnerHTML={{ __html: highlightMatch(typedOption.email, search as string) }} className="text-gray-600 text-sm" />
    </span>
  )
}

export function UserSelectedChipItem({ option }: {
  option: { [x: string]: string | number },
}) {
  const typedOption = option as UserOption
  return (
    <span className="flex gap-3 items-center">
      <img width={30} height={30} src={typedOption.image} alt={`${typedOption.firstName} ${typedOption.lastName}`}
        className="rounded-full bg-green-300 border shadow-sm" />
      <b className="text-sm font-bold">{typedOption.firstName} {typedOption.lastName}</b>
    </span>
  )
}