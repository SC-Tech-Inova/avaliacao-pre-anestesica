// JavaScript for login.html

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberPassword = document.getElementById('remember-password').checked;
            
            // Here you would typically send a request to your authentication API
            // For this example, we'll use a simple validation
            if (username && password) {
                // Mock authentication (in a real app, this would be a server request)
                // Simulating successful login for demonstration
                console.log('Login attempt:', { username, rememberPassword });
                
                // Store authentication token/status (would come from the server in a real app)
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', username);
                
                // Redirect to patients list or dashboard
                window.location.href = 'patients-list.html';
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});
