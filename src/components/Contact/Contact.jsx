import styles from "./Contact.module.css";
import { FaPhone } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import clsx from "clsx";
import PropTypes from "prop-types";

const Contact = ({name, tel, deleteAction, id}) => {
    return (
        <div className={styles.contact}>
            <div className={styles.fieldWrapper}>
                <div className={clsx(styles.field, styles.name)}>
                    <IoMdContact /> <p>{name}</p>
                </div>
                <div className={clsx(styles.field,styles.phone)}>
                    <FaPhone/> <p>{tel}</p>
                </div>
            </div>
            <button onClick={() => deleteAction(id)} className={styles.btn}><FaRegTrashAlt /></button>
        </div>
    )
}
export default Contact

Contact.propTypes = {
    name: PropTypes.string,
    tel: PropTypes.string,
    deleteAction: PropTypes.func,
    id: PropTypes.string
}