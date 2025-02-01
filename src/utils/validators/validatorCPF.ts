



export const validatorCPF = (value:string) => {
    const cpfRegex = /^\d{11}$/;
    const isCPF = cpfRegex.test(value)

    return isCPF
}
