import * as Yup from "yup";

export const addFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(255, "Too long")
    .required("Field is required"),
  email: Yup.string()
    .min(2, "Too short")
    .max(254, "Too long")
    .email("Invalid email")
    .required("Field is required"),
  birthday_date: Yup.date().required("Field is required"),
  phone_number: Yup.string()
    .min(2, "Too short")
    .max(20, "Too long")
    .required("Field is required"),
  address: Yup.string().min(2, "Too short"),
});

export const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short")
    .max(150, "Too long")
    .required("Field is required"),
  password: Yup.string()
    .min(2, "Too short")
    .max(128, "Too long")
    .required("Field is required"),
});
