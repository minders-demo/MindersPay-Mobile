export type Screen = 
  | 'login'
  | 'register_phone'
  | 'register_data'
  | 'kyc_doc'
  | 'kyc_selfie'
  | 'kyc_review'
  | 'pin_create'
  | 'welcome'
  | 'forgot_password'
  | 'dashboard'
  | 'movements'
  | 'transaction_detail'
  | 'notifications'
  | 'profile'
  | 'transfer'
  | 'transfer_add_contact'
  | 'transfer_amount'
  | 'transfer_confirm'
  | 'operation_success'
  | 'topup_channel'
  | 'topup_instructions'
  | 'topup_cash'
  | 'topup_success'
  | 'pay_services'
  | 'pay_service_operators'
  | 'pay_service_query'
  | 'pay_services_confirm'
  | 'recharge_mobile'
  | 'recharge_mobile_operators'
  | 'recharge_mobile_amount'
  | 'products'
  | 'cards_hub'
  | 'pockets_hub'
  | 'pocket_create'
  | 'pocket_edit'
  | 'loans_hub'
  | 'loan_request'
  | 'loan_sign'
  | 'loan_payment'
  | 'insurance_hub'
  | 'card_data_view'
  | 'card_pin_change'
  | 'card_request_address'
  | 'card_request_confirm'
  | 'finance'
  | 'insurance_detail'
  | 'insurance_wizard'
  | 'business_dashboard'
  | 'sales_stats'
  | 'create_payment_link'
  | 'referrals'
  | 'benefits'
  | 'catalog'
  | 'ai_support'
  | 'security';

export interface User {
  name: string;
  phone: string;
  balance: number;
  currency: string;
  pockets: Pocket[];
  isCardLocked?: boolean;
  email?: string;
  activeLoans?: Loan[];
}

export interface Pocket {
  id: string;
  name: string;
  amount: number;
  goal: number;
  emoji: string;
  deadline?: string;
}

export interface Loan {
  id: string;
  name: string;
  totalAmount: number;
  remainingAmount: number;
  nextInstallmentDate: string;
  nextInstallmentAmount: number;
}

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  concept: string;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}
