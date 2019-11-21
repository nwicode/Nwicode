import { h } from '../ionic.core.js';

import { d as hostContext } from './chunk-7c632336.js';
import { d as findItemLabel, e as renderHiddenInput } from './chunk-6d7d2f8c.js';

class Select {
    constructor() {
        this.childOpts = [];
        this.inputId = `ion-sel-${selectIds++}`;
        this.didInit = false;
        this.isExpanded = false;
        this.disabled = false;
        this.cancelText = 'Cancel';
        this.okText = 'OK';
        this.name = this.inputId;
        this.multiple = false;
        this.interface = 'alert';
        this.interfaceOptions = {};
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onBlur = () => {
            this.ionBlur.emit();
        };
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        if (this.didInit) {
            this.updateOptions();
            this.ionChange.emit({
                value: this.value,
            });
            this.emitStyle();
        }
    }
    async selectOptionChanged() {
        await this.loadOptions();
        if (this.didInit) {
            this.updateOptions();
        }
    }
    onClick(ev) {
        this.setFocus();
        this.open(ev);
    }
    async componentDidLoad() {
        await this.loadOptions();
        if (this.value === undefined) {
            if (this.multiple) {
                const checked = this.childOpts.filter(o => o.selected);
                this.value = checked.map(o => o.value);
            }
            else {
                const checked = this.childOpts.find(o => o.selected);
                if (checked) {
                    this.value = checked.value;
                }
            }
        }
        this.updateOptions();
        this.emitStyle();
        this.el.forceUpdate();
        this.didInit = true;
    }
    async open(ev) {
        if (this.disabled || this.isExpanded) {
            return undefined;
        }
        const overlay = this.overlay = await this.createOverlay(ev);
        this.isExpanded = true;
        overlay.onDidDismiss().then(() => {
            this.overlay = undefined;
            this.isExpanded = false;
            this.setFocus();
        });
        await overlay.present();
        return overlay;
    }
    createOverlay(ev) {
        let selectInterface = this.interface;
        if ((selectInterface === 'action-sheet' || selectInterface === 'popover') && this.multiple) {
            console.warn(`Select interface cannot be "${selectInterface}" with a multi-value select. Using the "alert" interface instead.`);
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover' && !ev) {
            console.warn('Select interface cannot be a "popover" without passing an event. Using the "alert" interface instead.');
            selectInterface = 'alert';
        }
        if (selectInterface === 'popover') {
            return this.openPopover(ev);
        }
        if (selectInterface === 'action-sheet') {
            return this.openActionSheet();
        }
        return this.openAlert();
    }
    async openPopover(ev) {
        const interfaceOptions = this.interfaceOptions;
        const popoverOpts = Object.assign({ mode: this.mode }, interfaceOptions, { component: 'ion-select-popover', cssClass: ['select-popover', interfaceOptions.cssClass], event: ev, componentProps: {
                header: interfaceOptions.header,
                subHeader: interfaceOptions.subHeader,
                message: interfaceOptions.message,
                value: this.value,
                options: this.childOpts.map(o => {
                    return {
                        text: o.textContent,
                        value: o.value,
                        checked: o.selected,
                        disabled: o.disabled,
                        handler: () => {
                            this.value = o.value;
                            this.close();
                        }
                    };
                })
            } });
        return this.popoverCtrl.create(popoverOpts);
    }
    async openActionSheet() {
        const actionSheetButtons = this.childOpts.map(option => {
            return {
                role: (option.selected ? 'selected' : ''),
                text: option.textContent,
                handler: () => {
                    this.value = option.value;
                }
            };
        });
        actionSheetButtons.push({
            text: this.cancelText,
            role: 'cancel',
            handler: () => {
                this.ionCancel.emit();
            }
        });
        const interfaceOptions = this.interfaceOptions;
        const actionSheetOpts = Object.assign({ mode: this.mode }, interfaceOptions, { buttons: actionSheetButtons, cssClass: ['select-action-sheet', interfaceOptions.cssClass] });
        return this.actionSheetCtrl.create(actionSheetOpts);
    }
    async openAlert() {
        const label = this.getLabel();
        const labelText = (label) ? label.textContent : null;
        const interfaceOptions = this.interfaceOptions;
        const inputType = (this.multiple ? 'checkbox' : 'radio');
        const alertOpts = Object.assign({ mode: this.mode }, interfaceOptions, { header: interfaceOptions.header ? interfaceOptions.header : labelText, inputs: this.childOpts.map(o => {
                return {
                    type: inputType,
                    label: o.textContent,
                    value: o.value,
                    checked: o.selected,
                    disabled: o.disabled
                };
            }), buttons: [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: () => {
                        this.ionCancel.emit();
                    }
                },
                {
                    text: this.okText,
                    handler: (selectedValues) => {
                        this.value = selectedValues;
                    }
                }
            ], cssClass: ['select-alert', interfaceOptions.cssClass,
                (this.multiple ? 'multiple-select-alert' : 'single-select-alert')] });
        return this.alertCtrl.create(alertOpts);
    }
    close() {
        if (!this.overlay) {
            return Promise.resolve(false);
        }
        return this.overlay.dismiss();
    }
    async loadOptions() {
        this.childOpts = await Promise.all(Array.from(this.el.querySelectorAll('ion-select-option')).map(o => o.componentOnReady()));
    }
    updateOptions() {
        let canSelect = true;
        for (const selectOption of this.childOpts) {
            const selected = canSelect && isOptionSelected(this.value, selectOption.value);
            selectOption.selected = selected;
            if (selected && !this.multiple) {
                canSelect = false;
            }
        }
    }
    getLabel() {
        return findItemLabel(this.el);
    }
    hasValue() {
        return this.getText() !== '';
    }
    getText() {
        const selectedText = this.selectedText;
        if (selectedText != null && selectedText !== '') {
            return selectedText;
        }
        return generateText(this.childOpts, this.value);
    }
    setFocus() {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            'interactive': true,
            'select': true,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'interactive-disabled': this.disabled,
            'select-disabled': this.disabled
        });
    }
    hostData() {
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return {
            'role': 'combobox',
            'aria-disabled': this.disabled ? 'true' : null,
            'aria-expanded': `${this.isExpanded}`,
            'aria-haspopup': 'dialog',
            'aria-labelledby': labelId,
            class: {
                'in-item': hostContext('ion-item', this.el),
                'select-disabled': this.disabled,
            }
        };
    }
    render() {
        renderHiddenInput(true, this.el, this.name, parseValue(this.value), this.disabled);
        const labelId = this.inputId + '-lbl';
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        let addPlaceholderClass = false;
        let selectText = this.getText();
        if (selectText === '' && this.placeholder != null) {
            selectText = this.placeholder;
            addPlaceholderClass = true;
        }
        const selectTextClasses = {
            'select-text': true,
            'select-placeholder': addPlaceholderClass
        };
        return [
            h("div", { class: selectTextClasses }, selectText),
            h("div", { class: "select-icon", role: "presentation" },
                h("div", { class: "select-icon-inner" })),
            h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: (el => this.buttonEl = el) })
        ];
    }
    static get is() { return "ion-select"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "actionSheetCtrl": {
            "connect": "ion-action-sheet-controller"
        },
        "alertCtrl": {
            "connect": "ion-alert-controller"
        },
        "cancelText": {
            "type": String,
            "attr": "cancel-text"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "interface": {
            "type": String,
            "attr": "interface"
        },
        "interfaceOptions": {
            "type": "Any",
            "attr": "interface-options"
        },
        "isExpanded": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "okText": {
            "type": String,
            "attr": "ok-text"
        },
        "open": {
            "method": true
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "popoverCtrl": {
            "connect": "ion-popover-controller"
        },
        "selectedText": {
            "type": String,
            "attr": "selected-text"
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true,
            "watchCallbacks": ["valueChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionCancel",
            "method": "ionCancel",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionSelectOptionDidLoad",
            "method": "selectOptionChanged"
        }, {
            "name": "ionSelectOptionDidUnload",
            "method": "selectOptionChanged"
        }, {
            "name": "click",
            "method": "onClick"
        }]; }
    static get style() { return ":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;font-family:var(--ion-font-family,inherit);overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static;max-width:45%}:host(.select-disabled){opacity:.4;pointer-events:none}:host(.ion-focused) button{border:2px solid #5e9ed6}.select-placeholder{color:currentColor;opacity:.33}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:initial;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button{right:0}button::-moz-focus-inner{border:0}.select-icon{position:relative}.select-text{-ms-flex:1;flex:1;min-width:16px;font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.select-icon-inner{left:5px;top:50%;margin-top:-3px;position:absolute;width:0;height:0;border-top:5px solid;border-right:5px solid transparent;border-left:5px solid transparent;color:currentColor;opacity:.33;pointer-events:none}:host-context([dir=rtl]) .select-icon-inner{right:5px}:host{--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}.select-icon{width:12px;height:18px}"; }
    static get styleMode() { return "ios"; }
}
function parseValue(value) {
    if (value == null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value.join(',');
    }
    return value.toString();
}
function isOptionSelected(currentValue, optionValue) {
    if (currentValue === undefined) {
        return false;
    }
    if (Array.isArray(currentValue)) {
        return currentValue.includes(optionValue);
    }
    else {
        return currentValue === optionValue;
    }
}
function generateText(opts, value) {
    if (value === undefined) {
        return '';
    }
    if (Array.isArray(value)) {
        return value
            .map(v => textForValue(opts, v))
            .filter(opt => opt !== null)
            .join(', ');
    }
    else {
        return textForValue(opts, value) || '';
    }
}
function textForValue(opts, value) {
    const selectOpt = opts.find(opt => opt.value === value);
    return selectOpt
        ? selectOpt.textContent
        : null;
}
let selectIds = 0;

class SelectOption {
    constructor() {
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        this.disabled = false;
        this.selected = false;
    }
    componentWillLoad() {
        if (this.value === undefined) {
            this.value = this.el.textContent || '';
        }
    }
    componentDidLoad() {
        this.ionSelectOptionDidLoad.emit();
    }
    componentDidUnload() {
        this.ionSelectOptionDidUnload.emit();
    }
    hostData() {
        return {
            'role': 'option',
            'id': this.inputId
        };
    }
    static get is() { return "ion-select-option"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "selected": {
            "type": Boolean,
            "attr": "selected"
        },
        "value": {
            "type": "Any",
            "attr": "value",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "ionSelectOptionDidLoad",
            "method": "ionSelectOptionDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionSelectOptionDidUnload",
            "method": "ionSelectOptionDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host{display:none}"; }
}
let selectOptionIds = 0;

class SelectPopover {
    constructor() {
        this.options = [];
    }
    onSelect(ev) {
        const option = this.options.find(o => o.value === ev.target.value);
        if (option && option.handler) {
            option.handler();
        }
    }
    render() {
        return (h("ion-list", null,
            this.header !== undefined && h("ion-list-header", null, this.header),
            (this.subHeader !== undefined || this.message !== undefined) &&
                h("ion-item", null,
                    h("ion-label", { "text-wrap": true },
                        this.subHeader !== undefined && h("h3", null, this.subHeader),
                        this.message !== undefined && h("p", null, this.message))),
            h("ion-radio-group", null, this.options.map(option => h("ion-item", null,
                h("ion-label", null, option.text),
                h("ion-radio", { checked: option.checked, value: option.value, disabled: option.disabled }))))));
    }
    static get is() { return "ion-select-popover"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "header": {
            "type": String,
            "attr": "header"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "options": {
            "type": "Any",
            "attr": "options"
        },
        "subHeader": {
            "type": String,
            "attr": "sub-header"
        }
    }; }
    static get listeners() { return [{
            "name": "ionSelect",
            "method": "onSelect"
        }]; }
    static get style() { return ".sc-ion-select-popover-h   ion-list.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:-1px;margin-bottom:-1px}.sc-ion-select-popover-h   ion-label.sc-ion-select-popover, .sc-ion-select-popover-h   ion-list-header.sc-ion-select-popover{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}"; }
}

export { Select as IonSelect, SelectOption as IonSelectOption, SelectPopover as IonSelectPopover };
