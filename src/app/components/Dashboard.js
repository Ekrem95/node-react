import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      user: {},
      fetched: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(nextState, transition) {
    axios.get('api/isloggedin')
      .then(res => {
        if (res.data == 'no') {
          window.location.replace('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount(nextState, transition) {
    axios.get('api/posts')
      .then(res => {
        this.setState({
          data: res,
          fetched: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('api/usr')
      .then(res => {
        this.setState({
          user: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange (e) {
    const val = e.target.value.toLowerCase();
    if (this.state.data) {
      let data = this.state.data.data;
      if (data) {
        data.data = this.state.fetched.filter(post => {
          //return JSON.stringify(post).toLowerCase().indexOf(val) !== -1;
          return JSON.stringify(post).toLowerCase().includes(val);
        });
        this.setState({
          data: data,
        });
      }
    }
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>

        {this.state.user &&
          <div>
          <p>{this.state.user.email}</p>
          <Link
            to="/changepassword"
            style={{ color: '#fff', textDecoration: 'none' }}
            >Change password</Link>
          <br/>
            <textarea onChange={this.onChange}></textarea>
          </div>
        }

        { this.state.data.data &&
          this.state.data.data.map(post => {
            return (
              <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <img src={post.src}/>
                <Link to={'/p/d/' + post._id}>
                  <button className="firstButton">Details</button>
                </Link>
                <Link to={'/p/' + post._id}>
                  <button className="secondButton">Edit</button>
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
