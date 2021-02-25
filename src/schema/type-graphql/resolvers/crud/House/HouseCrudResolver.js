"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseCrudResolver = void 0;
const TypeGraphQL = __importStar(require("type-graphql"));
const graphql_fields_1 = __importDefault(require("graphql-fields"));
const AggregateHouseArgs_1 = require("./args/AggregateHouseArgs");
const CreateHouseArgs_1 = require("./args/CreateHouseArgs");
const DeleteHouseArgs_1 = require("./args/DeleteHouseArgs");
const DeleteManyHouseArgs_1 = require("./args/DeleteManyHouseArgs");
const FindFirstHouseArgs_1 = require("./args/FindFirstHouseArgs");
const FindManyHouseArgs_1 = require("./args/FindManyHouseArgs");
const FindUniqueHouseArgs_1 = require("./args/FindUniqueHouseArgs");
const UpdateHouseArgs_1 = require("./args/UpdateHouseArgs");
const UpdateManyHouseArgs_1 = require("./args/UpdateManyHouseArgs");
const UpsertHouseArgs_1 = require("./args/UpsertHouseArgs");
const helpers_1 = require("../../../helpers");
const House_1 = require("../../../models/House");
const AffectedRowsOutput_1 = require("../../outputs/AffectedRowsOutput");
const AggregateHouse_1 = require("../../outputs/AggregateHouse");
let HouseCrudResolver = class HouseCrudResolver {
    async house(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.findUnique(args);
    }
    async findFirstHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.findFirst(args);
    }
    async houses(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.findMany(args);
    }
    async createHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.create(args);
    }
    async deleteHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.delete(args);
    }
    async updateHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.update(args);
    }
    async deleteManyHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.deleteMany(args);
    }
    async updateManyHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.updateMany(args);
    }
    async upsertHouse(ctx, args) {
        return helpers_1.getPrismaFromContext(ctx).house.upsert(args);
    }
    async aggregateHouse(ctx, info, args) {
        return helpers_1.getPrismaFromContext(ctx).house.aggregate({
            ...args,
            ...helpers_1.transformFields(graphql_fields_1.default(info)),
        });
    }
};
__decorate([
    TypeGraphQL.Query(_returns => House_1.House, {
        nullable: true
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FindUniqueHouseArgs_1.FindUniqueHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "house", null);
__decorate([
    TypeGraphQL.Query(_returns => House_1.House, {
        nullable: true
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FindFirstHouseArgs_1.FindFirstHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "findFirstHouse", null);
__decorate([
    TypeGraphQL.Query(_returns => [House_1.House], {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FindManyHouseArgs_1.FindManyHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "houses", null);
__decorate([
    TypeGraphQL.Mutation(_returns => House_1.House, {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateHouseArgs_1.CreateHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "createHouse", null);
__decorate([
    TypeGraphQL.Mutation(_returns => House_1.House, {
        nullable: true
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DeleteHouseArgs_1.DeleteHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "deleteHouse", null);
__decorate([
    TypeGraphQL.Mutation(_returns => House_1.House, {
        nullable: true
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateHouseArgs_1.UpdateHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "updateHouse", null);
__decorate([
    TypeGraphQL.Mutation(_returns => AffectedRowsOutput_1.AffectedRowsOutput, {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DeleteManyHouseArgs_1.DeleteManyHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "deleteManyHouse", null);
__decorate([
    TypeGraphQL.Mutation(_returns => AffectedRowsOutput_1.AffectedRowsOutput, {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateManyHouseArgs_1.UpdateManyHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "updateManyHouse", null);
__decorate([
    TypeGraphQL.Mutation(_returns => House_1.House, {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpsertHouseArgs_1.UpsertHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "upsertHouse", null);
__decorate([
    TypeGraphQL.Query(_returns => AggregateHouse_1.AggregateHouse, {
        nullable: false
    }),
    __param(0, TypeGraphQL.Ctx()), __param(1, TypeGraphQL.Info()), __param(2, TypeGraphQL.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, AggregateHouseArgs_1.AggregateHouseArgs]),
    __metadata("design:returntype", Promise)
], HouseCrudResolver.prototype, "aggregateHouse", null);
HouseCrudResolver = __decorate([
    TypeGraphQL.Resolver(_of => House_1.House)
], HouseCrudResolver);
exports.HouseCrudResolver = HouseCrudResolver;
