import './styles/scss/DualListBox.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

// Компонент DualListBox принимает три пропса: availableList, selectedList и options
const DualListBox = ({ availableList, selectedList, options }) => {
  // Состояния для доступных и выбранных элементов, активного элемента и сортировки
  const [availableItems, setAvailableItems] = useState(availableList);
  const [selectedItems, setSelectedItems] = useState(selectedList);
  const [activeItem, setActiveItem] = useState(null);
  const [sortedBy, setSortedBy] = useState(options.sorted);

  // Обработчик клика по элементу, устанавливает активный элемент
  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  // Функция для сортировки элементов по метке
  const sortedItems = (items) => {
    return items.sort((a, b) => {
      return a.label.localeCompare(b.label);
    });
  };

  console.log('sortedBy', sortedBy);

  // Функция для перемещения элемента из доступных в выбранные
  const moveItemToSelected = () => {
    if (activeItem === null) return; // если не выбран элемент
    const item = availableItems.find((item) => item.id === activeItem);
    if (!item) return; // если элемент не найден
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((item) => item.id !== activeItem));
    setActiveItem(null);
  };

  // Функция для перемещения элемента из выбранных в доступные
  const moveItemToAvailable = () => {
    if (activeItem === null) return; // если не выбран элемент
    const item = selectedItems.find((item) => item.id === activeItem);
    if (!item) return; // если элемент не найден
    setAvailableItems([...availableItems, item]);
    setSelectedItems(selectedItems.filter((item) => item.id !== activeItem));
    setActiveItem(null);
  };

  // Функция для перемещения всех элементов из доступных в выбранные
  const moveItemAllToSelected = () => {
    setSelectedItems([...selectedItems, ...availableItems]);
    setAvailableItems([]);
  };

  // Функция для перемещения всех элементов из выбранных в доступные
  const moveItemAllToAvailable = () => {
    setAvailableItems([...availableItems, ...selectedItems]);
    setSelectedItems([]);
  };

  // Отсортированные доступные и выбранные элементы
  const sortedAvailableItems = sortedItems(availableItems, sortedBy);
  const sortedSelectedItems = sortedItems(selectedItems, sortedBy);

  return (
    <div className="dual-list-box">
      <div className="dual-list-box__title">
        <p>{options.title}</p>
      </div>
      <div className="dual-list-box__content">
        <div className="dual-list-box__available">
          <h4 className="dual-list-box__list-title">Available</h4>
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
          <h4 className="dual-list-box__list-title">Selected</h4>
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
