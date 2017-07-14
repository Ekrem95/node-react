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
      skip: 0,
      length: 5,
    };
    this.onChange = this.onChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.scroll = this.scroll.bind(this);
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
    axios.get('api/posts/0')
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

    axios.get('api/count/posts')
      .then(res => {
        this.setState({
          length: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange(e) {
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

  loadMore() {
    this.setState({
      skip: this.state.skip + 5,
    });
    const skip = (this.state.skip).toString();
    axios.get('api/posts/' + skip)
      .then(res => {
        const data = this.state.data;
        res.data.forEach(post => {
          data.data.push(post);
        });
        this.setState({
          data: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  scroll(node) {
    const self = this;
    window.onscroll = function (e) {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        self.loadMore();
      }
    };
  };

  render() {
    return (
      <div className="dashboard" ref={this.scroll}>
        {this.state.user &&
          <div className="dashboardFirst">
          <p className="passwordLink">
            <Link
              to="/changepassword"
              >{this.state.user.email}</Link></p>
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
        {
          this.state.skip + 5 < this.state.length &&
          <button onClick={this.loadMore}>Load More</button>
        }
      </div>
    );
  }
}
