import { HouseOrderByInput } from "../../../inputs/HouseOrderByInput";
import { HouseWhereInput } from "../../../inputs/HouseWhereInput";
import { HouseWhereUniqueInput } from "../../../inputs/HouseWhereUniqueInput";
export declare class FindManyHouseArgs {
    where?: HouseWhereInput | undefined;
    orderBy?: HouseOrderByInput[] | undefined;
    cursor?: HouseWhereUniqueInput | undefined;
    take?: number | undefined;
    skip?: number | undefined;
    distinct?: Array<"id" | "userId" | "image" | "latitude" | "longitude" | "address" | "bedrooms" | "createdAt" | "updatedAt"> | undefined;
}
