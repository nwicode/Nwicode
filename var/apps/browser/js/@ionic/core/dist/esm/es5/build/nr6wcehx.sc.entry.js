import{h}from"../ionic.core.js";import{c as createColorClasses,d as hostContext}from"./chunk-7c632336.js";import{d as findItemLabel}from"./chunk-6d7d2f8c.js";var Radio=function(){function e(){var e=this;this.inputId="ion-rb-"+radioButtonIds++,this.name=this.inputId,this.disabled=!1,this.checked=!1,this.onFocus=function(){e.ionFocus.emit()},this.onBlur=function(){e.ionBlur.emit()}}return e.prototype.colorChanged=function(){this.emitStyle()},e.prototype.checkedChanged=function(e){e&&this.ionSelect.emit({checked:!0,value:this.value}),this.emitStyle()},e.prototype.disabledChanged=function(){this.emitStyle()},e.prototype.componentWillLoad=function(){void 0===this.value&&(this.value=this.inputId),this.emitStyle()},e.prototype.componentDidLoad=function(){this.ionRadioDidLoad.emit()},e.prototype.componentDidUnload=function(){this.ionRadioDidUnload.emit()},e.prototype.onClick=function(){this.checked?this.ionDeselect.emit():this.checked=!0},e.prototype.emitStyle=function(){this.ionStyle.emit({"radio-checked":this.checked,"interactive-disabled":this.disabled})},e.prototype.hostData=function(){var e=this,t=e.disabled,o=e.checked,i=e.color,n=e.el,a=e.inputId+"-lbl",l=findItemLabel(n);return l&&(l.id=a),{role:"radio","aria-disabled":t?"true":null,"aria-checked":""+o,"aria-labelledby":a,class:Object.assign({},createColorClasses(i),{"in-item":hostContext("ion-item",n),interactive:!0,"radio-checked":o,"radio-disabled":t})}},e.prototype.render=function(){return[h("div",{class:"radio-icon"},h("div",{class:"radio-inner"})),h("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled})]},Object.defineProperty(e,"is",{get:function(){return"ion-radio"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color",watchCallbacks:["colorChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},value:{type:"Any",attr:"value",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionRadioDidLoad",method:"ionRadioDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRadioDidUnload",method:"ionRadioDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionDeselect",method:"ionDeselect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"click",method:"onClick"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-radio-ios-h{display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}.radio-disabled.sc-ion-radio-ios-h{pointer-events:none}.radio-icon.sc-ion-radio-ios{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:layout size style}.radio-icon.sc-ion-radio-ios, button.sc-ion-radio-ios{width:100%;height:100%}button.sc-ion-radio-ios{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;border:0;background:transparent;cursor:initial;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl].sc-ion-radio-ios-h   button.sc-ion-radio-ios, [dir=rtl]   .sc-ion-radio-ios-h   button.sc-ion-radio-ios{right:0}button.sc-ion-radio-ios::-moz-focus-inner{border:0}.radio-icon.sc-ion-radio-ios, .radio-inner.sc-ion-radio-ios{-webkit-box-sizing:border-box;box-sizing:border-box}.sc-ion-radio-ios-h{--color-checked:var(--ion-color-primary,#3880ff);width:15px;height:24px}.ion-color.radio-checked.sc-ion-radio-ios-h   .radio-inner.sc-ion-radio-ios{border-color:var(--ion-color-base)}.item-radio.item-ios.sc-ion-radio-ios   ion-label.sc-ion-radio-ios{margin-left:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.item-radio.item-ios.sc-ion-radio-ios   ion-label.sc-ion-radio-ios{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.radio-inner.sc-ion-radio-ios{width:33%;height:50%}.radio-checked.sc-ion-radio-ios-h   .radio-inner.sc-ion-radio-ios{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}.radio-disabled.sc-ion-radio-ios-h{opacity:.3}.ion-focused.sc-ion-radio-ios-h   .radio-icon.sc-ion-radio-ios:after{border-radius:50%;left:-9px;top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint,#4c8dff);content:\"\";opacity:.2}[dir=rtl].ion-focused.sc-ion-radio-ios-h   .radio-icon.sc-ion-radio-ios:after{right:-9px}.in-item.sc-ion-radio-ios-h{margin-left:8px;margin-right:11px;margin-top:8px;margin-bottom:8px;display:block;position:static}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.in-item.sc-ion-radio-ios-h{margin-left:unset;margin-right:unset;-webkit-margin-start:8px;margin-inline-start:8px;-webkit-margin-end:11px;margin-inline-end:11px}}.in-item[slot=start].sc-ion-radio-ios-h{margin-left:3px;margin-right:21px;margin-top:8px;margin-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.in-item[slot=start].sc-ion-radio-ios-h{margin-left:unset;margin-right:unset;-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:21px;margin-inline-end:21px}}"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"styleMode",{get:function(){return"ios"},enumerable:!0,configurable:!0}),e}(),radioButtonIds=0,RadioGroup=function(){function e(){this.inputId="ion-rg-"+radioGroupIds++,this.labelId=this.inputId+"-lbl",this.radios=[],this.allowEmptySelection=!1,this.name=this.inputId}return e.prototype.valueChanged=function(e){this.updateRadios(),this.ionChange.emit({value:e})},e.prototype.onRadioDidLoad=function(e){var t=e.target;t.name=this.name,this.radios.push(t),null==this.value&&t.checked?this.value=t.value:this.updateRadios()},e.prototype.onRadioDidUnload=function(e){var t=this.radios.indexOf(e.target);t>-1&&this.radios.splice(t,1)},e.prototype.onRadioSelect=function(e){var t=e.target;t&&(this.value=t.value)},e.prototype.onRadioDeselect=function(e){if(this.allowEmptySelection){var t=e.target;t&&(t.checked=!1,this.value=void 0)}},e.prototype.componentDidLoad=function(){var e=this.el.querySelector("ion-list-header");if(e||(e=this.el.querySelector("ion-item-divider")),e){var t=e.querySelector("ion-label");t&&(this.labelId=t.id=this.name+"-lbl")}this.updateRadios()},e.prototype.updateRadios=function(){for(var e=this.value,t=!1,o=0,i=this.radios;o<i.length;o++){var n=i[o];t||n.value!==e?n.checked=!1:(t=!0,n.checked=!0)}},e.prototype.hostData=function(){return{role:"radiogroup","aria-labelledby":this.labelId}},Object.defineProperty(e,"is",{get:function(){return"ion-radio-group"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{allowEmptySelection:{type:Boolean,attr:"allow-empty-selection"},el:{elementRef:!0},name:{type:String,attr:"name"},value:{type:"Any",attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"ionRadioDidLoad",method:"onRadioDidLoad"},{name:"ionRadioDidUnload",method:"onRadioDidUnload"},{name:"ionSelect",method:"onRadioSelect"},{name:"ionDeselect",method:"onRadioDeselect"}]},enumerable:!0,configurable:!0}),e}(),radioGroupIds=0;export{Radio as IonRadio,RadioGroup as IonRadioGroup};