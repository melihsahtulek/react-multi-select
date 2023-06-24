import MultiSelect from '@/components/MultiSelect';

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
      <MultiSelect searchable={true} multiSelectable={true} disabled={false} options={options} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      MultiSelect: false, searchable: true
      <MultiSelect
        searchable={true}
        multiSelectable={false}
        disabled={false}
        options={[
          {
            label: 'Sunday',
            value: 'sunday'
          },
          {
            label: 'Monday',
            value: 'monday'
          },
          {
            label: 'Tuesday',
            value: 'tuesday'
          },
          {
            label: 'Wednesday',
            value: 'wednesday'
          },
          {
            label: 'Thursday',
            value: 'thursday'
          },
          {
            label: 'Friday',
            value: 'friday'
          },
          {
            label: 'Saturday',
            value: 'saturday'
          }
        ]}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      MultiSelect: false, searchable: false
      <MultiSelect
        searchable={false}
        multiSelectable={false}
        disabled={false}
        options={[
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Green',
            value: 'green'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      MultiSelect: true, searchable: false
      <MultiSelect
        searchable={false}
        multiSelectable={true}
        disabled={false}
        options={[
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Green',
            value: 'green'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          }
        ]}
      />
    </div>
  );
}

export default App;
