import './styles/scss/DualListBox.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const DualListBox = ({ data, options }) => {
  const [availableItems, setAvailableItems] = useState(data.availableData);
  const [selectedItems, setSelectedItems] = useState(data.selectedData);
  const [activeItem, setActiveItem] = useState(null);
  const [sortedBy, setSortedBy] = useState(options.sorted);

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  const sortedItems = (items, sortedBy) => {
    return items.sort((a, b) => {
      if (sortedBy === 'id') {
        return a.id - b.id;
      }
      return a.label.localeCompare(b.label);
    });
  };

  console.log('sortedBy', sortedBy);

  const moveItemToSelected = () => {
    if (activeItem === null) return; // если не выбран элемент
    const item = availableItems.find((item) => item.id === activeItem);
    if (!item) return; // если элемент не найден
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(availableItems.filter((item) => item.id !== activeItem));
    setActiveItem(null);
  };

  const moveItemToAvailable = () => {
    if (activeItem === null) return;
    const item = selectedItems.find((item) => item.id === activeItem);
    if (!item) return;
    setAvailableItems([...availableItems, item]);
    setSelectedItems(selectedItems.filter((item) => item.id !== activeItem));
    setActiveItem(null);
  };

  const moveItemAllToSelected = () => {
    setSelectedItems([...selectedItems, ...availableItems]);
    setAvailableItems([]);
  };

  const moveItemAllToAvailable = () => {
    setAvailableItems([...availableItems, ...selectedItems]);
    setSelectedItems([]);
  };

  const sortedAvailableItems = sortedItems(availableItems, sortedBy);
  const sortedSelectedItems = sortedItems(selectedItems, sortedBy);

  return (
    <div className="dual-list-box" style={{ maxWidth: options.width }}>
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
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="dual-list-box__controls">
          <button className="dual-list-box__control" onClick={moveItemToSelected}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button className="dual-list-box__control" onClick={moveItemAllToSelected}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
          <button className="dual-list-box__control" onClick={moveItemToAvailable}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="dual-list-box__control" onClick={moveItemAllToAvailable}>
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
