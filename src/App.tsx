import React, {  } from 'react';
import './App.css';
import ChipInput from "./components/ChipInput";
import { OptionItem, SelectedChipItem } from "./components/ChipListItems";

function App() {
  const [options, setOptions] = React.useState([])

  const fetchOptions = React.useCallback(async () => {
    try {
      const res = await fetch('https://dummyjson.com/users?select=firstName,lastName,email,image')
      const data = await res.json()
      if (Array.isArray(data.users)) setOptions(data.users)
    } catch (err) {
    }
  }, [])

  React.useEffect(() => {
    fetchOptions()
  }, [fetchOptions])

  return (
    <div>
      <ChipInput
        optionsList={options}
        OptionItemComponent={OptionItem}
        ChipComponent={SelectedChipItem} />
    </div>
  )
}
export default App;
