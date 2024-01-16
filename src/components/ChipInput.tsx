import React, { FunctionComponent, KeyboardEventHandler } from "react"
import { findNonSelectedOptions, findMatchingOptions } from "../utils/search"
import { UserOption } from "../types/User"
import { useOutsideClick } from "../hooks/useOutsideClick"

export default function ChipInput({ optionsList, OptionItemComponent, ChipComponent }: {
  optionsList: UserOption[],
  OptionItemComponent: FunctionComponent<{ search?: string, option: UserOption }>,
  ChipComponent: FunctionComponent<{ search?: string, option: UserOption }>
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [hasBackspacedOnce, setHasBackspacedOnce] = React.useState(false)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [selectedOptions, setSelectedOptions] = React.useState<UserOption[]>([])
  const [search, setSearch] = React.useState("")
  const optionsListToSearch = React.useMemo(() => {
    return findNonSelectedOptions(optionsList, selectedOptions)
  }, [optionsList, selectedOptions])
  const optionsListToDisplay = React.useMemo(() => {
    return findMatchingOptions(optionsListToSearch, search)
  }, [optionsListToSearch, search])

  const removeSelection = React.useCallback((id: number) => {
    setHasBackspacedOnce(false)
    inputRef.current?.select()
    setSelectedOptions(prev => prev.filter(it => it.id !== id))
  }, [])

  const handleEnter = React.useCallback(() => {
    setHasBackspacedOnce(false)
    if (optionsListToDisplay.length === 1) {
      setSelectedOptions(prev => ([...prev, optionsListToDisplay[0] as UserOption]))
      inputRef.current?.select()
    }
  }, [optionsListToDisplay])

  const handleBackspace = React.useCallback(() => {
    if (search.length === 0) {
      if (hasBackspacedOnce) {
        setSelectedOptions(prev => prev.filter((_, idx) => idx !== prev.length - 1))
      } else {
        setHasBackspacedOnce(true)
      }
    }
  }, [hasBackspacedOnce, search])

  const handleKeyDown: KeyboardEventHandler = React.useCallback((e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      handleBackspace()
    } else {
      setHasBackspacedOnce(false)
    }
    if (e.key === "Enter") {
      handleEnter()
    }
  }, [handleBackspace, handleEnter])

  useOutsideClick(containerRef, () => setShowSuggestions(false))

  return (
    <div
      ref={containerRef}
    >
      <ul className="border-solid border-b-4 border-blue-600 gap-4 py-2 flex items-center flex-wrap">
        {selectedOptions.map((opt, idx) =>
          <li key={opt.id} className={`rounded-full px-4 py-3 bg-gray-200 gap-3 flex items-center ${hasBackspacedOnce && idx === selectedOptions.length - 1 ? "bg-red-200" : ""}`}><ChipComponent option={opt} /> <button onClick={() => removeSelection(opt.id)}>X</button></li>
        )}
        <li className="relative grow bg-white">
          <label className="w-full bg-white">
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              placeholder="Start typing"
              className="focus:outline-none p-3 inline-block w-full bg-white"
              onFocus={() => setShowSuggestions(true)}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
          </label>
          <ul
            className={`${showSuggestions ? "visible opacity-100" : "invisible opacity-0 max-h-0"} max-h-[25rem] py-4 flex flex-col absolute top-[110%] overflow-auto shadow-lg rounded-md`}>
            {optionsListToDisplay.map(option => (
              <li
                onClick={() => {
                  setSelectedOptions(prev => ([...prev, option as UserOption]))
                  inputRef.current?.focus()
                  inputRef.current?.select()
                }}
                key={option.id}
                className="cursor-pointer px-5 py-3 hover:bg-gray-300">
                <OptionItemComponent key={option.id} search={search} option={option as UserOption} />
              </li>
            ))}
          </ul>
        </li>
      </ul>

    </div>
  )
}