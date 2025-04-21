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

// src/utils/validationsServices/validationsCouponsService.ts
var validationsCouponsService_exports = {};
__export(validationsCouponsService_exports, {
  validationsCouponsService: () => validationsCouponsService
});
module.exports = __toCommonJS(validationsCouponsService_exports);

// src/utils/validators/validatorFieldsEmpty.ts
var validatorFieldsEmpty = (...fields) => {
  return fields.some((field) => !field || field === "" || field === null);
};

// src/utils/validationsServices/validationsCouponsService.ts
var validationsCouponsService = ({
  idUserOwner
}) => {
  const validatorEmpty = validatorFieldsEmpty(
    idUserOwner
  );
  if (validatorEmpty) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha todos os campos obrigat\xF3rios.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: [
          "idUserOwner"
        ],
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsCouponsService
});
//# sourceMappingURL=validationsCouponsService.js.map