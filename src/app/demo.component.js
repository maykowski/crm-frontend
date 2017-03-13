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
var core_1 = require('@angular/core');
var data_table_resource_1 = require("./data-table-resource");
var table_service_1 = require("./table.service");
var DemoComponent = (function () {
    function DemoComponent(tableService) {
        this.tableService = tableService;
        this.rows = [];
        this.activableColumns = ['name'];
        this.sortableColumns = ['name', 'job title', "DATE"];
        this.itemCount = 0;
        // this.itemResource.count().then(count => this.itemCount = count);
    }
    DemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tableService.getTable().then(function (items) { return _this.itemResource = new data_table_resource_1.DataTableResource(items); });
        this.rowsPromise = this.tableService.getTable();
    };
    DemoComponent.prototype.getSelected = function (items) {
        console.log("gs", items);
    };
    DemoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'demo',
            template: "<table-component (reload)=\"reloadItems($event)\"         [itemsPromise]=\"rowsPromise\" (multiSelect)=\"getSelected($event)\"\n[activableColumns]=\"activableColumns\"         [itemCount]=\"itemCount\" [sortableColumns]=\"sortableColumns\"\n\n></table-component>"
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map