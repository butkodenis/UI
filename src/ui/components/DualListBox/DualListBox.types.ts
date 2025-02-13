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
  maxInputHeight: number;
  isInvalid?: boolean;
  disabled?: boolean;
  invalidMessage?: string;
  clearable?: boolean;
  className?: string;
  onSelectedChange: (selectedItems: ListItem[]) => void;
  onGroupUsers: (id: string) => ListItem[];
}
