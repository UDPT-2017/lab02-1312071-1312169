$(document).ready(function(){
  $('#unfr').click(function(){
    $.ajax({
      url: '/unfriend/' + $(this).data('id'),
      type: 'delete',
      success: function(result){
        window.location.href='/users';
      }
    });

  });
});
