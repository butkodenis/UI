import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList } from './mockData/data';

function App() {
  return (
    <div className="App">
      <div className="wraper">
        <h1>Додаток для вибору ________</h1>
        <p>Додайте ________ в список</p>
        <DualListBox
          label={'Додати ________'}
          placeholder={'Placeholder'}
          options={availableList}
          selectedValues={selectedList}
          maxInputHeight={200}
          isInvalid={false}
          disabled={false}
          invalidMessage={'Invalid message'}
          clearable={true}
          title={'DualListBox'}
          className={'custom-class'}
        />
      </div>
    </div>
  );
}

export default App;
