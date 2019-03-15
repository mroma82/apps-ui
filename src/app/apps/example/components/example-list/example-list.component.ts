import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit {
  
  // model
  model = {
    items: [
      { id: "11111111-bf40-415b-92ee-99644a12c001", title: "Example 1" },
      { id: "4bb65d2a-3e2f-4b84-ba30-4e76bfe22b0d", title: "Example 2" },
      { id: "e3f4c1ec-a4ef-4dfe-b328-837d49b9c060", title: "Example 3" }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}
