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
var data_table_resource_1 = require("./data-table-resource");
var table_service_1 = require("./table.service");
var url_service_1 = require("./url.service");
var TableComponent = (function () {
    function TableComponent(tableService, urlService) {
        this.tableService = tableService;
        this.urlService = urlService;
        this.page = 1;
        this.size = 10;
        // private _itemsPromise: Promise<any[]>;
        this._columns = [];
        this._activableColumns = [];
        this._sortableColumns = [];
        this.hiddenColumns = [];
        this._sortAsc = true;
        this.pagination = true;
        this._reloading = false;
        this._scheduledReload = null;
        // @Output() reload = new EventEmitter();
        this.headerClick = new core_1.EventEmitter();
        this.multiSelect = new core_1.EventEmitter();
        this.selectedItems = [];
        this._displayParams = {}; // params of the last finished reload
        this.autoReload = true;
    }
    Object.defineProperty(TableComponent.prototype, "columns", {
        // @Input() get itemsPromise() {
        //   return this._itemsPromise;
        // }
        //
        // set itemsPromise(itemsPromise: Promise<any[]>) {
        //   this._itemsPromise = itemsPromise;
        //   //this._onReloadFinished();
        // }
        get: function () {
            return this._columns;
        },
        set: function (columns) {
            this._columns = columns;
            //this._onReloadFinished();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "activableColumns", {
        get: function () {
            return this._activableColumns;
        },
        set: function (value) {
            this._activableColumns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "sortableColumns", {
        get: function () {
            return this._sortableColumns;
        },
        set: function (value) {
            this._sortableColumns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "sortBy", {
        get: function () {
            return this._sortBy;
        },
        set: function (value) {
            this._sortBy = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "sortAsc", {
        get: function () {
            return this._sortAsc;
        },
        set: function (value) {
            this._sortAsc = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        var page = this.page;
        var size = this.size;
        this.urlService.getParams().subscribe(function (p) {
            if (Object.keys(p).length > 0) {
                page = p['page'];
                size = p['size'];
            }
        });
        this.tableService.getTable(page, size).subscribe(function (items) {
            _this.initTable(items, page);
        });
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
        };
    };
    TableComponent.prototype.initTable = function (items, page) {
        this.items = items['content'];
        this.total = items['totalElements'];
        this.page = items['number'] + 1;
        console.log("initTableData - inner", page);
        this.addCalculatedFields(this.items);
        this.columns = this.extractColumns(this.items, this.activableColumns);
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var col = _a[_i];
            col.property = col.name; //.replace(" ", "")
        }
        this._initDefaultClickEvents();
        for (var _b = 0, _c = this.columns; _b < _c.length; _b++) {
            var col = _c[_b];
            for (var _d = 0, _e = this.sortableColumns; _d < _e.length; _d++) {
                var sortCol = _e[_d];
                if (col.name.toUpperCase() === sortCol.toUpperCase()) {
                    col.sortable = true;
                }
            }
            for (var _f = 0, _g = this.hiddenColumns; _f < _g.length; _f++) {
                var hideCol = _g[_f];
                if (col.name.toUpperCase() === hideCol.toUpperCase()) {
                    col.active = false;
                }
            }
        }
    };
    TableComponent.prototype.addCalculatedFields = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            // trainings
            // if (item.training){
            //   item.trainingDate = new Date(item.training.when).toDateString();
            // }
            // followups
            if (item.followups.length) {
                item.followupCount = item.followups.length;
            }
        }
    };
    TableComponent.prototype._triggerReload = function () {
        var _this = this;
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout(function () {
            _this.reloadItems();
        });
    };
    TableComponent.prototype.getPage = function (page) {
        var _this = this;
        console.log("getPage", page - 1);
        // this.page=page;
        this.urlService.setParams(page, this.size).subscribe();
        this.tableService.getTable(page, this.size).subscribe(function (resp) { return _this.initTable(resp, _this.size); });
        // this.urlService.setParams(page, this.size).subscribe(() => this.initTableData(page, this.size));
        // this.urlService.setParams(this.page, this.size).subscribe();
        // this.items = pre(10, page)
        //   .do(res => {
        //     this.total = res.total;
        //     this.p = page;
        //     this.loading = false;
        //   })
        //   .map(res => res.items);
    };
    TableComponent.prototype.reloadItems = function () {
        var _this = this;
        this._reloading = true;
        new data_table_resource_1.DataTableResource(this.items).query(this._getRemoteParameters()).then(function (items) {
            _this.items = items;
        });
    };
    TableComponent.prototype._getRemoteParameters = function () {
        var params = {};
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        // params.limit = 10;
        // params.offset = 0;
        return params;
    };
    TableComponent.prototype.toggleHighlightCol = function (i, hightlight) {
        if (this.columns[i])
            this.columns[i]['hightlight'] = hightlight;
    };
    TableComponent.prototype._initDefaultClickEvents = function () {
        var _this = this;
        this.headerClick.subscribe(function (tableEvent) { return _this.sortColumn(tableEvent.column); });
    };
    TableComponent.prototype.sortColumn = function (column) {
        if (column.sortable) {
            var ascending = (this.sortBy ? this.sortBy.toUpperCase() : "") === (column.property ? column.property.toUpperCase() : "") ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    };
    TableComponent.prototype.sort = function (sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    };
    TableComponent.prototype.headerClicked = function (column, event) {
        this.headerClick.emit({ column: column, event: event });
    };
    TableComponent.prototype.checkIfDate = function (value) {
        if (typeof value === 'number' && value > 200000000000 && new Date(value) instanceof Date) {
            return true;
        }
        else {
            return false;
        }
    };
    TableComponent.prototype.ifDueDatePassed = function (dueDate) {
        return new Date(dueDate) <= new Date();
    };
    TableComponent.prototype.checkIfBoolean = function (value) {
        return typeof (value) === "boolean";
    };
    // extracting columns from array and mark activable columns
    TableComponent.prototype.extractColumns = function (items, activableColumns) {
        var columnsKeys = Object.keys(items[0]);
        var columns = [];
        for (var _i = 0, columnsKeys_1 = columnsKeys; _i < columnsKeys_1.length; _i++) {
            var col = columnsKeys_1[_i];
            var activable = true;
            for (var _a = 0, activableColumns_1 = activableColumns; _a < activableColumns_1.length; _a++) {
                var activableColumn = activableColumns_1[_a];
                if (activableColumn.toUpperCase() === col.toUpperCase()) {
                    activable = false;
                }
                columns.push({ name: col, active: true, activable: activable, sortable: undefined, property: undefined });
            }
        }
        return columns;
    };
    TableComponent.prototype.manageSelection = function (item) {
        if (item.selected) {
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        }
        this.multiSelect.emit(this.selectedItems);
    };
    TableComponent.prototype.toggleAll = function () {
        if (this.selectAll) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                item.selected = true;
            }
            this.selectedItems = this.items.slice(0);
        }
        else {
            for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                var item = _c[_b];
                item.selected = false;
            }
            this.selectedItems = [];
        }
        this.multiSelect.emit(this.selectedItems);
    };
    TableComponent.prototype.getLastFollowupDate = function (followups) {
        var lastFUDate;
        if (followups && followups.length > 0) {
            var lastDueDate = followups[followups.length - 1].dueDate;
            if (lastFUDate)
                lastFUDate = new Date(lastDueDate).toDateString();
        }
        // console.log("getLastFollowupDate", lastFUDate);
        return lastFUDate;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "hiddenColumns", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "activableColumns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "sortableColumns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TableComponent.prototype, "itemCount", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "headerClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "multiSelect", void 0);
    __decorate([
        // params of the last finished reload
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "autoReload", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "sortBy", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "sortAsc", null);
    TableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-component',
            templateUrl: 'table.component.html',
            styleUrls: ['table.component.css']
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService, url_service_1.UrlService])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map