import { MixpanelEntityBase } from '../MixpanelEntityBase';
import type { MixpanelSDK } from '../MixpanelSDK';
import type { Control } from '../types';
import type { Engage, EngageCreateData } from '../MixpanelTypes';
declare class EngageEntity extends MixpanelEntityBase<Engage> {
    constructor(client: MixpanelSDK, entopts: any);
    make(this: EngageEntity): EngageEntity;
    create(this: any, reqdata?: EngageCreateData, ctrl?: Control): Promise<EngageEntity>;
}
export { EngageEntity };
