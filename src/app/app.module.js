"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var table_component_1 = require("./table.component");
var forms_1 = require("@angular/forms");
var ngx_popover_1 = require("ngx-popover");
var ng2_dnd_1 = require("ng2-dnd");
var min_1 = require("./utils/min");
var hide_1 = require("./utils/hide");
var ng2_pagination_1 = require("ng2-pagination");
var table_service_1 = require("./table.service");
var app_routing_module_1 = require("./app-routing.module");
var table_detail_component_1 = require("./table-detail.component");
var http_1 = require("@angular/http");
var demo_component_1 = require("./demo.component");
var mydatepicker_1 = require("mydatepicker");
var followup_service_1 = require("./followup.service");
var order_by_1 = require("./utils/order-by");
var status_service_1 = require("./status.service");
var training_component_1 = require("./training.component");
var training_service_1 = require("./training.service");
var url_service_1 = require("./url.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, ngx_popover_1.PopoverModule, ng2_dnd_1.DndModule.forRoot(), ng2_pagination_1.Ng2PaginationModule, http_1.HttpModule,
                app_routing_module_1.AppRoutingModule, mydatepicker_1.MyDatePickerModule
            ],
            declarations: [app_component_1.AppComponent, demo_component_1.DemoComponent, table_component_1.TableComponent, table_detail_component_1.TableDetailComponent, min_1.MinPipe, hide_1.Hide, order_by_1.OrderByPipe, training_component_1.TrainingComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [table_service_1.TableService, followup_service_1.FollowupService, status_service_1.StatusService, training_service_1.TrainingService, url_service_1.UrlService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map