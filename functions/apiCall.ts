import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const apiCall = async (body : CheckoutInput) => {        
    
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });      
          
        const data = await response.json();        
        return data;        

}