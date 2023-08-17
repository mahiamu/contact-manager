import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { ContactService } from '../../../services/ContactServices';
import Spinner from '../../Spinner/Spinner';


 let VeiwContact = () => {

    let {contactId} = useParams();
    let [state , setState] = useState({
      loading : false,
      contact : [],
      //group : {}
    });
    useEffect( () => {
      async function respond()
      {
        setState({...state, loading: true});
        let response= await ContactService.getContacts(contactId);
        //let groupResponse = await ContactService.getGroup(response.data);
        setState({
          ...state,
          loading : false,
          contact : response.data,
          //group : groupResponse.data
        });
      }
      respond();
    }, [contactId]);


    let {loading, contact} = state;
    return(
        <React.Fragment>
          <section className='view-contact-intro p-3'>
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h3 fw-bold">View Contact</p>
                  <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sed officia distinctio ipsa! Dolorem officiis placeat odio quod? Amet labore repellat qui ullam pariatur nisi aliquam corrupti fuga, architecto laboriosam.</p>
                </div>
              </div>
            </div>
          </section>

          {
          loading ? <Spinner/> : <React.Fragment>

          {
          Object.keys(contact).length > 0 && 
          <section className='view-contact mt-3'>
                <div className="container">
                  <div className="row align-items-center ">
                    <div className="col-md-4">
                      <img src={contact.photo} alt="" className='contact-img'/>
                    </div>
                    <div className="col-md-8">
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
                      <li className='list-group-item list-group-item-action'>
                        Company : <span className='fw-bold'>{contact.company}</span> 
                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Title : <span className='fw-bold'>{contact.title}</span> 
                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Group : <span className='fw-bold'>{contact.group}</span> 
                      </li>
                    </ul>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Link to={'/contacts/list'} className="btn btn-dark">Back</Link> 
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              }

              
            </React.Fragment>
          }

         
        </React.Fragment>

    )

};
export default VeiwContact;