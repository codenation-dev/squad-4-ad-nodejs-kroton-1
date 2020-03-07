
const botaoEnviar = document.querySelector("#botaoEnviar")

//Quando clicado o botão
botaoEnviar.addEventListener("click", function(event){
    event.preventDefault()
    
    const form = document.querySelector("#formCadastro")
    
    console.log(form.Email.value)
    console.log(form.Senha.value)

    form.reset();

});
