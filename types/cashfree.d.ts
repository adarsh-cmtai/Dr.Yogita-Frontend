// types/cashfree.d.ts
// Ensure this file is in your project (e.g., in a 'types' folder at the root)
// and your tsconfig.json includes it.
// Crucially: NO top-level import/export statements in this file for global augmentation to work.

interface CashfreeTransactionData {
  txStatus?: string;       // e.g., "SUCCESS", "FAILED", "PENDING"
  paymentId?: string;      // Cashfree's payment ID
  txMsg?: string;          // More detailed transaction message from gateway
  signature?: string;      // If applicable for verification
  // Add other transaction-related fields if provided by Cashfree in their documentation
}

interface CashfreeOrderCustomTags {
  itemId?: string;         // Your custom item ID passed during order creation
  itemType?: string;       // Your custom item type
  itemName?: string;       // Your custom item name
  itemSlug?: string;       // Your custom item slug
  [key: string]: any;      // Allows for other custom tags you might send
}

interface CashfreeOrderData {
  orderId: string;         // Your internal order_id that you sent to Cashfree
  cfOrderId?: string;      // Cashfree's unique order ID (cf_order_id)
  orderStatus?: string;    // e.g., "PAID", "ACTIVE", "PAYMENT_FAILED", "PENDING"
  paymentMessage?: string; // Message from gateway, often more descriptive on failure
  errorText?: string;      // Generic error text provided by Cashfree SDK
  
  /** 
   * Custom tags/notes you passed when creating the order.
   * Cashfree might return this under 'order_tags' or 'tags'.
   * This definition attempts to cover both possibilities.
   * Verify the exact key and structure from Cashfree's actual response in sdkData.order.
   */
  order_tags?: CashfreeOrderCustomTags; 
  tags?: CashfreeOrderCustomTags;        // Fallback or alternative key for tags
  
  // Add other order-related fields if provided by Cashfree
  // (e.g., order_amount, order_currency, customer_details, etc., if needed from sdkData.order)
}

interface CashfreePaymentSuccessData {
  order: CashfreeOrderData;
  transaction?: CashfreeTransactionData; 
  // Add any other top-level properties returned by Cashfree SDK on success
}

interface CashfreePaymentFailureData {
  order: CashfreeOrderData;
  transaction?: CashfreeTransactionData; 
  // Add any other top-level properties returned by Cashfree SDK on failure
}

// Options for the cashfreeInstance.checkout() method
interface CashfreeCheckoutOptions {
  paymentSessionId: string;
  /** DOM element ID (string) or HTMLElement where the payment form should be rendered for drop-in. */
  parentElement?: string | HTMLElement; 
  /** 
   * How the payment form should be displayed. 
   * For drop-in UI, this is typically "dropin".
   * Consult Cashfree documentation for other modes like "redirect", "popup", "iframe".
   */
  displayMode?: "dropin" | "redirect" | "popup" | string; 
  /** Array of payment component names to display if displayMode is 'dropin' or similar. */
  components?: string[]; // e.g., ["order-details", "card", "upi", "app", "netbanking"]
  
  /** Callback function triggered upon successful payment within the drop-in. */
  onSuccess?: (data: CashfreePaymentSuccessData) => void;
  /** Callback function triggered upon payment failure within the drop-in. */
  onFailure?: (data: CashfreePaymentFailureData) => void;
  
  style?: { // Style options, if supported by the checkout method's drop-in mode
    theme?: "light" | "dark" | string; // Allow custom theme names
    color?: string;                    // Primary brand color
    backgroundColor?: string;          // Background color for the payment form
    // Add other style properties as per Cashfree SDK documentation
  };
}

// Interface reflecting the methods available on the Cashfree SDK instance
interface CashfreeInstance {
  // Methods confirmed from your console logs:
  create: (...args: any[]) => any; 
  pay: (...args: any[]) => any;
  checkout: (options: CashfreeCheckoutOptions) => void; // Key method for drop-in UI
  flowWisePay: (...args: any[]) => any;
  returnElement: (...args: any[]) => any;
  destroyElement: (...args: any[]) => any;
  flowWiseCheckout: (...args: any[]) => any; 
  getComponents: (...args: any[]) => any;    
  getRootOptions: (...args: any[]) => any;   
  subscriptionsCheckout: (...args: any[]) => any; 
  updateRootOptions: (...args: any[]) => any; 
  version: (...args: any[]) => any;

  // Add any other methods if you discover them or use them from Cashfree documentation
}

// Interface for the Cashfree SDK constructor available on the window object
interface CashfreeConstructor {
  new (options: { 
    /** Mode of operation: "sandbox" for testing, "production" for live payments. */
    mode: "sandbox" | "production" | string 
  }): CashfreeInstance;
}

// Augment the global Window interface to include the Cashfree SDK object
declare global {
  interface Window {
    /** 
     * The Cashfree SDK constructor. 
     * It's optional because the SDK script loads asynchronously.
     */
    Cashfree?: CashfreeConstructor;
  }
}