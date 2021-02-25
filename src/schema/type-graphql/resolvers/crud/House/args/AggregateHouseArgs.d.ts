import { HouseOrderByInput } from "../../../inputs/HouseOrderByInput";
import { HouseWhereInput } from "../../../inputs/HouseWhereInput";
import { HouseWhereUniqueInput } from "../../../inputs/HouseWhereUniqueInput";
export declare class AggregateHouseArgs {
    where?: HouseWhereInput | undefined;
    orderBy?: HouseOrderByInput[] | undefined;
    cursor?: HouseWhereUniqueInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
}
