import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() type = 'success';
  @Input() message;
  @Input() showCloseBtn = false;
  @Input() showAcceptBtn = false;
  @Input() acceptButtonText = 'Aceptar';
  @Output() acceptAction = new EventEmitter();
  @Output() closeAction = new EventEmitter();

  constructor() {}

  doAction = () => {
    this.closeAction.emit({
      type: this.type === 'success' ? 'message' : 'error',
    });
  };

  doAcceptAction = () => {
    this.acceptAction.emit({
      type: 'acceptAction',
    });
  };

  ngOnInit(): void {}
}
