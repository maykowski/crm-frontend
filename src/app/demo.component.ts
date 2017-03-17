import { Component, OnInit } from '@angular/core';
import {DataTableResource} from "./data-table-resource";
import {TableService} from "./table.service";

@Component({
    moduleId: module.id,
    selector: 'demo',
    template: `<table-component (reload)="reloadItems($event)"         [itemsPromise]="rowsPromise" (multiSelect)="getSelected($event)"
[activableColumns]="activableColumns"         [itemCount]="itemCount" [sortableColumns]="sortableColumns" [hiddenColumns]="hiddenColumns"

></table-component>`
})
export class DemoComponent implements OnInit {
  rows: Array < any > = [];
  rowsPromise:Promise<any[]>;

  activableColumns: string[] = ['name'];
  sortableColumns: string[] = ['name', 'followups'];
  hiddenColumns: string[] = ['summary','lid', 'createDate', 'updateDate', 'id', 'link', 'email'];
  itemCount = 0;



  itemResource:DataTableResource<any>;

  constructor(private tableService:TableService) {
    // this.itemResource.count().then(count => this.itemCount = count);
  }


  ngOnInit(): void {
    this.tableService.getTable().then(items=>  this.itemResource = new DataTableResource(items));
    this.rowsPromise = this.tableService.getTable();
  }


  getSelected(items:any[]){
    console.log("gs",items);
  }

}
