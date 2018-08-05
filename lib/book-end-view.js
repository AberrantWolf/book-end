'use babel';

import {CompositeDisposable} from 'atom'

export default class BookEndView {
  editor: null,

  constructor(bookend) {
    // Create root element
    //this.element = document.createElement('div');
    //this.element.classList.add('book-end');

    // Create message element
    //const message = document.createElement('div');
    // message.textContent = 'The BookEnd package is Alive! It\'s ALIVE!';
    // message.classList.add('message');
    // this.element.appendChild(message);

    this.bookend = bookend;

    this.disposables = new CompositeDisposable();
    //this.disposables.add(this.bookend.onDidChange(() => this.updateImageURI()))

    this.editor = atom.workspace.buildTextEditor({buffer: this.buffer});
    this.editorview = atom.views.getView(this.editor);

    if (this.editorview) {
      console.log("We have a view!!");
    } else {
      console.log("NO VIEWS! :(((");
    }

    //this.element = new TextEditorElement();
    //this.element.initialize(this.editor);
    this.element = atom.views.getView(this.editor);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.editorview.dispose();
    this.editor.dispose();
  }

  getElement() {
    return this.element;
  }

  get view() {
    return this.editorview;
  }

}
