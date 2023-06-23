import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from '@/components/MultiSelect/multi-select.module.css';

export const MultiSelectContext = createContext<any>(null);

const SelectButton = () => {
  const {
    inputFocus,
    setInputFocus,
    searchValue,
    setSearchValue,
    selectedItems,
    setSelectedItems,
    optionList,
    setOptionList,
    selectButtonRef,
    selectIsOpen,
    setSelectIsOpen,
    multiSelectable,
    searchable
  } = useContext(MultiSelectContext);

  const id = useId();

  return (
    <label
      htmlFor={id}
      className={styles.select_btn_container}
      onClick={() => {
        setSelectIsOpen(!selectIsOpen);
      }}
      style={{
        borderColor: inputFocus ? 'var(--blue)' : 'var(--gray-300)'
      }}>
      {multiSelectable ? (
        <div className={styles.selected_items}>
          {selectedItems?.map((item: Option, index: number) => (
            <span
              key={index}
              className={styles.selected_item}
              onClick={(e) => {
                e.preventDefault();
                const unselectItemIndex = selectedItems.findIndex((elem: Option) => elem.value === item.value);
                if (unselectItemIndex > -1) {
                  const copyArr = [...selectedItems];
                  const elem = copyArr.splice(unselectItemIndex, 1);
                  setSelectedItems(copyArr);
                  setOptionList([...optionList, ...elem]);
                  selectButtonRef.current.focus();
                }
              }}>
              {item.label}
            </span>
          ))}
        </div>
      ) : (
        <div className={styles.one_selected}>{selectedItems?.[0]?.label}</div>
      )}
      <input
        ref={selectButtonRef}
        id={id}
        type="text"
        disabled={searchable ? false : true}
        autoFocus={false}
        value={searchValue}
        onFocus={() => {
          setInputFocus(true);
          // setSelectIsOpen(!selectIsOpen);
        }}
        onClick={() => {
          // setSelectIsOpen(!selectIsOpen);
        }}
        onBlur={() => {
          // setInputFocus(false);
        }}
        onChange={(e) => {
          setSearchValue(e.currentTarget.value.trim());
          setSelectIsOpen(true);
          if (!multiSelectable) {
            setSelectedItems([]);
          }
        }}
        className={styles.select_input}
      />
    </label>
  );
};

function SelectBody() {
  const {
    selectIsOpen,
    setSelectIsOpen,
    setOptionList,
    filtered,
    selectedItems,
    setSelectedItems,
    setSearchValue,
    selectButtonRef,
    optionList,
    multiSelectable
  } = useContext(MultiSelectContext);

  if (optionList.length < 1) {
    return <div>Empty</div>;
  }

  return (
    <div
      className={styles.select_body}
      style={{
        display: selectIsOpen ? 'block' : 'none'
      }}>
      {filtered?.map((item: Option, index: number) => (
        <div
          className={styles.select_body_item}
          style={{
            backgroundColor: multiSelectable ? '' : item.label === selectedItems?.[0]?.label ? 'var(--blue)' : '',
            color: multiSelectable ? '' : item.label === selectedItems?.[0]?.label ? 'var(--white)' : ''
          }}
          key={index}
          onClick={() => {
            if (!multiSelectable) {
              setSelectedItems([item]);
            } else {
              setSelectedItems([...selectedItems, item]);
              const itemIndex = optionList.findIndex((elem: Option) => elem.value === item.value);
              if (itemIndex > -1) {
                const copyArr = [...optionList];
                copyArr.splice(itemIndex, 1);
                setOptionList(copyArr);
                selectButtonRef.current.focus();
              }
            }
            setSearchValue('');
            setSelectIsOpen(false);
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
  multiSelectable?: boolean;
  disabled?: boolean;
};

export default function MultiSelect({ options = [], multiSelectable = true, searchable = true }: MultiSelectProps) {
  const selectRef = useRef(null);
  const selectButtonRef = useRef(null);
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<Option[]>(options);
  const [inputFocus, setInputFocus] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<Option[]>([]);

  useEffect(() => {
    if (!selectRef.current) {
      return;
    }

    document.addEventListener('click', (e) => {
      if (selectRef.current && !e.composedPath().includes(selectRef.current)) {
        setInputFocus(false);
        setSelectIsOpen(false);
        setSearchValue('');
      }
    });

    return () => {
      document.removeEventListener('click', () => {});
    };
  }, []);

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
        setSelectedItems,
        selectButtonRef,
        inputFocus,
        setInputFocus,
        multiSelectable,
        searchable
      }}>
      <div className={styles.container} ref={selectRef}>
        <SelectButton />
        <SelectBody />
      </div>
    </MultiSelectContext.Provider>
  );
}
