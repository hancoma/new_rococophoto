function getpage(uuid,page) {
    // 외부 페이지 가져 오기 
        alert(uuid,page);
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
 