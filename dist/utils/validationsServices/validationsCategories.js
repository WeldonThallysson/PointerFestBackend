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

// src/utils/validationsServices/validationsCategories.ts
var validationsCategories_exports = {};
__export(validationsCategories_exports, {
  validationsCategoriesService: () => validationsCategoriesService
});
module.exports = __toCommonJS(validationsCategories_exports);
var validationsCategoriesService = ({
  name,
  icon,
  idUserOwner
}) => {
  if (!idUserOwner) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, informe o id do usu\xE1rio respons\xE1vel",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
  if (!name) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha o nome da categoria.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
  if (!icon) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, por favor envie um icone para prosseguir",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsCategoriesService
});
//# sourceMappingURL=validationsCategories.js.map