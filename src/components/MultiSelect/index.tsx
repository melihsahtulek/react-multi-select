import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import styles from '@/components/MultiSelect/multi-select.module.css';

export const MultiSelectContext = createContext<any>(null);

function SelectButton() {
  const { setSearchValue, selectedItems, setSelectedItems } = useContext(MultiSelectContext);
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <label
      htmlFor="search_inp"
      className={styles.select_btn_container}
      style={{
        borderColor: inputFocus ? 'var(--blue)' : 'var(--gray-300)'
      }}>
      <div className={styles.selected_items}>
        {selectedItems?.map((item: Option, index: number) => (
          <span key={index} className={styles.selected_item} onClick={() => {}}>
            {item.label}
          </span>
        ))}
      </div>
      <input
        id="search_inp"
        type="text"
        autoFocus={true}
        onFocus={() => {
          setInputFocus(true);
        }}
        onBlur={() => {
          setInputFocus(false);
        }}
        onChange={(e) => {
          setSearchValue(e.currentTarget.value.trim());
        }}
        className={styles.select_input}
      />
    </label>
  );
}

function SelectBody() {
  const { optionList, setOptionList, filtered, selectedItems, setSelectedItems } =
    useContext(MultiSelectContext);

  console.log('filtered body', filtered);
  if (filtered.length === 0) {
    return <div>Bitti</div>;
  }

  return (
    <div className={styles.select_body}>
      {filtered?.map((item: Option, index: number) => (
        <div
          className={styles.select_body_item}
          key={index}
          onClick={() => {
            setSelectedItems([...selectedItems, item]);
            const itemIndex = filtered.findIndex((elem: Option) => elem.value === item.value);
            if (itemIndex > -1) {
              console.log('if', itemIndex);
              const copyArr = [...filtered];
              copyArr.splice(itemIndex, 1);
              setOptionList(copyArr);
            }
          }}>
          {item.label}
        </div>
      ))}
    </div>
  );
}

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
};

export default function MultiSelect({ options }: MultiSelectProps) {
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<Option[]>(options);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  const filtered = useMemo(() => {
    if (!searchValue) {
      return optionList;
    }
    return optionList.filter((item: Option) => item.label.includes(searchValue));
  }, [searchValue, optionList]);

  return (
    <MultiSelectContext.Provider
      value={{
        selectIsOpen,
        setSelectIsOpen,
        optionList,
        setOptionList,
        searchValue,
        setSearchValue,
        filtered,
        selectedItems,
        setSelectedItems
      }}>
      <div className={styles.container}>
        <SelectButton />
        <SelectBody />
      </div>
    </MultiSelectContext.Provider>
  );
}
