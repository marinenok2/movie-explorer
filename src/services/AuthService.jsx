const AuthService = {
  login(username, password) {
    // Simulate a server request for user login
    return new Promise((resolve, reject) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem('isAuthenticated', 'true');
        resolve(storedUser);
      } else {
        reject('Invalid username or password');
      }
    });
  },

  register(username, password, email, phone) {
    // Simulate a server request for user registration
    return new Promise((resolve, reject) => {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.username === username) {
        reject('User with this username already exists');
      } else {
        const newUser = { username, password, email, phone };
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isAuthenticated', 'true');
        resolve(newUser);
      }
    });
  },

  logout() {
    // Remove authentication info from localStorage
    localStorage.removeItem('isAuthenticated');
  },

  isAuthenticated() {
    // Check if the user is authenticated
    return localStorage.getItem('isAuthenticated') === 'true';
  }
};

export default AuthService;

