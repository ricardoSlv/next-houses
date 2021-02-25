import { HouseAvgAggregate } from "../outputs/HouseAvgAggregate";
import { HouseCountAggregate } from "../outputs/HouseCountAggregate";
import { HouseMaxAggregate } from "../outputs/HouseMaxAggregate";
import { HouseMinAggregate } from "../outputs/HouseMinAggregate";
import { HouseSumAggregate } from "../outputs/HouseSumAggregate";
export declare class AggregateHouse {
    count: HouseCountAggregate | null;
    avg: HouseAvgAggregate | null;
    sum: HouseSumAggregate | null;
    min: HouseMinAggregate | null;
    max: HouseMaxAggregate | null;
}
