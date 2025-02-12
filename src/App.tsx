import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList } from './mockData/data';

function App() {

  const onSelectedChange = (selectedItems : []) => {
    console.log(selectedItems.length);
  };


  return (
    <div className="App">
      <div className="wraper">
        <h1>Додаток для вибору ________</h1>
        <p>Додайте ________ в список</p>
        <DualListBox
          labelOptions='Додати ________'
          labelSelected='Вибрані ________'
          placeholder='Placeholder'
          options={availableList}
          selectedValues={selectedList}
          maxInputHeight={200}
          isInvalid={false}
          disabled={false}
          invalidMessage='Invalid message'
          clearable={true}
          className='custom-class'
          onSelectedChange={onSelectedChange}
        />
      </div>
    </div>
  );
}

export default App;
