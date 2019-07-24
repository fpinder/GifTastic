// Initial array of
var topics = ["Movies", "Games", "Videos", "Basketball", "Birds", "Cars"];



$(document).ready(function () {


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

  // This function handles events to add the button if clicked 
  $("#add-topic").on("click", function (event) {
    // event.preventDefault() prevents the from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var inputRequest = $("#topic-input").val().trim();
    // The topics from the textbox is then added to our array
    topics.push(inputRequest);

    // calling renderButtons which handles the processing of our topics array
    renderButtons();
  });

  function alertTopicName() {

    var topicName = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/stickers/search?api_key=ctoGva5xUBLxP4kU9CE0lN3HHNAswGGB&q=" + topicName + "&limit=10&offset=0&rating&lang=en"

    // newDiv.empty();
    // alert("Button click to request topic " + topicName);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      // console.log(JSON.stringify(response))
     

      //Create a new div to hold the topics
      var newDiv = $("<div>");

      for (i = 0; i < response.data.length; i++) {
        var searchGiphy = response.data[i];

        console.log("SearchGiphy " + searchGiphy)

        //create a new div to hold the rating and gif
        var newDiv = $("<div class='row'>");

        console.log("New Rating: " + searchGiphy.rating)

        //append the paragraph rating to the newDiv
        newDiv.append("<p> Rating: " + searchGiphy.rating + "</p>");
       

        //new image element that will hold the gif image
        newImg = $("<img>");

        //adding the elment to the image
        //https://www.w3schools.com/tags/ref_standardattributes.asp
        //https://www.w3schools.com/tags/att_global_data.asp

        newImg.attr({
          "src": searchGiphy.images.original_still.url,
          "data-still": searchGiphy.images.original_still.url,
          "data-animate": searchGiphy.images.original.url,
          "data-state": "still",
          "class": "gif"
        });
        console.log("original still " + searchGiphy.images.original_still.url)
        // appending the image to the NewDiv
        newDiv.append(newImg)

        //appending/display the entire newDiv  with a rating and the image to the id="row2"
        
        $('#row2').append(newDiv)


        // var urlShowStill = response.data[i].images.original_still.url;
        // var urlShowOriginal = response.data[i].images.original.url;
        // var giphyRating = response.data[i].rating;

        // console.log("Rating = " + giphyRating)
        // console.log("STILL uRL " + urlShowStill + " data-still=" + urlShowOriginal);
        // console.log("Original Animated " + urlShowOriginal);

        // // $('#row2').append("<img src ='" + urlShowOriginal + "'>")

        // $('.giphyText').append("Rating:  " + response.data[i].rating);

        // $('#row2').append("<img src ='" + urlShowStill + "' data-still='" + urlShowStill + "' data-animate='" + urlShowOriginal + "' data-state='still' class='gif' >")

      }

      $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log(" in the click the state is " + state)
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });


  };

  // Function for displaying the topic info
  // adding a click event listener to all elements with the class "topic"
  // adding the event listener to the document because it will work for dynamically generated elements
  // $(".movies").on("click") will only add listeners to elements that are on the page at that time

  $(document).on("click", ".chooses", alertTopicName);


  // Calling the renderButtons function at least once to display the initial list of topics
  renderButtons();


});



