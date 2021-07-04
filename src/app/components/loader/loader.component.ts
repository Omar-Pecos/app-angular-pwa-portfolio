import { Component, OnInit, Input } from '@angular/core';

interface LoaderStyles {
  loader?: any;
  secondaryColor?: any;
}

@Component({
  selector: 'Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() primaryColor;
  @Input() secondaryColor;
  @Input() duration;

  public styles: LoaderStyles;

  constructor() {
    this.styles = {
      loader: {},
    };
  }

  ngOnInit(): void {
    if (this.primaryColor) {
      this.styles.loader['background-color'] = this.primaryColor;
    }
    if (this.secondaryColor) {
      this.styles.secondaryColor = { 'background-color': this.secondaryColor };
    }
    if (this.duration) {
      this.styles.loader['animation-duration'] = this.duration;
    }
  }
}
