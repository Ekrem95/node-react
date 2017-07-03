import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      user: {},
    }
  }
  componentWillMount( nextState, transition ) {
    axios.get('api/isloggedin')
      .then(res => {
        if(res.data == 'no') {
           window.location.replace("/login");
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount( nextState, transition ) {
    axios.get('api/posts')
      .then(res => {
        this.setState({
          data: res
        })
        //console.log(this.state.data);
      })
      .catch(err => {
        console.log(err);
      })

      axios.get('p/usr')
        .then(res => {
          this.setState({
            user: res.data
          })
          //console.log(this.state.data);
        })
        .catch(err => {
          console.log(err);
        })
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
            style={{color: '#fff', textDecoration: 'none'}}
            >Change password</Link>
          </div>
        }

        { this.state.data.data &&
          this.state.data.data.map(post => {
            return (
              <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <img src={post.src}/>
                <Link to={"/p/"+post._id}><button>Edit</button></Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}
