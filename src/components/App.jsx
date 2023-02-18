import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import PhoneList from './PhoneList/PhoneList';
import '../styles/shared.scss';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length > 0) return contacts;
    return [];
  });
  const [filter, setFilter] = useState('');

  const isDuplicate = name => {
    const normalizeName = name.toLocaleLowerCase();
    return contacts.some(
      ({ name }) => name.toLocaleLowerCase() === normalizeName
    );
  };

  const handleAddContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      alert(`${name} is already in contacts.`);
      return null;
    }
    const id = nanoid();
    setContacts(prevContacts => {
      return [...prevContacts, { id, name, number }];
    });
    return { id, name, number };
  };

  const handleOnChangeFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const calcVisibleContacts = () => {
    const normalizeFilter = filter.trim().toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };

  const onDeleteContact = id => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== id);
    });
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = calcVisibleContacts();
  return (
    <div className="container">
      <h1>Phone book</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleOnChangeFilter} />
      <PhoneList contacts={visibleContacts} onDelete={onDeleteContact} />
    </div>
  );
};