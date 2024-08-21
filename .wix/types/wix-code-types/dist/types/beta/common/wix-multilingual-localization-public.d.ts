declare module "wix-multilingual-localization-public" {
  /** content with published data only */
  interface LocalizedPublishedContent {
      /** UUID identifier for content. */
      contentId?: string;
      /** compound key identifier for content. */
      contentKey?: LocalizedContentKey;
      /** holds localized published fields for every language this entity has content */
      publishedFieldsPerLanguage?: LanguagePublishedFields[];
  }
  interface LocalizedContentKey {
      /** Schema unique key identifier */
      schemaKey?: SchemaKey;
      /** Unique identifier that represents a specific entity in the app */
      entityId?: string;
  }
  interface SchemaKey {
      /** ID of app that created the schema. */
      appId?: string;
      /** Unique name defined by the creator app, used to distinguish between different entities in the the app domain. */
      entityType?: string;
      /** Scope schema is defined in (Global/Site) */
      scope?: SchemaScope;
  }
  enum SchemaScope {
      /** Global schema, relevant to all sites */
      GLOBAL = "GLOBAL",
      /** Site schema, relevant to specific site only */
      SITE = "SITE"
  }
  /** Associate language with the published fields localized in that language */
  interface LanguagePublishedFields {
      /** content IETF BCP 47 language tag */
      languageTag?: string;
      /** localized content list of published fields. */
      languagePublishedFields?: LocalizedPublishedContentField[];
  }
  /** contains only information relevant to UoU */
  interface LocalizedPublishedContentField extends LocalizedPublishedContentFieldValueOneOf {
      /** Field actual localized content as simple text type */
      textValue?: string;
      /** Field actual localized content as rich content editor type */
      wixRichContentEditorValue?: string;
      /** Field actual localized content as media type (image, video or document) */
      mediaValue?: MediaItem;
      /** Field unique identifier. This id has to fit to a schema field id. */
      _id?: string;
      /** In case field is reachable via sequence/s, this array represents all the sequences names in the path, and their corresponding item id. */
      sequencePath?: FieldSequence[];
  }
  /** @oneof */
  interface LocalizedPublishedContentFieldValueOneOf {
      /** Field actual localized content as simple text type */
      textValue?: string;
      /** Field actual localized content as rich content editor type */
      wixRichContentEditorValue?: string;
      /** Field actual localized content as media type (image, video or document) */
      mediaValue?: MediaItem;
  }
  interface MediaItem extends MediaItemMediaOneOf {
      /** Image media item */
      image?: string;
      /** Video media item */
      video?: string;
      /** Document media item */
      document?: string;
  }
  /** @oneof */
  interface MediaItemMediaOneOf {
      /** Image media item */
      image?: string;
      /** Video media item */
      video?: string;
      /** Document media item */
      document?: string;
  }
  interface VideoResolution {
      /** Video URL. */
      url?: string;
      /** Video height. */
      height?: number;
      /** Video width. */
      width?: number;
      /**
       * Deprecated. Use the `posters` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      poster?: string;
      /** Video format for example, mp4, hls. */
      format?: string;
      /**
       * Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      urlExpirationDate?: Date;
      /**
       * Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @internal
       * @deprecated
       */
      sizeInBytes?: string | null;
      /**
       * Video quality. For example: 480p, 720p.
       * @internal
       */
      quality?: string | null;
      /**
       * Video filename.
       * @internal
       */
      filename?: string | null;
      /**
       * Video duration in seconds.
       * @internal
       * @readonly
       * @deprecated Video duration in seconds.
       * @replacedBy duration_in_milliseconds
       * @targetRemovalDate 2024-08-01
       */
      durationInSeconds?: number | null;
      /**
       * Video duration in milliseconds.
       * @internal
       * @readonly
       */
      durationInMilliseconds?: number | null;
      /**
       * When true, this is a protected asset, and calling the URL will return a 403 error.
       * In order to access private assets, make a request to:
       * `GenerateFileDownloadUrl` with the WixMedia id and specify the asset_key in the request
       * @internal
       * @readonly
       */
      private?: boolean | null;
      /**
       * Key to identify the video resolution's relationship to the original media in WixMedia.
       * Can be used to request a download for the specific video resolution.
       * For example: 480p.mp4, 720p.mp4, 1080p.mp4, trailer-720p.mp4, clip-720p.mp4
       * @internal
       * @readonly
       */
      assetKey?: string | null;
  }
  interface FieldSequence {
      /** Name of sequence */
      seqName?: string;
      /** Id of relevant item in the sequence */
      itemId?: string;
      /** Optional field - in case set sequences will be ordered by priority index (best effort) */
      priorityIndex?: number | null;
  }
  interface LocalizedPublishedLanguageContentChanged {
      /** The action that changed the content */
      action?: LocalizationPublicAction;
      /** token to identify the flow this event is part of and the total number of event in this flow. */
      flowToken?: string | null;
  }
  interface LocalizationPublicActionLocalizedPublishedContent {
      /** UUID identifier for content. */
      contentId?: string;
      /** compound key identifier for content. */
      contentKey?: LocalizedContentKey;
      /** content IETF BCP 47 language tag */
      languageTag?: string;
      /** localized content list of published fields. */
      languagePublishedFields?: LocalizedPublishedContentField[];
      /** Optional field that will group in the UI contents with the same group name */
      groupByName?: string | null;
  }
  interface LocalizationPublicActionCreateOrUpdateAction {
      /** The new Localized published state */
      localizedPublishedContent?: LocalizationPublicActionLocalizedPublishedContent;
  }
  interface LocalizationPublicActionDeleteAction {
      /** compound key identifier for removed content. */
      contentKey?: LocalizedContentKey;
      /** content IETF BCP 47 language tag */
      languageTag?: string;
  }
  interface LocalizationPublicAction extends LocalizationPublicActionActionOneOf {
      /** Content has changes in its fields */
      createOrUpdateAction?: LocalizationPublicActionCreateOrUpdateAction;
      /** Content deleted */
      deleteAction?: LocalizationPublicActionDeleteAction;
  }
  /** @oneof */
  interface LocalizationPublicActionActionOneOf {
      /** Content has changes in its fields */
      createOrUpdateAction?: LocalizationPublicActionCreateOrUpdateAction;
      /** Content deleted */
      deleteAction?: LocalizationPublicActionDeleteAction;
  }
  interface GetPublishedContentsRequest {
      /** Selected content ids for fetching published fields */
      contentIds?: string[];
      /** Optional list of language tags. Will return partial contents containing only fields that are localized in languages from given list or empty contents if there are no such fields */
      languageMask?: string[];
  }
  interface GetPublishedContentsResponse {
      /** List of site localized published contents */
      localizedPublishedContents?: LocalizedPublishedContent[];
  }
  interface GetPublishedContentsByKeyRequest {
      /** Selected content keys for fetching published fields */
      contentKeys?: LocalizedContentKey[];
      /** Optional list of language tags. Will return partial contents containing only fields that are localized in languages from given list or empty contents if there are no such fields */
      languageMask?: string[];
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
   * Get published contents by id
   * @internal
   * @documentationMaturity preview
   */
  function getPublishedContents(options?: GetPublishedContentsOptions): Promise<GetPublishedContentsResponse>;
  interface GetPublishedContentsOptions {
      /** Selected content ids for fetching published fields */
      contentIds?: string[];
      /** Optional list of language tags. Will return partial contents containing only fields that are localized in languages from given list or empty contents if there are no such fields */
      languageMask?: string[];
  }
  /**
   * Get published contents by key
   * @public
   * @documentationMaturity preview
   * @requiredField options.contentKeys.schemaKey
   */
  function getPublishedContentsByKey(options?: GetPublishedContentsByKeyOptions): Promise<GetPublishedContentsResponse>;
  interface GetPublishedContentsByKeyOptions {
      /** Selected content keys for fetching published fields */
      contentKeys?: LocalizedContentKey[];
      /** Optional list of language tags. Will return partial contents containing only fields that are localized in languages from given list or empty contents if there are no such fields */
      languageMask?: string[];
  }
  
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContent = LocalizedPublishedContent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedContentKey = LocalizedContentKey;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_SchemaKey = SchemaKey;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_SchemaScope = SchemaScope;
  const multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_SchemaScope: typeof SchemaScope;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LanguagePublishedFields = LanguagePublishedFields;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContentField = LocalizedPublishedContentField;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContentFieldValueOneOf = LocalizedPublishedContentFieldValueOneOf;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MediaItem = MediaItem;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MediaItemMediaOneOf = MediaItemMediaOneOf;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_VideoResolution = VideoResolution;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_FieldSequence = FieldSequence;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedLanguageContentChanged = LocalizedPublishedLanguageContentChanged;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionLocalizedPublishedContent = LocalizationPublicActionLocalizedPublishedContent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionCreateOrUpdateAction = LocalizationPublicActionCreateOrUpdateAction;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionDeleteAction = LocalizationPublicActionDeleteAction;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicAction = LocalizationPublicAction;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionActionOneOf = LocalizationPublicActionActionOneOf;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsRequest = GetPublishedContentsRequest;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsResponse = GetPublishedContentsResponse;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsByKeyRequest = GetPublishedContentsByKeyRequest;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_DomainEvent = DomainEvent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_RestoreInfo = RestoreInfo;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_ActionEvent = ActionEvent;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MessageEnvelope = MessageEnvelope;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_IdentificationData = IdentificationData;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_WebhookIdentityType = WebhookIdentityType;
  const multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_getPublishedContents: typeof getPublishedContents;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsOptions = GetPublishedContentsOptions;
  const multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_getPublishedContentsByKey: typeof getPublishedContentsByKey;
  type multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsByKeyOptions = GetPublishedContentsByKeyOptions;
  namespace multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d {
    export {
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContent as LocalizedPublishedContent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedContentKey as LocalizedContentKey,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_SchemaKey as SchemaKey,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_SchemaScope as SchemaScope,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LanguagePublishedFields as LanguagePublishedFields,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContentField as LocalizedPublishedContentField,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedContentFieldValueOneOf as LocalizedPublishedContentFieldValueOneOf,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MediaItem as MediaItem,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MediaItemMediaOneOf as MediaItemMediaOneOf,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_VideoResolution as VideoResolution,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_FieldSequence as FieldSequence,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizedPublishedLanguageContentChanged as LocalizedPublishedLanguageContentChanged,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionLocalizedPublishedContent as LocalizationPublicActionLocalizedPublishedContent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionCreateOrUpdateAction as LocalizationPublicActionCreateOrUpdateAction,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionDeleteAction as LocalizationPublicActionDeleteAction,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicAction as LocalizationPublicAction,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_LocalizationPublicActionActionOneOf as LocalizationPublicActionActionOneOf,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsRequest as GetPublishedContentsRequest,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsResponse as GetPublishedContentsResponse,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsByKeyRequest as GetPublishedContentsByKeyRequest,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_DomainEvent as DomainEvent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_RestoreInfo as RestoreInfo,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_ActionEvent as ActionEvent,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_MessageEnvelope as MessageEnvelope,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_IdentificationData as IdentificationData,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_WebhookIdentityType as WebhookIdentityType,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_getPublishedContents as getPublishedContents,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsOptions as GetPublishedContentsOptions,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_getPublishedContentsByKey as getPublishedContentsByKey,
      multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d_GetPublishedContentsByKeyOptions as GetPublishedContentsByKeyOptions,
    };
  }
  
  export { multilingualLocalizationPublicV1LocalizedPublishedContent_universal_d as localizationPublic };
}
