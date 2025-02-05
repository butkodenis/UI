import './styles/scss/DualListBox.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

interface Item {
  id: string;
  label: string;
}

interface DualListBoxProps {
  availableList: Item[];
  selectedList: Item[];
  title: string;
}

const DualListBox: React.FC<DualListBoxProps> = ({ availableList, selectedList, title }) => {
  const [availableItems, setAvailableItems] = useState(availableList);
  const [selectedItems, setSelectedItems] = useState(selectedList);
  const [activeItem, setActiveItem] = useState('');
  const [filterAvailable, setFilterAvailable] = useState('');
  const [filterSelected, setFilterSelected] = useState('');
  const [error, setError] = useState('');

  // Обработчик клика по элементу, устанавливает активный элемент
  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setError('');
  };

  // Обработчик изменения фильтра для доступных элементов
  const handleFilterAvailableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAvailable(e.target.value);
    setError('');
  };

  // Обработчик изменения фильтра для выбранных элементов
  const handleFilterSelectedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSelected(e.target.value);
    setError('');
  };

  // Функция для сортировки элементов

  const sortedItems = (items: Item[]) => {
    return items.sort((a, b) => a.label.localeCompare(b.label));
  };

  // Функция для перемещения элемента из доступных в выбранные
  const moveItemToSelected = () => {
    if (!activeItem) {
      setError('Оберіть елемент');
      return;
    }
    const item = availableItems.find((item) => item.id === activeItem);
    if (!item) return; // если элемент не найден
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((item) => item.id !== activeItem));
    setActiveItem('');
    setError('');
  };

  // Функция для перемещения элемента из выбранных в доступные
  const moveItemToAvailable = () => {
    if (!activeItem) {
      setError('Оберіть елемент');
      return;
    }
    const item = selectedItems.find((item) => item.id === activeItem);
    if (!item) return; // если элемент не найден
    setAvailableItems([...availableItems, item]);
    setSelectedItems(selectedItems.filter((item) => item.id !== activeItem));
    setActiveItem('');
    setError('');
  };

  // Функция для перемещения всех элементов из доступных в выбранные
  const moveItemAllToSelected = () => {
    setSelectedItems([...selectedItems, ...availableItems]);
    setAvailableItems([]);
    setError('');
  };

  // Функция для перемещения всех элементов из выбранных в доступные
  const moveItemAllToAvailable = () => {
    setAvailableItems([...availableItems, ...selectedItems]);
    setSelectedItems([]);
    setError('Оберіть елемент');
  };

  // Отсортированные доступные и выбранные элементы
  const sortedAvailableItems = sortedItems(availableItems).filter((item) =>
    item.label.toLowerCase().includes(filterAvailable.toLowerCase())
  );
  const sortedSelectedItems = sortedItems(selectedItems).filter((item) =>
    item.label.toLowerCase().includes(filterSelected.toLowerCase())
  );

  return (
    <div className="dual-list-box">
      <div className="dual-list-box__title">
        <p>{title}</p>
      </div>
      <div className="dual-list-box__error">
        <p>{error}</p>
      </div>
      <div className="dual-list-box__content">
        <div className="dual-list-box__available">
          <h4 className="dual-list-box__list-title">Доступні варіанти </h4>
          <div className="dual-list-box__search">
            <input type="text" placeholder="Пошук" value={filterAvailable} onChange={handleFilterAvailableChange} />
          </div>
          <div className="dual-list-box__list">
            {sortedAvailableItems.map((item) => (
              <div
                key={item.id}
                className={`dual-list-box__list-item ${
                  item.id === activeItem ? 'dual-list-box__list-item--active' : ''
                }`}
                onClick={() => handleItemClick(item.id)}
                onDoubleClick={moveItemToSelected}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="dual-list-box__controls">
          <button
            className="dual-list-box__control"
            onClick={moveItemToSelected}
            disabled={sortedAvailableItems.length === 0}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="dual-list-box__control"
            onClick={moveItemAllToSelected}
            disabled={sortedAvailableItems.length === 0}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
          <button
            className="dual-list-box__control"
            onClick={moveItemToAvailable}
            disabled={sortedSelectedItems.length === 0}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="dual-list-box__control"
            onClick={moveItemAllToAvailable}
            disabled={sortedSelectedItems.length === 0}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </div>
        <div className="dual-list-box__selected">
          <h4 className="dual-list-box__list-title">Вибрані варіанти</h4>
          <div className="dual-list-box__search">
            <input type="text" placeholder="Пошук" value={filterSelected} onChange={handleFilterSelectedChange} />
          </div>
          <div className="dual-list-box__list">
            {sortedSelectedItems.map((item) => (
              <div
                key={item.id}
                className={`dual-list-box__list-item ${
                  item.id === activeItem ? 'dual-list-box__list-item--active' : ''
                }`}
                onClick={() => handleItemClick(item.id)}
                onDoubleClick={moveItemToAvailable}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualListBox;
