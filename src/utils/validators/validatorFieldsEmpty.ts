


export const validatorFieldsEmpty = (...fields: (string | number | null)[]): boolean => {
    return fields.some(field => !field ||  field === "" || field === null)
}