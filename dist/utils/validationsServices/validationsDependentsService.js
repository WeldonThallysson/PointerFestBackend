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

// src/utils/validationsServices/validationsDependentsService.ts
var validationsDependentsService_exports = {};
__export(validationsDependentsService_exports, {
  validationsDependentsService: () => validationsDependentsService
});
module.exports = __toCommonJS(validationsDependentsService_exports);

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

// src/utils/validationsServices/validationsDependentsService.ts
var validationsDependentsService = ({
  name,
  cpf,
  birthDate,
  gender,
  email,
  phone,
  emailExists,
  cpfExists,
  userExists
}) => {
  const validatorEmpty = validatorFieldsEmpty(
    name,
    cpf,
    birthDate,
    gender
  );
  if (validatorEmpty) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Preencha todos os campos obrigat\xF3rios.",
        //  (nome, e-mail, senha, cpf, telefone, data de nascimento, residencia, bairro, endereço, cidade e genero)
        fields: [
          "name",
          "cpf",
          "birthDate",
          "gender"
        ],
        status: 400
      }
    };
  }
  if (!validatorCPF(cpf)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, CPF inv\xE1lido. Deve conter 11 d\xEDgitos.",
        status: 400
      }
    };
  }
  if (!validateBirthDate(birthDate)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, data de nascimento inv\xE1lida, verifique e tente novamente!",
        status: 400
      }
    };
  }
  if (email && !validatorEmail(email)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, E-mail inv\xE1lido.",
        status: 400
      }
    };
  }
  if (phone && !isValidPhoneNumber(phone)) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, N\xFAmero de telefone inv\xE1lido.",
        status: 400
      }
    };
  }
  if (userExists !== null && userExists) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar o esta a\xE7\xE3o, o usu\xE1rio n\xE3o existe.",
        status: 400
      }
    };
  }
  if (emailExists !== null && emailExists) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, Esse email est\xE1 em uso.",
        status: 400
      }
    };
  }
  if (cpfExists !== null && cpfExists) {
    return {
      data: {
        message: "N\xE3o foi poss\xEDvel realizar est\xE1 a\xE7\xE3o, esse CPF est\xE1 em uso.",
        status: 400
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validationsDependentsService
});
//# sourceMappingURL=validationsDependentsService.js.map