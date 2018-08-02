'use babel';

import BookEndView from './book-end-view';
import { CompositeDisposable } from 'atom';

export default {

  bookEndView: null,
  modalPanel: null,
  subscriptions: null,

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
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.bookEndView.destroy();
  },

  serialize() {
    return {
      bookEndViewState: this.bookEndView.serialize()
    };
  },

  toggle() {
    console.log('BookEnd was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  consumeTree(treeView) {
    console.console.log("Tree consumed");
  }

};
