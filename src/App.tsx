import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList } from './moskData/data';

function App() {
  interface Options {
    sorted: SortBy;
    title: string;
    width?: number;
  }

  const options: Options = {
    title: ' Title DualListBox',
  };

  return <DualListBox availableList={availableList} selectedList={selectedList} options={options} />;
}

export default App;
