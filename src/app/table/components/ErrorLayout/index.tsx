"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { errorData, setError } from "@/redux/tableSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

interface PropsType {
  children: React.ReactNode;
}

const ErrorLayout = ({ children }: PropsType) => {
  const styledError = {
    style: {
      fontFamily: "VT323",
      fontSize: "20px",
      background: "rgba(255,255,255,0.7)",
      color: "rgba(40,22,17)",
      border: "5px solid #a81919",
      borderRadius: "0",
    },
  };

  const error = useAppSelector(errorData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, styledError);
    }
    dispatch(setError(""));
  }, [error]);

  return (
    <>
      <div>{children}</div>
      <Toaster />
    </>
  );
};

export default ErrorLayout;
