import { GraphQLResolveInfo } from "graphql";
import { AggregateHouseArgs } from "./args/AggregateHouseArgs";
import { CreateHouseArgs } from "./args/CreateHouseArgs";
import { DeleteHouseArgs } from "./args/DeleteHouseArgs";
import { DeleteManyHouseArgs } from "./args/DeleteManyHouseArgs";
import { FindFirstHouseArgs } from "./args/FindFirstHouseArgs";
import { FindManyHouseArgs } from "./args/FindManyHouseArgs";
import { FindUniqueHouseArgs } from "./args/FindUniqueHouseArgs";
import { UpdateHouseArgs } from "./args/UpdateHouseArgs";
import { UpdateManyHouseArgs } from "./args/UpdateManyHouseArgs";
import { UpsertHouseArgs } from "./args/UpsertHouseArgs";
import { House } from "../../../models/House";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateHouse } from "../../outputs/AggregateHouse";
export declare class HouseCrudResolver {
    house(ctx: any, args: FindUniqueHouseArgs): Promise<House | null>;
    findFirstHouse(ctx: any, args: FindFirstHouseArgs): Promise<House | null>;
    houses(ctx: any, args: FindManyHouseArgs): Promise<House[]>;
    createHouse(ctx: any, args: CreateHouseArgs): Promise<House>;
    deleteHouse(ctx: any, args: DeleteHouseArgs): Promise<House | null>;
    updateHouse(ctx: any, args: UpdateHouseArgs): Promise<House | null>;
    deleteManyHouse(ctx: any, args: DeleteManyHouseArgs): Promise<AffectedRowsOutput>;
    updateManyHouse(ctx: any, args: UpdateManyHouseArgs): Promise<AffectedRowsOutput>;
    upsertHouse(ctx: any, args: UpsertHouseArgs): Promise<House>;
    aggregateHouse(ctx: any, info: GraphQLResolveInfo, args: AggregateHouseArgs): Promise<AggregateHouse>;
}
