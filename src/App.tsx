import MultiSelect from '@/components/MultiSelect';

function App() {
  return (
    <MultiSelect
      options={[
        {
          label: 'Portugal',
          value: 'PT'
        },
        {
          label: 'China',
          value: 'CN'
        },
        {
          label: 'Thailand',
          value: 'TH'
        },
        {
          label: 'Russia',
          value: 'RU'
        },
        {
          label: 'Peru',
          value: 'PE'
        },
        {
          label: 'South Korea',
          value: 'KR'
        },
        {
          label: 'Canada',
          value: 'CA'
        }
      ]}
      searchable={false}
      multiSelect={false}
      disabled={false}
    />
  );
}

export default App;
