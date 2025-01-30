import DualListBox from './ui/components/DualListBox/DualListBox';

import { data } from './moskData/data';

function App() {
  enum SortBy {
    Id = 'id',
    Label = 'label',
  }

  interface Options {
    sorted: SortBy;
    title: string;
    width?: number;
  }

  const options: Options = {
    sorted: SortBy.Id, // или SortBy.Label
  };

  return <DualListBox data={data} options={options} />;
}

export default App;
