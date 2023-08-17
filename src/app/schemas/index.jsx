import * as Yup from "yup";
export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .trim("Name cant be empty")
    .required("Required"),

  phoneNumber: Yup.string("Invalid")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
    .required("Enter Valid Number"),

  email: Yup.string().email().required("Please enter your email"),
});
