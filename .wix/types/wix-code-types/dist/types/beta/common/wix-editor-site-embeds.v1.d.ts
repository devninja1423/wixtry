declare module "wix-editor-site-embeds.v1" {
  /** A SiteEmbed is the primary entity within the SiteEmbedService, responsible for storing and managing embed-related information. */
  interface SiteEmbed extends SiteEmbedContentOneOf {
      /** Custom embed entity */
      customEmbedOptions?: CustomEmbed;
      /**
       * Verification Code embed entity
       * @internal
       */
      verificationCodeOptions?: VerificationCode;
      /**
       * HotJar embed entity
       * @internal
       */
      hotjarOptions?: Hotjar;
      /**
       * Wix Analytics embed entity
       * @internal
       */
      wixAnalyticsOptions?: WixAnalytics;
      /**
       * Privy embed entity
       * @internal
       */
      privyOptions?: Privy;
      /**
       * HelloBar embed entity
       * @internal
       */
      helloBarOptions?: HelloBar;
      /**
       * Wisepops embed entity
       * @internal
       */
      wisepopsOptions?: Wisepops;
      /**
       * Gtag embed entity
       * @internal
       */
      gtagOptions?: Gtag;
      /**
       * VWO embed entity
       * @internal
       */
      vwoOptions?: Vwo;
      /**
       * VkRetargeting embed entity
       * @internal
       */
      vkRetargetingOptions?: VkRetargeting;
      /**
       * CallRail embed entity
       * @internal
       */
      callRailOptions?: CallRail;
      /**
       * CrazyEgg embed entity
       * @internal
       */
      crazyEggOptions?: CrazyEgg;
      /**
       * AppMarket embed entity
       * @internal
       */
      appMarketOptions?: AppMarket;
      /**
       * MobileBannerExperimental embed entity
       * @internal
       */
      mobileBannerExperimentalOptions?: MobileBannerExperimental;
      /**
       * PaidAdsFacebookPixel embed entity
       * @internal
       */
      paidAdsFacebookPixelOptions?: PaidAdsFacebookPixel;
      /**
       * GscVerification embed entity
       * @internal
       */
      gscVerificationOptions?: GscVerification;
      /**
       * PinterestVerification embed entity
       * @internal
       */
      pinterestVerificationOptions?: PinterestVerification;
      /**
       * BingVerification embed entity
       * @internal
       */
      bingVerificationOptions?: BingVerification;
      /**
       * YandexVerification embed entity
       * @internal
       */
      yandexVerificationOptions?: YandexVerification;
      /**
       * NaverVerification embed entity
       * @internal
       */
      naverVerificationOptions?: NaverVerification;
      /**
       * A [Google Ads Conversion tag](https://support.google.com/tagmanager/answer/6105160?hl=en&ref_topic=6334091)
       * lets site owners analyze what a visitor does after clicking on a Google ad.
       */
      googleAdWordsOptions?: GoogleAdWords;
      /**
       * A [Google Analytics tag](https://support.google.com/tagmanager/topic/6333310?hl=en&ref_topic=3002579)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site. Both [Google Universal Analytics Tags](https://support.google.com/tagmanager/answer/6107124?hl=en&ref_topic=6333310)
       * and [Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095?hl=en&ref_topic=6333310)
       * are supported.
       */
      googleAnalyticsOptions?: GoogleAnalytics;
      /**
       * A [Yandex Metrica tag](https://yandex.com/support/metrica/index.html) lets site
       * owners build visual reports of visitor activity that helps them evaluate the
       * performance of their marketing campaigns.
       */
      yandexMetricaOptions?: YandexMetrica;
      /**
       * A [Facebook Pixel tag](https://developers.facebook.com/docs/facebook-pixel/)
       * allows site owners to track Facebook ad-driven visitor activity on their site.
       */
      facebookPixelOptions?: FacebookPixel;
      /**
       * A [Google tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerOptions?: GoogleTagManager;
      /**
       * A [TikTok Pixel](https://ads.tiktok.com/help/article?aid=9663)
       * allows site owners to share visitor events to TikTok on their site.
       */
      tikTokPixelOptions?: TikTokPixel;
      /**
       * A [Google tag manager consent mode tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerConsentModeOptions?: GoogleTagManagerConsentMode;
      /**
       * A [Google Analytics consent mode tag](https://developers.google.com/tag-platform/gtagjs/reference)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site.
       */
      googleAnalyticsConsentModeOptions?: GoogleAnalyticsConsentMode;
      /**
       * SiteEmbed id
       * @readonly
       */
      _id?: string | null;
      /**
       * SiteEmbed revision (to support optimistic locking)
       * @readonly
       */
      revision?: string | null;
      /** Meaningful name for the user to identify the SiteEmbed */
      name?: string | null;
      /** SiteEmbed will be available in live site only when enabled */
      enabled?: boolean;
      /** Load SiteEmbed once during initial site rendering, not on each page navigation */
      loadOnce?: boolean;
      /** Page ids where the SiteEmbed will be available. When omitted, it will be loaded in each page */
      pageFilter?: PageFilter;
      /** User site domain the Embed is installed on */
      domain?: string | null;
      /** SiteEmbed position in the HTML */
      order?: SiteEmbedOrder;
      /** Site Embed type (must be aligned with content field) */
      siteEmbedType?: SiteEmbedType;
      /** Extended fields */
      extendedFields?: ExtendedFields;
  }
  /** @oneof */
  interface SiteEmbedContentOneOf {
      /** Custom embed entity */
      customEmbedOptions?: CustomEmbed;
      /**
       * Verification Code embed entity
       * @internal
       */
      verificationCodeOptions?: VerificationCode;
      /**
       * HotJar embed entity
       * @internal
       */
      hotjarOptions?: Hotjar;
      /**
       * Wix Analytics embed entity
       * @internal
       */
      wixAnalyticsOptions?: WixAnalytics;
      /**
       * Privy embed entity
       * @internal
       */
      privyOptions?: Privy;
      /**
       * HelloBar embed entity
       * @internal
       */
      helloBarOptions?: HelloBar;
      /**
       * Wisepops embed entity
       * @internal
       */
      wisepopsOptions?: Wisepops;
      /**
       * Gtag embed entity
       * @internal
       */
      gtagOptions?: Gtag;
      /**
       * VWO embed entity
       * @internal
       */
      vwoOptions?: Vwo;
      /**
       * VkRetargeting embed entity
       * @internal
       */
      vkRetargetingOptions?: VkRetargeting;
      /**
       * CallRail embed entity
       * @internal
       */
      callRailOptions?: CallRail;
      /**
       * CrazyEgg embed entity
       * @internal
       */
      crazyEggOptions?: CrazyEgg;
      /**
       * AppMarket embed entity
       * @internal
       */
      appMarketOptions?: AppMarket;
      /**
       * MobileBannerExperimental embed entity
       * @internal
       */
      mobileBannerExperimentalOptions?: MobileBannerExperimental;
      /**
       * PaidAdsFacebookPixel embed entity
       * @internal
       */
      paidAdsFacebookPixelOptions?: PaidAdsFacebookPixel;
      /**
       * GscVerification embed entity
       * @internal
       */
      gscVerificationOptions?: GscVerification;
      /**
       * PinterestVerification embed entity
       * @internal
       */
      pinterestVerificationOptions?: PinterestVerification;
      /**
       * BingVerification embed entity
       * @internal
       */
      bingVerificationOptions?: BingVerification;
      /**
       * YandexVerification embed entity
       * @internal
       */
      yandexVerificationOptions?: YandexVerification;
      /**
       * NaverVerification embed entity
       * @internal
       */
      naverVerificationOptions?: NaverVerification;
      /**
       * A [Google Ads Conversion tag](https://support.google.com/tagmanager/answer/6105160?hl=en&ref_topic=6334091)
       * lets site owners analyze what a visitor does after clicking on a Google ad.
       */
      googleAdWordsOptions?: GoogleAdWords;
      /**
       * A [Google Analytics tag](https://support.google.com/tagmanager/topic/6333310?hl=en&ref_topic=3002579)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site. Both [Google Universal Analytics Tags](https://support.google.com/tagmanager/answer/6107124?hl=en&ref_topic=6333310)
       * and [Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095?hl=en&ref_topic=6333310)
       * are supported.
       */
      googleAnalyticsOptions?: GoogleAnalytics;
      /**
       * A [Yandex Metrica tag](https://yandex.com/support/metrica/index.html) lets site
       * owners build visual reports of visitor activity that helps them evaluate the
       * performance of their marketing campaigns.
       */
      yandexMetricaOptions?: YandexMetrica;
      /**
       * A [Facebook Pixel tag](https://developers.facebook.com/docs/facebook-pixel/)
       * allows site owners to track Facebook ad-driven visitor activity on their site.
       */
      facebookPixelOptions?: FacebookPixel;
      /**
       * A [Google tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerOptions?: GoogleTagManager;
      /**
       * A [TikTok Pixel](https://ads.tiktok.com/help/article?aid=9663)
       * allows site owners to share visitor events to TikTok on their site.
       */
      tikTokPixelOptions?: TikTokPixel;
      /**
       * A [Google tag manager consent mode tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerConsentModeOptions?: GoogleTagManagerConsentMode;
      /**
       * A [Google Analytics consent mode tag](https://developers.google.com/tag-platform/gtagjs/reference)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site.
       */
      googleAnalyticsConsentModeOptions?: GoogleAnalyticsConsentMode;
  }
  enum PositionOnPage {
      /** Illegal value, exception will be thrown if used */
      UNKNOWN_POSITION = "UNKNOWN_POSITION",
      /** HEAD position */
      HEAD = "HEAD",
      /** BODY_START position */
      BODY_START = "BODY_START",
      /** BODY_END position */
      BODY_END = "BODY_END"
  }
  interface PageFilter {
      /** Pages where the filter is enabled on */
      pageIds?: string[];
  }
  interface SiteEmbedOrder {
      /** Position on page */
      position?: PositionOnPage;
      /**
       * Priority of the position for sorting by position on page
       * @readonly
       */
      positionPriority?: number;
      /**
       * Priority of this SiteEmbed according to others on the same position
       * @readonly
       */
      elementPriority?: number;
  }
  enum SiteEmbedType {
      UNKNOWN_SITE_EMBED = "UNKNOWN_SITE_EMBED",
      /** Custom embed type */
      CUSTOM_EMBED = "CUSTOM_EMBED",
      /** Verification Code embed type */
      VERIFICATION_CODE = "VERIFICATION_CODE",
      /** HotJar embed type */
      HOTJAR = "HOTJAR",
      /** Wix Analytics embed type */
      WIX_ANALYTICS = "WIX_ANALYTICS",
      /** Privy embed type */
      PRIVY = "PRIVY",
      /** HelloBar embed type */
      HELLO_BAR = "HELLO_BAR",
      /** Wisepops embed type */
      WISEPOPS = "WISEPOPS",
      /** Gtag embed type */
      GTAG = "GTAG",
      /** VWO embed type */
      VWO = "VWO",
      /** VkRetargeting embed type */
      VK_RETARGETING = "VK_RETARGETING",
      /** CallRail embed type */
      CALL_RAIL = "CALL_RAIL",
      /** CrazyEgg embed type */
      CRAZY_EGG = "CRAZY_EGG",
      /** AppMarket embed type */
      APP_MARKET = "APP_MARKET",
      /** MobileBannerExperimental embed type */
      MOBILE_BANNER_EXPERIMENTAL = "MOBILE_BANNER_EXPERIMENTAL",
      /** PaidAdsFacebookPixel embed type */
      PAID_ADS_FACEBOOK_PIXEL = "PAID_ADS_FACEBOOK_PIXEL",
      /** GscVerification embed type */
      GSC_VERIFICATION = "GSC_VERIFICATION",
      /** PinterestVerification embed type */
      PINTEREST_VERIFICATION = "PINTEREST_VERIFICATION",
      /** BingVerification embed type */
      BING_VERIFICATION = "BING_VERIFICATION",
      /** YandexVerification embed type */
      YANDEX_VERIFICATION = "YANDEX_VERIFICATION",
      /** NaverVerification embed type */
      NAVER_VERIFICATION = "NAVER_VERIFICATION",
      /** Google AdWords embed type */
      GOOGLE_AD_WORDS = "GOOGLE_AD_WORDS",
      /** Google Analytics embed type */
      GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
      /** Yandex metrica embed type */
      YANDEX_METRICA = "YANDEX_METRICA",
      /** Facebook Pixel embed type */
      FACEBOOK_PIXEL = "FACEBOOK_PIXEL",
      /** Google Tag Manager embed type */
      GOOGLE_TAG_MANAGER = "GOOGLE_TAG_MANAGER",
      /** TikTok Pixel embed type */
      TIK_TOK_PIXEL = "TIK_TOK_PIXEL",
      /** Google Tag Manager Consent Mode */
      GOOGLE_TAG_MANAGER_CONSENT_MODE = "GOOGLE_TAG_MANAGER_CONSENT_MODE",
      /** Google Analytics Consent Mode */
      GOOGLE_ANALYTICS_CONSENT_MODE = "GOOGLE_ANALYTICS_CONSENT_MODE"
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
  interface CustomEmbed {
      /** CustomEmbed's category */
      category?: Category;
      /** CustomEmbed's html */
      html?: string;
  }
  enum Category {
      /** Illegal type, exception will be thrown if used */
      UNKNOWN_CATEGORY = "UNKNOWN_CATEGORY",
      /** Essential category */
      ESSENTIAL = "ESSENTIAL",
      /** Functional category */
      FUNCTIONAL = "FUNCTIONAL",
      /** Analytics category */
      ANALYTICS = "ANALYTICS",
      /** Advertising category */
      ADVERTISING = "ADVERTISING",
      /** Data to third party category */
      DATA_TO_THIRD_PARTY = "DATA_TO_THIRD_PARTY"
  }
  interface VerificationCode {
      /** VerificationCode html */
      html?: string;
  }
  interface Hotjar {
      /** Hotjar tracking_id */
      trackingId?: string;
  }
  interface WixAnalytics {
  }
  interface Privy {
      /** Privy tracking_id */
      trackingId?: string;
  }
  interface HelloBar {
      /** HelloBar tracking_id */
      trackingId?: string;
  }
  interface Wisepops {
      /** Wisepops tracking_id */
      trackingId?: string;
  }
  interface Gtag {
      /** Gtag tracking_id */
      trackingId?: string;
  }
  interface Vwo {
      /** Vwo tracking_id */
      trackingId?: string;
  }
  interface VkRetargeting {
      /** VkRetargeting tracking_id */
      trackingId?: string;
  }
  interface CallRail {
      /** CallRail tracking_id */
      trackingId?: string;
  }
  interface CrazyEgg {
      /** CrazyEgg tracking_id */
      trackingId?: string;
  }
  interface AppMarket {
      /** The application id owning this component */
      appId?: string;
      /** The version of the application that this was installed with */
      appVersion?: string;
      /** The id of the component that was installed */
      componentId?: string | null;
      /** Parameters that will be injected into the Embed HTML template */
      parameters?: Record<string, string>;
  }
  interface MobileBannerExperimental {
      /** MobileBannerExperimental app_link */
      appLink?: string;
      /** MobileBannerExperimental config */
      config?: string | null;
  }
  interface PaidAdsFacebookPixel {
      /** PaidAdsFacebookPixel pixel_id */
      pixelId?: string;
  }
  interface GscVerification {
      /** GscVerification token */
      token?: string;
  }
  interface PinterestVerification {
      /** PinterestVerification token */
      token?: string;
  }
  interface BingVerification {
      /** BingVerification token */
      token?: string;
  }
  interface YandexVerification {
      /** YandexVerification token */
      token?: string;
  }
  interface NaverVerification {
      /** NaverVerification token */
      token?: string;
  }
  interface GoogleAdWords {
      /** GoogleAdWords tracking_id */
      trackingId?: string;
  }
  interface GoogleAnalytics {
      /** GoogleAnalytic tracking id */
      trackingId?: string;
      /** GoogleAnalytic ip_anonymization */
      ipAnonymization?: boolean | null;
  }
  interface YandexMetrica {
      /** YandexMetrica tracking_id */
      trackingId?: string;
  }
  interface FacebookPixel {
      /** FacebookPixel tracking_id */
      trackingId?: string;
  }
  interface GoogleTagManager {
      /** GoogleTagManager tracking_id */
      trackingId?: string;
  }
  interface TikTokPixel {
      /** Specifies which TikTok Pixel is associated with the site owner */
      trackingId?: string;
  }
  interface GoogleTagManagerConsentMode {
      /** Specifies which Google Tag Manager Container is associated with the site owner. */
      trackingId?: string;
  }
  interface GoogleAnalyticsConsentMode {
      /** Specifies which Google property is associated with the site owner. */
      trackingId?: string;
      /** Whether IP addresses of site visitors are hidden from Google. */
      ipAnonymization?: boolean | null;
  }
  interface CreateSiteEmbedRequest {
      /** SiteEmbed to be created. */
      siteEmbed: SiteEmbed;
      /**
       * Deprecated. only used for legacy services, do not use this field.
       * IMPORTANT: legacy_id is used to support migration from old service.
       * If provided, it will be used as the new id.
       * If not provided, a new id will be generated.
       * @internal
       */
      legacyId?: string | null;
  }
  interface CreateSiteEmbedResponse {
      /** The created SiteEmbed. */
      siteEmbed?: SiteEmbed;
  }
  interface GetSiteEmbedRequest {
      /** ID of the SiteEmbed to retrieve. */
      siteEmbedId: string;
  }
  interface GetSiteEmbedResponse {
      /** The requested SiteEmbed. */
      siteEmbed?: SiteEmbed;
  }
  interface UpdateSiteEmbedRequest {
      /** SiteEmbed to be updated. */
      siteEmbed: SiteEmbed;
      /**
       * The fields to update.
       * By default infer by the framework.
       * If explicit provided, only the provided fields will be updated.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateSiteEmbedResponse {
      /** Updated SiteEmbed. */
      siteEmbed?: SiteEmbed;
  }
  interface DeleteSiteEmbedRequest {
      /** Id of the SiteEmbed to delete. */
      siteEmbedId: string;
  }
  interface DeleteSiteEmbedResponse {
  }
  interface PlaceSiteEmbedRequest {
      /** SiteEmbed to be placed. */
      siteEmbedId: string;
      /** Indicates the desired position for inserting the embed */
      location?: Location;
      /** Used when inserting before a specific embed. If location set to BEFORE_EMBED, next_site_embed_id field must be provided */
      nextSiteEmbedId?: string | null;
  }
  enum Location {
      /** LOCATION_UNSPECIFIED, not allowed */
      LOCATION_UNSPECIFIED = "LOCATION_UNSPECIFIED",
      /** LAST location, meaning place embed in the end of the list */
      LAST = "LAST",
      /** BEFORE_EMBED location, meaning place embed before the embed specified in next_site_embed_id field */
      BEFORE_EMBED = "BEFORE_EMBED"
  }
  interface PlaceSiteEmbedResponse {
  }
  interface QuerySiteEmbedsRequest {
      /** WQL expression. */
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
  interface QuerySiteEmbedsResponse {
      /** List of site embeds. */
      siteEmbeds?: SiteEmbed[];
      /** Paging metadata */
      pagingMetadata?: CursorPagingMetadata;
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
  interface UpdateExtendedFieldsRequest {
      /** ID of the entity to update. */
      _id: string;
      /** Identifier for the app whose extended fields are being updated. */
      namespace: string;
      /** Data to update. Structured according to the [schema](https://dev.wix.com/docs/rest/articles/getting-started/extended-fields#json-schema-for-extended-fields) defined when the extended fields were configured. */
      namespaceData: Record<string, any> | null;
  }
  interface UpdateExtendedFieldsResponse {
      /** Updated SiteEmbed */
      siteEmbed?: SiteEmbed;
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
      /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
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
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo;
  }
  interface RestoreInfo {
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
   * Creates a SiteEmbed.
   * The request body must include the following fields: 'content', 'position'.
   * field 'name' is optional.
   * field 'enable' is optional and defaults to true.
   * field 'loadOnce' is optional and defaults to ture.
   *
   * IMPORTANT: Currently id is not read-only to support migration from old service.
   * If provided, it will be used as the new id.
   * If not provided, a new id will be generated.
   * Strongly recommended NOT to provide id and let the system generate it.
   * @param siteEmbed - SiteEmbed to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField siteEmbed
   * @requiredField siteEmbed.order
   * @requiredField siteEmbed.order.position
   * @adminMethod
   * @returns The created SiteEmbed.
   */
  function createSiteEmbed(siteEmbed: SiteEmbed, options?: CreateSiteEmbedOptions): Promise<SiteEmbed>;
  interface CreateSiteEmbedOptions {
      /**
       * Deprecated. only used for legacy services, do not use this field.
       * IMPORTANT: legacy_id is used to support migration from old service.
       * If provided, it will be used as the new id.
       * If not provided, a new id will be generated.
       * @internal
       */
      legacyId?: string | null;
  }
  /**
   * Retrieves a SiteEmbed.
   * @param siteEmbedId - ID of the SiteEmbed to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField siteEmbedId
   * @returns The requested SiteEmbed.
   */
  function getSiteEmbed(siteEmbedId: string): Promise<SiteEmbed>;
  /**
   * Updates A SiteEmbed.
   * The current `revision` must be passed when updating the SiteEmbed (to ensures you are working with the latest SiteEmbed and prevents unintended overwrites).
   * In case of change position, embed will be placed in the end of the position list.
   * @param _id - SiteEmbed id
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField siteEmbed
   * @requiredField siteEmbed.revision
   * @adminMethod
   * @returns Updated SiteEmbed.
   */
  function updateSiteEmbed(_id: string | null, siteEmbed: UpdateSiteEmbed, options?: UpdateSiteEmbedOptions): Promise<SiteEmbed>;
  interface UpdateSiteEmbed {
      /** Custom embed entity */
      customEmbedOptions?: CustomEmbed;
      /**
       * Verification Code embed entity
       * @internal
       */
      verificationCodeOptions?: VerificationCode;
      /**
       * HotJar embed entity
       * @internal
       */
      hotjarOptions?: Hotjar;
      /**
       * Wix Analytics embed entity
       * @internal
       */
      wixAnalyticsOptions?: WixAnalytics;
      /**
       * Privy embed entity
       * @internal
       */
      privyOptions?: Privy;
      /**
       * HelloBar embed entity
       * @internal
       */
      helloBarOptions?: HelloBar;
      /**
       * Wisepops embed entity
       * @internal
       */
      wisepopsOptions?: Wisepops;
      /**
       * Gtag embed entity
       * @internal
       */
      gtagOptions?: Gtag;
      /**
       * VWO embed entity
       * @internal
       */
      vwoOptions?: Vwo;
      /**
       * VkRetargeting embed entity
       * @internal
       */
      vkRetargetingOptions?: VkRetargeting;
      /**
       * CallRail embed entity
       * @internal
       */
      callRailOptions?: CallRail;
      /**
       * CrazyEgg embed entity
       * @internal
       */
      crazyEggOptions?: CrazyEgg;
      /**
       * AppMarket embed entity
       * @internal
       */
      appMarketOptions?: AppMarket;
      /**
       * MobileBannerExperimental embed entity
       * @internal
       */
      mobileBannerExperimentalOptions?: MobileBannerExperimental;
      /**
       * PaidAdsFacebookPixel embed entity
       * @internal
       */
      paidAdsFacebookPixelOptions?: PaidAdsFacebookPixel;
      /**
       * GscVerification embed entity
       * @internal
       */
      gscVerificationOptions?: GscVerification;
      /**
       * PinterestVerification embed entity
       * @internal
       */
      pinterestVerificationOptions?: PinterestVerification;
      /**
       * BingVerification embed entity
       * @internal
       */
      bingVerificationOptions?: BingVerification;
      /**
       * YandexVerification embed entity
       * @internal
       */
      yandexVerificationOptions?: YandexVerification;
      /**
       * NaverVerification embed entity
       * @internal
       */
      naverVerificationOptions?: NaverVerification;
      /**
       * A [Google Ads Conversion tag](https://support.google.com/tagmanager/answer/6105160?hl=en&ref_topic=6334091)
       * lets site owners analyze what a visitor does after clicking on a Google ad.
       */
      googleAdWordsOptions?: GoogleAdWords;
      /**
       * A [Google Analytics tag](https://support.google.com/tagmanager/topic/6333310?hl=en&ref_topic=3002579)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site. Both [Google Universal Analytics Tags](https://support.google.com/tagmanager/answer/6107124?hl=en&ref_topic=6333310)
       * and [Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095?hl=en&ref_topic=6333310)
       * are supported.
       */
      googleAnalyticsOptions?: GoogleAnalytics;
      /**
       * A [Yandex Metrica tag](https://yandex.com/support/metrica/index.html) lets site
       * owners build visual reports of visitor activity that helps them evaluate the
       * performance of their marketing campaigns.
       */
      yandexMetricaOptions?: YandexMetrica;
      /**
       * A [Facebook Pixel tag](https://developers.facebook.com/docs/facebook-pixel/)
       * allows site owners to track Facebook ad-driven visitor activity on their site.
       */
      facebookPixelOptions?: FacebookPixel;
      /**
       * A [Google tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerOptions?: GoogleTagManager;
      /**
       * A [TikTok Pixel](https://ads.tiktok.com/help/article?aid=9663)
       * allows site owners to share visitor events to TikTok on their site.
       */
      tikTokPixelOptions?: TikTokPixel;
      /**
       * A [Google tag manager consent mode tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
       * lets site owners implement a quick and easy tag management system that keeps
       * 3rd party code snippets organized.
       */
      googleTagManagerConsentModeOptions?: GoogleTagManagerConsentMode;
      /**
       * A [Google Analytics consent mode tag](https://developers.google.com/tag-platform/gtagjs/reference)
       * lets site owners track page views, where visitors are coming from, how long they stay, and
       * what keywords they used to find the site.
       */
      googleAnalyticsConsentModeOptions?: GoogleAnalyticsConsentMode;
      /**
       * SiteEmbed id
       * @readonly
       */
      _id?: string | null;
      /**
       * SiteEmbed revision (to support optimistic locking)
       * @readonly
       */
      revision?: string | null;
      /** Meaningful name for the user to identify the SiteEmbed */
      name?: string | null;
      /** SiteEmbed will be available in live site only when enabled */
      enabled?: boolean;
      /** Load SiteEmbed once during initial site rendering, not on each page navigation */
      loadOnce?: boolean;
      /** Page ids where the SiteEmbed will be available. When omitted, it will be loaded in each page */
      pageFilter?: PageFilter;
      /** User site domain the Embed is installed on */
      domain?: string | null;
      /** SiteEmbed position in the HTML */
      order?: SiteEmbedOrder;
      /** Site Embed type (must be aligned with content field) */
      siteEmbedType?: SiteEmbedType;
      /** Extended fields */
      extendedFields?: ExtendedFields;
  }
  interface UpdateSiteEmbedOptions {
      /**
       * The fields to update.
       * By default infer by the framework.
       * If explicit provided, only the provided fields will be updated.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Deletes a SiteEmbed.
   * Deleting a SiteEmbed permanently removes them from the SiteEmbed List.
   * @param siteEmbedId - Id of the SiteEmbed to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField siteEmbedId
   * @adminMethod
   */
  function deleteSiteEmbed(siteEmbedId: string): Promise<void>;
  /**
   * Allow to set an order between embeds.
   * @param siteEmbedId - SiteEmbed to be placed.
   * @public
   * @documentationMaturity preview
   * @requiredField siteEmbedId
   * @adminMethod
   */
  function placeSiteEmbed(siteEmbedId: string, options?: PlaceSiteEmbedOptions): Promise<void>;
  interface PlaceSiteEmbedOptions {
      /** Indicates the desired position for inserting the embed */
      location?: Location;
      /** Used when inserting before a specific embed. If location set to BEFORE_EMBED, next_site_embed_id field must be provided */
      nextSiteEmbedId?: string | null;
  }
  /**
   * Query Site Embeds
   *
   * Up to 100 SiteEmbeds can be returned per request.
   *
   * To learn how to query SiteEmbeds, see [API Query Language][3].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/pagination
   * [2]: https://dev.wix.com/api/rest/contacts/contacts/sorting,-filtering,-and-searching
   * [3]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId EDITOR.SITE_EMBED_READ
   */
  function querySiteEmbeds(): SiteEmbedsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SiteEmbedsQueryResult extends QueryCursorResult {
      items: SiteEmbed[];
      query: SiteEmbedsQueryBuilder;
      next: () => Promise<SiteEmbedsQueryResult>;
      prev: () => Promise<SiteEmbedsQueryResult>;
  }
  interface SiteEmbedsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'siteEmbedType', value: any) => SiteEmbedsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'siteEmbedType', value: any) => SiteEmbedsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'order.position' | 'order.positionPriority' | 'order.elementPriority' | 'siteEmbedType'>) => SiteEmbedsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'order.position' | 'order.positionPriority' | 'order.elementPriority' | 'siteEmbedType'>) => SiteEmbedsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SiteEmbedsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SiteEmbedsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SiteEmbedsQueryResult>;
  }
  /**
   * Updates extended fields of a SiteEmbed
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
  
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbed = SiteEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedContentOneOf = SiteEmbedContentOneOf;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PositionOnPage = PositionOnPage;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PositionOnPage: typeof PositionOnPage;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PageFilter = PageFilter;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedOrder = SiteEmbedOrder;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedType = SiteEmbedType;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedType: typeof SiteEmbedType;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_ExtendedFields = ExtendedFields;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CustomEmbed = CustomEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Category = Category;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Category: typeof Category;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_VerificationCode = VerificationCode;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Hotjar = Hotjar;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_WixAnalytics = WixAnalytics;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Privy = Privy;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_HelloBar = HelloBar;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Wisepops = Wisepops;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Gtag = Gtag;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Vwo = Vwo;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_VkRetargeting = VkRetargeting;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CallRail = CallRail;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CrazyEgg = CrazyEgg;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_AppMarket = AppMarket;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_MobileBannerExperimental = MobileBannerExperimental;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PaidAdsFacebookPixel = PaidAdsFacebookPixel;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GscVerification = GscVerification;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PinterestVerification = PinterestVerification;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_BingVerification = BingVerification;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_YandexVerification = YandexVerification;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_NaverVerification = NaverVerification;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAdWords = GoogleAdWords;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAnalytics = GoogleAnalytics;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_YandexMetrica = YandexMetrica;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_FacebookPixel = FacebookPixel;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleTagManager = GoogleTagManager;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_TikTokPixel = TikTokPixel;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleTagManagerConsentMode = GoogleTagManagerConsentMode;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAnalyticsConsentMode = GoogleAnalyticsConsentMode;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedRequest = CreateSiteEmbedRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedResponse = CreateSiteEmbedResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GetSiteEmbedRequest = GetSiteEmbedRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GetSiteEmbedResponse = GetSiteEmbedResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedRequest = UpdateSiteEmbedRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedResponse = UpdateSiteEmbedResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DeleteSiteEmbedRequest = DeleteSiteEmbedRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DeleteSiteEmbedResponse = DeleteSiteEmbedResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedRequest = PlaceSiteEmbedRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Location = Location;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Location: typeof Location;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedResponse = PlaceSiteEmbedResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_QuerySiteEmbedsRequest = QuerySiteEmbedsRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorQuery = CursorQuery;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Sorting = Sorting;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SortOrder = SortOrder;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SortOrder: typeof SortOrder;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorPaging = CursorPaging;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_QuerySiteEmbedsResponse = QuerySiteEmbedsResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Cursors = Cursors;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DomainEvent = DomainEvent;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_RestoreInfo = RestoreInfo;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_ActionEvent = ActionEvent;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_MessageEnvelope = MessageEnvelope;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_IdentificationData = IdentificationData;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_WebhookIdentityType = WebhookIdentityType;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_createSiteEmbed: typeof createSiteEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedOptions = CreateSiteEmbedOptions;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_getSiteEmbed: typeof getSiteEmbed;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_updateSiteEmbed: typeof updateSiteEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbed = UpdateSiteEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedOptions = UpdateSiteEmbedOptions;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_deleteSiteEmbed: typeof deleteSiteEmbed;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_placeSiteEmbed: typeof placeSiteEmbed;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedOptions = PlaceSiteEmbedOptions;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_querySiteEmbeds: typeof querySiteEmbeds;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedsQueryResult = SiteEmbedsQueryResult;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedsQueryBuilder = SiteEmbedsQueryBuilder;
  const documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  namespace documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d {
    export {
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbed as SiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedContentOneOf as SiteEmbedContentOneOf,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PositionOnPage as PositionOnPage,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PageFilter as PageFilter,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedOrder as SiteEmbedOrder,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedType as SiteEmbedType,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_ExtendedFields as ExtendedFields,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CustomEmbed as CustomEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Category as Category,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_VerificationCode as VerificationCode,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Hotjar as Hotjar,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_WixAnalytics as WixAnalytics,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Privy as Privy,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_HelloBar as HelloBar,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Wisepops as Wisepops,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Gtag as Gtag,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Vwo as Vwo,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_VkRetargeting as VkRetargeting,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CallRail as CallRail,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CrazyEgg as CrazyEgg,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_AppMarket as AppMarket,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_MobileBannerExperimental as MobileBannerExperimental,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PaidAdsFacebookPixel as PaidAdsFacebookPixel,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GscVerification as GscVerification,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PinterestVerification as PinterestVerification,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_BingVerification as BingVerification,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_YandexVerification as YandexVerification,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_NaverVerification as NaverVerification,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAdWords as GoogleAdWords,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAnalytics as GoogleAnalytics,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_YandexMetrica as YandexMetrica,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_FacebookPixel as FacebookPixel,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleTagManager as GoogleTagManager,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_TikTokPixel as TikTokPixel,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleTagManagerConsentMode as GoogleTagManagerConsentMode,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GoogleAnalyticsConsentMode as GoogleAnalyticsConsentMode,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedRequest as CreateSiteEmbedRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedResponse as CreateSiteEmbedResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GetSiteEmbedRequest as GetSiteEmbedRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_GetSiteEmbedResponse as GetSiteEmbedResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedRequest as UpdateSiteEmbedRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedResponse as UpdateSiteEmbedResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DeleteSiteEmbedRequest as DeleteSiteEmbedRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DeleteSiteEmbedResponse as DeleteSiteEmbedResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedRequest as PlaceSiteEmbedRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Location as Location,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedResponse as PlaceSiteEmbedResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_QuerySiteEmbedsRequest as QuerySiteEmbedsRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorQuery as CursorQuery,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Sorting as Sorting,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SortOrder as SortOrder,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorPaging as CursorPaging,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_QuerySiteEmbedsResponse as QuerySiteEmbedsResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_Cursors as Cursors,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DomainEvent as DomainEvent,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_RestoreInfo as RestoreInfo,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_ActionEvent as ActionEvent,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_MessageEnvelope as MessageEnvelope,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_IdentificationData as IdentificationData,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_WebhookIdentityType as WebhookIdentityType,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_createSiteEmbed as createSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_CreateSiteEmbedOptions as CreateSiteEmbedOptions,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_getSiteEmbed as getSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_updateSiteEmbed as updateSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbed as UpdateSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateSiteEmbedOptions as UpdateSiteEmbedOptions,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_deleteSiteEmbed as deleteSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_placeSiteEmbed as placeSiteEmbed,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_PlaceSiteEmbedOptions as PlaceSiteEmbedOptions,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_querySiteEmbeds as querySiteEmbeds,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedsQueryResult as SiteEmbedsQueryResult,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_SiteEmbedsQueryBuilder as SiteEmbedsQueryBuilder,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_updateExtendedFields as updateExtendedFields,
      documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
    };
  }
  
  export { documentManagementEditorSiteEmbedsV1SiteEmbed_universal_d as siteEmbeds };
}
