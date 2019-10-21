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
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        content.load('FoodCategory.html');
      }).catch(function (error) {
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

if (page.id === 'OrderConfirm') {
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




  
  var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();


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


