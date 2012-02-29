function play_audio (verse) {
    console.log("Play verse " + verse);
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
    var nextVerse = Number(verse.charAt(verse.length-1)) + 1;
    if (nextVerse <= (document.getElementsByClassName("verse-num").length)){
        if (nextVerse > 9){
            nextVerse = verse.slice(0, -2) + nextVerse;
            play_audio(nextVerse);
        }
        else if(nextVerse > 99){
            nextVerse = verse.slice(0, -3) + nextVerse;
            play_audio(nextVerse);
        }
        else{
            nextVerse = verse.slice(0, -1) + nextVerse;
            play_audio(nextVerse);
        }
    }
  }, true);
  a.play();
  console.log(a.src);
}

$(document).ready(function() {
  var cleanVerse = /^p([0-9]+).[0-9]+\-[0-9]$/,
      verseMatch = cleanVerse.exec($('.esv-text :first-child:first').attr('id')),
      verse      = verseMatch[1];

  if (verse) {
    play_audio(verse);
  }
});