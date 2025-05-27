const passwordField = document.getElementById('id_password');
if (passwordField) {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper';
    passwordField.parentNode.insertBefore(wrapper, passwordField);
    wrapper.appendChild(passwordField);
    const eyeIcon = document.createElement('span');
    eyeIcon.className = 'eye-icon eye-closed';
    wrapper.appendChild(eyeIcon);
    
    eyeIcon.addEventListener('click', function() {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.className = 'eye-icon eye-open';
        } else {
            passwordField.type = 'password';
            eyeIcon.className = 'eye-icon eye-closed';
        }
    });
}