import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import '@/components/MultiSelect/multi-select.css';

export type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  searchable?: boolean;
  multiSelectable?: boolean;
  disabled?: boolean;
  onChangeState: any;
};

export const MultiSelectContext = createContext<any>(null);

function SelectedItems() {
  const { selectedItems, setSelectedItems, optionList, setOptionList, selectButtonRef, multiSelectable } =
    useContext(MultiSelectContext);

  return (
    <div className={'selected_items'}>
      {multiSelectable ? (
        selectedItems?.map((item: Option, index: number) => (
          <span
            key={index}
            className={'selected_item'}
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
        ))
      ) : (
        <div className={'one_selected'}>{selectedItems?.[0]?.label}</div>
      )}
    </div>
  );
}

function SelectInput() {
  const {
    inputFocus,
    setInputFocus,
    searchValue,
    setSearchValue,
    setSelectedItems,
    selectButtonRef,
    selectIsOpen,
    setSelectIsOpen,
    multiSelectable,
    searchable
  } = useContext(MultiSelectContext);

  const id = useId();

  return (
    <label htmlFor={id} className={`select_btn_container ${inputFocus && 'select_btn_container_active'}`}>
      <SelectedItems />
      <input
        ref={selectButtonRef}
        id={id}
        type="text"
        disabled={searchable ? false : true}
        autoFocus={false}
        value={searchValue}
        onFocus={() => {
          setInputFocus(true);
        }}
        onClick={() => {
          setSelectIsOpen(!selectIsOpen);
        }}
        onChange={(e) => {
          setSearchValue(e.currentTarget.value.trim());
          setSelectIsOpen(true);
          if (!multiSelectable) {
            setSelectedItems([]);
          }
        }}
        className={'select_input'}
      />
    </label>
  );
}

function SelectButton() {
  const { inputFocus, selectButtonRef, selectIsOpen, setSelectIsOpen } = useContext(MultiSelectContext);

  return (
    <div className="select_btn_container">
      <SelectedItems />
      <button
        style={{
          borderColor: inputFocus ? 'var(--blue)' : 'var(--gray-300)',
          width: '100%',
          backgroundColor: 'transparent'
        }}
        type="button"
        ref={selectButtonRef}
        onClick={() => {
          setSelectIsOpen(!selectIsOpen);
        }}></button>
    </div>
  );
}

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

  if (optionList.length < 1 && selectIsOpen) {
    return <div className={'noItemAreThere'}>Empty List</div>;
  }

  return (
    <div
      className={'select_body'}
      style={{
        display: selectIsOpen ? 'block' : 'none'
      }}>
      {filtered?.map((item: Option, index: number) => (
        <div
          className={'select_body_item'}
          style={{
            backgroundColor: multiSelectable ? '' : item.value === selectedItems?.[0]?.value ? 'var(--blue)' : '',
            color: multiSelectable ? '' : item.value === selectedItems?.[0]?.value ? 'var(--white)' : ''
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

export default function MultiSelect({
  options = [],
  multiSelectable = true,
  searchable = true,
  onChangeState
}: MultiSelectProps) {
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
  }, []);

  const filtered = useMemo(() => {
    if (!searchValue) {
      return optionList;
    }
    return optionList.filter((item: Option) => item.value.includes(searchValue));
  }, [searchValue, optionList]);

  useEffect(() => {
    if (selectedItems.length > -1) {
      onChangeState(selectedItems);
    }
  }, [selectedItems, setSelectedItems]);

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
        searchable,
        onChangeState
      }}>
      <div className={'select_container'} ref={selectRef}>
        {searchable ? <SelectInput /> : <SelectButton />}
        <SelectBody />
      </div>
    </MultiSelectContext.Provider>
  );
}
