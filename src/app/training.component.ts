import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Contact} from "./contact";
import {TrainingService} from "./training.service";
import {Training} from "./training";
import {Observable} from "rxjs/Rx";
@Component({
  moduleId: module.id,
  selector: 'training',
  template: `
<select [(ngModel)]="selectedTr" name="selectedTr" id="selectedTr" #sTr="ngModel" (ngModelChange)="onSelect($event)" class="form-control" >
<option [ngValue]="null"></option>
<option *ngFor="let tr of trainings" [ngValue]="tr">{{tr?.when | date:'dd-MM-yyyy'}}</option>
</select>
`,
  styles: ['']
})

export class TrainingComponent {

  @Input() contact: Observable<Contact>;
  private trainings: Training[];
  selectedTr: Training;
  @Output() trEmitter = new EventEmitter();

  constructor(private ts: TrainingService) {
  }


  ngOnInit(): void {
    this.ts.getTrainings().flatMap(trs => {
      this.trainings = trs;
      return this.contact;
    }).subscribe((contact: Contact) => {
      this.selectedTr = this.trainings.find(t=>t.id === (contact.training?contact.training.id:0));
      return;
    })
  }


  onSelect(tr: Training) {
    this.trEmitter.emit(tr);
  }
}
