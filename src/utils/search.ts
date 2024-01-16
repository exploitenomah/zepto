


export function findMatchingOptions(listOfOptions: {[x:string]: string | number}[], search: string) {
  if (search.length === 0) return listOfOptions
  return listOfOptions.filter(opt => {
    return JSON.stringify(Object.values(opt).join(" ")).toLowerCase().includes(search.toLowerCase())
  })
}

export function findNonSelectedOptions(total: {[x:string]: string | number}[], selectedOpts: {[x:string]: string | number}[]) {
  return total.filter(opt => {
    return selectedOpts.find(it => it.id === opt.id) === undefined
  })
}

export function highlightMatch(fullString: string, search: string) {
  if (search.length === 0) return fullString
  if (fullString.toLowerCase().includes(search.toLowerCase()) === false) return fullString
  const splitStr = fullString.split(search)
  return splitStr.join(`<span class="text-gray-500 font-[300]">${search}</span>`)
}