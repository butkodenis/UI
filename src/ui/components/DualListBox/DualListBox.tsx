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

    if (event.shiftKey) {
      // Если нажат Shift, добавляем элемент к выделенной группе
      setActiveItems((prev) => {
        if (prev.includes(item)) {
          return prev.filter((i) => i.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    } else {
      // Если Shift не нажат, выделяем только этот элемент
      setActiveItems([item]);
    }
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
            {selectedIndividuals.map((item) => (
              <div key={item.id} className="dual-list-box__list-item">
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
