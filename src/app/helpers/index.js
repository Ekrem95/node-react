import axios from 'axios';

export function loggedIn() {
  axios.get('/api/isloggedin')
    .then(res => {
      if (res.data == 'no') {
        window.location.replace('/login');
      }
    })
    .catch(err => {
      console.log(err);
    });
}
