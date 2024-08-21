declare module "wix-assistant-playground.v1" {
  interface Conversation {
      /** Conversation ID. */
      _id?: string;
      /**
       * Conversation revision number.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Conversation was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the Conversation was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Messages in conversation */
      messages?: Message[];
      /**
       * Last message sent date
       * @readonly
       */
      lastMessageSent?: Date;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
  }
  interface Message {
      /** Message ID. */
      _id?: string;
      /**
       * Date and time the Message was created.
       * @readonly
       */
      _createdDate?: Date;
      /** Message sender */
      sender?: Sender;
      /** Message text */
      text?: string;
      /** Text that follows after payloads */
      suffixText?: string | null;
      /** Message feedback */
      feedback?: Feedback;
      /** Message payloads as struct */
      structPayloads?: Record<string, any>[] | null;
      /** Assistant trigger id */
      triggerId?: string | null;
  }
  enum Sender {
      UNKNOWN_SENDER = "UNKNOWN_SENDER",
      USER = "USER",
      ASSISTANT = "ASSISTANT"
  }
  interface Feedback {
      /** Feedback text. */
      text?: string | null;
      /** Feedback kind. */
      kind?: FeedbackKind;
  }
  enum FeedbackKind {
      UNKNOWN = "UNKNOWN",
      THUMBS_UP = "THUMBS_UP",
      IRRELEVANT = "IRRELEVANT",
      INCORRECT = "INCORRECT",
      SHOULD_NOT_ANSWER = "SHOULD_NOT_ANSWER",
      OK_BUT = "OK_BUT",
      OTHER = "OTHER"
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
  interface CreateConversationRequest {
      /** Conversation to create. */
      conversation: Conversation;
  }
  interface CreateConversationResponse {
      /** The created Conversation. */
      conversation?: Conversation;
  }
  interface GetConversationRequest {
      /** ID of the Conversation to retrieve. */
      conversationId: string;
  }
  interface GetConversationResponse {
      /** The requested Conversation. */
      conversation?: Conversation;
  }
  interface UpdateConversationRequest {
      /** Conversation to be updated, may be partial. */
      conversation: Conversation;
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       *
       * See [Field Masks in Update Requests][1] for details on working with field masks.
       *
       * > **Deprecation Notice:**
       * > This parameter will be removed on March 31, 2022.
       * > If your app uses this parameter, update your code as soon as possible.
       *
       * [1]: https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateConversationResponse {
      /** Updated Conversation. */
      conversation?: Conversation;
  }
  interface AskQuestionInConversationRequest {
      /** Conversation id to ask question in. */
      conversationId: string;
      /** Message to add to the Conversation. */
      message: Message;
      /** Conversation revision. */
      revision?: string | null;
  }
  interface AskQuestionInConversationResponse {
      /** Updated Conversation. */
      conversation?: Conversation;
  }
  interface AddFeedbackToMessageInConversationRequest {
      /** Conversation id to add feedback to. */
      conversationId: string;
      /** Message id to add feedback to. */
      messageId: string;
      /** Feedback to add to the message. */
      feedback: Feedback;
      /** Conversation revision. */
      revision: string;
  }
  interface AddFeedbackToMessageInConversationResponse {
      /** Updated Conversation. */
      conversation?: Conversation;
  }
  interface DeleteConversationRequest {
      /** Id of the Conversation to delete. */
      conversationId: string;
  }
  interface DeleteConversationResponse {
  }
  interface QueryConversationsRequest {
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
  interface QueryConversationsResponse {
      /** List of NileAutoEntities. */
      conversations?: Conversation[];
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
      /** Updated Conversation. */
      conversation?: Conversation;
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
   * Creates a Conversation.
   * @param conversation - Conversation to create.
   * @public
   * @documentationMaturity preview
   * @requiredField conversation
   * @requiredField conversation._id
   * @requiredField conversation.messages._id
   * @adminMethod
   * @returns The created Conversation.
   */
  function createConversation(conversation: Conversation): Promise<Conversation>;
  /**
   * Retrieves a Conversation.
   * @param conversationId - ID of the Conversation to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField conversationId
   * @adminMethod
   * @returns The requested Conversation.
   */
  function getConversation(conversationId: string): Promise<Conversation>;
  /**
   * Updates a Conversation.
   *
   *
   * Each time the Conversation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the Conversation.
   * This ensures you're working with the latest Conversation
   * and prevents unintended overwrites.
   * @param _id - Conversation ID.
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField conversation
   * @requiredField conversation.messages._id
   * @requiredField conversation.revision
   * @adminMethod
   * @returns Updated Conversation.
   */
  function updateConversation(_id: string, conversation: UpdateConversation, options?: UpdateConversationOptions): Promise<Conversation>;
  interface UpdateConversation {
      /** Conversation ID. */
      _id?: string;
      /**
       * Conversation revision number.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date and time the Conversation was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the Conversation was last updated.
       * @readonly
       */
      _updatedDate?: Date;
      /** Messages in conversation */
      messages?: Message[];
      /**
       * Last message sent date
       * @readonly
       */
      lastMessageSent?: Date;
      /** Data Extensions */
      extendedFields?: ExtendedFields;
  }
  interface UpdateConversationOptions {
      /**
       * Set of fields to update.
       *
       * Fields that aren't included in `fieldMask.paths` are ignored.
       *
       * See [Field Masks in Update Requests][1] for details on working with field masks.
       *
       * > **Deprecation Notice:**
       * > This parameter will be removed on March 31, 2022.
       * > If your app uses this parameter, update your code as soon as possible.
       *
       * [1]: https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Ask question to ai assistant.
   *
   *
   * Each time the Conversation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the Conversation.
   * This ensures you're working with the latest Conversation
   * and prevents unintended overwrites.
   * @param conversationId - Conversation id to ask question in.
   * @public
   * @documentationMaturity preview
   * @requiredField conversationId
   * @requiredField options.message
   * @requiredField options.message._id
   * @adminMethod
   */
  function askQuestionInConversation(conversationId: string, options?: AskQuestionInConversationOptions): Promise<AskQuestionInConversationResponse>;
  interface AskQuestionInConversationOptions {
      /** Message to add to the Conversation. */
      message: Message;
      /** Conversation revision. */
      revision?: string | null;
  }
  /**
   * Adds feedback to a message.
   *
   *
   * Each time the Conversation is updated,
   * `revision` increments by 1.
   * The current `revision` must be passed when updating the Conversation.
   * This ensures you're working with the latest Conversation
   * and prevents unintended overwrites.
   * @param conversationId - Conversation id to add feedback to.
   * @public
   * @documentationMaturity preview
   * @requiredField conversationId
   * @requiredField options
   * @requiredField options.feedback
   * @requiredField options.messageId
   * @requiredField options.revision
   * @adminMethod
   */
  function addFeedbackToMessageInConversation(conversationId: string, options: AddFeedbackToMessageInConversationOptions): Promise<AddFeedbackToMessageInConversationResponse>;
  interface AddFeedbackToMessageInConversationOptions {
      /** Message id to add feedback to. */
      messageId: string;
      /** Feedback to add to the message. */
      feedback: Feedback;
      /** Conversation revision. */
      revision: string;
  }
  /**
   * Deletes a Conversation.
   *
   *
   * Deleting a Conversation permanently removes them from the Conversation List.
   * @param conversationId - Id of the Conversation to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField conversationId
   * @adminMethod
   */
  function deleteConversation(conversationId: string): Promise<void>;
  /**
   * Retrieves a list of Conversations, given the provided [paging, filtering, and sorting][1].
   *
   * Up to 1,000 Conversations can be returned per request.
   *
   * To learn how to query Conversations, see [API Query Language][2].
   *
   * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
   * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
   * @public
   * @documentationMaturity preview
   * @permissionId INNOVATION_LAB.WIX_ASSISTANT
   * @adminMethod
   */
  function queryConversations(): ConversationsQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ConversationsQueryResult extends QueryCursorResult {
      items: Conversation[];
      query: ConversationsQueryBuilder;
      next: () => Promise<ConversationsQueryResult>;
      prev: () => Promise<ConversationsQueryResult>;
  }
  interface ConversationsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: '_id', value: string) => ConversationsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: '_id' | '_createdDate', value: any[]) => ConversationsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | '_createdDate', value: any) => ConversationsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | '_createdDate', value: boolean) => ConversationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | '_createdDate'>) => ConversationsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | '_createdDate'>) => ConversationsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ConversationsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => ConversationsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ConversationsQueryResult>;
  }
  /**
   * Updates extended fields of a Conversations without incrementing revision
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
  
  type innovationPlaygroundV1Conversation_universal_d_Conversation = Conversation;
  type innovationPlaygroundV1Conversation_universal_d_Message = Message;
  type innovationPlaygroundV1Conversation_universal_d_Sender = Sender;
  const innovationPlaygroundV1Conversation_universal_d_Sender: typeof Sender;
  type innovationPlaygroundV1Conversation_universal_d_Feedback = Feedback;
  type innovationPlaygroundV1Conversation_universal_d_FeedbackKind = FeedbackKind;
  const innovationPlaygroundV1Conversation_universal_d_FeedbackKind: typeof FeedbackKind;
  type innovationPlaygroundV1Conversation_universal_d_ExtendedFields = ExtendedFields;
  type innovationPlaygroundV1Conversation_universal_d_CreateConversationRequest = CreateConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_CreateConversationResponse = CreateConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_GetConversationRequest = GetConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_GetConversationResponse = GetConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_UpdateConversationRequest = UpdateConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_UpdateConversationResponse = UpdateConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationRequest = AskQuestionInConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationResponse = AskQuestionInConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationRequest = AddFeedbackToMessageInConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationResponse = AddFeedbackToMessageInConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_DeleteConversationRequest = DeleteConversationRequest;
  type innovationPlaygroundV1Conversation_universal_d_DeleteConversationResponse = DeleteConversationResponse;
  type innovationPlaygroundV1Conversation_universal_d_QueryConversationsRequest = QueryConversationsRequest;
  type innovationPlaygroundV1Conversation_universal_d_CursorQuery = CursorQuery;
  type innovationPlaygroundV1Conversation_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type innovationPlaygroundV1Conversation_universal_d_Sorting = Sorting;
  type innovationPlaygroundV1Conversation_universal_d_SortOrder = SortOrder;
  const innovationPlaygroundV1Conversation_universal_d_SortOrder: typeof SortOrder;
  type innovationPlaygroundV1Conversation_universal_d_CursorPaging = CursorPaging;
  type innovationPlaygroundV1Conversation_universal_d_QueryConversationsResponse = QueryConversationsResponse;
  type innovationPlaygroundV1Conversation_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type innovationPlaygroundV1Conversation_universal_d_Cursors = Cursors;
  type innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsRequest = UpdateExtendedFieldsRequest;
  type innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsResponse = UpdateExtendedFieldsResponse;
  type innovationPlaygroundV1Conversation_universal_d_DomainEvent = DomainEvent;
  type innovationPlaygroundV1Conversation_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type innovationPlaygroundV1Conversation_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type innovationPlaygroundV1Conversation_universal_d_RestoreInfo = RestoreInfo;
  type innovationPlaygroundV1Conversation_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type innovationPlaygroundV1Conversation_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type innovationPlaygroundV1Conversation_universal_d_ActionEvent = ActionEvent;
  type innovationPlaygroundV1Conversation_universal_d_MessageEnvelope = MessageEnvelope;
  type innovationPlaygroundV1Conversation_universal_d_IdentificationData = IdentificationData;
  type innovationPlaygroundV1Conversation_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type innovationPlaygroundV1Conversation_universal_d_WebhookIdentityType = WebhookIdentityType;
  const innovationPlaygroundV1Conversation_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const innovationPlaygroundV1Conversation_universal_d_createConversation: typeof createConversation;
  const innovationPlaygroundV1Conversation_universal_d_getConversation: typeof getConversation;
  const innovationPlaygroundV1Conversation_universal_d_updateConversation: typeof updateConversation;
  type innovationPlaygroundV1Conversation_universal_d_UpdateConversation = UpdateConversation;
  type innovationPlaygroundV1Conversation_universal_d_UpdateConversationOptions = UpdateConversationOptions;
  const innovationPlaygroundV1Conversation_universal_d_askQuestionInConversation: typeof askQuestionInConversation;
  type innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationOptions = AskQuestionInConversationOptions;
  const innovationPlaygroundV1Conversation_universal_d_addFeedbackToMessageInConversation: typeof addFeedbackToMessageInConversation;
  type innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationOptions = AddFeedbackToMessageInConversationOptions;
  const innovationPlaygroundV1Conversation_universal_d_deleteConversation: typeof deleteConversation;
  const innovationPlaygroundV1Conversation_universal_d_queryConversations: typeof queryConversations;
  type innovationPlaygroundV1Conversation_universal_d_ConversationsQueryResult = ConversationsQueryResult;
  type innovationPlaygroundV1Conversation_universal_d_ConversationsQueryBuilder = ConversationsQueryBuilder;
  const innovationPlaygroundV1Conversation_universal_d_updateExtendedFields: typeof updateExtendedFields;
  type innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsOptions = UpdateExtendedFieldsOptions;
  namespace innovationPlaygroundV1Conversation_universal_d {
    export {
      innovationPlaygroundV1Conversation_universal_d_Conversation as Conversation,
      innovationPlaygroundV1Conversation_universal_d_Message as Message,
      innovationPlaygroundV1Conversation_universal_d_Sender as Sender,
      innovationPlaygroundV1Conversation_universal_d_Feedback as Feedback,
      innovationPlaygroundV1Conversation_universal_d_FeedbackKind as FeedbackKind,
      innovationPlaygroundV1Conversation_universal_d_ExtendedFields as ExtendedFields,
      innovationPlaygroundV1Conversation_universal_d_CreateConversationRequest as CreateConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_CreateConversationResponse as CreateConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_GetConversationRequest as GetConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_GetConversationResponse as GetConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_UpdateConversationRequest as UpdateConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_UpdateConversationResponse as UpdateConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationRequest as AskQuestionInConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationResponse as AskQuestionInConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationRequest as AddFeedbackToMessageInConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationResponse as AddFeedbackToMessageInConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_DeleteConversationRequest as DeleteConversationRequest,
      innovationPlaygroundV1Conversation_universal_d_DeleteConversationResponse as DeleteConversationResponse,
      innovationPlaygroundV1Conversation_universal_d_QueryConversationsRequest as QueryConversationsRequest,
      innovationPlaygroundV1Conversation_universal_d_CursorQuery as CursorQuery,
      innovationPlaygroundV1Conversation_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      innovationPlaygroundV1Conversation_universal_d_Sorting as Sorting,
      innovationPlaygroundV1Conversation_universal_d_SortOrder as SortOrder,
      innovationPlaygroundV1Conversation_universal_d_CursorPaging as CursorPaging,
      innovationPlaygroundV1Conversation_universal_d_QueryConversationsResponse as QueryConversationsResponse,
      innovationPlaygroundV1Conversation_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      innovationPlaygroundV1Conversation_universal_d_Cursors as Cursors,
      innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsRequest as UpdateExtendedFieldsRequest,
      innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsResponse as UpdateExtendedFieldsResponse,
      innovationPlaygroundV1Conversation_universal_d_DomainEvent as DomainEvent,
      innovationPlaygroundV1Conversation_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      innovationPlaygroundV1Conversation_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      innovationPlaygroundV1Conversation_universal_d_RestoreInfo as RestoreInfo,
      innovationPlaygroundV1Conversation_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      innovationPlaygroundV1Conversation_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      innovationPlaygroundV1Conversation_universal_d_ActionEvent as ActionEvent,
      innovationPlaygroundV1Conversation_universal_d_MessageEnvelope as MessageEnvelope,
      innovationPlaygroundV1Conversation_universal_d_IdentificationData as IdentificationData,
      innovationPlaygroundV1Conversation_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      innovationPlaygroundV1Conversation_universal_d_WebhookIdentityType as WebhookIdentityType,
      innovationPlaygroundV1Conversation_universal_d_createConversation as createConversation,
      innovationPlaygroundV1Conversation_universal_d_getConversation as getConversation,
      innovationPlaygroundV1Conversation_universal_d_updateConversation as updateConversation,
      innovationPlaygroundV1Conversation_universal_d_UpdateConversation as UpdateConversation,
      innovationPlaygroundV1Conversation_universal_d_UpdateConversationOptions as UpdateConversationOptions,
      innovationPlaygroundV1Conversation_universal_d_askQuestionInConversation as askQuestionInConversation,
      innovationPlaygroundV1Conversation_universal_d_AskQuestionInConversationOptions as AskQuestionInConversationOptions,
      innovationPlaygroundV1Conversation_universal_d_addFeedbackToMessageInConversation as addFeedbackToMessageInConversation,
      innovationPlaygroundV1Conversation_universal_d_AddFeedbackToMessageInConversationOptions as AddFeedbackToMessageInConversationOptions,
      innovationPlaygroundV1Conversation_universal_d_deleteConversation as deleteConversation,
      innovationPlaygroundV1Conversation_universal_d_queryConversations as queryConversations,
      innovationPlaygroundV1Conversation_universal_d_ConversationsQueryResult as ConversationsQueryResult,
      innovationPlaygroundV1Conversation_universal_d_ConversationsQueryBuilder as ConversationsQueryBuilder,
      innovationPlaygroundV1Conversation_universal_d_updateExtendedFields as updateExtendedFields,
      innovationPlaygroundV1Conversation_universal_d_UpdateExtendedFieldsOptions as UpdateExtendedFieldsOptions,
    };
  }
  
  export { innovationPlaygroundV1Conversation_universal_d as conversations };
}
