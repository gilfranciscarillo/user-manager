export interface TableHeaderType {
  field: string;
  title: string;
}

export interface TableProps<R, I> {
  primaryKey: string;
  rows: R[];
  headers: TableHeaderType[];
  onEdit: (id: I) => void;
  onDelete: (id: I) => void;
}
