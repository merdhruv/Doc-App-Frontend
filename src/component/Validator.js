import * as yup from 'yup';

const passswordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginSchema = yup.object().shape({
    email : yup.string().required("Email is required").email("Enter Valid Email"),
    password: yup.string().required("Password is required")
    .min(5, "too short")
})

export const registerSchema = yup.object().shape({
    username : yup.string().required("Username Required"),
    fullname : yup.string("Must Be String"),
    email : yup.string().required("Email Required").email("Enter Valid Email"),
    password: yup.string().required("Password is required")
    .min(5, "too short")
    .matches(passswordRule, 'Not Strong Password, must contain 1 lowercase, 1 uppercase, 1 Number and 1 special symbol'),
    contact : yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),

})