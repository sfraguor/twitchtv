

var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getChannelInfo() {
  //Las urls
  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.hyperdev.space/twitch-api/' + type + '/' + name + '?callback=?';
    };

    
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Not found";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };

      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";

          html = '<div class="row ' + status + '" id="canal"><div class="col-xs-2 col-md-2" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-xs-5 col-md-3" id="name"><a href="' + 
          data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-5 col-md-7" id="streaming">'+ 
          game + '<span class="hidden-xs">' + description + '</span></div></div>';

        //Pongo a los que están online los primeros de la lista y a los offline los últimos
        status === "online" ? $("#display").prepend(html) : $("#display").append(html);
      });
    });
});
};

$(document).ready(function() {
  getChannelInfo();
  

  //Cuando pulso los botones del menú
  $(".selector").click(function() {

    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');

    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }


  });

  });

  
