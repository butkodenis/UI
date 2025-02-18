export interface ListItem {
  id: string;
  label: string;
  isGroup?: boolean;
  isFixed?: boolean;
}

export interface DualListBoxProps {
  labelOptions: string;
  labelSelected: string;
  placeholder: string;
  options: ListItem[];
  selectedValues: ListItem[];
  isInvalid?: boolean;
  disabled?: boolean;
  invalidMessage?: string;
  clearable?: boolean;
  className?: string;
  onChange: (selectedItems: ListItem[]) => void;
}
