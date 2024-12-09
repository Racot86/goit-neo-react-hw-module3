import './App.css'
import 'modern-normalize'
import ContactList from "@components/ContactList/ContactList";
import {useEffect, useState} from "react";
import ContactForm from "@components/ContactForm/ContactForm";
import SearchBox from "@components/SearchBox/SearchBox.jsx";


function App() {


    const [contactsData, setContactsData] = useState(localStorage.getItem("contacts") !== null ? JSON.parse(localStorage.getItem("contacts")) : []);
    const [showContactForm, setShowContactForm] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');


    const handleClose = () => {
        showContactForm ? setShowContactForm(false) : setShowContactForm(true);
    }

    const handleDelete = (id) => {
        setContactsData(contactsData.filter(contact => contact.id !== id));
    }

    const handleAddContact = (values) => {
        setContactsData(updateContactsData => [
            ...updateContactsData,
            {
                id: Date.now().toString(),
                name: values.name,
                number: values.number
            }
        ]);

    }

    const filter = contactsData.filter((item) =>
        Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(searchPhrase.toLowerCase())
    )

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contactsData));
    },[contactsData])

    return (
        <div className='phone-book'>
            <h1 className='header'>Phone book</h1>
            <SearchBox handleSearch={setSearchPhrase}/>
            <ContactList contactData={filter} handleDelete={handleDelete}/>
            {showContactForm && <ContactForm handleAddContact={handleAddContact} handleClose={handleClose}/>}
            <button className='btn-add' onClick={handleClose}>+</button>
        </div>
    )
}

export default App
