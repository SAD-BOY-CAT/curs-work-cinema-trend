"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModule = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_controller_1 = require("./movie.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const favorite_module_1 = require("../favorite/favorite.module");
let MovieModule = class MovieModule {
};
exports.MovieModule = MovieModule;
exports.MovieModule = MovieModule = __decorate([
    (0, common_1.Module)({
        controllers: [movie_controller_1.MovieController],
        providers: [movie_service_1.MovieService, prisma_service_1.PrismaService],
        exports: [movie_service_1.MovieService],
        imports: [(0, common_1.forwardRef)(() => favorite_module_1.FavoriteModule)],
    })
], MovieModule);
//# sourceMappingURL=movie.module.js.map