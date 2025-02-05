import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList } from './moskData/data';

function App() {
  return (
    <div className="App">
      <div className="wraper">
        <h1>Додаток для вибору ________</h1>
        <p>Додайте ________ в список</p>
        <DualListBox availableList={availableList} selectedList={selectedList} title={'DualListBox'} />
      </div>
    </div>
  );
}

export default App;
