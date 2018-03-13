$(document).ready(function() {
var topics = [];

 	function displayAnimal() {

	var x = $(this).data("search");
	console.log(x);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=vmRTFHY0336QBRUYvgk4WbwJH1GCUNw2&limit=10";

	console.log(queryURL);

	$.ajax({
             url: queryURL,
        method: "GET"
       }).done(function(response) {
       	var results = response.data;
       	console.log(results);
       	for (var i = 0; i < results.length; i++) {
        	
            var animalDiv = $("<div class='col-md-4'>");

            var rating = results[i].rating;
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            var animalImage = $("<img>");
            var p = $("<p>").text("Rating: " + rating);

            animalImage.attr("src", staticSrc);
            animalImage.addClass("animalGiphy");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticSrc);
            animalImage.attr("data-animate", defaultAnimatedSrc);
            animalDiv.append(p);
            animalDiv.append(animalImage);
            $("#gifArea").prepend(animalDiv);

        }
	});
}

	$("#addAnimal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("#animalInput").val().trim();
        topics.push(newAnimal);
        console.log(topics);
        $("#animalInput").val('');
        displayButtons();
      });

	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "animal");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  $(document).on("click", "#animal", displayAnimal);

  $(document).on("click", ".animalGiphy", pausePlayGifs);

  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

}); 