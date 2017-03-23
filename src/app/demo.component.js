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
var table_service_1 = require("./table.service");
var url_service_1 = require("./url.service");
var DemoComponent = (function () {
    function DemoComponent(tableService, urlService) {
        this.tableService = tableService;
        this.urlService = urlService;
        this.activableColumns = ['name'];
        this.sortableColumns = ['name', 'followups', 'trainingDate', 'lastFollowupDate'];
        this.hiddenColumns = ['summary', 'lid', 'createDate', 'updateDate', 'id', 'link', 'email', 'training', 'followups', 'phone', 'location'];
        this.itemCount = 0;
        this.collection = [];
        // for (let i = 1; i <= 100; i++) {
        //   this.collection.push(`item ${i}`);
        // }
        // this.itemResource.count().then(count => this.itemCount = count);
    }
    DemoComponent.prototype.ngOnInit = function () {
        // this.tableService.getTable().then(items=>  this.itemResource = new DataTableResource(items));
        // this.rowsPromise = this.tableService.getTable("5","1").toPromise();
        // let page:number = 0;
        // let size:number = 5;
        //
        // this.urlService.getParams().flatMap(p=>{
        //   if (Object.keys(p).length > 0) {
        //     console.log(p)
        //     page = p['page'];
        //     size = p['size'];
        //   }
        //   return this.urlService.setParams(page, size);
        // }).flatMap(response => {
        //   console.log("get", response);
        //   this.rowsPromise =  this.tableService.getTable(page,size).toPromise();
        //   console.log("rowPromise");
        //
        //   return this.rowsPromise;
        // }).subscribe(
        //
        //   items => {this.itemResource = new DataTableResource(items);       console.log("DataTableResource", items);
        //   }
        // )
        // this.urlService.set("page="+5).then(response=>{
        //   console.log("set", response);
        // });
        // this.urlService.get('fragment').subscribe(response=>{
        //   console.log("get", response);
        // })
    };
    DemoComponent.prototype.getSelected = function (items) {
        console.log("gs", items);
    };
    DemoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo',
            template: "\n<!--<div *ngIf=\"rowsPromise\">-->\n<table-component (reload)=\"reloadItems($event)\"    (multiSelect)=\"getSelected($event)\"\n[activableColumns]=\"activableColumns\"         [itemCount]=\"itemCount\" [sortableColumns]=\"sortableColumns\" [hiddenColumns]=\"hiddenColumns\"></table-component>\n<!--</div>-->\n<!--<server-example [data]=\"collection\"></server-example>-->\n\n\n"
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService, url_service_1.UrlService])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map