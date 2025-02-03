import styles from "./Table.module.scss";
import { TableProps } from "./TableTypes";

const Table = <R extends Record<string, any>, I>({
  primaryKey,
  rows,
  headers,
  onEdit,
  onDelete,
}: TableProps<R, I>) => {
  return (
    <table className={styles.tableComponentContainer}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header.title}</th>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[primaryKey]}>
            {headers.map((header, index) => (
              <td key={index}>{row[header.field]}</td>
            ))}
            <td>
              <button onClick={() => onEdit(row[primaryKey])}>Edit</button>
            </td>
            <td>
              <button onClick={() => onDelete(row[primaryKey])}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
