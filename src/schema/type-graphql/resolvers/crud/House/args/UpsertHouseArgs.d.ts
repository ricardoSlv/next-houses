import { HouseCreateInput } from "../../../inputs/HouseCreateInput";
import { HouseUpdateInput } from "../../../inputs/HouseUpdateInput";
import { HouseWhereUniqueInput } from "../../../inputs/HouseWhereUniqueInput";
export declare class UpsertHouseArgs {
    where: HouseWhereUniqueInput;
    create: HouseCreateInput;
    update: HouseUpdateInput;
}
