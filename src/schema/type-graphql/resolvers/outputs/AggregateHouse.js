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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateHouse = void 0;
const TypeGraphQL = __importStar(require("type-graphql"));
const HouseAvgAggregate_1 = require("../outputs/HouseAvgAggregate");
const HouseCountAggregate_1 = require("../outputs/HouseCountAggregate");
const HouseMaxAggregate_1 = require("../outputs/HouseMaxAggregate");
const HouseMinAggregate_1 = require("../outputs/HouseMinAggregate");
const HouseSumAggregate_1 = require("../outputs/HouseSumAggregate");
let AggregateHouse = class AggregateHouse {
};
__decorate([
    TypeGraphQL.Field(_type => HouseCountAggregate_1.HouseCountAggregate, {
        nullable: true
    }),
    __metadata("design:type", HouseCountAggregate_1.HouseCountAggregate)
], AggregateHouse.prototype, "count", void 0);
__decorate([
    TypeGraphQL.Field(_type => HouseAvgAggregate_1.HouseAvgAggregate, {
        nullable: true
    }),
    __metadata("design:type", HouseAvgAggregate_1.HouseAvgAggregate)
], AggregateHouse.prototype, "avg", void 0);
__decorate([
    TypeGraphQL.Field(_type => HouseSumAggregate_1.HouseSumAggregate, {
        nullable: true
    }),
    __metadata("design:type", HouseSumAggregate_1.HouseSumAggregate)
], AggregateHouse.prototype, "sum", void 0);
__decorate([
    TypeGraphQL.Field(_type => HouseMinAggregate_1.HouseMinAggregate, {
        nullable: true
    }),
    __metadata("design:type", HouseMinAggregate_1.HouseMinAggregate)
], AggregateHouse.prototype, "min", void 0);
__decorate([
    TypeGraphQL.Field(_type => HouseMaxAggregate_1.HouseMaxAggregate, {
        nullable: true
    }),
    __metadata("design:type", HouseMaxAggregate_1.HouseMaxAggregate)
], AggregateHouse.prototype, "max", void 0);
AggregateHouse = __decorate([
    TypeGraphQL.ObjectType({
        isAbstract: true
    })
], AggregateHouse);
exports.AggregateHouse = AggregateHouse;
