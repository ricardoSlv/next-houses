import { NestedFloatFilter } from "../inputs/NestedFloatFilter";
export declare class FloatFilter {
    equals?: number | undefined;
    in?: number[] | undefined;
    notIn?: number[] | undefined;
    lt?: number | undefined;
    lte?: number | undefined;
    gt?: number | undefined;
    gte?: number | undefined;
    not?: NestedFloatFilter | undefined;
}
