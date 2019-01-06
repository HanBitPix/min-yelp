import React from 'react';
import { Link  } from 'react-router-dom';

const Result = (props) => {
  const cards = props.result.map( business => 
    <div key={business.id} className="col-12 col-md-6 col-lg-4 my-2">
      <div className="card-result">
        <img 
          src={business.image_url} className="card-img-top card-image-result" 
          alt="..."/>
        <div className="card-body text-center table-responsive ">
          <h5 className="card-title">{business.name}</h5>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Price:</th>
                <td>{business.price}</td>
              </tr>
              <tr>
                <th scope="row">Rating:</th>
                <td>{business.rating}</td>
              </tr>
              <tr>
                <th scope="row">Reviews:</th>
                <td>{business.review_count}</td>
              </tr>
              <tr>
                <th scope="row">Contact:</th>
                <td>{business.display_phone}</td>
              </tr>
            </tbody>
          </table>
          <Link 
            to={`/dashboard/${business.id}`} 
            className="btn btn-primary btn-block"
            
            >
            More Info
          </Link>
        </div>
        {/* End of Card Body */}
      </div>
    </div>
  );


  return(
    <div className="card-deck">
    {cards}
    </div>
  )
}

export default Result;