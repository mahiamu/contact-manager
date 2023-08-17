import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';
import Spinner from '../../Spinner/Spinner';

 let ContactList = () => {

   let [query ,setQuery] = useState({

   })

    let [state , setState] = useState({
       loading : false,
       contacts : [],
       filteredContacts: [],
       errorMessage: ''
    });

    
    useEffect( () => {

      async function respond() 
      {
         setState({...state, loading: true});
         let response= await ContactService.getALLContacts();
         setState({
            ...state,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data


         });
        
      }
     respond();
        
    }, []);

    let clickDelete = async (contactId) => {
      try {
         let response = await ContactService.deleteContact(contactId);
         if(response){
            setState({...state, loading: true});
         let response= await ContactService.getALLContacts();
         setState({
            ...state,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data


         });
         }

      } catch (error) {
         setState({
            ...state,
            loading : false,
            errorMessage: error.message
         });
         
      }
    };

    // search contacts 

    let searchContacts = (event) => {
      setQuery({...query, text : event.target.value});
      let theContacts = state.contacts.filter(contact =>{
         return contact.name.toLowercase().includes(event.target.value.toLowercase())
      });
      console.log(theContacts);
      setState({
         ...state,
         filteredContacts: theContacts
      });
     

    }

    let { loading, contacts, errorMessage, filteredContacts} = state; 

   
    return (
       <React.Fragment>
         <section className='contact-search p-3'>
            <div className="container">
               <div className="grid">
                  <div className="row">
                     <div className="col">
                       <p className="h3 fw-bold">Contact Manager
                          <Link to={'/contacts/add'} className='btn btn-success ms-2'> 
                          <i className='fa fa-plus-circle me-2'/> New</Link>
                         </p> 
                         <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad nihil velit optio nemo amet voluptatum illo hic rem perferendis temporibus, maiores eos sapiente fugiat debitis aut non ullam ipsam reiciendis.</p>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-6">
                        <form className='row'>
                           <div className="col">
                             <div className="mb-2">
                                <input 
                                name='text'
                                value={query.text}
                                onChange={searchContacts}
                                type='text' className="form-control" placeholder="Search Names"/>
                              </div>
                           </div>
                           <div className="col">  
                             <div className="mb-2">
                                <input type='submit' className="btn btn-outline-dark" value="search"/>
                              </div> 
                           </div>
   
                        </form>  
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {
         loading? <Spinner/> : <React.Fragment>

         <section className='contact-list'>
           <div className="container">
            <div className="row">
               {
                  filteredContacts.length > 0 &&
                  filteredContacts .map(contact => {
                     return(
                        <div className="col-md-6" key={contact.id}>
                  <div className="card my-2">
                     <div className="card-body">
                       <div className="row align-item-center d-flex justify-content-around">
                       <div className="col-md-4">
                        <img src={contact.photo} alt="" className='contact-img'/>
                         </div> 
                        <div className="col-md-7">
                           <ul className='list-group'>
                              <li className='list-group-item list-group-item-action'>
                                Name : <span className='fw-bold'>{contact.name}</span> 
                              </li>
                              <li className='list-group-item list-group-item-action'>
                                Mobile : <span className='fw-bold'>{contact.mobile}</span> 
                              </li>
                              <li className='list-group-item list-group-item-action'>
                                Email : <span className='fw-bold'>{contact.email}</span> 
                              </li>
                           </ul>
 
                        </div>
                        <div className="col-md-1 d-flex flex-column align-items-center">
                           <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                             <i className='fa fa-eye'/> 
                           </Link>
                           <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                             <i className='fa fa-pen'/> 
                           </Link>
                           <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                             <i className='fa fa-trash'/> 
                           </button>

                        </div>
                       </div>
                     </div>
                  </div>
               </div>

                     )
                  })
               }

               
            </div>
            </div>  
         </section>

         </React.Fragment>

         }

         
       </React.Fragment>

    )

};
export default ContactList;