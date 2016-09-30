'use strict'
class Card {
  constructor (numb, colour) {
    this.numb = numb
    this.colour = colour
  }

  toString () {
    let numb
    if (this.numb === 1) numb = 'A'
    else if (this.numb < 10) numb = this.numb.toString()
    else if (this.numb === 10) numb = 'J'
    else if (this.numb === 11) numb = 'Q'
    else if (this.numb === 12) numb = 'K'

    let colour
    if (this.colour === 'clubs') colour = '♣'
    else if (this.colour === 'hearts') colour = '❤'
    else if (this.colour === 'diamonds') colour = '♦'
    else if (this.colour === 'spades') colour = '♠'

    return numb + colour
  }
}

module.exports = Card
