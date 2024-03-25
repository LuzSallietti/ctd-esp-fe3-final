import {
    ERROR_CARD_DATA_INCORRECT,
    ERROR_CARD_WITHOUT_AUTHORIZATION,
    ERROR_CARD_WITHOUT_FUNDS,
    ERROR_INCORRECT_ADDRESS,
    ERROR_METHOD_NOT_ALLOWED,
    ERROR_SERVER
} from "dh-marvel/services/checkout/checkout.errors";

export const translateError = (error: string) => {
    switch (error) {
        case ERROR_CARD_DATA_INCORRECT.error:
            return "Datos inválidos. Revise los datos e intente nuevamente.";
            
        case ERROR_CARD_WITHOUT_AUTHORIZATION.error:
            return "Pago no autorizado. Comuníquise con su banco e intente nuevamente.";
            
        case ERROR_CARD_WITHOUT_FUNDS.error:
            return "Saldo insuficiente. Pago no autorizado.";
        case ERROR_INCORRECT_ADDRESS.error:
            return "Dirección inválida.";
        case ERROR_METHOD_NOT_ALLOWED.error:
            return "Método no permitido.";
        case ERROR_SERVER.error:
           return "Error en el servidor.";
    
        default:
            return "Error. Intente nuevamente";
    }
}