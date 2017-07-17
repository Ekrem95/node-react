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
      <div
        className="details"
        style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <h1>{data.title}</h1>
        <img
          src={data.src}/>
        <p>{data.desc}</p>
          <form>
          <textarea
            id="textarea"
            name="box"
            style={{
              height: 60,
              display: 'block',
              marginLeft: 0,
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
