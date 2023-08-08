import MultiSelect, { Option } from '@/components/MultiSelect';
import { useState } from 'react';

const options = [
  {
    label: 'Portugal',
    value: 'portugal'
  },
  {
    label: 'China',
    value: 'china'
  },
  {
    label: 'Thailand',
    value: 'thailand'
  },
  {
    label: 'Russia',
    value: 'russia'
  },
  {
    label: 'Peru',
    value: 'peru'
  },
  {
    label: 'Canada',
    value: 'canada'
  }
];

function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <div>
      <b>MultiSelect: true, searchable: true</b>
      <MultiSelect
        searchable={true}
        multiSelectable={true}
        disabled={false}
        options={options}
        onChangeState={(data: Option[]) => {
          setSelectedItems(data as never);
        }}
      />
      <br />
      <pre>{JSON.stringify(selectedItems, null, 2)}</pre>
      <br />
      <b>
        dev. by <a href="https://github.com/melihsahtulek">melihsahtulek</a>
      </b>
    </div>
  );
}

export default App;
