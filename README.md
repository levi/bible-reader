ESV Bible Reader
================

A simple client-side bible web application that scrolls the page as the bible is read. Currently uses the English Standard Version translation API (http://esvapi.org) and its subsequent verse-by-verse audio format hosted on http://esvbible.org.

- - -

## Why?

I was inspired by the iPhone ESV Bible Plus app that scrolls through the verses while the Bible is being read. This is my attempt to translate that functionality into HTML5 with the audio tag and ESV's online API.

The app currently uses the Express.js framework for easy URI middleware. The majority of the logic is meant to live on the client side, since the browser is pretty powerful these days. I am doing the proof-of-concept in jQuery at this moment, but Backbone.js or Sproutcore are likely candidates for future development.

It is my hope to make this public and inspire more experimental Bible application development.

- - -

## Libraries Used

* Node.js
* Express.js
* Jade
* jQuery
* SoundManager2

- - -

## License

Released under the MIT license.