import {Component, Input, EventEmitter, Output, OnInit} from "@angular/core";
import {Column} from "./Column";
import {DataTableParams} from "./types";
import {DataTableResource} from "./data-table-resource";
import {Followup} from "./followup";
import {TableService} from "./table.service";
import {UrlService} from "./url.service";

@Component({
  moduleId: module.id,
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {

  private items: any[];
  private total: number;
  page: number = 1;
  size: number = 10;

  private _columns: Column[] = [];
  private _activableColumns: string[] = [];
  private _sortableColumns: string[] = [];
  @Input() private hiddenColumns: string[] = [];

  get columns() {
    return this._columns;
  }

  set columns(columns: Column[]) {
    this._columns = columns;
  }

  @Input() get activableColumns(): string[] {
    return this._activableColumns;
  }

  set activableColumns(value: string[]) {
    this._activableColumns = value;
  }

  @Input() get sortableColumns(): string[] {
    return this._sortableColumns;
  }

  set sortableColumns(value: string[]) {
    this._sortableColumns = value;
  }

  private _sortBy: string;
  private _sortAsc = true;

  @Input() pagination = true;
  @Input() itemCount: number;


  _reloading = false;
  _scheduledReload: number = null;
  @Output() headerClick = new EventEmitter();
  @Output() multiSelect = new EventEmitter();

  selectedItems: any[] = [];

  _displayParams = <DataTableParams>{}; // params of the last finished reload
  @Input() autoReload = true;

  @Input()
  get sortBy() {
    return this._sortBy;
  }

  set sortBy(value) {
    this._sortBy = value;
    this._triggerReload();
  }

  @Input()
  get sortAsc() {
    return this._sortAsc;
  }

  set sortAsc(value) {
    this._sortAsc = value;
    this._triggerReload();
  }

  constructor(private tableService: TableService, private urlService: UrlService) {
  }

  ngOnInit() {
    let page = this.page;
    let size = this.size;

    this.urlService.getParams().subscribe(p => {
      if (Object.keys(p).length > 0) {
        page = p['page'];
        size = p['size'];
      }
    });
    this.tableService.getTable(page, size).subscribe((items) => {
      this.initTable(items, page);
    });

    this._displayParams = {
      sortBy: this.sortBy,
      sortAsc: this.sortAsc,
    };
  }

  private initTable(items: any[], page: number) {
    this.items = items['content'];
    this.total = items['totalElements'];
    this.page = items['number'] + 1;
    console.log("initTableData - inner", page);

    this.addCalculatedFields(this.items);

    this.columns = this.extractColumns(this.items, this.activableColumns);


    for (let col of this.columns) {
      col.property = col.name;//.replace(" ", "")
    }
    this._initDefaultClickEvents();

    for (let col of this.columns) {
      for (let sortCol of this.sortableColumns) {
        if (col.name.toUpperCase() === sortCol.toUpperCase()) {
          col.sortable = true;
        }
      }

      for (let hideCol of this.hiddenColumns) {
        if (col.name.toUpperCase() === hideCol.toUpperCase()) {
          col.active = false;
        }
      }
    }
  }

  addCalculatedFields(items: any[]) {
    for (let item of items) {
      if (item.followups.length) {
        item.followupCount = item.followups.length;
      }
    }
  }

  _triggerReload() {
    if (this._scheduledReload) {
      clearTimeout(this._scheduledReload);
    }
    this._scheduledReload = setTimeout(() => {
      this.reloadItems();
    });
  }

  getPage(page: number) {
    console.log("getPage", page - 1);
    // this.page=page;
    this.urlService.setParams(page, this.size).subscribe();
    this.tableService.getTable(page, this.size).subscribe(
      resp => this.initTable(resp, this.size)
    )
  }

  reloadItems() {
    this._reloading = true;
    new DataTableResource(this.items).query(this._getRemoteParameters()).then(items => {
      this.items = items;
    });
  }


  private _getRemoteParameters(): DataTableParams {
    let params = <DataTableParams>{};
    if (this.sortBy) {
      params.sortBy = this.sortBy;
      params.sortAsc = this.sortAsc;
    }
    return params;
  }

  toggleHighlightCol(i: number, hightlight: boolean): void {
    if (this.columns[i])
      this.columns[i]['hightlight'] = hightlight;
  }

  private _initDefaultClickEvents() {
    this.headerClick.subscribe((tableEvent: any) => this.sortColumn(tableEvent.column));
  }

  private sortColumn(column: Column) {
    if (column.sortable) {
      let ascending = (this.sortBy ? this.sortBy.toUpperCase() : "") === (column.property ? column.property.toUpperCase() : "") ? !this.sortAsc : true;
      this.sort(column.property, ascending);
    }
  }

  sort(sortBy: string, asc: boolean) {
    this.sortBy = sortBy;
    this.sortAsc = asc;
  }

  private headerClicked(column: Column, event: MouseEvent) {
    this.headerClick.emit({column, event});
  }

  checkIfDate(value: any): boolean {
    if (typeof value === 'number' && value > 200000000000 && new Date(value) instanceof Date) {
      return true;
    } else {
      return false;
    }
  }

  ifDueDatePassed(dueDate: string) {
    return new Date(dueDate) <= new Date()
  }

  checkIfBoolean(value: any) {
    return typeof(value) === "boolean"
  }

  // extracting columns from array and mark activable columns
  extractColumns(items: any[], activableColumns: string[]): Column[] {
    let columnsKeys = Object.keys(items[0]);
    let columns: Column[] = [];
    for (let col of columnsKeys) {
      let activable = true;
      for (let activableColumn of activableColumns) {
        if (activableColumn.toUpperCase() === col.toUpperCase()) {
          activable = false;
        }
        columns.push({name: col, active: true, activable: activable, sortable: undefined, property: undefined});
      }
    }
    return columns;
  }

  manageSelection(item: any) {
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
    }
    this.multiSelect.emit(this.selectedItems);

  }

  selectAll: boolean;

  toggleAll() {
    if (this.selectAll) {
      for (let item of this.items)
        item.selected = true;
      this.selectedItems = this.items.slice(0)
    } else {
      for (let item of this.items)
        item.selected = false;
      this.selectedItems = []
    }
    this.multiSelect.emit(this.selectedItems);
  }

  getLastFollowupDate(followups: Followup[]): String {
    let lastFUDate: string;
    if (followups && followups.length > 0) {
      let lastDueDate = followups[followups.length - 1].dueDate;
      if (lastFUDate)
        lastFUDate = new Date(lastDueDate).toDateString()
    }
    return lastFUDate;
  }
}



