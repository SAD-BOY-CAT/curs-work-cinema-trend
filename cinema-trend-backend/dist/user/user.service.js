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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const admin = require("firebase-admin");
const uuid_1 = require("uuid");
const serviceAccount = require("../config/cinema-trend-firebase-adminsdk-neitk-a1670b9956.json");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: 'cinema-trend.appspot.com',
        });
        this.bucket = admin.storage().bucket();
    }
    async findOne(email) {
        return await this.prismaService.user.findFirst({
            where: { email },
        });
    }
    async create(data) {
        const { email, password } = data;
        return await this.prismaService.user.create({
            data: { email, password },
        });
    }
    async update(data, userId, fileBuffer) {
        if (fileBuffer) {
            const pictureUrl = await this.uploadAvatar(fileBuffer);
            const user = await this.prismaService.user.update({
                where: { id: userId },
                data: { picture: pictureUrl, ...data },
            });
            if (!user)
                throw new common_1.BadRequestException();
            return {
                username: user.username,
                gender: user.gender,
                date: user.date,
                picture: user.picture,
            };
        }
        else {
            const { username, gender, date } = data;
            const user = await this.prismaService.user.update({
                where: { id: userId },
                data: { username, gender, date },
            });
            if (!user)
                throw new common_1.BadRequestException();
            return {
                username: user.username,
                gender: user.gender,
                date: user.date,
                picture: user.picture,
            };
        }
    }
    async uploadAvatar(fileBuffer) {
        const fileName = `users/${(0, uuid_1.v4)()}.jpg`;
        const firebaseFile = this.bucket.file(fileName);
        await firebaseFile.save(fileBuffer, {
            metadata: {
                contentType: 'image/jpeg',
            },
        });
        await firebaseFile.makePublic();
        return `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map