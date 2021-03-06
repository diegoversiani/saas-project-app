function GetURLParameter(sParam) {
  var sPageUrl = window.location.search.substring(1);
  var sURLVariables = sPageUrl.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0]==sParam) {
      return sParameterName[1];
    }
  }
};

$(document).ready(function(){
  var show_error, stripeResponseHandler, submitHandler, handlePlanChange;

  submitHandler = function(event) {
    var $form = $(event.target);
    $form.find("input[type=submit]").prop("disabled", true);

    // if stripe was initialized correctly this will create a token using the credit card info
    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    }
    else {
      show_error("Failed to load credit card processing functionality. Please reload this page in your browser.");
    }

    return false;
  };

  stripeResponseHandler = function(status, response){
    var token, $form;
    $form = $('.cc_form');

    if (response.error) {
      console.log(response.error.message);
      show_error(response.error.message);
      $form.find('input[type=submit]').prop("disabled", false);
    }
    else
    {
      token = response.id;
      $form.append($('<input type="hidden" name="payment[token]">').val(token));
      $('[data-stripe=number]').remove();
      $('[data-stripe=cvv]').remove();
      $('[data-stripe=exp-year]').remove();
      $('[data-stripe=exp-month]').remove();
      $('[data-stripe=label]').remove();
      $form.get(0).submit();
    }

    return false;
  };

  show_error = function(message) {
    if ($('#flash-messages').size < 1) {
      $('div.container.main div:first').prepend('<div id="flash-messages"></div>');
    }

    $('#flash-messages').html('div class="alert alert-warning"><a class="close" data-dismiss="alert">x</a><div id="flash_alert">' + message + '</div>');
    $('.alert').delay(5000).fadeOut(3000);

    return false;
  };

  handlePlanChange = function(plan_type, form) {
    var $form = $(form);

    if (plan_type == undefined) {
      plan_type = $('#tenant_plan :selected').val();
    }

    if (plan_type === 'premium') {
      $('[data-stripe]').prop('required', true);
      $('[data-stripe]').show();
      $form.off('submit');
      $form.on('submit', submitHandler);
    }
    else {
      $('[data-stripe]').hide();
      $form.off('submit');
      $('[data-stripe]').removeProp('required');
    }
  };

  handlePlanChange(GetURLParameter('plan'), ".cc_form");
  $(".cc_form").on('submit', submitHandler);

  $("#tenant_plan").on('change', function(event){
    handlePlanChange($('#tenant_plan :selected').val(), '.cc_form');
  });
});
