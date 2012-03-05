(function() {

  var BibleReader = (function() {
    function BibleReader() {
      var self = this;

      this.verses = [];
      this.verseIndex = 0;

      /*
       * Configure SoundManager2
       */
      soundManager.url = '/javascripts/soundmanager/swf/';
      soundManager.flashVersion = 9;

      /*
       * Init Application
       */
      soundManager.onready(function() {
        self.loadVerses();
        console.log("[BibleReader] Verse Objects", self.verses);
        self.playVerse();
      });
    }

    BibleReader.prototype.loadVerses = function() {
      var self = this,
          cleanVerse = /^v([0-9]+.[0-9]+)\-[0-9]$/;

      $('.chapter-num, .verse-num').each(function() {
        var elId       = $(this).attr('id'),
            verseMatch = cleanVerse.exec(elId),
            verse      = verseMatch[1],
            verseSound = soundManager.createSound({
              id: verse,
              url: "http://audio.esvonline.org/hw/"+verse+".mp3",
              onfinish: $.proxy(self.onVerseFinish, self)
            });

        self.verses.push({ 
          guid: verse, 
          attrId: elId, 
          sound: verseSound
        });
      });
    };

    BibleReader.prototype.playVerse = function() {
      var nextVerse = this.verses[this.verseIndex];
      if (nextVerse !== undefined) {
        console.log('nextVerse', nextVerse);
        this.scrollToVerse();
        nextVerse.sound.play();
      }
    };

    BibleReader.prototype.onVerseFinish = function() {
      // play the next verse, if the sound object exists
      console.log("[BibleReader] onVerseFinish()");
      var verse = this.verses[this.verseIndex];
      this.verseIndex++;
      console.log('verseIndex', this.verseIndex);
      this.playVerse();
    };

    BibleReader.prototype.scrollToVerse = function() {
      var currentVerse = this.verses[this.verseIndex],
          id = currentVerse.attrId,
          $verseEl = $('#'+id),
          index = $verseEl.index(),
          verseText = $verseEl.parent()[0].childNodes[(index * 2) + 1];

      console.log("verse index", index);

      $('body, html').animate({
        scrollTop: $verseEl.offset().top - 10
      });
      // $(verseText).wrap('<span class="highlight"></span>');
    };

    return BibleReader;

  })();

  var biblereader = new BibleReader();

})();