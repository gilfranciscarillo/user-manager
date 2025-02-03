import { useEffect } from "react";
import styles from "./UserForm.module.scss";
import { apiUrl } from "../../../global_config";
import axios from "axios";
import { useForm } from "react-hook-form";
import MainModal from "../../shared/Modal/Modal";
import { UserType } from "../../../global_types/UserTypes";

type UserFormProps = {
  show: boolean;
  data: UserType | undefined;
  onSubmit: (respData: UserType, newData: UserType | undefined) => void;
  onClose: () => void;
};

const UserForm = ({ show, data, onSubmit, onClose }: UserFormProps) => {
  const defaultFormValues = {
    first_name: "",
    last_name: "",
    email: "",
    birthdate: "",
  };

  const handleClose = () => {
    reset(defaultFormValues);
    if (onClose) {
      onClose();
    }
  };

  const handleSave = async (values: UserType) => {
    try {
      const response = data
        ? await axios.patch(`${apiUrl}/user/${data.id}`, values)
        : await axios.post(`${apiUrl}/user`, values);

      if (onSubmit) {
        onSubmit(response.data, data);
      }

      handleClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.message}`);
      } else {
        alert("Error: Unexpected error occured");
      }
    }
  };

  const { register, handleSubmit, reset } = useForm<UserType>({
    defaultValues: { ...defaultFormValues },
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  return (
    <MainModal
      show={show}
      title={`${data ? "Edit" : "Add"} User`}
      onSubmit={handleSubmit(handleSave)}
      onClose={handleClose}
    >
      <div className={styles.form}>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>First name:</div>
          <div className={styles.formFieldInput}>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
            />
          </div>
        </div>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Last name:</div>
          <div className={styles.formFieldInput}>
            <input
              {...register("last_name", { required: "Last name is required" })}
            />
          </div>
        </div>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Email:</div>
          <div className={styles.formFieldInput}>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
        </div>
        <div className={styles.formField}>
          <div className={styles.formFieldLabel}>Date of birth:</div>
          <div className={styles.formFieldInput}>
            <input
              type="date"
              {...register("birthdate", { required: "Birthdate is required" })}
            />
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default UserForm;
