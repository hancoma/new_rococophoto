function left_menu() {
 
     $( document ).ready(function() {
                    $.post("http://m.rococophoto.net/left_menu.php",
               {
                   
                 
               },
               function(data){
                var data=data;
                 if (data) {
                        $("#menu").html(data);
                    }

                    
                      
                    
                });
     });
}

function goHref(url) {
  var url=url;
  var uuid=device.uuid;
  url="http://m.rococophoto.net"+url+"&uuid="+uuid;
  var ref = window.open(url, '_blank', 'location=no');
}

function getpage(uuid,page) {
    // 외부 페이지 가져 오기 
        // uuid는 기기 번호 
    var uuid=uuid;
    var page=page;
    var url="http://m.rococophoto.net/"+page+".php";
 $.post(url,
   {
       
            uuid:uuid
   },
   function(data){
    var data=data;
     if (data) {
            $("#content").html(data);
        }

        
          
        
    });

}

function gopage (page) {
    var page=page;
    var uuid=device.uuid;  
    location.href=page+"&uuid="+uuid;
}

function check_uuid (deviceid) {
        var deviceid=deviceid;
                
        

                     $.post("http://m.rococophoto.net/check_uuid_app.php",
       {
                deviceid:deviceid
       },
       function(data){
        var data=data;
      
                if (data=='ok') {
                    gopage("around.html?ok=ok");
                } else {
                  alert(data);
                show_login();
        
                }

        });


    
 }

  function logout() {
 
    navigator.notification.confirm(
    'Logout ?', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Membership',           // title
    ['Logout','Cancel']     // buttonLabels
);
 }

function onConfirm(buttonIndex) {
    var uuid=device.uuid;
    var btn=buttonIndex;
    if (btn==1) {

      $.post("http://m.rococophoto.net/logout_app.php",
       {
                deviceid:uuid
       },
       function(data){
        var data=data;
           
              navigator.notification.alert(
                  '로그아웃 되었습니다.',  // message
                  alertDismissed,         // callback
                  'Membership',            // title
                  'Done'                  // buttonName
              );
                
            }

        );
    }
}

 function alertDismissed() {
    // do something
}

