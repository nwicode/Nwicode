import{b as t}from"./chunk-6d7d2f8c.js";import{GESTURE_CONTROLLER as o}from"./chunk-f56eaea8.js";class e{constructor(){this.lastClick=-1e4,this.blocker=o.createBlocker({disableScroll:!0}),this.visible=!0,this.tappable=!0,this.stopPropagation=!0}componentDidLoad(){this.stopPropagation&&this.blocker.block()}componentDidUnload(){this.blocker.destroy()}onTouchStart(o){this.lastClick=t(o),this.emitTap(o)}onMouseDown(o){this.lastClick<t(o)-2500&&this.emitTap(o)}emitTap(t){this.stopPropagation&&(t.preventDefault(),t.stopPropagation()),this.tappable&&this.ionBackdropTap.emit()}hostData(){return{tabindex:"-1",class:{"backdrop-hide":!this.visible,"backdrop-no-tappable":!this.tappable}}}static get is(){return"ion-backdrop"}static get encapsulation(){return"shadow"}static get properties(){return{doc:{context:"document"},stopPropagation:{type:Boolean,attr:"stop-propagation"},tappable:{type:Boolean,attr:"tappable"},visible:{type:Boolean,attr:"visible"}}}static get events(){return[{name:"ionBackdropTap",method:"ionBackdropTap",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"touchstart",method:"onTouchStart",capture:!0},{name:"click",method:"onMouseDown",capture:!0},{name:"mousedown",method:"onMouseDown",capture:!0}]}static get style(){return":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:initial;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"}static get styleMode(){return"md"}}export{e as IonBackdrop};