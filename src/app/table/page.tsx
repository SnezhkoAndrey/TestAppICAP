"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import styles from "./Table.module.scss";
import {
  createPeople,
  isAuthData,
  loadingData,
  nextPageData,
  peopleData,
  prevPageData,
  setPeopleData,
} from "@/redux/tableSlice";
import { useRouter } from "next/navigation";
import AddPeopleForm from "./components/AddPeopleForm";
import TableItem from "./components/TableItem";
import { SpiralSpinner } from "react-spinners-kit";

export default function Table() {
  const { push } = useRouter();

  const isAuth = useAppSelector(isAuthData);
  const loading = useAppSelector(loadingData);
  const people = useAppSelector(peopleData);
  const nextPage = useAppSelector(nextPageData);
  const prevPage = useAppSelector(prevPageData);

  const dispatch = useAppDispatch();

  const handlePrev = () => {
    dispatch(setPeopleData(prevPage.split("/").slice(5).join()));
  };

  const handleNext = () => {
    dispatch(setPeopleData(nextPage.split("/").slice(5).join()));
  };

  useEffect(() => {
    if (!isAuth) {
      push("/");
      return;
    }
    dispatch(setPeopleData("?limit=10"));
  }, []);
  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <SpiralSpinner size={150} frontColor="#f0aab6" backColor="#474b70" />
        </div>
      ) : (
        <div className={styles.container}>
          <AddPeopleForm
            value={{
              name: "",
              email: "",
              birthday_date: "",
              phone_number: "",
              address: "",
            }}
            handleSubmit={(value) => dispatch(createPeople(value))}
          />
          <div className={styles.table}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>Name</div>
              <div className={styles.title}>Email</div>
              <div className={styles.title}>Birthday date</div>
              <div className={styles.title}>Phone number</div>
              <div className={styles.title}>Address</div>
              <div className={styles.div}></div>
            </div>
            <div className={styles.column}>
              {people.map((p) => (
                <TableItem people={p} key={p.id} />
              ))}
            </div>
          </div>
          <div className={styles.containerButton}>
            <button
              className={styles.pageButton}
              onClick={handlePrev}
              disabled={!prevPage}
            >
              Prev
            </button>
            <button
              className={styles.pageButton}
              onClick={handleNext}
              disabled={!nextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
