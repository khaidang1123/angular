import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-validate',
  templateUrl: './show-validate.component.html',
  styleUrls: ['./show-validate.component.css']
})
export class ShowValidateComponent implements OnInit {

  @Input('formField') formData: any;
  @Input() key: string;

  constructor() {
    this.key = '';
  }

  ngOnInit(): void {

  }

}
