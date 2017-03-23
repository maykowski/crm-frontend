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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
var TableService = (function () {
    function TableService(http, route) {
        this.http = http;
        this.route = route;
        this.tableDetUrl = 'http://localhost:8080/contacts'; // URL to web api
        // getHeroesSlowly(): Promise<Hero[]> {
        //   return new Promise(resolve => {
        //     // Simulate server latency with 2 second delay
        //     setTimeout(() => resolve(this.getHeroes()), 2000);
        //   });
        // }
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TableService.prototype.getTableDetail = function (id) {
        var url = this.tableDetUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TableService.prototype.getTableDetail2 = function (id) {
        var url = this.tableDetUrl + "/" + id;
        return this.http.get(url).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // getTable(): Promise<any[]> {
    //   return this.http.get(this.tableDetUrl)
    //     .toPromise()
    //     .then(response => response.json())
    //     .catch(this.handleError);
    // }
    TableService.prototype.getTable = function (page, size) {
        var params = new http_1.URLSearchParams();
        params.set('page', String(page - 1));
        params.set('size', String(size));
        var requestOptions = new http_1.RequestOptions();
        requestOptions.search = params;
        return this.http.get(this.tableDetUrl, requestOptions)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TableService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TableService.prototype.update = function (row) {
        var url = this.tableDetUrl + "/" + row.id;
        return this.http
            .put(url, JSON.stringify(row), { headers: this.headers })
            .toPromise()
            .then(function () { return row; })
            .catch(this.handleError);
    };
    TableService.prototype.create = function (name) {
        return this.http
            .post(this.tableDetUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    TableService.prototype.delete = function (id) {
        var url = this.tableDetUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    TableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], TableService);
    return TableService;
}());
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map