import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  items = [];

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.items.push(product)
  }

}
