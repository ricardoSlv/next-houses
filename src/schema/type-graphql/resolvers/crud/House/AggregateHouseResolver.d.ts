import { GraphQLResolveInfo } from "graphql";
import { AggregateHouseArgs } from "./args/AggregateHouseArgs";
import { AggregateHouse } from "../../outputs/AggregateHouse";
export declare class AggregateHouseResolver {
    aggregateHouse(ctx: any, info: GraphQLResolveInfo, args: AggregateHouseArgs): Promise<AggregateHouse>;
}
