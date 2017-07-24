var channels = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getChannelInfo() {
    //Las urls
    channels.forEach(function(channel) {
        function makeURL(type, name) {
            return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=c02wib8f1jl6zcybiwqecufl4coabk';
        };

        

        var xhr = new XMLHttpRequest();
        xhr.open('GET', makeURL("streams", channel));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(this.response);
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

                    xhr = new XMLHttpRequest();
                    xhr.open('GET', makeURL("channels", channel));
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                var data = JSON.parse(this.response);
                                var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
                                    
                                    name = data.display_name != null ? data.display_name : channel,
                                    
                                    description = status === "online" ? ': ' + data.status : "",
                                    
                                    html = document.createElement("div");
                                
                                    html.innerHTML = '<div class="row ' + status + '" id="canal"><div class="col-xs-2 col-md-2" id="icon"><img src="' +
                                    logo + '" class="logo"></div><div class="col-xs-5 col-md-3" id="name"><a href="' +
                                    data.url + '" target="_blank">' + name + '</a></div><div class="col-xs-5 col-md-7" id="streaming">' +
                                    game + '<span class="hidden-xs">' + description + '</span></div></div>';

                                //Pongo a los que están online los primeros de la lista y a los offline los últimos
                                var display_content = document.getElementById("display")
                                status === "online" ? display_content.prepend(html) : display_content.append(html);
                            } else {
                                alert("Se ha producido un error:" + xhr.StatusText);
                            }
                        }
                    };
                    xhr.send();

                } else {
                    alert("Se ha producido un error:" + xhr.StatusText);
                }
            }
        };
        xhr.send();

    });
};

// Hago dos ajax request, pero una dentro de la otra

window.addEventListener("load", function() {
    getChannelInfo();

//Segunda parte: define el comportamiento del menu supperior y los canales que se muestran

var selector = document.querySelectorAll('.selector'); //Devuelve una nodeList

   selector.forEach( function (element) { 

        element.addEventListener('click', function() { //cuando hago click en alguna de las pestañas
            //selector.forEach( function (element) {
            //   element.classList.remove('active');
            //})
            //this.classList.add('active'); //clase active por ahora parece que no tiene utilidad `por eso la eliminamos, y el código sigue funcionando correctamente

              var status = this.getAttribute('id');
              var allChannels = document.querySelectorAll('#canal'); //Seleciono todos los canales
              var onCnannel = document.querySelectorAll('.online');
              var offChannel = document.querySelectorAll('.offline');

              if (status === "all") { //cuando hago click en la pestala ALL, aparecen todos los canales
                allChannels.forEach( function (element) {
                  element.classList.remove("hidden");
                })
              } else if (status === 'online') { //cuando hago click en la pestala ONLINE, aparecen sólo los canales online
                onCnannel.forEach( function (element) {
                  element.classList.remove("hidden");
                })
                offChannel.forEach( function (element) {
                  element.classList.add("hidden");
                })
              } else if (status === 'offline') { //cuando hago click en la pestala OFFLINE, aparecen sólo los canales offline
                onCnannel.forEach( function (element) {
                    element.classList.add("hidden");
                })
                offChannel.forEach( function (element) {
                    element.classList.remove("hidden"); 
                })
              } 
        });
    });
});




  
