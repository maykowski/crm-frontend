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
var router_1 = require("@angular/router");
var table_service_1 = require("./table.service");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var followup_service_1 = require("./followup.service");
var Followup_1 = require("./Followup");
var status_service_1 = require("./status.service");
var TableDetailComponent = (function () {
    function TableDetailComponent(tableService, followupService, statusService, route, location) {
        this.tableService = tableService;
        this.followupService = followupService;
        this.statusService = statusService;
        this.route = route;
        this.location = location;
        this.selectedRow = {};
        this.dateFields = [];
        this.followups = [];
        this.newFollowup = new Followup_1.Followup();
        this.myDatePickerOptions = {
            dateFormat: 'dd-mm-yyyy',
            showClearDateBtn: false,
            editableDateField: false,
            width: '100%',
            height: '30px'
        };
    }
    TableDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            _this.row$ = _this.tableService.getTableDetail2(+params['id']);
            return _this.row$;
        })
            .subscribe(function (row) {
            _this.selectedRow = row;
            console.log("ngOnInit");
            _this.fields = _this.extractFieldNames(row);
            for (var _i = 0, _a = _this.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (_this.checkIfDate(_this.selectedRow[field])) {
                    _this.dateFields.push(field);
                    var date = new Date(Date.parse(_this.selectedRow[field]));
                    var parts = _this.selectedRow[field].split('T')[0]; //remove time
                    parts = parts.split('-');
                    console.log("init", parts[0], parts[1], parts[2]);
                    _this.selectedRow[field] = { date: { year: parts[0], month: _this.removeLeadingZero(parts[1]), day: _this.removeLeadingZero(parts[2]) } };
                }
            }
        });
        this.statusService.getStatuses().then(function (statuses) { return _this.statuses = statuses; });
    };
    TableDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    TableDetailComponent.prototype.removeLeadingZero = function (value) {
        return value.indexOf("0") == 0 ? value.split('0')[1] : value;
    };
    TableDetailComponent.prototype.save = function () {
        var _this = this;
        //format date before saving dd-mm-yyyy
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (this.checkIfDateField(field)) {
                var d = this.selectedRow[field];
                var date = d.date.year + '-' + d.date.month + '-' + d.date.day;
                console.log("save", date);
                this.selectedRow[field] = date;
            }
        }
        this.tableService.update(this.selectedRow)
            .then(function () { return _this.goBack(); });
    };
    TableDetailComponent.prototype.onDateChanged = function (event) {
        console.log("onDateChanged", event);
    };
    TableDetailComponent.prototype.extractFieldNames = function (item) {
        return Object.keys(item);
    };
    TableDetailComponent.prototype.checkIfDate = function (value) {
        if (value == true || value == false)
            return false;
        var date = Date.parse(value);
        if (!isNaN(date) && isNaN(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    TableDetailComponent.prototype.checkIfDateField = function (dateToCheck) {
        var result = false;
        for (var _i = 0, _a = this.dateFields; _i < _a.length; _i++) {
            var dateField = _a[_i];
            if (dateField === dateToCheck) {
                result = true;
                break;
            }
        }
        return result;
    };
    TableDetailComponent.prototype.checkIfBoolean = function (value) {
        return typeof (value) === "boolean";
    };
    TableDetailComponent.prototype.convertDate = function (input) {
        var parts = input.split('-');
        if (parts.length == 3) {
            console.log("init", parts[0], parts[1], parts[2]);
            return parts[2] + '-' + parts[1] + '-' + parts[0];
        }
        else {
            console.error("!!! date input cannot be parsed to yyyy-MM-dd");
        }
    };
    TableDetailComponent.prototype.createFollowup = function (followup) {
        var _this = this;
        if (followup.dueDate)
            followup.dueDate = this.convertDate(followup.dueDate['formatted']);
        this.followupService.create(followup, this.selectedRow.id).then(function () {
            return _this.followupService.getFollowups(_this.selectedRow.id);
        }).then(function (followups) {
            console.log("saveNew", followups);
            _this.selectedRow.followups = followups;
        });
    };
    TableDetailComponent.prototype.setToContact = function (t) {
        this.selectedRow.training = t;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableDetailComponent.prototype, "selectedRow", void 0);
    TableDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'table-detail.component.html',
            styleUrls: ['table-detail.component.css']
        }), 
        __metadata('design:paramtypes', [table_service_1.TableService, followup_service_1.FollowupService, status_service_1.StatusService, router_1.ActivatedRoute, common_1.Location])
    ], TableDetailComponent);
    return TableDetailComponent;
}());
exports.TableDetailComponent = TableDetailComponent;
//# sourceMappingURL=table-detail.component.js.map