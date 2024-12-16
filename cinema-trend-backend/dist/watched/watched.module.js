"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchedModule = void 0;
const common_1 = require("@nestjs/common");
const watched_service_1 = require("./watched.service");
const watched_controller_1 = require("./watched.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const movie_module_1 = require("../movie/movie.module");
let WatchedModule = class WatchedModule {
};
exports.WatchedModule = WatchedModule;
exports.WatchedModule = WatchedModule = __decorate([
    (0, common_1.Module)({
        imports: [movie_module_1.MovieModule],
        controllers: [watched_controller_1.WatchedController],
        providers: [watched_service_1.WatchedService, prisma_service_1.PrismaService],
    })
], WatchedModule);
//# sourceMappingURL=watched.module.js.map