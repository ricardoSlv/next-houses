import { FindFirstHouseArgs } from "./args/FindFirstHouseArgs";
import { House } from "../../../models/House";
export declare class FindFirstHouseResolver {
    findFirstHouse(ctx: any, args: FindFirstHouseArgs): Promise<House | null>;
}
