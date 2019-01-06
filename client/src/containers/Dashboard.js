import React, { Component } from 'react';
import axios from 'axios';
import Result from '../components/Result';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
      value: '',
      businessess: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit = (e) => {
    axios.post('/result', {location: this.state.value})
      .then(response => {
        this.setState({
          businessess: response.data.businesses,
          value: ''
        })
      });

    // Create if no result was found, provide no result was found

    e.preventDefault();
    
  }



  render(){
    return(
      <div>
        <form 
          className="text-center my-5 mx-auto" onSubmit={this.handleSubmit}
          action="/search"
          method="post"
        >
        <h1 className="mb-2">Search Business</h1>
            <input
              className="text-center" 
              id="search-bar"
              aria-label="Search" 
              placeholder="example: Sacramento" 
              type="search" 
              value={this.state.value} 
              onChange={this.handleChange} 
              />
        </form>

        {/* // Card results */}
        <Result result={this.state.businessess}/>
      </div>
    );
  }
}

export default Dashboard;