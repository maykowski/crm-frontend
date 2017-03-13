import {Component, Input} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TableService} from "./table.service";
import {Location} from "@angular/common";
import "rxjs/add/operator/switchMap";
import {IMyOptions, IMyDateModel} from "mydatepicker";


@Component({
  moduleId: module.id,
  template: `
<a href="#" (click)="goBack()">back</a>

{{selectedRow.NAME}}

<ul>
<li *ngFor="let field of fields">
<div class="row field-row">
<div class="col-lg-3 text-right">
<label for="field_{{field}}" class="field-label">{{field}}</label>
</div>
<div class="col-lg-3">
<input type="text" *ngIf="!checkIfBoolean(selectedRow[field]) && !checkIfDateField(field)" [maxlength]="100" class="field-value"
id="field_{{field}}" [disabled]="field=='id'" [(ngModel)]="selectedRow[field]">
<input type="checkbox" *ngIf="checkIfBoolean(selectedRow[field])" id="field_{{field}}" [(ngModel)]="selectedRow[field]">
<my-date-picker *ngIf="checkIfDateField(field)" [(ngModel)]="selectedRow[field]" [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event)"></my-date-picker>

</div>
</div>
</li>
</ul>

<div>
<input type="button" class="btn" value="Save" (click)="save()">
<input type="button" class="link" value="Cancel" (click)="goBack()">
</div>


`,

  styleUrls: ['table-detail.component.css']


})

export class TableDetailComponent {
  @Input()
  selectedRow: any = {};
  dateFields: string[] = [];


  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    width: '50%',
    height: '30px'
  };

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
      console.log("ts", this.tableService);
      console.log("ts", params['id']);
      console.log("ts", this.tableService.getTableDetail(+params['id']));
      return this.tableService.getTableDetail(+params['id']);})
      .subscribe((row: any) => {
        this.selectedRow = row;
        this.fields = this.extractFieldNames(row);
        for (let field of this.fields) {
          if (this.checkIfDate(this.selectedRow[field])) {
            this.dateFields.push(field);
            let date = new Date(Date.parse(this.selectedRow[field]));
            var parts = this.selectedRow[field].split('T')[0];//remove time
            parts = parts.split('-');
            console.log("init", parts[0], parts[1], parts[2]);

            this.selectedRow[field] = {date: {year: parts[0], month: this.removeLeadingZero(parts[1]), day: this.removeLeadingZero(parts[2])}};
          }
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  removeLeadingZero(value: string) {
    return value.indexOf("0") == 0 ? value.split('0')[1] : value;
  }

  save(): void {
    //format date before saving dd-mm-yyyy
    for (let field of this.fields) {
      if (this.checkIfDateField(field)) {
        let d = this.selectedRow[field];
        let date = d.date.year + '-' + d.date.month + '-' + d.date.day;
        console.log("save", date);
        this.selectedRow[field] = date;
      }
    }
    this.tableService.update(this.selectedRow)
      .then(() => this.goBack());
  }


  fields: string[];


  constructor(private tableService: TableService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  onDateChanged(event: IMyDateModel) {
    console.log("onDateChanged", event);

  }

  extractFieldNames(item: any): string[] {
    return Object.keys(item);

  }

  checkIfDate(value: any): boolean {
    if (value == true || value == false) return false;
    let date = Date.parse(value);
    if (!isNaN(date) && isNaN(value)) {
      return true;
    } else {
      return false;
    }
  }

  checkIfDateField(dateToCheck: string): boolean {
    let result: boolean = false;
    for (let dateField of this.dateFields) {
      if (dateField === dateToCheck) {
        result = true;
        break;
      }
    }
    return result;
  }

  checkIfBoolean(value: any) {
    return typeof(value) === "boolean"
  }

}
