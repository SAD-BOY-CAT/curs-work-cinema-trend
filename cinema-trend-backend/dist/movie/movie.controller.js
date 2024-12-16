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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const auth_guard_1 = require("../auth/auth.guard");
const role_guard_1 = require("../auth/role/role.guard");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const client_1 = require("@prisma/client");
const movie_dto_1 = require("./movie.dto");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async getMain(req) {
        return await this.movieService.getMainMovies(Number(req.user.sub));
    }
    async getMovieByGanre(genre, req) {
        return await this.movieService.getMoviesByGenre(genre, Number(req.user.sub));
    }
    async getMovieById(id, req) {
        return await this.movieService.getMovieById(Number(id), Number(req.user.sub));
    }
    async getMovieBySearch(keyword, req) {
        return await this.movieService.getMoviesBySearch(keyword, Number(req.user.sub));
    }
    async createMovie(data) {
        await this.movieService.createMovie(data);
    }
    async deleteMovie(id) {
        await this.movieService.deleteMovieById(id);
    }
    async updateMovie(data) {
        await this.movieService.updateMovieById(data);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Get)('main'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMain", null);
__decorate([
    (0, common_1.Get)('genre'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('genre')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieByGanre", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieById", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('keyword')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieBySearch", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, roles_decorator_1.Roles)(client_1.Role.MODERATOR),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)(client_1.Role.MODERATOR),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "deleteMovie", null);
__decorate([
    (0, common_1.Put)(),
    (0, roles_decorator_1.Roles)(client_1.Role.MODERATOR),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "updateMovie", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map