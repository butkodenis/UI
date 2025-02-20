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

  useEffect(() => {
    setSelectedItems(props.selectedValues);
  }, [props.selectedValues]);

  useEffect(() => {
    setAvailableItems(props.options);
  }, [props.options]);

  // Фильтруем доступные элементы
  const filteredAvailableItems = availableItems
    .filter((item) => item.label.toLowerCase().includes(filterAvailable.toLowerCase()))
    .filter((item) => isGroupVisible || !item.isGroup);

  // Фильтруем выбранные элементы
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

  // Функция для перемещения всех элементов в выбранные кроме групп
  const moveAllItemsToSelected = () => {
    const individualItems = availableItems.filter((item) => !item.isGroup);
    const newSelectedItems = [...selectedItems, ...individualItems.filter((item) => !selectedItems.includes(item))];

    props.onChange(newSelectedItems);

    setActiveItems([]);
  };

  // Функция для перемещения всех элементов в доступные
  const moveAllItemsToAvailable = () => {
    const newSelectedItems = selectedItems.filter((item) => item.isFixed); // Фильтруем элементы, которые являются фиксированными

    props.onChange(newSelectedItems);

    setActiveItems([]);
  };

  // Функция для перемещения отмеченых элементов в выбранные
  const moveItemToSelected = () => {
    // Объединяем выбранные элементы с новыми элементами
    const newSelectedItems = [...selectedItems, ...activeItems.filter((item) => !selectedItems.includes(item))];

    props.onChange(newSelectedItems);

    setActiveItems([]);
  };

  // Функция для перемещения отмеченых элементов в доступные
  const moveItemToAvailable = () => {
    // Фильтруем элементы, которые не являются выбранными
    const newSelectedItems = selectedItems.filter((item) => !activeItems.includes(item));

    props.onChange(newSelectedItems);

    setActiveItems([]);
  };

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
                onDoubleClick={moveItemToSelected}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dual-list-box__controls">
          <button
            className="dual-list-box__control"
            onClick={moveItemToSelected}
            disabled={availableItems.filter((item) => !item.isGroup).length === 0}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>

          <button
            className="dual-list-box__control"
            onClick={moveAllItemsToSelected}
            disabled={availableItems.filter((item) => !item.isGroup).length === 0}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
          <button
            className="dual-list-box__control"
            onClick={moveItemToAvailable}
            disabled={selectedItems.filter((item) => !item.isFixed).length === 0}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <button
            className="dual-list-box__control"
            onClick={moveAllItemsToAvailable}
            disabled={selectedItems.filter((item) => !item.isFixed).length === 0}
          >
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
              <div
                key={item.id}
                className={
                  `dual-list-box__list-item` +
                  (item.isFixed ? ' dual-list-box__list-item--fixed' : '') +
                  (activeItems.some((activeItem) => activeItem.id === item.id)
                    ? ' dual-list-box__list-item--active'
                    : '')
                }
                onClick={(e) => handleSelect(item, e, 'selected')}
                onDoubleClick={moveItemToAvailable}
              >
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
