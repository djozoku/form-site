export interface Item {
  label: string;
  value: any;
  key: string;
}

export const createItem = (key: string, label?: string, value?: any): Item => {
  if (!label) return { key, label: key, value: key };
  if (!value) return { key, label, value: label };
  return { key, label, value };
};
