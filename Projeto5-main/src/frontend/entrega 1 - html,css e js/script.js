document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('formCadastro');
    const passwordInput = form.querySelector('input[type="password"]:nth-child(5)');
    const confirmPasswordInput = form.querySelector('input[type="password"]:nth-child(6)');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("As senhas não coincidem. Tente novamente.");
            return;
        }

        
        const emailInput = form.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        
        alert("Cadastro realizado com sucesso!");
        form.reset(); 
        window.location.href = form.action; 
    });

   
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity("As senhas não coincidem.");
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    });
});
