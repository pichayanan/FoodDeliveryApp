var firebaseConfig = {
  apiKey: "AIzaSyAhnxEnrff2-CGUCk8P4NTkV8lbh2kNCKg",
  authDomain: "fooddeliveryapp-f6bbf.firebaseapp.com",
  databaseURL: "https://fooddeliveryapp-f6bbf.firebaseio.com",
  projectId: "fooddeliveryapp-f6bbf",
  storageBucket: "fooddeliveryapp-f6bbf.appspot.com",
  messagingSenderId: "258700573269",
  appId: "1:258700573269:web:9344b5209f5d334ee4b2dc",
  measurementId: "G-8TXBCM448L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.addEventListener('init', function (event) {
  var page = event.target;
 

  if (page.id === 'Foodcategory') {
    console.log("FoodCategory");

    // $("#menubtn").click(function () {
    //   $("#sidemenu")[0].open();
    // });


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

  }


  if (page.id === 'register') {
    console.log("register");
  
      $("#signup-buttons").click(function () {
  
        var email = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
          content.load('FoodCategory.html');
        })

        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak');
  
          } else {
            alert(errorMessage);
            content.load('login.html');
          }
  
        });
        });



   
          // Handle Errors here.
          
  
      };
  
      
    
   
  

  if (page.id === 'menu') {
    console.log("menu");

    $("#login").click(function () {
      content.load('login.html');
      $("#menu")[0].close();
    });

    $("#logout").click(function () {
      //firebase sign out
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        content.load('login.html');
        $("#menu")[0].close();
      }).catch(function (error) {
        // An error happened.
        console.log(error.message);
      });
    });

  }
  if (page.id === 'login') {
    console.log("login");
    
    $("#signup-button").click(function () {
      content.load('register.html');
      $("#menu")[0].close();
    });

    $("#signinbtn").click(function () {
      var email = $("#username").val();
      var password = $("#password").val();
      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        content.load('FoodCategory.html');

      }
      )

        .catch(function (error) {
         
          console.log(error.message);
        });



    })

    $("#gbtn").click(function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        content.load('FoodCategory.html');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });

  }

  
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

window.fn = {};

window.fn.open = function () {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function (page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('myNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};


