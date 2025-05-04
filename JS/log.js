import { BASE_URL } from './api-config.js'

new Vue({
  el: '#app',
  data: {
    username: '',
    password: '',
    loginError: ''
  },
  methods: {
    submitForm: async function() {
      try {
        // Make a POST request to the server for user authentication
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();

        if (response.status === 200) {
          // Login successful
          await fetch(`${BASE_URL}/saveLoggedInUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username
            })
          })
          this.loginError = '';
          alert('Login successful!');
          window.location.href = 'index.html';
        } else {
          // Login failed
          this.loginError = data.error;
        }
      } catch (error) {
        console.error(error);
        this.loginError = 'Failed to log in. Please try again later.';
      }
    }
  }
});
