"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeFromValue = exports.getPropertyType = exports.getComponentAstData = exports.getComponentBindables = void 0;
const recast = __importStar(require("recast"));
const aurelia_1 = require("aurelia");
exports.getComponentBindables = (component) => {
    const def = aurelia_1.CustomElement.getDefinition(component);
    return Object.values(def.bindables);
};
exports.getComponentAstData = (component, properties) => {
    const source = component.prototype.constructor.toString();
    const data = {};
    let lastProperty;
    recast.visit(recast.parse(source), {
        visitAssignmentExpression: ({ value }) => {
            const { left, right } = value;
            if (left.type === 'MemberExpression' &&
                left.object.type === 'ThisExpression' &&
                ['Literal', 'ObjectExpression', 'ArrayExpression'].includes(right.type)) {
                const { name } = left.property;
                if (properties.includes(name)) {
                    const defaultValue = right.type === 'Literal'
                        ? right.value
                        : JSON.parse(recast.print(right).code);
                    data[name] = {
                        defaultValue,
                    };
                    lastProperty = name;
                }
                else {
                    lastProperty = undefined;
                }
            }
            // return false to stop at this depth
            return false;
        },
        visitComment: ({ value }) => {
            if (lastProperty) {
                data[lastProperty].comment = value.value;
            }
            // return false to stop at this depth
            return false;
        },
    });
    return data;
};
exports.getPropertyType = (component, property) => {
    const metadata = Reflect.getMetadata('design:type', component.prototype, property);
    let type;
    switch (metadata) {
        case String:
        case Boolean:
        case Number:
        case Object:
        case Function:
        case Array:
            type = metadata.name.toLowerCase();
            break;
        default:
    }
    return type;
};
exports.getTypeFromValue = (value) => {
    if (Array.isArray(value)) {
        return 'array';
    }
    return typeof value;
};
