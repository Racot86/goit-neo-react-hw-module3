import Contact from "@components/Contact/Contact.jsx";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";


const ContactList = ({contactData, handleDelete}) => {


    return(
    <div className={styles.list}>
        {contactData.length !== 0 ? contactData.map((contact) =>
            <Contact
                id={contact.id}
                deleteAction={handleDelete}
                key={contact.id}
                name={contact.name}
                tel={contact.number}
            />
        ) :
            <p className={styles.noData}>no data</p>
        }
    </div>
    )
}
export default ContactList;

ContactList.propTypes = {
    contactData: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
}