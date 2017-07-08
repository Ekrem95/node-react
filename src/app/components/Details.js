import React, { Component } from 'react';
import axios from 'axios';
import request from 'superagent';

export default class Details extends Component {
  constructor () {
    super();
    this.state = {
      data: {},
    };
    this.sendComment = this.sendComment.bind(this);
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

  sendComment (e) {
    e.preventDefault();

    const comment = document.getElementById('textarea').value;
    document.getElementById('textarea').value = '';

    const data = this.state.data;
    data.comments.push(comment);

    this.setState({
      data: data,
    });

    request
      .post('/p/d')
      .type('form')
      .send({ box: comment }) // sends a JSON post body
      .set('Accept', 'application/json')
      .end(function (err, res) {
      // Calling the end function will send the request
    });
  }

  render () {
    const data = this.state.data;
    //console.log(data);
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
            objectFit: 'cover',
          }}
          src={data.src}/>
        <p
          style={{
            width: 500,
          }}
          >{data.desc}</p>
          <form>
          <textarea
            id="textarea"
            name="box"
            style={{
              width: 360,
              height: 60,
            }}
            placeholder="Type here to post a comment"
            ></textarea>
            <button
              onClick={this.sendComment}
              className="cBtn">Send</button>
            </form>
            { data.comments &&
              data.comments.map((comment, i) => {
                return (
                  <p key={i}>{comment}</p>
                );
              })
            }
      </div>
    );
  }
}
