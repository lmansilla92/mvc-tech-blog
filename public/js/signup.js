const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPw = document.querySelector('#password-confirm').value.trim();
  
    if (username && password === confirmPw) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }

    if (password !== confirmPw) {
      document.querySelector('.invalid-signup').textContent = 'Password must match'
    }
  };

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);