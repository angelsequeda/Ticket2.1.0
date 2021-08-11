$(document).ready(function() {
    $('#imagesChoicLoginContainer').hide();
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
        $('#imagesChoicLoginContainer').hide();
        $('#form-register-tecler').hide();
        $('#form-register-evaluator').hide();
        $('#form-register-company').hide();
        $('#form-login-user').fadeIn();
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