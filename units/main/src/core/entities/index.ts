import { SimpleEntitySchema } from './SimpleEntity';
import { RMCategory, RMCategorySchema } from './RMCategory';
import { RawMaterial, RawMaterialSchema } from './RawMaterial';
import { Supplier, SupplierSchema } from './Supplier';
import { SupplierInfo, SupplierInfoSchema } from './SupplierInfo';

const allEntities = [
    SimpleEntitySchema,
    RMCategorySchema,
    RawMaterialSchema,
    SupplierSchema,
    SupplierInfoSchema,
];

export default allEntities;

export {
    RMCategory,
    RawMaterial,
    Supplier,
    SupplierInfo,
}
