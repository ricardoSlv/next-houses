import { FindManyHouseArgs } from "./args/FindManyHouseArgs";
import { House } from "../../../models/House";
export declare class FindManyHouseResolver {
    houses(ctx: any, args: FindManyHouseArgs): Promise<House[]>;
}
