import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'intasend-waas/v1.0 (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Chargebacks API
   *
   */
  chargebacks_list(metadata?: types.ChargebacksListMetadataParam): Promise<FetchResponse<200, types.ChargebacksListResponse200>> {
    return this.core.fetch('/chargebacks/', 'get', metadata);
  }

  /**
   * Chargebacks API
   *
   */
  chargebacks_create(body: types.ChargebacksCreateBodyParam): Promise<FetchResponse<201, types.ChargebacksCreateResponse201>> {
    return this.core.fetch('/chargebacks/', 'post', body);
  }

  /**
   * Chargebacks API
   *
   */
  chargebacks_read(metadata: types.ChargebacksReadMetadataParam): Promise<FetchResponse<200, types.ChargebacksReadResponse200>> {
    return this.core.fetch('/chargebacks/{id}/', 'get', metadata);
  }

  /**
   * Checkout and Express Links API
   *
   */
  checkout_create(body: types.CheckoutCreateBodyParam): Promise<FetchResponse<201, types.CheckoutCreateResponse201>> {
    return this.core.fetch('/checkout/', 'post', body);
  }

  /**
   * Approve send money request
   *
   */
  checkout_details(body: types.CheckoutDetailsBodyParam): Promise<FetchResponse<200, types.CheckoutDetailsResponse200>> {
    return this.core.fetch('/checkout/details/', 'post', body);
  }

  /**
   * Payment customers API
   *
   */
  customers_list(metadata?: types.CustomersListMetadataParam): Promise<FetchResponse<200, types.CustomersListResponse200>> {
    return this.core.fetch('/customers/', 'get', metadata);
  }

  /**
   * Payment customers API
   *
   */
  customers_read(metadata: types.CustomersReadMetadataParam): Promise<FetchResponse<200, types.CustomersReadResponse200>> {
    return this.core.fetch('/customers/{id}/', 'get', metadata);
  }

  mpesaPaybillAccounts_list(metadata?: types.MpesaPaybillAccountsListMetadataParam): Promise<FetchResponse<200, types.MpesaPaybillAccountsListResponse200>> {
    return this.core.fetch('/mpesa-paybill-accounts/', 'get', metadata);
  }

  mpesaPaybillAccounts_create(body: types.MpesaPaybillAccountsCreateBodyParam): Promise<FetchResponse<201, types.MpesaPaybillAccountsCreateResponse201>> {
    return this.core.fetch('/mpesa-paybill-accounts/', 'post', body);
  }

  mpesaPaybillAccounts_read(metadata: types.MpesaPaybillAccountsReadMetadataParam): Promise<FetchResponse<200, types.MpesaPaybillAccountsReadResponse200>> {
    return this.core.fetch('/mpesa-paybill-accounts/{id}/', 'get', metadata);
  }

  /**
   * Generate payment reference number for deposit at Coop-Bank Mtaani Agents
   *
   */
  payment_coopAgentDeposit_create(body: types.PaymentCoopAgentDepositCreateBodyParam): Promise<FetchResponse<200, types.PaymentCoopAgentDepositCreateResponse200>> {
    return this.core.fetch('/payment/coop-agent-deposit/', 'post', body);
  }

  /**
   * Send MPesa STK Push
   *
   */
  payment_mpesaStkPush_create(body: types.PaymentMpesaStkPushCreateBodyParam): Promise<FetchResponse<200, types.PaymentMpesaStkPushCreateResponse200>> {
    return this.core.fetch('/payment/mpesa-stk-push/', 'post', body);
  }

  /**
   * Check payment status using invoice of checkout ID
   *
   */
  payment_status_create(body: types.PaymentStatusCreateBodyParam): Promise<FetchResponse<200, types.PaymentStatusCreateResponse200>> {
    return this.core.fetch('/payment/status/', 'post', body);
  }

  /**
   * Payment links API
   *
   */
  paymentlinks_list(metadata?: types.PaymentlinksListMetadataParam): Promise<FetchResponse<200, types.PaymentlinksListResponse200>> {
    return this.core.fetch('/paymentlinks/', 'get', metadata);
  }

  /**
   * Payment links API
   *
   */
  paymentlinks_create(body: types.PaymentlinksCreateBodyParam): Promise<FetchResponse<201, types.PaymentlinksCreateResponse201>> {
    return this.core.fetch('/paymentlinks/', 'post', body);
  }

  /**
   * Payment links API
   *
   */
  paymentlinks_read(metadata: types.PaymentlinksReadMetadataParam): Promise<FetchResponse<200, types.PaymentlinksReadResponse200>> {
    return this.core.fetch('/paymentlinks/{id}/', 'get', metadata);
  }

  /**
   * Payment links API
   *
   */
  paymentlinks_update(body: types.PaymentlinksUpdateBodyParam, metadata: types.PaymentlinksUpdateMetadataParam): Promise<FetchResponse<200, types.PaymentlinksUpdateResponse200>> {
    return this.core.fetch('/paymentlinks/{id}/', 'put', body, metadata);
  }

  /**
   * Approve send money request
   *
   */
  sendMoney_approve_create(body: types.SendMoneyApproveCreateBodyParam): Promise<FetchResponse<200, types.SendMoneyApproveCreateResponse200>> {
    return this.core.fetch('/send-money/approve/', 'post', body);
  }

  /**
   * Returns a list of Bank Codes
   *
   */
  sendMoney_bankCodes_ke_list(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/send-money/bank-codes/ke/', 'get');
  }

  /**
   * Cancel send money request
   *
   */
  sendMoney_cancel_create(body: types.SendMoneyCancelCreateBodyParam): Promise<FetchResponse<200, types.SendMoneyCancelCreateResponse200>> {
    return this.core.fetch('/send-money/cancel/', 'post', body);
  }

  /**
   * Initiate or load a new send money request
   *
   */
  sendMoney_initiate_create(body: types.SendMoneyInitiateCreateBodyParam): Promise<FetchResponse<200, types.SendMoneyInitiateCreateResponse200>> {
    return this.core.fetch('/send-money/initiate/', 'post', body);
  }

  /**
   * Check send money status
   *
   */
  sendMoney_status_create(body: types.SendMoneyStatusCreateBodyParam): Promise<FetchResponse<200, types.SendMoneyStatusCreateResponse200>> {
    return this.core.fetch('/send-money/status/', 'post', body);
  }

  subscriptionsCustomers_list(metadata?: types.SubscriptionsCustomersListMetadataParam): Promise<FetchResponse<200, types.SubscriptionsCustomersListResponse200>> {
    return this.core.fetch('/subscriptions-customers/', 'get', metadata);
  }

  subscriptionsCustomers_create(body: types.SubscriptionsCustomersCreateBodyParam): Promise<FetchResponse<201, types.SubscriptionsCustomersCreateResponse201>> {
    return this.core.fetch('/subscriptions-customers/', 'post', body);
  }

  subscriptionsCustomers_read(metadata: types.SubscriptionsCustomersReadMetadataParam): Promise<FetchResponse<200, types.SubscriptionsCustomersReadResponse200>> {
    return this.core.fetch('/subscriptions-customers/{id}/', 'get', metadata);
  }

  subscriptionsCustomers_update(body: types.SubscriptionsCustomersUpdateBodyParam, metadata: types.SubscriptionsCustomersUpdateMetadataParam): Promise<FetchResponse<200, types.SubscriptionsCustomersUpdateResponse200>> {
    return this.core.fetch('/subscriptions-customers/{id}/', 'put', body, metadata);
  }

  subscriptionsPlans_list(metadata?: types.SubscriptionsPlansListMetadataParam): Promise<FetchResponse<200, types.SubscriptionsPlansListResponse200>> {
    return this.core.fetch('/subscriptions-plans/', 'get', metadata);
  }

  subscriptionsPlans_create(body: types.SubscriptionsPlansCreateBodyParam): Promise<FetchResponse<201, types.SubscriptionsPlansCreateResponse201>> {
    return this.core.fetch('/subscriptions-plans/', 'post', body);
  }

  subscriptionsPlans_read(metadata: types.SubscriptionsPlansReadMetadataParam): Promise<FetchResponse<200, types.SubscriptionsPlansReadResponse200>> {
    return this.core.fetch('/subscriptions-plans/{id}/', 'get', metadata);
  }

  subscriptionsPlans_update(body: types.SubscriptionsPlansUpdateBodyParam, metadata: types.SubscriptionsPlansUpdateMetadataParam): Promise<FetchResponse<200, types.SubscriptionsPlansUpdateResponse200>> {
    return this.core.fetch('/subscriptions-plans/{id}/', 'put', body, metadata);
  }

  subscriptions_list(metadata?: types.SubscriptionsListMetadataParam): Promise<FetchResponse<200, types.SubscriptionsListResponse200>> {
    return this.core.fetch('/subscriptions/', 'get', metadata);
  }

  subscriptions_create(body: types.SubscriptionsCreateBodyParam): Promise<FetchResponse<201, types.SubscriptionsCreateResponse201>> {
    return this.core.fetch('/subscriptions/', 'post', body);
  }

  subscriptions_read(metadata: types.SubscriptionsReadMetadataParam): Promise<FetchResponse<200, types.SubscriptionsReadResponse200>> {
    return this.core.fetch('/subscriptions/{id}/', 'get', metadata);
  }

  /**
   * Cancel subscription
   *
   */
  subscriptions_unsubscribe(body: types.SubscriptionsUnsubscribeBodyParam, metadata: types.SubscriptionsUnsubscribeMetadataParam): Promise<FetchResponse<201, types.SubscriptionsUnsubscribeResponse201>> {
    return this.core.fetch('/subscriptions/{id}/unsubscribe/', 'post', body, metadata);
  }

  subscriptions_transactions(metadata: types.SubscriptionsTransactionsMetadataParam): Promise<FetchResponse<200, types.SubscriptionsTransactionsResponse200>> {
    return this.core.fetch('/subscriptions/{id}/transactions/', 'get', metadata);
  }

  /**
   * Retrieve wallet transactions by wallet_id, currency, trans_type, or date
   *
   */
  transactions_list(metadata?: types.TransactionsListMetadataParam): Promise<FetchResponse<200, types.TransactionsListResponse200>> {
    return this.core.fetch('/transactions/', 'get', metadata);
  }

  /**
   * Retrieve wallet transactions by wallet_id, currency, trans_type, or date
   *
   */
  transactions_read(metadata: types.TransactionsReadMetadataParam): Promise<FetchResponse<200, types.TransactionsReadResponse200>> {
    return this.core.fetch('/transactions/{id}/', 'get', metadata);
  }

  wallets_list(metadata?: types.WalletsListMetadataParam): Promise<FetchResponse<200, types.WalletsListResponse200>> {
    return this.core.fetch('/wallets/', 'get', metadata);
  }

  wallets_create(body: types.WalletsCreateBodyParam): Promise<FetchResponse<201, types.WalletsCreateResponse201>> {
    return this.core.fetch('/wallets/', 'post', body);
  }

  wallets_read(metadata: types.WalletsReadMetadataParam): Promise<FetchResponse<200, types.WalletsReadResponse200>> {
    return this.core.fetch('/wallets/{id}/', 'get', metadata);
  }

  /**
   * Forex exchange API - Move money between wallets of different currencies
   *
   */
  wallets_exchange(body: types.WalletsExchangeBodyParam, metadata: types.WalletsExchangeMetadataParam): Promise<FetchResponse<200, types.WalletsExchangeResponse200>> {
    return this.core.fetch('/wallets/{id}/exchange/', 'post', body, metadata);
  }

  /**
   * Internal wallet to wallet transfers
   *
   */
  wallets_intra_transfer(body: types.WalletsIntraTransferBodyParam, metadata: types.WalletsIntraTransferMetadataParam): Promise<FetchResponse<200, types.WalletsIntraTransferResponse200>> {
    return this.core.fetch('/wallets/{id}/intra_transfer/', 'post', body, metadata);
  }

  /**
   * Get wallet statement (transactions performed)
   *
   */
  wallets_transactions(metadata: types.WalletsTransactionsMetadataParam): Promise<FetchResponse<200, types.WalletsTransactionsResponse200>> {
    return this.core.fetch('/wallets/{id}/transactions/', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { ChargebacksCreateBodyParam, ChargebacksCreateResponse201, ChargebacksListMetadataParam, ChargebacksListResponse200, ChargebacksReadMetadataParam, ChargebacksReadResponse200, CheckoutCreateBodyParam, CheckoutCreateResponse201, CheckoutDetailsBodyParam, CheckoutDetailsResponse200, CustomersListMetadataParam, CustomersListResponse200, CustomersReadMetadataParam, CustomersReadResponse200, MpesaPaybillAccountsCreateBodyParam, MpesaPaybillAccountsCreateResponse201, MpesaPaybillAccountsListMetadataParam, MpesaPaybillAccountsListResponse200, MpesaPaybillAccountsReadMetadataParam, MpesaPaybillAccountsReadResponse200, PaymentCoopAgentDepositCreateBodyParam, PaymentCoopAgentDepositCreateResponse200, PaymentMpesaStkPushCreateBodyParam, PaymentMpesaStkPushCreateResponse200, PaymentStatusCreateBodyParam, PaymentStatusCreateResponse200, PaymentlinksCreateBodyParam, PaymentlinksCreateResponse201, PaymentlinksListMetadataParam, PaymentlinksListResponse200, PaymentlinksReadMetadataParam, PaymentlinksReadResponse200, PaymentlinksUpdateBodyParam, PaymentlinksUpdateMetadataParam, PaymentlinksUpdateResponse200, SendMoneyApproveCreateBodyParam, SendMoneyApproveCreateResponse200, SendMoneyCancelCreateBodyParam, SendMoneyCancelCreateResponse200, SendMoneyInitiateCreateBodyParam, SendMoneyInitiateCreateResponse200, SendMoneyStatusCreateBodyParam, SendMoneyStatusCreateResponse200, SubscriptionsCreateBodyParam, SubscriptionsCreateResponse201, SubscriptionsCustomersCreateBodyParam, SubscriptionsCustomersCreateResponse201, SubscriptionsCustomersListMetadataParam, SubscriptionsCustomersListResponse200, SubscriptionsCustomersReadMetadataParam, SubscriptionsCustomersReadResponse200, SubscriptionsCustomersUpdateBodyParam, SubscriptionsCustomersUpdateMetadataParam, SubscriptionsCustomersUpdateResponse200, SubscriptionsListMetadataParam, SubscriptionsListResponse200, SubscriptionsPlansCreateBodyParam, SubscriptionsPlansCreateResponse201, SubscriptionsPlansListMetadataParam, SubscriptionsPlansListResponse200, SubscriptionsPlansReadMetadataParam, SubscriptionsPlansReadResponse200, SubscriptionsPlansUpdateBodyParam, SubscriptionsPlansUpdateMetadataParam, SubscriptionsPlansUpdateResponse200, SubscriptionsReadMetadataParam, SubscriptionsReadResponse200, SubscriptionsTransactionsMetadataParam, SubscriptionsTransactionsResponse200, SubscriptionsUnsubscribeBodyParam, SubscriptionsUnsubscribeMetadataParam, SubscriptionsUnsubscribeResponse201, TransactionsListMetadataParam, TransactionsListResponse200, TransactionsReadMetadataParam, TransactionsReadResponse200, WalletsCreateBodyParam, WalletsCreateResponse201, WalletsExchangeBodyParam, WalletsExchangeMetadataParam, WalletsExchangeResponse200, WalletsIntraTransferBodyParam, WalletsIntraTransferMetadataParam, WalletsIntraTransferResponse200, WalletsListMetadataParam, WalletsListResponse200, WalletsReadMetadataParam, WalletsReadResponse200, WalletsTransactionsMetadataParam, WalletsTransactionsResponse200 } from './types';
