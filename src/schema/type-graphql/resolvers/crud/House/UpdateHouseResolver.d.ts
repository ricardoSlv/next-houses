import { UpdateHouseArgs } from "./args/UpdateHouseArgs";
import { House } from "../../../models/House";
export declare class UpdateHouseResolver {
    updateHouse(ctx: any, args: UpdateHouseArgs): Promise<House | null>;
}
