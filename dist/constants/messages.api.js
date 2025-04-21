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

// src/constants/messages.api.ts
var messages_api_exports = {};
__export(messages_api_exports, {
  Messages: () => Messages,
  MessagesError: () => MessagesError
});
module.exports = __toCommonJS(messages_api_exports);
var Messages = /* @__PURE__ */ ((Messages2) => {
  Messages2["RegisterMessageSuccess"] = "Cadastro realizado com sucesso";
  Messages2["UpdateMessageSuccess"] = "Atualiza\xE7\xE3o realizada com sucesso";
  Messages2["DeleteMessageSuccess"] = "Exclus\xE3o realizada com sucesso";
  return Messages2;
})(Messages || {});
var MessagesError = /* @__PURE__ */ ((MessagesError2) => {
  MessagesError2["RegisterMessageError"] = "Ocorreu um error durante o cadastro";
  MessagesError2["UpdateMessageError"] = "Ocorreu um error durante a atualiza\xE7\xE3o";
  MessagesError2["GetAllMessageError"] = "Ocorreu um error durante a busca por todos os itens";
  MessagesError2["GetDetailsMessageError"] = "Ocorreu um error durante a busca pelo detalhamento";
  MessagesError2["DeleteMessageError"] = "Ocorreu um error durante a exclus\xE3o";
  return MessagesError2;
})(MessagesError || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Messages,
  MessagesError
});
//# sourceMappingURL=messages.api.js.map