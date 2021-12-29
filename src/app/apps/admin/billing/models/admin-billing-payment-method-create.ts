export interface AdminBillingPaymentMethodCreate {
    paymentMethodType: 0 | 1 | 2;

    cardNumber?: string;
    cardExpirationYear?: number;
    cardExpirationMonth?: number;
    cardCvc?: string;

    bankAccountName?: string;
    bankAccountType?: string;
    bankAccountNumber?: string;
    bankAccountRouting?: string;
    bankAccountCountry?: string;
}
