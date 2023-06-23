import MultiSelect from '@/components/MultiSelect';

const options = [
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
  },
  {
    label: 'Poland',
    value: 'PL'
  },
  {
    label: 'Senegal',
    value: 'SN'
  },
  {
    label: 'South Africa',
    value: 'ZA'
  }
];

function App() {
  return <MultiSelect searchable={true} multiSelectable={true} disabled={false} options={options} />;
}

export default App;
