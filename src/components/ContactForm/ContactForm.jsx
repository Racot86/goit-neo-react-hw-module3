import {ErrorMessage, Field, Form, Formik} from "formik";
import styles from "./ContactForm.module.css";
import { IoClose } from "react-icons/io5";
import {useRef} from "react";
import PropTypes from "prop-types";
import * as yup from "yup";

const ContactForm = ({handleClose, handleAddContact}) => {

    const nameFieldRef = useRef(null);
    const numberFieldRef = useRef(null);

    const handleSubmit = (values, actions) => {
        handleAddContact(values);
        actions.resetForm();
        handleClose();
    }

    const validationSchema = yup.object().shape({
        name: yup.string()
            .min(2,"user name is too short")
            .matches(/^[a-zA-Z0-9]+$/, "name contains unsupported chars")
            .required(),
        number: yup.string()
            .required()
            .matches(/^[0-9-]+$/)
            .min(9,'too short number'),
    });

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/[^\d]/g, "");
        const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (!match) return value;
        return [match[1], match[2], match[3]].filter(Boolean).join("-");
    };


    return (
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2>Add contact</h2>
                    <button onClick={handleClose}><IoClose /></button>
                </div>
                <Formik onSubmit={handleSubmit} initialValues={{name: "", number: ""}} validationSchema={validationSchema}>
                    {({values, setFieldValue})=>(
                        <Form className={styles.form}>
                            <label htmlFor={nameFieldRef}>Name:</label>
                            <Field
                                placeholder='contact name'
                                type='text'
                                name='name'
                                maxLength='24'
                                id={nameFieldRef}>
                            </Field>
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="name"
                                component="span"
                            />
                            <label>Phone:</label>
                            <Field
                                htmlFor={numberFieldRef}
                                value ={values.number}
                                onChange={(e)=>setFieldValue('number', formatPhoneNumber(e.target.value))}
                                placeholder='000-00-00'
                                type='tel'
                                maxLength='9'
                                name='number'
                                id={numberFieldRef}>

                            </Field>
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="number"
                                component="span"
                            />
                            <button type="submit">Create</button>
                        </Form>
                    )}
                </Formik>
            </div>

    )
}
export default ContactForm

ContactForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleAddContact: PropTypes.func.isRequired,
}