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

if (page.id === 'FoodCategory') {
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



