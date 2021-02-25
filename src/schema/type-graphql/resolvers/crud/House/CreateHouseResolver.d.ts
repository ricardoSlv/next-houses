import { CreateHouseArgs } from "./args/CreateHouseArgs";
import { House } from "../../../models/House";
export declare class CreateHouseResolver {
    createHouse(ctx: any, args: CreateHouseArgs): Promise<House>;
}
