import { Component } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import { ContactsList } from './ContactsList/ContactsList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = ({ newContacts, name, number }) => {
    const contactsObj = {
      ...newContacts,
      id: nanoid(),
      name,
      number,
    };

    const nameContact = this.state.contacts.find(
      contact => contact.name === name
    );
    if (nameContact) {
      return alert(`${name} is already in contacts!!!`);
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, contactsObj],
    }));
  };

  deleteContacts = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <PhonebookForm addContacts={this.addContacts} />
          <h2>Contacts</h2>
          {this.state.contacts.length > 0 ? (
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          ) : (
            <p>Your phonebook is empty. Add first contact!</p>
          )}
          <ContactsList
            contacts={visibleContacts}
            deleteContacts={this.deleteContacts}
          />
        </div>
      </>
    );
  }
}

export default App;
