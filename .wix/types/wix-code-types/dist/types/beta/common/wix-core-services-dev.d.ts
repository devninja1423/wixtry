declare module "wix-core-services-dev" {
  interface LongMessage {
      int64Field?: string;
      uint64Field?: string;
      int64ValueField?: string | null;
      uint64ValueField?: string | null;
      sint64Field?: string;
      sfixed64Field?: string;
      fixed64Field?: string;
      durationField?: GoogleProtoDuration;
      _id?: string | null;
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
  type GoogleProtoDuration = any;
  /**
   * echo given arg1 and arg2
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function longEcho(options?: LongEchoOptions): Promise<LongMessage>;
  interface LongEchoOptions {
      int64Field?: string;
      uint64Field?: string;
      int64ValueField?: string | null;
      uint64ValueField?: string | null;
      sint64Field?: string;
      sfixed64Field?: string;
      fixed64Field?: string;
      durationField?: GoogleProtoDuration;
      _id?: string | null;
  }
  /**
   * echo given arg1 and arg2
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function publicLongEcho(options?: PublicLongEchoOptions): Promise<LongMessage>;
  interface PublicLongEchoOptions {
      int64Field?: string;
      uint64Field?: string;
      int64ValueField?: string | null;
      uint64ValueField?: string | null;
      sint64Field?: string;
      sfixed64Field?: string;
      fixed64Field?: string;
      durationField?: GoogleProtoDuration;
      _id?: string | null;
  }
  
  type metroinspectorV1Long_universal_d_LongMessage = LongMessage;
  type metroinspectorV1Long_universal_d_DomainEvent = DomainEvent;
  type metroinspectorV1Long_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type metroinspectorV1Long_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type metroinspectorV1Long_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type metroinspectorV1Long_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type metroinspectorV1Long_universal_d_ActionEvent = ActionEvent;
  type metroinspectorV1Long_universal_d_MessageEnvelope = MessageEnvelope;
  type metroinspectorV1Long_universal_d_IdentificationData = IdentificationData;
  type metroinspectorV1Long_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type metroinspectorV1Long_universal_d_WebhookIdentityType = WebhookIdentityType;
  const metroinspectorV1Long_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const metroinspectorV1Long_universal_d_longEcho: typeof longEcho;
  type metroinspectorV1Long_universal_d_LongEchoOptions = LongEchoOptions;
  const metroinspectorV1Long_universal_d_publicLongEcho: typeof publicLongEcho;
  type metroinspectorV1Long_universal_d_PublicLongEchoOptions = PublicLongEchoOptions;
  namespace metroinspectorV1Long_universal_d {
    export {
      metroinspectorV1Long_universal_d_LongMessage as LongMessage,
      metroinspectorV1Long_universal_d_DomainEvent as DomainEvent,
      metroinspectorV1Long_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      metroinspectorV1Long_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      metroinspectorV1Long_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      metroinspectorV1Long_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      metroinspectorV1Long_universal_d_ActionEvent as ActionEvent,
      metroinspectorV1Long_universal_d_MessageEnvelope as MessageEnvelope,
      metroinspectorV1Long_universal_d_IdentificationData as IdentificationData,
      metroinspectorV1Long_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      metroinspectorV1Long_universal_d_WebhookIdentityType as WebhookIdentityType,
      metroinspectorV1Long_universal_d_longEcho as longEcho,
      metroinspectorV1Long_universal_d_LongEchoOptions as LongEchoOptions,
      metroinspectorV1Long_universal_d_publicLongEcho as publicLongEcho,
      metroinspectorV1Long_universal_d_PublicLongEchoOptions as PublicLongEchoOptions,
    };
  }
  
  export { metroinspectorV1Long_universal_d as echo };
}
