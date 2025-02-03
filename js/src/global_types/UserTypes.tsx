import { TableHeaderType } from "../components/shared/TableTypes";

export const UserTablePrimaryKey = 'id';

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birthdate: string;
}

export const UserTableHeaders: TableHeaderType[] = [
  { field: "id", title: "ID" },
  { field: "fullname", title: "Name" },
  { field: "email", title: "Email" },
  { field: "birthdate", title: "BirthDate" },
  { field: "age", title: "Age" },
];

export interface UserTableRow {
  id: number;
  fullname: string;
  email: string;
  birthdate: string;
  age: number;
}
