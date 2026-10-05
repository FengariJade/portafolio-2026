export interface MenuOption {
  id?: number;
  icon: string;
  label: string;
  description?: string;
  link: string;
  items: MenuOptionItem[];
  active?: boolean;
  expand?: boolean;
}

export interface MenuOptionItem {
  id?: number;
  icon?: string;
  label: string;
  description: string;
  link: string;
}