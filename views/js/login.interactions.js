//Estas son las interacciones con el login (animaciones que le dan vista al login)
$(document).ready(function() {
    $('#imagesChoicLoginContainer').hide();
    $('#imagesChoicLoginContainer2').hide();
    $('#form-register-tecler').hide();
    $('#form-register-evaluator').hide();
    $('#form-register-company').hide();
    $('#form-login-user').hide();

    $("#registerbuttonplease").click(function(){
        $('#buttonsChoiceLoginContainer').hide();
        $('#imagesChoicLoginContainer').fadeIn();
        $('#teclerloginimage').click(function(){
            $('#imagesChoicLoginContainer').hide();
            $('#form-register-tecler').fadeIn();
        });
        $('#evaluatorloginimage').click(function(){
            $('#imagesChoicLoginContainer').hide();
            $('#form-register-evaluator').fadeIn();
        });
        $('#companyloginimage').click(function(){
            $('#imagesChoicLoginContainer').hide();
            $('#form-register-company').fadeIn();
        });
    });

    $('#loginbuttonplease').click(function(){
        $('#buttonsChoiceLoginContainer').hide();
        $('#imagesChoicLoginContainer2').fadeIn();
        $('#form-register-tecler').hide();
        $('#form-register-evaluator').hide();
        $('#form-register-company').hide();
        $('#form-login-user').hide();
        $('#teclerloginimage2').click(function(){
            $('#imagesChoicLoginContainer2').hide();
            $('#form-login-user').fadeIn();
            $('#buttonAcceptLoginTecler').fadeIn();
            $('#buttonAcceptLoginEvaluator').hide();
            $('#buttonAcceptLoginCompany').hide();
        });
        $('#evaluatorloginimage2').click(function(){
            $('#imagesChoicLoginContainer2').hide();
            $('#form-login-user').fadeIn();
            $('#buttonAcceptLoginTecler').hide();
            $('#buttonAcceptLoginEvaluator').fadeIn();
            $('#buttonAcceptLoginCompany').hide();
        });
        $('#companyloginimage2').click(function(){
            $('#imagesChoicLoginContainer2').hide();
            $('#form-login-user').fadeIn();
            $('#buttonAcceptLoginTecler').hide();
            $('#buttonAcceptLoginEvaluator').hide();
            $('#buttonAcceptLoginCompany').fadeIn();
        });

    })

    $('.button-cancel').click(function(){
        $('#buttonsChoiceLoginContainer').fadeIn();
        $('#imagesChoicLoginContainer').hide();
        $('#form-register-tecler').hide();
        $('#form-register-evaluator').hide();
        $('#form-register-company').hide();
        $('#form-login-user').hide();
    });
})