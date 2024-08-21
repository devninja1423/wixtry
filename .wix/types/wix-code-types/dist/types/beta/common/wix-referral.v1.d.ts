declare module "wix-referral.v1" {
  /** ReferralProgram is the main entity of ReferralPrograms that can be used to manage the program. */
  interface ReferralProgram {
      /** Referral program name */
      name?: string | null;
      /**
       * Referral program status
       * @readonly
       */
      status?: ProgramStatus;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision */
      revision?: string | null;
      /**
       * Program's creation date and time
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Program's last update date and time
       * @readonly
       */
      _updatedDate?: Date;
      /** Referred friend reward configuration */
      referredFriendReward?: Reward$2;
      /** Referring customer reward configuration */
      referringCustomerReward?: Reward$2;
      /** List of actions that complete referral */
      successfulReferralActions?: Action[];
      /**
       * Set to true if user has required plan to activate program
       * @readonly
       */
      isPremium?: boolean;
      /** Emails configuration */
      emails?: Emails;
  }
  enum ProgramStatus {
      UNKNOWN = "UNKNOWN",
      /** initial program status (program was created but was not enabled yet) */
      DRAFT = "DRAFT",
      /** program is active */
      ACTIVE = "ACTIVE",
      /** program was manually disabled by the user (this action can be reverted, meaning user can set it to be active again) */
      PAUSED = "PAUSED"
  }
  interface Reward$2 extends RewardOptionsOneOf$1 {
      /** Options for coupon reward type */
      couponOptions?: Coupon$2;
      /** Options for Loyalty points reward type */
      loyaltyPointsOptions?: LoyaltyPoints$2;
      /** Type of the reward */
      type?: Type$1;
  }
  /** @oneof */
  interface RewardOptionsOneOf$1 {
      /** Options for coupon reward type */
      couponOptions?: Coupon$2;
      /** Options for Loyalty points reward type */
      loyaltyPointsOptions?: LoyaltyPoints$2;
  }
  enum Type$1 {
      UNKNOWN = "UNKNOWN",
      /** Coupon reward type */
      COUPON = "COUPON",
      /** Loyalty points reward type */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward type */
      NOTHING = "NOTHING"
  }
  interface Coupon$2 extends CouponDiscountTypeOptionsOneOf$2, CouponScopeOrMinSubtotalOneOf$2 {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount$2;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount$2;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope$2;
      /** Coupon name */
      name?: string;
      /** Coupon discount type */
      discountType?: DiscountType$2;
      /** Limit the coupon to only apply to one item in cart. */
      limitedToOneItem?: boolean | null;
      /** If true, coupon also applies to subscriptions. */
      appliesToSubscriptions?: boolean | null;
      /** Specifies the amount of discounted cycles for subscription item. See Stores Coupons documentation for more info. */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf$2 {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount$2;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount$2;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf$2 {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope$2;
  }
  enum DiscountType$2 {
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount$2 {
      /** Fixed amount to discount */
      amount?: number;
  }
  interface PercentageDiscount$2 {
      percentage?: number;
  }
  interface CouponScope$2 {
      namespace?: string;
      group?: Group$2;
  }
  interface Group$2 {
      name?: string;
      entityId?: string | null;
  }
  interface LoyaltyPoints$2 {
      /** Amount of points to give */
      amount?: number;
  }
  enum Action {
      UNKNOWN = "UNKNOWN",
      /** Store order placed */
      STORE_ORDER_PLACED = "STORE_ORDER_PLACED",
      /** Pricing plan ordered */
      PLAN_ORDERED = "PLAN_ORDERED",
      /** Wix events ticket ordered */
      TICKET_ORDERED = "TICKET_ORDERED",
      /** Bookings session booked */
      SESSION_BOOKED = "SESSION_BOOKED",
      /** Restaurant order placed */
      RESTAURANT_ORDER_PLACED = "RESTAURANT_ORDER_PLACED"
  }
  interface Emails {
      /** Encourage customers to refer their friends email. Select for which apps to enable. */
      encourageToReferFriends?: App[];
      /** Notify customers about their referral reward email. Set true to enable email. */
      notifyCustomersAboutReward?: boolean;
  }
  enum App {
      UNKNOWN = "UNKNOWN",
      STORES = "STORES",
      PRICING_PLANS = "PRICING_PLANS",
      EVENTS = "EVENTS",
      BOOKINGS = "BOOKINGS",
      RESTAURANTS = "RESTAURANTS"
  }
  interface GetReferralProgramRequest {
  }
  interface GetReferralProgramResponse {
      /** The retrieved ReferralProgram */
      referralProgram?: ReferralProgram;
  }
  interface BulkGetReferralProgramRequest {
  }
  interface BulkGetReferralProgramResponse {
      programInSites?: ProgramInSite[];
  }
  interface ProgramInSite {
      /** Metasite ID. */
      metaSiteId?: string;
      /** Referral program. */
      referralProgram?: ReferralProgram;
  }
  interface QueryReferralProgramsRequest {
      query: CursorQuery$4;
  }
  interface CursorQuery$4 extends CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
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
      sort?: Sorting$4[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$4 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$4;
  }
  interface Sorting$4 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$4;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder$4 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$4 {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryReferralProgramsResponse {
      referralPrograms?: ReferralProgram[];
      pagingMetadata?: CursorPagingMetadata$4;
  }
  interface CursorPagingMetadata$4 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$4;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$4 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateReferralProgramRequest {
      /** ReferralProgram to be updated, may be partial */
      referralProgram: ReferralProgram;
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  interface UpdateReferralProgramResponse {
      /** The updated ReferralProgram */
      referralProgram?: ReferralProgram;
  }
  interface ActivateReferralProgramRequest {
  }
  interface ActivateReferralProgramResponse {
      referralProgram?: ReferralProgram;
  }
  interface PauseReferralProgramRequest {
  }
  interface PauseReferralProgramResponse {
      referralProgram?: ReferralProgram;
  }
  interface GetAISocialMediaPostsSuggestionsRequest {
      /** The topic to generate suggestions for. */
      topic?: string;
  }
  interface GetAISocialMediaPostsSuggestionsResponse {
      /** The generated suggestions. */
      suggestions?: AISocialMediaPostSuggestion[];
      /** The refer friends page URL. */
      referFriendsPageUrl?: string | null;
  }
  interface AISocialMediaPostSuggestion {
      /** The suggested post content. */
      postContent?: string;
      /** The suggested hashtags. */
      hashtags?: string[];
  }
  interface GenerateAISocialMediaPostsSuggestionsRequest {
      /** The topic to generate suggestions for. */
      topic?: string;
  }
  interface GenerateAISocialMediaPostsSuggestionsResponse {
      /** The generated suggestions. */
      suggestions?: AISocialMediaPostSuggestion[];
      /** The refer friends page URL. */
      referFriendsPageUrl?: string | null;
  }
  interface GetReferralProgramPremiumFeaturesRequest {
  }
  interface GetReferralProgramPremiumFeaturesResponse {
      /**
       * Set to true if user has referral program feature
       * @readonly
       */
      referralProgram?: boolean;
  }
  interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
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
  interface DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
  }
  interface EntityCreatedEvent$4 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$4;
  }
  interface UndeleteInfo$4 {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent$4 {
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
  interface EntityDeletedEvent$4 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$4 {
      bodyAsJson?: string;
  }
  interface Empty$3 {
  }
  interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
      /** A meta site id. */
      metaSiteId?: string;
      /** A meta site version. Monotonically increasing. */
      version?: string;
      /** A timestamp of the event. */
      timestamp?: string;
      /** A list of "assets" (applications). The same as MetaSiteContext. */
      assets?: Asset[];
  }
  /** @oneof */
  interface MetaSiteSpecialEventPayloadOneOf {
      /** Emitted on a meta site creation. */
      siteCreated?: SiteCreated;
      /** Emitted on a meta site transfer completion. */
      siteTransferred?: SiteTransferred;
      /** Emitted on a meta site deletion. */
      siteDeleted?: SiteDeleted;
      /** Emitted on a meta site restoration. */
      siteUndeleted?: SiteUndeleted;
      /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
      sitePublished?: SitePublished;
      /** Emitted on a meta site unpublish. */
      siteUnpublished?: SiteUnpublished;
      /** Emitted when meta site is marked as template. */
      siteMarkedAsTemplate?: SiteMarkedAsTemplate;
      /** Emitted when meta site is marked as a WixSite. */
      siteMarkedAsWixSite?: SiteMarkedAsWixSite;
      /** Emitted when an application is provisioned (installed). */
      serviceProvisioned?: ServiceProvisioned;
      /** Emitted when an application is removed (uninstalled). */
      serviceRemoved?: ServiceRemoved;
      /** Emitted when meta site name (URL slug) is changed. */
      siteRenamedPayload?: SiteRenamed;
      /** Emitted when meta site was permanently deleted. */
      hardDeleted?: SiteHardDeleted;
      /** Emitted on a namespace change. */
      namespaceChanged?: NamespaceChanged;
      /** Emitted when Studio is attached. */
      studioAssigned?: StudioAssigned;
      /** Emitted when Studio is detached. */
      studioUnassigned?: StudioUnassigned;
  }
  interface Asset {
      /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
      appDefId?: string;
      /** An instance id. For legacy reasons may be UUID or a string. */
      instanceId?: string;
      /** An application state. */
      state?: State;
  }
  enum State {
      UNKNOWN = "UNKNOWN",
      ENABLED = "ENABLED",
      DISABLED = "DISABLED",
      PENDING = "PENDING",
      DEMO = "DEMO"
  }
  interface SiteCreated {
      /** A template identifier (empty if not created from a template). */
      originTemplateId?: string;
      /** An account id of the owner. */
      ownerId?: string;
      /** A context in which meta site was created. */
      context?: SiteCreatedContext;
      /**
       * A meta site id from which this site was created.
       *
       * In case of a creation from a template it's a template id.
       * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
       */
      originMetaSiteId?: string | null;
      /** A meta site name (URL slug). */
      siteName?: string;
      /** A namespace. */
      namespace?: Namespace;
  }
  enum SiteCreatedContext {
      /** A valid option, we don't expose all reasons why site might be created. */
      OTHER = "OTHER",
      /** A meta site was created from template. */
      FROM_TEMPLATE = "FROM_TEMPLATE",
      /** A meta site was created by copying of the transfferred meta site. */
      DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
      /** A copy of existing meta site. */
      DUPLICATE = "DUPLICATE",
      /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
      OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
      /** deprecated A meta site was created for Flash editor. */
      FLASH = "FLASH"
  }
  enum Namespace {
      UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
      /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
      WIX = "WIX",
      /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      SHOUT_OUT = "SHOUT_OUT",
      /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ALBUMS = "ALBUMS",
      /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
      /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      HOTELS = "HOTELS",
      /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      CLUBS = "CLUBS",
      /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
      /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_SITE = "DEV_SITE",
      /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      LOGOS = "LOGOS",
      /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
      VIDEO_MAKER = "VIDEO_MAKER",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
      /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
      DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
      /**
       * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
       *
       * Meta site with this namespace will *not* be shown in a user's site list by default.
       */
      HTML_DRAFT = "HTML_DRAFT",
      /**
       * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
       * Will be accessible from Site List and will not have a website app.
       * Once the user attaches a site, the site will become a regular wixsite.
       */
      SITELESS_BUSINESS = "SITELESS_BUSINESS",
      /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
      CREATOR_ECONOMY = "CREATOR_ECONOMY",
      /** It is to be used in the Business First efforts. */
      DASHBOARD_FIRST = "DASHBOARD_FIRST",
      /** Bookings business flow with no site. */
      ANYWHERE = "ANYWHERE",
      /** Namespace for Headless Backoffice with no editor */
      HEADLESS = "HEADLESS",
      /**
       * Namespace for master site that will exist in parent account that will be referenced by subaccounts
       * The site will be used for account level CSM feature for enterprise
       */
      ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
      /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
      RISE = "RISE",
      /**
       * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
       * There's a blank site behind the scene but it's blank).
       * The Mobile company will be the owner of this namespace.
       */
      BRANDED_FIRST = "BRANDED_FIRST"
  }
  /** Site transferred to another user. */
  interface SiteTransferred {
      /** A previous owner id (user that transfers meta site). */
      oldOwnerId?: string;
      /** A new owner id (user that accepts meta site). */
      newOwnerId?: string;
  }
  /** Soft deletion of the meta site. Could be restored. */
  interface SiteDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface DeleteContext {
      /** When the meta site was deleted. */
      dateDeleted?: Date;
      /** A status. */
      deleteStatus?: DeleteStatus;
      /** A reason (flow). */
      deleteOrigin?: string;
      /** A service that deleted it. */
      initiatorId?: string | null;
  }
  enum DeleteStatus {
      UNKNOWN = "UNKNOWN",
      TRASH = "TRASH",
      DELETED = "DELETED",
      PENDING_PURGE = "PENDING_PURGE"
  }
  /** Restoration of the meta site. */
  interface SiteUndeleted {
  }
  /** First publish of a meta site. Or subsequent publish after unpublish. */
  interface SitePublished {
  }
  interface SiteUnpublished {
      /** A list of URLs previously associated with the meta site. */
      urls?: string[];
  }
  interface SiteMarkedAsTemplate {
  }
  interface SiteMarkedAsWixSite {
  }
  interface ServiceProvisioned {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** An instance id from which this instance is originated. */
      originInstanceId?: string;
      /** A version. */
      version?: string | null;
  }
  interface ServiceRemoved {
      /** Either UUID or EmbeddedServiceType. */
      appDefId?: string;
      /** Not only UUID. Something here could be something weird. */
      instanceId?: string;
      /** A version. */
      version?: string | null;
  }
  /** Rename of the site. Meaning, free public url has been changed as well. */
  interface SiteRenamed {
      /** A new meta site name (URL slug). */
      newSiteName?: string;
      /** A previous meta site name (URL slug). */
      oldSiteName?: string;
  }
  /**
   * Hard deletion of the meta site.
   *
   * Could not be restored. Therefore it's desirable to cleanup data.
   */
  interface SiteHardDeleted {
      /** A deletion context. */
      deleteContext?: DeleteContext;
  }
  interface NamespaceChanged {
      /** A previous namespace. */
      oldNamespace?: Namespace;
      /** A new namespace. */
      newNamespace?: Namespace;
  }
  /** Assigned Studio editor */
  interface StudioAssigned {
  }
  /** Unassigned Studio editor */
  interface StudioUnassigned {
  }
  interface HtmlSitePublished {
      /** Application instance ID */
      appInstanceId?: string;
      /** Application type */
      appType?: string;
      /** Revision */
      revision?: string;
      /** MSID */
      metaSiteId?: string | null;
      /** optional branch id if publish is done from branch */
      branchId?: string | null;
      /** The site's last transactionId */
      lastTransactionId?: string | null;
      /** A list of the site's pages */
      pages?: Page[];
      /** Site's publish date */
      publishDate?: string;
  }
  interface Page {
      /** Page's Id */
      _id?: string;
  }
  interface SubscriptionEvent extends SubscriptionEventEventOneOf {
      /** Triggered when a subscription is created. */
      created?: SubscriptionCreated;
      /**
       * Triggered when a subscription is assigned to a Wix site, including the initial
       * assignment of a floating subscription or a re-assignement from a different site.
       */
      assigned?: SubscriptionAssigned;
      /** Triggered when a subscription is canceled. */
      cancelled?: SubscriptionCancelled;
      /** Triggered when the subscription's auto renew is turned on. */
      autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
      /** Triggered when the subscription's auto renew is turned off. */
      autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
      /**
       * Triggered when a subscription is unassigned from a Wix site and becomes
       * floating.
       */
      unassigned?: SubscriptionUnassigned;
      /**
       * Triggered when a subscription is transferred from one Wix account to another.
       * A transfer includes cancelling the original subscription and creating a new
       * subscription for the target account. The event returns both the original
       * and the new subscription.
       */
      transferred?: SubscriptionTransferred;
      /** Triggered when a recurring charge succeeds for a subscription. */
      recurringChargeSucceeded?: RecurringChargeSucceeded;
      /**
       * Triggered when a subscription was updated including when its product has been
       * up- or downgraded or the billing cycle is changed.
       */
      contractSwitched?: ContractSwitched;
      /**
       * Triggered when a subscription gets close to the end of its billing cycle.
       * The exact number of days is defined in the billing system.
       */
      nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
      /**
       * Triggered when a subscription is updated and the change doesn't happen
       * immediately but at the end of the current billing cycle.
       */
      pendingChange?: SubscriptionPendingChange;
      /** ID of the subscription's event. */
      eventId?: string | null;
      /**
       * Date and time of the event in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      eventDate?: Date;
  }
  /** @oneof */
  interface SubscriptionEventEventOneOf {
      /** Triggered when a subscription is created. */
      created?: SubscriptionCreated;
      /**
       * Triggered when a subscription is assigned to a Wix site, including the initial
       * assignment of a floating subscription or a re-assignement from a different site.
       */
      assigned?: SubscriptionAssigned;
      /** Triggered when a subscription is canceled. */
      cancelled?: SubscriptionCancelled;
      /** Triggered when the subscription's auto renew is turned on. */
      autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
      /** Triggered when the subscription's auto renew is turned off. */
      autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
      /**
       * Triggered when a subscription is unassigned from a Wix site and becomes
       * floating.
       */
      unassigned?: SubscriptionUnassigned;
      /**
       * Triggered when a subscription is transferred from one Wix account to another.
       * A transfer includes cancelling the original subscription and creating a new
       * subscription for the target account. The event returns both the original
       * and the new subscription.
       */
      transferred?: SubscriptionTransferred;
      /** Triggered when a recurring charge succeeds for a subscription. */
      recurringChargeSucceeded?: RecurringChargeSucceeded;
      /**
       * Triggered when a subscription was updated including when its product has been
       * up- or downgraded or the billing cycle is changed.
       */
      contractSwitched?: ContractSwitched;
      /**
       * Triggered when a subscription gets close to the end of its billing cycle.
       * The exact number of days is defined in the billing system.
       */
      nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
      /**
       * Triggered when a subscription is updated and the change doesn't happen
       * immediately but at the end of the current billing cycle.
       */
      pendingChange?: SubscriptionPendingChange;
  }
  /** Triggered when a subscription is created. */
  interface SubscriptionCreated {
      /** Created subscription. */
      subscription?: Subscription;
      /** Metadata for the `created` event. */
      metadata?: Record<string, string>;
      /**
       * Subscription reactivation data.
       * A subscription can be reactivated for example if it was incorrectly canceled because of fraud and then reactivated
       * by the billing system
       */
      reactivationData?: ReactivationData;
  }
  /**
   * A subscription holds information about a Premium product that a Wix account
   * owner has purchased including details about the billing.
   */
  interface Subscription {
      /** ID of the subscription. */
      _id?: string;
      /** ID of the Wix account that purchased the subscription. */
      userId?: string;
      /**
       * ID of the [product](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/products/product-object)
       * for which the subscription was purchased.
       */
      productId?: string;
      /**
       * Date and time the subscription was created in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      createdAt?: Date;
      /**
       * Date and time the subscription was last updated in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      updatedAt?: Date;
      /**
       * ID of the metasite that the subscription is assigned to.
       * Available only when the subscription is assigned to a Wix site.
       * Subscriptions for account level products can't be assigned to a Wix site.
       */
      metaSiteId?: string | null;
      /** Information about the system that manages the subscription's billing. */
      billingReference?: BillingReference;
      /** Information about the billing cycle of the subscription. */
      cycle?: Cycle;
      /**
       * Subscription status.
       *
       * + `UNKNOWN`: Default status.
       * + `AUTO_RENEW_ON`: Subscription is active and automatically renews at the end of the current billing cycle.
       * + `AUTO_RENEW_OFF`: Subscription is active but expires at the end of the current billing cycle.
       * + `MANUAL_RECURRING`: Subscription is active and renews at the end of the current billing cycle, in case the customer takes an action related to the payment.
       * + `CANCELLED`: Subscription isn't active because it has been canceled.
       * + `TRANSFERRED`: Subscription isn't active because it has been transferred to a different account. A different active subscription was created for the target account.
       */
      status?: SubscriptionStatus;
      /**
       * Date and time the subscription was last transferred from one Wix account to
       * another in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      transferredAt?: Date;
      /**
       * ID of the [product type](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/product-types/product-type-object)
       * that the product, for which the subscription was purchased, belongs to.
       */
      productTypeId?: string;
      /** Version number, which increments by 1 each time the subscription is updated. */
      version?: number;
      /**
       * Whether the subscription is active. Includes the statuses
       * `"AUTO_RENEW_ON"`, `"AUTO_RENEW_OFF"`, and `"MANUAL_RECURRING"`.
       */
      active?: boolean;
      /**
       * Date and time the subscription was originally created in
       * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       * Differs from `createdAt` in case the subscription was originally created for a different Wix account and has been transferred.
       */
      originalCreationDate?: Date;
      /** Custom metadata about the subscription. */
      metadata?: Record<string, string>;
      /**
       * 2-letter country code in
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
       * format.
       */
      countryCode?: string | null;
  }
  interface BillingReference {
      /**
       * Name of the billing system that manages the subscription.
       *
       * + `"UNKNOWN"`: Default value.
       * + `"SBS"`: [Wix Billing](https://github.com/wix-p/premium-billing/tree/master/sbs).
       * + `"LICENSER"`:
       * + `"BASS"`: [Billing and Subscriptions System](https://dev.wix.com/docs/rest/internal-only/premium/subscriptions-by-billing-by-wix/introduction).
       * + `"RESELLER"`: [External Reseller](https://dev.wix.com/api/rest/account-level-apis/resellers/introduction).
       */
      providerName?: ProviderName;
      /** Current provider reference ID. */
      providerReferenceId?: string | null;
      /** Previous provider reference IDs. Used for when a subscription is extended, specifically for domains. */
      previousProviderReferenceIds?: string[];
  }
  enum ProviderName {
      UNKNOWN = "UNKNOWN",
      SBS = "SBS",
      LICENSER = "LICENSER",
      BASS = "BASS",
      RESELLER = "RESELLER",
      RECURRING_INVOICES = "RECURRING_INVOICES"
  }
  interface Cycle extends CycleCycleSelectorOneOf {
      /** repetitive interval */
      interval?: Interval;
      /** one time */
      oneTime?: OneTime;
  }
  /** @oneof */
  interface CycleCycleSelectorOneOf {
      /** repetitive interval */
      interval?: Interval;
      /** one time */
      oneTime?: OneTime;
  }
  interface Interval {
      /** interval unit of measure */
      unit?: IntervalUnit;
      /** number of interval */
      count?: number;
  }
  enum IntervalUnit {
      /** unknown interval unit */
      UNKNOWN = "UNKNOWN",
      /** day */
      DAY = "DAY",
      /** week */
      WEEK = "WEEK",
      /** month */
      MONTH = "MONTH",
      /** year */
      YEAR = "YEAR"
  }
  interface OneTime {
  }
  enum SubscriptionStatus {
      UNKNOWN = "UNKNOWN",
      AUTO_RENEW_ON = "AUTO_RENEW_ON",
      AUTO_RENEW_OFF = "AUTO_RENEW_OFF",
      MANUAL_RECURRING = "MANUAL_RECURRING",
      CANCELLED = "CANCELLED",
      TRANSFERRED = "TRANSFERRED"
  }
  /** Triggered when a subscription is reactivated. */
  interface ReactivationData {
      reactivationReason?: ReactivationReasonEnum;
      /**
       * In the event of reactivation after chargeback dispute, the subscription may be extended according to the
       * number of days it was inactive during the time of resolving the dispute
       */
      newEndOfPeriod?: Date;
      /** The original end date, before the inactive period. */
      oldEndOfPeriod?: Date;
      /** The difference in days between the new new_end_of_period and old_end_of_period */
      differenceInDays?: number | null;
  }
  /** Reason for subscription reactivation */
  enum ReactivationReasonEnum {
      UNKNOWN = "UNKNOWN",
      /**
       * Subscription was reactivated due to billing status change from CANCELED to ACTIVE, for example if it was incorrectly
       * canceled because of suspicion of fraud
       */
      BILLING_STATUS_CHANGE = "BILLING_STATUS_CHANGE",
      /** Subscription was reactivated after a chargeback dispute */
      REACTIVATED_AFTER_CHARGEBACK = "REACTIVATED_AFTER_CHARGEBACK"
  }
  /**
   * Triggered when a subscription is assigned to a Wix site, including the initial
   * assignment of a floating subscription or a re-assignement from a different site.
   */
  interface SubscriptionAssigned {
      /** Assigned subscription. */
      subscription?: Subscription;
      /** ID of the metasite that the subscription has been assigned to before the update. */
      previousMetaSiteId?: string | null;
  }
  /** Triggered when a subscription is canceled. */
  interface SubscriptionCancelled {
      /** Canceled subscription. */
      subscription?: Subscription;
      /** Details about the cancellation including who canceled the subscription and why. */
      cancellationDetails?: CancellationDetails;
      /**
       * Whether the subscription is canceled immediately or expires at the end of the current billing cycle.
       *
       * Default: `false`
       */
      immediateCancel?: boolean;
      /** Whether the subscription was canceled during the free trial period. */
      canceledInFreeTrial?: boolean;
  }
  /** Information about the cancellation flow including who canceled the subscription and why it was canceled. */
  interface CancellationDetails {
      /**
       * Cancellation code.
       *
       * Values supported for cancellations on behalf of the billing system: `-1`, `-2`, `-3`, `-4`, `-5`, `-6`, `-7`, `-8`.
       * For cancellations on behalf of the site owner or the service provider `cancellationCode`
       * is taken from the request of
       * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       *
       * + `-1`: The subscription has been cancelled by the billing system but none of the listed cancellation reasons applies.
       * + `-2`: There were payment problems.
       * + `-3`: There was a chargeback.
       * + `-4`: Customer support has canceled the subscription and issued a refund.
       * + `-5`: The site owner has changed their existing subscription.
       * + `-6`: The subscription has been transferred to a different Wix account.
       * + `-7`: The subscription has been canceled because the site owner hasn't manually authenticated the recurring payment during the subscription's grace period. For example, site owners must manually confirm recurring payments within 40 days when paying with boleto.
       * + `-8`: The Wix account that the subscription belonged to has been deleted.
       */
      cancellationCode?: number | null;
      /**
       * Cancellation reason. For cancellations on behalf of the site owner or the service provider `cancellationReason`
       * is taken from the request of
       * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       * For cancellations on behalf of the billing system `cancellationReason` is `null` or an empty string.
       */
      cancellationReason?: string | null;
      /**
       * Initiator of the cancellation. For `"USER_REQUESTED"` and `"APP_MANAGED"`,
       * `cancellationCode` and `cancellationReason` are taken from the request of
       * [Cancel Immediately](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately)
       * or [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
       * For `"PASSIVE"`, cancellations `cancellationCode` is automatically calculated and `cancellationReason`
       * is `null` or an empty string.
       *
       * + `"UNKNOWN`: Default value.
       * + `"USER_REQUESTED"`:  The Wix account owner has canceled the subscription.
       * + `"APP_MANAGED"`: The service provider has canceled the subscription.
       * + `"PASSIVE"`: The billing system has canceled the subscription. For example, in case of payment failure or fraud.
       */
      initiator?: Initiator;
  }
  enum Initiator {
      UNKNOWN = "UNKNOWN",
      USER_REQUESTED = "USER_REQUESTED",
      APP_MANAGED = "APP_MANAGED",
      PASSIVE = "PASSIVE"
  }
  /** Triggered when the subscription's auto renew is turned on. */
  interface SubscriptionAutoRenewTurnedOn {
      /** Subscription for which auto renew is turned on. */
      subscription?: Subscription;
      /**
       * Supported values: `USER`, `APP`.
       *
       * Information about who turned auto renew on.
       * + `"USER"`: The site owner who purchased the subscription has turned auto renew on.
       * + `"APP"`: The service provider has turned auto renew on.
       */
      initiator?: string | null;
  }
  /** Triggered when the subscription's auto renew is turned off. */
  interface SubscriptionAutoRenewTurnedOff {
      /** Subscription for which auto renew is turned off. */
      subscription?: Subscription;
      /** Details about the cancellation including who canceled the subscription and why. */
      cancellationDetails?: CancellationDetails;
      /**
       * Whether the subscription is immediately canceled or expires at the end of the current billing cycle.
       *
       * Default: `false`
       */
      immediateCancel?: boolean;
  }
  /**
   * Triggered when a subscription is unassigned from a Wix site and becomes
   * floating.
   */
  interface SubscriptionUnassigned {
      /** Unassigned subscription. */
      subscription?: Subscription;
      /** ID of the metasite that the subscription has been assigned to before the event. */
      previousMetaSiteId?: string;
      /**
       * Reason why the subscription is unassigned.
       *
       * + `"UNKNOWN"`: Default value.
       * + `"USER_REQUESTED"`: The Wix account owner has unassigned the subscription.
       * + `"REPLACED_BY_ANOTHER_SUBSCRIPTION"`: A different subscription that replaces this subscription is assigned to the site.
       */
      unassignReason?: UnassignReason;
  }
  enum UnassignReason {
      UNKNOWN = "UNKNOWN",
      USER_REQUESTED = "USER_REQUESTED",
      REPLACED_BY_ANOTHER_SUBSCRIPTION = "REPLACED_BY_ANOTHER_SUBSCRIPTION"
  }
  /**
   * Triggered when a subscription is transferred from one Wix account to another.
   * A transfer includes cancelling the original subscription and creating a new
   * subscription for the target account. The event returns both the original
   * and the new subscription.
   */
  interface SubscriptionTransferred {
      /** Original subscription that was canceled for the transfer. */
      originSubscription?: Subscription;
      /** Newly created subscription for the target account. */
      targetSubscription?: Subscription;
  }
  /** Triggered when a recurring charge succeeds for a subscription. */
  interface RecurringChargeSucceeded {
      /** Subscription for which the recurring charge has succeeded. */
      subscription?: Subscription;
      /** Indication that there was a successful charge at the end of the free trial period */
      freeTrialPeriodEnd?: boolean;
  }
  /**
   * Triggered when a subscription was updated including when its product has been
   * up- or downgraded or the billing cycle is changed.
   */
  interface ContractSwitched {
      /** Updated subscription. */
      subscription?: Subscription;
      /** Billing cycle before the update. */
      previousCycle?: Cycle;
      /** ID of the product belonging to the subscription before the update. */
      previousProductId?: string;
      /** ID of the product type that the subscription's original product belonged to before the update. */
      previousProductTypeId?: string;
      /**
       * Update type. __Note__: Doesn't include information about a product adjustment.
       * For that purpose, see `productAdjustment`.
       *
       * + `"NOT_APPLICABLE"`: Default value.
       * + `"ADDITIONAL_QUANTITY"`: An increased usage quota is added to the subscription. For example, a second mailbox is added to a subscription that previously included a single mailbox.
       * + `"CREDIT_UNUSED_PERIOD"`: The subscription is upgraded and the new price is less than the regular price. The new price applies to every billing cycle, not just the first cycle.
       * + `"REFUND_PRICE_DIFF"`: Not implemented.
       * + `"ADJUST_PERIOD_END"`: Not implemented.
       * + `"DOWNGRADE_GRACE_PERIOD"`: For downgrades during the grace period. In this situation, the site owner hasn’t paid yet and must immediately pay for the downgraded subscription.
       * + `"FULL_AMOUNT_PERIOD"`: For upgrades in which the site owner retains unused benefits. For example, site owners upgrading a Facebook Ads subscription retain their unused FB Ads credit. The unused credit is added to the new credit.
       * + `"END_OF_PERIOD"`: The subscription's billing current cycle is extended because of a downgrade.
       * + `"PENDING_CHANGES"`: The subscription's billing is updated, but the change doesn't apply immediately. Instead, the update becomes effective at the end of current billing cycle.
       * + `"DOWNGRADE_RENEWAL"`: The subscription is downgraded because of a declined payment. This prevents subscriptions from churning.
       */
      contractSwitchType?: ContractSwitchType;
      /**
       * ID of the metasite the subscription has been assigned to previously.
       * Available only in case the subscription is assigned to a different site.
       */
      previousMetaSiteId?: string | null;
      /**
       * Update reason.
       *
       * + `"PRICE_INCREASE"`: The subscription's price has been increased.
       * + `"EXTERNAL_PROVIDER_TRIGGER"`: Any reason other than a price increase.
       */
      contractSwitchReason?: ContractSwitchReason;
      /** Information about the price update. Available only for updates with a price increase. */
      productPriceIncreaseData?: ProductPriceIncreaseData;
      /**
       * Information about a product adjustment. For example, a downgrade.
       * __Note__: This isn't the same as `contractSwitchType`.
       *
       * + `NOT_APPLICABLE`: There is no information about whether the product has been up- or downgraded.
       * + `DOWNGRADE`: The product has been downgraded.
       */
      productAdjustment?: ProductAdjustment;
  }
  /** Copied from SBS */
  enum ContractSwitchType {
      NOT_APPLICABLE = "NOT_APPLICABLE",
      ADDITIONAL_QUANTITY = "ADDITIONAL_QUANTITY",
      CREDIT_UNUSED_PERIOD = "CREDIT_UNUSED_PERIOD",
      REFUND_PRICE_DIFF = "REFUND_PRICE_DIFF",
      ADJUST_PERIOD_END = "ADJUST_PERIOD_END",
      DOWNGRADE_GRACE_PERIOD = "DOWNGRADE_GRACE_PERIOD",
      FULL_AMOUNT_PERIOD = "FULL_AMOUNT_PERIOD",
      END_OF_PERIOD = "END_OF_PERIOD",
      PENDING_CHANGES = "PENDING_CHANGES",
      DOWNGRADE_RENEWAL = "DOWNGRADE_RENEWAL"
  }
  enum ContractSwitchReason {
      EXTERNAL_PROVIDER_TRIGGER = "EXTERNAL_PROVIDER_TRIGGER",
      PRICE_INCREASE = "PRICE_INCREASE"
  }
  /** Triggered when a subscription's price is increased. */
  interface ProductPriceIncreaseData {
      /** Price of the subscription before the update. */
      previousPrice?: string | null;
      /** A value that is used in order to select the correct email template to send the user regarding the price increase. */
      emailTemplateSelector?: string | null;
      /** Used to differentiate between migration segments. Does not have to be unique per segment. */
      segmentName?: string | null;
      /** Used to determine how the price increase was triggered. */
      priceIncreaseTrigger?: PriceIncreaseTrigger;
  }
  /** Reason for Price Increase Trigger */
  enum PriceIncreaseTrigger {
      NEAR_RENEWAL = "NEAR_RENEWAL",
      RECURRING_SUCCESS = "RECURRING_SUCCESS",
      MANUAL = "MANUAL"
  }
  /** Triggered when a subscription's product is adusted. */
  enum ProductAdjustment {
      /** flag to show that the ContractSwitchedEvent is not applicable / needed */
      NOT_APPLICABLE = "NOT_APPLICABLE",
      /** flag to show that the ContractSwitchedEvent is a Downgrade */
      DOWNGRADE = "DOWNGRADE"
  }
  /**
   * Triggered when a subscription gets close to the end of its billing cycle.
   * The exact number of days is defined in the billing system.
   */
  interface SubscriptionNearEndOfPeriod {
      /** Subscription that got close to the end of its billing cycle. */
      subscription?: Subscription;
      /** Whether the subscription is within the free trial period. */
      inFreeTrial?: boolean;
  }
  /**
   * Triggered when a subscription is updated and the change doesn't happen
   * immediately but at the end of the current billing cycle.
   */
  interface SubscriptionPendingChange {
      /** Subscription for which a pending update is triggered. */
      subscription?: Subscription;
  }
  interface MessageEnvelope$4 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$4;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$4;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$4 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$4 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Get the ReferralProgram
   * @internal
   * @documentationMaturity preview
   */
  function getReferralProgram(): Promise<GetReferralProgramResponse>;
  /**
   * Retrieves ReferralPrograms for all metasites that the caller is the member of.
   *
   * Must be called with user identity.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function bulkGetReferralProgram(): Promise<BulkGetReferralProgramResponse>;
  /**
   * Query ReferralPrograms
   * @internal
   * @documentationMaturity preview
   */
  function queryReferralPrograms(): ReferralProgramsQueryBuilder;
  interface QueryCursorResult$3 {
      cursors: Cursors$4;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferralProgramsQueryResult extends QueryCursorResult$3 {
      items: ReferralProgram[];
      query: ReferralProgramsQueryBuilder;
      next: () => Promise<ReferralProgramsQueryResult>;
      prev: () => Promise<ReferralProgramsQueryResult>;
  }
  interface ReferralProgramsQueryBuilder {
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferralProgramsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferralProgramsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferralProgramsQueryResult>;
  }
  /**
   * Update a ReferralProgram, supports partial update
   * Pass the latest `revision` for a successful update
   * @param referralProgram - ReferralProgram to be updated, may be partial
   * @internal
   * @documentationMaturity preview
   * @requiredField referralProgram
   * @requiredField referralProgram.revision
   * @adminMethod
   */
  function updateReferralProgram(referralProgram: ReferralProgram, options?: UpdateReferralProgramOptions): Promise<UpdateReferralProgramResponse>;
  interface UpdateReferralProgramOptions {
      /**
       * Explicit list of fields to update
       * @internal
       */
      mask?: string[];
  }
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function activateReferralProgram(): Promise<ActivateReferralProgramResponse>;
  /** @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function pauseReferralProgram(): Promise<PauseReferralProgramResponse>;
  /**
   * Get AI Social Media Posts Suggestions.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function getAiSocialMediaPostsSuggestions(options?: GetAiSocialMediaPostsSuggestionsOptions): Promise<GetAISocialMediaPostsSuggestionsResponse>;
  interface GetAiSocialMediaPostsSuggestionsOptions {
      /** The topic to generate suggestions for. */
      topic?: string;
  }
  /**
   * Generate AI Social Media Posts Suggestions.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function generateAiSocialMediaPostsSuggestions(options?: GenerateAiSocialMediaPostsSuggestionsOptions): Promise<GenerateAISocialMediaPostsSuggestionsResponse>;
  interface GenerateAiSocialMediaPostsSuggestionsOptions {
      /** The topic to generate suggestions for. */
      topic?: string;
  }
  /**
   * Get Referral Program Premium Features.
   * @internal
   * @documentationMaturity preview
   */
  function getReferralProgramPremiumFeatures(): Promise<GetReferralProgramPremiumFeaturesResponse>;
  
  type loyaltyReferralV1Program_universal_d_ReferralProgram = ReferralProgram;
  type loyaltyReferralV1Program_universal_d_ProgramStatus = ProgramStatus;
  const loyaltyReferralV1Program_universal_d_ProgramStatus: typeof ProgramStatus;
  type loyaltyReferralV1Program_universal_d_Action = Action;
  const loyaltyReferralV1Program_universal_d_Action: typeof Action;
  type loyaltyReferralV1Program_universal_d_Emails = Emails;
  type loyaltyReferralV1Program_universal_d_App = App;
  const loyaltyReferralV1Program_universal_d_App: typeof App;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramRequest = GetReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramResponse = GetReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_BulkGetReferralProgramRequest = BulkGetReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_BulkGetReferralProgramResponse = BulkGetReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_ProgramInSite = ProgramInSite;
  type loyaltyReferralV1Program_universal_d_QueryReferralProgramsRequest = QueryReferralProgramsRequest;
  type loyaltyReferralV1Program_universal_d_QueryReferralProgramsResponse = QueryReferralProgramsResponse;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramRequest = UpdateReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramResponse = UpdateReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_ActivateReferralProgramRequest = ActivateReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_ActivateReferralProgramResponse = ActivateReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_PauseReferralProgramRequest = PauseReferralProgramRequest;
  type loyaltyReferralV1Program_universal_d_PauseReferralProgramResponse = PauseReferralProgramResponse;
  type loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsRequest = GetAISocialMediaPostsSuggestionsRequest;
  type loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsResponse = GetAISocialMediaPostsSuggestionsResponse;
  type loyaltyReferralV1Program_universal_d_AISocialMediaPostSuggestion = AISocialMediaPostSuggestion;
  type loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsRequest = GenerateAISocialMediaPostsSuggestionsRequest;
  type loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsResponse = GenerateAISocialMediaPostsSuggestionsResponse;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesRequest = GetReferralProgramPremiumFeaturesRequest;
  type loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesResponse = GetReferralProgramPremiumFeaturesResponse;
  type loyaltyReferralV1Program_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
  type loyaltyReferralV1Program_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
  type loyaltyReferralV1Program_universal_d_Asset = Asset;
  type loyaltyReferralV1Program_universal_d_State = State;
  const loyaltyReferralV1Program_universal_d_State: typeof State;
  type loyaltyReferralV1Program_universal_d_SiteCreated = SiteCreated;
  type loyaltyReferralV1Program_universal_d_SiteCreatedContext = SiteCreatedContext;
  const loyaltyReferralV1Program_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
  type loyaltyReferralV1Program_universal_d_Namespace = Namespace;
  const loyaltyReferralV1Program_universal_d_Namespace: typeof Namespace;
  type loyaltyReferralV1Program_universal_d_SiteTransferred = SiteTransferred;
  type loyaltyReferralV1Program_universal_d_SiteDeleted = SiteDeleted;
  type loyaltyReferralV1Program_universal_d_DeleteContext = DeleteContext;
  type loyaltyReferralV1Program_universal_d_DeleteStatus = DeleteStatus;
  const loyaltyReferralV1Program_universal_d_DeleteStatus: typeof DeleteStatus;
  type loyaltyReferralV1Program_universal_d_SiteUndeleted = SiteUndeleted;
  type loyaltyReferralV1Program_universal_d_SitePublished = SitePublished;
  type loyaltyReferralV1Program_universal_d_SiteUnpublished = SiteUnpublished;
  type loyaltyReferralV1Program_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
  type loyaltyReferralV1Program_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
  type loyaltyReferralV1Program_universal_d_ServiceProvisioned = ServiceProvisioned;
  type loyaltyReferralV1Program_universal_d_ServiceRemoved = ServiceRemoved;
  type loyaltyReferralV1Program_universal_d_SiteRenamed = SiteRenamed;
  type loyaltyReferralV1Program_universal_d_SiteHardDeleted = SiteHardDeleted;
  type loyaltyReferralV1Program_universal_d_NamespaceChanged = NamespaceChanged;
  type loyaltyReferralV1Program_universal_d_StudioAssigned = StudioAssigned;
  type loyaltyReferralV1Program_universal_d_StudioUnassigned = StudioUnassigned;
  type loyaltyReferralV1Program_universal_d_HtmlSitePublished = HtmlSitePublished;
  type loyaltyReferralV1Program_universal_d_Page = Page;
  type loyaltyReferralV1Program_universal_d_SubscriptionEvent = SubscriptionEvent;
  type loyaltyReferralV1Program_universal_d_SubscriptionEventEventOneOf = SubscriptionEventEventOneOf;
  type loyaltyReferralV1Program_universal_d_SubscriptionCreated = SubscriptionCreated;
  type loyaltyReferralV1Program_universal_d_Subscription = Subscription;
  type loyaltyReferralV1Program_universal_d_BillingReference = BillingReference;
  type loyaltyReferralV1Program_universal_d_ProviderName = ProviderName;
  const loyaltyReferralV1Program_universal_d_ProviderName: typeof ProviderName;
  type loyaltyReferralV1Program_universal_d_Cycle = Cycle;
  type loyaltyReferralV1Program_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
  type loyaltyReferralV1Program_universal_d_Interval = Interval;
  type loyaltyReferralV1Program_universal_d_IntervalUnit = IntervalUnit;
  const loyaltyReferralV1Program_universal_d_IntervalUnit: typeof IntervalUnit;
  type loyaltyReferralV1Program_universal_d_OneTime = OneTime;
  type loyaltyReferralV1Program_universal_d_SubscriptionStatus = SubscriptionStatus;
  const loyaltyReferralV1Program_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
  type loyaltyReferralV1Program_universal_d_ReactivationData = ReactivationData;
  type loyaltyReferralV1Program_universal_d_ReactivationReasonEnum = ReactivationReasonEnum;
  const loyaltyReferralV1Program_universal_d_ReactivationReasonEnum: typeof ReactivationReasonEnum;
  type loyaltyReferralV1Program_universal_d_SubscriptionAssigned = SubscriptionAssigned;
  type loyaltyReferralV1Program_universal_d_SubscriptionCancelled = SubscriptionCancelled;
  type loyaltyReferralV1Program_universal_d_CancellationDetails = CancellationDetails;
  type loyaltyReferralV1Program_universal_d_Initiator = Initiator;
  const loyaltyReferralV1Program_universal_d_Initiator: typeof Initiator;
  type loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOn = SubscriptionAutoRenewTurnedOn;
  type loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOff = SubscriptionAutoRenewTurnedOff;
  type loyaltyReferralV1Program_universal_d_SubscriptionUnassigned = SubscriptionUnassigned;
  type loyaltyReferralV1Program_universal_d_UnassignReason = UnassignReason;
  const loyaltyReferralV1Program_universal_d_UnassignReason: typeof UnassignReason;
  type loyaltyReferralV1Program_universal_d_SubscriptionTransferred = SubscriptionTransferred;
  type loyaltyReferralV1Program_universal_d_RecurringChargeSucceeded = RecurringChargeSucceeded;
  type loyaltyReferralV1Program_universal_d_ContractSwitched = ContractSwitched;
  type loyaltyReferralV1Program_universal_d_ContractSwitchType = ContractSwitchType;
  const loyaltyReferralV1Program_universal_d_ContractSwitchType: typeof ContractSwitchType;
  type loyaltyReferralV1Program_universal_d_ContractSwitchReason = ContractSwitchReason;
  const loyaltyReferralV1Program_universal_d_ContractSwitchReason: typeof ContractSwitchReason;
  type loyaltyReferralV1Program_universal_d_ProductPriceIncreaseData = ProductPriceIncreaseData;
  type loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger = PriceIncreaseTrigger;
  const loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger: typeof PriceIncreaseTrigger;
  type loyaltyReferralV1Program_universal_d_ProductAdjustment = ProductAdjustment;
  const loyaltyReferralV1Program_universal_d_ProductAdjustment: typeof ProductAdjustment;
  type loyaltyReferralV1Program_universal_d_SubscriptionNearEndOfPeriod = SubscriptionNearEndOfPeriod;
  type loyaltyReferralV1Program_universal_d_SubscriptionPendingChange = SubscriptionPendingChange;
  const loyaltyReferralV1Program_universal_d_getReferralProgram: typeof getReferralProgram;
  const loyaltyReferralV1Program_universal_d_bulkGetReferralProgram: typeof bulkGetReferralProgram;
  const loyaltyReferralV1Program_universal_d_queryReferralPrograms: typeof queryReferralPrograms;
  type loyaltyReferralV1Program_universal_d_ReferralProgramsQueryResult = ReferralProgramsQueryResult;
  type loyaltyReferralV1Program_universal_d_ReferralProgramsQueryBuilder = ReferralProgramsQueryBuilder;
  const loyaltyReferralV1Program_universal_d_updateReferralProgram: typeof updateReferralProgram;
  type loyaltyReferralV1Program_universal_d_UpdateReferralProgramOptions = UpdateReferralProgramOptions;
  const loyaltyReferralV1Program_universal_d_activateReferralProgram: typeof activateReferralProgram;
  const loyaltyReferralV1Program_universal_d_pauseReferralProgram: typeof pauseReferralProgram;
  const loyaltyReferralV1Program_universal_d_getAiSocialMediaPostsSuggestions: typeof getAiSocialMediaPostsSuggestions;
  type loyaltyReferralV1Program_universal_d_GetAiSocialMediaPostsSuggestionsOptions = GetAiSocialMediaPostsSuggestionsOptions;
  const loyaltyReferralV1Program_universal_d_generateAiSocialMediaPostsSuggestions: typeof generateAiSocialMediaPostsSuggestions;
  type loyaltyReferralV1Program_universal_d_GenerateAiSocialMediaPostsSuggestionsOptions = GenerateAiSocialMediaPostsSuggestionsOptions;
  const loyaltyReferralV1Program_universal_d_getReferralProgramPremiumFeatures: typeof getReferralProgramPremiumFeatures;
  namespace loyaltyReferralV1Program_universal_d {
    export {
      loyaltyReferralV1Program_universal_d_ReferralProgram as ReferralProgram,
      loyaltyReferralV1Program_universal_d_ProgramStatus as ProgramStatus,
      Reward$2 as Reward,
      RewardOptionsOneOf$1 as RewardOptionsOneOf,
      Type$1 as Type,
      Coupon$2 as Coupon,
      CouponDiscountTypeOptionsOneOf$2 as CouponDiscountTypeOptionsOneOf,
      CouponScopeOrMinSubtotalOneOf$2 as CouponScopeOrMinSubtotalOneOf,
      DiscountType$2 as DiscountType,
      FixedAmountDiscount$2 as FixedAmountDiscount,
      PercentageDiscount$2 as PercentageDiscount,
      CouponScope$2 as CouponScope,
      Group$2 as Group,
      LoyaltyPoints$2 as LoyaltyPoints,
      loyaltyReferralV1Program_universal_d_Action as Action,
      loyaltyReferralV1Program_universal_d_Emails as Emails,
      loyaltyReferralV1Program_universal_d_App as App,
      loyaltyReferralV1Program_universal_d_GetReferralProgramRequest as GetReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_GetReferralProgramResponse as GetReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_BulkGetReferralProgramRequest as BulkGetReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_BulkGetReferralProgramResponse as BulkGetReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_ProgramInSite as ProgramInSite,
      loyaltyReferralV1Program_universal_d_QueryReferralProgramsRequest as QueryReferralProgramsRequest,
      CursorQuery$4 as CursorQuery,
      CursorQueryPagingMethodOneOf$4 as CursorQueryPagingMethodOneOf,
      Sorting$4 as Sorting,
      SortOrder$4 as SortOrder,
      CursorPaging$4 as CursorPaging,
      loyaltyReferralV1Program_universal_d_QueryReferralProgramsResponse as QueryReferralProgramsResponse,
      CursorPagingMetadata$4 as CursorPagingMetadata,
      Cursors$4 as Cursors,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramRequest as UpdateReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramResponse as UpdateReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_ActivateReferralProgramRequest as ActivateReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_ActivateReferralProgramResponse as ActivateReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_PauseReferralProgramRequest as PauseReferralProgramRequest,
      loyaltyReferralV1Program_universal_d_PauseReferralProgramResponse as PauseReferralProgramResponse,
      loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsRequest as GetAISocialMediaPostsSuggestionsRequest,
      loyaltyReferralV1Program_universal_d_GetAISocialMediaPostsSuggestionsResponse as GetAISocialMediaPostsSuggestionsResponse,
      loyaltyReferralV1Program_universal_d_AISocialMediaPostSuggestion as AISocialMediaPostSuggestion,
      loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsRequest as GenerateAISocialMediaPostsSuggestionsRequest,
      loyaltyReferralV1Program_universal_d_GenerateAISocialMediaPostsSuggestionsResponse as GenerateAISocialMediaPostsSuggestionsResponse,
      loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesRequest as GetReferralProgramPremiumFeaturesRequest,
      loyaltyReferralV1Program_universal_d_GetReferralProgramPremiumFeaturesResponse as GetReferralProgramPremiumFeaturesResponse,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      UndeleteInfo$4 as UndeleteInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      Empty$3 as Empty,
      loyaltyReferralV1Program_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent,
      loyaltyReferralV1Program_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf,
      loyaltyReferralV1Program_universal_d_Asset as Asset,
      loyaltyReferralV1Program_universal_d_State as State,
      loyaltyReferralV1Program_universal_d_SiteCreated as SiteCreated,
      loyaltyReferralV1Program_universal_d_SiteCreatedContext as SiteCreatedContext,
      loyaltyReferralV1Program_universal_d_Namespace as Namespace,
      loyaltyReferralV1Program_universal_d_SiteTransferred as SiteTransferred,
      loyaltyReferralV1Program_universal_d_SiteDeleted as SiteDeleted,
      loyaltyReferralV1Program_universal_d_DeleteContext as DeleteContext,
      loyaltyReferralV1Program_universal_d_DeleteStatus as DeleteStatus,
      loyaltyReferralV1Program_universal_d_SiteUndeleted as SiteUndeleted,
      loyaltyReferralV1Program_universal_d_SitePublished as SitePublished,
      loyaltyReferralV1Program_universal_d_SiteUnpublished as SiteUnpublished,
      loyaltyReferralV1Program_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate,
      loyaltyReferralV1Program_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite,
      loyaltyReferralV1Program_universal_d_ServiceProvisioned as ServiceProvisioned,
      loyaltyReferralV1Program_universal_d_ServiceRemoved as ServiceRemoved,
      loyaltyReferralV1Program_universal_d_SiteRenamed as SiteRenamed,
      loyaltyReferralV1Program_universal_d_SiteHardDeleted as SiteHardDeleted,
      loyaltyReferralV1Program_universal_d_NamespaceChanged as NamespaceChanged,
      loyaltyReferralV1Program_universal_d_StudioAssigned as StudioAssigned,
      loyaltyReferralV1Program_universal_d_StudioUnassigned as StudioUnassigned,
      loyaltyReferralV1Program_universal_d_HtmlSitePublished as HtmlSitePublished,
      loyaltyReferralV1Program_universal_d_Page as Page,
      loyaltyReferralV1Program_universal_d_SubscriptionEvent as SubscriptionEvent,
      loyaltyReferralV1Program_universal_d_SubscriptionEventEventOneOf as SubscriptionEventEventOneOf,
      loyaltyReferralV1Program_universal_d_SubscriptionCreated as SubscriptionCreated,
      loyaltyReferralV1Program_universal_d_Subscription as Subscription,
      loyaltyReferralV1Program_universal_d_BillingReference as BillingReference,
      loyaltyReferralV1Program_universal_d_ProviderName as ProviderName,
      loyaltyReferralV1Program_universal_d_Cycle as Cycle,
      loyaltyReferralV1Program_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf,
      loyaltyReferralV1Program_universal_d_Interval as Interval,
      loyaltyReferralV1Program_universal_d_IntervalUnit as IntervalUnit,
      loyaltyReferralV1Program_universal_d_OneTime as OneTime,
      loyaltyReferralV1Program_universal_d_SubscriptionStatus as SubscriptionStatus,
      loyaltyReferralV1Program_universal_d_ReactivationData as ReactivationData,
      loyaltyReferralV1Program_universal_d_ReactivationReasonEnum as ReactivationReasonEnum,
      loyaltyReferralV1Program_universal_d_SubscriptionAssigned as SubscriptionAssigned,
      loyaltyReferralV1Program_universal_d_SubscriptionCancelled as SubscriptionCancelled,
      loyaltyReferralV1Program_universal_d_CancellationDetails as CancellationDetails,
      loyaltyReferralV1Program_universal_d_Initiator as Initiator,
      loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOn as SubscriptionAutoRenewTurnedOn,
      loyaltyReferralV1Program_universal_d_SubscriptionAutoRenewTurnedOff as SubscriptionAutoRenewTurnedOff,
      loyaltyReferralV1Program_universal_d_SubscriptionUnassigned as SubscriptionUnassigned,
      loyaltyReferralV1Program_universal_d_UnassignReason as UnassignReason,
      loyaltyReferralV1Program_universal_d_SubscriptionTransferred as SubscriptionTransferred,
      loyaltyReferralV1Program_universal_d_RecurringChargeSucceeded as RecurringChargeSucceeded,
      loyaltyReferralV1Program_universal_d_ContractSwitched as ContractSwitched,
      loyaltyReferralV1Program_universal_d_ContractSwitchType as ContractSwitchType,
      loyaltyReferralV1Program_universal_d_ContractSwitchReason as ContractSwitchReason,
      loyaltyReferralV1Program_universal_d_ProductPriceIncreaseData as ProductPriceIncreaseData,
      loyaltyReferralV1Program_universal_d_PriceIncreaseTrigger as PriceIncreaseTrigger,
      loyaltyReferralV1Program_universal_d_ProductAdjustment as ProductAdjustment,
      loyaltyReferralV1Program_universal_d_SubscriptionNearEndOfPeriod as SubscriptionNearEndOfPeriod,
      loyaltyReferralV1Program_universal_d_SubscriptionPendingChange as SubscriptionPendingChange,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      loyaltyReferralV1Program_universal_d_getReferralProgram as getReferralProgram,
      loyaltyReferralV1Program_universal_d_bulkGetReferralProgram as bulkGetReferralProgram,
      loyaltyReferralV1Program_universal_d_queryReferralPrograms as queryReferralPrograms,
      loyaltyReferralV1Program_universal_d_ReferralProgramsQueryResult as ReferralProgramsQueryResult,
      loyaltyReferralV1Program_universal_d_ReferralProgramsQueryBuilder as ReferralProgramsQueryBuilder,
      loyaltyReferralV1Program_universal_d_updateReferralProgram as updateReferralProgram,
      loyaltyReferralV1Program_universal_d_UpdateReferralProgramOptions as UpdateReferralProgramOptions,
      loyaltyReferralV1Program_universal_d_activateReferralProgram as activateReferralProgram,
      loyaltyReferralV1Program_universal_d_pauseReferralProgram as pauseReferralProgram,
      loyaltyReferralV1Program_universal_d_getAiSocialMediaPostsSuggestions as getAiSocialMediaPostsSuggestions,
      loyaltyReferralV1Program_universal_d_GetAiSocialMediaPostsSuggestionsOptions as GetAiSocialMediaPostsSuggestionsOptions,
      loyaltyReferralV1Program_universal_d_generateAiSocialMediaPostsSuggestions as generateAiSocialMediaPostsSuggestions,
      loyaltyReferralV1Program_universal_d_GenerateAiSocialMediaPostsSuggestionsOptions as GenerateAiSocialMediaPostsSuggestionsOptions,
      loyaltyReferralV1Program_universal_d_getReferralProgramPremiumFeatures as getReferralProgramPremiumFeatures,
    };
  }
  
  /** ReferralEvent. */
  interface ReferralEvent extends ReferralEventEventTypeOneOf {
      /** ReferredFriendSignupEvent is an event that is triggered when a referred friend signs up. */
      referredFriendSignupEvent?: ReferredFriendSignupEvent;
      /** SuccessfulReferralEvent is an event that is triggered when a referral is successful. */
      successfulReferralEvent?: V1SuccessfulReferralEvent;
      /** ActionEvent is an event that is triggered when an action is performed. */
      actionEvent?: V1ActionEvent;
      /** RewardEvent is an event that is triggered when a reward is given. */
      rewardEvent?: RewardEvent;
      /**
       * ReferralEvent ID.
       * @readonly
       */
      _id?: string | null;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision. */
      revision?: string | null;
      /**
       * Represents the time this ReferralEvent was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Represents the time this ReferralEvent was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  /** @oneof */
  interface ReferralEventEventTypeOneOf {
      /** ReferredFriendSignupEvent is an event that is triggered when a referred friend signs up. */
      referredFriendSignupEvent?: ReferredFriendSignupEvent;
      /** SuccessfulReferralEvent is an event that is triggered when a referral is successful. */
      successfulReferralEvent?: V1SuccessfulReferralEvent;
      /** ActionEvent is an event that is triggered when an action is performed. */
      actionEvent?: V1ActionEvent;
      /** RewardEvent is an event that is triggered when a reward is given. */
      rewardEvent?: RewardEvent;
  }
  interface ReferredFriendSignupEvent {
      /** The referred friend ID. */
      referredFriendId?: string;
  }
  interface V1SuccessfulReferralEvent {
      /** The referred friend ID. */
      referredFriendId?: string;
      /** The referring customer ID. */
      referringCustomerId?: string;
  }
  interface V1ActionEvent {
      /** The referred friend ID. */
      referredFriendId?: string;
      /** The referring customer ID. */
      referringCustomerId?: string;
      /** The trigger of the action. */
      trigger?: V1Trigger;
      /** Amount. */
      amount?: string | null;
      /** Currency. */
      currency?: string | null;
      /** Order ID. */
      orderId?: string | null;
  }
  interface V1Trigger {
      /** The app id of the app that triggered the event. */
      appId?: string;
      /** The activity type that triggered the event. */
      activityType?: string;
  }
  interface RewardEvent extends RewardEventReceiverOneOf {
      /**
       * The referring customer ID.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * The referred friend ID.
       * @readonly
       */
      rewardedReferredFriendId?: string;
      /** The referral reward ID. */
      referralRewardId?: string;
      /** The reward type. */
      rewardType?: Reward$1;
  }
  /** @oneof */
  interface RewardEventReceiverOneOf {
      /**
       * The referring customer ID.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * The referred friend ID.
       * @readonly
       */
      rewardedReferredFriendId?: string;
  }
  enum Reward$1 {
      /** Unknown reward type. */
      UNKNOWN = "UNKNOWN",
      /** Reward is a coupon. */
      COUPON = "COUPON",
      /** Reward is loyalty points. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward. */
      NOTHING = "NOTHING"
  }
  interface CreateReferralEventRequest {
      /** ReferralEvent to be created */
      referralEvent: ReferralEvent;
  }
  interface CreateReferralEventResponse {
      /** The created ReferralEvent */
      referralEvent?: ReferralEvent;
  }
  interface GetReferralEventRequest {
      /** Id of the ReferralEvent to retrieve */
      referralEventId: string;
  }
  interface GetReferralEventResponse {
      /** The retrieved ReferralEvent */
      referralEvent?: ReferralEvent;
  }
  interface QueryReferralEventRequest {
      /** Query to filter ReferralEvents. */
      query: CursorQuery$3;
  }
  interface CursorQuery$3 extends CursorQueryPagingMethodOneOf$3 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
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
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$3 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$3;
  }
  interface Sorting$3 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$3;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder$3 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$3 {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryReferralEventResponse {
      /** List of ReferralEvents that match the query. */
      referralEvents?: ReferralEvent[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata$3;
  }
  interface CursorPagingMetadata$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$3;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$3 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface GetReferralStatisticsRequest {
  }
  interface GetReferralStatisticsResponse {
      /** Total sign ups completed by referred friends */
      totalSignUpsCompleted?: number;
      /** Total actions completed by referred friends */
      totalActionsCompleted?: number;
      /** Total amount of purchases made by referred friends */
      totalAmountGenerated?: string;
  }
  interface QueryReferringCustomerTotalsRequest {
      /** Query to filter ReferringCustomerTotals. */
      query?: CursorQuery$3;
      /** List of contact ids to filter ReferringCustomerTotals. */
      contactIds?: string[];
  }
  interface QueryReferringCustomerTotalsResponse {
      /** List of ReferringCustomerTotals that match the query. */
      referringCustomerTotals?: ReferringCustomerTotal[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata$3;
  }
  interface ReferringCustomerTotal {
      /**
       * Referring customer id.
       * @readonly
       */
      referringCustomerId?: string;
      /**
       * Contact id.
       * @readonly
       */
      contactId?: string;
      /**
       * Last successful referral date.
       * @readonly
       */
      lastSuccessfulReferral?: Date;
      /**
       * Total successful referrals made by this customer.
       * @readonly
       */
      totalSuccessfulReferrals?: number;
      /**
       * Total amount generated by friends referred by this customer.
       * @readonly
       */
      totalAmountGenerated?: string;
      /**
       * Last friend action date.
       * @readonly
       */
      lastFriendAction?: Date;
      /**
       * Total friends that have actions done.
       * @readonly
       */
      totalFriendsWithActions?: number;
  }
  interface QueryReferredFriendActionsRequest {
      /** Query to filter ReferredFriendActions. */
      query?: CursorQuery$3;
      /** List of contact ids to filter ReferredFriendActions. */
      contactIds?: string[];
  }
  interface QueryReferredFriendActionsResponse {
      /** List of ReferredFriendActions that match the query. */
      referredFriendActions?: ReferredFriendAction[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata$3;
  }
  interface ReferredFriendAction extends ReferredFriendActionRewardTypeOptionsOneOf {
      /** Coupon reward type options. */
      coupon?: V1Coupon$1;
      /** Loyalty points reward type options. */
      loyaltyPoints?: LoyaltyPoints$1;
      /**
       * Referred friend id.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * Contact id.
       * @readonly
       */
      contactId?: string;
      /**
       * First action trigger.
       * @readonly
       */
      trigger?: V1Trigger;
      /**
       * First action date.
       * @readonly
       */
      actionDate?: Date;
      /** Issued reward type. */
      rewardType?: Reward$1;
      /** Total number of actions. */
      totalActions?: number;
      /**
       * Total amount spent by this referred friend.
       * @readonly
       */
      totalAmountSpent?: string;
      /**
       * friend signup date.
       * @readonly
       */
      signupDate?: Date;
  }
  /** @oneof */
  interface ReferredFriendActionRewardTypeOptionsOneOf {
      /** Coupon reward type options. */
      coupon?: V1Coupon$1;
      /** Loyalty points reward type options. */
      loyaltyPoints?: LoyaltyPoints$1;
  }
  interface V1Coupon$1 {
      /**
       * Coupon ID.
       * @readonly
       */
      _id?: string;
      /**
       * Coupon code.
       * @readonly
       */
      code?: string;
      /**
       * Coupon status.
       * @readonly
       */
      status?: Status$2;
      /**
       * Coupon specification.
       * @readonly
       */
      couponSpecification?: Coupon$1;
  }
  enum Status$2 {
      /** Unknown coupon status. */
      UNKNOWN = "UNKNOWN",
      /** Coupon is active and can be applied. */
      ACTIVE = "ACTIVE",
      /** Coupon was already applied and can not be used anymore. */
      APPLIED = "APPLIED",
      /** Coupon was deleted. */
      DELETED = "DELETED"
  }
  interface Coupon$1 extends CouponDiscountTypeOptionsOneOf$1, CouponScopeOrMinSubtotalOneOf$1 {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount$1;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount$1;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope$1;
      /** Coupon name */
      name?: string;
      /** Coupon discount type */
      discountType?: DiscountType$1;
      /** Limit the coupon to only apply to one item in cart. */
      limitedToOneItem?: boolean | null;
      /** If true, coupon also applies to subscriptions. */
      appliesToSubscriptions?: boolean | null;
      /** Specifies the amount of discounted cycles for subscription item. See Stores Coupons documentation for more info. */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf$1 {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount$1;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount$1;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf$1 {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope$1;
  }
  enum DiscountType$1 {
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount$1 {
      /** Fixed amount to discount */
      amount?: number;
  }
  interface PercentageDiscount$1 {
      percentage?: number;
  }
  interface CouponScope$1 {
      namespace?: string;
      group?: Group$1;
  }
  interface Group$1 {
      name?: string;
      entityId?: string | null;
  }
  interface LoyaltyPoints$1 {
      /**
       * Loyalty transaction ID.
       * @readonly
       */
      transactionId?: string;
      /**
       * Loyalty points amount given.
       * @readonly
       */
      amount?: number;
  }
  interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
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
  interface DomainEventBodyOneOf$3 {
      createdEvent?: EntityCreatedEvent$3;
      updatedEvent?: EntityUpdatedEvent$3;
      deletedEvent?: EntityDeletedEvent$3;
      actionEvent?: ActionEvent$3;
  }
  interface EntityCreatedEvent$3 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$3;
  }
  interface UndeleteInfo$3 {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent$3 {
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
  interface EntityDeletedEvent$3 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$3 {
      bodyAsJson?: string;
  }
  interface Empty$2 {
  }
  interface SuccessfulReferralEvent$2 {
      /** ReferredFriend that completed his referral details. */
      referredFriendDetails?: ReferredFriendDetails$2;
  }
  interface ReferredFriendDetails$2 {
      /**
       * ReferredFriend ID.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * ReferredFriend Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Customer who referred this ReferredFriend.
       * @readonly
       */
      referringCustomerId?: string;
  }
  interface ReferredFriendActionEvent {
      /** ReferredFriend details. */
      referredFriendDetails?: ReferredFriendDetails$2;
      /** Trigger details. */
      trigger?: Trigger;
      /** Amount. */
      amount?: string | null;
      /** Currency. */
      currency?: string | null;
      /** Order ID. */
      orderId?: string | null;
  }
  interface Trigger {
      /** App ID. */
      appId?: string;
      /** Activity type. */
      activityType?: string;
  }
  interface MessageEnvelope$3 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$3;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$3;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$3 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$3 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Create referral event.
   * @param referralEvent - ReferralEvent to be created
   * @internal
   * @documentationMaturity preview
   * @requiredField referralEvent
   * @adminMethod
   */
  function createReferralEvent(referralEvent: ReferralEvent): Promise<CreateReferralEventResponse>;
  /**
   * Get a ReferralEvent by id.
   * @param referralEventId - Id of the ReferralEvent to retrieve
   * @public
   * @documentationMaturity preview
   * @requiredField referralEventId
   * @adminMethod
   * @returns The retrieved ReferralEvent
   */
  function getReferralEvent(referralEventId: string): Promise<ReferralEvent>;
  /**
   * Query ReferralEvents
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryReferralEvent(): ReferralEventsQueryBuilder;
  interface QueryCursorResult$2 {
      cursors: Cursors$3;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferralEventsQueryResult extends QueryCursorResult$2 {
      items: ReferralEvent[];
      query: ReferralEventsQueryBuilder;
      next: () => Promise<ReferralEventsQueryResult>;
      prev: () => Promise<ReferralEventsQueryResult>;
  }
  interface ReferralEventsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_createdDate' | '_updatedDate', value: any[]) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_createdDate' | '_updatedDate', value: boolean) => ReferralEventsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | '_updatedDate'>) => ReferralEventsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | '_updatedDate'>) => ReferralEventsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferralEventsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferralEventsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferralEventsQueryResult>;
  }
  /**
   * Get referral statistics.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function getReferralStatistics(): Promise<GetReferralStatisticsResponse>;
  /**
   * Query referring customer totals.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryReferringCustomerTotals(options?: QueryReferringCustomerTotalsOptions): Promise<QueryReferringCustomerTotalsResponse>;
  interface QueryReferringCustomerTotalsOptions {
      /** Query to filter ReferringCustomerTotals. */
      query?: CursorQuery$3;
      /** List of contact ids to filter ReferringCustomerTotals. */
      contactIds?: string[];
  }
  /**
   * Query referred friend actions.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryReferredFriendActions(options?: QueryReferredFriendActionsOptions): Promise<QueryReferredFriendActionsResponse>;
  interface QueryReferredFriendActionsOptions {
      /** Query to filter ReferredFriendActions. */
      query?: CursorQuery$3;
      /** List of contact ids to filter ReferredFriendActions. */
      contactIds?: string[];
  }
  
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEvent = ReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventEventTypeOneOf = ReferralEventEventTypeOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendSignupEvent = ReferredFriendSignupEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1SuccessfulReferralEvent = V1SuccessfulReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1ActionEvent = V1ActionEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_V1Trigger = V1Trigger;
  type loyaltyReferralV1ReferralEvent_universal_d_RewardEvent = RewardEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_RewardEventReceiverOneOf = RewardEventReceiverOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventRequest = CreateReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventResponse = CreateReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventRequest = GetReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventResponse = GetReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventRequest = QueryReferralEventRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventResponse = QueryReferralEventResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsRequest = GetReferralStatisticsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsResponse = GetReferralStatisticsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsRequest = QueryReferringCustomerTotalsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsResponse = QueryReferringCustomerTotalsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferringCustomerTotal = ReferringCustomerTotal;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsRequest = QueryReferredFriendActionsRequest;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsResponse = QueryReferredFriendActionsResponse;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendAction = ReferredFriendAction;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionRewardTypeOptionsOneOf = ReferredFriendActionRewardTypeOptionsOneOf;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionEvent = ReferredFriendActionEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_Trigger = Trigger;
  const loyaltyReferralV1ReferralEvent_universal_d_createReferralEvent: typeof createReferralEvent;
  const loyaltyReferralV1ReferralEvent_universal_d_getReferralEvent: typeof getReferralEvent;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferralEvent: typeof queryReferralEvent;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryResult = ReferralEventsQueryResult;
  type loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryBuilder = ReferralEventsQueryBuilder;
  const loyaltyReferralV1ReferralEvent_universal_d_getReferralStatistics: typeof getReferralStatistics;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferringCustomerTotals: typeof queryReferringCustomerTotals;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsOptions = QueryReferringCustomerTotalsOptions;
  const loyaltyReferralV1ReferralEvent_universal_d_queryReferredFriendActions: typeof queryReferredFriendActions;
  type loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsOptions = QueryReferredFriendActionsOptions;
  namespace loyaltyReferralV1ReferralEvent_universal_d {
    export {
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEvent as ReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventEventTypeOneOf as ReferralEventEventTypeOneOf,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendSignupEvent as ReferredFriendSignupEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1SuccessfulReferralEvent as V1SuccessfulReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1ActionEvent as V1ActionEvent,
      loyaltyReferralV1ReferralEvent_universal_d_V1Trigger as V1Trigger,
      loyaltyReferralV1ReferralEvent_universal_d_RewardEvent as RewardEvent,
      loyaltyReferralV1ReferralEvent_universal_d_RewardEventReceiverOneOf as RewardEventReceiverOneOf,
      Reward$1 as Reward,
      loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventRequest as CreateReferralEventRequest,
      loyaltyReferralV1ReferralEvent_universal_d_CreateReferralEventResponse as CreateReferralEventResponse,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventRequest as GetReferralEventRequest,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralEventResponse as GetReferralEventResponse,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventRequest as QueryReferralEventRequest,
      CursorQuery$3 as CursorQuery,
      CursorQueryPagingMethodOneOf$3 as CursorQueryPagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      CursorPaging$3 as CursorPaging,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferralEventResponse as QueryReferralEventResponse,
      CursorPagingMetadata$3 as CursorPagingMetadata,
      Cursors$3 as Cursors,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsRequest as GetReferralStatisticsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_GetReferralStatisticsResponse as GetReferralStatisticsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsRequest as QueryReferringCustomerTotalsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsResponse as QueryReferringCustomerTotalsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_ReferringCustomerTotal as ReferringCustomerTotal,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsRequest as QueryReferredFriendActionsRequest,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsResponse as QueryReferredFriendActionsResponse,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendAction as ReferredFriendAction,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionRewardTypeOptionsOneOf as ReferredFriendActionRewardTypeOptionsOneOf,
      V1Coupon$1 as V1Coupon,
      Status$2 as Status,
      Coupon$1 as Coupon,
      CouponDiscountTypeOptionsOneOf$1 as CouponDiscountTypeOptionsOneOf,
      CouponScopeOrMinSubtotalOneOf$1 as CouponScopeOrMinSubtotalOneOf,
      DiscountType$1 as DiscountType,
      FixedAmountDiscount$1 as FixedAmountDiscount,
      PercentageDiscount$1 as PercentageDiscount,
      CouponScope$1 as CouponScope,
      Group$1 as Group,
      LoyaltyPoints$1 as LoyaltyPoints,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      UndeleteInfo$3 as UndeleteInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      Empty$2 as Empty,
      SuccessfulReferralEvent$2 as SuccessfulReferralEvent,
      ReferredFriendDetails$2 as ReferredFriendDetails,
      loyaltyReferralV1ReferralEvent_universal_d_ReferredFriendActionEvent as ReferredFriendActionEvent,
      loyaltyReferralV1ReferralEvent_universal_d_Trigger as Trigger,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      loyaltyReferralV1ReferralEvent_universal_d_createReferralEvent as createReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_getReferralEvent as getReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferralEvent as queryReferralEvent,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryResult as ReferralEventsQueryResult,
      loyaltyReferralV1ReferralEvent_universal_d_ReferralEventsQueryBuilder as ReferralEventsQueryBuilder,
      loyaltyReferralV1ReferralEvent_universal_d_getReferralStatistics as getReferralStatistics,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferringCustomerTotals as queryReferringCustomerTotals,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferringCustomerTotalsOptions as QueryReferringCustomerTotalsOptions,
      loyaltyReferralV1ReferralEvent_universal_d_queryReferredFriendActions as queryReferredFriendActions,
      loyaltyReferralV1ReferralEvent_universal_d_QueryReferredFriendActionsOptions as QueryReferredFriendActionsOptions,
    };
  }
  
  /** ReferralReward is the main entity of ReferralRewards that can be used for lorem ipsum dolor */
  interface ReferralReward extends ReferralRewardReceiverOneOf, ReferralRewardRewardTypeOptionsOneOf {
      /**
       * Referring customer ID.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * Referred friend ID.
       * @readonly
       */
      rewardedReferredFriendId?: string;
      /** Coupon reward type options. */
      coupon?: V1Coupon;
      /** Loyalty points reward type options. */
      loyaltyPoints?: V1LoyaltyPoints;
      /**
       * ReferralReward ID.
       * @readonly
       */
      _id?: string | null;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision. */
      revision?: string | null;
      /**
       * Represents the time this ReferralReward was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Represents the time this ReferralReward was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Reward type. */
      rewardType?: RewardTypeType;
  }
  /** @oneof */
  interface ReferralRewardReceiverOneOf {
      /**
       * Referring customer ID.
       * @readonly
       */
      rewardedReferringCustomerId?: string;
      /**
       * Referred friend ID.
       * @readonly
       */
      rewardedReferredFriendId?: string;
  }
  /** @oneof */
  interface ReferralRewardRewardTypeOptionsOneOf {
      /** Coupon reward type options. */
      coupon?: V1Coupon;
      /** Loyalty points reward type options. */
      loyaltyPoints?: V1LoyaltyPoints;
  }
  enum RewardTypeType {
      /** Unknown reward type. */
      UNKNOWN = "UNKNOWN",
      /** Coupon reward type. */
      COUPON = "COUPON",
      /** Loyalty points reward type. */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward. */
      NOTHING = "NOTHING"
  }
  interface V1Coupon {
      /**
       * Coupon ID.
       * @readonly
       */
      _id?: string;
      /**
       * Coupon code.
       * @readonly
       */
      code?: string;
      /**
       * Coupon status.
       * @readonly
       */
      status?: Status$1;
      /**
       * Coupon specification.
       * @readonly
       */
      couponSpecification?: Coupon;
  }
  enum Status$1 {
      /** Unknown coupon status. */
      UNKNOWN = "UNKNOWN",
      /** Coupon is active and can be applied. */
      ACTIVE = "ACTIVE",
      /** Coupon was already applied and can not be used anymore. */
      APPLIED = "APPLIED",
      /** Coupon was deleted. */
      DELETED = "DELETED"
  }
  interface Coupon extends CouponDiscountTypeOptionsOneOf, CouponScopeOrMinSubtotalOneOf {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount;
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope;
      /** Coupon name */
      name?: string;
      /** Coupon discount type */
      discountType?: DiscountType;
      /** Limit the coupon to only apply to one item in cart. */
      limitedToOneItem?: boolean | null;
      /** If true, coupon also applies to subscriptions. */
      appliesToSubscriptions?: boolean | null;
      /** Specifies the amount of discounted cycles for subscription item. See Stores Coupons documentation for more info. */
      discountedCycleCount?: number | null;
  }
  /** @oneof */
  interface CouponDiscountTypeOptionsOneOf {
      /** Options for fixed amount discount type */
      fixedAmountOptions?: FixedAmountDiscount;
      /** Options for percentage discount type */
      percentageOptions?: PercentageDiscount;
  }
  /** @oneof */
  interface CouponScopeOrMinSubtotalOneOf {
      /** Limit the coupon to carts with a subtotal above this number. */
      minimumSubtotal?: number;
      /** Specifies the type of line items this coupon will apply to. */
      scope?: CouponScope;
  }
  enum DiscountType {
      UNKNOWN = "UNKNOWN",
      /** Discount as a fixed amount */
      FIXED_AMOUNT = "FIXED_AMOUNT",
      /** Discount as a percentage */
      PERCENTAGE = "PERCENTAGE",
      /** Free shipping */
      FREE_SHIPPING = "FREE_SHIPPING"
  }
  interface FixedAmountDiscount {
      /** Fixed amount to discount */
      amount?: number;
  }
  interface PercentageDiscount {
      percentage?: number;
  }
  interface CouponScope {
      namespace?: string;
      group?: Group;
  }
  interface Group {
      name?: string;
      entityId?: string | null;
  }
  interface V1LoyaltyPoints {
      /**
       * Loyalty transaction ID.
       * @readonly
       */
      transactionId?: string;
      /**
       * Loyalty points amount given.
       * @readonly
       */
      amount?: number;
  }
  interface GetReferralRewardRequest {
      /** Id of the ReferralReward to retrieve. */
      _id: string;
  }
  interface GetReferralRewardResponse {
      /** The retrieved ReferralReward. */
      referralReward?: ReferralReward;
  }
  interface QueryReferralRewardsRequest {
      /** Query to filter ReferralRewards. */
      query: CursorQuery$2;
      /** Filter by contact id or set to "me" for current identity's rewards. */
      contactId?: string | null;
  }
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
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
      sort?: Sorting$2[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$2;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$2 {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryReferralRewardsResponse {
      /** The retrieved ReferralRewards. */
      referralRewards?: ReferralReward[];
      /** Metadata for paging. */
      metadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$2;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface ValidateReferralRewardRequest {
      /** Reward to validate. */
      reward?: Reward;
  }
  interface Reward extends RewardOptionsOneOf {
      /** Options for coupon reward type */
      couponOptions?: Coupon;
      /** Options for Loyalty points reward type */
      loyaltyPointsOptions?: LoyaltyPoints;
      /** Type of the reward */
      type?: Type;
  }
  /** @oneof */
  interface RewardOptionsOneOf {
      /** Options for coupon reward type */
      couponOptions?: Coupon;
      /** Options for Loyalty points reward type */
      loyaltyPointsOptions?: LoyaltyPoints;
  }
  enum Type {
      UNKNOWN = "UNKNOWN",
      /** Coupon reward type */
      COUPON = "COUPON",
      /** Loyalty points reward type */
      LOYALTY_POINTS = "LOYALTY_POINTS",
      /** No reward type */
      NOTHING = "NOTHING"
  }
  interface LoyaltyPoints {
      /** Amount of points to give */
      amount?: number;
  }
  interface ValidateReferralRewardResponse {
  }
  interface BulkGetReferralRewardsRequest {
  }
  interface BulkGetReferralRewardsResponse {
      /** Found rewards per site. */
      rewardsInSite?: RewardsInSite[];
  }
  interface RewardsInSite {
      /** Metasite ID. */
      metaSiteId?: string;
      /** Rewards. */
      rewards?: ReferralReward[];
  }
  interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
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
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$2;
  }
  interface UndeleteInfo$2 {
      deletedDate?: Date;
  }
  interface EntityUpdatedEvent$2 {
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
  interface EntityDeletedEvent$2 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
  }
  interface ActionEvent$2 {
      bodyAsJson?: string;
  }
  interface Empty$1 {
  }
  interface SuccessfulReferralEvent$1 {
      /** ReferredFriend that completed his referral details. */
      referredFriendDetails?: ReferredFriendDetails$1;
  }
  interface ReferredFriendDetails$1 {
      /**
       * ReferredFriend ID.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * ReferredFriend Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Customer who referred this ReferredFriend.
       * @readonly
       */
      referringCustomerId?: string;
  }
  interface MessageEnvelope$2 {
      /** App instance ID. */
      instanceId?: string | null;
      /** Event type. */
      eventType?: string;
      /** The identification type and identity data. */
      identity?: IdentificationData$2;
      /** Stringify payload. */
      data?: string;
  }
  interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: WebhookIdentityType$2;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf$2 {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  enum WebhookIdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  /**
   * Get a ReferralReward by id.
   * @param _id - Id of the ReferralReward to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @adminMethod
   * @returns The retrieved ReferralReward.
   */
  function getReferralReward(_id: string): Promise<ReferralReward>;
  /**
   * Query ReferralRewards.
   *
   * Can be filtered by `contact_id`. If it's set to `me` current identity's rewards are returned.
   * Supports filtering on `owner_type`, `reward_type` fields.
   * @param query - Query to filter ReferralRewards.
   * @public
   * @documentationMaturity preview
   * @requiredField query
   * @adminMethod
   */
  function queryReferralRewards(query: CursorQuery$2, options?: QueryReferralRewardsOptions): Promise<QueryReferralRewardsResponse>;
  interface QueryReferralRewardsOptions {
      /** Filter by contact id or set to "me" for current identity's rewards. */
      contactId?: string | null;
  }
  /**
   * Retrieves rewards from all metasites that the caller is the member of.
   *
   * Must be called with user identity.
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function bulkGetReferralRewards(): Promise<BulkGetReferralRewardsResponse>;
  
  type loyaltyReferralV1ReferralReward_universal_d_ReferralReward = ReferralReward;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardReceiverOneOf = ReferralRewardReceiverOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_ReferralRewardRewardTypeOptionsOneOf = ReferralRewardRewardTypeOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_RewardTypeType = RewardTypeType;
  const loyaltyReferralV1ReferralReward_universal_d_RewardTypeType: typeof RewardTypeType;
  type loyaltyReferralV1ReferralReward_universal_d_V1Coupon = V1Coupon;
  type loyaltyReferralV1ReferralReward_universal_d_Coupon = Coupon;
  type loyaltyReferralV1ReferralReward_universal_d_CouponDiscountTypeOptionsOneOf = CouponDiscountTypeOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_CouponScopeOrMinSubtotalOneOf = CouponScopeOrMinSubtotalOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_DiscountType = DiscountType;
  const loyaltyReferralV1ReferralReward_universal_d_DiscountType: typeof DiscountType;
  type loyaltyReferralV1ReferralReward_universal_d_FixedAmountDiscount = FixedAmountDiscount;
  type loyaltyReferralV1ReferralReward_universal_d_PercentageDiscount = PercentageDiscount;
  type loyaltyReferralV1ReferralReward_universal_d_CouponScope = CouponScope;
  type loyaltyReferralV1ReferralReward_universal_d_Group = Group;
  type loyaltyReferralV1ReferralReward_universal_d_V1LoyaltyPoints = V1LoyaltyPoints;
  type loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardRequest = GetReferralRewardRequest;
  type loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardResponse = GetReferralRewardResponse;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsRequest = QueryReferralRewardsRequest;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsResponse = QueryReferralRewardsResponse;
  type loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardRequest = ValidateReferralRewardRequest;
  type loyaltyReferralV1ReferralReward_universal_d_Reward = Reward;
  type loyaltyReferralV1ReferralReward_universal_d_RewardOptionsOneOf = RewardOptionsOneOf;
  type loyaltyReferralV1ReferralReward_universal_d_Type = Type;
  const loyaltyReferralV1ReferralReward_universal_d_Type: typeof Type;
  type loyaltyReferralV1ReferralReward_universal_d_LoyaltyPoints = LoyaltyPoints;
  type loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardResponse = ValidateReferralRewardResponse;
  type loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsRequest = BulkGetReferralRewardsRequest;
  type loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsResponse = BulkGetReferralRewardsResponse;
  type loyaltyReferralV1ReferralReward_universal_d_RewardsInSite = RewardsInSite;
  const loyaltyReferralV1ReferralReward_universal_d_getReferralReward: typeof getReferralReward;
  const loyaltyReferralV1ReferralReward_universal_d_queryReferralRewards: typeof queryReferralRewards;
  type loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsOptions = QueryReferralRewardsOptions;
  const loyaltyReferralV1ReferralReward_universal_d_bulkGetReferralRewards: typeof bulkGetReferralRewards;
  namespace loyaltyReferralV1ReferralReward_universal_d {
    export {
      loyaltyReferralV1ReferralReward_universal_d_ReferralReward as ReferralReward,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardReceiverOneOf as ReferralRewardReceiverOneOf,
      loyaltyReferralV1ReferralReward_universal_d_ReferralRewardRewardTypeOptionsOneOf as ReferralRewardRewardTypeOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_RewardTypeType as RewardTypeType,
      loyaltyReferralV1ReferralReward_universal_d_V1Coupon as V1Coupon,
      Status$1 as Status,
      loyaltyReferralV1ReferralReward_universal_d_Coupon as Coupon,
      loyaltyReferralV1ReferralReward_universal_d_CouponDiscountTypeOptionsOneOf as CouponDiscountTypeOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_CouponScopeOrMinSubtotalOneOf as CouponScopeOrMinSubtotalOneOf,
      loyaltyReferralV1ReferralReward_universal_d_DiscountType as DiscountType,
      loyaltyReferralV1ReferralReward_universal_d_FixedAmountDiscount as FixedAmountDiscount,
      loyaltyReferralV1ReferralReward_universal_d_PercentageDiscount as PercentageDiscount,
      loyaltyReferralV1ReferralReward_universal_d_CouponScope as CouponScope,
      loyaltyReferralV1ReferralReward_universal_d_Group as Group,
      loyaltyReferralV1ReferralReward_universal_d_V1LoyaltyPoints as V1LoyaltyPoints,
      loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardRequest as GetReferralRewardRequest,
      loyaltyReferralV1ReferralReward_universal_d_GetReferralRewardResponse as GetReferralRewardResponse,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsRequest as QueryReferralRewardsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$2 as CursorPaging,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsResponse as QueryReferralRewardsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardRequest as ValidateReferralRewardRequest,
      loyaltyReferralV1ReferralReward_universal_d_Reward as Reward,
      loyaltyReferralV1ReferralReward_universal_d_RewardOptionsOneOf as RewardOptionsOneOf,
      loyaltyReferralV1ReferralReward_universal_d_Type as Type,
      loyaltyReferralV1ReferralReward_universal_d_LoyaltyPoints as LoyaltyPoints,
      loyaltyReferralV1ReferralReward_universal_d_ValidateReferralRewardResponse as ValidateReferralRewardResponse,
      loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsRequest as BulkGetReferralRewardsRequest,
      loyaltyReferralV1ReferralReward_universal_d_BulkGetReferralRewardsResponse as BulkGetReferralRewardsResponse,
      loyaltyReferralV1ReferralReward_universal_d_RewardsInSite as RewardsInSite,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      UndeleteInfo$2 as UndeleteInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      Empty$1 as Empty,
      SuccessfulReferralEvent$1 as SuccessfulReferralEvent,
      ReferredFriendDetails$1 as ReferredFriendDetails,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      loyaltyReferralV1ReferralReward_universal_d_getReferralReward as getReferralReward,
      loyaltyReferralV1ReferralReward_universal_d_queryReferralRewards as queryReferralRewards,
      loyaltyReferralV1ReferralReward_universal_d_QueryReferralRewardsOptions as QueryReferralRewardsOptions,
      loyaltyReferralV1ReferralReward_universal_d_bulkGetReferralRewards as bulkGetReferralRewards,
    };
  }
  
  /** ReferredFriend is the main entity of ReferredFriends that can be used for lorem ipsum dolor */
  interface ReferredFriend {
      /**
       * ReferredFriend ID.
       * @readonly
       */
      _id?: string;
      /**
       * ReferredFriend Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Customer who referred.
       * @readonly
       */
      referringCustomerId?: string;
      /** Status of the ReferredFriend. */
      status?: Status;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Represents the time this ReferredFriend was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Represents the time this ReferredFriend was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  enum Status {
      /** Unknown status. */
      UNKNOWN = "UNKNOWN",
      /** Initial status, when Referred friend joins site as member. */
      SIGN_UP_COMPLETED = "SIGN_UP_COMPLETED",
      /** After complete some actions (eg. Purchase Order), Action Completed Status is used. */
      ACTIONS_COMPLETED = "ACTIONS_COMPLETED"
  }
  interface CreateReferredFriendRequest {
  }
  interface CreateReferredFriendResponse {
      /** The created ReferredFriend. */
      referredFriend?: ReferredFriend;
  }
  interface GetReferredFriendRequest {
      /** Id of the ReferredFriend to retrieve. */
      referredFriendId: string;
  }
  interface GetReferredFriendResponse {
      /** The retrieved ReferredFriend. */
      referredFriend?: ReferredFriend;
  }
  interface GetReferredFriendByContactIdRequest {
      /** Contact id or "me" to get current identity's Contact. */
      contactId: string;
  }
  interface GetReferredFriendByContactIdResponse {
      /** The retrieved ReferredFriend. */
      referredFriend?: ReferredFriend;
  }
  interface UpdateReferredFriendRequest {
      /** ReferredFriend to be updated, may be partial. */
      referredFriend: ReferredFriend;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateReferredFriendResponse {
      /** The updated ReferredFriend. */
      referredFriend?: ReferredFriend;
  }
  interface DeleteReferredFriendRequest {
      /** Id of the ReferredFriend to delete. */
      referredFriendId: string;
      /** The revision of the ReferredFriend. */
      revision?: string;
  }
  interface DeleteReferredFriendResponse {
  }
  interface QueryReferredFriendRequest {
      /** Query options. */
      query: CursorQuery$1;
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
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder$1 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$1 {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryReferredFriendResponse {
      /** The retrieved ReferredFriends. */
      referredFriends?: ReferredFriend[];
      /** CursorPagingMetadata. */
      metadata?: CursorPagingMetadata$1;
  }
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors$1;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo$1;
  }
  interface UndeleteInfo$1 {
      deletedDate?: Date;
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
  interface Empty {
  }
  interface SuccessfulReferralEvent {
      /** ReferredFriend that completed his referral details. */
      referredFriendDetails?: ReferredFriendDetails;
  }
  interface ReferredFriendDetails {
      /**
       * ReferredFriend ID.
       * @readonly
       */
      referredFriendId?: string;
      /**
       * ReferredFriend Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Customer who referred this ReferredFriend.
       * @readonly
       */
      referringCustomerId?: string;
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
  /**
   * Try to create the ReferredFriend or return existing entity if it already exists.
   *
   * Must be called with member identity.
   * Member must be eligible to become referred friend.
   * @public
   * @documentationMaturity preview
   */
  function createReferredFriend(): Promise<CreateReferredFriendResponse>;
  /**
   * Get a ReferredFriend by id.
   * @param referredFriendId - Id of the ReferredFriend to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referredFriendId
   * @adminMethod
   */
  function getReferredFriend(referredFriendId: string): Promise<GetReferredFriendResponse>;
  /**
   * Get a ReferredFriend by contactId.
   *
   * You can provide "me" instead of specific contact id to get referring friend for current identity's contact.
   * @param contactId - Contact id or "me" to get current identity's Contact.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @adminMethod
   * @returns The retrieved ReferredFriend.
   */
  function getReferredFriendByContactId(contactId: string): Promise<ReferredFriend>;
  /**
   * Update a ReferredFriend, supports partial update.
   *
   * Pass the latest `revision` for a successful update.
   * @param _id - ReferredFriend ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField referredFriend
   * @requiredField referredFriend.revision
   * @adminMethod
   * @returns The updated ReferredFriend.
   */
  function updateReferredFriend(_id: string, referredFriend: UpdateReferredFriend, options?: UpdateReferredFriendOptions): Promise<ReferredFriend>;
  interface UpdateReferredFriend {
      /**
       * ReferredFriend ID.
       * @readonly
       */
      _id?: string;
      /**
       * ReferredFriend Contact ID.
       * @readonly
       */
      contactId?: string;
      /**
       * Customer who referred.
       * @readonly
       */
      referringCustomerId?: string;
      /** Status of the ReferredFriend. */
      status?: Status;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Represents the time this ReferredFriend was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Represents the time this ReferredFriend was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  interface UpdateReferredFriendOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Delete a ReferredFriend.
   * @param referredFriendId - Id of the ReferredFriend to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField referredFriendId
   * @adminMethod
   */
  function deleteReferredFriend(referredFriendId: string, options?: DeleteReferredFriendOptions): Promise<void>;
  interface DeleteReferredFriendOptions {
      /** The revision of the ReferredFriend. */
      revision?: string;
  }
  /**
   * Query ReferredFriends using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryReferredFriend(): ReferredFriendsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferredFriendsQueryResult extends QueryCursorResult$1 {
      items: ReferredFriend[];
      query: ReferredFriendsQueryBuilder;
      next: () => Promise<ReferredFriendsQueryResult>;
      prev: () => Promise<ReferredFriendsQueryResult>;
  }
  interface ReferredFriendsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'referringCustomerId', value: string) => ReferredFriendsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any[]) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: any) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate', value: boolean) => ReferredFriendsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate'>) => ReferredFriendsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'referringCustomerId' | 'status' | '_createdDate' | '_updatedDate'>) => ReferredFriendsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferredFriendsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferredFriendsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferredFriendsQueryResult>;
  }
  
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriend = ReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_Status = Status;
  const loyaltyReferralV1ReferredFriend_universal_d_Status: typeof Status;
  type loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendRequest = CreateReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendResponse = CreateReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendRequest = GetReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendResponse = GetReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdRequest = GetReferredFriendByContactIdRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdResponse = GetReferredFriendByContactIdResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendRequest = UpdateReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendResponse = UpdateReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendRequest = DeleteReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendResponse = DeleteReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendRequest = QueryReferredFriendRequest;
  type loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendResponse = QueryReferredFriendResponse;
  type loyaltyReferralV1ReferredFriend_universal_d_Empty = Empty;
  type loyaltyReferralV1ReferredFriend_universal_d_SuccessfulReferralEvent = SuccessfulReferralEvent;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendDetails = ReferredFriendDetails;
  const loyaltyReferralV1ReferredFriend_universal_d_createReferredFriend: typeof createReferredFriend;
  const loyaltyReferralV1ReferredFriend_universal_d_getReferredFriend: typeof getReferredFriend;
  const loyaltyReferralV1ReferredFriend_universal_d_getReferredFriendByContactId: typeof getReferredFriendByContactId;
  const loyaltyReferralV1ReferredFriend_universal_d_updateReferredFriend: typeof updateReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriend = UpdateReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendOptions = UpdateReferredFriendOptions;
  const loyaltyReferralV1ReferredFriend_universal_d_deleteReferredFriend: typeof deleteReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendOptions = DeleteReferredFriendOptions;
  const loyaltyReferralV1ReferredFriend_universal_d_queryReferredFriend: typeof queryReferredFriend;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryResult = ReferredFriendsQueryResult;
  type loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryBuilder = ReferredFriendsQueryBuilder;
  namespace loyaltyReferralV1ReferredFriend_universal_d {
    export {
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriend as ReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_Status as Status,
      loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendRequest as CreateReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_CreateReferredFriendResponse as CreateReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendRequest as GetReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendResponse as GetReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdRequest as GetReferredFriendByContactIdRequest,
      loyaltyReferralV1ReferredFriend_universal_d_GetReferredFriendByContactIdResponse as GetReferredFriendByContactIdResponse,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendRequest as UpdateReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendResponse as UpdateReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendRequest as DeleteReferredFriendRequest,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendResponse as DeleteReferredFriendResponse,
      loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendRequest as QueryReferredFriendRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      loyaltyReferralV1ReferredFriend_universal_d_QueryReferredFriendResponse as QueryReferredFriendResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      UndeleteInfo$1 as UndeleteInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      loyaltyReferralV1ReferredFriend_universal_d_Empty as Empty,
      loyaltyReferralV1ReferredFriend_universal_d_SuccessfulReferralEvent as SuccessfulReferralEvent,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendDetails as ReferredFriendDetails,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      loyaltyReferralV1ReferredFriend_universal_d_createReferredFriend as createReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_getReferredFriend as getReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_getReferredFriendByContactId as getReferredFriendByContactId,
      loyaltyReferralV1ReferredFriend_universal_d_updateReferredFriend as updateReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriend as UpdateReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_UpdateReferredFriendOptions as UpdateReferredFriendOptions,
      loyaltyReferralV1ReferredFriend_universal_d_deleteReferredFriend as deleteReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_DeleteReferredFriendOptions as DeleteReferredFriendOptions,
      loyaltyReferralV1ReferredFriend_universal_d_queryReferredFriend as queryReferredFriend,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryResult as ReferredFriendsQueryResult,
      loyaltyReferralV1ReferredFriend_universal_d_ReferredFriendsQueryBuilder as ReferredFriendsQueryBuilder,
    };
  }
  
  /** ReferringCustomer is the main entity of ReferringCustomers. */
  interface ReferringCustomer {
      /**
       * ReferringCustomer id.
       * @readonly
       */
      _id?: string;
      /**
       * Contact id.
       * @readonly
       */
      contactId?: string;
      /**
       * Referral code.
       * @readonly
       */
      referralCode?: string;
      /** Represents the current state of an item. Each time the item is modified, its `revision` changes by the server. for an update operation to succeed, you MUST pass the latest revision. */
      revision?: string | null;
      /**
       * Represents the time this ReferringCustomer was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Represents the time this ReferringCustomer was last updated.
       * @readonly
       */
      _updatedDate?: Date;
  }
  interface GenerateReferringCustomerForContactRequest {
      /** Contact id or "me" to generate current identity's referring customer. */
      contactId: string;
  }
  interface GenerateReferringCustomerForContactResponse {
      /** The created ReferringCustomer. */
      referringCustomer?: ReferringCustomer;
  }
  interface GetReferringCustomerRequest {
      /** Id of the ReferringCustomer to retrieve. */
      referringCustomerId: string;
  }
  interface GetReferringCustomerResponse {
      /** The retrieved ReferringCustomer. */
      referringCustomer?: ReferringCustomer;
  }
  interface GetReferringCustomerByReferralCodeRequest {
      /** Referral Code of the ReferringCustomer to retrieve. */
      referralCode: string;
  }
  interface GetReferringCustomerByReferralCodeResponse {
      /** The retrieved ReferringCustomer. */
      referringCustomer?: ReferringCustomer;
  }
  interface QueryReferringCustomersRequest {
      /** Query options. */
      query: CursorQuery;
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
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging {
      /** Maximum number of items to return in the results. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryReferringCustomersResponse {
      /** The retrieved ReferringCustomers. */
      referringCustomers?: ReferringCustomer[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Cursor strings that point to the next page, previous page, or both. */
      cursors?: Cursors;
      /**
       * Whether there are more pages to retrieve following the current page.
       *
       * + `true`: Another page of results can be retrieved.
       * + `false`: This is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to the previous page in the list of results. */
      prev?: string | null;
  }
  interface DeleteReferringCustomerRequest {
      /** Id of the ReferringCustomer to delete. */
      referringCustomerId: string;
      /** The revision of the ReferringCustomer. */
      revision?: string;
  }
  interface DeleteReferringCustomerResponse {
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      undeleteInfo?: UndeleteInfo;
  }
  interface UndeleteInfo {
      deletedDate?: Date;
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
   * Creates a new or returns existing ReferringCustomer for provided contact id.
   *
   * You can provide "me" instead of specific contact id to generate referring customer for current identity's contact.
   * @param contactId - Contact id or "me" to generate current identity's referring customer.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @adminMethod
   */
  function generateReferringCustomerForContact(contactId: string): Promise<GenerateReferringCustomerForContactResponse>;
  /**
   * Get a ReferringCustomer by id.
   * @param referringCustomerId - Id of the ReferringCustomer to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referringCustomerId
   * @adminMethod
   * @returns The retrieved ReferringCustomer.
   */
  function getReferringCustomer(referringCustomerId: string): Promise<ReferringCustomer>;
  /**
   * Get a ReferringCustomer by referral code.
   * @param referralCode - Referral Code of the ReferringCustomer to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField referralCode
   * @adminMethod
   */
  function getReferringCustomerByReferralCode(referralCode: string): Promise<GetReferringCustomerByReferralCodeResponse>;
  /**
   * Query ReferredFriends using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   *
   * Fields supported: `contact_id`, `referral_code`, `created_date`, `updated_date`.
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryReferringCustomers(): ReferringCustomersQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ReferringCustomersQueryResult extends QueryCursorResult {
      items: ReferringCustomer[];
      query: ReferringCustomersQueryBuilder;
      next: () => Promise<ReferringCustomersQueryResult>;
      prev: () => Promise<ReferringCustomersQueryResult>;
  }
  interface ReferringCustomersQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'contactId' | 'referralCode', value: string) => ReferringCustomersQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any[]) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: any) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: 'contactId' | 'referralCode' | '_createdDate' | '_updatedDate', value: boolean) => ReferringCustomersQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'contactId' | 'referralCode' | '_createdDate' | '_updatedDate'>) => ReferringCustomersQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'contactId' | 'referralCode' | '_createdDate' | '_updatedDate'>) => ReferringCustomersQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ReferringCustomersQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ReferringCustomersQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ReferringCustomersQueryResult>;
  }
  /**
   * Delete ReferringCustomer by id.
   *
   * You must also provide `revision`.
   * @param referringCustomerId - Id of the ReferringCustomer to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField referringCustomerId
   * @adminMethod
   */
  function deleteReferringCustomer(referringCustomerId: string, options?: DeleteReferringCustomerOptions): Promise<void>;
  interface DeleteReferringCustomerOptions {
      /** The revision of the ReferringCustomer. */
      revision?: string;
  }
  
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomer = ReferringCustomer;
  type loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactRequest = GenerateReferringCustomerForContactRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactResponse = GenerateReferringCustomerForContactResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerRequest = GetReferringCustomerRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerResponse = GetReferringCustomerResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeRequest = GetReferringCustomerByReferralCodeRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeResponse = GetReferringCustomerByReferralCodeResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersRequest = QueryReferringCustomersRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorQuery = CursorQuery;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_Sorting = Sorting;
  type loyaltyReferralV1ReferringCustomer_universal_d_SortOrder = SortOrder;
  const loyaltyReferralV1ReferringCustomer_universal_d_SortOrder: typeof SortOrder;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorPaging = CursorPaging;
  type loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersResponse = QueryReferringCustomersResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type loyaltyReferralV1ReferringCustomer_universal_d_Cursors = Cursors;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerRequest = DeleteReferringCustomerRequest;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerResponse = DeleteReferringCustomerResponse;
  type loyaltyReferralV1ReferringCustomer_universal_d_DomainEvent = DomainEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_UndeleteInfo = UndeleteInfo;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_ActionEvent = ActionEvent;
  type loyaltyReferralV1ReferringCustomer_universal_d_MessageEnvelope = MessageEnvelope;
  type loyaltyReferralV1ReferringCustomer_universal_d_IdentificationData = IdentificationData;
  type loyaltyReferralV1ReferringCustomer_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType = WebhookIdentityType;
  const loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const loyaltyReferralV1ReferringCustomer_universal_d_generateReferringCustomerForContact: typeof generateReferringCustomerForContact;
  const loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomer: typeof getReferringCustomer;
  const loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomerByReferralCode: typeof getReferringCustomerByReferralCode;
  const loyaltyReferralV1ReferringCustomer_universal_d_queryReferringCustomers: typeof queryReferringCustomers;
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryResult = ReferringCustomersQueryResult;
  type loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryBuilder = ReferringCustomersQueryBuilder;
  const loyaltyReferralV1ReferringCustomer_universal_d_deleteReferringCustomer: typeof deleteReferringCustomer;
  type loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerOptions = DeleteReferringCustomerOptions;
  namespace loyaltyReferralV1ReferringCustomer_universal_d {
    export {
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomer as ReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactRequest as GenerateReferringCustomerForContactRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GenerateReferringCustomerForContactResponse as GenerateReferringCustomerForContactResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerRequest as GetReferringCustomerRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerResponse as GetReferringCustomerResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeRequest as GetReferringCustomerByReferralCodeRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_GetReferringCustomerByReferralCodeResponse as GetReferringCustomerByReferralCodeResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersRequest as QueryReferringCustomersRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorQuery as CursorQuery,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_Sorting as Sorting,
      loyaltyReferralV1ReferringCustomer_universal_d_SortOrder as SortOrder,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorPaging as CursorPaging,
      loyaltyReferralV1ReferringCustomer_universal_d_QueryReferringCustomersResponse as QueryReferringCustomersResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      loyaltyReferralV1ReferringCustomer_universal_d_Cursors as Cursors,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerRequest as DeleteReferringCustomerRequest,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerResponse as DeleteReferringCustomerResponse,
      loyaltyReferralV1ReferringCustomer_universal_d_DomainEvent as DomainEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_UndeleteInfo as UndeleteInfo,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_ActionEvent as ActionEvent,
      loyaltyReferralV1ReferringCustomer_universal_d_MessageEnvelope as MessageEnvelope,
      loyaltyReferralV1ReferringCustomer_universal_d_IdentificationData as IdentificationData,
      loyaltyReferralV1ReferringCustomer_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      loyaltyReferralV1ReferringCustomer_universal_d_WebhookIdentityType as WebhookIdentityType,
      loyaltyReferralV1ReferringCustomer_universal_d_generateReferringCustomerForContact as generateReferringCustomerForContact,
      loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomer as getReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_getReferringCustomerByReferralCode as getReferringCustomerByReferralCode,
      loyaltyReferralV1ReferringCustomer_universal_d_queryReferringCustomers as queryReferringCustomers,
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryResult as ReferringCustomersQueryResult,
      loyaltyReferralV1ReferringCustomer_universal_d_ReferringCustomersQueryBuilder as ReferringCustomersQueryBuilder,
      loyaltyReferralV1ReferringCustomer_universal_d_deleteReferringCustomer as deleteReferringCustomer,
      loyaltyReferralV1ReferringCustomer_universal_d_DeleteReferringCustomerOptions as DeleteReferringCustomerOptions,
    };
  }
  
  export { loyaltyReferralV1ReferringCustomer_universal_d as customers, loyaltyReferralV1ReferredFriend_universal_d as friends, loyaltyReferralV1Program_universal_d as programs, loyaltyReferralV1ReferralReward_universal_d as rewards, loyaltyReferralV1ReferralEvent_universal_d as tracker };
}
