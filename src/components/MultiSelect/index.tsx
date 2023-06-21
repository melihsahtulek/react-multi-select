import { createContext, useState } from 'react';
import styles from '@/components/MultiSelect/multi-select.module.css';

export const MultiSelectContext = createContext({});

function SelectButton() {
  return <input type="text" className={styles.select_button} />;
}

function SelectBody() {
  return <div>Body</div>;
}

export default function MultiSelect() {
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);

  return (
    <MultiSelectContext.Provider
      value={{
        selectIsOpen,
        setSelectIsOpen
      }}>
      <div className={styles.container}>
        <SelectButton />
        <SelectBody />
      </div>
    </MultiSelectContext.Provider>
  );
}
