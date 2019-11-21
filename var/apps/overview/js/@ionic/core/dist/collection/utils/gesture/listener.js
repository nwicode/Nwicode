export function addEventListener(el, eventName, callback, opts) {
    const listenerOpts = supportsPassive(el) ? {
        'capture': !!opts.capture,
        'passive': !!opts.passive,
    } : !!opts.capture;
    let add;
    let remove;
    if (el['__zone_symbol__addEventListener']) {
        add = '__zone_symbol__addEventListener';
        remove = '__zone_symbol__removeEventListener';
    }
    else {
        add = 'addEventListener';
        remove = 'removeEventListener';
    }
    el[add](eventName, callback, listenerOpts);
    return () => {
        el[remove](eventName, callback, listenerOpts);
    };
}
let _sPassive;
function supportsPassive(node) {
    if (_sPassive === undefined) {
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: () => {
                    _sPassive = true;
                }
            });
            node.addEventListener('optsTest', () => { return; }, opts);
        }
        catch (e) {
            _sPassive = false;
        }
    }
    return !!_sPassive;
}
