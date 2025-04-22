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

// src/utils/validationsServices/validationsUserService.ts
var validationsUserService_exports = {};
__export(validationsUserService_exports, {
  validationsUserService: () => validationsUserService
});
module.exports = __toCommonJS(validationsUserService_exports);

// src/utils/validators/validatorAge.ts
var validatorAge = (birthDate) => {
  const today = /* @__PURE__ */ new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
    age--;
  }
  return age < 18;
};

// src/utils/validators/validatorCNPJ.ts
var validatorCNPJ = (value) => {
  const cnpjRegex = /^\d{14}$/;
  return cnpjRegex.test(value);
};

// src/utils/validators/validatorCPF.ts
var validatorCPF = (value) => {
  const cpfRegex = /^\d{11}$/;
  const isCPF = cpfRegex.test(value);
  return isCPF;
};

// src/utils/validators/validatorDate.ts
var import_date_fns = require("date-fns");
var validateBirthDate = (dateString) => {
  const date = (0, import_date_fns.parseISO)(dateString);
  return (0, import_date_fns.isValid)(date);
};

// src/utils/validators/validatorEmail.ts
var validatorEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(value);
  return isEmail;
};

// src/utils/validators/validatorFieldsEmpty.ts
var validatorFieldsEmpty = (...fields) => {
  return fields.some((field) => !field || field === "" || field === null);
};

// src/utils/validators/validatorPhone.ts
var isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\d{1,3})(\d{1,4})(\d{6,10})$/;
  const match = phoneRegex.exec(phoneNumber);
  if (!match) return false;
  const countryCode = match[1];
  const areaCode = match[2];
  const number = match[3];
  if (countryCode === "55") {
    const isValidBrazilAreaCode = areaCode.length >= 2 && areaCode.length <= 4;
    const isValidBrazilNumber = number.length >= 8 && number.length <= 9;
    return isValidBrazilAreaCode && isValidBrazilNumber;
  } else {
    const isValidAreaCode = areaCode.length >= 1 && areaCode.length <= 4;
    const isValidNumber = number.length >= 6 && number.length <= 10;
    return isValidAreaCode && isValidNumber;
  }
};

// src/utils/validationsServices/validationsUserService.ts
var validationsUserService = ({
  name,
  companyName,
  email,
  cpfCnpj,
  phone,
  birthDate,
  gender,
  typePerson,
  password
}) => {
  const validatorEmpty = validatorFieldsEmpty(
    name,
    email,
    cpfCnpj,
    phone,
    gender,
    typePerson
  );
  if (validatorEmpty) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha todos os campos obrigat\xF3rios.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: ["name", "email", "cpf", "phone", "typePerson", "gender"],
        status: 400
      }
    };
  }
  if (!validatorEmail(email)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, E-mail inv\xE1lido.",
        status: 400
      }
    };
  }
  if (!isValidPhoneNumber(phone)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, N\xFAmero de telefone inv\xE1lido.",
        status: 400
      }
    };
  }
  if (password && (password == null ? void 0 : password.length) < 8) {
    return {
      data: {
        message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a.",
        status: 400
      }
    };
  }
  if (password && (password == null ? void 0 : password.length) > 14) {
    return {
      data: {
        message: "A senha deve ter de 8 a 14 caracteres para garantir maior seguran\xE7a. voc\xEA ultrapassou o limite de caracteres",
        status: 400
      }
    };
  }
  if (companyName && typePerson === "PF" /* Fisic */) {
    return {
      data: {
        message: "N\xE3o \xE9 poss\xEDvel cadastrar um nome fantasia para pessoas f\xEDsicas.",
        status: 400
      }
    };
  }
  if (!companyName && typePerson === "PJ" /* Juridic */) {
    return {
      data: {
        message: "N\xE3o \xE9 poss\xEDvel prosseguir. Por favor, informe o nome fantasia da sua empresa.",
        status: 400
      }
    };
  }
  if (typePerson !== "PF" /* Fisic */ && typePerson !== "PJ" /* Juridic */) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar esta a\xE7\xE3o, o tipo da pessoa deve ser F\xEDsica ou Jur\xEDdica",
        status: 400
      }
    };
  }
  if (typePerson === "PF" /* Fisic */ && !validatorCPF(cpfCnpj)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, CPF inv\xE1lido. Deve conter 11 d\xEDgitos.",
        status: 400
      }
    };
  }
  if (typePerson === "PJ" /* Juridic */ && !validatorCNPJ(cpfCnpj)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, CNPJ inv\xE1lido. Deve conter 14 d\xEDgitos.",
        status: 400
      }
    };
  }
  if (birthDate && birthDate === "") {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, \xE9 necess\xE1rio informar sua data de nascimento !",
        status: 400
      }
    };
  }
  if (birthDate && !validateBirthDate(birthDate)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, \xC9 necess\xE1rio ter pelo menos 18 anos para se cadastrar!",
        status: 400
      }
    };
  }
  if (birthDate && validatorAge(birthDate)) {
    return {
      data: {
        message: "A a\xE7\xE3o n\xE3o pode ser realizada. \xC9 necess\xE1rio ter pelo menos 18 anos para prosseguir.",
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsUserService
});
//# sourceMappingURL=validationsUserService.js.map