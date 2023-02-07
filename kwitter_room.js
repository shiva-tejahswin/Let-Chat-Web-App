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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });
      localStorage.setItem("room_name" , room_name);
      window.location = "kwitter_page.html";
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room_names :" + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("name" , name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}