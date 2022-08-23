"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareForInline = void 0;
const react_1 = __importDefault(require("react"));
const aurelia_1 = require("aurelia");
exports.prepareForInline = (storyFn, { args, component }) => {
    const story = storyFn();
    const el = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
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
        aurelia
            .app({
            host: el,
            component: app,
        })
            .start();
        return () => {
            aurelia.stop();
        };
    });
    return react_1.default.createElement('div', null, react_1.default.createElement('div', { ref: el }));
};
