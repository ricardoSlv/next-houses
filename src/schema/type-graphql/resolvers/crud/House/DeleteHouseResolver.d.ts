import { DeleteHouseArgs } from "./args/DeleteHouseArgs";
import { House } from "../../../models/House";
export declare class DeleteHouseResolver {
    deleteHouse(ctx: any, args: DeleteHouseArgs): Promise<House | null>;
}
