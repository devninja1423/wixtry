declare module "wix-payments.v2" {
  /**
   * todo
   * A charge is a record of an attempt of
   * to move money from a customer to a merchant.
   * Read more about charges in this [article](<https://dev.wix.com/docs/rest/business-management/payments/charges/introduction>).
   */
  interface Charge extends ChargeNextActionOneOf {
      /** A browser should issue an HTTP GET request and render the result. */
      getMethodRedirect?: GetMethodRedirect;
      /** A browser should issue an HTTP POST request and render the result. */
      postMethodRedirect?: PostMethodRedirect;
      /** A browser should display a barcode / barcode url to continue payment. */
      barcodeDisplay?: BarcodeDisplay;
      /** A client should interact with card reader. */
      cardReaderInteraction?: CardReaderInteraction;
      /** A browser should show a QR code to continue payment. */
      qrCodeDisplay?: QrCodeDisplay;
      /**
       * A browser should display an iframe with web page.
       * Redirect shouldn't be performed as it's designed to be embedded into checkout page.
       */
      webPageDisplay?: WebPageDisplay;
      payPalSdkInteraction?: PayPalSdkInteraction;
      /**
       * Charge ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the charge is updated.
       * Ignored when creating a charge.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the charge was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the charge was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Merchant's account connection ID. */
      accountConnectionId?: string | null;
      /** PaymentIntent which was used to create the charge if it exists. */
      paymentIntentId?: string | null;
      /** Payment agreement which was used to create the charge if it exists. */
      paymentAgreementId?: string | null;
      /**
       * Status of the charge.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/charges/introduction#lifecycle-of-a-charge>). // todo
       * @readonly
       */
      status?: Status$1;
      /**
       * Details about charge status.
       * @readonly
       */
      statusInfo?: StatusInfo$1;
      /**
       * Authorization amount of the charge in base units.
       * E.g. "12.95".
       */
      authorizationAmount?: string | null;
      /** Currency of the charge. */
      currency?: string | null;
      /**
       * Amount of the application fee in base units.
       * E.g. "12.95".
       * Application fee is the fee that the platform charges for the transaction.
       * Application fee is part of the amount represented by line items total amount + additional charges.
       */
      applicationFee?: string | null;
      /** Order line items. */
      items?: Item[];
      /** Additional charges to the order - e.g., tax, shipping or discount. */
      additionalCharges?: AdditionalCharges;
      /** Timestamp on which event/delivery/ect. happens and order is considered fulfilled */
      fulfillmentDate?: Date;
      /** Complete description that appears on the customers' statements. */
      statementDescriptor?: string | null;
      /** Billing information. */
      billingInfo?: Address;
      /** Shipping information. */
      shippingInfo?: Address;
      /** Payment method data that is used to create this charge. */
      paymentMethod?: PaymentMethod;
      /**
       * Payment method information enriched with data from the payment provider.
       * @readonly
       */
      paymentMethodInfo?: PaymentMethodInfo;
      /** Request charge to be made using strong customer authentication e.g. 3-D Secure. */
      scaRequested?: boolean | null;
      /**
       * Indicates if the charge is off-session.
       * Off-session charges are charges that are initiated by the merchant on behalf of the customer
       * e.g. charging a customer for a late fee or an incidental for a car rental
       * or automatically e.g. subscription renewal.
       */
      offSession?: boolean | null;
      /** Indicates if the charge is a mail order/telephone order (MOTO). */
      moto?: boolean | null;
      /** Indicates if the charge is an unscheduled merchant initiated payment. */
      unscheduledMit?: boolean | null;
      /**
       * Indicates that you intend to make future payments with payment method used in this charge.
       * If it’s set to true than payment agreement will be created after charge succeeds.
       */
      setupFutureUsages?: boolean | null;
      /**
       * Redirect URLs for different payment outcomes. PSP-hosted payment pages use these URLs to redirect
       * the buyer back to the merchant’s site.
       */
      returnUrls?: ReturnUrls;
      /** Payment information for the risk evaluation score. */
      riskData?: RiskData;
      /** Buyer information used to notify buyer about payment and to store payment credentials on file. */
      buyerInfo?: BuyerInfo;
      /** Indicates that capture shouldn't be performed automatically immediately after successful authorization. */
      delayedCapture?: boolean | null;
      /**
       * Amount that was already captured.
       * E.g. "12.95".
       * @readonly
       */
      capturedAmount?: string | null;
      /** Number of installments. */
      installment?: number | null;
      /** Data Extensions. */
      extendedFields?: ExtendedFields$1;
  }
  /** @oneof */
  interface ChargeNextActionOneOf {
      /** A browser should issue an HTTP GET request and render the result. */
      getMethodRedirect?: GetMethodRedirect;
      /** A browser should issue an HTTP POST request and render the result. */
      postMethodRedirect?: PostMethodRedirect;
      /** A browser should display a barcode / barcode url to continue payment. */
      barcodeDisplay?: BarcodeDisplay;
      /** A client should interact with card reader. */
      cardReaderInteraction?: CardReaderInteraction;
      /** A browser should show a QR code to continue payment. */
      qrCodeDisplay?: QrCodeDisplay;
      /**
       * A browser should display an iframe with web page.
       * Redirect shouldn't be performed as it's designed to be embedded into checkout page.
       */
      webPageDisplay?: WebPageDisplay;
      payPalSdkInteraction?: PayPalSdkInteraction;
  }
  /** Full contact details for an address */
  interface FullAddressContactDetails {
      /** Contact's first name. */
      firstName?: string | null;
      /** Contact's last name. */
      lastName?: string | null;
      /**
       * Contact's full name.
       * @internal
       */
      fullName?: string | null;
      /** Contact's phone number. */
      phone?: string | null;
      /** Contact's company name. */
      company?: string | null;
      /** Email associated with the address. */
      email?: string | null;
      /** Tax info. Currently usable only in Brazil. */
      vatId?: VatId;
  }
  interface VatId {
      /** Customer's tax ID. */
      _id?: string;
      /**
       * Tax type.
       *
       * Supported values:
       * + `CPF`: for individual tax payers
       * + `CNPJ`: for corporations
       */
      type?: VatType;
  }
  /** tax info types */
  enum VatType {
      UNSPECIFIED = "UNSPECIFIED",
      /** CPF - for individual tax payers. */
      CPF = "CPF",
      /** CNPJ - for corporations */
      CNPJ = "CNPJ"
  }
  /**
   * A common address format to use if you plan to store addresses in your service
   * todo: remove unused fields from decomposition and remove validations
   * Physical address
   */
  interface CommonAddress extends CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine1?: string | null;
      /** Country code. */
      country?: string | null;
      /** Subdivision. Usually a state, region, prefecture, or province code, according to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2). */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Zip/postal code. */
      postalCode?: string | null;
      /** Free text providing more detailed address info. Usually contains Apt, Suite, and Floor. */
      addressLine2?: string | null;
      /**
       * A string containing the full address of this location.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation;
  }
  /** @oneof */
  interface CommonAddressStreetOneOf {
      /** Street name and number. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation {
      /** Address latitude. */
      latitude?: number | null;
      /** Address longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** Short subdivision code. */
      code?: string;
      /** Subdivision full name. */
      name?: string;
      /**
       * Subdivision level
       * @internal
       */
      type?: SubdivisionType;
      /**
       * Free text description of subdivision type.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface CardPayment {
      /** the card number token */
      numberToken?: string;
      /** the month of the card expiration date */
      expiryMonth?: number;
      /** the full year of the card expiration date */
      expiryYear?: number;
      /** the cardholder name printed on the card */
      holderName?: string | null;
      /** the CVV/CVC/CID token */
      securityCodeToken?: string | null;
  }
  interface CardReaderPayment {
      /** the location ID */
      locationId?: string | null;
      /** the terminal ID */
      terminalId?: string | null;
      /** the service ID */
      serviceId?: string | null;
      /**
       * whether create intent only or complete transaction (use this flag only if you know what it means)
       * @deprecated whether create intent only or complete transaction (use this flag only if you know what it means)
       * @targetRemovalDate 2025-06-01
       */
      createIntentOnly?: boolean | null;
  }
  interface IDealPayment {
      /** the code of the issuing bank */
      issuingBank?: string;
  }
  interface ApplePayPayment {
      /**
       * the payment token
       * [!] This field is only used during charge creation and is not a part of the charge object.
       */
      token?: string;
  }
  interface PayPalPayment {
      payPalToken?: string | null;
      useExpressCheckout?: boolean | null;
  }
  interface GooglePayPayment {
      /**
       * the payment token
       * [!] This field is only used during charge creation and is not a part of the charge object.
       */
      token?: string;
  }
  interface SavedCardPayment {
      /** id of previously saved Payment Method */
      savedPaymentMethodId?: string;
      /** the CVV/CVC/CID token */
      securityCodeToken?: string | null;
  }
  interface CardInfo {
      /**
       * Card last 4 digits.
       * @readonly
       */
      lastFourDigits?: string | null;
      /**
       * Card BIN (Bank Identification Number). It's the first 4-8 digits of a card number.
       * @readonly
       */
      bin?: string | null;
      /** Card expiration month. */
      expirationMonth?: number | null;
      /** Card expiration year. */
      expirationYear?: number | null;
      /** Card holder's full name specified on the card. */
      cardholderName?: string | null;
      /**
       * Card brand.
       * *INTERNAL* as it's not platformized yet.
       * @internal
       * @readonly
       */
      brand?: CardBrand;
      /** Reference to transaction on network's side associated with this charge. */
      networkReference?: NetworkReference;
  }
  enum CardBrand {
      UNKNOWN_CARD_BRAND = "UNKNOWN_CARD_BRAND",
      AMEX = "AMEX",
      DANKORT = "DANKORT",
      DINERS = "DINERS",
      DISCOVER = "DISCOVER",
      ISRACARD = "ISRACARD",
      JCB = "JCB",
      MAESTRO = "MAESTRO",
      MASTERCARD = "MASTERCARD",
      UNIONPAY = "UNIONPAY",
      VISA = "VISA",
      RUPAY = "RUPAY"
  }
  interface NetworkReference {
      /** Transaction ID assigned by a card scheme (Trace ID for Mastercard or Transaction ID for Visa). */
      networkTransactionId?: string | null;
      /** Transaction ID assigned by 3D Secure 2 directory server. */
      dsTransactionId?: string | null;
  }
  interface CardReaderInfo {
      /** Location ID. */
      locationId?: string | null;
      /** Terminal ID. */
      terminalId?: string | null;
      /** Service ID. */
      serviceId?: string | null;
  }
  interface BankInfo {
      issuingBank?: string | null;
  }
  interface AccountInfo {
      /**
       * The email of an Account used by Payment Method
       * @readonly
       */
      email?: string | null;
  }
  interface CofInfo {
      /** Tokens that are used to reference a payment agreement in external payment provider. */
      providerToken?: string | null;
  }
  interface FormField {
      name?: string;
      value?: string;
  }
  enum Status$1 {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      STARTING = "STARTING",
      NEEDS_ACTION = "NEEDS_ACTION",
      PENDING = "PENDING",
      AUTHORIZED = "AUTHORIZED",
      PARTIALLY_CAPTURED = "PARTIALLY_CAPTURED",
      CAPTURED = "CAPTURED",
      VOIDED = "VOIDED",
      FAILED = "FAILED"
  }
  interface StatusInfo$1 {
      /**
       * Reason code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      code?: string | null;
      /** Free-text description. */
      description?: string | null;
  }
  interface Item {
      /** Item ID. */
      _id?: string | null;
      /**
       * Item name.
       * @readonly
       */
      name?: string | null;
      /** Item quantity. */
      quantity?: number | null;
      /** Item price. */
      price?: string | null;
      /** Item description. */
      description?: string | null;
      /** Item weight in KG. */
      weightInKg?: number | null;
      /** Is item a tangible product. */
      tangible?: boolean | null;
  }
  interface AdditionalCharges {
      tax?: string | null;
      shipping?: string | null;
      discount?: string | null;
  }
  interface Address {
      contactDetails?: FullAddressContactDetails;
      address?: CommonAddress;
  }
  /**
   * Payment method options
   * todo: consider PaymentSource name
   */
  interface PaymentMethod extends PaymentMethodPaymentMethodOneOf {
      /** payment with a card online */
      card?: CardPayment;
      /** payment with a card at a POS */
      cardReader?: CardReaderPayment;
      /** the iDEAL payment system */
      ideal?: IDealPayment;
      /** the Apple Pay digital wallet */
      applePay?: ApplePayPayment;
      /** the PayPal digital wallet */
      payPal?: PayPalPayment;
      /** Google Pay */
      googlePay?: GooglePayPayment;
      /** payment with a card using saved card */
      savedCard?: SavedCardPayment;
      /** Payment method type id. */
      typeId?: string;
  }
  /** @oneof */
  interface PaymentMethodPaymentMethodOneOf {
      /** payment with a card online */
      card?: CardPayment;
      /** payment with a card at a POS */
      cardReader?: CardReaderPayment;
      /** the iDEAL payment system */
      ideal?: IDealPayment;
      /** the Apple Pay digital wallet */
      applePay?: ApplePayPayment;
      /** the PayPal digital wallet */
      payPal?: PayPalPayment;
      /** Google Pay */
      googlePay?: GooglePayPayment;
      /** payment with a card using saved card */
      savedCard?: SavedCardPayment;
  }
  interface PaymentMethodInfo {
      /** Payment method type id. */
      typeId?: string;
      /** Card payment information. */
      cardInfo?: CardInfo;
      /** POS card reader payment information. */
      cardReaderInfo?: CardReaderInfo;
      /** Information for bank-based payment methods like iDEAL. */
      bankInfo?: BankInfo;
      /** The details of an account. */
      accountInfo?: AccountInfo;
      /**
       * Credentials on file information for the payment method.
       * @internal
       * @readonly
       */
      cofInfo?: CofInfo;
  }
  interface ReturnUrls {
      /** todo: what to do with non-web urls? */
      successUrl?: string | null;
      errorUrl?: string | null;
      pendingUrl?: string | null;
  }
  interface RiskData {
      userAgent?: string | null;
      referrerHeader?: string | null;
      acceptHeader?: string | null;
      ipAddress?: string | null;
      deviceFingerprint?: string | null;
      riskProviderData?: Record<string, string>;
  }
  interface BuyerInfo {
      contactId?: string | null;
      siteMemberId?: string | null;
      userId?: string | null;
      buyerLanguage?: string | null;
  }
  interface GetMethodRedirect {
      url?: string;
  }
  interface PostMethodRedirect {
      url?: string;
      fields?: FormField[];
  }
  interface BarcodeDisplay {
      barcode?: string | null;
      barcodeUrl?: string | null;
      expirationDate?: Date;
      billingEmail?: string | null;
  }
  interface CardReaderInteraction {
      readerToken?: string | null;
  }
  interface QrCodeDisplay {
      payload?: string | null;
      expirationDate?: Date;
  }
  interface WebPageDisplay {
      url?: string | null;
      expirationDate?: Date;
  }
  interface PayPalSdkInteraction {
      payPalOrderId?: string | null;
  }
  interface ExtendedFields$1 {
      /**
       * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
       * The value of each key is structured according to the schema defined when the extended fields were configured.
       *
       * You can only access fields for which you have the appropriate permissions.
       *
       * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
       */
      namespaces?: Record<string, Record<string, any>>;
  }
  interface CreateChargeRequest {
      charge: Charge;
  }
  interface CreateChargeResponse {
      charge?: Charge;
  }
  interface GetChargeRequest {
      chargeId: string;
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields[];
  }
  enum RequestedFields {
      /** Default value. This value is unused. */
      UNKNOWN_REQUESTED_FIELD = "UNKNOWN_REQUESTED_FIELD",
      SENSITIVE_INFO = "SENSITIVE_INFO"
  }
  interface GetChargeResponse {
      charge?: Charge;
  }
  interface QueryChargesRequest {
      query?: CursorQuery$1;
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields[];
  }
  interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting$1[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$1 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$1;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
  }
  enum SortOrder$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$1 {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryChargesResponse {
      charges?: Charge[];
      pagingMetadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface VoidChargeRequest {
      chargeId: string;
  }
  interface VoidChargeResponse {
      charge?: Charge;
  }
  interface CaptureChargeRequest {
      chargeId: string;
      amount?: string | null;
      capturedAmount?: string | null;
  }
  interface CaptureChargeResponse {
      charge?: Charge;
  }
  interface UpdateExtendedFieldsRequest$1 {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse$1 {
      charge?: Charge;
  }
  interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp. */
      eventTime?: Date;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
  }
  interface EntityUpdatedEvent$1 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent$1 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$1 {
      bodyAsJson?: string;
  }
  interface MessageEnvelope$1 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$1;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$1;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$1 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /** @internal
   * @documentationMaturity preview
   * @requiredField charge
   * @adminMethod
   */
  function createCharge(charge: Charge): Promise<Charge>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @adminMethod
   */
  function getCharge(chargeId: string, options?: GetChargeOptions): Promise<Charge>;
  interface GetChargeOptions {
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields[];
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId PAYMENTS.CHARGE_READ
   * @adminMethod
   */
  function queryCharges(options?: QueryChargesOptions): ChargesQueryBuilder;
  interface QueryChargesOptions {
      /**
       * List of heeded fields that will be returned.
       * You should have additional permission in order to get them as described in RequestedFields documentation.
       */
      fields?: RequestedFields[] | undefined;
  }
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ChargesQueryResult extends QueryCursorResult$1 {
      items: Charge[];
      query: ChargesQueryBuilder;
      next: () => Promise<ChargesQueryResult>;
      prev: () => Promise<ChargesQueryResult>;
  }
  interface ChargesQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ChargesQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ChargesQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ChargesQueryResult>;
  }
  /**
   * todo: should it be here ???
   * @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @adminMethod
   */
  function voidCharge(chargeId: string): Promise<VoidChargeResponse>;
  /** @internal
   * @documentationMaturity preview
   * @requiredField chargeId
   * @adminMethod
   */
  function captureCharge(chargeId: string, options?: CaptureChargeOptions): Promise<CaptureChargeResponse>;
  interface CaptureChargeOptions {
      amount?: string | null;
      capturedAmount?: string | null;
  }
  /** @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @adminMethod
   */
  function updateExtendedFields$1(_id: string, namespace: string, options: UpdateExtendedFieldsOptions$1): Promise<UpdateExtendedFieldsResponse$1>;
  interface UpdateExtendedFieldsOptions$1 {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  
  type paymentsChargesV1Charge_universal_d_Charge = Charge;
  type paymentsChargesV1Charge_universal_d_ChargeNextActionOneOf = ChargeNextActionOneOf;
  type paymentsChargesV1Charge_universal_d_FullAddressContactDetails = FullAddressContactDetails;
  type paymentsChargesV1Charge_universal_d_VatId = VatId;
  type paymentsChargesV1Charge_universal_d_VatType = VatType;
  const paymentsChargesV1Charge_universal_d_VatType: typeof VatType;
  type paymentsChargesV1Charge_universal_d_CommonAddress = CommonAddress;
  type paymentsChargesV1Charge_universal_d_CommonAddressStreetOneOf = CommonAddressStreetOneOf;
  type paymentsChargesV1Charge_universal_d_StreetAddress = StreetAddress;
  type paymentsChargesV1Charge_universal_d_AddressLocation = AddressLocation;
  type paymentsChargesV1Charge_universal_d_Subdivision = Subdivision;
  type paymentsChargesV1Charge_universal_d_SubdivisionType = SubdivisionType;
  const paymentsChargesV1Charge_universal_d_SubdivisionType: typeof SubdivisionType;
  type paymentsChargesV1Charge_universal_d_CardPayment = CardPayment;
  type paymentsChargesV1Charge_universal_d_CardReaderPayment = CardReaderPayment;
  type paymentsChargesV1Charge_universal_d_IDealPayment = IDealPayment;
  type paymentsChargesV1Charge_universal_d_ApplePayPayment = ApplePayPayment;
  type paymentsChargesV1Charge_universal_d_PayPalPayment = PayPalPayment;
  type paymentsChargesV1Charge_universal_d_GooglePayPayment = GooglePayPayment;
  type paymentsChargesV1Charge_universal_d_SavedCardPayment = SavedCardPayment;
  type paymentsChargesV1Charge_universal_d_CardInfo = CardInfo;
  type paymentsChargesV1Charge_universal_d_CardBrand = CardBrand;
  const paymentsChargesV1Charge_universal_d_CardBrand: typeof CardBrand;
  type paymentsChargesV1Charge_universal_d_NetworkReference = NetworkReference;
  type paymentsChargesV1Charge_universal_d_CardReaderInfo = CardReaderInfo;
  type paymentsChargesV1Charge_universal_d_BankInfo = BankInfo;
  type paymentsChargesV1Charge_universal_d_AccountInfo = AccountInfo;
  type paymentsChargesV1Charge_universal_d_CofInfo = CofInfo;
  type paymentsChargesV1Charge_universal_d_FormField = FormField;
  type paymentsChargesV1Charge_universal_d_Item = Item;
  type paymentsChargesV1Charge_universal_d_AdditionalCharges = AdditionalCharges;
  type paymentsChargesV1Charge_universal_d_Address = Address;
  type paymentsChargesV1Charge_universal_d_PaymentMethod = PaymentMethod;
  type paymentsChargesV1Charge_universal_d_PaymentMethodPaymentMethodOneOf = PaymentMethodPaymentMethodOneOf;
  type paymentsChargesV1Charge_universal_d_PaymentMethodInfo = PaymentMethodInfo;
  type paymentsChargesV1Charge_universal_d_ReturnUrls = ReturnUrls;
  type paymentsChargesV1Charge_universal_d_RiskData = RiskData;
  type paymentsChargesV1Charge_universal_d_BuyerInfo = BuyerInfo;
  type paymentsChargesV1Charge_universal_d_GetMethodRedirect = GetMethodRedirect;
  type paymentsChargesV1Charge_universal_d_PostMethodRedirect = PostMethodRedirect;
  type paymentsChargesV1Charge_universal_d_BarcodeDisplay = BarcodeDisplay;
  type paymentsChargesV1Charge_universal_d_CardReaderInteraction = CardReaderInteraction;
  type paymentsChargesV1Charge_universal_d_QrCodeDisplay = QrCodeDisplay;
  type paymentsChargesV1Charge_universal_d_WebPageDisplay = WebPageDisplay;
  type paymentsChargesV1Charge_universal_d_PayPalSdkInteraction = PayPalSdkInteraction;
  type paymentsChargesV1Charge_universal_d_CreateChargeRequest = CreateChargeRequest;
  type paymentsChargesV1Charge_universal_d_CreateChargeResponse = CreateChargeResponse;
  type paymentsChargesV1Charge_universal_d_GetChargeRequest = GetChargeRequest;
  type paymentsChargesV1Charge_universal_d_RequestedFields = RequestedFields;
  const paymentsChargesV1Charge_universal_d_RequestedFields: typeof RequestedFields;
  type paymentsChargesV1Charge_universal_d_GetChargeResponse = GetChargeResponse;
  type paymentsChargesV1Charge_universal_d_QueryChargesRequest = QueryChargesRequest;
  type paymentsChargesV1Charge_universal_d_QueryChargesResponse = QueryChargesResponse;
  type paymentsChargesV1Charge_universal_d_VoidChargeRequest = VoidChargeRequest;
  type paymentsChargesV1Charge_universal_d_VoidChargeResponse = VoidChargeResponse;
  type paymentsChargesV1Charge_universal_d_CaptureChargeRequest = CaptureChargeRequest;
  type paymentsChargesV1Charge_universal_d_CaptureChargeResponse = CaptureChargeResponse;
  const paymentsChargesV1Charge_universal_d_createCharge: typeof createCharge;
  const paymentsChargesV1Charge_universal_d_getCharge: typeof getCharge;
  type paymentsChargesV1Charge_universal_d_GetChargeOptions = GetChargeOptions;
  const paymentsChargesV1Charge_universal_d_queryCharges: typeof queryCharges;
  type paymentsChargesV1Charge_universal_d_QueryChargesOptions = QueryChargesOptions;
  type paymentsChargesV1Charge_universal_d_ChargesQueryResult = ChargesQueryResult;
  type paymentsChargesV1Charge_universal_d_ChargesQueryBuilder = ChargesQueryBuilder;
  const paymentsChargesV1Charge_universal_d_voidCharge: typeof voidCharge;
  const paymentsChargesV1Charge_universal_d_captureCharge: typeof captureCharge;
  type paymentsChargesV1Charge_universal_d_CaptureChargeOptions = CaptureChargeOptions;
  namespace paymentsChargesV1Charge_universal_d {
    export {
      paymentsChargesV1Charge_universal_d_Charge as Charge,
      paymentsChargesV1Charge_universal_d_ChargeNextActionOneOf as ChargeNextActionOneOf,
      paymentsChargesV1Charge_universal_d_FullAddressContactDetails as FullAddressContactDetails,
      paymentsChargesV1Charge_universal_d_VatId as VatId,
      paymentsChargesV1Charge_universal_d_VatType as VatType,
      paymentsChargesV1Charge_universal_d_CommonAddress as CommonAddress,
      paymentsChargesV1Charge_universal_d_CommonAddressStreetOneOf as CommonAddressStreetOneOf,
      paymentsChargesV1Charge_universal_d_StreetAddress as StreetAddress,
      paymentsChargesV1Charge_universal_d_AddressLocation as AddressLocation,
      paymentsChargesV1Charge_universal_d_Subdivision as Subdivision,
      paymentsChargesV1Charge_universal_d_SubdivisionType as SubdivisionType,
      paymentsChargesV1Charge_universal_d_CardPayment as CardPayment,
      paymentsChargesV1Charge_universal_d_CardReaderPayment as CardReaderPayment,
      paymentsChargesV1Charge_universal_d_IDealPayment as IDealPayment,
      paymentsChargesV1Charge_universal_d_ApplePayPayment as ApplePayPayment,
      paymentsChargesV1Charge_universal_d_PayPalPayment as PayPalPayment,
      paymentsChargesV1Charge_universal_d_GooglePayPayment as GooglePayPayment,
      paymentsChargesV1Charge_universal_d_SavedCardPayment as SavedCardPayment,
      paymentsChargesV1Charge_universal_d_CardInfo as CardInfo,
      paymentsChargesV1Charge_universal_d_CardBrand as CardBrand,
      paymentsChargesV1Charge_universal_d_NetworkReference as NetworkReference,
      paymentsChargesV1Charge_universal_d_CardReaderInfo as CardReaderInfo,
      paymentsChargesV1Charge_universal_d_BankInfo as BankInfo,
      paymentsChargesV1Charge_universal_d_AccountInfo as AccountInfo,
      paymentsChargesV1Charge_universal_d_CofInfo as CofInfo,
      paymentsChargesV1Charge_universal_d_FormField as FormField,
      Status$1 as Status,
      StatusInfo$1 as StatusInfo,
      paymentsChargesV1Charge_universal_d_Item as Item,
      paymentsChargesV1Charge_universal_d_AdditionalCharges as AdditionalCharges,
      paymentsChargesV1Charge_universal_d_Address as Address,
      paymentsChargesV1Charge_universal_d_PaymentMethod as PaymentMethod,
      paymentsChargesV1Charge_universal_d_PaymentMethodPaymentMethodOneOf as PaymentMethodPaymentMethodOneOf,
      paymentsChargesV1Charge_universal_d_PaymentMethodInfo as PaymentMethodInfo,
      paymentsChargesV1Charge_universal_d_ReturnUrls as ReturnUrls,
      paymentsChargesV1Charge_universal_d_RiskData as RiskData,
      paymentsChargesV1Charge_universal_d_BuyerInfo as BuyerInfo,
      paymentsChargesV1Charge_universal_d_GetMethodRedirect as GetMethodRedirect,
      paymentsChargesV1Charge_universal_d_PostMethodRedirect as PostMethodRedirect,
      paymentsChargesV1Charge_universal_d_BarcodeDisplay as BarcodeDisplay,
      paymentsChargesV1Charge_universal_d_CardReaderInteraction as CardReaderInteraction,
      paymentsChargesV1Charge_universal_d_QrCodeDisplay as QrCodeDisplay,
      paymentsChargesV1Charge_universal_d_WebPageDisplay as WebPageDisplay,
      paymentsChargesV1Charge_universal_d_PayPalSdkInteraction as PayPalSdkInteraction,
      ExtendedFields$1 as ExtendedFields,
      paymentsChargesV1Charge_universal_d_CreateChargeRequest as CreateChargeRequest,
      paymentsChargesV1Charge_universal_d_CreateChargeResponse as CreateChargeResponse,
      paymentsChargesV1Charge_universal_d_GetChargeRequest as GetChargeRequest,
      paymentsChargesV1Charge_universal_d_RequestedFields as RequestedFields,
      paymentsChargesV1Charge_universal_d_GetChargeResponse as GetChargeResponse,
      paymentsChargesV1Charge_universal_d_QueryChargesRequest as QueryChargesRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      paymentsChargesV1Charge_universal_d_QueryChargesResponse as QueryChargesResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      paymentsChargesV1Charge_universal_d_VoidChargeRequest as VoidChargeRequest,
      paymentsChargesV1Charge_universal_d_VoidChargeResponse as VoidChargeResponse,
      paymentsChargesV1Charge_universal_d_CaptureChargeRequest as CaptureChargeRequest,
      paymentsChargesV1Charge_universal_d_CaptureChargeResponse as CaptureChargeResponse,
      UpdateExtendedFieldsRequest$1 as UpdateExtendedFieldsRequest,
      UpdateExtendedFieldsResponse$1 as UpdateExtendedFieldsResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      paymentsChargesV1Charge_universal_d_createCharge as createCharge,
      paymentsChargesV1Charge_universal_d_getCharge as getCharge,
      paymentsChargesV1Charge_universal_d_GetChargeOptions as GetChargeOptions,
      paymentsChargesV1Charge_universal_d_queryCharges as queryCharges,
      paymentsChargesV1Charge_universal_d_QueryChargesOptions as QueryChargesOptions,
      paymentsChargesV1Charge_universal_d_ChargesQueryResult as ChargesQueryResult,
      paymentsChargesV1Charge_universal_d_ChargesQueryBuilder as ChargesQueryBuilder,
      paymentsChargesV1Charge_universal_d_voidCharge as voidCharge,
      paymentsChargesV1Charge_universal_d_captureCharge as captureCharge,
      paymentsChargesV1Charge_universal_d_CaptureChargeOptions as CaptureChargeOptions,
      updateExtendedFields$1 as updateExtendedFields,
      UpdateExtendedFieldsOptions$1 as UpdateExtendedFieldsOptions,
    };
  }
  
  /**
   * A refund a record of an attempt of
   * returning funds for a charge from a merchant to a customer to who has made a purchase.
   * Read more about refunds in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction>).
   */
  interface Refund {
      /**
       * Refund ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the refund is updated.
       *
       * Ignored when creating a refund.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the refund was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the refund was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
      /** ID of charge for which the funds are returned by this refund. */
      chargeId?: string | null;
      /** Currency of refund, should be the same as currency of charge. */
      currency?: string | null;
      /**
       * Amount of refund in base units, what's returned to the customer.
       * E.g. "12.95".
       */
      amount?: string | null;
      /**
       * Application fee returned to merchant from Wix.
       * In base units, e.g. "12.95".
       * Not present when no application fee was returned.
       * @readonly
       */
      returnedApplicationFee?: string | null;
      /**
       * Processing fee returned to merchant from provider.
       * In base units, e.g. "12.95".
       * Applicable only to Wix Payments provider.
       * Not present when no processing fee was returned.
       * @readonly
       */
      returnedProcessingFee?: string | null;
      /**
       * True when refund returns all funds for a charge.
       * @readonly
       */
      full?: boolean | null;
      /**
       * Status of the refund.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
       * @readonly
       */
      status?: Status;
      /**
       * ID of the refund on the PSP side.
       * @readonly
       */
      providerRefundId?: string | null;
      /**
       * _INTERNAL_
       * Who initiated this refund.
       * @internal
       */
      initiator?: Initiator;
      /** Reason why this refund was issued. */
      reason?: string | null;
      /**
       * Details about refund status.
       * Mostly used with statuses `FAILED` and `REVERSED`.
       * @readonly
       */
      statusInfo?: StatusInfo;
      /**
       * Acquirer Reference Number.
       * @readonly
       */
      acquirerReferenceNumber?: string | null;
      /** Optional free-text note about this refund. */
      note?: string | null;
  }
  interface ExtendedFields {
      /**
       * Extended field data. Each key corresponds to the namespace of the app that created the extended fields.
       * The value of each key is structured according to the schema defined when the extended fields were configured.
       *
       * You can only access fields for which you have the appropriate permissions.
       *
       * Learn more about [extended fields](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields).
       */
      namespaces?: Record<string, Record<string, any>>;
  }
  enum Status {
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /**
       * Initial status for all refunds.
       * Provisional, refund should be in this status for less than a minute.
       */
      STARTING = "STARTING",
      /** Status right after STARTED for asynchronous refunds. */
      PENDING = "PENDING",
      /**
       * Refund was successful.
       * Can transition to REVERSED in corner cases.
       */
      SUCCEEDED = "SUCCEEDED",
      /** Regular error, terminal status. */
      FAILED = "FAILED",
      /**
       * Either refund reversal
       * or any other error that comes after success, terminal status.
       */
      REVERSED = "REVERSED"
  }
  enum Initiator {
      UNKNOWN_INITIATOR = "UNKNOWN_INITIATOR",
      WIX = "WIX",
      API = "API",
      PROVIDER = "PROVIDER"
  }
  interface StatusInfo {
      /**
       * Reason code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      code?: string;
      /** Free-text description. */
      description?: string | null;
  }
  interface InternalSyncRefundRequest {
      /** Refund ID. */
      refundId?: string | null;
      /** ID of the refund on the PSP side. */
      providerRefundId?: string | null;
      /** ID of charge for which the funds are returned by this refund. */
      chargeId?: string | null;
      /**
       * Status of the refund.
       * Read more about statuses in this [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
       */
      status?: Status;
      /**
       * Status code.
       * [Read more about reason codes.](https://dev.wix.com/docs/rest/api-reference/payment-provider-spi/reason-codes)
       */
      statusCode?: string | null;
      /** Currency of refund, should be the same as currency of charge. */
      currency?: string | null;
      /**
       * Amount of refund in base units, what's returned to the customer.
       * E.g. "12.95".
       */
      amount?: string | null;
      /**
       * Application fee returned to merchant from Wix.
       * Having this as a separate field since Refund.returned_application_fee is readOnly.
       */
      returnedApplicationFee?: string | null;
      /** Reason why this refund was issued. */
      reason?: string | null;
      /** Optional free-text note about this refund. */
      note?: string | null;
  }
  interface InternalSyncRefundResponse {
      /** Created/updated refund. */
      refund?: Refund;
  }
  interface CreateRefundRequest {
      /** Refund to be created. */
      refund: Refund;
      /**
       * _INTERNAL_
       * True means processing fee for the refunded charge should be returned to the merchant.
       * Applies only to Wix Payments charges.
       * `PAYMENTS.REFUND_RETURN_PROCESSING_FEE` permission is required.
       * @internal
       */
      returnProcessingFee?: boolean | null;
      /**
       * Optional parameter used to prevent unintended refunds.
       * Used to check previously refunded amount according to the client
       * against the amount from server perspective.
       * If they don't match, error with code `PREVIOUSLY_REFUNDED_AMOUNT_MISMATCH` is returned.
       *
       * Read more about preventing unintended refunds in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  interface CreateRefundResponse {
      /** The created refund. */
      refund?: Refund;
  }
  interface GetRefundRequest {
      /** ID of the refund to retrieve. */
      refundId: string;
  }
  interface GetRefundResponse {
      /** The requested refund. */
      refund?: Refund;
  }
  interface QueryRefundsRequest {
      /** WQL expression. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
      /**
       * Filter object in the following format:
       * `"filter" : {
       * "fieldName1": "value1",
       * "fieldName2":{"$operator":"value2"}
       * }`
       * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
       */
      filter?: Record<string, any> | null;
      /**
       * Sort object in the following format:
       * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
       */
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryRefundsResponse {
      /** List of refunds. */
      refunds?: Refund[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateExtendedFieldsRequest {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse {
      /** Updated refund. */
      refund?: Refund;
  }
  interface GetRefundabilityRequest {
      /** ID of the charge for which refundability will be calculated. */
      chargeId: string;
  }
  interface GetRefundabilityResponse {
      /** Refundability for the charge. */
      refundability?: Refundability;
  }
  /**
   * Internal notes:
   *
   * Instead of separate Refundability and PartialRefundability, we provide min and max refund amount.
   * If only full refund is possible, min_refund_amount = max_refund_amount = charge amount.
   */
  interface Refundability extends RefundabilityDetailsOneOf {
      /** When charge is refundable, specifies what amounts are allowed for refund. */
      refundOptions?: RefundOptions;
      /** When charge is not refundable, specifies why refund is not allowed. */
      rejection?: Rejection;
      /** Whether the caller is allowed to refund the charge. */
      refundable?: boolean;
      /** Currency of the charge. */
      currency?: string | null;
      /**
       * Sum of amounts of `SUCCEEDED` refunds for this charge in base units, e.g. "6.47".
       * Used to prevent unintended refunds, read more in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  /** @oneof */
  interface RefundabilityDetailsOneOf {
      /** When charge is refundable, specifies what amounts are allowed for refund. */
      refundOptions?: RefundOptions;
      /** When charge is not refundable, specifies why refund is not allowed. */
      rejection?: Rejection;
  }
  interface RefundOptions {
      /** Minimum amount allowed to be refunded in base units, e.g. "0.50". */
      minRefundAmount?: string | null;
      /** Maximum amount allowed to be refunded in base units, e.g. "12.95". */
      maxRefundAmount?: string | null;
  }
  interface Rejection {
      /**
       * Following reasons are possible:
       * - `CHARGE_REFUNDED` — charge is already fully refunded.
       * - `CHARGE_REFUND_IN_PROGRESS` — another refund was initiated for this charge
       * and is waiting for confirmation from the provider.
       * - `CHARGE_DISPUTED` — charge was disputed.
       * - `CHARGE_REFUND_PERIOD_ENDED` — charge is too old to be refunded.
       * - `CHARGE_UNPAID` — charge is unpaid.
       * - `PROVIDER_DOWN` — PSP is temporarily down.
       * - `PROVIDER_NOT_SUPPORTED` — provider doesn't support refunds at the moment,
       * charge is in the wrong state,
       * or we don't have required information for this transaction.
       * - `PAYMENT_METHOD_NOT_SUPPORTED` — payment method of a charge doesn't support refunds.
       * - `MERCHANT_ACCOUNT_NOT_SUPPORTED` — merchant account doesn't support refunds at the moment.
       * - `MERCHANT_BALANCE_INSUFFICIENT` — merchant doesn't have enough balance to issue a refund for this charge.
       * - `NOT_AUTHORIZED` — logged in merchant has no permission to refund this charge.
       */
      reason?: RejectionReason;
  }
  enum RejectionReason {
      UNKNOWN_REJECTION_REASON = "UNKNOWN_REJECTION_REASON",
      /** Charge is already fully refunded. */
      CHARGE_REFUNDED = "CHARGE_REFUNDED",
      /** Another refund was initiated for this charge and is waiting for confirmation from the provider. */
      CHARGE_REFUND_IN_PROGRESS = "CHARGE_REFUND_IN_PROGRESS",
      /** Charge was disputed. */
      CHARGE_DISPUTED = "CHARGE_DISPUTED",
      /** Charge is too old to be refunded. */
      CHARGE_REFUND_PERIOD_ENDED = "CHARGE_REFUND_PERIOD_ENDED",
      /** Charge is unpaid. */
      CHARGE_UNPAID = "CHARGE_UNPAID",
      /** PSP is temporarily down. */
      PROVIDER_DOWN = "PROVIDER_DOWN",
      /**
       * Provider doesn't support refunds at the moment, transaction in a wrong state or we don't
       * have required information for this transaction.
       */
      PROVIDER_NOT_SUPPORTED = "PROVIDER_NOT_SUPPORTED",
      /** Payment method of a charge doesn't support refunds. */
      PAYMENT_METHOD_NOT_SUPPORTED = "PAYMENT_METHOD_NOT_SUPPORTED",
      /** Merchant account doesn't support refunds at the moment. */
      MERCHANT_ACCOUNT_NOT_SUPPORTED = "MERCHANT_ACCOUNT_NOT_SUPPORTED",
      /** Merchant doesn't have enough balance to issue a refund for this charge. */
      MERCHANT_BALANCE_INSUFFICIENT = "MERCHANT_BALANCE_INSUFFICIENT",
      /** Logged in merchant has no permission to refund this charge. */
      NOT_AUTHORIZED = "NOT_AUTHORIZED"
  }
  interface DomainEvent extends DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
      /**
       * Unique event ID.
       * Allows clients to ignore duplicate webhooks.
       */
      _id?: string;
      /**
       * Assumes actions are also always typed to an entity_type
       * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
       */
      entityFqdn?: string;
      /**
       * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
       * This is although the created/updated/deleted notion is duplication of the oneof types
       * Example: created/updated/deleted/started/completed/email_opened
       */
      slug?: string;
      /** ID of the entity associated with the event. */
      entityId?: string;
      /** Event timestamp. */
      eventTime?: Date;
      /**
       * Whether the event was triggered as a result of a privacy regulation application
       * (for example, GDPR).
       */
      triggeredByAnonymizeRequest?: boolean | null;
      /** If present, indicates the action that triggered the event. */
      originatedFrom?: string | null;
      /**
       * A sequence number defining the order of updates to the underlying entity.
       * For example, given that some entity was updated at 16:00 and than again at 16:01,
       * it is guaranteed that the sequence number of the second update is strictly higher than the first.
       * As the consumer, you can use this value to ensure that you handle messages in the correct order.
       * To do so, you will need to persist this number on your end, and compare the sequence number from the
       * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
       */
      entityEventSequence?: string | null;
  }
  /** @oneof */
  interface DomainEventBodyOneOf {
      createdEvent?: EntityCreatedEvent;
      updatedEvent?: EntityUpdatedEvent;
      deletedEvent?: EntityDeletedEvent;
      actionEvent?: ActionEvent;
  }
  interface EntityCreatedEvent {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
  }
  interface EntityUpdatedEvent {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent {
      bodyAsJson?: string;
  }
  interface MessageEnvelope {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Creates a refund.
   * Refunding process starts immediately after refund entity is created.
   *
   * If amount and currency are not specified,
   * refund is created for full charge amount.
   * If amount is specified, you also need to specify currency,
   * and it should be the same as charge currency.
   *
   * The call blocks until refund status transitions from `STARTING`.
   * Read more about refund statuses in this
   * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#lifecycle-of-a-refund>).
   * @param refund - Refund to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField refund
   * @requiredField refund.chargeId
   * @adminMethod
   * @returns The created refund.
   */
  function createRefund(refund: Refund, options?: CreateRefundOptions): Promise<Refund>;
  interface CreateRefundOptions {
      /**
       * _INTERNAL_
       * True means processing fee for the refunded charge should be returned to the merchant.
       * Applies only to Wix Payments charges.
       * `PAYMENTS.REFUND_RETURN_PROCESSING_FEE` permission is required.
       * @internal
       */
      returnProcessingFee?: boolean | null;
      /**
       * Optional parameter used to prevent unintended refunds.
       * Used to check previously refunded amount according to the client
       * against the amount from server perspective.
       * If they don't match, error with code `PREVIOUSLY_REFUNDED_AMOUNT_MISMATCH` is returned.
       *
       * Read more about preventing unintended refunds in this
       * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#preventing-unintended-refunds>).
       */
      previouslyRefundedAmount?: string | null;
  }
  /**
   * Retrieves a refund.
   * @param refundId - ID of the refund to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField refundId
   * @adminMethod
   * @returns The requested refund.
   */
  function getRefund(refundId: string): Promise<Refund>;
  /**
   * Retrieves a list of refunds, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 Refunds can be returned per request.
   *
   * To learn how to query refunds, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId PAYMENTS.REFUND_READ
   * @adminMethod
   */
  function queryRefunds(): RefundsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface RefundsQueryResult extends QueryCursorResult {
      items: Refund[];
      query: RefundsQueryBuilder;
      next: () => Promise<RefundsQueryResult>;
      prev: () => Promise<RefundsQueryResult>;
  }
  interface RefundsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'chargeId', value: any) => RefundsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'chargeId', value: any) => RefundsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => RefundsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => RefundsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<RefundsQueryResult>;
  }
  /**
   * Updates extended fields of a refund without incrementing revision.
   * @param _id - ID of the entity to update.
   * @param namespace - Identifier for the app whose extended fields are being updated.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField namespace
   * @requiredField options
   * @requiredField options.namespaceData
   * @adminMethod
   */
  function updateExtendedFields(_id: string, namespace: string, options: UpdateExtendedFieldsOptions): Promise<UpdateExtendedFieldsResponse>;
  interface UpdateExtendedFieldsOptions {
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  /**
   * Calculates refundability for a charge.
   *
   * Read more about refundability in this
   * [article](<https://dev.wix.com/docs/rest/business-management/payments/refunds/introduction#refundability>).
   * @param chargeId - ID of the charge for which refundability will be calculated.
   * @public
   * @documentationMaturity preview
   * @requiredField chargeId
   * @adminMethod
   */
  function getRefundability(chargeId: string): Promise<GetRefundabilityResponse>;
  
  type paymentsRefundsV1Refund_universal_d_Refund = Refund;
  type paymentsRefundsV1Refund_universal_d_ExtendedFields = ExtendedFields;
  type paymentsRefundsV1Refund_universal_d_Status = Status;
  const paymentsRefundsV1Refund_universal_d_Status: typeof Status;
  type paymentsRefundsV1Refund_universal_d_Initiator = Initiator;
  const paymentsRefundsV1Refund_universal_d_Initiator: typeof Initiator;
  type paymentsRefundsV1Refund_universal_d_StatusInfo = StatusInfo;
  type paymentsRefundsV1Refund_universal_d_InternalSyncRefundRequest = InternalSyncRefundRequest;
  type paymentsRefundsV1Refund_universal_d_InternalSyncRefundResponse = InternalSyncRefundResponse;
  type paymentsRefundsV1Refund_universal_d_CreateRefundRequest = CreateRefundRequest;
  type paymentsRefundsV1Refund_universal_d_CreateRefundResponse = CreateRefundResponse;
  type paymentsRefundsV1Refund_universal_d_GetRefundRequest = GetRefundRequest;
  type paymentsRefundsV1Refund_universal_d_GetRefundResponse = GetRefundResponse;
  type paymentsRefundsV1Refund_universal_d_QueryRefundsRequest = QueryRefundsRequest;
  type paymentsRefundsV1Refund_universal_d_CursorQuery = CursorQuery;
  type paymentsRefundsV1Refund_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type paymentsRefundsV1Refund_universal_d_Sorting = Sorting;
  type paymentsRefundsV1Refund_universal_d_SortOrder = SortOrder;
  const paymentsRefundsV1Refund_universal_d_SortOrder: typeof SortOrder;
  type paymentsRefundsV1Refund_universal_d_CursorPaging = CursorPaging;
  type paymentsRefundsV1Refund_universal_d_QueryRefundsResponse = QueryRefundsResponse;
  type paymentsRefundsV1Refund_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type paymentsRefundsV1Refund_universal_d_Cursors = Cursors;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type paymentsRefundsV1Refund_universal_d_GetRefundabilityRequest = GetRefundabilityRequest;
  type paymentsRefundsV1Refund_universal_d_GetRefundabilityResponse = GetRefundabilityResponse;
  type paymentsRefundsV1Refund_universal_d_Refundability = Refundability;
  type paymentsRefundsV1Refund_universal_d_RefundabilityDetailsOneOf = RefundabilityDetailsOneOf;
  type paymentsRefundsV1Refund_universal_d_RefundOptions = RefundOptions;
  type paymentsRefundsV1Refund_universal_d_Rejection = Rejection;
  type paymentsRefundsV1Refund_universal_d_RejectionReason = RejectionReason;
  const paymentsRefundsV1Refund_universal_d_RejectionReason: typeof RejectionReason;
  type paymentsRefundsV1Refund_universal_d_DomainEvent = DomainEvent;
  type paymentsRefundsV1Refund_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type paymentsRefundsV1Refund_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type paymentsRefundsV1Refund_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type paymentsRefundsV1Refund_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type paymentsRefundsV1Refund_universal_d_ActionEvent = ActionEvent;
  type paymentsRefundsV1Refund_universal_d_MessageEnvelope = MessageEnvelope;
  type paymentsRefundsV1Refund_universal_d_IdentificationData = IdentificationData;
  type paymentsRefundsV1Refund_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type paymentsRefundsV1Refund_universal_d_WebhookIdentityType = WebhookIdentityType;
  const paymentsRefundsV1Refund_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const paymentsRefundsV1Refund_universal_d_createRefund: typeof createRefund;
  type paymentsRefundsV1Refund_universal_d_CreateRefundOptions = CreateRefundOptions;
  const paymentsRefundsV1Refund_universal_d_getRefund: typeof getRefund;
  const paymentsRefundsV1Refund_universal_d_queryRefunds: typeof queryRefunds;
  type paymentsRefundsV1Refund_universal_d_RefundsQueryResult = RefundsQueryResult;
  type paymentsRefundsV1Refund_universal_d_RefundsQueryBuilder = RefundsQueryBuilder;
  const paymentsRefundsV1Refund_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  const paymentsRefundsV1Refund_universal_d_getRefundability: typeof getRefundability;
  namespace paymentsRefundsV1Refund_universal_d {
    export {
      paymentsRefundsV1Refund_universal_d_Refund as Refund,
      paymentsRefundsV1Refund_universal_d_ExtendedFields as ExtendedFields,
      paymentsRefundsV1Refund_universal_d_Status as Status,
      paymentsRefundsV1Refund_universal_d_Initiator as Initiator,
      paymentsRefundsV1Refund_universal_d_StatusInfo as StatusInfo,
      paymentsRefundsV1Refund_universal_d_InternalSyncRefundRequest as InternalSyncRefundRequest,
      paymentsRefundsV1Refund_universal_d_InternalSyncRefundResponse as InternalSyncRefundResponse,
      paymentsRefundsV1Refund_universal_d_CreateRefundRequest as CreateRefundRequest,
      paymentsRefundsV1Refund_universal_d_CreateRefundResponse as CreateRefundResponse,
      paymentsRefundsV1Refund_universal_d_GetRefundRequest as GetRefundRequest,
      paymentsRefundsV1Refund_universal_d_GetRefundResponse as GetRefundResponse,
      paymentsRefundsV1Refund_universal_d_QueryRefundsRequest as QueryRefundsRequest,
      paymentsRefundsV1Refund_universal_d_CursorQuery as CursorQuery,
      paymentsRefundsV1Refund_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      paymentsRefundsV1Refund_universal_d_Sorting as Sorting,
      paymentsRefundsV1Refund_universal_d_SortOrder as SortOrder,
      paymentsRefundsV1Refund_universal_d_CursorPaging as CursorPaging,
      paymentsRefundsV1Refund_universal_d_QueryRefundsResponse as QueryRefundsResponse,
      paymentsRefundsV1Refund_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      paymentsRefundsV1Refund_universal_d_Cursors as Cursors,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      paymentsRefundsV1Refund_universal_d_GetRefundabilityRequest as GetRefundabilityRequest,
      paymentsRefundsV1Refund_universal_d_GetRefundabilityResponse as GetRefundabilityResponse,
      paymentsRefundsV1Refund_universal_d_Refundability as Refundability,
      paymentsRefundsV1Refund_universal_d_RefundabilityDetailsOneOf as RefundabilityDetailsOneOf,
      paymentsRefundsV1Refund_universal_d_RefundOptions as RefundOptions,
      paymentsRefundsV1Refund_universal_d_Rejection as Rejection,
      paymentsRefundsV1Refund_universal_d_RejectionReason as RejectionReason,
      paymentsRefundsV1Refund_universal_d_DomainEvent as DomainEvent,
      paymentsRefundsV1Refund_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      paymentsRefundsV1Refund_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      paymentsRefundsV1Refund_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      paymentsRefundsV1Refund_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      paymentsRefundsV1Refund_universal_d_ActionEvent as ActionEvent,
      paymentsRefundsV1Refund_universal_d_MessageEnvelope as MessageEnvelope,
      paymentsRefundsV1Refund_universal_d_IdentificationData as IdentificationData,
      paymentsRefundsV1Refund_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      paymentsRefundsV1Refund_universal_d_WebhookIdentityType as WebhookIdentityType,
      paymentsRefundsV1Refund_universal_d_createRefund as createRefund,
      paymentsRefundsV1Refund_universal_d_CreateRefundOptions as CreateRefundOptions,
      paymentsRefundsV1Refund_universal_d_getRefund as getRefund,
      paymentsRefundsV1Refund_universal_d_queryRefunds as queryRefunds,
      paymentsRefundsV1Refund_universal_d_RefundsQueryResult as RefundsQueryResult,
      paymentsRefundsV1Refund_universal_d_RefundsQueryBuilder as RefundsQueryBuilder,
      paymentsRefundsV1Refund_universal_d_updateExtendedFields as updateExtendedFields,
      paymentsRefundsV1Refund_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
      paymentsRefundsV1Refund_universal_d_getRefundability as getRefundability,
    };
  }
  
  /** A way to pay online or offline for goods or services offered by a specific site. */
  interface SitePaymentMethodType {
      /** ID */
      _id?: string;
      /**
       * Id the payment method type used to have in our system. It is used in provider spi communication.
       * For some payment method types it is human readable i.e. payPal, creditCard, bit etc.
       * For others i.e. hosted pages, it is GUID
       */
      legacyId?: string | null;
      /** localized according to the caller locale */
      displayName?: string | null;
      /** localized according to the caller locale */
      description?: string | null;
      /** features supported for this payment method type */
      features?: Features;
      /** the configuration for the merchant flow i.e. accept payments */
      merchantFlow?: MerchantFlow;
      /** the configuration for the buyer flow i.e. checkout */
      buyerFlow?: BuyerFlow;
  }
  interface Features {
      /** indicates that this payment method type can be used in express flow */
      expressFlow?: ExpressFlow;
      /** indicates that this payment method type can be used in regular flow */
      regularFlow?: RegularFlow;
      /** indicates that disputes are supported for this payment method type */
      disputes?: Disputes;
      /** indicates that installments are supported for this payment method type */
      installments?: Installments;
      /** indicates that refunds are supported for this payment method type */
      refunds?: Refunds;
      /** indicates that auth capture flow is supported for this payment method type */
      authCapture?: AuthCapture;
      /** indicates that the regular (Wix) tokenization mechanism can be configured for this payment method type */
      regularTokenization?: RegularTokenization;
      /** indicates that the custom (provider specific etc.) tokenization mechanism can be configured for this payment method type */
      customTokenization?: CustomTokenization;
      /** indicates that the next action mechanism can be configured for this payment method type */
      nextAction?: NextAction;
      /** indicates that the credential on file feature is supported for this payment method type */
      credentialOnFile?: CredentialOnFile;
      /** indicates that Mail Order/Telephone Order is supported for this payment method type */
      moto?: Moto;
      /** indicates that promotional messages are supported for this payment method type */
      promotionalMessages?: PromotionalMessages;
  }
  interface IFrame {
      /** supported */
      supported?: boolean;
  }
  interface NewTab {
      /** supported */
      supported?: boolean;
  }
  interface FullPageRedirect {
      /** supported */
      supported?: boolean;
  }
  interface Barcode {
      /** supported */
      supported?: boolean;
  }
  interface QrCode {
      /** supported */
      supported?: boolean;
  }
  interface ExpressFlow {
      /** supported */
      supported?: boolean;
  }
  interface RegularFlow {
      /** supported */
      supported?: boolean;
  }
  interface Disputes {
      /** supported */
      supported?: boolean;
  }
  interface Installments {
      /** supported */
      supported?: boolean;
      /** countries for which installments can be enabled */
      allowedCountries?: string[];
      /** max number of installments that can be configured by provider */
      maxInstallmentCount?: number;
  }
  interface Refunds {
      /** supported */
      supported?: boolean;
      /** refundability period */
      refundabilityPeriodInDays?: number;
  }
  interface AuthCapture {
      /** supported */
      supported?: boolean;
      /** capture period */
      capturePeriodInDays?: number;
  }
  interface RegularTokenization {
      /** supported */
      supported?: boolean;
  }
  interface CustomTokenization {
      /** supported */
      supported?: boolean;
  }
  interface NextAction {
      /** show next payment action in iframe */
      iframe?: IFrame;
      /** show next payment action in the new tab */
      newTab?: NewTab;
      /** show next payment action as the full page redirect */
      fullPageRedirect?: FullPageRedirect;
      /** show next payment action as barcode scan */
      barcode?: Barcode;
      /** show next payment action as QR code scan */
      qrCode?: QrCode;
  }
  interface CredentialOnFile {
      /** supported */
      supported?: boolean;
  }
  interface Moto {
      /** supported */
      supported?: boolean;
  }
  interface PromotionalMessages {
      /** supported */
      supported?: boolean;
  }
  interface MerchantFlow {
      /** icons for the accept payments according to the caller locale */
      icons?: Icon[];
      /** the lower the order, the higher payment method should appear in the list */
      rank?: number;
      /** indicates whether the payment method type is promoted */
      promoted?: boolean;
  }
  /**
   * Example url:
   * http://images-wixmp-6613fa290e8c1ac70a0297b6.wixmp.com/payment-methods/{domain}/{extension}/{id}.{extension}
   */
  interface Icon {
      /** WixMedia object with the id and url of the icon */
      image?: string;
      /**
       * clients can attach multiple icons and assign custom tags to them
       * in order to use them in specific flows
       */
      tags?: string[] | null;
      /** image extension */
      format?: Format;
  }
  enum Format {
      UNKNOWN_FORMAT = "UNKNOWN_FORMAT",
      SVG = "SVG",
      PNG = "PNG"
  }
  interface BuyerFlow {
      /** icons for the checkout according to the caller locale */
      icons?: Icon[];
      /** relative order */
      rank?: number;
  }
  interface GetSitePaymentMethodTypeRequest {
      /** SitePaymentMethodType ID */
      sitePaymentMethodTypeId: string;
  }
  interface GetSitePaymentMethodTypeResponse {
      /** The requested SitePaymentMethodType. */
      sitePaymentMethodType?: SitePaymentMethodType;
  }
  interface ListSitePaymentMethodTypesRequest {
      /** Return only the records having their `id` or `legacyId` matching any of the IDs passed. */
      ids?: string[];
  }
  interface ListSitePaymentMethodTypesResponse {
      /** List of SitePaymentMethodTypes. */
      sitePaymentMethodTypes?: SitePaymentMethodType[];
  }
  /**
   * Retrieves a SitePaymentMethodType.
   * @param sitePaymentMethodTypeId - SitePaymentMethodType ID
   * @internal
   * @documentationMaturity preview
   * @requiredField sitePaymentMethodTypeId
   * @adminMethod
   * @returns The requested SitePaymentMethodType.
   */
  function getSitePaymentMethodType(sitePaymentMethodTypeId: string): Promise<SitePaymentMethodType>;
  /**
   * Retrieves a list of SitePaymentMethodTypes
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function listSitePaymentMethodTypes(options?: ListSitePaymentMethodTypesOptions): Promise<ListSitePaymentMethodTypesResponse>;
  interface ListSitePaymentMethodTypesOptions {
      /** Return only the records having their `id` or `legacyId` matching any of the IDs passed. */
      ids?: string[];
  }
  
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_SitePaymentMethodType = SitePaymentMethodType;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Features = Features;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_IFrame = IFrame;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NewTab = NewTab;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_FullPageRedirect = FullPageRedirect;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Barcode = Barcode;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_QrCode = QrCode;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ExpressFlow = ExpressFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularFlow = RegularFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Disputes = Disputes;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Installments = Installments;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Refunds = Refunds;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_AuthCapture = AuthCapture;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularTokenization = RegularTokenization;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CustomTokenization = CustomTokenization;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NextAction = NextAction;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CredentialOnFile = CredentialOnFile;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Moto = Moto;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_PromotionalMessages = PromotionalMessages;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_MerchantFlow = MerchantFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Icon = Icon;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format = Format;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format: typeof Format;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_BuyerFlow = BuyerFlow;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeRequest = GetSitePaymentMethodTypeRequest;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeResponse = GetSitePaymentMethodTypeResponse;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesRequest = ListSitePaymentMethodTypesRequest;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesResponse = ListSitePaymentMethodTypesResponse;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_getSitePaymentMethodType: typeof getSitePaymentMethodType;
  const paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_listSitePaymentMethodTypes: typeof listSitePaymentMethodTypes;
  type paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesOptions = ListSitePaymentMethodTypesOptions;
  namespace paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d {
    export {
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_SitePaymentMethodType as SitePaymentMethodType,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Features as Features,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_IFrame as IFrame,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NewTab as NewTab,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_FullPageRedirect as FullPageRedirect,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Barcode as Barcode,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_QrCode as QrCode,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ExpressFlow as ExpressFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularFlow as RegularFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Disputes as Disputes,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Installments as Installments,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Refunds as Refunds,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_AuthCapture as AuthCapture,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_RegularTokenization as RegularTokenization,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CustomTokenization as CustomTokenization,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_NextAction as NextAction,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_CredentialOnFile as CredentialOnFile,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Moto as Moto,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_PromotionalMessages as PromotionalMessages,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_MerchantFlow as MerchantFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Icon as Icon,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_Format as Format,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_BuyerFlow as BuyerFlow,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeRequest as GetSitePaymentMethodTypeRequest,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_GetSitePaymentMethodTypeResponse as GetSitePaymentMethodTypeResponse,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesRequest as ListSitePaymentMethodTypesRequest,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesResponse as ListSitePaymentMethodTypesResponse,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_getSitePaymentMethodType as getSitePaymentMethodType,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_listSitePaymentMethodTypes as listSitePaymentMethodTypes,
      paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d_ListSitePaymentMethodTypesOptions as ListSitePaymentMethodTypesOptions,
    };
  }
  
  export { paymentsChargesV1Charge_universal_d as charges, paymentsRefundsV1Refund_universal_d as refunds, paymentsSitePaymentMethodTypesV1SitePaymentMethodType_universal_d as sitePaymentMethodTypes };
}
