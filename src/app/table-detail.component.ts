import {Component, Input} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TableService} from "./table.service";
import {Location} from "@angular/common";
import "rxjs/add/operator/switchMap";
import {IMyOptions, IMyDateModel} from "mydatepicker";
import {FollowupService} from "./followup.service";
import {Followup} from "./Followup";
import {FormGroup} from "@angular/forms";
import {Status} from "./status";
import {StatusService} from "./status.service";


@Component({
  moduleId: module.id,
  templateUrl: 'table-detail.component.html',

  styleUrls: ['table-detail.component.css']


})

export class TableDetailComponent {
  @Input()
  selectedRow: any = {};
  dateFields: string[] = [];
  followups: Followup[] = [];
  newFollowup: Followup = new Followup();
  statuses:Status[];


  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd-mm-yyyy',
    showClearDateBtn: false,
    editableDateField: false,
    width: '100%',
    height: '30px'
  };

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        return this.tableService.getTableDetail(+params['id']);
      })
      .subscribe((row: any) => {
        this.selectedRow = row;
        console.log("ngOnInit");

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
    this.statusService.getStatuses().then(statuses => this.statuses = statuses);

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


  constructor(private tableService: TableService, private followupService: FollowupService, private statusService:StatusService, private route: ActivatedRoute, private location: Location) {
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

  convertDate(input:string):string{
    let parts = input.split('-');
    if (parts.length == 3) {
      console.log("init", parts[0], parts[1], parts[2]);
      return parts[2] + '-' + parts[1] + '-' + parts[0];
    }else{
      console.error("!!! date input cannot be parsed to yyyy-MM-dd");
    }
  }

  createFollowup(followup: Followup): void {
    if (followup.dueDate) followup.dueDate = this.convertDate(followup.dueDate['formatted']);
    this.followupService.create(followup, this.selectedRow.id).then(() => {
      return this.followupService.getFollowups(this.selectedRow.id)
    }).then(followups => {
      console.log("saveNew", followups);
      this.selectedRow.followups = followups;
    });

  }

}
