import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
const url = process.env.VERCEL_PROD_URL


export const apiCall = async (body : CheckoutInput) => {        
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });        
          
        const data = await response.json();        
        return data;
        
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        throw error; // Relanzar el error para manejarlo en el componente que llama a apiCall
    }

}