import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList, group1 } from './mockData/data';

function App() {

  const handleSelectedChange = (selectedItems: []) => {
    console.log(selectedItems.length);
  };

  const getGroupUsers = ( id : string ) => {
     return group1;
  };


  return (
    <div className="App">
      <div className="wrapper">
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
          onSelectedChange={handleSelectedChange}
          onGroupUsers={getGroupUsers}
        />
      </div>
    </div>
  );
}

export default App;
