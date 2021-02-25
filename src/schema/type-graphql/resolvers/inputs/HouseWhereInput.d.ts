import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
export declare class HouseWhereInput {
    AND?: HouseWhereInput[] | undefined;
    OR?: HouseWhereInput[] | undefined;
    NOT?: HouseWhereInput[] | undefined;
    id?: IntFilter | undefined;
    userId?: StringFilter | undefined;
    image?: StringFilter | undefined;
    latitude?: FloatFilter | undefined;
    longitude?: FloatFilter | undefined;
    address?: StringFilter | undefined;
    bedrooms?: IntFilter | undefined;
    createdAt?: DateTimeFilter | undefined;
    updatedAt?: DateTimeFilter | undefined;
}
