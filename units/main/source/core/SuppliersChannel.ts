import { AppChannel, AllMessages } from '@shared/communication';
import { ActionMessageChannel } from '@/channel/ActionMessageChannel';
import { ChannelError } from '@/channel/exceptions';

import {
    Supplier,
    SupplierInfo,
    RawMaterial
} from '@/entities';
import { orm } from '@/database';
import { Reference } from '@mikro-orm/core';

export class SuppliersChannel extends ActionMessageChannel {
    channelName = AppChannel.Suppliers;

    constructor() {
        super();

        this.registerHandler(
            AllMessages.Supl.AddSupplier,
            async (values) => {
                const requiredKeys: (keyof typeof values)[] = [
                    'addrMail',
                    'addrOffice',
                    'cellphoneNumber',
                    'city',
                    'countryCode',
                    'email',
                    'name',
                    'officeNumber',
                    'state',
                    'zipCode',
                ];

                for (const key of requiredKeys) {
                    if (!values[key])
                        throw new ChannelError("Please fill the complete form");
                }

                const { rawMaterialId, capacity } = values;

                if (capacity <= 0)
                    throw new ChannelError("Invalid capacity");

                const em = orm.em.fork();
                let rawMat: RawMaterial;
                try {
                    rawMat = await em.findOneOrFail(RawMaterial, { id: rawMaterialId });
                }
                catch (e) {
                    throw new ChannelError("Invalid Raw Material");
                }

                const supInfo = orm.em.create(SupplierInfo, {
                    email: values['email'],
                    countryCode: values['countryCode'],
                    state: values['state'],
                    city: values['city'],
                    zipCode: values['zipCode'],
                    cellphoneNumber: values['cellphoneNumber'],
                    officeNumber: values['officeNumber'],
                    addrMail: values['addrMail'],
                    addrOffice: values['addrOffice'],
                    remarks: values['remarks'] || '',
                });

                const supObj = orm.em.create(Supplier, {
                    name: values['name']
                });

                supObj.info = Reference.create(supInfo);

                rawMat.suppliers.add(supObj);
                await em.persistAndFlush(rawMat);
            }
        );

    }
}
