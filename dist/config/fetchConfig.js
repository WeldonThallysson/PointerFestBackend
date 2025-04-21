var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/config/fetchConfig.ts
var fetchConfig_exports = {};
__export(fetchConfig_exports, {
  api: () => api
});
module.exports = __toCommonJS(fetchConfig_exports);
var api = (_0) => __async(void 0, [_0], function* ({ baseURL, method, endpoint, data }) {
  let response = yield fetch(`${baseURL != null ? baseURL : process.env.PAGBANK_URL}${endpoint}`, {
    method: method != null ? method : "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.PAGBANK_URL
    },
    body: data != null ? data : null
  });
  return response.json();
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  api
});
//# sourceMappingURL=fetchConfig.js.map