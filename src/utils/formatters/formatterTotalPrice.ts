import { IProduct } from "../../interface/interface.checkoutPaymentMethod"


 
export const formatterTotalPrice = (items: IProduct[]) => {
    const total = items.reduce((prev, current) => {
        // Calcula o preço total considerando o desconto
        const totalPrice = current.discount
            ? current.isPercentage
             ? (current.quantity * current.price) - ((current.discount / 100) * (current.quantity * current.price))
                // Se o desconto for fixo, subtrai diretamente
             : (current.quantity * current.price) - current.discount
            : current.quantity * current.price;

        return prev + totalPrice;
    }, 0);

    return total;
};

export const formatterTotalSomePrice = (item: IProduct[]) => {
   
    const total = item.reduce((prev,current) => prev + current.price * current.quantity,0)

    return total
}