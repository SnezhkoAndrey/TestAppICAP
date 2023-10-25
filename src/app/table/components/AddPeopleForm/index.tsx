"use client";

import styles from "./AddPeopleForm.module.scss";
import { Formik, Form } from "formik";
import FieldForm from "@/components/FieldForm/FieldForm";
import { addFormSchema } from "@/validation/validationSchema";

const AddPeopleForm = ({
  value,
  handleSubmit,
}: {
  value: PeopleType;
  handleSubmit: (value: PeopleType) => void;
}) => {
  return (
    <Formik
      initialValues={{
        name: value.name,
        email: value.email,
        birthday_date: value.birthday_date,
        phone_number: value.phone_number,
        address: value.address,
      }}
      validationSchema={addFormSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm({
          values: {
            name: "",
            email: "",
            birthday_date: "",
            phone_number: "",
            address: "",
          },
        });
      }}
    >
      {({ isValid, dirty }) => (
        <Form className={styles.form}>
          <FieldForm fieldName="name" />

          <FieldForm fieldName="email" />

          <FieldForm fieldName="birthday_date" />

          <FieldForm fieldName="phone_number" />

          <FieldForm fieldName="address" />

          <button
            type="submit"
            disabled={!isValid || !dirty}
            className={styles.button}
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPeopleForm;
