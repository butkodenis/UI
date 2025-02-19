import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (selectedList.length < 2) {
      setInvalidMessage('оберіть не менше двох користувачів');
    } else {
      setInvalidMessage('');
    }
  }, [selectedList]);

  const handleSelectedChange = (selectedItems: ListItem[]) => {
    console.log('selectedItems  (Обновленый массив выбраных от компонента): ', selectedItems);
    console.log('selectedList (Текущий стейт род. выбраных): ', selectedList);
    console.log('availableList (Текущий стейт род. доступных): ', availableList);

    // Заменяем группы на пользователей
    const updatedSelectedItems = selectedItems.flatMap((item) => {
      if (item.isGroup) {
        const groupItems = getGroupItems(item.id);
        // удаляем дубли если есть уже в списке выбранных
        const newGroupItems = groupItems.filter(
          (groupItem) => !selectedItems.some((selectedItem) => selectedItem.id === groupItem.id)
        );

        return newGroupItems;
      }
      return item;
    });
    //

    // Проверяем наличие выбранных элементов в массиве доступных элементов и удаляем их
    const newSelectedItems = updatedSelectedItems.filter((item) => !selectedList.includes(item));
    const removedSelectedItems = selectedList.filter((item) => !updatedSelectedItems.includes(item));

    // Обновляем массив доступных элементов
    const updatedAvailableList = [
      ...availableList.filter((item) => !newSelectedItems.includes(item)), // удаляем выбранные элементы из доступных
      ...removedSelectedItems.filter((item) => !item.isGroup), // добавляем удаленные элементы в доступные
    ];

    // Удаляем пользователей, добавленных через группу, из availableList
    const finalAvailableList = updatedAvailableList.filter(
      (item) => !updatedSelectedItems.some((selectedItem) => selectedItem.id === item.id)
    );

    // Обновляем состояния списков
    setAvailableList(finalAvailableList);
    setSelectedList(updatedSelectedItems);
  };

  const getGroupItems = (id: string) => {
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
        <h3>DualListBox</h3>
        <DualListBox
          labelOptions="Додати ________"
          labelSelected="Вибрані ________"
          placeholder="Placeholder"
          options={availableList}
          selectedValues={selectedList}
          isInvalid={selectedList.length < 2}
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
