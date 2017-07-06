import React, { Component } from 'react';
import axios from 'axios';

export default class Details extends Component {
  constructor () {
    super();
    this.state = {
      data: {},
    };
  }

  componentWillMount () {
    axios.get('/api/' + this.props.location.pathname.split('/').pop())
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    const data = this.state.data;
    console.log(data);
    return (
      <div style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <h1>{data.title}</h1>
        <img
          style={{
            width: 500,
            height: 500,
          }}
          src={data.src}/>
        <p
          style={{
            width: 500,
          }}
          >{data.desc}</p>
          <form method="post" action="/p/d">
          <textarea
            name="box"
            style={{
              width: 360,
              height: 60,
            }}
            placeholder="Type here to post a comment"
            ></textarea>
            <button className="cBtn">Send</button>
            </form>
            { data.comments &&
              data.comments.map(comment => {
                return (
                  <p>{comment}</p>
                );
              })
            }
      </div>
    );
  }
}
