import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, contacts, deleteContact, editContact } from '../redux/slices/contactSlice';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

const Contacts = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [active, setActive] = useState<string>('');
  const [id, setId] = useState<string>('');

  const dispatch = useDispatch();
  const createdContacts = useSelector(contacts);

  // Reset all states that are used for contact
  const resetState = () => {
    setId('');
    setFirstName('')
    setLastName('')
    setActive('')
  }
  
  // handle Create and Edit Contact operation
  const handleCreationContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactObj = {
      id: id ? id : v4(),
      firstName,
      lastName,
      isActive: active
    };
    if (firstName && lastName && active) {
      if (id) {
        dispatch(editContact(contactObj));
        toast.success("Contact has been updated successfully")
      } else {
        dispatch(addContact(contactObj));
        toast.success("Contact has been created successfully")
      }
      resetState();
      setShowModal(false);
    }
    else {
      toast.error("Please fill all field ")
    }
  }
  
  // To fill the data into input field
  const handleEditContact = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setShowModal(true);
    
    const contact = createdContacts.find(contact => contact.id === id);
    setId(id);
    setFirstName(contact?.firstName || '');
    setLastName(contact?.lastName || '');
    setActive(contact?.isActive || '');
  }
  
  // To perform delete operation
  const handleDeleteContact = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    
    dispatch(deleteContact(id));
    toast.success("Contact has been deleted successfully")
  }
  
  // handle modal close
  const closeModal = () => {
    setShowModal(false);
    resetState();
  }

  return (
    <div className="container flex-2 m-auto">
      <button className='bg-black text-white rounded-lg py-2 px-5 w-full m-auto block my-5 max-w-[600px]' onClick={() => setShowModal(true)}>Create Contact</button>
      {createdContacts.length > 0 ? createdContacts.map(contact => {
        return (
          <div className='w-full h-[200px] bg-cyan-300 rounded-lg my-5 p-5 min-w-[300px] max-w-[600px] m-auto' key={contact.id}>
            <p>First Name: {contact.firstName}</p>
            <p>Last Name: {contact.lastName}</p>
            <p>Status: {contact.isActive}</p>
            <button className='bg-black text-white rounded-lg py-1 w-full m-auto block my-3 max-w-[600px]' onClick={(e) => handleEditContact(e, contact.id)}>Edit</button>
            <button className='bg-black text-white rounded-lg py-1 w-full m-auto block my-3 max-w-[600px]' onClick={(e) => handleDeleteContact(e, contact.id)}>Delete</button>
          </div>
        )
      }) : (
        <div className='flex justify-center flex-col items-center h-[70vh]'>
          <h1 className='font-semibold text-4xl mb-3'>No Contacts Found!</h1>
          <div className='text-xl'>Please click above to create a contact </div>
        </div>
      )}

      {showModal && <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center bg-gray-600/50">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative rounded-lg shadow bg-gray-700">
            <button type="button" onClick={closeModal} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 text-white">Add Contact</h3>
              <form className="space-y-6" action="#">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 text-white">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" id="firstName" placeholder="Enter Your First Name" className="bg-gray-50 text-gray-900 text-sm rounded-lg w-full p-2.5 bg-gray-600 placeholder-gray-400 text-white" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 text-white">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Enter Your Last Name" required />
                </div>
                <div className='flex items-center gap-3'>
                  <label className="block mb-2 text-sm font-medium text-gray-900 text-white">Status</label>
                  <div>
                    <div className='flex text-white gap-2'>
                      <input type="radio" checked={active === 'Active'} id='active' onChange={(e) => setActive('Active')} name="status" required />
                      <label className="block text-sm font-medium text-gray-900 text-white" htmlFor='active'>Active</label>
                    </div>
                    <div className='flex text-white gap-2'>
                      <input type="radio" checked={active === 'Inactive'} id='inactive' onChange={(e) => setActive('Inactive')} name="status" required />
                      <label className="block text-sm font-medium text-gray-900 text-white" htmlFor='inactive'>Inactive</label>
                    </div>
                  </div>
                </div>
                <button onClick={handleCreationContact} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">{id ? 'Edit' : 'Add'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Contacts