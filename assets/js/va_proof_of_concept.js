var VA_POC = ( function() {

  var play_video = function( index_to_play ) {

    // Clear out video and bug
    clear_video_from_dom();
    hide_bug_in_dom();

    var $video_element = get_video_tag(index_to_play);

    $(".video_container").append( $video_element );

    $video_element.on('ended', function() {

      // remove the event handler from this video
      $video_element.off('ended');

      play_video( get_next_index_to_play(index_to_play) );
    });

    $video_element.get(0).play();
    populate_bug( index_to_play );

  }

  var get_video_tag = function(index_to_play) {
    return $("<video src='assets/media/" + manifest[index_to_play] + "' height='100%' width='100%'></video>");
  }

  var get_next_index_to_play = function(current_index) {
    return ( current_index + 1 >= manifest.length ) ? 0 : current_index += 1;
  }

  var populate_bug = function(index_to_play) {

    // This will get us the contents after the last '-' in the filename,
    // however if there is no '-' in the filename, just return
    var string_to_test  = manifest[index_to_play].split("-");
    if ( string_to_test.length <= 1) {
      return; 
    };

    // Now lets remove the extension from the filename
    string_to_test      = string_to_test.pop().split(".")[0];

    if (string_to_test.length > 0) {
      // regular expression test goes here
      show_bug_in_dom( $("<div>" + string_to_test + "</div>") );
    };

  }

  var clear_video_from_dom = function() {
    // Have to be careful here, the Bug is a child of the video class container
    // We just want to remove any video
    $(".video_container video").remove();
  }

  var hide_bug_in_dom = function() {
    $(".bug_container").empty();
    $(".bug_container").hide();
  }

  var show_bug_in_dom = function($element_to_show) {
    $(".bug_container").show();
    $(".bug_container").append($element_to_show);
  }

  return {
    initialize: function() {

      // Off we go
      play_video(0);
    }
  }

})();