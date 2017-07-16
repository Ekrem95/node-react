import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loggedIn } from '../helpers';

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentWillMount(nextState, transition) {
    loggedIn();
    //console.log(this.props.location.pathname.slice(3));
    axios.get('/api/' + this.props.location.pathname.split('/').pop())
      .then(res => {
        this.setState({
          data: res,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    const data = this.state.data.data;
    return (
      <div>
        <h1>Edit</h1>
        {data &&

            <form method="post" action="/p" className="addPost">
              <input defaultValue={data.title} type="text" name="title" placeholder="Title"/>
              <input defaultValue={data.desc} type="text" name="desc" placeholder="Description"/>
              <input defaultValue={data.src} type="text" name="src" placeholder="Image Source"/>
              <button type="submit">Edit</button>
            </form>

    }

      </div>
    );
  }
}
