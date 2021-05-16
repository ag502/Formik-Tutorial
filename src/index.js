import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from 'yup'
import "./styles.css";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ): null}
        </>
    )
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div>
            <label>
                <input type="checkbox" {...field} {...props}/>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    )
}

const MySelect = ({label, children, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props}>
                {children}
            </select>
        </div>
    )
}

const SignupForm = () => {
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: ''}}
            validationSchema={Yup.object({
              firstName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
              lastName: Yup.string()
                  .max(20, 'Must be 20 character or less')
                  .required("Required"),
              email: Yup.string().email("Invalid email address")
                  .required("Required"),
              acceptedTerms: Yup.boolean()
                  .required("Required")
                  .oneOf([true], "You must accept the terms and conditions."),
              jobType: Yup.string()
                  .oneOf(
                      ["designer", "development", "product", "other"],
                      "invalid Job Type"
                  )
                  .required("Required")
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                }, 400)
            }}
        >
            <Form>
                <MyTextInput
                    label="First Name"
                    name="firstName"
                    type="text"
                />

                <MyTextInput
                    label="Last Name"
                    name="lastName"
                    type="text"
                />

                <MyTextInput
                    label="Email Address"
                    name="email"
                    type="email"
                />

                <MyCheckbox name="acceptedTerms">
                    I accepted the terms and conditions
                </MyCheckbox>

                <MySelect label="Job Type" name="jobType">
                    <option value="">Select a job type</option>
                    <option value="designer">Designer</option>
                    <option value="development">Developer</option>
                    <option value="product">Product Manager</option>
                    <option value="other">Other</option>
                </MySelect>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
};

function App() {
    return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
