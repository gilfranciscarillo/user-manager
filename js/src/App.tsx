import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { apiUrl } from "./global_config";
import {
  getFormattedDate,
  getYearsBetweenCurrent,
  SHORT_DATE_FORMAT,
} from "./global_helper";
import {
  UserTablePrimaryKey,
  UserTableHeaders,
  UserTableRow,
  UserType,
} from "./global_types/UserTypes";
import Table from "./components/shared/Table/Table";
import UserForm from "./components/forms/UserForm/UserForm";
import cloneDeep from "lodash/cloneDeep";
import axios from "axios";

function App() {
  const [data, setData] = useState<UserType[]>([]);
  const [dataTable, setDataTable] = useState<UserTableRow[]>([]);
  const [selectedData, setSelectedData] = useState<UserType | undefined>(
    undefined
  );
  const [show, setShow] = useState<boolean>(false);

  const userTypeRowsToTableRows = (typeRows: UserType[]): UserTableRow[] => {
    return typeRows.map((record) => {
      const birthDate = new Date(record.birthdate);
      return {
        id: record.id,
        fullname: `${record.first_name} ${record.last_name}`,
        email: record.email,
        birthdate: getFormattedDate(birthDate, SHORT_DATE_FORMAT),
        age: getYearsBetweenCurrent(birthDate),
      };
    });
  };

  useEffect(() => {
    fetch(`${apiUrl}/user`)
      .then((res) => res.json())
      .then((data: UserType[]) => {
        const userTableRows: UserTableRow[] = userTypeRowsToTableRows(data);
        setData(data);
        setDataTable(userTableRows);
      });
  }, []);

  const handleAdd = (): void => {
    setShow(true);
  };

  const handleEdit = (id: number): void => {
    const newUsers: UserType[] = cloneDeep(data);
    const [userData] = newUsers.filter((user) => user.id === id);

    setSelectedData(userData);
    setShow(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${apiUrl}/user/${id}`);

      if (response) {
        const newUsers: UserType[] = cloneDeep(data);
        const userIndex = newUsers.findIndex(
          (user) => user.id === response.data.id
        );

        if (userIndex >= 0) {
          newUsers.splice(userIndex, 1);
        }

        setData(newUsers);
        setDataTable(userTypeRowsToTableRows(newUsers));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Error: Unexpected error occured");
      }
    }
  };

  const handleOnSubmit = (
    respData: UserType,
    newData: UserType | undefined
  ): void => {
    const newUsers: UserType[] = cloneDeep(data);
    const userIndex = newUsers.findIndex((user) => user.id === respData.id);
    if (userIndex >= 0) {
      newUsers[userIndex] = respData;
    } else {
      newUsers.push(respData);
    }

    setData(newUsers);
    setDataTable(userTypeRowsToTableRows(newUsers));
  };

  const handleOnClose = (): void => {
    setShow(false);
    setSelectedData(undefined);
  };

  return (
    <>
      <div className={styles.AppContainer}>
        <button className={styles.actionButton} onClick={handleAdd}>
          Add New User
        </button>
        <Table
          primaryKey={UserTablePrimaryKey}
          rows={dataTable}
          headers={UserTableHeaders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <UserForm
        show={show}
        data={selectedData}
        onSubmit={handleOnSubmit}
        onClose={handleOnClose}
      />
    </>
  );
}

export default App;
