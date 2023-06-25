import MultiSelect, { Option } from '@/components/MultiSelect';

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
  return (
    <div>
      MultiSelect: true, searchable: true
      <MultiSelect
        searchable={true}
        multiSelectable={true}
        disabled={false}
        options={options}
        onChangeState={(data: Option[]) => {
          console.log('***Selected Items***');
          Object.values(data).forEach((elem) => {
            console.log(elem);
          });
        }}
      />
    </div>
  );
}

export default App;
