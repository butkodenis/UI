import { useState } from 'react';
import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import { availableList, selectedList, group1, group2 } from './mockData/data';
import { ListItem } from './ui/components/DualListBox/DualListBox.types';

function App() {
  const [invalidMessage, setInvalidMessage] = useState<string>('');

  const handleSelectedChange = (selectedItems: ListItem[]) => {
    if (selectedItems.length > 0) {
      console.log('selectedItems:', selectedItems);
      setInvalidMessage('');
    } else {
      setInvalidMessage('Оберіть користувача');
    }
  };

  const getGroupUsers = (id: string) => {
    console.log('UUID группи:', id);
    switch (id) {
      case '550e8400-e29b-41d4-a716-446655440003':
        return group1;

      case '550e8400-e29b-41d4-a716-446655440004':
        return group2;
      default:
        return [];
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Додаток для вибору ________</h1>
        <p>Додайте ________ в список</p>
        <DualListBox
          labelOptions="Додати ________"
          labelSelected="Вибрані ________"
          placeholder="Placeholder"
          options={availableList}
          selectedValues={selectedList}
          isInvalid={true}
          disabled={false}
          invalidMessage={invalidMessage}
          clearable={true}
          className="custom-class"
          onSelectedChange={handleSelectedChange}
          onGroupUsers={getGroupUsers}
        />
      </div>
    </div>
  );
}

export default App;
