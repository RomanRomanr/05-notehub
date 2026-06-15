import { type ChangeEvent } from "react"; 
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (searchText: string) => void; 
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return (
    <input
      type="text"
      className={css.input} 
      placeholder="Search notes"
      onChange={onInputChange}
    />
  );
}
