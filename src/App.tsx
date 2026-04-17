/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { UserProvider, MovementsProvider, NotificationsProvider, useUser } from './Contexts';
import { MobileShell } from './components/Layout/MobileShell';
import { initAmplitude, initLifecycleTracking } from './utils/amplitude';

// Screens
import { 
  LoginScreen, 
  RegisterPhoneScreen, 
  RegisterDataScreen, 
  KYCDocScreen, 
  KYCSelfieScreen,
  PinCreateScreen,
  ForgotPasswordScreen,
  WelcomeScreen 
} from './screens/Onboarding';
import { DashboardScreen } from './screens/Dashboard';
import { 
  TransferScreen, 
  TransferAddContactScreen,
  TransferAmountScreen,
  TransferConfirmScreen, 
  OperationSuccessScreen 
} from './screens/Transfer';
import { 
  ProductsScreen, 
  CardsHubScreen, 
  PocketsHubScreen, 
  PocketCreateScreen,
  PocketEditScreen,
  LoansHubScreen, 
  LoanRequestScreen,
  LoanSignScreen,
  LoanPaymentScreen,
  CardDataViewScreen,
  CardPinChangeScreen,
  CardRequestAddressScreen,
  CardRequestConfirmScreen,
  ProfileScreen,
  InsuranceHubScreen, 
  FinanceScreen,
  BusinessDashboardScreen
} from './screens/OtherSections';
import { MovementsScreen, TransactionDetailScreen } from './screens/Movements';
import { NotificationsScreen } from './screens/Notifications';

import { TopUpChannelScreen, TopUpInstructionsScreen, TopUpCashScreen } from './screens/TopUp';
import { 
  PayServicesCountriesScreen, 
  PayServiceOperatorsScreen, 
  PayServiceQueryScreen, 
  PayServiceConfirmScreen,
  MobileTopupCountriesScreen,
  MobileTopupOperatorsScreen,
  MobileTopupAmountScreen
} from './screens/Services';

const ScreenRegistry = () => {
  const { currentScreen } = useUser();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login': return <LoginScreen />;
      case 'forgot_password': return <ForgotPasswordScreen />;
      case 'register_phone': return <RegisterPhoneScreen />;
      case 'register_data': return <RegisterDataScreen />;
      case 'kyc_doc': return <KYCDocScreen />;
      case 'kyc_selfie': return <KYCSelfieScreen />;
      case 'pin_create': return <PinCreateScreen />;
      case 'welcome': return <WelcomeScreen />;
      case 'dashboard': return <DashboardScreen />;
      case 'transfer': return <TransferScreen />;
      case 'transfer_add_contact': return <TransferAddContactScreen />;
      case 'transfer_amount': return <TransferAmountScreen />;
      case 'transfer_confirm': return <TransferConfirmScreen />;
      case 'operation_success': return <OperationSuccessScreen />;
      case 'topup_channel': return <TopUpChannelScreen />;
      case 'topup_instructions': return <TopUpInstructionsScreen />;
      case 'topup_cash': return <TopUpCashScreen />;
      case 'pay_services': return <PayServicesCountriesScreen />;
      case 'pay_service_operators': return <PayServiceOperatorsScreen />;
      case 'pay_service_query': return <PayServiceQueryScreen />;
      case 'pay_services_confirm': return <PayServiceConfirmScreen />;
      case 'movements': return <MovementsScreen />;
      case 'notifications': return <NotificationsScreen />;
      case 'recharge_mobile': return <MobileTopupCountriesScreen />;
      case 'recharge_mobile_operators': return <MobileTopupOperatorsScreen />;
      case 'recharge_mobile_amount': return <MobileTopupAmountScreen />;
      case 'products': return <ProductsScreen />;
      case 'cards_hub': return <CardsHubScreen />;
      case 'pockets_hub': return <PocketsHubScreen />;
      case 'pocket_create': return <PocketCreateScreen />;
      case 'pocket_edit': return <PocketEditScreen />;
      case 'card_data_view': return <CardDataViewScreen />;
      case 'card_pin_change': return <CardPinChangeScreen />;
      case 'card_request_address': return <CardRequestAddressScreen />;
      case 'card_request_confirm': return <CardRequestConfirmScreen />;
      case 'profile': return <ProfileScreen />;
      case 'loans_hub': return <LoansHubScreen />;
      case 'loan_request': return <LoanRequestScreen />;
      case 'loan_sign': return <LoanSignScreen />;
      case 'loan_payment': return <LoanPaymentScreen />;
      case 'insurance_hub': return <InsuranceHubScreen />;
      case 'finance': return <FinanceScreen />;
      case 'transaction_detail': return <TransactionDetailScreen />;
      case 'business_dashboard': return <BusinessDashboardScreen />;
      // Fallback a dashboard si no está implementada
      default: return <DashboardScreen />;
    }
  };

  return (
    <MobileShell currentScreen={currentScreen}>
      {renderScreen()}
    </MobileShell>
  );
};

export default function App() {
  useEffect(() => {
    initAmplitude();
    initLifecycleTracking();
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/minders-pay-mobile/sw.js').catch(err => {
          console.error('ServiceWorker registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <UserProvider>
      <MovementsProvider>
        <NotificationsProvider>
          <ScreenRegistry />
        </NotificationsProvider>
      </MovementsProvider>
    </UserProvider>
  );
}
