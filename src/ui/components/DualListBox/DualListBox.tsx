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
}

const DualListBox: React.FC<DualListBoxProps> = (props) => {
  const { options, selectedValues } = props;
  const [availableItems, setAvailableItems] = useState(options || []);
  const [selectedItems, setSelectedItems] = useState(selectedValues || []);
  const [activeItems, setActiveItems] = useState([]);
  const [filterAvailable, setFilterAvailable] = useState('');
  const [filterSelected, setFilterSelected] = useState('');
  const [isGroupVisible, setIsGroupVisible] = useState(true);
  const [error, setError] = useState(props.invalidMessage ?? '');

  // Функция для фильтрации и сортировки элементов списка
  const getFilteredAndSortedItems = (items: ListItem[], filter: string) => {
    const filteredItems = items.filter((item) => item.label.toLowerCase().includes(filter.toLowerCase()));
    const groups = filteredItems.filter((item) => item.isGroup);
    const individuals = filteredItems.filter((item) => !item.isGroup);

    groups.sort((a, b) => a.label.localeCompare(b.label));
    individuals.sort((a, b) => a.label.localeCompare(b.label));

    return { groups, individuals };
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
  const handleSelect = (item: ListItem, event: React.MouseEvent) => {
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

      const lastActiveIndex = availableIndividuals.findIndex((i) => i.id === activeItems[0].id);
      const currentActiveIndex = availableIndividuals.findIndex((i) => i.id === item.id);
      const start = Math.min(lastActiveIndex, currentActiveIndex);
      const end = Math.max(lastActiveIndex, currentActiveIndex);
      const rangeActiveItems = availableIndividuals.slice(start, end + 1);
      setActiveItems(rangeActiveItems);
    } else {
      setActiveItems([item]);
    }
  };

  const moveAllItems = () => {
    setSelectedItems([...selectedItems, ...availableIndividuals]);
    setAvailableItems(availableItems.filter((item) => item.isGroup));
    setActiveItems([]);
  };

  const moveSelectedItems = () => {
    // Разделяем зафиксированные и незафиксированные элементы
    const fixedItems = selectedItems.filter((item) => item.isFixed);
    const movableItems = selectedItems.filter((item) => !item.isFixed);

    // Перемещаем только незафиксированные элементы в доступные
    setAvailableItems([...availableItems, ...movableItems]);
    setSelectedItems(fixedItems);
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
                onClick={(e) => handleSelect(item, e)}
              >
                {item.label}
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
          <button className="dual-list-box__control" onClick={moveAllItems}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>

          <button className="dual-list-box__control" onClick={moveSelectedItems}>
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
                }`}
                onClick={(e) => handleSelect(item, e)}
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
