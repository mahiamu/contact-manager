import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';

 let AddContact = () => {

  let navgate = useNavigate();



  let [state , setstate] = useState({
    loading : false,
    contact : {
      name : '',
      photo : '',
      mobile : '',
      email : '',
      company : '',
      title : '',
      groupId : ''
    },
    groups : [],
    errorMessage : ''
  });


  let updateInput = (event) => {
    setstate({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name] : event.target.value
      }
    });
  }


  useEffect( () => {
    async function respond (){
      setstate({ ...state, loading: true});
      let response = await ContactService.getGroups();
      setstate({
        ...state,
        loading:false,
        groups: response.data

      })
    }
    respond();
  }, []);

  let submitForm = async (event) => {
    event.preventDefault();
    try {
        let response = await ContactService.createContact(state.contact);
        if(response){
          navgate('/contacts/list', { replace: true});
        }       
      
    } catch (error) {

      setstate({...state , errorMessage: error.message});
      navgate('/contacts/add', { replace: false});      
      
    }
        

  };


    let {loading, contact, groups} = state;

    return(
        <React.Fragment>
          <section className='add-contact'>
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-success fw-bold">Create Contact</p>
                  <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat excepturi dolores maiores autem perspiciatis. Quod beatae placeat, ipsa odit nostrum architecto, unde rerum totam rem facere eius pariatur consectetur at.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className='mb-2'>
                      <input
                      required={true} 
                      name="name"
                      value={contact.name}
                      onChange={updateInput}
                      type="text" className="form-control" placeholder="Name"/>
                    </div>
                    <div className='mb-2'>
                      <input 
                      required={true} 
                      name="photo"
                      value={contact.photo}
                      onChange={updateInput}
                      type="text" className="form-control" placeholder="Photo Url"/>
                    </div>
                    <div className='mb-2'>
                      <input 
                      required={true} 
                      name="mobile"
                      value={contact.mobile}
                      onChange={updateInput}
                      type="number" className="form-control" placeholder="Mobile"/>
                    </div>
                    <div className='mb-2'>
                      <input
                      required={true} 
                      name="email"
                      value={contact.email}
                      onChange={updateInput} 
                      type="text" className="form-control" placeholder="Email"/>
                    </div>
                    <div className='mb-2'>
                      <input 
                      required={true} 
                      name="company"
                      value={contact.company}
                      onChange={updateInput}
                      type="text" className="form-control" placeholder="Company"/>
                    </div>
                    <div className='mb-2'>
                      <input
                      required={true} 
                      name="title"
                      value={contact.title}
                      onChange={updateInput}
                      type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div className='mb-2'>
                      <select
                      required={true} 
                      name="groupId"
                      value={contact.groupId}
                      onChange={updateInput} 
                      className='form-control'>
                       <option value="">select a Group</option>
                       {
                        groups.length > 0 &&
                        groups.map(group => {
                          return(
                            <option key={group.id} value={group.id}>{group.name}</option>
                          )
                        })
                       }
                      </select>
                    </div>
                    <div className='mb-2'>
                      <input type="submit" className="btn btn-success" value="Create"/>
                      <Link to={'/contacts/list'} className=" btn btn-dark ms-2 ">Cancel</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>


    )

};
export default AddContact ;