"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderToDOM = void 0;
const aurelia_1 = require("aurelia");
let aurelia;
function renderToDOM({ storyFn, kind, name, showMain, showError, forceRemount, storyContext: { parameters, component }, }, domElement) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const story = storyFn();
        if (!story) {
            showError({
                title: `Expecting an Aurelia component from the story: "${name}" of "${kind}".`,
                description: `
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<custom-component></custom-component>' })" when defining the story.
      `,
            });
        }
        showMain();
        if (!aurelia || forceRemount) {
            if (aurelia) {
                yield aurelia.stop();
            }
            aurelia = new aurelia_1.Aurelia(story.container);
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
            const app = Object.assign(new App(), Object.assign(Object.assign({}, parameters.args), story.props));
            yield aurelia
                .app({
                host: domElement,
                component: app,
            })
                .start();
        }
        else {
            Object.assign(aurelia.root.controller.viewModel, story.props);
        }
    });
}
exports.renderToDOM = renderToDOM;
