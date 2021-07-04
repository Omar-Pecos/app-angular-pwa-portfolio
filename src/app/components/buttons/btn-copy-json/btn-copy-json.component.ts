import { Component, Input } from '@angular/core';
const clipboardName = 'clipboard-myportfolio-provider';

@Component({
  selector: 'btnCopyJSON',
  template: `
    <button
      ngxClipboard
      [cbContent]="cbContent"
      class="btn-copy-json"
      (click)="saveOnLocalStorageIfNeeded()"
    >
      <img src="assets/images/copy.png" alt="Copy" />
      JSON
    </button>
  `,
})
export class btnCopyJSON {
  @Input() cbContent;
  constructor() {}

  saveOnLocalStorageIfNeeded = () => {
    if (!navigator.clipboard.readText) {
      localStorage.setItem(clipboardName, this.cbContent);
    }
  };
}
