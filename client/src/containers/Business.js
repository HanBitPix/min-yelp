import React, { Component } from 'react';
import axios from 'axios';
import Detail from '../components/Detail';

class Business extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      data: {}
    };

  }
  

  componentDidMount(){
    axios.post('/detail', {id: this.props.match.params.productid})
      .then(response => {
        this.setState({
          data: response.data
        })
      });
  }



  render(){
    console.log(this.state.data);

    const detail = this.state.data;
    return(
      <div>
        <div className="card mt-5 card-detail text-center">
          <img 
            src={detail.image_url} 
            className="card-img-top img-fluid detail-img img-thumbnail" 
            alt="..." />
          <div className="card-body">
            <h4 className="card-title">{detail.name}</h4>
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th scope="row">Contact:</th>
                  <td>{detail.display_phone}</td>
                </tr>
                <tr>
                  <th scope="row">Price:</th>
                  <td>{detail.price}</td>
                </tr>
                <tr>
                  <th scope="row">Review Count:</th>
                  <td>{detail.review_count}</td>
                </tr>
                <tr>
                  <th scope="row">Rating:</th>
                  <td>{detail.rating}</td>
                </tr>
      
               
              </tbody>
            </table>
          </div>  
          <a href={detail.url} className="btn btn-lg btn-primary">Go to Yelp Page</a>
        </div>
      </div>
    )
  }
}

export default Business;
