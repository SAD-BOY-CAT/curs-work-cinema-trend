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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedController = void 0;
const common_1 = require("@nestjs/common");
const watched_service_1 = require("./watched.service");
const auth_guard_1 = require("../auth/auth.guard");
let WatchedController = class WatchedController {
    constructor(watcheadService) {
        this.watcheadService = watcheadService;
    }
    async getWatched(req) {
        return await this.watcheadService.getWatched(Number(req.user.sub));
    }
    async create(data, req) {
        return await this.watcheadService.createWatched(Number(req.user.sub), data.movieId);
    }
};
exports.WatchedController = WatchedController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WatchedController.prototype, "getWatched", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WatchedController.prototype, "create", null);
exports.WatchedController = WatchedController = __decorate([
    (0, common_1.Controller)('watched'),
    __metadata("design:paramtypes", [watched_service_1.WatchedService])
], WatchedController);
//# sourceMappingURL=watched.controller.js.map