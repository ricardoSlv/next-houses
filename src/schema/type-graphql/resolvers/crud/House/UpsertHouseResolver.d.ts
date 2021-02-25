import { UpsertHouseArgs } from "./args/UpsertHouseArgs";
import { House } from "../../../models/House";
export declare class UpsertHouseResolver {
    upsertHouse(ctx: any, args: UpsertHouseArgs): Promise<House>;
}
