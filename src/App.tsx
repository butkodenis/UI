import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList } from './moskData/data';

function App() {
  return <DualListBox availableList={availableList} selectedList={selectedList} title={'DualListBox'} />;
}

export default App;
