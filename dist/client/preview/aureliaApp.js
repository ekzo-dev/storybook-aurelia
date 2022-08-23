"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAureliaApp = void 0;
const aurelia_1 = require("aurelia");
function createAureliaApp(story, component, args, domElement) {
    var _a, _b, _c;
    const aurelia = new aurelia_1.Aurelia(story.container);
    if ((_a = story.items) === null || _a === void 0 ? void 0 : _a.length) {
        aurelia.register(...story.items);
    }
    if ((_b = story.components) === null || _b === void 0 ? void 0 : _b.length) {
        aurelia.register(...story.components);
    }
    let { template } = story;
    if (component) {
        const def = aurelia_1.CustomElement.getDefinition(component);
        const innerHtml = (_c = story.props.innerHtml) !== null && _c !== void 0 ? _c : '';
        template = template !== null && template !== void 0 ? template : `<${def.name} ${Object.values(def.bindables)
            .map((bindable) => `${bindable.attribute}.bind="${bindable.property}"`)
            .join(' ')}>${innerHtml}</${def.name}>`;
        aurelia.register(component);
    }
    const App = aurelia_1.CustomElement.define({ name: 'sb-app', template }, class {
    });
    const app = Object.assign(new App(), args);
    return aurelia.app({
        host: domElement,
        component: app,
    });
}
exports.createAureliaApp = createAureliaApp;
