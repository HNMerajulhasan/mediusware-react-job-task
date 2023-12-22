

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Problem2 = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    
    axios.get('https://contact.mediusware.com/api/contacts/')
      .then(response => setAllContacts(response.data))
      .catch(error => console.error('Error fetching all contacts:', error));


    axios.get('https://contact.mediusware.com/api/country-contacts/US/')
      .then(response => setUsContacts(response.data))
      .catch(error => console.error('Error fetching US contacts:', error));
  }, []);

  const filterContacts = contacts => {
    if (onlyEven) {
      return contacts.filter(contact => parseInt(contact.phone.replace(/\D/g, ''), 10) % 2 === 0);
    }
    return contacts;
  };

  const handleSearch = contact => {
    if (!searchText) return true; // No search text, always show
    const digitPattern = /\d+/;
    const phoneDigits = contact.phone.match(digitPattern);
    return phoneDigits && phoneDigits.join('').includes(searchText);
  };

  const renderModalContent = (contacts, title) => (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={() => setShowModalA(false)}></button>
      </div>
      <div className="modal-body">
        <ul className="list-group">
          {filterContacts(contacts).filter(handleSearch).map((contact, index) => (
            <li className="list-group-item d-flex justify-content-between" key={index}>
              <span>{index + 1}</span>
              <span>{contact.phone}</span>
              <span>{contact.country}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="modal-footer">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="onlyEvenCheckbox"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
          />
          <label className="form-check-label" htmlFor="onlyEvenCheckbox">Only Even</label>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search by digit"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => setShowModalA(true)}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => setShowModalB(true)}
          >
            US Contacts
          </button>
        </div>

        {showModalA && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              {renderModalContent(allContacts, 'Modal-A')}
            </div>
          </div>
        )}

        {showModalB && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              {renderModalContent(usContacts, 'Modal-B')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
