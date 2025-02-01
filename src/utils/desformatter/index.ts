export const deformatter = (item: string) => {
    
    // Remove todos os caracteres não numéricos
    return item.replace(/\D/g, "");
  };
  