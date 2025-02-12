import './styles/scss/DualListBox.scss';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
  faXmark,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

interface ListItem {
  id: string;
  label: string;
  isGroup?: boolean;
  isFixed?: boolean;
}

interface DualListBoxProps {
  labelOptions: string;
  labelSelected: string;
  placeholder: string;
  options: ListItem[];
  selectedValues: ListItem[];
  maxInputHeight: number;
  isInvalid?: boolean;
  disabled?: boolean;
  invalidMessage?: string;
  clearable?: boolean;
  className?: string;
  onSelectedChange: (selectedItems: ListItem[]) => void;
}

const DualListBox: React.FC<DualListBoxProps> = (props) => {
  const { options, selectedValues, onSelectedChange } = props;
  const [availableItems, setAvailableItems] = useState(options || []);
  const [selectedItems, setSelectedItems] = useState(selectedValues || []);
  const [activeItems, setActiveItems] = useState([]);
  const [filterAvailable, setFilterAvailable] = useState('');
  const [filterSelected, setFilterSelected] = useState('');
  const [isGroupVisible, setIsGroupVisible] = useState(true);
  const [error, setError] = useState(props.invalidMessage ?? '');

  // Функция для фильтрации и сортировки элементов списка
  const getFilteredAndSortedItems = (items: ListItem[], filter: string) => {
    // Фильтруем элементы по введенному значению
    const filteredItems = items.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase()));
    const groups = filteredItems.filter((item) => item.isGroup);
    const individuals = filteredItems.filter((item) => !item.isGroup);

    // Сортируем только незафиксированные элементы
    const sortedGroups = groups.filter((item) => !item.isFixed).sort((a, b) => a.label.localeCompare(b.label));
    const sortedIndividuals = individuals
      .filter((item) => !item.isFixed)
      .sort((a, b) => a.label.localeCompare(b.label));

    // Добавляем зафиксированные элементы в начало списка
    const fixedGroups = groups.filter((item) => item.isFixed);
    const fixedIndividuals = individuals.filter((item) => item.isFixed);

    return {
      groups: [...fixedGroups, ...sortedGroups],
      individuals: [...fixedIndividuals, ...sortedIndividuals],
    };
  };

  // Получение отфильтрованных и отсортированных элементов для доступных и выбранных списков
  const { groups: availableGroups, individuals: availableIndividuals } = getFilteredAndSortedItems(
    availableItems,
    filterAvailable
  );
  const { groups: selectedGroups, individuals: selectedIndividuals } = getFilteredAndSortedItems(
    selectedItems,
    filterSelected
  );

  console.log('ssss ');

  // Функция для переключения видимости групп
  const toggleGroupVisibility = () => {
    setIsGroupVisible(!isGroupVisible);
  };

  // Функция для обработки выбора элемента
  const handleSelect = (item: ListItem, event: React.MouseEvent, listType: 'available' | 'selected') => {
    const currentActiveItems = listType === 'available' ? availableIndividuals : selectedIndividuals;

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
      console.log('shiftKey', item.id);
      //console.log('activeKay', activeItems[0].id);

      const lastActiveIndex = currentActiveItems.findIndex((i) => i.id === activeItems[0].id);
      const currentActiveIndex = currentActiveItems.findIndex((i) => i.id === item.id);
      const start = Math.min(lastActiveIndex, currentActiveIndex);
      const end = Math.max(lastActiveIndex, currentActiveIndex);
      const rangeActiveItems = currentActiveItems.slice(start, end + 1);
      setActiveItems(rangeActiveItems);
    } else {
      setActiveItems([item]);
    }
  };

  // Функция для перемещения элементов в
  const moveItemsToSelected = () => {
    setSelectedItems([...selectedItems, ...availableIndividuals]);
    setAvailableItems(availableItems.filter((item) => item.isGroup));
    setActiveItems([]);
  };

  const moveItemsToAvailable = () => {
    // Разделяем зафиксированные и незафиксированные элементы
    const fixedItems = selectedItems.filter((item) => item.isFixed);
    const movableItems = selectedItems.filter((item) => !item.isFixed);

    // Перемещаем только незафиксированные элементы в доступные
    setAvailableItems([...availableItems, ...movableItems]);
    setSelectedItems(fixedItems);
    setActiveItems([]);
  };

  const moveItemToSelected = () => {
    // Получаем только те активные элементы, которые есть в списке доступных
    const itemsToMove = activeItems.filter((item) =>
      availableItems.some((availableItem) => availableItem.id === item.id)
    );

    if (itemsToMove.length === 0) return;

    // Добавляем выбранные элементы в список выбранных
    setSelectedItems([...selectedItems, ...itemsToMove]);

    // Удаляем перемещенные элементы из списка доступных
    setAvailableItems(availableItems.filter((item) => !itemsToMove.some((activeItem) => activeItem.id === item.id)));

    // Очищаем список активных элементов
    setActiveItems([]);
    
  };

  const moveItemToAvailable = () => {
    // Получаем только те активные элементы, которые есть в списке выбранных
    const itemsToMove = activeItems.filter((item) => selectedItems.some((selectedItem) => selectedItem.id === item.id));

    if (itemsToMove.length === 0) return;

    // Добавляем выбранные элементы в список доступных
    setAvailableItems([...availableItems, ...itemsToMove]);

    // Удаляем перемещенные элементы из списка выбранных
    setSelectedItems(selectedItems.filter((item) => !itemsToMove.some((activeItem) => activeItem.id === item.id)));

    // Очищаем список активных элементов
    setActiveItems([]);
  };

  return (
    <div className="dual-list-box">
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
          <div className="dual-list-box__list">
            <div className="dual-list-box__list-group" onClick={toggleGroupVisibility}>
              Групи <FontAwesomeIcon icon={isGroupVisible ? faCaretDown : faCaretUp} />
            </div>
            {isGroupVisible &&
              availableGroups.map((item) => (
                <div key={item.id} className="dual-list-box__list-item dual-list-box__list-item--group">
                  {item.label}
                </div>
              ))}
            {availableIndividuals.map((item) => (
              <div
                key={item.id}
                className={`dual-list-box__list-item ${
                  activeItems.includes(item) ? 'dual-list-box__list-item--active' : ''
                }`}
                onClick={(e) => handleSelect(item, e, 'available')}
                onDoubleClick={moveItemToSelected}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="dual-list-box__controls">
          <button className="dual-list-box__control" onClick={moveItemToSelected} disabled={availableIndividuals.length === 0}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="dual-list-box__control"
            onClick={moveItemToAvailable}
            disabled={selectedIndividuals.filter((item) => !item.isFixed).length === 0}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="dual-list-box__control" onClick={moveItemsToSelected} disabled={availableIndividuals.length === 0}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>

          <button
            className="dual-list-box__control"
            onClick={moveItemsToAvailable}
            disabled={selectedIndividuals.filter((item) => !item.isFixed).length === 0}
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
            {selectedIndividuals.map((item) => (
              <div
                key={item.id}
                className={`dual-list-box__list-item ${
                  activeItems.includes(item) ? 'dual-list-box__list-item--active' : ''
                } ${item.isFixed ? 'dual-list-box__list-item--fixed' : ''}`}
                onClick={(e) => handleSelect(item, e, 'selected')}
                onDoubleClick={moveItemToAvailable}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dual-list-box__error">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default DualListBox;
