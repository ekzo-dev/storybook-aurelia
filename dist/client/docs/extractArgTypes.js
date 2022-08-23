"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractArgTypes = void 0;
const metadata_1 = require("./metadata");
const shouldEncode = (obj) => obj.toString() === '[object Object]' || Array.isArray(obj);
exports.extractArgTypes = (component) => {
    if (component) {
        const bindables = metadata_1.getComponentBindables(component);
        const astData = metadata_1.getComponentAstData(component, bindables.map((bindable) => bindable.property));
        return bindables.reduce((acc, bindable) => {
            // get all available metadata
            const tsType = metadata_1.getPropertyType(component, bindable.property);
            const propAstData = astData[bindable.property] || {};
            // get default value
            const { defaultValue } = propAstData;
            // determine data type
            let type = tsType;
            if (type === 'object' && defaultValue !== undefined) {
                type = metadata_1.getTypeFromValue(defaultValue);
            }
            // determine appropriate control or action
            const control = type && type !== 'function'
                ? {
                    type: type === 'string' ? 'text' : type,
                }
                : undefined;
            const action = type === 'function' ? bindable.property : undefined;
            acc[bindable.attribute] = {
                name: bindable.attribute,
                defaultValue,
                table: {
                    type: type ? { summary: type } : undefined,
                    defaultValue: defaultValue !== undefined
                        ? {
                            summary: shouldEncode(defaultValue) ? JSON.stringify(defaultValue) : defaultValue,
                        }
                        : undefined,
                },
                control,
                action,
            };
            return acc;
        }, {});
    }
    return null;
};
