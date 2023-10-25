"use client";

import { useAppDispatch } from "@/hooks/reduxHooks";
import AddPeopleForm from "../AddPeopleForm";
import { useState } from "react";
import styles from "./TableItem.module.scss";
import { editPeople } from "@/redux/tableSlice";

const TableItem = ({ people }: { people: PeopleType }) => {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <>
      {isEdit ? (
        <AddPeopleForm
          value={people}
          handleSubmit={(value) => {
            dispatch(editPeople(people.id, value));
            setIsEdit(false);
          }}
        />
      ) : (
        <div className={styles.row} key={people.id}>
          <div className={styles.item} title={people.name}>
            {people.name}
          </div>
          <div key={people.id} className={styles.item} title={people.email}>
            {people.email}
          </div>
          <div className={styles.item} title={people.birthday_date}>
            {people.birthday_date}
          </div>
          <div className={styles.item} title={people.phone_number}>
            {people.phone_number}
          </div>
          <div className={styles.editContainer}>
            <div className={styles.item} title={people.address}>
              {people.address}
            </div>

            <button
              onClick={() => {
                setIsEdit(true);
              }}
              className={styles.editButton}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableItem;
