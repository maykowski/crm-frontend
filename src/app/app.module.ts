import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {TableComponent} from "./table.component";
import {FormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-popover";
import {DndModule} from "ng2-dnd";
import {MinPipe} from "./utils/min";
import {Hide} from "./utils/hide";
import {Ng2PaginationModule} from "ng2-pagination";
import {TableService} from "./table.service";
import {AppRoutingModule} from "./app-routing.module";
import {TableDetailComponent} from "./table-detail.component";
import {HttpModule} from "@angular/http";
import {DemoComponent} from "./demo.component";
import {MyDatePickerModule} from "mydatepicker";
import {FollowupService} from "./followup.service";
import {OrderByPipe} from "./utils/order-by";
import {StatusService} from "./status.service";
import {TrainingComponent} from "./training.component";
import {TrainingService} from "./training.service";
import {UrlService} from "./url.service";

@NgModule({
  imports:      [ BrowserModule, FormsModule, PopoverModule, DndModule.forRoot(), Ng2PaginationModule, HttpModule,
      AppRoutingModule, MyDatePickerModule
  ],
  declarations: [ AppComponent, DemoComponent, TableComponent, TableDetailComponent, MinPipe, Hide, OrderByPipe, TrainingComponent],
  bootstrap:    [ AppComponent ],
  providers: [TableService, FollowupService, StatusService, TrainingService, UrlService ]
})
export class AppModule { }
