import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
//   template: `
//   <app-test2 [data]="tableData"></app-test2>
// `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tableData = [
    { name: 'Root 1', value: 100, children: [
      { name: 'Child 1', value: 50, children: [
        { name: 'Grandchild 1', value: 20 },
        { name: 'Grandchild 2', value: 30 }
      ]},
      { name: 'Child 2', value: 30 }
    ]},
    { name: 'Root 2', value: 200, children: [
      { name: 'Child 3', value: 100 },
      { name: 'Child 4', value: 100 }
    ]}
  ];
  title = 'new-app';
}
