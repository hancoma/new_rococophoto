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

var deviceid;
var link;

function goHref(url) {
  var url=url;
  var uuid=device.uuid;
  url="http://m.rococophoto.net"+url+"&uuid="+uuid;
  var ref = window.open(url, '_blank', 'location=no');
  ref.addEventListener('loadstart', function(event) { 
    

        // 링크 주소 확인
        link=event.url;
        var result=link.indexOf('upload_file');
    
        // 파일 업로드 
        if(result>-1) {
            getImage_photo();
        }
  
  });
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
     gopage("index.html?ok=ok");
}

function alert_msg(title,msg,btn) {
    // alert 대신 사용할 함수 
    var title=title;
    var msg=msg;
    var btn=btn;

      navigator.notification.alert(
                  msg,  // message
                  alertend,         // callback
                  title,            // title
                  btn                  // buttonName
              );


}
function alertend() {

}


function getImage_photo() {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(uploadPhoto_photo, function(message) {
alert('get picture failed');
},{
quality: 50,
destinationType: navigator.camera.DestinationType.FILE_URI,
sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
});}
    function uploadPhoto_photo(imageURI) {
      var deviceid=device.uuid;
        navigator.notification.activityStart("RococoPhoto", "uploading photo");
        var options = new FileUploadOptions();
        options.fileKey="profile_image";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        params.link=link;
        params.uuid=deviceid;

        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, "http://m.rococophoto.net/upload_org.php", win_photo, fail, options);
    }

    function win_photo(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        navigator.notification.activityStop();
        alert(r.response);
    }
getLocation();
function getLocation()
  {

    if (navigator.geolocation)
    {

    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{
    alert("현 위치의 정보를 찾을수 없습니다.");
  }
  }
function showPosition(position)
  {

  var x=position.coords.latitude;
  var y=position.coords.longitude;
  var uuid=device.uuid;
  alert("지역정보갱신중");
  // alert(uuid+"-"+x); 지녁 정보 ajax로 보내기 
   $.post("http://m.rococophoto.net/gps_update_app.php",
   {
    y:y,
    x:x,
    uuid:uuid

      }, function(data){
      var data=data;
      alert(data);
      
   });
   
  }

  

