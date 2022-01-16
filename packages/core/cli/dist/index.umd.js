(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@forestar/cli"] = factory());
})(this, (function () { 'use strict';

    const core = (params) => {
        console.log(params);
    };

    return core;

}));
