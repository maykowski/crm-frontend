import {Component, OnInit} from "@angular/core";
import {TableService} from "./table.service";
import {UrlService} from "./url.service";

@Component({
  moduleId: module.id,
  selector: 'demo',
  template: `

    <table-component (reload)="reloadItems($event)" (multiSelect)="getSelected($event)"
                     [activableColumns]="activableColumns" [itemCount]="itemCount" [sortableColumns]="sortableColumns" [hiddenColumns]="hiddenColumns"></table-component>
  `
})
export class DemoComponent implements OnInit {


  activableColumns: string[] = ['name'];
  sortableColumns: string[] = ['name', 'followups', 'trainingDate', 'lastFollowupDate'];
  hiddenColumns: string[] = ['summary', 'lid', 'createDate', 'updateDate', 'id', 'link', 'email', 'training', 'followups', 'phone', 'location'];
  itemCount = 0;

  constructor(private tableService: TableService, private urlService: UrlService) {
  }


  ngOnInit(): void {
  }


  getSelected(items: any[]) {
    console.log("gs", items);
  }

}
