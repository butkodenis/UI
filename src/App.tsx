import { useState } from 'react';
import './styles/scss/app.scss';
import DualListBox from './ui/components/DualListBox/DualListBox';

import {
  availableList as initialAvailableList,
  selectedList as initialSelectedList,
  group1,
  group2,
} from './mockData/data';
import { ListItem } from './ui/components/DualListBox/DualListBox.types';

function App() {
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const [availableList, setAvailableList] = useState<ListItem[]>(initialAvailableList);
  const [selectedList, setSelectedList] = useState<ListItem[]>(initialSelectedList);

  const handleSelectedChange = (selectedItems: ListItem[]) => {
    console.log('selectedItems:', selectedItems);

    const updatedSelectedItems = selectedItems.flatMap((item) => (item.isGroup ? getGroupUsers(item.id) : item));

    const updatedAvailableList = availableList.filter((item) => item.isGroup || !updatedSelectedItems.includes(item));
    console.log('updatedSelectedItems:', updatedSelectedItems);
    // Обновляем состояния списков
    setAvailableList(updatedAvailableList);
    setSelectedList(updatedSelectedItems);
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
          onChange={handleSelectedChange}
        />
      </div>
    </div>
  );
}

export default App;
