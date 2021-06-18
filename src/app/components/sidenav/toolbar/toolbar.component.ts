import { Component, Input } from '@angular/core';

@Component({
  selector: 'Toolbar',
  template: `
    <mat-toolbar id="toolbar" color="primary">
      <mat-toolbar-row>
        <span
          class="rowflex logo-span"
          routerLink="/home"
          style="cursor:pointer;"
        >
          <img src="assets/icons/icon-72x72.png" alt="OmarPV logo" />
          <span>{{ title }}</span>
        </span>
        <span class="example-spacer"></span>
        <button
          mat-icon-button
          class="example-icon"
          (click)="drawer.toggle()"
          aria-label="Example icon-button with menu icon"
        >
          <mat-icon>menu</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class Toolbar {
  @Input() drawer;
  @Input() title;
  constructor() {}
}
