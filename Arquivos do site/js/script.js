// Verifica se exitem inputs vazios 
function caixasVazias(){
    //..
    let caixas = ['#id-email', '#id-senha', '#id-conf-email', 
    '#id-conf-senha', '#id-nome', '#id-cpf', '#id-tel-celular',
    '#id-tel-fixo', '#id-cep', '#id-endereco', '#id-endereco-num',
    '#id-complemento', '#id-referencia', '#id-bairro', '#id-cidade']
    
    for (let i = 0; i <= caixas.length; i++){
        if ($(caixas[i]).val() == ""){
            return false;
        }
    }
    return true;
}


// Retira label do erro da função 'valorInvalido'
function valorValido(texto){
    for (i in obj){
        if (i == texto){
            let id_elem = obj[i];
            $('#' + id_elem).remove();
            delete obj[i];
            console.log(obj);

        }
    }
}

var remo = 0;
var obj = {};

// Cria label de erro para cada entrada, caso já aja um label de erro será ignorado
function valorInvalido(elemento, texto){
    for (i in obj){
        if (i == texto){
            return;
        }
    }
    let texto_2, texto_erro, id_func;
   
    $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel'><i> <i></label>")
   
    remo ++;
    
    id_func = "removivel" + String(remo);
    obj[texto] =  [id_func];

    texto_2 = texto.substr(0,1);
    texto = texto_2.toUpperCase() + texto.substr(1, texto.length);
    texto_erro = " " + texto + " inválido";

    $('#removivel').attr('id', id_func);
    $('#'+ id_func).text(texto_erro);
    
    console.log(obj);
}

// Verifica o CPF e valida o CPF, incluindo os últimos digitos
function validarCPF(cpf, elemento, texto){
    if(cpf != ""){
        if (cpf.length == 11) {    
            if (verificarNumeroCaixa(cpf, elemento, texto)){
                let cpfIncomp = cpf.substr(0, 9).trim(); 
                let indexInverso = 0;
                let decDigito = 0, decPrimDigito = 0; 
        
                for (let i = 10; i >= 2; i--){
                    decDigito += Number(cpfIncomp[indexInverso]) * i;
                    indexInverso++;
                }
        
                decDigito = 11 - (decDigito % 11);
        
                cpfIncomp += String(decDigito);
        
                indexInverso = 1;
        
                for (let i = 10; i >= 2; i--){
                    decPrimDigito += Number(cpfIncomp[indexInverso]) * i;
                    indexInverso++;
                }
        
                decPrimDigito = 11 - (decPrimDigito % 11);
        
                if(decPrimDigito != cpf[10] || decDigito != cpf[9]){
                    valorInvalido(elemento, texto);
                } else {
                    valorValido(texto);  
                    cpfIncomp += String(decPrimDigito);
                }
     
            } else {
                valorInvalido(elemento, texto);
            }
            
        }  else {
            valorInvalido(elemento, texto);
        }

    } else {
        obj['vazio'] = elemento;
    }

}

// Verifica se a string possui algum número
function verificarStringCaixa(valor, elemento, texto){
    if (valor != ""){
        for (let i = 0; i <= valor.length; i++){
            if (!isNaN(valor[i]) && valor[i] != " "){
                valorInvalido(elemento, texto);
                return false;   
            } 
    }   
        valorValido(texto);
        return true;
    } else {
        obj['vazio'] = elemento;
    } 
}

// Verifica se a caixa possui alguma string (letra)
function verificarNumeroCaixa(valor, elemento, texto){
    if (valor != ""){
        for (let i = 0; i < valor.length; i++){
            if (isNaN(valor[i]) &&  valor[i] != " "){
                valorInvalido(elemento, texto);
                console.log("erro", valor[i])
                return false;
            }
    }
        valorValido(texto);
        return true;
    } else {
        obj['vazio'] = elemento;
        return false;
    }
    
}

// Verifica a quantidade de caracters da senha
function qtdCaracteresSenha(senha, elemento){
    if (senha != ""){
        if (senha.length < 6){
            $('#removivel_senha').remove();
            $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_senha'><i> Senha muito fraca<i></label>")
            if ($('#id-conf-senha').val() != ""){
                validarSenha($('#id-conf-senha').val(), $('#id-conf-senha').attr('id'))
            }
        } else if (senha.length < 8){
            $('#removivel_senha').remove();
            $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_senha'><i> Senha fraca <i></label>")
            if ($('#id-conf-senha').val() != ""){
                validarSenha($('#id-conf-senha').val(), $('#id-conf-senha').attr('id'))
            }
        } else if ($('#id-conf-senha').val() != ""){
            $('#removivel_senha').remove();
            validarSenha($('#id-conf-senha').val(), $('#id-conf-senha').attr('id'))
        }else{
            $('#removivel_senha').remove();
        }
    } else {
        obj['vazio'] = elemento;
    }
   
}
// Verifica se as senhas são iguais e confirma
function validarSenha(senha, elemento){
    if ($('#id-senha').val() == senha){
        $('#removivel_conf-senha').remove();
    } else if ($('#id-senha').val() == ""){
        $('#removivel_conf-senha').remove();
        $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_conf-senha'><i> Digite a senha primeiro <i></label>")
    }else {
        $('#removivel_conf-senha').remove();
        $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_conf-senha'><i> Senhas não coincidem <i></label>")
    }
}

function validarEmail(email, elemento){
    if ($('#id-email').val() == email){
        $('#removivel_conf-email').remove();
    } else if ($('#id-email').val() == ""){
        $('#removivel_conf-email').remove();
        $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_conf-email'><i> Digite o e-mail primeiro <i></label>")
    }else {
        $('#removivel_conf-email').remove();
        $("#" + elemento).after("<label style='color: red;font-size: 15px;' id='removivel_conf-email'><i> E-mails não coincidem <i></label>")
    }
}

function enviarDados(){
    if (caixasVazias()){
        if (Object.keys(obj).length == 0){
            //...
            let nome = $('#id-nome').val(),
            email = $('#id-email').val(),
            senha = $('#id-senha').val();
            localStorage.setItem("nome", nome);
            localStorage.setItem("email", email);
            localStorage.setItem("senha", senha);
            window.location.replace("login.html");
        } else {   
            alert('Uma ou mais caixas com erro')
        }
       
    } else {
        alert("Há erros pendentes")
    }
    
}

function logar(email, senha){
    if (email == localStorage.getItem("email") && senha == localStorage.getItem("senha")){
       alert("Bem vindo", localStorage.getItem("nome"));
       window.location.replace(window.location.href);   
    } else {
        alert("Senha ou email inválidos")
        window.location.replace(window.location.href);   

    }
}

