'use babel';

import {File, TextBuffer, TextEditor} from 'atom';
import path from 'path';
import BookEndView from './book-end-view';

export default class BookEnd {

  constructor(filePath: String) {
    this.file = new File(filePath);
    console.log("I live... " + filePath);
    this.buffer = new TextBuffer(filePath, {});
  }

  get element() {
    return this.view && this.view.element || document.createElement('div');
  }

  get view() {
    if (!this.bookendview) {
      try {
        this.bookendview = new BookEndView(this);
      } catch (e) {
        console.warn("Could not create BookEndView. :(");
      }
    }

    return this.bookendview;
  }

  getTitle () {
    const filePath = this.getPath()
    if (filePath) {
      return path.basename(filePath)
    } else {
      return 'untitled'
    }
  }

  getPath () {
    return this.file.getPath()
  }

  getURI () {
    return this.getPath()
  }

  isEqual (other) {
    return other instanceof BookEnd && (this.getURI() === other.getURI())
  }

};
