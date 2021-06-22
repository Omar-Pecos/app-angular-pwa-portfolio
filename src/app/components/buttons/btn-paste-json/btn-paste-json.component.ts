import { Component, EventEmitter, Output } from '@angular/core';
const clipboardName = 'clipboard-myportfolio-provider';

@Component({
  selector: 'btnPasteJSON',
  template: `
    <button (click)="pasteJson()" class="btn-paste-json">
      <img src="assets/images/paste.png" alt="Paste" />
      JSON
    </button>
  `,
})
export class btnPasteJSON {
  @Output() sendItem = new EventEmitter();
  constructor() {}

  pasteJson() {
    let object = null;

    if (navigator.clipboard.readText) {
      navigator.clipboard
        .readText()
        .then((text) => {
          try {
            this.sendItem.emit({ item: JSON.parse(text) });
          } catch (error) {
            throw error;
          }
        })
        .catch((error) => {
          //console.log('ERROR >', error.message);
        });
    } else {
      const item = this.getItemFromLocalStorage();
      this.sendItem.emit({ item });
    }
  }

  getItemFromLocalStorage = () => {
    const stringified = localStorage.getItem(clipboardName) || '{}';
    return JSON.parse(stringified);
  };
}
