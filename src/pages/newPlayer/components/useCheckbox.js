import { useState } from "react";

const useCheckbox = (checkboxSelected, setCheckboxSelected) => {
  const [itemSelected, setItemSelected] = useState([]);

  const handleChecked = (e) => {
    const { name } = e.target;
    if (e.target.checked) {
      setItemSelected((prevState) => [...prevState, name]);
      setCheckboxSelected((prevState) => [...prevState, name]);
    } else {
      const newItem = checkboxSelected.filter((data) => data !== e.target.name);
      setItemSelected(newItem);
      setCheckboxSelected(newItem);
    }
  };
  return { handleChecked, itemSelected };
};

export default useCheckbox;
