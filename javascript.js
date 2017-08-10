

var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "llilka", "habathcx", "amouranth", "noobs2ninjas", "lizbethbobomb", "bifuteki"];

function getChannelInfo() {
  //Las urls


  channels.forEach(function(channel) {
    function makeURL(type, name) {
      //return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
      return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=io29h4le6jv32mnmrc3lhsezgzjwbx';
    };

    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', makeURL("streams", channel));
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.onload = 
      
    function() {
      var parsedJSON_2 = JSON.parse(xhr2.responseText);
      var game,
          status;
      if (parsedJSON_2.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (parsedJSON_2.stream === undefined) {
        game = "Not found";
        status = "offline";
      } else {
        game = parsedJSON_2.stream.game;
        status = "online";
      }; 

      var xhr = new XMLHttpRequest();
      xhr.open('GET', makeURL("channels", channel));
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload =
      function() {
        var parsedJSON = JSON.parse(xhr.responseText);
        var logo = parsedJSON.logo != null ? parsedJSON.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = parsedJSON.display_name != null ? parsedJSON.display_name : channel,
          description = status === "online" ? ': ' + parsedJSON.status : "";

          html = '<div class="row ' + status + '" id="canal"><div class="col-xs-2 col-md-2" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-xs-5 col-md-3" id="name"><a href="' + 
          parsedJSON.url + '" target="_blank">' + name + '</a></div><div class="col-xs-5 col-md-7" id="streaming">' + 
          game + '<span class="hidden-xs">' + description + '</span></div></div>';

        //Pongo a los que están online los primeros de la lista y a los offline los últimos
        var filter = document.querySelector('#display');
        var elChild = document.createElement('div');
        elChild.innerHTML = html;       

        status === "online" ? filter.prepend(elChild) : filter.append(elChild);
      }
      //insertBefore(html)
      xhr.send(JSON.stringify());
   }
    xhr2.send(JSON.stringify());
});
};


  document.addEventListener("DOMContentLoaded", function(){

    getChannelInfo();
  

  //Cuando pulso los botones del menú
  let selector = document.querySelectorAll('.selector');

  selector.forEach(function(element){
   element.addEventListener('click', function(){
      
      element.classList.remove('active');
      element.classList.add('active');
      let status = element.getAttribute('id');

      if (status === "all"){
        
        let allchannels = document.querySelectorAll('.online, .offline');
        allchannels.forEach(function(allchan){
          allchan.classList.remove('hidden')
        });
      } else if (status === "online") {
        
        document.querySelectorAll('.online').forEach(function(onchan){
          onchan.classList.remove('hidden');
        });
        document.querySelectorAll('.offline').forEach(function(onchan){
          onchan.classList.add('hidden');
        });
      } else {
        //alert("Por descarte estamos accediendo a los offline");
        document.querySelectorAll('.online').forEach(function(offchan){
          offchan.classList.add('hidden');
        });
        document.querySelectorAll('.offline').forEach(function(offchan){
          offchan.classList.remove('hidden');
        });
      }
   }); 
  });

  });
  

  
