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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const favorite_service_1 = require("./favorite.service");
const auth_guard_1 = require("../auth/auth.guard");
const favorite_dto_1 = require("./favorite.dto");
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    async getFavorites(req) {
        return await this.favoriteService.getFavorites(Number(req.user.sub));
    }
    async createFavorite(data, req) {
        return await this.favoriteService.createFavorites(Number(req.user.sub), data.movieId);
    }
    async deleteFavoriteDto(data, req) {
        return await this.favoriteService.deleteFavorites(Number(data.movieId), Number(req.user.sub));
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.CreateFavoriteDto, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "createFavorite", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_dto_1.DeleteFavoriteDto, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "deleteFavoriteDto", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, common_1.Controller)('favorite'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map