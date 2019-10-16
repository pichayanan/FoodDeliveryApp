var firebaseConfig = {
  apiKey: "AIzaSyBGWQ0ZvH0R6NFUAS_CqmgIyV_hSPBzUJk",
  authDomain: "fooddeliveryapp-51a8d.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-51a8d.firebaseio.com",
  projectId: "fooddeliveryapp-51a8d",
  storageBucket: "fooddeliveryapp-51a8d.appspot.com",
  messagingSenderId: "192100795693",
  appId: "1:192100795693:web:7baae6ed79369e7260bfa4",
  measurementId: "G-6ZJXM0ELTY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.addEventListener('init', function (event) {
  var page = event.target;


  if (page.id === 'login') {
    console.log("login")
      
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var email = user.username;
        console.log(email + "signed in");
      } else {
        console.log("sign out")
      }
  
  
    });
    $("#signinbtn").click(function () {
      var username = $("#username").val();
      var password = $("#password").val();


      firebase.auth().signInWithEmailAndPassword(username, password)
        .then(function (result) {
          console.log(result);
          ons.notification.alert("LOGIN Complete!!!");
          content.load("page.html")
            .then(menu.close.bind(menu));

        }).catch(function (error) {
          console.log(error.message);
          ons.notification.alert(error.message);
        });

    });

    $("#gmailbtn").click(function () {
      // var provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // firebase.auth().languageCode = 'pt';
      

      // firebase.auth().signInWithPopup(provider).then(function (result) {
      //   content.load('page.html').then(menu.close.bind(menu));

      // }).catch(function (error) {
      //   console.log(error);
      // });
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        $("#content")[0].load("page.html");
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
    })

  }
});

$("#carousel").empty();
db.collection("recommended").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
          <div class="thumbnail" style="background-image: url('${doc.data().url}')">
          </div>
          <div class="recomended_item_title" id="item1_${doc.data().id}">${doc.data().Name}</div>
      </ons-carousel-item>`
    $("#carousel").append(item);
  });
});

$("#card").empty();
db.collection("category").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item1 = `<ons-card modifier="nodivider"id="item${doc.data().id}" class="category_item">
          <div class="imgcategory" style="background-image: url('${doc.data().img}')">
          </div>
          <div class="category_item_title" id="item1_${doc.data().id}">${doc.data().Name}</div>
      </ons-card>`
    $("#card").append(item1);
  });
});

$("#list").empty();
db.collection("list").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item2 = `<ons-card modifier="chevron" id="item${doc.data().id}" class="list_item">
          <div class="imglist" style="background-image: url('${doc.data().url}')">
          </div>
          <div class="imgrate" style="background-image: url('${doc.data().rate}')">
          </div>
          <div class="list_item_title" id="item1_${doc.data().id}">${doc.data().Name}</div>
          <div class="list_title" id="item1_${doc.data().id}">${doc.data().title}</div>
      </ons-card>`
    $("#list").append(item2);
  });
});

$("#menu").empty();
db.collection("menu").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item3 = `<ons-card modifier="chevron" id="item${doc.data().id}" class="menu_item">
          <div class="imgmenu" style="background-image: url('${doc.data().url}')">
          </div>
          <div class="imgprice" id="item1_${doc.data().id}">${doc.data().price}</div>
          <div class="menu_item_title" id="item2_${doc.data().id}">${doc.data().Name}</div>
          <div class="menu_title" id="item3_${doc.data().id}">${doc.data().title}</div>
      </ons-card>`
    $("#menu").append(item3);
  });
});

$("#LOGO").empty();
db.collection("LOGO").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var item4 = `<ons-card modifier="chevron" id="item${doc.data().id}" class="logo_item">
          <div class="imglogo" style="background-image: url('${doc.data().URL}')">
          </div>
          
      </ons-card>`
    $("#LOGO").append(item4);
  });
});



