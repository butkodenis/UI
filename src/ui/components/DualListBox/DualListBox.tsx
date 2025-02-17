import './styles/scss/DualListBox.scss';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import { ListItem, DualListBoxProps } from './DualListBox.types';

const DualListBox: React.FC<DualListBoxProps> = (props) => {
  const [availableItems, setAvailableItems] = useState(props.options || []);
  const [selectedItems, setSelectedItems] = useState(props.selectedValues || []);
  const [activeItems, setActiveItems] = useState<ListItem[]>([]);
  const [filterAvailable, setFilterAvailable] = useState('');
  const [filterSelected, setFilterSelected] = useState('');
  const [isGroupVisible, setIsGroupVisible] = useState(true);

  const filteredAvailableItems = availableItems
    .filter((item) => item.label.toLowerCase().includes(filterAvailable.toLowerCase()))
    .filter((item) => isGroupVisible || !item.isGroup);

  const filteredSelectedItems = selectedItems.filter((item) =>
    item.label.toLowerCase().includes(filterSelected.toLowerCase())
  );

  //  функция выбора списка
  const handleSelect = (item: ListItem, event: React.MouseEvent, listType: 'available' | 'selected') => {
    const currentActiveItems = listType === 'available' ? availableItems : selectedItems;

    if (item.isFixed) {
      return;
    }

    if (event.ctrlKey) {
      if (activeItems.includes(item)) {
        setActiveItems(activeItems.filter((i) => i !== item));
      } else {
        setActiveItems([...activeItems, item]);
      }
    } else if (event.shiftKey) {
      if (activeItems.length === 0) {
        setActiveItems([item]);
      } else {
        const lastActiveIndex = currentActiveItems.findIndex((i) => i.id === activeItems[0].id);
        const currentActiveIndex = currentActiveItems.findIndex((i) => i.id === item.id);
        const start = Math.min(lastActiveIndex, currentActiveIndex);
        const end = Math.max(lastActiveIndex, currentActiveIndex);
        const rangeActiveItems = currentActiveItems.slice(start, end + 1);
        setActiveItems(rangeActiveItems);
      }
    } else {
      setActiveItems([item]);
    }
  };

  // Функция для перемещения всех элементов в выбранные
  const moveItemsToSelected = () => {};

  // Функция для перемещения всех элементов в доступные
  const moveItemsToAvailable = () => {};

  // Функция для перемещения элемента в выбранные
  const moveItemToSelected = () => {};

  // Функция для перемещения элемента в доступные
  const moveItemToAvailable = () => {};

  return (
    <div className={`dual-list-box ${props.isInvalid ? 'dual-list-box--invalid' : ''} `}>
      <div className="dual-list-box__content">
        <div className="dual-list-box__available">
          <h4 className="dual-list-box__list-label">{props.labelOptions} </h4>
          <div className="dual-list-box__search">
            <input
              type="text"
              placeholder="Пошук"
              value={filterAvailable}
              onChange={(e) => setFilterAvailable(e.target.value)}
            />
            {props.clearable && (
              <button className="dual-list-box__search-clear" onClick={() => setFilterAvailable('')}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
          {props.options.some((item) => item.isGroup) ? (
            <div className="">
              <input
                type="checkbox"
                id="group"
                name="group"
                onChange={() => setIsGroupVisible(!isGroupVisible)}
                checked={isGroupVisible}
              />
              <label htmlFor="group">Групи</label>
            </div>
          ) : null}
          <div className="dual-list-box__list">
            {filteredAvailableItems.map((item) => (
              <div
                key={item.id}
                className={`dual-list-box__list-item ${item.isGroup ? 'dual-list-box__list-item--group' : ''} ${
                  activeItems.includes(item) ? 'dual-list-box__list-item--active' : ''
                }`}
                onClick={(e) => handleSelect(item, e, 'available')}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dual-list-box__controls">
          <button className="dual-list-box__control">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button className="dual-list-box__control">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="dual-list-box__control">
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>

          <button className="dual-list-box__control">
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
        </div>

        <div className="dual-list-box__selected">
          <h4 className="dual-list-box__list-label">{props.labelSelected}</h4>
          <div className="dual-list-box__search">
            <input
              type="text"
              placeholder="Пошук"
              value={filterSelected}
              onChange={(e) => setFilterSelected(e.target.value)}
            />
            {props.clearable && (
              <button className="dual-list-box__search-clear" onClick={() => setFilterSelected('')}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
          <div className="dual-list-box__list">
            {filteredSelectedItems.map((item) => (
              <div key={item.id} className="dual-list-box__list-item">
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dual-list-box__error">
        <p>{props.invalidMessage}</p>
      </div>
    </div>
  );
};

export default DualListBox;
