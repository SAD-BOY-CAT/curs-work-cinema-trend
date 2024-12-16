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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewService = class ReviewService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getReviewByMovieId(id) {
        const review = await this.prismaService.review.findMany({
            where: {
                movieId: id,
            },
            include: {
                user: true,
            },
        });
        const filterArray = review.map((item) => {
            return {
                ...item,
                user: {
                    id: item.userId,
                    username: item.user.username,
                    picture: item.user.picture,
                },
            };
        });
        return filterArray;
    }
    async createReview(data) {
        const { rating, userId, movieId, content } = data;
        const review = await this.prismaService.review.create({
            data: {
                rating: rating,
                userId: userId,
                movieId: movieId,
                content: content,
            },
        });
        if (!review)
            throw new common_1.BadRequestException();
        return review;
    }
    async deleteReview(data) {
        const { id } = data;
        const review = await this.prismaService.review.delete({
            where: { id: id },
        });
        if (!review)
            throw new common_1.BadRequestException();
        return review;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map