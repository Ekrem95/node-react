import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    axios.get('/api/posts')
      .then(res => {
        this.setState({
          data: res.data,
        });
        //console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    //console.log(this.state.data);
    return (
      <div>
        <div
          className="indexContainer"
          >
          { this.state.data.length > 0 &&
            this.state.data.map(act => {
              return (
                <img
                  key={act._id}
                  className="indexImg"
                  src={act.src}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
