$(document).ready(function(){
  $('#unfr').on("click", function(){
    $.ajax({
      url: '/unfriend/' + $(this).data('id'),
      type: 'delete',
      success: function(result){
        window.location.href='/users';
      }
    });
  });

  $('.mess').on("click", function(){
    var id = $(this).data('id');
    $.ajax({
      url: '/message/' + id,
      type: 'get',
      success: function(result){
        window.location.href='/messages/' + id;
      }
    });
  });

  $('#sync-messages').on("click", function(){
    $.ajax({
      url: '/messages',
      type: 'PUT',
      contentType: 'application/json',
      success: function(response){
        var tbody = $('tbody');
        tbody.html('');
        response.messages.forEach(function(mess){
          if(mess.time_read == null){
            tbody.append('\
              <tr class="mess alert alert-warning" data-id = \"' +  mess.id +  'role=\"alert\">\
                <td><a>' + mess.name +'</a></td>\
                <td><a>' + mess.title+ '</a></td>\
                <td><a>'+ mess.time_send +'</a></td>\
                <td><a>'+ mess.time_ago +'</a></td>\
              </tr>\
              ')
          }
          else{
            tbody.append('\
              <tr class="mess" data-id = \"' + mess.id +'">\
                <td><a>' + mess.name +'</a></td>\
                <td><a>' + mess.title+ '</a></td>\
                <td><a>'+ mess.time_send +'</a></td>\
                <td><a>'+ mess.time_ago +'</a></td>\
              </tr>\
            ')
          }
        })
      }
    });
  });

});
