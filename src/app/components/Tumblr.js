import React, { Component } from 'react';
import axios from 'axios';

export default class Tumblr extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }
  componentWillMount( nextState, transition ) {
    axios.get('api/tumblr')
      .then(res => {
        this.setState({
          data:res
        })
        //console.log(this.state.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }


  render () {
    return (
      <div>
        <h1>Tumblr</h1>
        <div style={{'textAlign': 'center'}}>
          { this.state.data.data &&
             this.state.data.data.map(post => {
               return <img
                 className="tumblr-img"
                 src={post.photos[0].original_size.url}
                 key={post.id}
               />
             })
           }
        </div>
      </div>
    )
  }
}
