import { FindUniqueHouseArgs } from "./args/FindUniqueHouseArgs";
import { House } from "../../../models/House";
export declare class FindUniqueHouseResolver {
    house(ctx: any, args: FindUniqueHouseArgs): Promise<House | null>;
}
