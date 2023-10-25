"use client";

import styles from "./FieldForm.module.scss";
import { Field, ErrorMessage } from "formik";

const FieldForm = ({ fieldName }: { fieldName: string }) => {
  return (
    <div className={styles.fieldContainer}>
      <Field
        id={fieldName}
        className={styles.field}
        name={fieldName}
        placeholder={fieldName}
      />
      <ErrorMessage name={fieldName}>
        {(msg) => <div className={styles.error}>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default FieldForm;
