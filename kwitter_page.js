var firebaseConfig = {
    apiKey: "AIzaSyD3w4H3HvgRUYLwatvr8_h5dFB01-5fQtc",
    authDomain: "let-chat-web-app-7221f.firebaseapp.com",
    databaseURL: "https://let-chat-web-app-7221f-default-rtdb.firebaseio.com",
    projectId: "let-chat-web-app-7221f",
    storageBucket: "let-chat-web-app-7221f.appspot.com",
    messagingSenderId: "1052736518344",
    appId: "1:1052736518344:web:a7bd531f31339e526e8dfd",
    measurementId: "G-YBZ12L948T"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.getAnalytics(app);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
  
  function send(){
        msg = document.getElementById("msg").value;
        firebase.database().ref(room_name).push({
              name:user_name,
              message:msg,
              like:0
        });
        document.getElementById("msg").value = "";
  }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);

      username = message_data['name'];
      message = message_data['message'];
      like = message_data['like'];

      username_with_tag = "<h4>" + username + "<img src ='tick.png' class='user_tick'></h4>";
      message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
      button_with_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

      row = username_with_tag + message_with_tag + button_with_tag + span_with_tag;
      document.getElementById("output").innerHTML +=row;
//End code
      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button -" + message_id);
      button_id = message_id;

      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: update_likes
      });
}

  function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}