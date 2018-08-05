'use babel';

import BookEndView from './book-end-view';
import BookEnd from './book-end';
import { CompositeDisposable } from "atom";
import path from 'path';

export default {

  bookEndView: null,
  modalPanel: null,
  subscriptions: null,
  opener: null,

  activate(state) {
    this.bookEndView = new BookEndView(state.bookEndViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.bookEndView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'book-end:toggle': () => this.toggle()
    }));

    this.opener = atom.workspace.addOpener((uri) => {
      let uriExtension = path.extname(uri).toLowerCase();
      if (uriExtension === ".bookend") {
        return new BookEnd(uri);
      }
    });


    this.providerref = atom.views.addViewProvider(BookEnd, (bookend) => {
      return bookend.view;
    });
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bookEndView.destroy();
    this.opener.destroy();
    this.providerref.dispose();
  },

  serialize() {
    return {
      bookEndViewState: this.bookEndView.serialize()
    };
  },

  toggle() {
    console.log('BookEnd was toggled!');
  },

  consumeTreeView(treeView) {
    console.log("Tree consumed");
  }

};
