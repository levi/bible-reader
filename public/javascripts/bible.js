function play_audio (verse) {
  var audioUrl = "http://audio.esvonline.org/hw/" + verse,
      audio = $('<audio />', {
        src: audioUrl,
        controls: false,
        autoplay: false,
        preload: 'auto',
        autobuffer: true,
        'class': 'current_audio'
      });

  $('body').append(audio);
  var a = document.getElementsByTagName("audio")[0];
  a.addEventListener("ended", function(evt) {
    console.log("Ended... ");
    evt.target.parentNode.removeChild(evt.target);
    var nextVerse = verse + 1;
    if ($('#v' + nextVerse + '-1').length == 1) {
      play_audio(nextVerse);
    }
  }, true);
  a.play();
}

$(document).ready(function() {
  var cleanVerse = /^p([0-9]+).[0-9]+\-[0-9]$/,
      verseMatch = cleanVerse.exec($('.esv-text :first-child:first').attr('id')),
      verse      = verseMatch[1];

  if (verse) {
    play_audio(verse);
  }
});