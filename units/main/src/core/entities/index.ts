import { SimpleEntitySchema } from './SimpleEntity';
import { RMCategory, RMCategorySchema } from './RMCategory';
import { RawMaterial, RawMaterialSchema } from './RawMaterial';

const allEntities = [
    SimpleEntitySchema,
    RMCategorySchema,
    RawMaterialSchema
];

export default allEntities;

export {
    RMCategory,
    RawMaterial
}
