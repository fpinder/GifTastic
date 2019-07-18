// Initial array of
var itmes = ["Spider-Man", "Avengers: Infinity War", "Aquaman", "Black Panther", "The Lion King"];

$(document).ready(function(){


 // Function for displaying movie data
 function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
     $("#movies-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < itmes.length; i++) {

      
      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("movie");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", itmes[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(itmes[i]);
      // Adding the button to the HTML
      $("#movies-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-movie").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var inputRequest = $("#movie-input").val().trim();
    // The movie from the textbox is then added to our array
    itmes.push(inputRequest);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

});