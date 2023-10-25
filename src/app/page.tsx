"use client";

import { useEffect } from "react";
import styles from "./Login.module.scss";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { isAuthData, loadingData, login } from "@/redux/tableSlice";
import FieldForm from "@/components/FieldForm/FieldForm";
import { SigninSchema } from "@/validation/validationSchema";
import { SpiralSpinner } from "react-spinners-kit";

export default function Home() {
  const { push } = useRouter();

  const isAuth = useAppSelector(isAuthData);
  const loading = useAppSelector(loadingData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) push("/table");
  }, [isAuth]);

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <SpiralSpinner size={150} frontColor="#f0aab6" backColor="#474b70" />
        </div>
      ) : (
        <main className={styles.main}>
          <div className={styles.title}>Sign in</div>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={SigninSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(login(values));
              push("/table");
              resetForm({
                values: {
                  username: "",
                  password: "",
                },
              });
            }}
          >
            {({ isValid, dirty }) => (
              <Form className={styles.form}>
                <FieldForm fieldName="username" />

                <FieldForm fieldName="password" />

                <button
                  type="submit"
                  disabled={!isValid || !dirty}
                  className={styles.buttonSubmit}
                >
                  Log in
                </button>
              </Form>
            )}
          </Formik>
        </main>
      )}
    </>
  );
}
