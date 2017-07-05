import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    axios.get('api/posts')
      .then(res => {
        this.setState({
          data: res.data,
        });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    console.log(this.state.data);
    return (
      <div>
        <div style={{
          flex: 1, flexDirection: 'row', margin: 10,

        }}>
          { this.state.data.length > 0 &&
            this.state.data.map(act => {
              return (
                <img
                  key={act._id}
                  style={{
                    width: 200, height: 200, margin: 10,
                  }}
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
