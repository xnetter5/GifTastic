// ----- Game Variables ----- //

// Initial array of animals
var animalsArr = ["Kobe", "Shaq", "Lebron", "Lakers", "Phil Jackson",
                  "Staples Center", "Celtics", "Knicks", "Warriors", "Steph Curry",
                  "Michael Jordan", "Pau Gasol", "Tim Duncan", "Klay Thompson", "James Harden",
                  "Paul George", "Paul Pierce", "Lamar Odom", "Basketball", "Robert Horry", "Dwayne Wade"];

// ----- Helper Functions ----- //

// renderButtons will display the animal buttons for all animals within the
// animalsArr array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#buttonPanel").empty();

  // Loop through the array of animals
  for (var i = 0; i < animalsArr.length; i++) {
    // Dynamicaly generate a button for each animal in the array
    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", animalsArr[i]);
    button.text(animalsArr[i]);

    // Add the button to the HTML
    $("#buttonPanel").append(button);
  }
}

// ----- Event Handlers ----- //

// An event handler for the user form to add additional animals to the array
$("#add-animal").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var animal = $("#animal-input").val().trim();

  // The animal from the textbox is then added to our animalsArr array
  animalsArr.push(animal);
  $("#animal-input").val("");

  // Redraw the animal buttons
  renderButtons();
});

// fetchAnimalGifs will fetch animal Gifs with the Giphy API
function fetchAnimalGifs() {
  // Get the animal name from the button clicked
  var animalName = $(this).attr("data-animal");
  var animalStr = animalName.split(" ").join("+");

  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    // Create and display div elements for each of the returned Gifs
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animalGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the gifPanel
      $("#gifPanel").append(newDiv);
    }
  });
}

// animateAnimalGif will animate a still Gif and stop a moving Gif
function animateAnimalGif() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
$(document).ready(function() {
  renderButtons();
});

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".animalButton", fetchAnimalGifs);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".animalGif", animateAnimalGif);