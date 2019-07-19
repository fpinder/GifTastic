// Initial array of
var topics = ["Movies", "Games", "Videos", "Basketball", "Birds"];
var queryURL = "https://api.giphy.com/v1/stickers/search?api_key=ctoGva5xUBLxP4kU9CE0lN3HHNAswGGB&q=basketball&limit=10&offset=0&rating=G&lang=en"



$(document).ready(function(){


 // Function for displaying topics data
 function renderButtons() {

    // Deleting the topics buttons prior to adding new topics buttons
    // (this is necessary otherwise we will have repeat buttons)
     $("#topics-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      
      // Then dynamicaly generating buttons for each topics in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("chooses");
      // Adding a data-attribute with a value of the topics at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topics at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#topics-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-movie").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var inputRequest = $("#movie-input").val().trim();
    // The topics from the textbox is then added to our array
    topics.push(inputRequest);

    // calling renderButtons which handles the processing of our topics array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of topics
  renderButtons();

});

//ajax call to retrieve the data from giphy.com query
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response)
    
  });

  