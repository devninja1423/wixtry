declare module "wix-forms.v2" {
  interface FormSpamSubmissionSpiConfig {
      /** URI where the SPI Implementer is deployed */
      baseUri?: SpiBaseUri$1;
      /** Configuration of namespaces known by implementer */
      namespaceConfigs?: FormsSpamSubmissionsNamespaceConfig[];
  }
  interface SpiBaseUri$1 {
      /** URI that will be used by the host to call the implementer. The path-suffix defined on the method will be appended to it */
      baseUri?: string;
      /** override method mappings per method */
      alternativeUris?: AlternativeUri$1[];
  }
  interface AlternativeUri$1 {
      /** name of the method as it appears in the proto */
      methodName?: string;
      /** absolute uri that will be used by the host to call that method. The path-suffix mapped from the method http option will NOT be appended to this URI. For TPAs. it must be https */
      absoluteUri?: string;
  }
  interface FormsSpamSubmissionsNamespaceConfig {
      /** Namespace name. */
      namespace?: string;
      /** Permissions associated with this namespace. */
      permissions?: SpamSubmissionPermissions;
      /**
       * Disables Wix spam submissions filter.
       * Spam submissions are persisted in spam submissions storage to support marking submissions as not spam.
       */
      wixSpamFilterDisabled?: boolean;
  }
  interface SpamSubmissionPermissions {
      /** Create permission name */
      create?: string;
      /** Delete permission name */
      delete?: string;
      /** Update permission name */
      update?: string;
      /** Read permission name */
      read?: string;
      /** Report as not spam permission name */
      reportNotSpam?: string;
  }
  /**
   * this message is not directly used by any service,
   * it exists to describe the expected parameters that SHOULD be provided to invoked Velo methods as part of open-platform.
   * e.g. SPIs, event-handlers, etc..
   * NOTE: this context object MUST be provided as the last argument in each Velo method signature.
   *
   * Example:
   * ```typescript
   * export function wixStores_onOrderCanceled(event: OrderCanceledEvent, context: Context) {
   * ...
   * }
   * ```
   */
  interface Context$1 {
      /** A unique identifier for each request. Can be used for logging / troubleshooting */
      requestId?: string | null;
      /** 3 capital letters string representing a currency according to ISO-4217 */
      currency?: string | null;
      /** The identification type and identity data */
      identity?: IdentificationData$3;
      /** A string representing a language and region in the format of "xx-XX". First 2 letters represent the language code according to ISO 639-1. This is followed by a dash "-", and then a by 2 capital letters representing the region according to ISO 3166-2 */
      languages?: string[];
      /** App instance ID of SPI in context */
      instanceId?: string | null;
  }
  enum IdentityType$2 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
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
      identityType?: IdentityType$2;
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
  /** SpamSubmissionReport stores a submission, which was marked as spam. */
  interface SpamSubmission {
      /**
       * Spam submission id.
       * @readonly
       */
      _id?: string | null;
      /** Id of a form to which submission belongs. */
      formId?: string;
      /**
       * Form namespace to which submissions belong.
       * @readonly
       */
      namespace?: string;
      /**
       * Submission submitter ID.
       * @readonly
       */
      submitter?: Submitter$3;
      /** Submission values where key is a target of a form field and value is a submissions for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date of creation.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date of last update.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /** Identifies the reason why the submission was reported as spam. */
      reportReason?: ReportReason$1;
      /** Data extensions ExtendedFields. */
      extendedFields?: ExtendedFields$3;
  }
  interface Submitter$3 extends SubmitterSubmitterOneOf$3 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  /** @oneof */
  interface SubmitterSubmitterOneOf$3 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  enum ReportReason$1 {
      UNKNOWN_REASON = "UNKNOWN_REASON",
      /** An email quota is reached. There were too many submissions in a short time period with the same email. */
      EMAIL_QUOTA_REACHED = "EMAIL_QUOTA_REACHED",
      /** An IP address is is blocklisted. */
      IP_BLOCKLISTED = "IP_BLOCKLISTED",
      /** An email is is blocklisted. */
      EMAIL_BLOCKLISTED = "EMAIL_BLOCKLISTED",
      /** Reported spam by the AI spam detection model. It uses submission text as an input. */
      AI_REPORTED = "AI_REPORTED",
      /** Reported as spam by a submission manager. */
      MANUALLY_REPORTED = "MANUALLY_REPORTED"
  }
  interface ExtendedFields$3 {
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
  interface ValidateSpamRequest {
      /** Submission. */
      submission: FormSubmission$3;
      /** Form. */
      form: Form;
  }
  /** Form submission that was created or retrieved. */
  interface FormSubmission$3 {
      /**
       * Submission ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the form which submission belongs to. */
      formId?: string;
      /**
       * The app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint.
       * @readonly
       */
      namespace?: string;
      /**
       * Status of the submission.
       * - `PENDING`: When a submission has been created, but has not yet been recorded in the submission table of the forms dashboard.
       * - `PAYMENT_WAITING`: When a submission of form, requiring payment, has been created.
       * - `PAYMENT_CANCELED`: When a submission's of form, requiring payment, order has been canceled.
       * - `CONFIRMED`: When a submission is recorded in the submissions table of the forms dashboard.
       */
      status?: SubmissionStatus$3;
      /** Submission values where key is the form field and value is the data submitted for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the form submission was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
       * @readonly
       */
      revision?: string | null;
      /**
       * Renamed to submitter
       * @internal
       * @readonly
       */
      owner?: Owner;
      /**
       * ID of the creator of the form submission.
       * @readonly
       */
      submitter?: Submitter$3;
      /** Whether the submission was read by a site Extension with permissions to manage submissions. */
      seen?: boolean;
      /** Data extensions ExtendedFields. */
      extendedFields?: ExtendedFields$3;
      /** Order details. */
      orderDetails?: OrderDetails$3;
  }
  enum SubmissionStatus$3 {
      UNDEFINED = "UNDEFINED",
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED",
      PAYMENT_WAITING = "PAYMENT_WAITING",
      PAYMENT_CANCELED = "PAYMENT_CANCELED"
  }
  interface Owner extends OwnerOwnerOneOf {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Service ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  /** @oneof */
  interface OwnerOwnerOneOf {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Service ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  interface OrderDetails$3 {
      /**
       * ID of the order related to submission (applicable if form has payments added).
       * @readonly
       */
      _id?: string;
      /**
       * Order number.
       * @readonly
       */
      number?: string | null;
      /**
       * Currency.
       * @readonly
       */
      currency?: string;
      /**
       * Item subtotal.
       * @readonly
       */
      itemSubtotal?: string;
  }
  interface Form {
      /**
       * Form ID.
       * @readonly
       */
      _id?: string | null;
      /** List of form fields that represent input elements. */
      fields?: FormField[];
      /**
       * List of form fields that represent input elements.
       * @readonly
       */
      fieldsV2?: FormFieldV2[];
      /** Defines the layout for form fields in each submission step. */
      steps?: Step[];
      /** Form rules, can be applied to layout and items properties. */
      rules?: FormRule[];
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. For an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /**
       * Date of creation.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date of last update.
       * @readonly
       */
      _updatedDate?: Date;
      /** Properties of the form. */
      properties?: FormProperties;
      /**
       * Fields which were soft deleted.
       * @readonly
       */
      deletedFields?: FormField[];
      /**
       * List of form fields that represent input elements.
       * @readonly
       */
      deletedFieldsV2?: FormFieldV2[];
      /**
       * Regular forms can be freely modified.
       * Extensions are copied from templates and might have restrictions.
       * @readonly
       */
      kind?: Kind;
      /**
       * Defines triggers that will be executed after the submission, for the submissions based on this schema.
       * Forms provide a set of predefined triggers that allow it to assign specific business cases to created forms.
       */
      postSubmissionTriggers?: PostSubmissionTriggers;
      /** Data extensions ExtendedFields. */
      extendedFields?: ExtendedFields$3;
      /** Identifies the namespace that the form belongs to. */
      namespace?: string;
      /**
       * Nested forms.
       * @internal
       * @readonly
       */
      nestedForms?: NestedForm[];
      /**
       * Media folder ID.
       * @readonly
       */
      mediaFolderId?: string | null;
  }
  interface FormField {
      /** Item ID. */
      _id?: string;
      /** Definition of a target where the value of field belongs. */
      target?: string | null;
      /** Validation of field output value. */
      validation?: Validation;
      /** Mark the field as containing personal information. This will encrypt user data when storing it. */
      pii?: boolean;
      /** Whether the field is hidden. */
      hidden?: boolean;
      /** Field view properties. */
      view?: Record<string, any> | null;
      /** Details identifying field, which is extension of other entity */
      dataExtensionsDetails?: DataExtensionsDetails;
      /**
       * Nested form ID.
       * @internal
       */
      nestedFormId?: string | null;
      /**
       * Nested form overrides.
       * @internal
       */
      nestedFormOverrides?: NestedFormOverrides;
  }
  interface StringType extends StringTypeFormatOptionsOneOf {
      /** DATE format options */
      dateOptions?: DateTimeConstraints;
      /** DATE_TIME format options */
      dateTimeOptions?: DateTimeConstraints;
      /** TIME format options */
      timeOptions?: DateTimeConstraints;
      /** DATE_OPTIONAL_TIME format options */
      dateOptionalTimeOptions?: DateTimeConstraints;
      /** Minimum length. */
      minLength?: number | null;
      /** Maximum length. */
      maxLength?: number | null;
      /** Pattern for a regular expression match. */
      pattern?: string | null;
      /** Format of a string. */
      format?: Format;
      /** Custom error messages when validation fails. */
      errorMessages?: StringErrorMessages;
      /** List of allowed values. */
      enum?: string[] | null;
  }
  /** @oneof */
  interface StringTypeFormatOptionsOneOf {
      /** DATE format options */
      dateOptions?: DateTimeConstraints;
      /** DATE_TIME format options */
      dateTimeOptions?: DateTimeConstraints;
      /** TIME format options */
      timeOptions?: DateTimeConstraints;
      /** DATE_OPTIONAL_TIME format options */
      dateOptionalTimeOptions?: DateTimeConstraints;
  }
  enum Format {
      UNDEFINED = "UNDEFINED",
      DATE = "DATE",
      TIME = "TIME",
      DATE_TIME = "DATE_TIME",
      EMAIL = "EMAIL",
      URL = "URL",
      UUID = "UUID",
      PHONE = "PHONE",
      URI = "URI",
      HOSTNAME = "HOSTNAME",
      COLOR_HEX = "COLOR_HEX",
      CURRENCY = "CURRENCY",
      LANGUAGE = "LANGUAGE",
      DATE_OPTIONAL_TIME = "DATE_OPTIONAL_TIME"
  }
  interface StringErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface DateTimeConstraints {
      /**
       * Support static constrains defined as ISO date/time format, as well as
       * dynamic calculations can be performed using special keywords such as "$now" to represent the current date and time.
       * The dynamic calculation supports expressions like "$now+2d" (2 days in the future), "$now-1h" (1 hour in the past), etc.
       * The regex pattern for dynamic calculations is: \$now([+-]\d{1,2})([yMdmh])
       */
      minimum?: string | null;
      /**
       * Support static constrains defined as ISO date/time format, as well as
       * dynamic calculations can be performed using special keywords such as "$now" to represent the current date and time.
       * The dynamic calculation supports expressions like "$now+2d" (2 days in the future), "$now-1h" (1 hour in the past), etc.
       * The regex pattern for dynamic calculations is: \$now([+-]\d{1,2})([yMdmh])
       */
      maximum?: string | null;
  }
  interface NumberType {
      /** Inclusive maximum value. */
      maximum?: number | null;
      /** Inclusive minimum value. */
      minimum?: number | null;
      /** Multiple of value. */
      multipleOf?: number | null;
      /** Custom error message when validation fails. */
      errorMessages?: NumberErrorMessages;
      /** List of allowed values. */
      enum?: number[] | null;
  }
  interface NumberErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface IntegerType {
      /** Minimum value. */
      maximum?: number | null;
      /** Maximum value. */
      minimum?: number | null;
      /** Multiple of value. */
      multipleOf?: number | null;
      /** Custom error message when validation fails. */
      errorMessages?: NumberErrorMessages;
      /** List of allowed values. */
      enum?: number[] | null;
  }
  interface BooleanType {
      /** Custom error message when validation fails. */
      errorMessages?: BooleanErrorMessages;
      /** List of allowed values. */
      enum?: boolean[];
  }
  interface BooleanErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface ArrayType {
      /** Maximum amount of array elements. */
      maxItems?: number | null;
      /** Minimum amount of array elements. */
      minItems?: number | null;
      /** Type of items allowed in array. */
      items?: ArrayItems;
      /** Custom error message when validation fails. */
      errorMessages?: ArrayErrorMessages;
  }
  interface ObjectType {
      /** Description of object properties. */
      properties?: Record<string, PropertiesType>;
      /** Custom error message when validation fails. */
      errorMessages?: ObjectErrorMessages;
  }
  interface PropertiesType extends PropertiesTypePropertiesTypeOneOf {
      /** String type validation for property. */
      string?: StringType;
      /** Number type validation for property. */
      number?: NumberType;
      /** Boolean type validation for property. */
      boolean?: BooleanType;
      /** Integer type validation for property. */
      integer?: IntegerType;
      /** Array type validation for property. */
      array?: ArrayType;
      /** Whether the property is required. */
      required?: boolean;
  }
  /** @oneof */
  interface PropertiesTypePropertiesTypeOneOf {
      /** String type validation for property. */
      string?: StringType;
      /** Number type validation for property. */
      number?: NumberType;
      /** Boolean type validation for property. */
      boolean?: BooleanType;
      /** Integer type validation for property. */
      integer?: IntegerType;
      /** Array type validation for property. */
      array?: ArrayType;
  }
  interface ObjectErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface ArrayItems extends ArrayItemsItemsOneOf {
      /** String type validation for items. */
      string?: StringType;
      /** Number type validation for items. */
      number?: NumberType;
      /** Boolean type validation for items. */
      boolean?: BooleanType;
      /** Integer type validation for items. */
      integer?: IntegerType;
      /** Object type validation for items */
      object?: ObjectType;
  }
  /** @oneof */
  interface ArrayItemsItemsOneOf {
      /** String type validation for items. */
      string?: StringType;
      /** Number type validation for items. */
      number?: NumberType;
      /** Boolean type validation for items. */
      boolean?: BooleanType;
      /** Integer type validation for items. */
      integer?: IntegerType;
      /** Object type validation for items */
      object?: ObjectType;
  }
  interface ArrayErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface PredefinedValidation extends PredefinedValidationFormatOptionsOneOf {
      /** Payment input field. */
      paymentOptions?: PaymentType;
      /** Format of predefined validation. */
      format?: ValidationFormat;
  }
  /** @oneof */
  interface PredefinedValidationFormatOptionsOneOf {
      /** Payment input field. */
      paymentOptions?: PaymentType;
  }
  enum ValidationFormat {
      UNDEFINED = "UNDEFINED",
      /** File upload validation. */
      WIX_FILE = "WIX_FILE",
      /** Payment validation. */
      PAYMENT = "PAYMENT"
  }
  interface PaymentType {
      /** Field mapped to products. */
      products?: Product[];
      /** Minimum amount of different products. */
      minItems?: number | null;
      /** Maximum amount of different products. */
      maxItems?: number | null;
  }
  enum ProductType {
      UNKNOWN = "UNKNOWN",
      /** Shippable (physical). */
      SHIPPABLE = "SHIPPABLE",
      /** Digital. */
      DIGITAL = "DIGITAL"
  }
  enum PriceType {
      UNKNOWN = "UNKNOWN",
      /** Fixed price. */
      FIXED_PRICE = "FIXED_PRICE",
      /** Dynamic price from price range. */
      DYNAMIC_PRICE = "DYNAMIC_PRICE"
  }
  interface QuantityLimit {
      /** Minimum quantity. */
      minimum?: number | null;
      /** Maximum quantity. */
      maximum?: number | null;
  }
  interface FixedPriceOptions {
      /** Fixed price monetary amount. Decimal string with a period as a decimal separator (e.g., 3.99). */
      price?: string;
  }
  interface DynamicPriceOptions {
      /** Minimal price monetary amount. */
      minPrice?: string;
      /** Maximal price monetary amount. */
      maxPrice?: string | null;
  }
  interface Product extends ProductPriceOptionsOneOf {
      /** Fixed price options. */
      fixedPriceOptions?: FixedPriceOptions;
      /** Dynamic price options. */
      dynamicPriceOptions?: DynamicPriceOptions;
      /**
       * Product ID.
       * @readonly
       */
      _id?: string;
      /** Product type. */
      productType?: ProductType;
      /** Price type. */
      priceType?: PriceType;
      /** Quantity limit. */
      quantityLimit?: QuantityLimit;
  }
  /** @oneof */
  interface ProductPriceOptionsOneOf {
      /** Fixed price options. */
      fixedPriceOptions?: FixedPriceOptions;
      /** Dynamic price options. */
      dynamicPriceOptions?: DynamicPriceOptions;
  }
  interface NestedFormFieldOverrides {
      /** Whether the field is required. Leave blank for no override. */
      required?: boolean | null;
      /** Whether the field is hidden. Leave blank for no override. */
      hidden?: boolean | null;
  }
  interface Validation extends ValidationValidationOneOf {
      /** Validation of string type. */
      string?: StringType;
      /** Validation of number type. */
      number?: NumberType;
      /** Validation of integer type. */
      integer?: IntegerType;
      /** Validation of boolean type. */
      boolean?: BooleanType;
      /** Validation of array type. */
      array?: ArrayType;
      /** Validation of object type. */
      object?: ObjectType;
      /** Predefined validation of specific format */
      predefined?: PredefinedValidation;
      /** Whether the field is required. */
      required?: boolean;
  }
  /** @oneof */
  interface ValidationValidationOneOf {
      /** Validation of string type. */
      string?: StringType;
      /** Validation of number type. */
      number?: NumberType;
      /** Validation of integer type. */
      integer?: IntegerType;
      /** Validation of boolean type. */
      boolean?: BooleanType;
      /** Validation of array type. */
      array?: ArrayType;
      /** Validation of object type. */
      object?: ObjectType;
      /** Predefined validation of specific format */
      predefined?: PredefinedValidation;
  }
  interface DataExtensionsDetails {
      /** FQDNS which can be extended with this field */
      fqdns?: string[];
  }
  interface NestedFormOverrides {
      /** Field overrides by field ID */
      fieldOverrides?: Record<string, NestedFormFieldOverrides>;
  }
  interface FormFieldV2 extends FormFieldV2FieldTypeOptionsOneOf {
      /** Field accept input of data */
      inputOptions?: InputField;
      /** Field for displaying information */
      displayOptions?: DisplayField;
      /** Submit button of the form */
      submitOptions?: SubmitButton;
      /** Field id. */
      _id?: string;
      /**
       * Whether the field is hidden.
       * Default: false
       */
      hidden?: boolean;
      /** Custom identification of field, can be used to specify exceptional behaviour of client for specific field */
      identifier?: string | null;
      /**
       * Type of the field
       * @readonly
       */
      fieldType?: FieldType;
  }
  /** @oneof */
  interface FormFieldV2FieldTypeOptionsOneOf {
      /** Field accept input of data */
      inputOptions?: InputField;
      /** Field for displaying information */
      displayOptions?: DisplayField;
      /** Submit button of the form */
      submitOptions?: SubmitButton;
  }
  interface InputFieldStringType {
      /** Minimum length. */
      minLength?: number | null;
      /** Maximum length. */
      maxLength?: number | null;
      /** Pattern for a regular expression match. */
      pattern?: string | null;
      /** Format of a string. */
      format?: FormatEnumFormat;
      /** Custom error messages when validation fails. */
      errorMessages?: InputFieldStringErrorMessages;
      /** List of allowed values. */
      enum?: string[] | null;
  }
  enum FormatEnumFormat {
      UNDEFINED = "UNDEFINED",
      DATE = "DATE",
      TIME = "TIME",
      DATE_TIME = "DATE_TIME",
      EMAIL = "EMAIL",
      URL = "URL",
      UUID = "UUID",
      PHONE = "PHONE",
      URI = "URI",
      HOSTNAME = "HOSTNAME",
      COLOR_HEX = "COLOR_HEX",
      CURRENCY = "CURRENCY",
      LANGUAGE = "LANGUAGE",
      DATE_OPTIONAL_TIME = "DATE_OPTIONAL_TIME"
  }
  interface InputFieldStringErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  enum StringComponentType {
      UNKNOWN = "UNKNOWN",
      TEXT_INPUT = "TEXT_INPUT",
      RADIO_GROUP = "RADIO_GROUP",
      DROPDOWN = "DROPDOWN",
      DATE_TIME = "DATE_TIME"
  }
  interface TextInput {
      /** Label of the field */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /** Placeholder for the value input */
      placeholder?: string | null;
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
  }
  interface RichContent {
      /** Node objects representing a rich content document. */
      nodes?: Node[];
      /** Object metadata. */
      metadata?: Metadata;
      /** Global styling for header, paragraph, block quote, and code block nodes in the object. */
      documentStyle?: DocumentStyle;
  }
  interface Node extends NodeDataOneOf {
      /** Data for a button node. */
      buttonData?: ButtonData;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData;
      /** Data for a divider node. */
      dividerData?: DividerData;
      /** Data for a file node. */
      fileData?: FileData;
      /** Data for a gallery node. */
      galleryData?: GalleryData;
      /** Data for a GIF node. */
      gifData?: GIFData;
      /** Data for a heading node. */
      headingData?: HeadingData;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData;
      /** Data for an image node. */
      imageData?: ImageData;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData;
      /** Data for a map node. */
      mapData?: MapData;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData;
      /** Data for a poll node. */
      pollData?: PollData;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData;
      /** Data for a video node. */
      videoData?: VideoData;
      /** Data for an oEmbed node. */
      embedData?: EmbedData;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData;
      /** Data for a table node. */
      tableData?: TableData;
      /** Data for a table cell node. */
      tableCellData?: TableCellData;
      /** Data for a custon external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData;
      /** Node type. Use `APP_EMBED` for nodes that embed content from other Wix apps. Use `EMBED` to embed content in [oEmbed](https://oembed.com/) format. */
      type?: NodeType;
      /** Node ID. */
      _id?: string;
      /** A list of child nodes. */
      nodes?: Node[];
      /** Padding and background color styling for the node. */
      style?: NodeStyle;
  }
  /** @oneof */
  interface NodeDataOneOf {
      /** Data for a button node. */
      buttonData?: ButtonData;
      /** Data for a code block node. */
      codeBlockData?: CodeBlockData;
      /** Data for a divider node. */
      dividerData?: DividerData;
      /** Data for a file node. */
      fileData?: FileData;
      /** Data for a gallery node. */
      galleryData?: GalleryData;
      /** Data for a GIF node. */
      gifData?: GIFData;
      /** Data for a heading node. */
      headingData?: HeadingData;
      /** Data for an embedded HTML node. */
      htmlData?: HTMLData;
      /** Data for an image node. */
      imageData?: ImageData;
      /** Data for a link preview node. */
      linkPreviewData?: LinkPreviewData;
      /** Data for a map node. */
      mapData?: MapData;
      /** Data for a paragraph node. */
      paragraphData?: ParagraphData;
      /** Data for a poll node. */
      pollData?: PollData;
      /** Data for a text node. Used to apply decorations to text. */
      textData?: TextData;
      /** Data for an app embed node. */
      appEmbedData?: AppEmbedData;
      /** Data for a video node. */
      videoData?: VideoData;
      /** Data for an oEmbed node. */
      embedData?: EmbedData;
      /** Data for a collapsible list node. */
      collapsibleListData?: CollapsibleListData;
      /** Data for a table node. */
      tableData?: TableData;
      /** Data for a table cell node. */
      tableCellData?: TableCellData;
      /** Data for a custon external node. */
      externalData?: Record<string, any> | null;
      /** Data for an audio node. */
      audioData?: AudioData;
      /** Data for an ordered list node. */
      orderedListData?: OrderedListData;
      /** Data for a bulleted list node. */
      bulletedListData?: BulletedListData;
      /** Data for a block quote node. */
      blockquoteData?: BlockquoteData;
  }
  enum NodeType {
      PARAGRAPH = "PARAGRAPH",
      TEXT = "TEXT",
      HEADING = "HEADING",
      BULLETED_LIST = "BULLETED_LIST",
      ORDERED_LIST = "ORDERED_LIST",
      LIST_ITEM = "LIST_ITEM",
      BLOCKQUOTE = "BLOCKQUOTE",
      CODE_BLOCK = "CODE_BLOCK",
      VIDEO = "VIDEO",
      DIVIDER = "DIVIDER",
      FILE = "FILE",
      GALLERY = "GALLERY",
      GIF = "GIF",
      HTML = "HTML",
      IMAGE = "IMAGE",
      LINK_PREVIEW = "LINK_PREVIEW",
      MAP = "MAP",
      POLL = "POLL",
      APP_EMBED = "APP_EMBED",
      BUTTON = "BUTTON",
      COLLAPSIBLE_LIST = "COLLAPSIBLE_LIST",
      TABLE = "TABLE",
      EMBED = "EMBED",
      COLLAPSIBLE_ITEM = "COLLAPSIBLE_ITEM",
      COLLAPSIBLE_ITEM_TITLE = "COLLAPSIBLE_ITEM_TITLE",
      COLLAPSIBLE_ITEM_BODY = "COLLAPSIBLE_ITEM_BODY",
      TABLE_CELL = "TABLE_CELL",
      TABLE_ROW = "TABLE_ROW",
      EXTERNAL = "EXTERNAL",
      AUDIO = "AUDIO"
  }
  interface NodeStyle {
      /** The top padding value in pixels. */
      paddingTop?: string | null;
      /** The bottom padding value in pixels. */
      paddingBottom?: string | null;
      /** The background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface ButtonData {
      /** Styling for the button's container. */
      containerData?: PluginContainerData;
      /** The button type. */
      type?: Type;
      /** Styling for the button. */
      styles?: Styles;
      /** The text to display on the button. */
      text?: string | null;
      /** Button link details. */
      link?: Link;
  }
  interface Border {
      /** Border width in pixels. */
      width?: number | null;
      /** Border radius in pixels. */
      radius?: number | null;
  }
  interface Colors {
      /** The text color as a hexadecimal value. */
      text?: string | null;
      /** The border color as a hexadecimal value. */
      border?: string | null;
      /** The background color as a hexadecimal value. */
      background?: string | null;
  }
  interface PluginContainerData {
      /** The width of the node when it's displayed. */
      width?: PluginContainerDataWidth;
      /** The node's alignment within its container. */
      alignment?: PluginContainerDataAlignment;
      /** Spoiler cover settings for the node. */
      spoiler?: Spoiler;
      /** The height of the node when it's displayed. */
      height?: Height;
      /** Sets whether text should wrap around this node when it's displayed. If `textWrap` is `false`, the node takes up the width of its container. */
      textWrap?: boolean | null;
  }
  enum WidthType {
      /** Width matches the content width */
      CONTENT = "CONTENT",
      /** Small Width */
      SMALL = "SMALL",
      /** Width will match the original asset width */
      ORIGINAL = "ORIGINAL",
      /** coast-to-coast display */
      FULL_WIDTH = "FULL_WIDTH"
  }
  interface PluginContainerDataWidth extends PluginContainerDataWidthDataOneOf {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: Small width.
       * `ORIGINAL`: The width of the container matches the original asset width.
       * `FULL_WIDTH`: Full width.
       */
      size?: WidthType;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  /** @oneof */
  interface PluginContainerDataWidthDataOneOf {
      /**
       * One of the following predefined width options:
       * `CONTENT`: The width of the container matches the content width.
       * `SMALL`: Small width.
       * `ORIGINAL`: The width of the container matches the original asset width.
       * `FULL_WIDTH`: Full width.
       */
      size?: WidthType;
      /** A custom width value in pixels. */
      custom?: string | null;
  }
  enum PluginContainerDataAlignment {
      /** Center Alignment */
      CENTER = "CENTER",
      /** Left Alignment */
      LEFT = "LEFT",
      /** Right Alignment */
      RIGHT = "RIGHT"
  }
  interface Spoiler {
      /** Sets whether the spoiler cover is enabled for this node. */
      enabled?: boolean | null;
      /** The description displayed on top of the spoiler cover. */
      description?: string | null;
      /** The text for the button used to remove the spoiler cover. */
      buttonText?: string | null;
  }
  interface Height {
      /** A custom height value in pixels. */
      custom?: string | null;
  }
  enum Type {
      /** Regular link button */
      LINK = "LINK",
      /** Triggers custom action that is defined in plugin configuration by the consumer */
      ACTION = "ACTION"
  }
  interface Styles {
      /** Border attributes. */
      border?: Border;
      /** Color attributes. */
      colors?: Colors;
  }
  interface Link extends LinkDataOneOf {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
      /**
       * he HTML `target` attribute value for the link. This property defines where the linked document opens as follows:
       * `SELF` - Default. Opens the linked document in the same frame as the link.
       * `BLANK` - Opens the linked document in a new browser tab or window.
       * `PARENT` - Opens the linked document in the link's parent frame.
       * `TOP` - Opens the linked document in the full body of the link's browser tab or window.
       */
      target?: LinkTarget;
      /** The HTML `rel` attribute value for the link. This object specifies the relationship between the current document and the linked document. */
      rel?: Rel;
      /** A serialized object used for a custom or external link panel. */
      customData?: string | null;
  }
  /** @oneof */
  interface LinkDataOneOf {
      /** The absolute URL for the linked document. */
      url?: string;
      /** The target node's ID. Used for linking to another node in this object. */
      anchor?: string;
  }
  enum LinkTarget {
      /** Opens the linked document in the same frame as it was clicked (this is default) */
      SELF = "SELF",
      /** Opens the linked document in a new window or tab */
      BLANK = "BLANK",
      /** Opens the linked document in the parent frame */
      PARENT = "PARENT",
      /** Opens the linked document in the full body of the window */
      TOP = "TOP"
  }
  interface Rel {
      /** Indicates to search engine crawlers not to follow the link. */
      nofollow?: boolean | null;
      /** Indicates to search engine crawlers that the link is a paid placement such as sponsored content or an advertisement. */
      sponsored?: boolean | null;
      /** Indicates that this link is user-generated content and isn't necessarily trusted or endorsed by the page’s author. For example, a link in a fourm post. */
      ugc?: boolean | null;
      /** Indicates that this link protect referral information from being passed to the target website. */
      noreferrer?: boolean | null;
  }
  interface CodeBlockData {
      /** Styling for the code block's text. */
      textStyle?: TextStyle;
  }
  interface TextStyle {
      /** Text alignment. Defaults to `AUTO`. */
      textAlignment?: TextAlignment;
      /** A CSS `line-height` value for the text as a unitless ratio. */
      lineHeight?: string | null;
  }
  enum TextAlignment {
      /** browser default, eqivalent to `initial` */
      AUTO = "AUTO",
      /** Left align */
      LEFT = "LEFT",
      /** Right align */
      RIGHT = "RIGHT",
      /** Center align */
      CENTER = "CENTER",
      /** Text is spaced to line up its left and right edges to the left and right edges of the line box, except for the last line. */
      JUSTIFY = "JUSTIFY"
  }
  interface DividerData {
      /** Styling for the divider's container. */
      containerData?: PluginContainerData;
      /** Divider line style. */
      lineStyle?: LineStyle;
      /** Divider width. */
      width?: Width;
      /** Divider alignment. */
      alignment?: Alignment;
  }
  enum LineStyle {
      /** Single Line */
      SINGLE = "SINGLE",
      /** Double Line */
      DOUBLE = "DOUBLE",
      /** Dashed Line */
      DASHED = "DASHED",
      /** Dotted Line */
      DOTTED = "DOTTED"
  }
  enum Width {
      /** Large line */
      LARGE = "LARGE",
      /** Medium line */
      MEDIUM = "MEDIUM",
      /** Small line */
      SMALL = "SMALL"
  }
  enum Alignment {
      /** Center alignment */
      CENTER = "CENTER",
      /** Left alignment */
      LEFT = "LEFT",
      /** Right alignment */
      RIGHT = "RIGHT"
  }
  interface FileData {
      /** Styling for the file's container. */
      containerData?: PluginContainerData;
      /** The source for the file's data. */
      src?: FileSource;
      /** File name. */
      name?: string | null;
      /** File type. */
      type?: string | null;
      /** File size in KB. */
      size?: number | null;
      /** Settings for PDF files. */
      pdfSettings?: PDFSettings;
      /** File MIME type. */
      mimeType?: string | null;
      /** File path. */
      path?: string | null;
  }
  enum ViewMode {
      /** No PDF view */
      NONE = "NONE",
      /** Full PDF view */
      FULL = "FULL",
      /** Mini PDF view */
      MINI = "MINI"
  }
  interface FileSource extends FileSourceDataOneOf {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /** Custom ID. Use `id` instead. */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
      /** Indicates whether the file's source is private. */
      private?: boolean | null;
  }
  /** @oneof */
  interface FileSourceDataOneOf {
      /** The absolute URL for the file's source. */
      url?: string | null;
      /** Custom ID. Use `id` instead. */
      custom?: string | null;
      /** An ID that's resolved to a URL by a resolver function. */
      _id?: string | null;
  }
  interface PDFSettings {
      /**
       * PDF view mode. One of the following:
       * `NONE` : The PDF isn't displayed.
       * `FULL` : A full page view of the PDF is displayed.
       * `MINI` : A mini view of the PDF is displayed.
       */
      viewMode?: ViewMode;
      /** Sets whether the PDF download button is disabled. */
      disableDownload?: boolean | null;
      /** Sets whether the PDF print button is disabled. */
      disablePrint?: boolean | null;
  }
  interface GalleryData {
      /** Styling for the gallery's container. */
      containerData?: PluginContainerData;
      /** The items in the gallery. */
      items?: Item[];
      /** Options for defining the gallery's appearance. */
      options?: GalleryOptions;
      /** Sets whether the gallery's expand button is disabled. */
      disableExpand?: boolean | null;
      /** Sets whether the gallery's download button is disabled. */
      disableDownload?: boolean | null;
  }
  interface Media {
      /** The source for the media's data. */
      src?: FileSource;
      /** Media width in pixels. */
      width?: number | null;
      /** Media height in pixels. */
      height?: number | null;
      /** Media duration in seconds. Only relevant for audio and video files. */
      duration?: number | null;
  }
  interface Image {
      /** Image file details. */
      media?: Media;
      /** Link details for images that are links. */
      link?: Link;
  }
  interface Video {
      /** Video file details. */
      media?: Media;
      /** Video thumbnail file details. */
      thumbnail?: Media;
  }
  interface Item extends ItemDataOneOf {
      /** An image item. */
      image?: Image;
      /** A video item. */
      video?: Video;
      /** Item title. */
      title?: string | null;
      /** Item's alternative text. */
      altText?: string | null;
  }
  /** @oneof */
  interface ItemDataOneOf {
      /** An image item. */
      image?: Image;
      /** A video item. */
      video?: Video;
  }
  interface GalleryOptions {
      /** Gallery layout. */
      layout?: Layout;
      /** Styling for gallery items. */
      item?: ItemStyle;
      /** Styling for gallery thumbnail images. */
      thumbnails?: Thumbnails;
  }
  enum LayoutType {
      /** Collage type */
      COLLAGE = "COLLAGE",
      /** Masonry type */
      MASONRY = "MASONRY",
      /** Grid type */
      GRID = "GRID",
      /** Thumbnail type */
      THUMBNAIL = "THUMBNAIL",
      /** Slider type */
      SLIDER = "SLIDER",
      /** Slideshow type */
      SLIDESHOW = "SLIDESHOW",
      /** Panorama type */
      PANORAMA = "PANORAMA",
      /** Column type */
      COLUMN = "COLUMN",
      /** Magic type */
      MAGIC = "MAGIC",
      /** Fullsize images type */
      FULLSIZE = "FULLSIZE"
  }
  enum Orientation {
      /** Rows Orientation */
      ROWS = "ROWS",
      /** Columns Orientation */
      COLUMNS = "COLUMNS"
  }
  enum Crop {
      /** Crop to fill */
      FILL = "FILL",
      /** Crop to fit */
      FIT = "FIT"
  }
  enum ThumbnailsAlignment {
      /** Top alignment */
      TOP = "TOP",
      /** Right alignment */
      RIGHT = "RIGHT",
      /** Bottom alignment */
      BOTTOM = "BOTTOM",
      /** Left alignment */
      LEFT = "LEFT",
      /** No thumbnail */
      NONE = "NONE"
  }
  interface Layout {
      /** Gallery layout type. */
      type?: LayoutType;
      /** Sets whether horizontal scroll is enabled. */
      horizontalScroll?: boolean | null;
      /** Gallery orientation. */
      orientation?: Orientation;
      /** The number of columns to display on full size screens. */
      numberOfColumns?: number | null;
      /** The number of columns to display on mobile screens. */
      mobileNumberOfColumns?: number | null;
  }
  interface ItemStyle {
      /** Desirable dimension for each item in pixels (behvaior changes according to gallery type) */
      targetSize?: number | null;
      /** Item ratio */
      ratio?: number | null;
      /** Sets how item images are cropped. */
      crop?: Crop;
      /** The spacing between items in pixels. */
      spacing?: number | null;
  }
  interface Thumbnails {
      /** Thumbnail alignment. */
      placement?: ThumbnailsAlignment;
      /** Spacing between thumbnails in pixels. */
      spacing?: number | null;
  }
  interface GIFData {
      /** Styling for the GIF's container. */
      containerData?: PluginContainerData;
      /** The source of the full size GIF. */
      original?: GIF;
      /** The source of the downsized GIF. */
      downsized?: GIF;
      /** Height in pixels. */
      height?: number;
      /** Width in pixels. */
      width?: number;
  }
  interface GIF {
      /** GIF format URL. */
      gif?: string | null;
      /** MP4 format URL. */
      mp4?: string | null;
      /** Thumbnail URL. */
      still?: string | null;
  }
  interface HeadingData {
      /** Heading level from 1-6. */
      level?: number;
      /** Styling for the heading text. */
      textStyle?: TextStyle;
      /** Indentation level from 1-6. */
      indentation?: number | null;
  }
  interface HTMLData extends HTMLDataDataOneOf {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /** Whether this is an AdSense element. Use `source` instead. */
      isAdsense?: boolean | null;
      /** Styling for the HTML node's container. */
      containerData?: PluginContainerData;
      /** The type of HTML code. */
      source?: Source;
  }
  /** @oneof */
  interface HTMLDataDataOneOf {
      /** The URL for the HTML code for the node. */
      url?: string;
      /** The HTML code for the node. */
      html?: string;
      /** Whether this is an AdSense element. Use `source` instead. */
      isAdsense?: boolean | null;
  }
  enum Source {
      HTML = "HTML",
      ADSENSE = "ADSENSE"
  }
  interface ImageData {
      /** Styling for the image's container. */
      containerData?: PluginContainerData;
      /** Image file details. */
      image?: Media;
      /** Link details for images that are links. */
      link?: Link;
      /** Sets whether the image expands to full screen when clicked. */
      disableExpand?: boolean | null;
      /** Image's alternative text. */
      altText?: string | null;
      /** Image caption. */
      caption?: string | null;
      /** Sets whether the image's download button is disabled. */
      disableDownload?: boolean | null;
  }
  interface LinkPreviewData {
      /** Styling for the link preview's container. */
      containerData?: PluginContainerData;
      /** Link details. */
      link?: Link;
      /** Preview title. */
      title?: string | null;
      /** Preview thumbnail URL. */
      thumbnailUrl?: string | null;
      /** Preview description. */
      description?: string | null;
      /** The preview content as HTML. */
      html?: string | null;
  }
  interface MapData {
      /** Styling for the map's container. */
      containerData?: PluginContainerData;
      /** Map settings. */
      mapSettings?: MapSettings;
  }
  interface MapSettings {
      /** The address to display on the map. */
      address?: string | null;
      /** Sets whether the map is draggable. */
      draggable?: boolean | null;
      /** Sets whether the location marker is visible. */
      marker?: boolean | null;
      /** Sets whether street view control is enabled. */
      streetViewControl?: boolean | null;
      /** Sets whether zoom control is enabled. */
      zoomControl?: boolean | null;
      /** Location latitude. */
      lat?: number | null;
      /** Location longitude. */
      lng?: number | null;
      /** Location name. */
      locationName?: string | null;
      /** Sets whether view mode control is enabled. */
      viewModeControl?: boolean | null;
      /** Initial zoom value. */
      initialZoom?: number | null;
      /** Map type. `HYBRID` is a combination of the `ROADMAP` and `SATELLITE` map types. */
      mapType?: MapType;
  }
  enum MapType {
      /** Roadmap map type */
      ROADMAP = "ROADMAP",
      /** Satellite map type */
      SATELITE = "SATELITE",
      /** Hybrid map type */
      HYBRID = "HYBRID",
      /** Terrain map type */
      TERRAIN = "TERRAIN"
  }
  interface ParagraphData {
      /** Styling for the paragraph text. */
      textStyle?: TextStyle;
      /** Indentation level from 1-6. */
      indentation?: number | null;
  }
  interface PollData {
      /** Styling for the poll's container. */
      containerData?: PluginContainerData;
      /** Poll data. */
      poll?: Poll;
      /** Layout settings for the poll and voting options. */
      layout?: PollDataLayout;
      /** Styling for the poll and voting options. */
      design?: Design;
  }
  enum ViewRole {
      /** Only Poll creator can view the results */
      CREATOR = "CREATOR",
      /** Anyone who voted can see the results */
      VOTERS = "VOTERS",
      /** Anyone can see the results, even if one didn't vote */
      EVERYONE = "EVERYONE"
  }
  enum VoteRole {
      /** Logged in member */
      SITE_MEMBERS = "SITE_MEMBERS",
      /** Anyone */
      ALL = "ALL"
  }
  interface Permissions {
      /** Sets who can view the poll results. */
      view?: ViewRole;
      /** Sets who can vote. */
      vote?: VoteRole;
      /** Sets whether one voter can vote multiple times. */
      allowMultipleVotes?: boolean | null;
  }
  interface PollOption {
      /** Option ID. */
      _id?: string | null;
      /** Option title. */
      title?: string | null;
      /** The image displayed with the option. */
      image?: Media;
  }
  interface Settings {
      /** Permissions settings for voting. */
      permissions?: Permissions;
      /** Sets whether voters are displayed in the vote results. */
      showVoters?: boolean | null;
      /** Sets whether the vote count is displayed. */
      showVotesCount?: boolean | null;
  }
  enum PollLayoutType {
      /** List */
      LIST = "LIST",
      /** Grid */
      GRID = "GRID"
  }
  enum PollLayoutDirection {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface PollLayout {
      /** The layout for displaying the voting options. */
      type?: PollLayoutType;
      /** The direction of the text displayed in the voting options. Text can be displayed either right-to-left or left-to-right. */
      direction?: PollLayoutDirection;
      /** Sets whether to display the main poll image. */
      enableImage?: boolean | null;
  }
  interface OptionLayout {
      /** Sets whether to display option images. */
      enableImage?: boolean | null;
  }
  enum BackgroundType {
      /** Color background type */
      COLOR = "COLOR",
      /** Image background type */
      IMAGE = "IMAGE",
      /** Gradiant background type */
      GRADIENT = "GRADIENT"
  }
  interface Gradient {
      /** The gradient angle in degrees. */
      angle?: number | null;
      /** The start color as a hexademical value. */
      startColor?: string | null;
      /** The end color as a hexademical value. */
      lastColor?: string | null;
  }
  interface Background extends BackgroundBackgroundOneOf {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: Media;
      /** Details for a gradient background. */
      gradient?: Gradient;
      /** Background type. For each option, include the relevant details. */
      type?: BackgroundType;
  }
  /** @oneof */
  interface BackgroundBackgroundOneOf {
      /** The background color as a hexademical value. */
      color?: string | null;
      /** An image to use for the background. */
      image?: Media;
      /** Details for a gradient background. */
      gradient?: Gradient;
  }
  interface PollDesign {
      /** Background styling. */
      background?: Background;
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface OptionDesign {
      /** Border radius in pixels. */
      borderRadius?: number | null;
  }
  interface Poll {
      /** Poll ID. */
      _id?: string | null;
      /** Poll title. */
      title?: string | null;
      /** Poll creator ID. */
      creatorId?: string | null;
      /** Main poll image. */
      image?: Media;
      /** Voting options. */
      options?: PollOption[];
      /** The poll's permissions and display settings. */
      settings?: Settings;
  }
  interface PollDataLayout {
      /** Poll layout settings. */
      poll?: PollLayout;
      /** Voting otpions layout settings. */
      options?: OptionLayout;
  }
  interface Design {
      /** Styling for the poll. */
      poll?: PollDesign;
      /** Styling for voting options. */
      options?: OptionDesign;
  }
  interface TextData {
      /** The text to apply decorations to. */
      text?: string;
      /** The decorations to apply. */
      decorations?: Decoration[];
  }
  /** Adds appearence changes to text */
  interface Decoration extends DecorationDataOneOf {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData;
      /** Data for a color decoration. */
      colorData?: ColorData;
      /** Data for an external link decoration. */
      linkData?: LinkData;
      /** Data for a mention decoration. */
      mentionData?: MentionData;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. */
      italicData?: boolean | null;
      /** Data for an underline decoration. */
      underlineData?: boolean | null;
      /** The type of decoration to apply. */
      type?: DecorationType;
  }
  /** @oneof */
  interface DecorationDataOneOf {
      /** Data for an anchor link decoration. */
      anchorData?: AnchorData;
      /** Data for a color decoration. */
      colorData?: ColorData;
      /** Data for an external link decoration. */
      linkData?: LinkData;
      /** Data for a mention decoration. */
      mentionData?: MentionData;
      /** Data for a font size decoration. */
      fontSizeData?: FontSizeData;
      /** Font weight for a bold decoration. */
      fontWeightValue?: number | null;
      /** Data for an italic decoration. */
      italicData?: boolean | null;
      /** Data for an underline decoration. */
      underlineData?: boolean | null;
  }
  enum DecorationType {
      BOLD = "BOLD",
      ITALIC = "ITALIC",
      UNDERLINE = "UNDERLINE",
      SPOILER = "SPOILER",
      ANCHOR = "ANCHOR",
      MENTION = "MENTION",
      LINK = "LINK",
      COLOR = "COLOR",
      FONT_SIZE = "FONT_SIZE",
      EXTERNAL = "EXTERNAL"
  }
  interface AnchorData {
      /** The target node's ID. */
      anchor?: string;
  }
  interface ColorData {
      /** The text's background color as a hexadecimal value. */
      background?: string | null;
      /** The text's foreground color as a hexadecimal value. */
      foreground?: string | null;
  }
  interface LinkData {
      /** Link details. */
      link?: Link;
  }
  interface MentionData {
      /** The mentioned user's name. */
      name?: string;
      /** The version of the user's name that appears after the `@` character in the mention. */
      slug?: string;
      /** Mentioned user's ID. */
      _id?: string | null;
  }
  interface FontSizeData {
      /** The units used for the font size. */
      unit?: FontType;
      /** Font size value. */
      value?: number | null;
  }
  enum FontType {
      PX = "PX",
      EM = "EM"
  }
  interface AppEmbedData extends AppEmbedDataAppDataOneOf {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData;
      /** Data for embedded Wix Events content. */
      eventData?: EventData;
      /** The type of Wix App content being embedded. */
      type?: AppType;
      /** The ID of the embedded content. */
      itemId?: string | null;
      /** The name of the embedded content. */
      name?: string | null;
      /** Deprecated: Use `image` instead. */
      imageSrc?: string | null;
      /** The URL for the embedded content. */
      url?: string | null;
      /** An image for the embedded content. */
      image?: Media;
  }
  /** @oneof */
  interface AppEmbedDataAppDataOneOf {
      /** Data for embedded Wix Bookings content. */
      bookingData?: BookingData;
      /** Data for embedded Wix Events content. */
      eventData?: EventData;
  }
  enum AppType {
      PRODUCT = "PRODUCT",
      EVENT = "EVENT",
      BOOKING = "BOOKING"
  }
  interface BookingData {
      /** Booking duration in minutes. */
      durations?: string | null;
  }
  interface EventData {
      /** Event schedule. */
      scheduling?: string | null;
      /** Event location. */
      location?: string | null;
  }
  interface VideoData {
      /** Styling for the video's container. */
      containerData?: PluginContainerData;
      /** Video details. */
      video?: Media;
      /** Video thumbnail details. */
      thumbnail?: Media;
      /** Sets whether the video's download button is disabled. */
      disableDownload?: boolean | null;
      /** Video title. */
      title?: string | null;
      /** Video options. */
      options?: PlaybackOptions;
  }
  interface PlaybackOptions {
      /** Sets whether the media will automatically start playing. */
      autoPlay?: boolean | null;
      /** Sets whether media's will be looped. */
      playInLoop?: boolean | null;
      /** Sets whether media's controls will be shown. */
      showControls?: boolean | null;
  }
  interface EmbedData {
      /** Styling for the oEmbed node's container. */
      containerData?: PluginContainerData;
      /** An [oEmbed](https://www.oembed.com) object. */
      oembed?: Oembed;
      /** Origin asset source. */
      src?: string | null;
  }
  interface Oembed {
      /** The resource type. */
      type?: string | null;
      /** The width of the resource specified in the `url` property in pixels. */
      width?: number | null;
      /** The height of the resource specified in the `url` property in pixels. */
      height?: number | null;
      /** Resource title. */
      title?: string | null;
      /** The source URL for the resource. */
      url?: string | null;
      /** HTML for embedding a video player. The HTML should have no padding or margins. */
      html?: string | null;
      /** The name of the author or owner of the resource. */
      authorName?: string | null;
      /** The URL for the author or owner of the resource. */
      authorUrl?: string | null;
      /** The name of the resource provider. */
      providerName?: string | null;
      /** The URL for the resource provider. */
      providerUrl?: string | null;
      /** The URL for a thumbnail image for the resource. If this property is defined, `thumbnailWidth` and `thumbnailHeight` must also be defined. */
      thumbnailUrl?: string | null;
      /** The width of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailHeight` must also be defined. */
      thumbnailWidth?: string | null;
      /** The height of the resource's thumbnail image. If this property is defined, `thumbnailUrl` and `thumbnailWidth`must also be defined. */
      thumbnailHeight?: string | null;
      /** The URL for an embedded viedo. */
      videoUrl?: string | null;
      /** The oEmbed version number.  This value must be `1.0`. */
      version?: string | null;
  }
  interface CollapsibleListData {
      /** Styling for the collapsible list's container. */
      containerData?: PluginContainerData;
      /** If `true`, only one item can be expanded at a time. */
      expandOnlyOne?: boolean | null;
      /** Sets which items are expanded when the page loads. */
      initialExpandedItems?: InitialExpandedItems;
      /** The direction of the text in the list. Either left-to-right or right-to-left. */
      direction?: Direction;
      /** If `true`, The collapsible item will appear in search results as an FAQ. */
      isQapageData?: boolean | null;
  }
  enum InitialExpandedItems {
      /** First item will be expended initally */
      FIRST = "FIRST",
      /** All items will expended initally */
      ALL = "ALL",
      /** All items collapsed initally */
      NONE = "NONE"
  }
  enum Direction {
      /** Left-to-right */
      LTR = "LTR",
      /** Right-to-left */
      RTL = "RTL"
  }
  interface TableData {
      /** Styling for the table's container. */
      containerData?: PluginContainerData;
      /** The table's dimensions. */
      dimensions?: Dimensions;
      /** Deprecated: Use `rowHeader` and `columnHeader` instead. */
      header?: boolean | null;
      /** Sets whether the table's first row is a header. */
      rowHeader?: boolean | null;
      /** Sets whether the table's first column is a header. */
      columnHeader?: boolean | null;
  }
  interface Dimensions {
      /** An array representing relative width of each column in relation to the other columns. */
      colsWidthRatio?: number[];
      /** An array representing the height of each row in pixels. */
      rowsHeight?: number[];
      /** An array representing the minimum width of each column in pixels. */
      colsMinWidth?: number[];
  }
  interface TableCellData {
      /** Styling for the cell's background color and text alignment. */
      cellStyle?: CellStyle;
      /** The cell's border colors. */
      borderColors?: BorderColors;
  }
  enum VerticalAlignment {
      /** Top alignment */
      TOP = "TOP",
      /** Middle alignment */
      MIDDLE = "MIDDLE",
      /** Bottom alignment */
      BOTTOM = "BOTTOM"
  }
  interface CellStyle {
      /** Vertical alignment for the cell's text. */
      verticalAlignment?: VerticalAlignment;
      /** Cell background color as a hexadecimal value. */
      backgroundColor?: string | null;
  }
  interface BorderColors {
      /** Left border color as a hexadecimal value. */
      left?: string | null;
      /** Right border color as a hexadecimal value. */
      right?: string | null;
      /** Top border color as a hexadecimal value. */
      top?: string | null;
      /** Bottom border color as a hexadecimal value. */
      bottom?: string | null;
  }
  /**
   * `NullValue` is a singleton enumeration to represent the null value for the
   * `Value` type union.
   *
   * The JSON representation for `NullValue` is JSON `null`.
   */
  enum NullValue {
      /** Null value. */
      NULL_VALUE = "NULL_VALUE"
  }
  /**
   * `ListValue` is a wrapper around a repeated field of values.
   *
   * The JSON representation for `ListValue` is JSON array.
   */
  interface ListValue {
      /** Repeated field of dynamically typed values. */
      values?: any[];
  }
  interface AudioData {
      /** Styling for the audio node's container. */
      containerData?: PluginContainerData;
      /** Audio file details. */
      audio?: Media;
      /** Sets whether the audio node's download button is disabled. */
      disableDownload?: boolean | null;
      /** Cover image. */
      coverImage?: Media;
      /** Track name. */
      name?: string | null;
      /** Author name. */
      authorName?: string | null;
      /** An HTML version of the audio node. */
      html?: string | null;
  }
  interface OrderedListData {
      /** Indentation level. */
      indentation?: number;
  }
  interface BulletedListData {
      /** Indentation level. */
      indentation?: number;
  }
  interface BlockquoteData {
      /** Indentation level. */
      indentation?: number;
  }
  interface Metadata {
      /** Schema version. */
      version?: number;
      /**
       * When the object was created.
       * @readonly
       */
      createdTimestamp?: Date;
      /** When the object was most recently updated. */
      updatedTimestamp?: Date;
      /** Object ID. */
      _id?: string | null;
  }
  interface DocumentStyle {
      /** Styling for H1 nodes. */
      headerOne?: TextNodeStyle;
      /** Styling for H2 nodes. */
      headerTwo?: TextNodeStyle;
      /** Styling for H3 nodes. */
      headerThree?: TextNodeStyle;
      /** Styling for H4 nodes. */
      headerFour?: TextNodeStyle;
      /** Styling for H5 nodes. */
      headerFive?: TextNodeStyle;
      /** Styling for H6 nodes. */
      headerSix?: TextNodeStyle;
      /** Styling for paragraph nodes. */
      paragraph?: TextNodeStyle;
      /** Styling for block quote nodes. */
      blockquote?: TextNodeStyle;
      /** Styling for code block nodes. */
      codeBlock?: TextNodeStyle;
  }
  interface TextNodeStyle {
      /** The decorations to apply to the node. */
      decorations?: Decoration[];
      /** Padding and background color for the node. */
      nodeStyle?: NodeStyle;
      /** Line height for text in the node. */
      lineHeight?: string | null;
  }
  interface RadioGroup {
      /** Label of the field */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /**
       * Flag identifying to show option allowing input custom value
       * List of options to select from
       */
      options?: RadioGroupOption[];
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
      /** Option which can be specified by UoU, enabled when this object is specified. */
      customOption?: RadioGroupCustomOption;
  }
  interface RadioGroupOption {
      /** Selectable option label */
      label?: string | null;
      /** Selectable option value, which is saved to DB. */
      value?: string | null;
      /** Flag identifying that option should be selected by default */
      default?: boolean;
      /** Option id. Used as binding for translations */
      _id?: string;
  }
  interface RadioGroupCustomOption {
      /** Label of custom option input */
      label?: string | null;
      /** Placeholder of custom option input */
      placeholder?: string | null;
  }
  interface Dropdown {
      /** Label of the field */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /** List of options to select from */
      options?: DropdownOption[];
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
      /** Option which can be specified by UoU, enabled when this object is specified. */
      customOption?: DropdownCustomOption;
      /** Placeholder of dropdown input */
      placeholder?: string | null;
  }
  interface DropdownOption {
      /** Selectable option label */
      label?: string | null;
      /** Selectable option value, which is saved to DB. */
      value?: string | null;
      /** Flag identifying that option should be selected by default */
      default?: boolean;
      /** Option id. Used as binding for translations */
      _id?: string;
  }
  interface DropdownCustomOption {
      /** Label of custom option input */
      label?: string | null;
      /** Placeholder of custom option input */
      placeholder?: string | null;
  }
  interface DateTimeInput extends DateTimeInputDateTimeInputTypeOptionsOneOf {
      /** Options specific to the combined Date and Time input type. */
      dateTimeOptions?: DateTimeOptions;
      /** Options specific to the Date-only input type. */
      dateOptions?: DateOptions;
      /** Options specific to the Time-only input type. */
      timeOptions?: TimeOptions;
      /** Label of the field. Displayed text for the date/time input. */
      label?: string | null;
      /** Description of the field. Additional information about the date/time input. */
      description?: RichContent;
      /**
       * Flag identifying whether to show or hide the label.
       * Default: true
       */
      showLabel?: boolean | null;
      /**
       * Flag identifying whether to show or hide the placeholder.
       * Default: true
       */
      showPlaceholder?: boolean | null;
      /**
       * Date and/or time input component type
       * @readonly
       */
      dateTimeInputType?: DateTimeInputType;
  }
  /** @oneof */
  interface DateTimeInputDateTimeInputTypeOptionsOneOf {
      /** Options specific to the combined Date and Time input type. */
      dateTimeOptions?: DateTimeOptions;
      /** Options specific to the Date-only input type. */
      dateOptions?: DateOptions;
      /** Options specific to the Time-only input type. */
      timeOptions?: TimeOptions;
  }
  enum DateFormatPart {
      YEAR = "YEAR",
      MONTH = "MONTH",
      DAY = "DAY"
  }
  enum DateTimeInputType {
      UNKNOWN = "UNKNOWN",
      /** Show date and time input */
      DATE_TIME = "DATE_TIME",
      /** Show only date input */
      DATE = "DATE",
      /** Show only time input */
      TIME = "TIME"
  }
  interface DateTimeOptions {
      /** Order of date picking component parts (e.g., YEAR, MONTH, DAY). */
      dateFormatParts?: DateFormatPart[];
      /**
       * Flag indicating whether to use the 24-hour time format.
       * Default: false.
       */
      use24HourFormat?: boolean;
  }
  interface DateOptions {
      /** Order of date picking component parts (e.g., YEAR, MONTH, DAY). */
      dateFormatParts?: DateFormatPart[];
  }
  interface TimeOptions {
      /**
       * Flag indicating whether to use the 24-hour time format.
       * Default: false.
       */
      use24HourFormat?: boolean;
  }
  interface InputFieldNumberType {
      /** Inclusive maximum value. */
      maximum?: number | null;
      /** Inclusive minimum value. */
      minimum?: number | null;
      /** Multiple of value. */
      multipleOf?: number | null;
      /** Custom error message when validation fails. */
      errorMessages?: InputFieldNumberErrorMessages;
      /** List of allowed values. */
      enum?: number[] | null;
  }
  interface InputFieldNumberErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  enum NumberComponentType {
      UNKNOWN = "UNKNOWN",
      NUMBER_INPUT = "NUMBER_INPUT"
  }
  interface NumberInput {
      /** Label of the field */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /** Placeholder for the value input */
      placeholder?: string | null;
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
  }
  interface InputFieldBooleanType {
      /** Custom error message when validation fails. */
      errorMessages?: InputFieldBooleanErrorMessages;
      /** List of allowed values. */
      enum?: boolean[];
  }
  interface InputFieldBooleanErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  enum BooleanComponentType {
      UNKNOWN = "UNKNOWN",
      CHECKBOX = "CHECKBOX"
  }
  interface Checkbox {
      /** Label of the field */
      label?: RichContent;
  }
  interface InputFieldArrayType {
      /** Maximum amount of array elements. */
      maxItems?: number | null;
      /** Minimum amount of array elements. */
      minItems?: number | null;
      /** Type of items allowed in array. */
      items?: ArrayTypeArrayItems;
      /** Custom error message when validation fails. */
      errorMessages?: InputFieldArrayErrorMessages;
  }
  enum ItemType {
      UNKNOWN = "UNKNOWN",
      STRING = "STRING",
      NUMBER = "NUMBER",
      BOOLEAN = "BOOLEAN",
      INTEGER = "INTEGER",
      OBJECT = "OBJECT"
  }
  interface InputFieldIntegerType {
      /** Maximum value. */
      maximum?: number | null;
      /** Minimum value. */
      minimum?: number | null;
      /** Multiple of value. */
      multipleOf?: number | null;
      /** Custom error message when validation fails. */
      errorMessages?: InputFieldNumberErrorMessages;
      /** List of allowed values. */
      enum?: number[] | null;
  }
  interface InputFieldObjectType {
      /** Description of object properties. */
      properties?: Record<string, ObjectTypePropertiesType>;
      /** Custom error message when validation fails. */
      errorMessages?: InputFieldObjectErrorMessages;
  }
  enum PropertiesTypePropertiesType {
      UNKNOWN = "UNKNOWN",
      STRING = "STRING",
      NUMBER = "NUMBER",
      BOOLEAN = "BOOLEAN",
      INTEGER = "INTEGER",
      ARRAY = "ARRAY"
  }
  interface ObjectTypePropertiesType extends ObjectTypePropertiesTypePropertiesTypeOptionsOneOf {
      /** String type validation for property. */
      stringOptions?: InputFieldStringType;
      /** Number type validation for property. */
      numberOptions?: InputFieldNumberType;
      /** Boolean type validation for property. */
      booleanOptions?: InputFieldBooleanType;
      /** Integer type validation for property. */
      integerOptions?: InputFieldIntegerType;
      /** Array type validation for property. */
      arrayOptions?: InputFieldArrayType;
      /**
       * Type of object properties
       * @readonly
       */
      propertiesType?: PropertiesTypePropertiesType;
      /** Whether the property is required. */
      required?: boolean;
  }
  /** @oneof */
  interface ObjectTypePropertiesTypePropertiesTypeOptionsOneOf {
      /** String type validation for property. */
      stringOptions?: InputFieldStringType;
      /** Number type validation for property. */
      numberOptions?: InputFieldNumberType;
      /** Boolean type validation for property. */
      booleanOptions?: InputFieldBooleanType;
      /** Integer type validation for property. */
      integerOptions?: InputFieldIntegerType;
      /** Array type validation for property. */
      arrayOptions?: InputFieldArrayType;
  }
  interface InputFieldObjectErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  interface ArrayTypeArrayItems extends ArrayTypeArrayItemsItemTypeOptionsOneOf {
      /** String type validation for items. */
      stringOptions?: InputFieldStringType;
      /** Number type validation for items. */
      numberOptions?: InputFieldNumberType;
      /** Boolean type validation for items. */
      booleanOptions?: InputFieldBooleanType;
      /** Integer type validation for items. */
      integerOptions?: InputFieldIntegerType;
      /** Object type validation for items */
      objectOptions?: InputFieldObjectType;
      /**
       * Type of array items
       * @readonly
       */
      itemType?: ItemType;
  }
  /** @oneof */
  interface ArrayTypeArrayItemsItemTypeOptionsOneOf {
      /** String type validation for items. */
      stringOptions?: InputFieldStringType;
      /** Number type validation for items. */
      numberOptions?: InputFieldNumberType;
      /** Boolean type validation for items. */
      booleanOptions?: InputFieldBooleanType;
      /** Integer type validation for items. */
      integerOptions?: InputFieldIntegerType;
      /** Object type validation for items */
      objectOptions?: InputFieldObjectType;
  }
  interface InputFieldArrayErrorMessages {
      /** Default error message on invalid validation. */
      default?: string | null;
  }
  enum ComponentType {
      UNKNOWN = "UNKNOWN",
      CHECKBOX_GROUP = "CHECKBOX_GROUP"
  }
  interface CheckboxGroup {
      /** Label of the field */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /** List of options to select from */
      options?: Option[];
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
      /** Option which can be specified by UoU, enabled when this object is specified. */
      customOption?: CustomOption;
  }
  interface MediaItem extends MediaItemMediaOneOf {
      /** WixMedia image. */
      image?: string;
  }
  /** @oneof */
  interface MediaItemMediaOneOf {
      /** WixMedia image. */
      image?: string;
  }
  interface Option {
      /** Selectable option label */
      label?: string | null;
      /** Selectable option value, which is saved to DB. */
      value?: any;
      /** Flag identifying that option should be selected by default */
      default?: boolean;
      /** Option id. Used as binding for translations */
      _id?: string;
      /** Media item. Media, associated with option, like image. */
      media?: MediaItem;
  }
  interface CustomOption {
      /** Label of custom option input */
      label?: string | null;
      /** Placeholder of custom option input */
      placeholder?: string | null;
  }
  enum WixFileComponentType {
      UNKNOWN = "UNKNOWN",
      FILE_UPLOAD = "FILE_UPLOAD"
  }
  interface FileUpload {
      /** Selectable option label */
      label?: string | null;
      /** Description of the field */
      description?: RichContent;
      /**
       * Flag identifying to hide or not label
       * Default: true
       */
      showLabel?: boolean | null;
      /** Text on upload button */
      buttonText?: string | null;
      /** Amount of files allowed to upload */
      fileLimit?: number;
      /** Supported file formats for upload */
      uploadFileFormats?: UploadFileFormat[];
      /** Custom text which appears when file is uploaded, if missing file name will be shown */
      explanationText?: string | null;
  }
  enum UploadFileFormat {
      UNDEFINED = "UNDEFINED",
      /** Video files */
      VIDEO = "VIDEO",
      /** Image files */
      IMAGE = "IMAGE",
      /** Audio files */
      AUDIO = "AUDIO",
      /** Document files */
      DOCUMENT = "DOCUMENT"
  }
  enum PaymentComponentType {
      UNKNOWN = "UNKNOWN",
      CHECKBOX_GROUP = "CHECKBOX_GROUP"
  }
  interface ProductCheckboxGroup {
      /** Label of the field. */
      label?: string | null;
      /** Description of the field. */
      description?: RichContent;
      /** List of options to select from. */
      options?: ProductCheckboxGroupOption[];
  }
  interface ProductCheckboxGroupOption {
      /** Selectable option label. */
      label?: string | null;
      /** Selectable option value, which is saved to DB. Corresponds to product id, found in field's products list. */
      value?: any;
      /** Option id. Used as binding for translations. */
      _id?: string;
      /** Media item. Media, associated with option, like image. */
      media?: MediaItem;
  }
  enum InputType {
      UNKNOWN = "UNKNOWN",
      STRING = "STRING",
      NUMBER = "NUMBER",
      BOOLEAN = "BOOLEAN",
      ARRAY = "ARRAY",
      OBJECT = "OBJECT",
      WIX_FILE = "WIX_FILE",
      PAYMENT = "PAYMENT"
  }
  interface _String extends _StringComponentTypeOptionsOneOf {
      /** Text input field */
      textInputOptions?: TextInput;
      /** Selection field as radio group */
      radioGroupOptions?: RadioGroup;
      /** Selection field as drop down */
      dropdownOptions?: Dropdown;
      /** Field for selecting date and/or time */
      dateTimeOptions?: DateTimeInput;
      /** Validation of field output value. */
      validation?: InputFieldStringType;
      /**
       * Component type of the string input field
       * @readonly
       */
      componentType?: StringComponentType;
  }
  /** @oneof */
  interface _StringComponentTypeOptionsOneOf {
      /** Text input field */
      textInputOptions?: TextInput;
      /** Selection field as radio group */
      radioGroupOptions?: RadioGroup;
      /** Selection field as drop down */
      dropdownOptions?: Dropdown;
      /** Field for selecting date and/or time */
      dateTimeOptions?: DateTimeInput;
  }
  interface _Number extends _NumberComponentTypeOptionsOneOf {
      /** Number value input field */
      numberInputOptions?: NumberInput;
      /** Validation of field output value. */
      validation?: InputFieldNumberType;
      /**
       * Component type of the number input field
       * @readonly
       */
      componentType?: NumberComponentType;
  }
  /** @oneof */
  interface _NumberComponentTypeOptionsOneOf {
      /** Number value input field */
      numberInputOptions?: NumberInput;
  }
  interface _Boolean extends _BooleanComponentTypeOptionsOneOf {
      /** Checkbox input field */
      checkboxOptions?: Checkbox;
      /** Validation of field output value. */
      validation?: InputFieldBooleanType;
      /**
       * Component type of the boolean input field
       * @readonly
       */
      componentType?: BooleanComponentType;
  }
  /** @oneof */
  interface _BooleanComponentTypeOptionsOneOf {
      /** Checkbox input field */
      checkboxOptions?: Checkbox;
  }
  interface _Array extends _ArrayComponentTypeOptionsOneOf {
      /** Checkbox group input field */
      checkboxGroupOptions?: CheckboxGroup;
      /** Validation of array type. */
      validation?: InputFieldArrayType;
      /**
       * Component type of the array input field
       * @readonly
       */
      componentType?: ComponentType;
  }
  /** @oneof */
  interface _ArrayComponentTypeOptionsOneOf {
      /** Checkbox group input field */
      checkboxGroupOptions?: CheckboxGroup;
  }
  interface _Object extends _ObjectValidationOneOf {
      /** Validation of object type. */
      object?: InputFieldObjectType;
      /**
       * Nested form ID.
       * @internal
       */
      nestedFormId?: string | null;
  }
  /** @oneof */
  interface _ObjectValidationOneOf {
      /** Validation of object type. */
      object?: InputFieldObjectType;
      /**
       * Nested form ID.
       * @internal
       */
      nestedFormId?: string | null;
  }
  interface WixFile extends WixFileComponentTypeOptionsOneOf {
      /** File upload input field */
      fileUploadOptions?: FileUpload;
      /**
       * Component type of the array input field
       * @readonly
       */
      componentType?: WixFileComponentType;
  }
  /** @oneof */
  interface WixFileComponentTypeOptionsOneOf {
      /** File upload input field */
      fileUploadOptions?: FileUpload;
  }
  interface Payment extends PaymentComponentTypeOptionsOneOf {
      /** Checkbox group input field. */
      checkboxGroupOptions?: ProductCheckboxGroup;
      /**
       * Component type of the payment input field.
       * @readonly
       */
      componentType?: PaymentComponentType;
      /** Validation of payment type. */
      validation?: PaymentType;
  }
  /** @oneof */
  interface PaymentComponentTypeOptionsOneOf {
      /** Checkbox group input field. */
      checkboxGroupOptions?: ProductCheckboxGroup;
  }
  interface Header {
      /** Content of the header */
      content?: RichContent;
  }
  interface RichText {
      /** Content of the rich text field */
      content?: RichContent;
  }
  enum Target {
      UNDEFINED = "UNDEFINED",
      /** Opened in same browser tab */
      SELF = "SELF",
      /** Url open in new tab */
      BLANK = "BLANK"
  }
  interface ThankYouMessage {
      /** Message show after form submission */
      text?: RichContent;
      /**
       * Duration after how much second it should disappear. If 0, will stay forever.
       * Default: false
       */
      duration?: number | null;
  }
  interface Redirect {
      /** Url to which UoU should be redirected after successful submit of form */
      url?: string | null;
      /** How should url be opened */
      target?: Target;
  }
  enum FieldType {
      UNKNOWN = "UNKNOWN",
      INPUT = "INPUT",
      DISPLAY = "DISPLAY",
      SUBMIT = "SUBMIT"
  }
  interface InputField extends InputFieldInputTypeOptionsOneOf {
      /** Input return string as value */
      stringOptions?: _String;
      /** Input return number as value */
      numberOptions?: _Number;
      /** Input return boolean as value */
      booleanOptions?: _Boolean;
      /** Input return array as value */
      arrayOptions?: _Array;
      /** Input return object as value */
      objectOptions?: _Object;
      /** Input return "Wix file" as value */
      wixFileOptions?: WixFile;
      /** Input returns selected products as value. */
      paymentOptions?: Payment;
      /** Definition of a target where the value of field belongs. */
      target?: string | null;
      /**
       * Mark the field as containing personal information. This will encrypt user data when storing it.
       * Default: false
       */
      pii?: boolean;
      /**
       * Whether the field is required.
       * Default: false
       */
      required?: boolean;
      /**
       * Type of the input field
       * @readonly
       */
      inputType?: InputType;
  }
  /** @oneof */
  interface InputFieldInputTypeOptionsOneOf {
      /** Input return string as value */
      stringOptions?: _String;
      /** Input return number as value */
      numberOptions?: _Number;
      /** Input return boolean as value */
      booleanOptions?: _Boolean;
      /** Input return array as value */
      arrayOptions?: _Array;
      /** Input return object as value */
      objectOptions?: _Object;
      /** Input return "Wix file" as value */
      wixFileOptions?: WixFile;
      /** Input returns selected products as value. */
      paymentOptions?: Payment;
  }
  interface DisplayField extends DisplayFieldComponentTypeOneOf {
      /** Header field */
      header?: Header;
      /** Rich text field */
      richText?: RichText;
  }
  /** @oneof */
  interface DisplayFieldComponentTypeOneOf {
      /** Header field */
      header?: Header;
      /** Rich text field */
      richText?: RichText;
  }
  interface SubmitButton extends SubmitButtonSubmitActionOneOf {
      /** Submit action effect is to show message */
      thankYouMessage?: ThankYouMessage;
      /** Submit action effect is to redirect to */
      redirect?: Redirect;
      /** When button is not on last page it behaves as switch between pages page, text of label to go to next page. */
      nextText?: string | null;
      /** When button is not on last page it behaves as switch between pages page, text of label to go to previous page. */
      previousText?: string | null;
      /** Text on the button when button is submitting a form */
      submitText?: string | null;
  }
  /** @oneof */
  interface SubmitButtonSubmitActionOneOf {
      /** Submit action effect is to show message */
      thankYouMessage?: ThankYouMessage;
      /** Submit action effect is to redirect to */
      redirect?: Redirect;
  }
  interface Step {
      /** Step ID. */
      _id?: string;
      /** Name of the step. */
      name?: string | null;
      /** Is step hidden */
      hidden?: boolean;
      /** Form step properties */
      layout?: FormLayout;
  }
  interface FormLayout {
      /** Layout for large break point. */
      large?: BreakPoint;
      /** Layout for medium break point. */
      medium?: BreakPoint;
      /** Layout for small break point. */
      small?: BreakPoint;
  }
  interface BreakPoint {
      /** Description of layouts for items. */
      items?: ItemLayout[];
      /** Amount of columns of layout grid. */
      columns?: number | null;
      /** Row height of layout grid. */
      rowHeight?: number | null;
      /** Description of elements margins. */
      margin?: Margin;
      /** Description of elements paddings. */
      padding?: Margin;
      /** Sections of the layout, which allow manage fields */
      sections?: Section[];
  }
  interface ItemLayout {
      /** Form field reference id. */
      fieldId?: string;
      /** Horizontal coordinate in the grid. */
      row?: number | null;
      /** Vertical coordinate in the grid. */
      column?: number | null;
      /** Height. */
      width?: number | null;
      /** Width. */
      height?: number | null;
  }
  interface Margin {
      /** Horizontal value. */
      horizontal?: number | null;
      /** Vertical value. */
      vertical?: number | null;
  }
  interface Section {
      /** Id of the section */
      _id?: string;
      /** Horizontal coordinate in the grid. */
      row?: number | null;
      /**
       * A list of field identifiers that are permitted to be placed within a section.
       * The section will only accept fields with IDs specified in this list.
       * If the section encounters the $new key within the list,
       * it allows the inclusion of fields not explicitly listed,
       * enabling dynamic addition of new fields.
       */
      allowedFieldIds?: string[];
  }
  interface FormRule {
      /** Id of the rule */
      _id?: string;
      /** Rule on which item properties or layouts will be changed. */
      condition?: Record<string, any> | null;
      /**
       * Form items with defined properties that will be
       * changed when given condition is resolved to true.
       */
      overrides?: FormOverride[];
      /** Name of the rule */
      name?: string | null;
  }
  enum OverrideEntityType {
      UNKNOWN = "UNKNOWN",
      FIELD = "FIELD",
      FORM = "FORM",
      NESTED_FORM_FIELD = "NESTED_FORM_FIELD"
  }
  interface FormOverride {
      /** Override entity type. */
      entityType?: OverrideEntityType;
      /** Overridden entity id. Either fieldId, or "{fieldIdWithNestedForm}/{nestedFormFieldId}" */
      entityId?: string | null;
      /** Form entity properties path with new value, that will be changed on condition. */
      valueChanges?: Record<string, any>;
  }
  interface FormProperties {
      /** Form name. */
      name?: string | null;
      /** Identifies if the form is disabled. */
      disabled?: boolean;
  }
  enum Kind {
      REGULAR = "REGULAR",
      EXTENSION = "EXTENSION"
  }
  interface PostSubmissionTriggers {
      /** Upserts a contact from the submission data. */
      upsertContact?: UpsertContact;
  }
  interface UpsertContact {
      /** Fields mapping (target field mapped to corresponding contact field). */
      fieldsMapping?: Record<string, FormFieldContactInfo>;
      /**
       * List of contact label keys.
       * [Contact labels](https://support.wix.com/en/article/adding-labels-to-contacts-in-your-contact-list)
       * help categorize contacts.
       */
      labels?: string[];
  }
  interface FormFieldContactInfo extends FormFieldContactInfoAdditionalInfoOneOf {
      /** Email info. */
      emailInfo?: EmailInfo;
      /** Phone info. */
      phoneInfo?: PhoneInfo;
      /** Address info. */
      addressInfo?: AddressInfo;
      /** Custom field info. */
      customFieldInfo?: CustomFieldInfo;
      /** Field mapped to contacts. */
      contactField?: ContactField;
  }
  /** @oneof */
  interface FormFieldContactInfoAdditionalInfoOneOf {
      /** Email info. */
      emailInfo?: EmailInfo;
      /** Phone info. */
      phoneInfo?: PhoneInfo;
      /** Address info. */
      addressInfo?: AddressInfo;
      /** Custom field info. */
      customFieldInfo?: CustomFieldInfo;
  }
  enum EmailInfoTag {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN"
  }
  enum PhoneInfoTag {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN"
  }
  enum Tag {
      UNTAGGED = "UNTAGGED",
      HOME = "HOME"
  }
  enum ContactField {
      UNDEFINED = "UNDEFINED",
      FIRST_NAME = "FIRST_NAME",
      LAST_NAME = "LAST_NAME",
      COMPANY = "COMPANY",
      POSITION = "POSITION",
      EMAIL = "EMAIL",
      PHONE = "PHONE",
      ADDRESS = "ADDRESS",
      BIRTHDATE = "BIRTHDATE",
      CUSTOM_FIELD = "CUSTOM_FIELD",
      SUBSCRIPTION = "SUBSCRIPTION",
      VAT_ID = "VAT_ID"
  }
  interface EmailInfo {
      /** Email tag. */
      tag?: EmailInfoTag;
  }
  interface PhoneInfo {
      /** Phone tag. */
      tag?: PhoneInfoTag;
  }
  interface AddressInfo {
      /** Address tag. */
      tag?: Tag;
  }
  interface CustomFieldInfo {
      /** Custom field key. */
      key?: string;
  }
  interface NestedForm {
      /** Targets which have this form. */
      targets?: string[];
      /** Nested form. */
      form?: Form;
  }
  interface ValidateSpamResponse {
      /** The created SpamSubmission. */
      spamSubmission?: SpamSubmission;
      /** Is the submission a spam. */
      spam?: boolean;
  }
  interface CreateSpamSubmissionRequest {
      /** Spam submission to be created. */
      spamSubmission: SpamSubmission;
  }
  interface CreateSpamSubmissionResponse {
      /** The created spam submission. */
      spamSubmission?: SpamSubmission;
  }
  interface GetSpamSubmissionRequest {
      /** Id of the spam submission to retrieve. */
      spamSubmissionId: string;
  }
  interface GetSpamSubmissionResponse {
      /** The retrieved spam submission. */
      spamSubmission?: SpamSubmission;
  }
  interface DeleteSpamSubmissionRequest {
      /** Id of the spam submission to delete. */
      spamSubmissionId: string;
  }
  interface DeleteSpamSubmissionResponse {
  }
  interface ReportNotSpamSubmissionRequest$1 {
      /** Id of the spam submission to report as not spam. */
      spamSubmissionId: string;
  }
  interface ReportNotSpamSubmissionResponse$1 {
      /** Created submission */
      submission?: FormSubmission$3;
  }
  interface ReportSpamSubmissionRequest$1 {
      /** Id of the submission to report as spam. */
      submissionId: string;
  }
  interface ReportSpamSubmissionResponse$1 {
      /** Created spam submission */
      spamSubmission?: SpamSubmission;
  }
  interface QuerySpamSubmissionsRequest {
      /** WQL expression. */
      query: CursorQuery$2;
  }
  interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging$2;
      /**
       * Filter object.
       *
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      filter?: Record<string, any> | null;
      /** Sort object. */
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
  }
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface CursorPaging$2 {
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
  interface QuerySpamSubmissionsResponse {
      /** The retrieved SpamSubmissions. */
      spamSubmissions?: SpamSubmission[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: CursorPagingMetadata$2;
  }
  interface CursorPagingMetadata$2 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface UpdateSpamSubmissionRequest {
      /** Spam submission to be updated, may be partial. */
      spamSubmission: SpamSubmission;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateSpamSubmissionResponse {
      /** Updated spam submission. */
      spamSubmission?: SpamSubmission;
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
  interface Empty$2 {
  }
  /**
   * Checks if submission is a spam. For spam, persists a spam submission.
   * @param submission - Submission.
   * @internal
   * @documentationMaturity preview
   * @requiredField options
   * @requiredField options.form
   * @requiredField options.form._id
   * @requiredField options.form.fields
   * @requiredField submission
   * @requiredField submission.formId
   */
  function validateSpam(submission: FormSubmission$3, options: ValidateSpamOptions): Promise<ValidateSpamResponse>;
  interface ValidateSpamOptions {
      /** Form. */
      form: Form;
  }
  /**
   * Creates a new spam submission.
   * To upload submission media, use the FormSubmissionService.getMediaUploadUrl endpoint
   * @param spamSubmission - Spam submission to be created.
   * @internal
   * @documentationMaturity preview
   * @requiredField spamSubmission
   * @requiredField spamSubmission.formId
   * @requiredField spamSubmission.reportReason
   * @requiredField spamSubmission.submissions
   * @requiredField spamSubmission.submitter
   * @adminMethod
   * @returns The created spam submission.
   */
  function createSpamSubmission(spamSubmission: SpamSubmission): Promise<SpamSubmission>;
  /**
   * Get a spam submission by id.
   * @param spamSubmissionId - Id of the spam submission to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField spamSubmissionId
   * @adminMethod
   * @returns The retrieved spam submission.
   */
  function getSpamSubmission(spamSubmissionId: string): Promise<SpamSubmission>;
  /**
   * Delete a spam submission.
   * @param spamSubmissionId - Id of the spam submission to delete.
   * @internal
   * @documentationMaturity preview
   * @requiredField spamSubmissionId
   * @adminMethod
   */
  function deleteSpamSubmission(spamSubmissionId: string): Promise<void>;
  /**
   * Report a spam submission as not spam. The submission is created, and the spam one is deleted.
   * Submission automations are triggered the same way as in standard submission creation flow.
   * @param spamSubmissionId - Id of the spam submission to report as not spam.
   * @internal
   * @documentationMaturity preview
   * @requiredField spamSubmissionId
   * @adminMethod
   */
  function reportNotSpamSubmission$1(spamSubmissionId: string): Promise<ReportNotSpamSubmissionResponse$1>;
  /**
   * Report a submission as spam. The spam submission is created, and the submission is deleted.
   * @param submissionId - Id of the submission to report as spam.
   * @internal
   * @documentationMaturity preview
   * @requiredField submissionId
   * @adminMethod
   */
  function reportSpamSubmission$1(submissionId: string): Promise<ReportSpamSubmissionResponse$1>;
  /**
   * Query spam submissions using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function querySpamSubmissions(): SpamSubmissionsQueryBuilder;
  interface QueryCursorResult$2 {
      cursors: Cursors$2;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SpamSubmissionsQueryResult extends QueryCursorResult$2 {
      items: SpamSubmission[];
      query: SpamSubmissionsQueryBuilder;
      next: () => Promise<SpamSubmissionsQueryResult>;
      prev: () => Promise<SpamSubmissionsQueryResult>;
  }
  interface SpamSubmissionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'formId' | 'namespace' | '_createdDate' | 'reportReason', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'formId' | '_createdDate' | 'reportReason', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate', value: any) => SpamSubmissionsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'formId' | '_createdDate' | 'reportReason', value: any) => SpamSubmissionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'formId' | '_createdDate' | 'reportReason'>) => SpamSubmissionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'formId' | '_createdDate' | 'reportReason'>) => SpamSubmissionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => SpamSubmissionsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => SpamSubmissionsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<SpamSubmissionsQueryResult>;
  }
  /**
   * Updates a spam submission, supports partial update.
   * You need to pass the latest 'revision' for a successful update.
   * @param _id - Spam submission id.
   * @internal
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField spamSubmission
   * @requiredField spamSubmission.formId
   * @requiredField spamSubmission.revision
   * @adminMethod
   * @returns Updated spam submission.
   */
  function updateSpamSubmission(_id: string | null, spamSubmission: UpdateSpamSubmission, options?: UpdateSpamSubmissionOptions): Promise<SpamSubmission>;
  interface UpdateSpamSubmission {
      /**
       * Spam submission id.
       * @readonly
       */
      _id?: string | null;
      /** Id of a form to which submission belongs. */
      formId?: string;
      /**
       * Form namespace to which submissions belong.
       * @readonly
       */
      namespace?: string;
      /**
       * Submission submitter ID.
       * @readonly
       */
      submitter?: Submitter$3;
      /** Submission values where key is a target of a form field and value is a submissions for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date of creation.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date of last update.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /** Identifies the reason why the submission was reported as spam. */
      reportReason?: ReportReason$1;
      /** Data extensions ExtendedFields. */
      extendedFields?: ExtendedFields$3;
  }
  interface UpdateSpamSubmissionOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  
  type formsV4SpamSubmission_universal_d_FormSpamSubmissionSpiConfig = FormSpamSubmissionSpiConfig;
  type formsV4SpamSubmission_universal_d_FormsSpamSubmissionsNamespaceConfig = FormsSpamSubmissionsNamespaceConfig;
  type formsV4SpamSubmission_universal_d_SpamSubmissionPermissions = SpamSubmissionPermissions;
  type formsV4SpamSubmission_universal_d_SpamSubmission = SpamSubmission;
  type formsV4SpamSubmission_universal_d_ValidateSpamRequest = ValidateSpamRequest;
  type formsV4SpamSubmission_universal_d_Owner = Owner;
  type formsV4SpamSubmission_universal_d_OwnerOwnerOneOf = OwnerOwnerOneOf;
  type formsV4SpamSubmission_universal_d_Form = Form;
  type formsV4SpamSubmission_universal_d_FormField = FormField;
  type formsV4SpamSubmission_universal_d_StringType = StringType;
  type formsV4SpamSubmission_universal_d_StringTypeFormatOptionsOneOf = StringTypeFormatOptionsOneOf;
  type formsV4SpamSubmission_universal_d_Format = Format;
  const formsV4SpamSubmission_universal_d_Format: typeof Format;
  type formsV4SpamSubmission_universal_d_StringErrorMessages = StringErrorMessages;
  type formsV4SpamSubmission_universal_d_DateTimeConstraints = DateTimeConstraints;
  type formsV4SpamSubmission_universal_d_NumberType = NumberType;
  type formsV4SpamSubmission_universal_d_NumberErrorMessages = NumberErrorMessages;
  type formsV4SpamSubmission_universal_d_IntegerType = IntegerType;
  type formsV4SpamSubmission_universal_d_BooleanType = BooleanType;
  type formsV4SpamSubmission_universal_d_BooleanErrorMessages = BooleanErrorMessages;
  type formsV4SpamSubmission_universal_d_ArrayType = ArrayType;
  type formsV4SpamSubmission_universal_d_ObjectType = ObjectType;
  type formsV4SpamSubmission_universal_d_PropertiesType = PropertiesType;
  type formsV4SpamSubmission_universal_d_PropertiesTypePropertiesTypeOneOf = PropertiesTypePropertiesTypeOneOf;
  type formsV4SpamSubmission_universal_d_ObjectErrorMessages = ObjectErrorMessages;
  type formsV4SpamSubmission_universal_d_ArrayItems = ArrayItems;
  type formsV4SpamSubmission_universal_d_ArrayItemsItemsOneOf = ArrayItemsItemsOneOf;
  type formsV4SpamSubmission_universal_d_ArrayErrorMessages = ArrayErrorMessages;
  type formsV4SpamSubmission_universal_d_PredefinedValidation = PredefinedValidation;
  type formsV4SpamSubmission_universal_d_PredefinedValidationFormatOptionsOneOf = PredefinedValidationFormatOptionsOneOf;
  type formsV4SpamSubmission_universal_d_ValidationFormat = ValidationFormat;
  const formsV4SpamSubmission_universal_d_ValidationFormat: typeof ValidationFormat;
  type formsV4SpamSubmission_universal_d_PaymentType = PaymentType;
  type formsV4SpamSubmission_universal_d_ProductType = ProductType;
  const formsV4SpamSubmission_universal_d_ProductType: typeof ProductType;
  type formsV4SpamSubmission_universal_d_PriceType = PriceType;
  const formsV4SpamSubmission_universal_d_PriceType: typeof PriceType;
  type formsV4SpamSubmission_universal_d_QuantityLimit = QuantityLimit;
  type formsV4SpamSubmission_universal_d_FixedPriceOptions = FixedPriceOptions;
  type formsV4SpamSubmission_universal_d_DynamicPriceOptions = DynamicPriceOptions;
  type formsV4SpamSubmission_universal_d_Product = Product;
  type formsV4SpamSubmission_universal_d_ProductPriceOptionsOneOf = ProductPriceOptionsOneOf;
  type formsV4SpamSubmission_universal_d_NestedFormFieldOverrides = NestedFormFieldOverrides;
  type formsV4SpamSubmission_universal_d_Validation = Validation;
  type formsV4SpamSubmission_universal_d_ValidationValidationOneOf = ValidationValidationOneOf;
  type formsV4SpamSubmission_universal_d_DataExtensionsDetails = DataExtensionsDetails;
  type formsV4SpamSubmission_universal_d_NestedFormOverrides = NestedFormOverrides;
  type formsV4SpamSubmission_universal_d_FormFieldV2 = FormFieldV2;
  type formsV4SpamSubmission_universal_d_FormFieldV2FieldTypeOptionsOneOf = FormFieldV2FieldTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_InputFieldStringType = InputFieldStringType;
  type formsV4SpamSubmission_universal_d_FormatEnumFormat = FormatEnumFormat;
  const formsV4SpamSubmission_universal_d_FormatEnumFormat: typeof FormatEnumFormat;
  type formsV4SpamSubmission_universal_d_InputFieldStringErrorMessages = InputFieldStringErrorMessages;
  type formsV4SpamSubmission_universal_d_StringComponentType = StringComponentType;
  const formsV4SpamSubmission_universal_d_StringComponentType: typeof StringComponentType;
  type formsV4SpamSubmission_universal_d_TextInput = TextInput;
  type formsV4SpamSubmission_universal_d_RichContent = RichContent;
  type formsV4SpamSubmission_universal_d_Node = Node;
  type formsV4SpamSubmission_universal_d_NodeDataOneOf = NodeDataOneOf;
  type formsV4SpamSubmission_universal_d_NodeType = NodeType;
  const formsV4SpamSubmission_universal_d_NodeType: typeof NodeType;
  type formsV4SpamSubmission_universal_d_NodeStyle = NodeStyle;
  type formsV4SpamSubmission_universal_d_ButtonData = ButtonData;
  type formsV4SpamSubmission_universal_d_Border = Border;
  type formsV4SpamSubmission_universal_d_Colors = Colors;
  type formsV4SpamSubmission_universal_d_PluginContainerData = PluginContainerData;
  type formsV4SpamSubmission_universal_d_WidthType = WidthType;
  const formsV4SpamSubmission_universal_d_WidthType: typeof WidthType;
  type formsV4SpamSubmission_universal_d_PluginContainerDataWidth = PluginContainerDataWidth;
  type formsV4SpamSubmission_universal_d_PluginContainerDataWidthDataOneOf = PluginContainerDataWidthDataOneOf;
  type formsV4SpamSubmission_universal_d_PluginContainerDataAlignment = PluginContainerDataAlignment;
  const formsV4SpamSubmission_universal_d_PluginContainerDataAlignment: typeof PluginContainerDataAlignment;
  type formsV4SpamSubmission_universal_d_Spoiler = Spoiler;
  type formsV4SpamSubmission_universal_d_Height = Height;
  type formsV4SpamSubmission_universal_d_Type = Type;
  const formsV4SpamSubmission_universal_d_Type: typeof Type;
  type formsV4SpamSubmission_universal_d_Styles = Styles;
  type formsV4SpamSubmission_universal_d_Link = Link;
  type formsV4SpamSubmission_universal_d_LinkDataOneOf = LinkDataOneOf;
  type formsV4SpamSubmission_universal_d_LinkTarget = LinkTarget;
  const formsV4SpamSubmission_universal_d_LinkTarget: typeof LinkTarget;
  type formsV4SpamSubmission_universal_d_Rel = Rel;
  type formsV4SpamSubmission_universal_d_CodeBlockData = CodeBlockData;
  type formsV4SpamSubmission_universal_d_TextStyle = TextStyle;
  type formsV4SpamSubmission_universal_d_TextAlignment = TextAlignment;
  const formsV4SpamSubmission_universal_d_TextAlignment: typeof TextAlignment;
  type formsV4SpamSubmission_universal_d_DividerData = DividerData;
  type formsV4SpamSubmission_universal_d_LineStyle = LineStyle;
  const formsV4SpamSubmission_universal_d_LineStyle: typeof LineStyle;
  type formsV4SpamSubmission_universal_d_Width = Width;
  const formsV4SpamSubmission_universal_d_Width: typeof Width;
  type formsV4SpamSubmission_universal_d_Alignment = Alignment;
  const formsV4SpamSubmission_universal_d_Alignment: typeof Alignment;
  type formsV4SpamSubmission_universal_d_FileData = FileData;
  type formsV4SpamSubmission_universal_d_ViewMode = ViewMode;
  const formsV4SpamSubmission_universal_d_ViewMode: typeof ViewMode;
  type formsV4SpamSubmission_universal_d_FileSource = FileSource;
  type formsV4SpamSubmission_universal_d_FileSourceDataOneOf = FileSourceDataOneOf;
  type formsV4SpamSubmission_universal_d_PDFSettings = PDFSettings;
  type formsV4SpamSubmission_universal_d_GalleryData = GalleryData;
  type formsV4SpamSubmission_universal_d_Media = Media;
  type formsV4SpamSubmission_universal_d_Image = Image;
  type formsV4SpamSubmission_universal_d_Video = Video;
  type formsV4SpamSubmission_universal_d_Item = Item;
  type formsV4SpamSubmission_universal_d_ItemDataOneOf = ItemDataOneOf;
  type formsV4SpamSubmission_universal_d_GalleryOptions = GalleryOptions;
  type formsV4SpamSubmission_universal_d_LayoutType = LayoutType;
  const formsV4SpamSubmission_universal_d_LayoutType: typeof LayoutType;
  type formsV4SpamSubmission_universal_d_Orientation = Orientation;
  const formsV4SpamSubmission_universal_d_Orientation: typeof Orientation;
  type formsV4SpamSubmission_universal_d_Crop = Crop;
  const formsV4SpamSubmission_universal_d_Crop: typeof Crop;
  type formsV4SpamSubmission_universal_d_ThumbnailsAlignment = ThumbnailsAlignment;
  const formsV4SpamSubmission_universal_d_ThumbnailsAlignment: typeof ThumbnailsAlignment;
  type formsV4SpamSubmission_universal_d_Layout = Layout;
  type formsV4SpamSubmission_universal_d_ItemStyle = ItemStyle;
  type formsV4SpamSubmission_universal_d_Thumbnails = Thumbnails;
  type formsV4SpamSubmission_universal_d_GIFData = GIFData;
  type formsV4SpamSubmission_universal_d_GIF = GIF;
  type formsV4SpamSubmission_universal_d_HeadingData = HeadingData;
  type formsV4SpamSubmission_universal_d_HTMLData = HTMLData;
  type formsV4SpamSubmission_universal_d_HTMLDataDataOneOf = HTMLDataDataOneOf;
  type formsV4SpamSubmission_universal_d_Source = Source;
  const formsV4SpamSubmission_universal_d_Source: typeof Source;
  type formsV4SpamSubmission_universal_d_ImageData = ImageData;
  type formsV4SpamSubmission_universal_d_LinkPreviewData = LinkPreviewData;
  type formsV4SpamSubmission_universal_d_MapData = MapData;
  type formsV4SpamSubmission_universal_d_MapSettings = MapSettings;
  type formsV4SpamSubmission_universal_d_MapType = MapType;
  const formsV4SpamSubmission_universal_d_MapType: typeof MapType;
  type formsV4SpamSubmission_universal_d_ParagraphData = ParagraphData;
  type formsV4SpamSubmission_universal_d_PollData = PollData;
  type formsV4SpamSubmission_universal_d_ViewRole = ViewRole;
  const formsV4SpamSubmission_universal_d_ViewRole: typeof ViewRole;
  type formsV4SpamSubmission_universal_d_VoteRole = VoteRole;
  const formsV4SpamSubmission_universal_d_VoteRole: typeof VoteRole;
  type formsV4SpamSubmission_universal_d_Permissions = Permissions;
  type formsV4SpamSubmission_universal_d_PollOption = PollOption;
  type formsV4SpamSubmission_universal_d_Settings = Settings;
  type formsV4SpamSubmission_universal_d_PollLayoutType = PollLayoutType;
  const formsV4SpamSubmission_universal_d_PollLayoutType: typeof PollLayoutType;
  type formsV4SpamSubmission_universal_d_PollLayoutDirection = PollLayoutDirection;
  const formsV4SpamSubmission_universal_d_PollLayoutDirection: typeof PollLayoutDirection;
  type formsV4SpamSubmission_universal_d_PollLayout = PollLayout;
  type formsV4SpamSubmission_universal_d_OptionLayout = OptionLayout;
  type formsV4SpamSubmission_universal_d_BackgroundType = BackgroundType;
  const formsV4SpamSubmission_universal_d_BackgroundType: typeof BackgroundType;
  type formsV4SpamSubmission_universal_d_Gradient = Gradient;
  type formsV4SpamSubmission_universal_d_Background = Background;
  type formsV4SpamSubmission_universal_d_BackgroundBackgroundOneOf = BackgroundBackgroundOneOf;
  type formsV4SpamSubmission_universal_d_PollDesign = PollDesign;
  type formsV4SpamSubmission_universal_d_OptionDesign = OptionDesign;
  type formsV4SpamSubmission_universal_d_Poll = Poll;
  type formsV4SpamSubmission_universal_d_PollDataLayout = PollDataLayout;
  type formsV4SpamSubmission_universal_d_Design = Design;
  type formsV4SpamSubmission_universal_d_TextData = TextData;
  type formsV4SpamSubmission_universal_d_Decoration = Decoration;
  type formsV4SpamSubmission_universal_d_DecorationDataOneOf = DecorationDataOneOf;
  type formsV4SpamSubmission_universal_d_DecorationType = DecorationType;
  const formsV4SpamSubmission_universal_d_DecorationType: typeof DecorationType;
  type formsV4SpamSubmission_universal_d_AnchorData = AnchorData;
  type formsV4SpamSubmission_universal_d_ColorData = ColorData;
  type formsV4SpamSubmission_universal_d_LinkData = LinkData;
  type formsV4SpamSubmission_universal_d_MentionData = MentionData;
  type formsV4SpamSubmission_universal_d_FontSizeData = FontSizeData;
  type formsV4SpamSubmission_universal_d_FontType = FontType;
  const formsV4SpamSubmission_universal_d_FontType: typeof FontType;
  type formsV4SpamSubmission_universal_d_AppEmbedData = AppEmbedData;
  type formsV4SpamSubmission_universal_d_AppEmbedDataAppDataOneOf = AppEmbedDataAppDataOneOf;
  type formsV4SpamSubmission_universal_d_AppType = AppType;
  const formsV4SpamSubmission_universal_d_AppType: typeof AppType;
  type formsV4SpamSubmission_universal_d_BookingData = BookingData;
  type formsV4SpamSubmission_universal_d_EventData = EventData;
  type formsV4SpamSubmission_universal_d_VideoData = VideoData;
  type formsV4SpamSubmission_universal_d_PlaybackOptions = PlaybackOptions;
  type formsV4SpamSubmission_universal_d_EmbedData = EmbedData;
  type formsV4SpamSubmission_universal_d_Oembed = Oembed;
  type formsV4SpamSubmission_universal_d_CollapsibleListData = CollapsibleListData;
  type formsV4SpamSubmission_universal_d_InitialExpandedItems = InitialExpandedItems;
  const formsV4SpamSubmission_universal_d_InitialExpandedItems: typeof InitialExpandedItems;
  type formsV4SpamSubmission_universal_d_Direction = Direction;
  const formsV4SpamSubmission_universal_d_Direction: typeof Direction;
  type formsV4SpamSubmission_universal_d_TableData = TableData;
  type formsV4SpamSubmission_universal_d_Dimensions = Dimensions;
  type formsV4SpamSubmission_universal_d_TableCellData = TableCellData;
  type formsV4SpamSubmission_universal_d_VerticalAlignment = VerticalAlignment;
  const formsV4SpamSubmission_universal_d_VerticalAlignment: typeof VerticalAlignment;
  type formsV4SpamSubmission_universal_d_CellStyle = CellStyle;
  type formsV4SpamSubmission_universal_d_BorderColors = BorderColors;
  type formsV4SpamSubmission_universal_d_NullValue = NullValue;
  const formsV4SpamSubmission_universal_d_NullValue: typeof NullValue;
  type formsV4SpamSubmission_universal_d_ListValue = ListValue;
  type formsV4SpamSubmission_universal_d_AudioData = AudioData;
  type formsV4SpamSubmission_universal_d_OrderedListData = OrderedListData;
  type formsV4SpamSubmission_universal_d_BulletedListData = BulletedListData;
  type formsV4SpamSubmission_universal_d_BlockquoteData = BlockquoteData;
  type formsV4SpamSubmission_universal_d_Metadata = Metadata;
  type formsV4SpamSubmission_universal_d_DocumentStyle = DocumentStyle;
  type formsV4SpamSubmission_universal_d_TextNodeStyle = TextNodeStyle;
  type formsV4SpamSubmission_universal_d_RadioGroup = RadioGroup;
  type formsV4SpamSubmission_universal_d_RadioGroupOption = RadioGroupOption;
  type formsV4SpamSubmission_universal_d_RadioGroupCustomOption = RadioGroupCustomOption;
  type formsV4SpamSubmission_universal_d_Dropdown = Dropdown;
  type formsV4SpamSubmission_universal_d_DropdownOption = DropdownOption;
  type formsV4SpamSubmission_universal_d_DropdownCustomOption = DropdownCustomOption;
  type formsV4SpamSubmission_universal_d_DateTimeInput = DateTimeInput;
  type formsV4SpamSubmission_universal_d_DateTimeInputDateTimeInputTypeOptionsOneOf = DateTimeInputDateTimeInputTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_DateFormatPart = DateFormatPart;
  const formsV4SpamSubmission_universal_d_DateFormatPart: typeof DateFormatPart;
  type formsV4SpamSubmission_universal_d_DateTimeInputType = DateTimeInputType;
  const formsV4SpamSubmission_universal_d_DateTimeInputType: typeof DateTimeInputType;
  type formsV4SpamSubmission_universal_d_DateTimeOptions = DateTimeOptions;
  type formsV4SpamSubmission_universal_d_DateOptions = DateOptions;
  type formsV4SpamSubmission_universal_d_TimeOptions = TimeOptions;
  type formsV4SpamSubmission_universal_d_InputFieldNumberType = InputFieldNumberType;
  type formsV4SpamSubmission_universal_d_InputFieldNumberErrorMessages = InputFieldNumberErrorMessages;
  type formsV4SpamSubmission_universal_d_NumberComponentType = NumberComponentType;
  const formsV4SpamSubmission_universal_d_NumberComponentType: typeof NumberComponentType;
  type formsV4SpamSubmission_universal_d_NumberInput = NumberInput;
  type formsV4SpamSubmission_universal_d_InputFieldBooleanType = InputFieldBooleanType;
  type formsV4SpamSubmission_universal_d_InputFieldBooleanErrorMessages = InputFieldBooleanErrorMessages;
  type formsV4SpamSubmission_universal_d_BooleanComponentType = BooleanComponentType;
  const formsV4SpamSubmission_universal_d_BooleanComponentType: typeof BooleanComponentType;
  type formsV4SpamSubmission_universal_d_Checkbox = Checkbox;
  type formsV4SpamSubmission_universal_d_InputFieldArrayType = InputFieldArrayType;
  type formsV4SpamSubmission_universal_d_ItemType = ItemType;
  const formsV4SpamSubmission_universal_d_ItemType: typeof ItemType;
  type formsV4SpamSubmission_universal_d_InputFieldIntegerType = InputFieldIntegerType;
  type formsV4SpamSubmission_universal_d_InputFieldObjectType = InputFieldObjectType;
  type formsV4SpamSubmission_universal_d_PropertiesTypePropertiesType = PropertiesTypePropertiesType;
  const formsV4SpamSubmission_universal_d_PropertiesTypePropertiesType: typeof PropertiesTypePropertiesType;
  type formsV4SpamSubmission_universal_d_ObjectTypePropertiesType = ObjectTypePropertiesType;
  type formsV4SpamSubmission_universal_d_ObjectTypePropertiesTypePropertiesTypeOptionsOneOf = ObjectTypePropertiesTypePropertiesTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_InputFieldObjectErrorMessages = InputFieldObjectErrorMessages;
  type formsV4SpamSubmission_universal_d_ArrayTypeArrayItems = ArrayTypeArrayItems;
  type formsV4SpamSubmission_universal_d_ArrayTypeArrayItemsItemTypeOptionsOneOf = ArrayTypeArrayItemsItemTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_InputFieldArrayErrorMessages = InputFieldArrayErrorMessages;
  type formsV4SpamSubmission_universal_d_ComponentType = ComponentType;
  const formsV4SpamSubmission_universal_d_ComponentType: typeof ComponentType;
  type formsV4SpamSubmission_universal_d_CheckboxGroup = CheckboxGroup;
  type formsV4SpamSubmission_universal_d_MediaItem = MediaItem;
  type formsV4SpamSubmission_universal_d_MediaItemMediaOneOf = MediaItemMediaOneOf;
  type formsV4SpamSubmission_universal_d_Option = Option;
  type formsV4SpamSubmission_universal_d_CustomOption = CustomOption;
  type formsV4SpamSubmission_universal_d_WixFileComponentType = WixFileComponentType;
  const formsV4SpamSubmission_universal_d_WixFileComponentType: typeof WixFileComponentType;
  type formsV4SpamSubmission_universal_d_FileUpload = FileUpload;
  type formsV4SpamSubmission_universal_d_UploadFileFormat = UploadFileFormat;
  const formsV4SpamSubmission_universal_d_UploadFileFormat: typeof UploadFileFormat;
  type formsV4SpamSubmission_universal_d_PaymentComponentType = PaymentComponentType;
  const formsV4SpamSubmission_universal_d_PaymentComponentType: typeof PaymentComponentType;
  type formsV4SpamSubmission_universal_d_ProductCheckboxGroup = ProductCheckboxGroup;
  type formsV4SpamSubmission_universal_d_ProductCheckboxGroupOption = ProductCheckboxGroupOption;
  type formsV4SpamSubmission_universal_d_InputType = InputType;
  const formsV4SpamSubmission_universal_d_InputType: typeof InputType;
  type formsV4SpamSubmission_universal_d__String = _String;
  type formsV4SpamSubmission_universal_d__StringComponentTypeOptionsOneOf = _StringComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d__Number = _Number;
  type formsV4SpamSubmission_universal_d__NumberComponentTypeOptionsOneOf = _NumberComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d__Boolean = _Boolean;
  type formsV4SpamSubmission_universal_d__BooleanComponentTypeOptionsOneOf = _BooleanComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d__Array = _Array;
  type formsV4SpamSubmission_universal_d__ArrayComponentTypeOptionsOneOf = _ArrayComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d__Object = _Object;
  type formsV4SpamSubmission_universal_d__ObjectValidationOneOf = _ObjectValidationOneOf;
  type formsV4SpamSubmission_universal_d_WixFile = WixFile;
  type formsV4SpamSubmission_universal_d_WixFileComponentTypeOptionsOneOf = WixFileComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_Payment = Payment;
  type formsV4SpamSubmission_universal_d_PaymentComponentTypeOptionsOneOf = PaymentComponentTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_Header = Header;
  type formsV4SpamSubmission_universal_d_RichText = RichText;
  type formsV4SpamSubmission_universal_d_Target = Target;
  const formsV4SpamSubmission_universal_d_Target: typeof Target;
  type formsV4SpamSubmission_universal_d_ThankYouMessage = ThankYouMessage;
  type formsV4SpamSubmission_universal_d_Redirect = Redirect;
  type formsV4SpamSubmission_universal_d_FieldType = FieldType;
  const formsV4SpamSubmission_universal_d_FieldType: typeof FieldType;
  type formsV4SpamSubmission_universal_d_InputField = InputField;
  type formsV4SpamSubmission_universal_d_InputFieldInputTypeOptionsOneOf = InputFieldInputTypeOptionsOneOf;
  type formsV4SpamSubmission_universal_d_DisplayField = DisplayField;
  type formsV4SpamSubmission_universal_d_DisplayFieldComponentTypeOneOf = DisplayFieldComponentTypeOneOf;
  type formsV4SpamSubmission_universal_d_SubmitButton = SubmitButton;
  type formsV4SpamSubmission_universal_d_SubmitButtonSubmitActionOneOf = SubmitButtonSubmitActionOneOf;
  type formsV4SpamSubmission_universal_d_Step = Step;
  type formsV4SpamSubmission_universal_d_FormLayout = FormLayout;
  type formsV4SpamSubmission_universal_d_BreakPoint = BreakPoint;
  type formsV4SpamSubmission_universal_d_ItemLayout = ItemLayout;
  type formsV4SpamSubmission_universal_d_Margin = Margin;
  type formsV4SpamSubmission_universal_d_Section = Section;
  type formsV4SpamSubmission_universal_d_FormRule = FormRule;
  type formsV4SpamSubmission_universal_d_OverrideEntityType = OverrideEntityType;
  const formsV4SpamSubmission_universal_d_OverrideEntityType: typeof OverrideEntityType;
  type formsV4SpamSubmission_universal_d_FormOverride = FormOverride;
  type formsV4SpamSubmission_universal_d_FormProperties = FormProperties;
  type formsV4SpamSubmission_universal_d_Kind = Kind;
  const formsV4SpamSubmission_universal_d_Kind: typeof Kind;
  type formsV4SpamSubmission_universal_d_PostSubmissionTriggers = PostSubmissionTriggers;
  type formsV4SpamSubmission_universal_d_UpsertContact = UpsertContact;
  type formsV4SpamSubmission_universal_d_FormFieldContactInfo = FormFieldContactInfo;
  type formsV4SpamSubmission_universal_d_FormFieldContactInfoAdditionalInfoOneOf = FormFieldContactInfoAdditionalInfoOneOf;
  type formsV4SpamSubmission_universal_d_EmailInfoTag = EmailInfoTag;
  const formsV4SpamSubmission_universal_d_EmailInfoTag: typeof EmailInfoTag;
  type formsV4SpamSubmission_universal_d_PhoneInfoTag = PhoneInfoTag;
  const formsV4SpamSubmission_universal_d_PhoneInfoTag: typeof PhoneInfoTag;
  type formsV4SpamSubmission_universal_d_Tag = Tag;
  const formsV4SpamSubmission_universal_d_Tag: typeof Tag;
  type formsV4SpamSubmission_universal_d_ContactField = ContactField;
  const formsV4SpamSubmission_universal_d_ContactField: typeof ContactField;
  type formsV4SpamSubmission_universal_d_EmailInfo = EmailInfo;
  type formsV4SpamSubmission_universal_d_PhoneInfo = PhoneInfo;
  type formsV4SpamSubmission_universal_d_AddressInfo = AddressInfo;
  type formsV4SpamSubmission_universal_d_CustomFieldInfo = CustomFieldInfo;
  type formsV4SpamSubmission_universal_d_NestedForm = NestedForm;
  type formsV4SpamSubmission_universal_d_ValidateSpamResponse = ValidateSpamResponse;
  type formsV4SpamSubmission_universal_d_CreateSpamSubmissionRequest = CreateSpamSubmissionRequest;
  type formsV4SpamSubmission_universal_d_CreateSpamSubmissionResponse = CreateSpamSubmissionResponse;
  type formsV4SpamSubmission_universal_d_GetSpamSubmissionRequest = GetSpamSubmissionRequest;
  type formsV4SpamSubmission_universal_d_GetSpamSubmissionResponse = GetSpamSubmissionResponse;
  type formsV4SpamSubmission_universal_d_DeleteSpamSubmissionRequest = DeleteSpamSubmissionRequest;
  type formsV4SpamSubmission_universal_d_DeleteSpamSubmissionResponse = DeleteSpamSubmissionResponse;
  type formsV4SpamSubmission_universal_d_QuerySpamSubmissionsRequest = QuerySpamSubmissionsRequest;
  type formsV4SpamSubmission_universal_d_QuerySpamSubmissionsResponse = QuerySpamSubmissionsResponse;
  type formsV4SpamSubmission_universal_d_UpdateSpamSubmissionRequest = UpdateSpamSubmissionRequest;
  type formsV4SpamSubmission_universal_d_UpdateSpamSubmissionResponse = UpdateSpamSubmissionResponse;
  const formsV4SpamSubmission_universal_d_validateSpam: typeof validateSpam;
  type formsV4SpamSubmission_universal_d_ValidateSpamOptions = ValidateSpamOptions;
  const formsV4SpamSubmission_universal_d_createSpamSubmission: typeof createSpamSubmission;
  const formsV4SpamSubmission_universal_d_getSpamSubmission: typeof getSpamSubmission;
  const formsV4SpamSubmission_universal_d_deleteSpamSubmission: typeof deleteSpamSubmission;
  const formsV4SpamSubmission_universal_d_querySpamSubmissions: typeof querySpamSubmissions;
  type formsV4SpamSubmission_universal_d_SpamSubmissionsQueryResult = SpamSubmissionsQueryResult;
  type formsV4SpamSubmission_universal_d_SpamSubmissionsQueryBuilder = SpamSubmissionsQueryBuilder;
  const formsV4SpamSubmission_universal_d_updateSpamSubmission: typeof updateSpamSubmission;
  type formsV4SpamSubmission_universal_d_UpdateSpamSubmission = UpdateSpamSubmission;
  type formsV4SpamSubmission_universal_d_UpdateSpamSubmissionOptions = UpdateSpamSubmissionOptions;
  namespace formsV4SpamSubmission_universal_d {
    export {
      formsV4SpamSubmission_universal_d_FormSpamSubmissionSpiConfig as FormSpamSubmissionSpiConfig,
      SpiBaseUri$1 as SpiBaseUri,
      AlternativeUri$1 as AlternativeUri,
      formsV4SpamSubmission_universal_d_FormsSpamSubmissionsNamespaceConfig as FormsSpamSubmissionsNamespaceConfig,
      formsV4SpamSubmission_universal_d_SpamSubmissionPermissions as SpamSubmissionPermissions,
      Context$1 as Context,
      IdentityType$2 as IdentityType,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      formsV4SpamSubmission_universal_d_SpamSubmission as SpamSubmission,
      Submitter$3 as Submitter,
      SubmitterSubmitterOneOf$3 as SubmitterSubmitterOneOf,
      ReportReason$1 as ReportReason,
      ExtendedFields$3 as ExtendedFields,
      formsV4SpamSubmission_universal_d_ValidateSpamRequest as ValidateSpamRequest,
      FormSubmission$3 as FormSubmission,
      SubmissionStatus$3 as SubmissionStatus,
      formsV4SpamSubmission_universal_d_Owner as Owner,
      formsV4SpamSubmission_universal_d_OwnerOwnerOneOf as OwnerOwnerOneOf,
      OrderDetails$3 as OrderDetails,
      formsV4SpamSubmission_universal_d_Form as Form,
      formsV4SpamSubmission_universal_d_FormField as FormField,
      formsV4SpamSubmission_universal_d_StringType as StringType,
      formsV4SpamSubmission_universal_d_StringTypeFormatOptionsOneOf as StringTypeFormatOptionsOneOf,
      formsV4SpamSubmission_universal_d_Format as Format,
      formsV4SpamSubmission_universal_d_StringErrorMessages as StringErrorMessages,
      formsV4SpamSubmission_universal_d_DateTimeConstraints as DateTimeConstraints,
      formsV4SpamSubmission_universal_d_NumberType as NumberType,
      formsV4SpamSubmission_universal_d_NumberErrorMessages as NumberErrorMessages,
      formsV4SpamSubmission_universal_d_IntegerType as IntegerType,
      formsV4SpamSubmission_universal_d_BooleanType as BooleanType,
      formsV4SpamSubmission_universal_d_BooleanErrorMessages as BooleanErrorMessages,
      formsV4SpamSubmission_universal_d_ArrayType as ArrayType,
      formsV4SpamSubmission_universal_d_ObjectType as ObjectType,
      formsV4SpamSubmission_universal_d_PropertiesType as PropertiesType,
      formsV4SpamSubmission_universal_d_PropertiesTypePropertiesTypeOneOf as PropertiesTypePropertiesTypeOneOf,
      formsV4SpamSubmission_universal_d_ObjectErrorMessages as ObjectErrorMessages,
      formsV4SpamSubmission_universal_d_ArrayItems as ArrayItems,
      formsV4SpamSubmission_universal_d_ArrayItemsItemsOneOf as ArrayItemsItemsOneOf,
      formsV4SpamSubmission_universal_d_ArrayErrorMessages as ArrayErrorMessages,
      formsV4SpamSubmission_universal_d_PredefinedValidation as PredefinedValidation,
      formsV4SpamSubmission_universal_d_PredefinedValidationFormatOptionsOneOf as PredefinedValidationFormatOptionsOneOf,
      formsV4SpamSubmission_universal_d_ValidationFormat as ValidationFormat,
      formsV4SpamSubmission_universal_d_PaymentType as PaymentType,
      formsV4SpamSubmission_universal_d_ProductType as ProductType,
      formsV4SpamSubmission_universal_d_PriceType as PriceType,
      formsV4SpamSubmission_universal_d_QuantityLimit as QuantityLimit,
      formsV4SpamSubmission_universal_d_FixedPriceOptions as FixedPriceOptions,
      formsV4SpamSubmission_universal_d_DynamicPriceOptions as DynamicPriceOptions,
      formsV4SpamSubmission_universal_d_Product as Product,
      formsV4SpamSubmission_universal_d_ProductPriceOptionsOneOf as ProductPriceOptionsOneOf,
      formsV4SpamSubmission_universal_d_NestedFormFieldOverrides as NestedFormFieldOverrides,
      formsV4SpamSubmission_universal_d_Validation as Validation,
      formsV4SpamSubmission_universal_d_ValidationValidationOneOf as ValidationValidationOneOf,
      formsV4SpamSubmission_universal_d_DataExtensionsDetails as DataExtensionsDetails,
      formsV4SpamSubmission_universal_d_NestedFormOverrides as NestedFormOverrides,
      formsV4SpamSubmission_universal_d_FormFieldV2 as FormFieldV2,
      formsV4SpamSubmission_universal_d_FormFieldV2FieldTypeOptionsOneOf as FormFieldV2FieldTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_InputFieldStringType as InputFieldStringType,
      formsV4SpamSubmission_universal_d_FormatEnumFormat as FormatEnumFormat,
      formsV4SpamSubmission_universal_d_InputFieldStringErrorMessages as InputFieldStringErrorMessages,
      formsV4SpamSubmission_universal_d_StringComponentType as StringComponentType,
      formsV4SpamSubmission_universal_d_TextInput as TextInput,
      formsV4SpamSubmission_universal_d_RichContent as RichContent,
      formsV4SpamSubmission_universal_d_Node as Node,
      formsV4SpamSubmission_universal_d_NodeDataOneOf as NodeDataOneOf,
      formsV4SpamSubmission_universal_d_NodeType as NodeType,
      formsV4SpamSubmission_universal_d_NodeStyle as NodeStyle,
      formsV4SpamSubmission_universal_d_ButtonData as ButtonData,
      formsV4SpamSubmission_universal_d_Border as Border,
      formsV4SpamSubmission_universal_d_Colors as Colors,
      formsV4SpamSubmission_universal_d_PluginContainerData as PluginContainerData,
      formsV4SpamSubmission_universal_d_WidthType as WidthType,
      formsV4SpamSubmission_universal_d_PluginContainerDataWidth as PluginContainerDataWidth,
      formsV4SpamSubmission_universal_d_PluginContainerDataWidthDataOneOf as PluginContainerDataWidthDataOneOf,
      formsV4SpamSubmission_universal_d_PluginContainerDataAlignment as PluginContainerDataAlignment,
      formsV4SpamSubmission_universal_d_Spoiler as Spoiler,
      formsV4SpamSubmission_universal_d_Height as Height,
      formsV4SpamSubmission_universal_d_Type as Type,
      formsV4SpamSubmission_universal_d_Styles as Styles,
      formsV4SpamSubmission_universal_d_Link as Link,
      formsV4SpamSubmission_universal_d_LinkDataOneOf as LinkDataOneOf,
      formsV4SpamSubmission_universal_d_LinkTarget as LinkTarget,
      formsV4SpamSubmission_universal_d_Rel as Rel,
      formsV4SpamSubmission_universal_d_CodeBlockData as CodeBlockData,
      formsV4SpamSubmission_universal_d_TextStyle as TextStyle,
      formsV4SpamSubmission_universal_d_TextAlignment as TextAlignment,
      formsV4SpamSubmission_universal_d_DividerData as DividerData,
      formsV4SpamSubmission_universal_d_LineStyle as LineStyle,
      formsV4SpamSubmission_universal_d_Width as Width,
      formsV4SpamSubmission_universal_d_Alignment as Alignment,
      formsV4SpamSubmission_universal_d_FileData as FileData,
      formsV4SpamSubmission_universal_d_ViewMode as ViewMode,
      formsV4SpamSubmission_universal_d_FileSource as FileSource,
      formsV4SpamSubmission_universal_d_FileSourceDataOneOf as FileSourceDataOneOf,
      formsV4SpamSubmission_universal_d_PDFSettings as PDFSettings,
      formsV4SpamSubmission_universal_d_GalleryData as GalleryData,
      formsV4SpamSubmission_universal_d_Media as Media,
      formsV4SpamSubmission_universal_d_Image as Image,
      formsV4SpamSubmission_universal_d_Video as Video,
      formsV4SpamSubmission_universal_d_Item as Item,
      formsV4SpamSubmission_universal_d_ItemDataOneOf as ItemDataOneOf,
      formsV4SpamSubmission_universal_d_GalleryOptions as GalleryOptions,
      formsV4SpamSubmission_universal_d_LayoutType as LayoutType,
      formsV4SpamSubmission_universal_d_Orientation as Orientation,
      formsV4SpamSubmission_universal_d_Crop as Crop,
      formsV4SpamSubmission_universal_d_ThumbnailsAlignment as ThumbnailsAlignment,
      formsV4SpamSubmission_universal_d_Layout as Layout,
      formsV4SpamSubmission_universal_d_ItemStyle as ItemStyle,
      formsV4SpamSubmission_universal_d_Thumbnails as Thumbnails,
      formsV4SpamSubmission_universal_d_GIFData as GIFData,
      formsV4SpamSubmission_universal_d_GIF as GIF,
      formsV4SpamSubmission_universal_d_HeadingData as HeadingData,
      formsV4SpamSubmission_universal_d_HTMLData as HTMLData,
      formsV4SpamSubmission_universal_d_HTMLDataDataOneOf as HTMLDataDataOneOf,
      formsV4SpamSubmission_universal_d_Source as Source,
      formsV4SpamSubmission_universal_d_ImageData as ImageData,
      formsV4SpamSubmission_universal_d_LinkPreviewData as LinkPreviewData,
      formsV4SpamSubmission_universal_d_MapData as MapData,
      formsV4SpamSubmission_universal_d_MapSettings as MapSettings,
      formsV4SpamSubmission_universal_d_MapType as MapType,
      formsV4SpamSubmission_universal_d_ParagraphData as ParagraphData,
      formsV4SpamSubmission_universal_d_PollData as PollData,
      formsV4SpamSubmission_universal_d_ViewRole as ViewRole,
      formsV4SpamSubmission_universal_d_VoteRole as VoteRole,
      formsV4SpamSubmission_universal_d_Permissions as Permissions,
      formsV4SpamSubmission_universal_d_PollOption as PollOption,
      formsV4SpamSubmission_universal_d_Settings as Settings,
      formsV4SpamSubmission_universal_d_PollLayoutType as PollLayoutType,
      formsV4SpamSubmission_universal_d_PollLayoutDirection as PollLayoutDirection,
      formsV4SpamSubmission_universal_d_PollLayout as PollLayout,
      formsV4SpamSubmission_universal_d_OptionLayout as OptionLayout,
      formsV4SpamSubmission_universal_d_BackgroundType as BackgroundType,
      formsV4SpamSubmission_universal_d_Gradient as Gradient,
      formsV4SpamSubmission_universal_d_Background as Background,
      formsV4SpamSubmission_universal_d_BackgroundBackgroundOneOf as BackgroundBackgroundOneOf,
      formsV4SpamSubmission_universal_d_PollDesign as PollDesign,
      formsV4SpamSubmission_universal_d_OptionDesign as OptionDesign,
      formsV4SpamSubmission_universal_d_Poll as Poll,
      formsV4SpamSubmission_universal_d_PollDataLayout as PollDataLayout,
      formsV4SpamSubmission_universal_d_Design as Design,
      formsV4SpamSubmission_universal_d_TextData as TextData,
      formsV4SpamSubmission_universal_d_Decoration as Decoration,
      formsV4SpamSubmission_universal_d_DecorationDataOneOf as DecorationDataOneOf,
      formsV4SpamSubmission_universal_d_DecorationType as DecorationType,
      formsV4SpamSubmission_universal_d_AnchorData as AnchorData,
      formsV4SpamSubmission_universal_d_ColorData as ColorData,
      formsV4SpamSubmission_universal_d_LinkData as LinkData,
      formsV4SpamSubmission_universal_d_MentionData as MentionData,
      formsV4SpamSubmission_universal_d_FontSizeData as FontSizeData,
      formsV4SpamSubmission_universal_d_FontType as FontType,
      formsV4SpamSubmission_universal_d_AppEmbedData as AppEmbedData,
      formsV4SpamSubmission_universal_d_AppEmbedDataAppDataOneOf as AppEmbedDataAppDataOneOf,
      formsV4SpamSubmission_universal_d_AppType as AppType,
      formsV4SpamSubmission_universal_d_BookingData as BookingData,
      formsV4SpamSubmission_universal_d_EventData as EventData,
      formsV4SpamSubmission_universal_d_VideoData as VideoData,
      formsV4SpamSubmission_universal_d_PlaybackOptions as PlaybackOptions,
      formsV4SpamSubmission_universal_d_EmbedData as EmbedData,
      formsV4SpamSubmission_universal_d_Oembed as Oembed,
      formsV4SpamSubmission_universal_d_CollapsibleListData as CollapsibleListData,
      formsV4SpamSubmission_universal_d_InitialExpandedItems as InitialExpandedItems,
      formsV4SpamSubmission_universal_d_Direction as Direction,
      formsV4SpamSubmission_universal_d_TableData as TableData,
      formsV4SpamSubmission_universal_d_Dimensions as Dimensions,
      formsV4SpamSubmission_universal_d_TableCellData as TableCellData,
      formsV4SpamSubmission_universal_d_VerticalAlignment as VerticalAlignment,
      formsV4SpamSubmission_universal_d_CellStyle as CellStyle,
      formsV4SpamSubmission_universal_d_BorderColors as BorderColors,
      formsV4SpamSubmission_universal_d_NullValue as NullValue,
      formsV4SpamSubmission_universal_d_ListValue as ListValue,
      formsV4SpamSubmission_universal_d_AudioData as AudioData,
      formsV4SpamSubmission_universal_d_OrderedListData as OrderedListData,
      formsV4SpamSubmission_universal_d_BulletedListData as BulletedListData,
      formsV4SpamSubmission_universal_d_BlockquoteData as BlockquoteData,
      formsV4SpamSubmission_universal_d_Metadata as Metadata,
      formsV4SpamSubmission_universal_d_DocumentStyle as DocumentStyle,
      formsV4SpamSubmission_universal_d_TextNodeStyle as TextNodeStyle,
      formsV4SpamSubmission_universal_d_RadioGroup as RadioGroup,
      formsV4SpamSubmission_universal_d_RadioGroupOption as RadioGroupOption,
      formsV4SpamSubmission_universal_d_RadioGroupCustomOption as RadioGroupCustomOption,
      formsV4SpamSubmission_universal_d_Dropdown as Dropdown,
      formsV4SpamSubmission_universal_d_DropdownOption as DropdownOption,
      formsV4SpamSubmission_universal_d_DropdownCustomOption as DropdownCustomOption,
      formsV4SpamSubmission_universal_d_DateTimeInput as DateTimeInput,
      formsV4SpamSubmission_universal_d_DateTimeInputDateTimeInputTypeOptionsOneOf as DateTimeInputDateTimeInputTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_DateFormatPart as DateFormatPart,
      formsV4SpamSubmission_universal_d_DateTimeInputType as DateTimeInputType,
      formsV4SpamSubmission_universal_d_DateTimeOptions as DateTimeOptions,
      formsV4SpamSubmission_universal_d_DateOptions as DateOptions,
      formsV4SpamSubmission_universal_d_TimeOptions as TimeOptions,
      formsV4SpamSubmission_universal_d_InputFieldNumberType as InputFieldNumberType,
      formsV4SpamSubmission_universal_d_InputFieldNumberErrorMessages as InputFieldNumberErrorMessages,
      formsV4SpamSubmission_universal_d_NumberComponentType as NumberComponentType,
      formsV4SpamSubmission_universal_d_NumberInput as NumberInput,
      formsV4SpamSubmission_universal_d_InputFieldBooleanType as InputFieldBooleanType,
      formsV4SpamSubmission_universal_d_InputFieldBooleanErrorMessages as InputFieldBooleanErrorMessages,
      formsV4SpamSubmission_universal_d_BooleanComponentType as BooleanComponentType,
      formsV4SpamSubmission_universal_d_Checkbox as Checkbox,
      formsV4SpamSubmission_universal_d_InputFieldArrayType as InputFieldArrayType,
      formsV4SpamSubmission_universal_d_ItemType as ItemType,
      formsV4SpamSubmission_universal_d_InputFieldIntegerType as InputFieldIntegerType,
      formsV4SpamSubmission_universal_d_InputFieldObjectType as InputFieldObjectType,
      formsV4SpamSubmission_universal_d_PropertiesTypePropertiesType as PropertiesTypePropertiesType,
      formsV4SpamSubmission_universal_d_ObjectTypePropertiesType as ObjectTypePropertiesType,
      formsV4SpamSubmission_universal_d_ObjectTypePropertiesTypePropertiesTypeOptionsOneOf as ObjectTypePropertiesTypePropertiesTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_InputFieldObjectErrorMessages as InputFieldObjectErrorMessages,
      formsV4SpamSubmission_universal_d_ArrayTypeArrayItems as ArrayTypeArrayItems,
      formsV4SpamSubmission_universal_d_ArrayTypeArrayItemsItemTypeOptionsOneOf as ArrayTypeArrayItemsItemTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_InputFieldArrayErrorMessages as InputFieldArrayErrorMessages,
      formsV4SpamSubmission_universal_d_ComponentType as ComponentType,
      formsV4SpamSubmission_universal_d_CheckboxGroup as CheckboxGroup,
      formsV4SpamSubmission_universal_d_MediaItem as MediaItem,
      formsV4SpamSubmission_universal_d_MediaItemMediaOneOf as MediaItemMediaOneOf,
      formsV4SpamSubmission_universal_d_Option as Option,
      formsV4SpamSubmission_universal_d_CustomOption as CustomOption,
      formsV4SpamSubmission_universal_d_WixFileComponentType as WixFileComponentType,
      formsV4SpamSubmission_universal_d_FileUpload as FileUpload,
      formsV4SpamSubmission_universal_d_UploadFileFormat as UploadFileFormat,
      formsV4SpamSubmission_universal_d_PaymentComponentType as PaymentComponentType,
      formsV4SpamSubmission_universal_d_ProductCheckboxGroup as ProductCheckboxGroup,
      formsV4SpamSubmission_universal_d_ProductCheckboxGroupOption as ProductCheckboxGroupOption,
      formsV4SpamSubmission_universal_d_InputType as InputType,
      formsV4SpamSubmission_universal_d__String as _String,
      formsV4SpamSubmission_universal_d__StringComponentTypeOptionsOneOf as _StringComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d__Number as _Number,
      formsV4SpamSubmission_universal_d__NumberComponentTypeOptionsOneOf as _NumberComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d__Boolean as _Boolean,
      formsV4SpamSubmission_universal_d__BooleanComponentTypeOptionsOneOf as _BooleanComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d__Array as _Array,
      formsV4SpamSubmission_universal_d__ArrayComponentTypeOptionsOneOf as _ArrayComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d__Object as _Object,
      formsV4SpamSubmission_universal_d__ObjectValidationOneOf as _ObjectValidationOneOf,
      formsV4SpamSubmission_universal_d_WixFile as WixFile,
      formsV4SpamSubmission_universal_d_WixFileComponentTypeOptionsOneOf as WixFileComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_Payment as Payment,
      formsV4SpamSubmission_universal_d_PaymentComponentTypeOptionsOneOf as PaymentComponentTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_Header as Header,
      formsV4SpamSubmission_universal_d_RichText as RichText,
      formsV4SpamSubmission_universal_d_Target as Target,
      formsV4SpamSubmission_universal_d_ThankYouMessage as ThankYouMessage,
      formsV4SpamSubmission_universal_d_Redirect as Redirect,
      formsV4SpamSubmission_universal_d_FieldType as FieldType,
      formsV4SpamSubmission_universal_d_InputField as InputField,
      formsV4SpamSubmission_universal_d_InputFieldInputTypeOptionsOneOf as InputFieldInputTypeOptionsOneOf,
      formsV4SpamSubmission_universal_d_DisplayField as DisplayField,
      formsV4SpamSubmission_universal_d_DisplayFieldComponentTypeOneOf as DisplayFieldComponentTypeOneOf,
      formsV4SpamSubmission_universal_d_SubmitButton as SubmitButton,
      formsV4SpamSubmission_universal_d_SubmitButtonSubmitActionOneOf as SubmitButtonSubmitActionOneOf,
      formsV4SpamSubmission_universal_d_Step as Step,
      formsV4SpamSubmission_universal_d_FormLayout as FormLayout,
      formsV4SpamSubmission_universal_d_BreakPoint as BreakPoint,
      formsV4SpamSubmission_universal_d_ItemLayout as ItemLayout,
      formsV4SpamSubmission_universal_d_Margin as Margin,
      formsV4SpamSubmission_universal_d_Section as Section,
      formsV4SpamSubmission_universal_d_FormRule as FormRule,
      formsV4SpamSubmission_universal_d_OverrideEntityType as OverrideEntityType,
      formsV4SpamSubmission_universal_d_FormOverride as FormOverride,
      formsV4SpamSubmission_universal_d_FormProperties as FormProperties,
      formsV4SpamSubmission_universal_d_Kind as Kind,
      formsV4SpamSubmission_universal_d_PostSubmissionTriggers as PostSubmissionTriggers,
      formsV4SpamSubmission_universal_d_UpsertContact as UpsertContact,
      formsV4SpamSubmission_universal_d_FormFieldContactInfo as FormFieldContactInfo,
      formsV4SpamSubmission_universal_d_FormFieldContactInfoAdditionalInfoOneOf as FormFieldContactInfoAdditionalInfoOneOf,
      formsV4SpamSubmission_universal_d_EmailInfoTag as EmailInfoTag,
      formsV4SpamSubmission_universal_d_PhoneInfoTag as PhoneInfoTag,
      formsV4SpamSubmission_universal_d_Tag as Tag,
      formsV4SpamSubmission_universal_d_ContactField as ContactField,
      formsV4SpamSubmission_universal_d_EmailInfo as EmailInfo,
      formsV4SpamSubmission_universal_d_PhoneInfo as PhoneInfo,
      formsV4SpamSubmission_universal_d_AddressInfo as AddressInfo,
      formsV4SpamSubmission_universal_d_CustomFieldInfo as CustomFieldInfo,
      formsV4SpamSubmission_universal_d_NestedForm as NestedForm,
      formsV4SpamSubmission_universal_d_ValidateSpamResponse as ValidateSpamResponse,
      formsV4SpamSubmission_universal_d_CreateSpamSubmissionRequest as CreateSpamSubmissionRequest,
      formsV4SpamSubmission_universal_d_CreateSpamSubmissionResponse as CreateSpamSubmissionResponse,
      formsV4SpamSubmission_universal_d_GetSpamSubmissionRequest as GetSpamSubmissionRequest,
      formsV4SpamSubmission_universal_d_GetSpamSubmissionResponse as GetSpamSubmissionResponse,
      formsV4SpamSubmission_universal_d_DeleteSpamSubmissionRequest as DeleteSpamSubmissionRequest,
      formsV4SpamSubmission_universal_d_DeleteSpamSubmissionResponse as DeleteSpamSubmissionResponse,
      ReportNotSpamSubmissionRequest$1 as ReportNotSpamSubmissionRequest,
      ReportNotSpamSubmissionResponse$1 as ReportNotSpamSubmissionResponse,
      ReportSpamSubmissionRequest$1 as ReportSpamSubmissionRequest,
      ReportSpamSubmissionResponse$1 as ReportSpamSubmissionResponse,
      formsV4SpamSubmission_universal_d_QuerySpamSubmissionsRequest as QuerySpamSubmissionsRequest,
      CursorQuery$2 as CursorQuery,
      CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$2 as CursorPaging,
      formsV4SpamSubmission_universal_d_QuerySpamSubmissionsResponse as QuerySpamSubmissionsResponse,
      CursorPagingMetadata$2 as CursorPagingMetadata,
      Cursors$2 as Cursors,
      formsV4SpamSubmission_universal_d_UpdateSpamSubmissionRequest as UpdateSpamSubmissionRequest,
      formsV4SpamSubmission_universal_d_UpdateSpamSubmissionResponse as UpdateSpamSubmissionResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      Empty$2 as Empty,
      formsV4SpamSubmission_universal_d_validateSpam as validateSpam,
      formsV4SpamSubmission_universal_d_ValidateSpamOptions as ValidateSpamOptions,
      formsV4SpamSubmission_universal_d_createSpamSubmission as createSpamSubmission,
      formsV4SpamSubmission_universal_d_getSpamSubmission as getSpamSubmission,
      formsV4SpamSubmission_universal_d_deleteSpamSubmission as deleteSpamSubmission,
      reportNotSpamSubmission$1 as reportNotSpamSubmission,
      reportSpamSubmission$1 as reportSpamSubmission,
      formsV4SpamSubmission_universal_d_querySpamSubmissions as querySpamSubmissions,
      formsV4SpamSubmission_universal_d_SpamSubmissionsQueryResult as SpamSubmissionsQueryResult,
      formsV4SpamSubmission_universal_d_SpamSubmissionsQueryBuilder as SpamSubmissionsQueryBuilder,
      formsV4SpamSubmission_universal_d_updateSpamSubmission as updateSpamSubmission,
      formsV4SpamSubmission_universal_d_UpdateSpamSubmission as UpdateSpamSubmission,
      formsV4SpamSubmission_universal_d_UpdateSpamSubmissionOptions as UpdateSpamSubmissionOptions,
    };
  }
  
  interface ValidateSubmissionRequest extends ValidateSubmissionRequestActionsOneOf {
      /** Data for updating an existing submission. */
      updateOptions?: UpdateOptions;
      /** Submission to validate. */
      submission: FormSubmission$2;
      /** Whether to create or update the submission. */
      actionType: ActionType;
  }
  /** @oneof */
  interface ValidateSubmissionRequestActionsOneOf {
      /** Data for updating an existing submission. */
      updateOptions?: UpdateOptions;
  }
  /** Form submission that was created or retrieved. */
  interface FormSubmission$2 {
      /**
       * Submission ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the form which the submission belongs to. */
      formId?: string;
      /**
       * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
       * @readonly
       */
      namespace?: string;
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      status?: SubmissionStatus$2;
      /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the form submission was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
       * @readonly
       */
      revision?: string | null;
      /**
       * ID of the visitor that submitted the form.
       * @readonly
       */
      submitter?: Submitter$2;
      /** Whether a site owner marked a submission as "seen". */
      seen?: boolean;
      /** Data extension object that holds users' and apps' fields. */
      extendedFields?: ExtendedFields$2;
      /**
       * Order details. <br>
       * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
       */
      orderDetails?: OrderDetails$2;
  }
  enum SubmissionStatus$2 {
      UNDEFINED = "UNDEFINED",
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED",
      PAYMENT_WAITING = "PAYMENT_WAITING",
      PAYMENT_CANCELED = "PAYMENT_CANCELED"
  }
  interface Submitter$2 extends SubmitterSubmitterOneOf$2 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  /** @oneof */
  interface SubmitterSubmitterOneOf$2 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  interface ExtendedFields$2 {
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
  interface OrderDetails$2 {
      /**
       * ID of the order related to submission (only applicable if a form has payments).
       * @readonly
       */
      orderId?: string | null;
      /**
       * Order number.
       * @readonly
       */
      number?: string | null;
      /**
       * Currency.
       * @readonly
       */
      currency?: string | null;
      /**
       * Item subtotal.
       * @readonly
       */
      itemSubtotal?: string;
      /**
       * ID of the checkout related to submission (only applicable if a form has payments).
       * @readonly
       */
      checkoutId?: string;
  }
  enum ActionType {
      UNKNOWN_ACTION = "UNKNOWN_ACTION",
      UPDATE = "UPDATE",
      CREATE = "CREATE"
  }
  interface UpdateOptions {
      /** Submission to update. */
      currentSubmission?: FormSubmission$2;
  }
  interface ValidateSubmissionResponse {
      /**
       * List of validation errors. <br>
       * If there are no validation errors, returns an empty array.
       */
      errors?: SubmissionValidationError[];
  }
  interface SubmissionValidationError extends SubmissionValidationErrorErrorMessageOneOf {
      /** Predefined error type. */
      errorType?: SubmissionErrorType;
      /** Custom error message. The message is displayed instead of an error type. */
      customErrorMessage?: string;
      /** Path indicating the source of the error, such as `form.fields.target`. */
      errorPath?: string;
      /** Additional error parameters. */
      params?: Record<string, any> | null;
  }
  /** @oneof */
  interface SubmissionValidationErrorErrorMessageOneOf {
      /** Predefined error type. */
      errorType?: SubmissionErrorType;
      /** Custom error message. The message is displayed instead of an error type. */
      customErrorMessage?: string;
  }
  enum SubmissionErrorType {
      /** Error is unknown or not suitable for any of options bellow */
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
      /** Type of submitted value is incorrect */
      TYPE_ERROR = "TYPE_ERROR",
      /** Value is required to be provided */
      REQUIRED_VALUE_ERROR = "REQUIRED_VALUE_ERROR",
      /** Value contains additional properties not expected in schema */
      UNKNOWN_VALUE_ERROR = "UNKNOWN_VALUE_ERROR",
      /** Text value exceeds max length */
      MAX_LENGTH_ERROR = "MAX_LENGTH_ERROR",
      /** Text value not reaches min length */
      MIN_LENGTH_ERROR = "MIN_LENGTH_ERROR",
      /** Text value not applicable for expected pattern */
      PATTERN_ERROR = "PATTERN_ERROR",
      /** Text value not applicable for expected format */
      FORMAT_ERROR = "FORMAT_ERROR",
      /** Number value is too big */
      MAX_VALUE_ERROR = "MAX_VALUE_ERROR",
      /** Number value is too small */
      MIN_VALUE_ERROR = "MIN_VALUE_ERROR",
      /** Number value is not multiple of expected number */
      MULTIPLE_OF_VALUE_ERROR = "MULTIPLE_OF_VALUE_ERROR",
      /** Array value has too much items */
      MIN_ITEMS_ERROR = "MIN_ITEMS_ERROR",
      /** Array value has not enough items */
      MAX_ITEMS_ERROR = "MAX_ITEMS_ERROR",
      /** Value is not in list of allowed values */
      NOT_ALLOWED_VALUE_ERROR = "NOT_ALLOWED_VALUE_ERROR",
      /** Submitted form is disabled */
      DISABLED_FORM_ERROR = "DISABLED_FORM_ERROR"
  }
  interface FormSubmissionSpiExtensionConfig {
      /** URI where the service plugin Implementer is deployed */
      deploymentUri?: SpiBaseUri;
      /** Namespace names. */
      namespaceConfigs?: FormsSubmissionsExtensionNamespaceConfig[];
  }
  interface SpiBaseUri {
      /** URI that will be used by the host to call the implementer. The path-suffix defined on the method will be appended to it */
      baseUri?: string;
      /** override method mappings per method */
      alternativeUris?: AlternativeUri[];
  }
  interface AlternativeUri {
      /** name of the method as it appears in the proto */
      methodName?: string;
      /** absolute uri that will be used by the host to call that method. The path-suffix mapped from the method http option will NOT be appended to this URI. For TPAs. it must be https */
      absoluteUri?: string;
  }
  interface FormsSubmissionsExtensionNamespaceConfig {
      /** Targeted namespace, with what submissions should trigger defined methods. */
      namespace?: string;
      /** Enable submission validation. */
      submissionValidationEnabled?: boolean;
  }
  /**
   * this message is not directly used by any service,
   * it exists to describe the expected parameters that SHOULD be provided to invoked Velo methods as part of open-platform.
   * e.g. SPIs, event-handlers, etc..
   * NOTE: this context object MUST be provided as the last argument in each Velo method signature.
   *
   * Example:
   * ```typescript
   * export function wixStores_onOrderCanceled(event: OrderCanceledEvent, context: Context) {
   * ...
   * }
   * ```
   */
  interface Context {
      /** A unique identifier for each request. Can be used for logging / troubleshooting */
      requestId?: string | null;
      /** 3 capital letters string representing a currency according to ISO-4217 */
      currency?: string | null;
      /** The identification type and identity data */
      identity?: IdentificationData$2;
      /** A string representing a language and region in the format of "xx-XX". First 2 letters represent the language code according to ISO 639-1. This is followed by a dash "-", and then a by 2 capital letters representing the region according to ISO 3166-2 */
      languages?: string[];
      /** App instance ID of SPI in context */
      instanceId?: string | null;
  }
  enum IdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
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
      identityType?: IdentityType$1;
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
  /**
   * > **Notes:** <br>
   * > - The Form Submission service plugin is only available in Wix Studio and Editor X.
   * > - The Form Submission service plugin only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
   * <br>
   * Validates a submission. <br>
   * Validates a site visitor's form submission and returns any validation violations. <br>
   * Site visitors can see the validation violations on their forms. For example, invalid fields are highlighted in red.
   * @public
   * @documentationMaturity preview
   * @requiredField options.actionType
   * @requiredField options.submission
   */
  function validateSubmission(options?: ValidateSubmissionOptions): Promise<ValidateSubmissionResponse>;
  interface ValidateSubmissionOptions extends ValidateSubmissionRequestActionsOneOf {
      /** Submission to validate. */
      submission: FormSubmission$2;
      /** Whether to create or update the submission. */
      actionType: ActionType;
      /** Data for updating an existing submission. */
      updateOptions?: UpdateOptions;
  }
  
  type interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionRequest = ValidateSubmissionRequest;
  type interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionRequestActionsOneOf = ValidateSubmissionRequestActionsOneOf;
  type interfacesFormsV4SubmissionExtension_universal_d_ActionType = ActionType;
  const interfacesFormsV4SubmissionExtension_universal_d_ActionType: typeof ActionType;
  type interfacesFormsV4SubmissionExtension_universal_d_UpdateOptions = UpdateOptions;
  type interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionResponse = ValidateSubmissionResponse;
  type interfacesFormsV4SubmissionExtension_universal_d_SubmissionValidationError = SubmissionValidationError;
  type interfacesFormsV4SubmissionExtension_universal_d_SubmissionValidationErrorErrorMessageOneOf = SubmissionValidationErrorErrorMessageOneOf;
  type interfacesFormsV4SubmissionExtension_universal_d_SubmissionErrorType = SubmissionErrorType;
  const interfacesFormsV4SubmissionExtension_universal_d_SubmissionErrorType: typeof SubmissionErrorType;
  type interfacesFormsV4SubmissionExtension_universal_d_FormSubmissionSpiExtensionConfig = FormSubmissionSpiExtensionConfig;
  type interfacesFormsV4SubmissionExtension_universal_d_SpiBaseUri = SpiBaseUri;
  type interfacesFormsV4SubmissionExtension_universal_d_AlternativeUri = AlternativeUri;
  type interfacesFormsV4SubmissionExtension_universal_d_FormsSubmissionsExtensionNamespaceConfig = FormsSubmissionsExtensionNamespaceConfig;
  type interfacesFormsV4SubmissionExtension_universal_d_Context = Context;
  const interfacesFormsV4SubmissionExtension_universal_d_validateSubmission: typeof validateSubmission;
  type interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionOptions = ValidateSubmissionOptions;
  namespace interfacesFormsV4SubmissionExtension_universal_d {
    export {
      interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionRequest as ValidateSubmissionRequest,
      interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionRequestActionsOneOf as ValidateSubmissionRequestActionsOneOf,
      FormSubmission$2 as FormSubmission,
      SubmissionStatus$2 as SubmissionStatus,
      Submitter$2 as Submitter,
      SubmitterSubmitterOneOf$2 as SubmitterSubmitterOneOf,
      ExtendedFields$2 as ExtendedFields,
      OrderDetails$2 as OrderDetails,
      interfacesFormsV4SubmissionExtension_universal_d_ActionType as ActionType,
      interfacesFormsV4SubmissionExtension_universal_d_UpdateOptions as UpdateOptions,
      interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionResponse as ValidateSubmissionResponse,
      interfacesFormsV4SubmissionExtension_universal_d_SubmissionValidationError as SubmissionValidationError,
      interfacesFormsV4SubmissionExtension_universal_d_SubmissionValidationErrorErrorMessageOneOf as SubmissionValidationErrorErrorMessageOneOf,
      interfacesFormsV4SubmissionExtension_universal_d_SubmissionErrorType as SubmissionErrorType,
      interfacesFormsV4SubmissionExtension_universal_d_FormSubmissionSpiExtensionConfig as FormSubmissionSpiExtensionConfig,
      interfacesFormsV4SubmissionExtension_universal_d_SpiBaseUri as SpiBaseUri,
      interfacesFormsV4SubmissionExtension_universal_d_AlternativeUri as AlternativeUri,
      interfacesFormsV4SubmissionExtension_universal_d_FormsSubmissionsExtensionNamespaceConfig as FormsSubmissionsExtensionNamespaceConfig,
      interfacesFormsV4SubmissionExtension_universal_d_Context as Context,
      IdentityType$1 as IdentityType,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      interfacesFormsV4SubmissionExtension_universal_d_validateSubmission as validateSubmission,
      interfacesFormsV4SubmissionExtension_universal_d_ValidateSubmissionOptions as ValidateSubmissionOptions,
    };
  }
  
  /**
   * FormSpamSubmissionReportReport stores a form submission spam report.
   * It contains submission details as well as report reason.
   */
  interface FormSpamSubmissionReport {
      /**
       * Form spam submission report id.
       * @readonly
       */
      _id?: string | null;
      /** Id of a form to which the form spam submission report belongs. */
      formId?: string;
      /**
       * Form namespace to which the form spam submission report belongs.
       * @readonly
       */
      namespace?: string;
      /** Form submission submitter id. */
      submitter?: Submitter$1;
      /** Submission values where key is a target of a form field and value is a submissions for the given field. */
      submissions?: Record<string, any>;
      /** Identifies the reason why the submission was reported as spam. */
      reportReason?: ReportReason;
      /** Date of submission creation. If a submission was created in the past, pass the original submission creation date. */
      _createdDate?: Date;
      /**
       * Date of form spam submission report creation.
       * @readonly
       */
      reportedDate?: Date;
      /**
       * Date of last update.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Represents the current state of an item. Each time the item is modified, its `revision` changes. for an update operation to succeed, you MUST pass the latest revision.
       * @readonly
       */
      revision?: string | null;
      /** Data extensions ExtendedFields. */
      extendedFields?: ExtendedFields$1;
      /** Last status of the submission at the time of the report */
      submissionStatusAtReport?: SubmissionStatus$1;
      /** Order details. */
      orderDetails?: FormSpamSubmissionReportOrderDetails;
      /**
       * Contact ID. Member who created the submission, or a mapped contact.
       * @readonly
       */
      contactId?: string | null;
  }
  interface Submitter$1 extends SubmitterSubmitterOneOf$1 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  /** @oneof */
  interface SubmitterSubmitterOneOf$1 {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  enum ReportReason {
      UNKNOWN_REASON = "UNKNOWN_REASON",
      /** An email quota is reached. There were too many submissions in a short time period with the same email. */
      EMAIL_QUOTA_REACHED = "EMAIL_QUOTA_REACHED",
      /** An IP address is is blocklisted. */
      IP_BLOCKLISTED = "IP_BLOCKLISTED",
      /** An email is is blocklisted. */
      EMAIL_BLOCKLISTED = "EMAIL_BLOCKLISTED",
      /** Reported spam by the AI spam detection model. It uses submission text as an input. */
      AI_REPORTED = "AI_REPORTED",
      /** Reported as spam by a submission manager. */
      MANUALLY_REPORTED = "MANUALLY_REPORTED"
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
  enum SubmissionStatus$1 {
      UNDEFINED = "UNDEFINED",
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED",
      PAYMENT_WAITING = "PAYMENT_WAITING",
      PAYMENT_CANCELED = "PAYMENT_CANCELED"
  }
  interface FormSpamSubmissionReportOrderDetails {
      /**
       * ID of the checkout related to submission (applicable if form has payments added).
       * @readonly
       */
      checkoutId?: string;
  }
  interface CheckForSpamRequest {
      /** Form submission. */
      submission: FormSubmission$1;
  }
  /** Form submission that was created or retrieved. */
  interface FormSubmission$1 {
      /**
       * Submission ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the form which the submission belongs to. */
      formId?: string;
      /**
       * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
       * @readonly
       */
      namespace?: string;
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      status?: SubmissionStatus$1;
      /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the form submission was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
       * @readonly
       */
      revision?: string | null;
      /**
       * ID of the visitor that submitted the form.
       * @readonly
       */
      submitter?: Submitter$1;
      /** Whether a site owner marked a submission as "seen". */
      seen?: boolean;
      /** Data extension object that holds users' and apps' fields. */
      extendedFields?: ExtendedFields$1;
      /**
       * Order details. <br>
       * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
       */
      orderDetails?: OrderDetails$1;
      /**
       * Contact ID. Member who created the submission, or a mapped contact.
       * @readonly
       */
      contactId?: string | null;
  }
  interface OrderDetails$1 {
      /**
       * ID of the order related to submission (only applicable if a form has payments).
       * @readonly
       */
      orderId?: string | null;
      /**
       * Order number.
       * @readonly
       */
      number?: string | null;
      /**
       * Currency.
       * @readonly
       */
      currency?: string | null;
      /**
       * Item subtotal.
       * @readonly
       */
      itemSubtotal?: string;
      /**
       * ID of the checkout related to submission (only applicable if a form has payments).
       * @readonly
       */
      checkoutId?: string;
  }
  interface CheckForSpamResponse {
      /** Is the submission a spam. */
      spam?: boolean;
      /** Spam report details. Filled when spam == true */
      spamReport?: SpamReport;
  }
  interface SpamReport {
      /** Identifies the reason why the submission was reported as spam. */
      reportReason?: ReportReason;
  }
  interface CreateFormSpamSubmissionReportRequest {
      /** Form spam submission report to be created. */
      formSpamSubmissionReport: FormSpamSubmissionReport;
  }
  interface CreateFormSpamSubmissionReportResponse {
      /** The created form spam submission report. */
      formSpamSubmissionReport?: FormSpamSubmissionReport;
  }
  interface GetFormSpamSubmissionReportRequest {
      /** Id of the form spam submission report to retrieve. */
      formSpamSubmissionReportId: string;
  }
  interface GetFormSpamSubmissionReportResponse {
      /** The retrieved form spam submission report. */
      formSpamSubmissionReport?: FormSpamSubmissionReport;
  }
  interface DeleteFormSpamSubmissionReportRequest {
      /** Id of the form spam submission report to delete. */
      formSpamSubmissionReportId: string;
  }
  interface DeleteFormSpamSubmissionReportResponse {
  }
  interface BulkDeleteFormSpamSubmissionReportRequest {
      /** Form ID. */
      formId: string;
      /** Ids of the form spam submission reports to delete. */
      formSpamSubmissionReportIds?: string[];
  }
  interface BulkDeleteFormSpamSubmissionReportResponse {
      /** Results of bulk report delete */
      results?: BulkDeleteFormSpamSubmissionReportResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkDeleteFormSpamSubmissionReportResult {
      /** Deleted item metadata */
      itemMetadata?: ItemMetadata$1;
  }
  interface ItemMetadata$1 {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError$1;
  }
  interface ApplicationError$1 {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata$1 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface BulkDeleteFormSpamSubmissionReportByFilterRequest {
      /**
       * Filter object.
       *
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
       */
      filter: Record<string, any> | null;
  }
  interface BulkDeleteFormSpamSubmissionReportByFilterResponse {
      /** Job id of bulk delete form submission report by filter job */
      jobId?: string;
  }
  interface ReportNotSpamSubmissionRequest {
      /** Id of the form spam submission report to report as not spam. */
      formSpamSubmissionReportId: string;
  }
  interface ReportNotSpamSubmissionResponse {
      /** Created form submission. */
      submission?: FormSubmission$1;
  }
  interface BulkReportNotSpamSubmissionRequest {
      /** Id of the form to which belong reports */
      formId: string;
      /** Ids of the form spam submission reports to report as not spam. */
      formSpamSubmissionReportIds?: string[];
  }
  interface BulkReportNotSpamSubmissionResponse {
      /** Info whatever report of specific items was successful */
      results?: BulkReportNotSpamSubmissionResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkReportNotSpamSubmissionResult {
      /** Metadata of submission, marked as not spam */
      itemMetadata?: ItemMetadata$1;
      /** Id of related report, which was reported as not spam */
      formSpamSubmissionReportId?: string;
  }
  interface ReportSpamSubmissionRequest {
      /** Id of the submission to report as spam. */
      submissionId: string;
      /** Identifies the reason why the submission was reported as spam. */
      reportReason: ReportReason;
  }
  interface ReportSpamSubmissionResponse {
      /** Created form spam submission report. */
      formSpamSubmissionReport?: FormSpamSubmissionReport;
  }
  interface BulkReportSpamSubmissionRequest {
      /** Id of the form to which belong submissions to report as spam. */
      formId: string;
      /** Ids of the submissions to report as spam. */
      submissionIds: string[];
      /** Identifies the reason why the submission was reported as spam. */
      reportReason: ReportReason;
      /** When set, items will be returned on successful report */
      returnEntity?: boolean;
  }
  interface BulkReportSpamSubmissionResponse {
      /** Created reports with metadata */
      results?: BulkReportSpamSubmissionResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkReportSpamSubmissionResult {
      /** Created report metadata */
      itemMetadata?: ItemMetadata$1;
      /** Created report, exists if `returnEntity` was set to `true` in the request */
      item?: FormSpamSubmissionReport;
  }
  interface QueryFormSpamSubmissionReportsByNamespaceRequest {
      /** WQL expression. */
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
  interface QueryFormSpamSubmissionReportsByNamespaceResponse {
      /** The retrieved FormSpamSubmissionReports. */
      formSpamSubmissionReports?: FormSpamSubmissionReport[];
      /** Details on the paged set of results returned. */
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
  interface CountFormSpamSubmissionReportsRequest {
      /** Form IDs. */
      formIds: string[];
      /** Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint. */
      namespace: string;
  }
  interface CountFormSpamSubmissionReportsResponse {
      /** Forms submission count. */
      formsSpamSubmissionReportsCount?: FormSpamSubmissionReportsCount[];
  }
  interface FormSpamSubmissionReportsCount {
      /** Form ID. */
      formId?: string;
      /** Total number of submissions. */
      totalCount?: number;
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
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
  }
  interface RestoreInfo$1 {
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
  interface Empty$1 {
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
   * Checks if submission is a spam.
   * @param submission - Form submission.
   * @public
   * @documentationMaturity preview
   * @requiredField submission
   * @requiredField submission.formId
   */
  function checkForSpam(submission: FormSubmission$1): Promise<CheckForSpamResponse>;
  /**
   * Creates a new spam submission.
   * To upload submission media, use the FormSubmissionService.getMediaUploadUrl endpoint.
   * @param formSpamSubmissionReport - Form spam submission report to be created.
   * @public
   * @documentationMaturity preview
   * @requiredField formSpamSubmissionReport
   * @requiredField formSpamSubmissionReport.formId
   * @requiredField formSpamSubmissionReport.reportReason
   * @requiredField formSpamSubmissionReport.submissions
   * @requiredField formSpamSubmissionReport.submitter
   * @adminMethod
   * @returns The created form spam submission report.
   */
  function createFormSpamSubmissionReport(formSpamSubmissionReport: FormSpamSubmissionReport): Promise<FormSpamSubmissionReport>;
  /**
   * Get a spam submission by id.
   * @param formSpamSubmissionReportId - Id of the form spam submission report to retrieve.
   * @public
   * @documentationMaturity preview
   * @requiredField formSpamSubmissionReportId
   * @adminMethod
   * @returns The retrieved form spam submission report.
   */
  function getFormSpamSubmissionReport(formSpamSubmissionReportId: string): Promise<FormSpamSubmissionReport>;
  /**
   * Delete a spam submission report.
   * @param formSpamSubmissionReportId - Id of the form spam submission report to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField formSpamSubmissionReportId
   * @adminMethod
   */
  function deleteFormSpamSubmissionReport(formSpamSubmissionReportId: string): Promise<void>;
  /**
   * Deletes report by IDS or all for specific form.
   * @param formId - Form ID.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @adminMethod
   */
  function bulkDeleteFormSpamSubmissionReport(formId: string, options?: BulkDeleteFormSpamSubmissionReportOptions): Promise<BulkDeleteFormSpamSubmissionReportResponse>;
  interface BulkDeleteFormSpamSubmissionReportOptions {
      /** Ids of the form spam submission reports to delete. */
      formSpamSubmissionReportIds?: string[];
  }
  /**
   * Deletes reports by filter for specific form.
   * @param filter - Filter object.
   *
   * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @adminMethod
   */
  function bulkDeleteFormSpamSubmissionReportByFilter(filter: Record<string, any> | null): Promise<BulkDeleteFormSpamSubmissionReportByFilterResponse>;
  /**
   * Report a spam submission as not spam. The submission is created, and the spam report is deleted.
   * Submission automations are triggered the same way as in standard submission creation flow.
   * @param formSpamSubmissionReportId - Id of the form spam submission report to report as not spam.
   * @public
   * @documentationMaturity preview
   * @requiredField formSpamSubmissionReportId
   * @adminMethod
   */
  function reportNotSpamSubmission(formSpamSubmissionReportId: string): Promise<ReportNotSpamSubmissionResponse>;
  /**
   * Report a spam submissions as not spam. The submissions is created, and the spam reports is deleted.
   * Submissions automations are triggered the same way as in standard submission creation flow.
   * @param formId - Id of the form to which belong reports
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @adminMethod
   */
  function bulkReportNotSpamSubmission(formId: string, options?: BulkReportNotSpamSubmissionOptions): Promise<BulkReportNotSpamSubmissionResponse>;
  interface BulkReportNotSpamSubmissionOptions {
      /** Ids of the form spam submission reports to report as not spam. */
      formSpamSubmissionReportIds?: string[];
  }
  /**
   * Report a submission as spam. The spam submission report is created, and the submission is deleted.
   * @param submissionId - Id of the submission to report as spam.
   * @param reportReason - Identifies the reason why the submission was reported as spam.
   * @public
   * @documentationMaturity preview
   * @requiredField reportReason
   * @requiredField submissionId
   * @adminMethod
   */
  function reportSpamSubmission(submissionId: string, reportReason: ReportReason): Promise<ReportSpamSubmissionResponse>;
  /**
   * Report multiple submissions as spam. The spam submission reports is created, and the submissions is deleted.
   * @param formId - Id of the form to which belong submissions to report as spam.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @requiredField options.reportReason
   * @requiredField options.submissionIds
   * @adminMethod
   */
  function bulkReportSpamSubmission(formId: string, options?: BulkReportSpamSubmissionOptions): Promise<BulkReportSpamSubmissionResponse>;
  interface BulkReportSpamSubmissionOptions {
      /** Ids of the submissions to report as spam. */
      submissionIds: string[];
      /** Identifies the reason why the submission was reported as spam. */
      reportReason: ReportReason;
      /** When set, items will be returned on successful report */
      returnEntity?: boolean;
  }
  /**
   * Query form spam submission reports using [WQL - Wix Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function queryFormSpamSubmissionReportsByNamespace(): FormSpamSubmissionReportsQueryBuilder;
  interface QueryCursorResult$1 {
      cursors: Cursors$1;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface FormSpamSubmissionReportsQueryResult extends QueryCursorResult$1 {
      items: FormSpamSubmissionReport[];
      query: FormSpamSubmissionReportsQueryBuilder;
      next: () => Promise<FormSpamSubmissionReportsQueryResult>;
      prev: () => Promise<FormSpamSubmissionReportsQueryResult>;
  }
  interface FormSpamSubmissionReportsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | 'formId' | 'namespace' | 'reportReason' | '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | 'formId' | 'reportReason' | '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'formId' | 'reportReason' | '_createdDate' | 'reportedDate', value: any) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_id' | 'formId' | 'reportReason' | '_createdDate' | 'reportedDate'>) => FormSpamSubmissionReportsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_id' | 'formId' | 'reportReason' | '_createdDate' | 'reportedDate'>) => FormSpamSubmissionReportsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => FormSpamSubmissionReportsQueryBuilder;
      /** @param cursor - A pointer to specific record
       * @documentationMaturity preview
       */
      skipTo: (cursor: string) => FormSpamSubmissionReportsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<FormSpamSubmissionReportsQueryResult>;
  }
  /**
   * Counts the number of spam submission reports belonging to the specified forms.
   * @param formIds - Form IDs.
   * @param namespace - Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint.
   * @public
   * @documentationMaturity preview
   * @requiredField formIds
   * @requiredField namespace
   * @adminMethod
   */
  function countFormSpamSubmissionReports(formIds: string[], namespace: string): Promise<CountFormSpamSubmissionReportsResponse>;
  
  type formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReport = FormSpamSubmissionReport;
  type formsV4FormSpamSubmissionReport_universal_d_ReportReason = ReportReason;
  const formsV4FormSpamSubmissionReport_universal_d_ReportReason: typeof ReportReason;
  type formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportOrderDetails = FormSpamSubmissionReportOrderDetails;
  type formsV4FormSpamSubmissionReport_universal_d_CheckForSpamRequest = CheckForSpamRequest;
  type formsV4FormSpamSubmissionReport_universal_d_CheckForSpamResponse = CheckForSpamResponse;
  type formsV4FormSpamSubmissionReport_universal_d_SpamReport = SpamReport;
  type formsV4FormSpamSubmissionReport_universal_d_CreateFormSpamSubmissionReportRequest = CreateFormSpamSubmissionReportRequest;
  type formsV4FormSpamSubmissionReport_universal_d_CreateFormSpamSubmissionReportResponse = CreateFormSpamSubmissionReportResponse;
  type formsV4FormSpamSubmissionReport_universal_d_GetFormSpamSubmissionReportRequest = GetFormSpamSubmissionReportRequest;
  type formsV4FormSpamSubmissionReport_universal_d_GetFormSpamSubmissionReportResponse = GetFormSpamSubmissionReportResponse;
  type formsV4FormSpamSubmissionReport_universal_d_DeleteFormSpamSubmissionReportRequest = DeleteFormSpamSubmissionReportRequest;
  type formsV4FormSpamSubmissionReport_universal_d_DeleteFormSpamSubmissionReportResponse = DeleteFormSpamSubmissionReportResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportRequest = BulkDeleteFormSpamSubmissionReportRequest;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportResponse = BulkDeleteFormSpamSubmissionReportResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportResult = BulkDeleteFormSpamSubmissionReportResult;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportByFilterRequest = BulkDeleteFormSpamSubmissionReportByFilterRequest;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportByFilterResponse = BulkDeleteFormSpamSubmissionReportByFilterResponse;
  type formsV4FormSpamSubmissionReport_universal_d_ReportNotSpamSubmissionRequest = ReportNotSpamSubmissionRequest;
  type formsV4FormSpamSubmissionReport_universal_d_ReportNotSpamSubmissionResponse = ReportNotSpamSubmissionResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionRequest = BulkReportNotSpamSubmissionRequest;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionResponse = BulkReportNotSpamSubmissionResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionResult = BulkReportNotSpamSubmissionResult;
  type formsV4FormSpamSubmissionReport_universal_d_ReportSpamSubmissionRequest = ReportSpamSubmissionRequest;
  type formsV4FormSpamSubmissionReport_universal_d_ReportSpamSubmissionResponse = ReportSpamSubmissionResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionRequest = BulkReportSpamSubmissionRequest;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionResponse = BulkReportSpamSubmissionResponse;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionResult = BulkReportSpamSubmissionResult;
  type formsV4FormSpamSubmissionReport_universal_d_QueryFormSpamSubmissionReportsByNamespaceRequest = QueryFormSpamSubmissionReportsByNamespaceRequest;
  type formsV4FormSpamSubmissionReport_universal_d_QueryFormSpamSubmissionReportsByNamespaceResponse = QueryFormSpamSubmissionReportsByNamespaceResponse;
  type formsV4FormSpamSubmissionReport_universal_d_CountFormSpamSubmissionReportsRequest = CountFormSpamSubmissionReportsRequest;
  type formsV4FormSpamSubmissionReport_universal_d_CountFormSpamSubmissionReportsResponse = CountFormSpamSubmissionReportsResponse;
  type formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsCount = FormSpamSubmissionReportsCount;
  const formsV4FormSpamSubmissionReport_universal_d_checkForSpam: typeof checkForSpam;
  const formsV4FormSpamSubmissionReport_universal_d_createFormSpamSubmissionReport: typeof createFormSpamSubmissionReport;
  const formsV4FormSpamSubmissionReport_universal_d_getFormSpamSubmissionReport: typeof getFormSpamSubmissionReport;
  const formsV4FormSpamSubmissionReport_universal_d_deleteFormSpamSubmissionReport: typeof deleteFormSpamSubmissionReport;
  const formsV4FormSpamSubmissionReport_universal_d_bulkDeleteFormSpamSubmissionReport: typeof bulkDeleteFormSpamSubmissionReport;
  type formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportOptions = BulkDeleteFormSpamSubmissionReportOptions;
  const formsV4FormSpamSubmissionReport_universal_d_bulkDeleteFormSpamSubmissionReportByFilter: typeof bulkDeleteFormSpamSubmissionReportByFilter;
  const formsV4FormSpamSubmissionReport_universal_d_reportNotSpamSubmission: typeof reportNotSpamSubmission;
  const formsV4FormSpamSubmissionReport_universal_d_bulkReportNotSpamSubmission: typeof bulkReportNotSpamSubmission;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionOptions = BulkReportNotSpamSubmissionOptions;
  const formsV4FormSpamSubmissionReport_universal_d_reportSpamSubmission: typeof reportSpamSubmission;
  const formsV4FormSpamSubmissionReport_universal_d_bulkReportSpamSubmission: typeof bulkReportSpamSubmission;
  type formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionOptions = BulkReportSpamSubmissionOptions;
  const formsV4FormSpamSubmissionReport_universal_d_queryFormSpamSubmissionReportsByNamespace: typeof queryFormSpamSubmissionReportsByNamespace;
  type formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsQueryResult = FormSpamSubmissionReportsQueryResult;
  type formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsQueryBuilder = FormSpamSubmissionReportsQueryBuilder;
  const formsV4FormSpamSubmissionReport_universal_d_countFormSpamSubmissionReports: typeof countFormSpamSubmissionReports;
  namespace formsV4FormSpamSubmissionReport_universal_d {
    export {
      formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReport as FormSpamSubmissionReport,
      Submitter$1 as Submitter,
      SubmitterSubmitterOneOf$1 as SubmitterSubmitterOneOf,
      formsV4FormSpamSubmissionReport_universal_d_ReportReason as ReportReason,
      ExtendedFields$1 as ExtendedFields,
      SubmissionStatus$1 as SubmissionStatus,
      formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportOrderDetails as FormSpamSubmissionReportOrderDetails,
      formsV4FormSpamSubmissionReport_universal_d_CheckForSpamRequest as CheckForSpamRequest,
      FormSubmission$1 as FormSubmission,
      OrderDetails$1 as OrderDetails,
      formsV4FormSpamSubmissionReport_universal_d_CheckForSpamResponse as CheckForSpamResponse,
      formsV4FormSpamSubmissionReport_universal_d_SpamReport as SpamReport,
      formsV4FormSpamSubmissionReport_universal_d_CreateFormSpamSubmissionReportRequest as CreateFormSpamSubmissionReportRequest,
      formsV4FormSpamSubmissionReport_universal_d_CreateFormSpamSubmissionReportResponse as CreateFormSpamSubmissionReportResponse,
      formsV4FormSpamSubmissionReport_universal_d_GetFormSpamSubmissionReportRequest as GetFormSpamSubmissionReportRequest,
      formsV4FormSpamSubmissionReport_universal_d_GetFormSpamSubmissionReportResponse as GetFormSpamSubmissionReportResponse,
      formsV4FormSpamSubmissionReport_universal_d_DeleteFormSpamSubmissionReportRequest as DeleteFormSpamSubmissionReportRequest,
      formsV4FormSpamSubmissionReport_universal_d_DeleteFormSpamSubmissionReportResponse as DeleteFormSpamSubmissionReportResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportRequest as BulkDeleteFormSpamSubmissionReportRequest,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportResponse as BulkDeleteFormSpamSubmissionReportResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportResult as BulkDeleteFormSpamSubmissionReportResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportByFilterRequest as BulkDeleteFormSpamSubmissionReportByFilterRequest,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportByFilterResponse as BulkDeleteFormSpamSubmissionReportByFilterResponse,
      formsV4FormSpamSubmissionReport_universal_d_ReportNotSpamSubmissionRequest as ReportNotSpamSubmissionRequest,
      formsV4FormSpamSubmissionReport_universal_d_ReportNotSpamSubmissionResponse as ReportNotSpamSubmissionResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionRequest as BulkReportNotSpamSubmissionRequest,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionResponse as BulkReportNotSpamSubmissionResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionResult as BulkReportNotSpamSubmissionResult,
      formsV4FormSpamSubmissionReport_universal_d_ReportSpamSubmissionRequest as ReportSpamSubmissionRequest,
      formsV4FormSpamSubmissionReport_universal_d_ReportSpamSubmissionResponse as ReportSpamSubmissionResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionRequest as BulkReportSpamSubmissionRequest,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionResponse as BulkReportSpamSubmissionResponse,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionResult as BulkReportSpamSubmissionResult,
      formsV4FormSpamSubmissionReport_universal_d_QueryFormSpamSubmissionReportsByNamespaceRequest as QueryFormSpamSubmissionReportsByNamespaceRequest,
      CursorQuery$1 as CursorQuery,
      CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      formsV4FormSpamSubmissionReport_universal_d_QueryFormSpamSubmissionReportsByNamespaceResponse as QueryFormSpamSubmissionReportsByNamespaceResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      formsV4FormSpamSubmissionReport_universal_d_CountFormSpamSubmissionReportsRequest as CountFormSpamSubmissionReportsRequest,
      formsV4FormSpamSubmissionReport_universal_d_CountFormSpamSubmissionReportsResponse as CountFormSpamSubmissionReportsResponse,
      formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsCount as FormSpamSubmissionReportsCount,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      Empty$1 as Empty,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      formsV4FormSpamSubmissionReport_universal_d_checkForSpam as checkForSpam,
      formsV4FormSpamSubmissionReport_universal_d_createFormSpamSubmissionReport as createFormSpamSubmissionReport,
      formsV4FormSpamSubmissionReport_universal_d_getFormSpamSubmissionReport as getFormSpamSubmissionReport,
      formsV4FormSpamSubmissionReport_universal_d_deleteFormSpamSubmissionReport as deleteFormSpamSubmissionReport,
      formsV4FormSpamSubmissionReport_universal_d_bulkDeleteFormSpamSubmissionReport as bulkDeleteFormSpamSubmissionReport,
      formsV4FormSpamSubmissionReport_universal_d_BulkDeleteFormSpamSubmissionReportOptions as BulkDeleteFormSpamSubmissionReportOptions,
      formsV4FormSpamSubmissionReport_universal_d_bulkDeleteFormSpamSubmissionReportByFilter as bulkDeleteFormSpamSubmissionReportByFilter,
      formsV4FormSpamSubmissionReport_universal_d_reportNotSpamSubmission as reportNotSpamSubmission,
      formsV4FormSpamSubmissionReport_universal_d_bulkReportNotSpamSubmission as bulkReportNotSpamSubmission,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportNotSpamSubmissionOptions as BulkReportNotSpamSubmissionOptions,
      formsV4FormSpamSubmissionReport_universal_d_reportSpamSubmission as reportSpamSubmission,
      formsV4FormSpamSubmissionReport_universal_d_bulkReportSpamSubmission as bulkReportSpamSubmission,
      formsV4FormSpamSubmissionReport_universal_d_BulkReportSpamSubmissionOptions as BulkReportSpamSubmissionOptions,
      formsV4FormSpamSubmissionReport_universal_d_queryFormSpamSubmissionReportsByNamespace as queryFormSpamSubmissionReportsByNamespace,
      formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsQueryResult as FormSpamSubmissionReportsQueryResult,
      formsV4FormSpamSubmissionReport_universal_d_FormSpamSubmissionReportsQueryBuilder as FormSpamSubmissionReportsQueryBuilder,
      formsV4FormSpamSubmissionReport_universal_d_countFormSpamSubmissionReports as countFormSpamSubmissionReports,
    };
  }
  
  /** Form submission that was created or retrieved. */
  interface FormSubmission {
      /**
       * Submission ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the form which the submission belongs to. */
      formId?: string;
      /**
       * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
       * @readonly
       */
      namespace?: string;
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      status?: SubmissionStatus;
      /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the form submission was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
       * @readonly
       */
      revision?: string | null;
      /**
       * ID of the visitor that submitted the form.
       * @readonly
       */
      submitter?: Submitter;
      /** Whether a site owner marked a submission as "seen". */
      seen?: boolean;
      /** Data extension object that holds users' and apps' fields. */
      extendedFields?: ExtendedFields;
      /**
       * Order details. <br>
       * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
       */
      orderDetails?: OrderDetails;
      /**
       * Contact ID. Member who created the submission, or a mapped contact.
       * @readonly
       */
      contactId?: string | null;
  }
  enum SubmissionStatus {
      UNDEFINED = "UNDEFINED",
      PENDING = "PENDING",
      CONFIRMED = "CONFIRMED",
      PAYMENT_WAITING = "PAYMENT_WAITING",
      PAYMENT_CANCELED = "PAYMENT_CANCELED"
  }
  interface Submitter extends SubmitterSubmitterOneOf {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
  }
  /** @oneof */
  interface SubmitterSubmitterOneOf {
      /** Member ID. */
      memberId?: string | null;
      /** Visitor ID. */
      visitorId?: string | null;
      /** Application ID. */
      applicationId?: string | null;
      /** User ID. */
      userId?: string | null;
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
  interface OrderDetails {
      /**
       * ID of the order related to submission (only applicable if a form has payments).
       * @readonly
       */
      orderId?: string | null;
      /**
       * Order number.
       * @readonly
       */
      number?: string | null;
      /**
       * Currency.
       * @readonly
       */
      currency?: string | null;
      /**
       * Item subtotal.
       * @readonly
       */
      itemSubtotal?: string;
      /**
       * ID of the checkout related to submission (only applicable if a form has payments).
       * @readonly
       */
      checkoutId?: string;
  }
  interface CreateSubmissionRequest {
      /** Submission to create. */
      submission: FormSubmission;
      /** Captcha token. */
      captchaToken?: string | null;
  }
  interface CreateSubmissionResponse {
      /** The created submission. */
      submission?: FormSubmission;
  }
  interface CreateSubmissionBySubmitterRequest {
      /** Submission to create. */
      submission: FormSubmission;
      /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
      repeatedCreation?: boolean;
      /** Validation will be mode is more forgiving, for example "required" won't be validated. */
      lenientValidation?: boolean;
  }
  interface CreateSubmissionBySubmitterResponse {
      /** The created submission. */
      submission?: FormSubmission;
  }
  interface BulkCreateSubmissionBySubmitterRequest {
      /** Form id. Restricts submissions creation for a single form. */
      formId: string;
      /**
       * Submissions to create.
       * Deprecated
       */
      submissions?: FormSubmission[];
      /** When set, items will be returned on successful create. */
      returnEntity?: boolean;
      /** Submissions data to create. */
      submissionsV2?: BulkCreateSubmissionBySubmitterData[];
      /** Validation will be mode is more forgiving, for example "required" won't be validated. */
      lenientValidation?: boolean;
  }
  interface BulkCreateSubmissionBySubmitterData {
      /** Submissions to create. */
      submission?: FormSubmission;
      /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
      repeatedCreation?: boolean;
  }
  interface BulkCreateSubmissionBySubmitterResponse {
      /** Created submissions with metadata */
      results?: BulkSubmissionResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkSubmissionResult {
      /** Created submission metadata */
      itemMetadata?: ItemMetadata;
      /** The created submission. */
      item?: FormSubmission;
  }
  interface ItemMetadata {
      /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
      _id?: string | null;
      /** Index of the item within the request array. Allows for correlation between request and response items. */
      originalIndex?: number;
      /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
      success?: boolean;
      /** Details about the error in case of failure. */
      error?: ApplicationError;
  }
  interface ApplicationError {
      /** Error code. */
      code?: string;
      /** Description of the error. */
      description?: string;
      /** Data related to the error. */
      data?: Record<string, any> | null;
  }
  interface BulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GetSubmissionRequest {
      /** ID of the submission to retrieve. */
      submissionId: string;
  }
  interface GetSubmissionResponse {
      /** The retrieved submission. */
      submission?: FormSubmission;
  }
  interface GetSubmissionByCheckoutIdRequest {
      /** Checkout ID of the submission to retrieve. */
      checkoutId: string;
  }
  interface GetSubmissionByCheckoutIdResponse {
      /** The retrieved submission. */
      submission?: FormSubmission;
  }
  interface UpdateSubmissionRequest {
      /** Submission to update. */
      submission: FormSubmission;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateSubmissionResponse {
      /** The updated submission. */
      submission?: FormSubmission;
  }
  interface ConfirmSubmissionRequest {
      /** Submission ID to confirm. */
      submissionId: string;
  }
  interface ConfirmSubmissionResponse {
      /** The confirmed submission. */
      submission?: FormSubmission;
  }
  interface FormSubmissionStatusUpdatedEvent {
      /** Updated submission. */
      submission?: FormSubmission;
      /** Previous status of the submission. */
      previousStatus?: SubmissionStatus;
  }
  interface DeleteSubmissionRequest {
      /** ID of the submission to delete. */
      submissionId: string;
      /**
       * Delete the submission, bypassing the trash bin. This means that the submission is permanently deleted and cannot be restored.
       *
       *
       * Default: `false`
       */
      permanent?: boolean;
      /** Whether to preserve files, associated with the submission. If the value is `false`, then the files are deleted after 210 days. */
      preserveFiles?: boolean;
  }
  interface DeleteSubmissionResponse {
  }
  interface BulkDeleteSubmissionRequest {
      /** Form ID. */
      formId: string;
      /** Submission ids. */
      submissionIds?: string[];
      /**
       * Delete submission bypassing trash-bin
       * Default: false
       */
      permanent?: boolean;
      /** Preserve files. */
      preserveFiles?: boolean;
  }
  interface BulkDeleteSubmissionResponse {
      /** Results of bulk submission delete */
      results?: BulkDeleteSubmissionResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkDeleteSubmissionResult {
      /** Deleted item metadata */
      itemMetadata?: ItemMetadata;
  }
  interface RestoreSubmissionFromTrashBinRequest {
      /** ID of the submission to restore. */
      submissionId: string;
  }
  interface RestoreSubmissionFromTrashBinResponse {
      /** The restored submission. */
      submission?: FormSubmission;
  }
  interface RemoveSubmissionFromTrashBinRequest {
      /** ID of the submission to restore. */
      submissionId: string;
  }
  interface RemoveSubmissionFromTrashBinResponse {
  }
  interface RemovedSubmissionFromTrash {
      /** Removed submission. */
      submission?: FormSubmission;
  }
  interface BulkRemoveSubmissionFromTrashBinRequest {
      /** Form ID. */
      formId: string;
      /** Submission ids. */
      submissionIds?: string[];
  }
  interface BulkRemoveSubmissionFromTrashBinResponse {
      /** Results of bulk submission removal from trash */
      results?: BulkRemoveSubmissionFromTrashBinResult[];
      /** Metadata of request */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkRemoveSubmissionFromTrashBinResult {
      /** Deleted item metadata */
      itemMetadata?: ItemMetadata;
  }
  interface ListDeletedSubmissionsRequest {
      /** Form ID. */
      formId: string;
      /** Submission ids. */
      submissionIds?: string[];
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not filter or `order`. */
      paging?: CursorPaging;
      /**
       * List of statuses of submissions which should be returned
       * Default: CONFIRMED
       */
      statuses?: SubmissionStatus[];
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
  interface ListDeletedSubmissionsResponse {
      /** The retrieved Submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
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
  interface GetDeletedSubmissionRequest {
      /** Submission id. */
      submissionId: string;
  }
  interface GetDeletedSubmissionResponse {
      /** The retrieved Submission. */
      submission?: FormSubmission;
  }
  interface QuerySubmissionRequest {
      /** Query options. */
      query: CursorQuery;
      /**
       * Renamed to only_your_own;
       * @internal
       */
      onlyOwn?: boolean;
      /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
      onlyYourOwn?: boolean;
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
  interface QuerySubmissionResponse {
      /** The retrieved submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface SearchSubmissionsByNamespaceRequest {
      /** Query options. */
      search: CursorSearch;
  }
  interface CursorSearch extends CursorSearchPagingMethodOneOf {
      /**
       * Cursor pointing to page of results.
       * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
       */
      cursorPaging?: CursorPaging;
      /** A filter object. See documentation [here](https://bo.wix.com/wix-docs/rnd/platformization-guidelines/api-query-language#platformization-guidelines_api-query-language_defining-in-protobuf) */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: Sorting[];
      /** Free text to match in searchable fields */
      search?: SearchDetails;
  }
  /** @oneof */
  interface CursorSearchPagingMethodOneOf {
      /**
       * Cursor pointing to page of results.
       * When requesting 'cursor_paging.cursor', no `filter`, `sort` or `search` can be provided.
       */
      cursorPaging?: CursorPaging;
  }
  interface SearchDetails {
      /** Defines how separate search terms in `expression` are combined */
      mode?: Mode;
      /** Search term or expression */
      expression?: string | null;
      /** Flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
      fuzzy?: boolean;
  }
  enum Mode {
      /** Any of the search terms must be present */
      OR = "OR",
      /** All search terms must be present */
      AND = "AND"
  }
  interface SearchSubmissionsByNamespaceResponse {
      /** The retrieved Submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface SearchSubmissionsByNamespaceForExportRequest {
      /** Query options. */
      query: CursorQuery;
  }
  interface SearchSubmissionsByNamespaceForExportResponse {
      /** The retrieved Submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface QuerySubmissionsByNamespaceRequest {
      /** Query options. */
      query: CursorQuery;
      /**
       * Renamed to only_your_own;
       * @internal
       */
      onlyOwn?: boolean;
      /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
      onlyYourOwn?: boolean;
  }
  interface QuerySubmissionsByNamespaceResponse {
      /** The retrieved Submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface QuerySubmissionsByNamespaceForExportRequest {
      /** Query options. */
      query: CursorQuery;
  }
  interface QuerySubmissionsByNamespaceForExportResponse {
      /** The retrieved Submissions. */
      submissions?: FormSubmission[];
      /** Paging metadata. */
      metadata?: CursorPagingMetadata;
  }
  interface CountSubmissionsByFilterRequest {
      /** A filter object. Must filter by namespace. */
      filter: Record<string, any> | null;
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
  }
  interface CountSubmissionsByFilterResponse {
      /** Forms submission count. */
      formsSubmissionsCount?: FormSubmissionsCount[];
  }
  interface FormSubmissionsCount {
      /** Form ID. */
      formId?: string;
      /** Total number of submissions. */
      totalCount?: number;
      /** Number of submissions that the site owner hasn't seen yet. */
      unseenCount?: number;
  }
  interface CountSubmissionsRequest {
      /** Form IDs which submissions should be counted. */
      formIds: string[];
      /** The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `getSubmission()` to retrieve the namespace. */
      namespace: string;
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      statuses?: SubmissionStatus[];
  }
  interface CountSubmissionsResponse {
      /** Forms submission count. */
      formsSubmissionsCount?: FormSubmissionsCount[];
  }
  interface CountDeletedSubmissionsRequest {
      /** Form IDs. */
      formIds: string[];
      /** Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint. */
      namespace: string;
      /**
       * List of statuses of submissions which should be taken into count
       * Default: CONFIRMED, PAYMENT_WAITING, PAYMENT_CANCELED
       */
      statuses?: SubmissionStatus[];
  }
  interface CountDeletedSubmissionsResponse {
      /** Forms submission count. */
      formsDeletedSubmissionsCount?: FormDeletedSubmissionsCount[];
  }
  interface FormDeletedSubmissionsCount {
      /** Form ID. */
      formId?: string;
      /** Total number of submissions. */
      totalCount?: number;
  }
  interface GetMediaUploadURLRequest {
      /** Form ID. */
      formId: string;
      /** Name of file to upload. */
      filename: string;
      /**
       * [Mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#) of file to upload.
       *
       * For example, `'image/png'`
       */
      mimeType: string;
  }
  interface GetMediaUploadURLResponse {
      /** Url to upload file. */
      uploadUrl?: string;
      /**
       * Flag identifying is url generated by media platform, rather than media manager
       * @internal
       */
      generatedByMediaPlatform?: boolean;
  }
  interface BulkMarkSubmissionsAsSeenRequest {
      /** Submission IDs to mark as seen. */
      ids: string[];
      /** ID of the form which the submissions belong to. */
      formId: string;
  }
  interface BulkMarkSubmissionsAsSeenResponse {
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
  interface Empty {
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
  interface UpsertContactFromSubmissionRequest {
      /** Submission from which contact needs to be upserted. */
      submissionId: string;
      /** Optional contact id to which submission should be mapped. */
      contactId?: string | null;
      /** Indicates contact has verified primary email. */
      emailVerified?: boolean;
  }
  interface UpsertContactFromSubmissionResponse {
      /** Submit contact response. */
      submitContactResponse?: SubmitContactResponse;
  }
  interface SubmitContactResponse {
      /** ID of the contact that was found or created. */
      contactId?: string;
      /**
       * Identity type of the returned contact.
       *
       * - `CONTACT`: The returned contact ID belongs to a new or existing contact.
       * - `MEMBER`: The returned contact ID belongs to the currently logged-in site member.
       * - `NOT_AUTHENTICATED_MEMBER`: The returned contact ID belongs to a site member who is not currently logged in.
       */
      identityType?: IdentityType;
      /**
       * Indicates whether the contact was just created or already existed.
       *
       * If the contact was just created, returns `true`.
       * If it already existed, returns `false`.
       */
      newContact?: boolean;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      /** Existing or new contact */
      CONTACT = "CONTACT",
      /** Member is logged in, matching logic skipped */
      MEMBER = "MEMBER",
      /** Matching contact is a member, Merge logic won't be applied */
      NOT_AUTHENTICATED_MEMBER = "NOT_AUTHENTICATED_MEMBER"
  }
  interface SubmissionContactMapped {
      /**
       * Mapped upserted contact ID.
       * @readonly
       */
      contactId?: string;
      /** Identifies the namespace that the submission's form belongs to. */
      namespace?: string;
      /** Marketing subscription details */
      marketingSubscriptionDetails?: MarketingSubscriptionDetails;
  }
  interface MarketingSubscriptionDetails {
      /** Form id which was submitted */
      formId?: string;
      /** Mapped contact emails. */
      emails?: string[];
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      submittedDate?: Date;
      /**
       * Subscription consent opt in level, either single or double confirmation.
       * Default: SINGLE_CONFIRMATION
       */
      optInLevel?: MarketingSubscriptionDetailsOptInLevel;
  }
  enum MarketingSubscriptionDetailsOptInLevel {
      SINGLE_CONFIRMATION = "SINGLE_CONFIRMATION",
      DOUBLE_CONFIRMATION = "DOUBLE_CONFIRMATION"
  }
  interface SubmissionContactMappingSkipped {
      /** Form Id. */
      formId?: string;
      /** Identifies the namespace that the submission's form belongs to. */
      namespace?: string;
  }
  /**
   * Creates a submission.
   *
   *
   * The `createSubmission()` function is an alternative way to the [`WixFormsV2`](https://www.wix.com/velo/reference/$w/wixformsv2/submit) element for submitting a form. In this case, clicking the submit button is unnecessary, the submission is automatically created when calling this function.
   * @param submission - Submission to create.
   * @public
   * @requiredField submission
   * @requiredField submission.formId
   * @param options - Optional fields.
   */
  function createSubmission(submission: FormSubmission, options?: CreateSubmissionOptions): Promise<CreateSubmissionResponse>;
  interface CreateSubmissionOptions {
      /** Captcha token. */
      captchaToken?: string | null;
  }
  /**
   * Creates a new submission with specified submitter for a given form.
   * Internal, migration only.
   * @param submission - Submission to create.
   * @internal
   * @documentationMaturity preview
   * @requiredField submission
   * @requiredField submission.formId
   * @requiredField submission.submitter
   * @adminMethod
   * @returns The created submission.
   */
  function createSubmissionBySubmitter(submission: FormSubmission, options?: CreateSubmissionBySubmitterOptions): Promise<FormSubmission>;
  interface CreateSubmissionBySubmitterOptions {
      /** A flag indicating whether this operation is a repeated creation, such as restoring a previously manually reported as spam entity. */
      repeatedCreation?: boolean;
      /** Validation will be mode is more forgiving, for example "required" won't be validated. */
      lenientValidation?: boolean;
  }
  /**
   * Creates multiple submissions with specified submitters.
   * Internal, migration only.
   * @param formId - Form id. Restricts submissions creation for a single form.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @requiredField options.submissions.submissions
   * @requiredField options.submissions.submitter
   * @adminMethod
   */
  function bulkCreateSubmissionBySubmitter(formId: string, options?: BulkCreateSubmissionBySubmitterOptions): Promise<BulkCreateSubmissionBySubmitterResponse>;
  interface BulkCreateSubmissionBySubmitterOptions {
      /**
       * Submissions to create.
       * Deprecated
       */
      submissions?: FormSubmission[];
      /** When set, items will be returned on successful create. */
      returnEntity?: boolean;
      /** Submissions data to create. */
      submissionsV2?: BulkCreateSubmissionBySubmitterData[];
      /** Validation will be mode is more forgiving, for example "required" won't be validated. */
      lenientValidation?: boolean;
  }
  /**
   * Retrieves a submission by ID.
   * @param submissionId - ID of the submission to retrieve.
   * @public
   * @requiredField submissionId
   * @adminMethod
   */
  function getSubmission(submissionId: string): Promise<GetSubmissionResponse>;
  /**
   * Retrieves a submission by checkout ID.
   * @param checkoutId - Checkout ID of the submission to retrieve.
   * @internal
   * @documentationMaturity preview
   * @requiredField checkoutId
   * @adminMethod
   * @returns The retrieved submission.
   */
  function getSubmissionByCheckoutId(checkoutId: string): Promise<FormSubmission>;
  /**
   * Updates a submission.
   *
   *
   * Each time the submission is updated, `revision` increments by 1. The existing `revision` must be included when updating the submission. This ensures you're working with the latest submission information, and prevents unintended overwrites.
   * @param _id - Submission ID.
   * @public
   * @requiredField _id
   * @requiredField submission
   * @requiredField submission.formId
   * @requiredField submission.revision
   * @param submission - Submission to update.
   * @adminMethod
   * @returns The updated submission.
   */
  function updateSubmission(_id: string | null, submission: UpdateSubmission, options?: UpdateSubmissionOptions): Promise<FormSubmission>;
  interface UpdateSubmission {
      /**
       * Submission ID.
       * @readonly
       */
      _id?: string | null;
      /** ID of the form which the submission belongs to. */
      formId?: string;
      /**
       * The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `Get Submission` to retrieve the namespace.
       * @readonly
       */
      namespace?: string;
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      status?: SubmissionStatus;
      /** Submission values where `key` is the form field and `value` is the data submitted for the given field. */
      submissions?: Record<string, any>;
      /**
       * Date and time the form submission was created.
       * @readonly
       */
      _createdDate?: Date;
      /**
       * Date and time the form submission was updated.
       * @readonly
       */
      _updatedDate?: Date;
      /**
       * Revision number, which increments by 1 each time the form submission is updated. To prevent conflicting changes, the existing revision must be used when updating a form submission.
       * @readonly
       */
      revision?: string | null;
      /**
       * ID of the visitor that submitted the form.
       * @readonly
       */
      submitter?: Submitter;
      /** Whether a site owner marked a submission as "seen". */
      seen?: boolean;
      /** Data extension object that holds users' and apps' fields. */
      extendedFields?: ExtendedFields;
      /**
       * Order details. <br>
       * <b>Note</b>: This object is only applicable when submittng a form in the Wix Payments app.
       */
      orderDetails?: OrderDetails;
      /**
       * Contact ID. Member who created the submission, or a mapped contact.
       * @readonly
       */
      contactId?: string | null;
  }
  interface UpdateSubmissionOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Confirms a submission.
   *
   *
   * You can only confirm a submission that has a `PENDING` status.
   * When using forms from the [Wix Pricing Plans](https://www.wix.com/app-market/paid-plans?referral=collection&appIndex=42&referralTag=made-by-wix&referralSectionName=made-by-wix) app, the default submission status is `PENDING`.
   * When using forms from the [Wix Forms]() app, the default form submission status is `CONFIRMED`. You can change the default status for individual submissions using the `updateSubmission()` method.
   * @param submissionId - Submission ID to confirm.
   * @public
   * @requiredField submissionId
   * @adminMethod
   */
  function confirmSubmission(submissionId: string): Promise<ConfirmSubmissionResponse>;
  /**
   * Deletes a submission.
   *
   *
   * This function moves the form submission into the trash bin. To delete the submission permanently, change the default `permanent` field value to `true.`
   * @param submissionId - ID of the submission to delete.
   * @public
   * @requiredField submissionId
   * @param options - Optional fields.
   * @adminMethod
   */
  function deleteSubmission(submissionId: string, options?: DeleteSubmissionOptions): Promise<void>;
  interface DeleteSubmissionOptions {
      /**
       * Delete the submission, bypassing the trash bin. This means that the submission is permanently delete and cannot be restored.
       *
       *
       * Default: `false`
       */
      permanent?: boolean;
      /** Whether to preserve files, associated with the submission. If the value is `false`, then the files are deleted after 210 days. */
      preserveFiles?: boolean;
  }
  /**
   * Deletes submissions by IDS for specific form.
   * @param formId - Form ID.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @adminMethod
   */
  function bulkDeleteSubmission(formId: string, options?: BulkDeleteSubmissionOptions): Promise<BulkDeleteSubmissionResponse>;
  interface BulkDeleteSubmissionOptions {
      /** Submission ids. */
      submissionIds?: string[];
      /**
       * Delete submission bypassing trash-bin
       * Default: false
       */
      permanent?: boolean;
      /** Preserve files. */
      preserveFiles?: boolean;
  }
  /**
   * Restores deleted submission
   * @param submissionId - ID of the submission to restore.
   * @public
   * @documentationMaturity preview
   * @requiredField submissionId
   * @adminMethod
   */
  function restoreSubmissionFromTrashBin(submissionId: string): Promise<RestoreSubmissionFromTrashBinResponse>;
  /**
   * Remove deleted submission
   * @param submissionId - ID of the submission to restore.
   * @public
   * @documentationMaturity preview
   * @requiredField submissionId
   * @adminMethod
   */
  function removeSubmissionFromTrashBin(submissionId: string): Promise<void>;
  /**
   * Remove multiple deleted submissions
   * @param formId - Form ID.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @adminMethod
   */
  function bulkRemoveSubmissionFromTrashBin(formId: string, options?: BulkRemoveSubmissionFromTrashBinOptions): Promise<BulkRemoveSubmissionFromTrashBinResponse>;
  interface BulkRemoveSubmissionFromTrashBinOptions {
      /** Submission ids. */
      submissionIds?: string[];
  }
  /**
   * List deleted submissions
   * @param formId - Form ID.
   * @public
   * @documentationMaturity preview
   * @requiredField formId
   * @adminMethod
   */
  function listDeletedSubmissions(formId: string, options?: ListDeletedSubmissionsOptions): Promise<ListDeletedSubmissionsResponse>;
  interface ListDeletedSubmissionsOptions {
      /** Submission ids. */
      submissionIds?: string[];
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not filter or `order`. */
      paging?: CursorPaging;
      /**
       * List of statuses of submissions which should be returned
       * Default: CONFIRMED
       */
      statuses?: SubmissionStatus[];
  }
  /**
   * Get deleted submission
   * @param submissionId - Submission id.
   * @public
   * @documentationMaturity preview
   * @requiredField submissionId
   * @adminMethod
   */
  function getDeletedSubmission(submissionId: string): Promise<GetDeletedSubmissionResponse>;
  /**
   * Deprecated on '2023-08-08'. Use QuerySubmissionsByNamespace.
   * @param query - Query options.
   * @public
   * @documentationMaturity preview
   * @requiredField query
   * @adminMethod
   * @deprecated
   * @replacedBy com.wixpress.forms.v4.FormSubmissionService.QuerySubmissionsByNamespace
   * @targetRemovalDate 2025-01-11
   */
  function querySubmission(query: CursorQuery, options?: QuerySubmissionOptions): Promise<QuerySubmissionResponse>;
  interface QuerySubmissionOptions {
      /**
       * Renamed to only_your_own;
       * @internal
       */
      onlyOwn?: boolean;
      /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
      onlyYourOwn?: boolean;
  }
  /**
   * > **Note:** The Form Submission API only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
   * <br>
   *
   * Returns a list of up to 100 submissions, given the provided paging, filtering, and sorting.
   *
   * You can only query submissions from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
   *
   * For field support for filters and sorting, see [Form Submissions: Supported Filters and Sorting](https://dev.wix.com/docs/rest/api-reference/wix-forms/form-submissions/sort-and-filter).option
   *
   * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language), [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination), and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @param search - Query options.
   * @public
   * @documentationMaturity preview
   * @requiredField search
   * @adminMethod
   */
  function searchSubmissionsByNamespace(search: CursorSearch): Promise<SearchSubmissionsByNamespaceResponse>;
  /**
   * > **Note:** The Form Submission API only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
   * <br>
   *
   * Returns a list of up to 100 submissions, given the provided paging, filtering, and sorting.
   *
   * You can only query submissions from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
   *
   * For field support for filters and sorting, see [Form Submissions: Supported Filters and Sorting](https://dev.wix.com/docs/rest/api-reference/wix-forms/form-submissions/sort-and-filter).option
   *
   * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language), [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination), and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @param query - Query options.
   * @internal
   * @documentationMaturity preview
   * @requiredField query
   * @adminMethod
   */
  function searchSubmissionsByNamespaceForExport(query: CursorQuery): Promise<SearchSubmissionsByNamespaceForExportResponse>;
  /**
   * Creates a query to retrieve a list of submissions.
   *
   *
   * The `querySubmissionsByNamespace()` method builds a query to retrieve a list of submissions from the specified namespace and returns a [`SubmissionsQueryBuilder`](#submissionsquerybuilder) object.
   * >**Note:** You can only query submissions from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
   *
   * The returned object contains the query definition, which is typically used to run the query using the [`find()`](#submissionsquerybuilder/find) method.
   *
   * You can refine the query by chaining `SubmissionsQueryBuilder` methods onto the query. `SubmissionsQueryBuilder` methods enable you to sort, filter, and control the results that `querySubmissionsByNamespace()` returns.
   *
   * The following `SubmissionsQueryBuilder` methods are supported for `querySubmissionsByNamespace()`. For a full description of the Submissions object, see the object returned for the [`items`](#submissionsqueryresult/items) property in [`SubmissionsQueryResult`](#submissionsqueryresult).
   * @public
   * @param options - Query options.
   * @adminMethod
   */
  function querySubmissionsByNamespace(options?: QuerySubmissionsByNamespaceOptions): SubmissionsQueryBuilder;
  interface QuerySubmissionsByNamespaceOptions {
      /**
       * Renamed to only_your_own;
       * @internal
       */
      onlyOwn?: boolean | undefined;
      /** Whether to return only your own submissions. If `false`, returns all submissions based on query filters. */
      onlyYourOwn?: boolean | undefined;
  }
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface SubmissionsQueryResult extends QueryCursorResult {
      items: FormSubmission[];
      query: SubmissionsQueryBuilder;
      next: () => Promise<SubmissionsQueryResult>;
      prev: () => Promise<SubmissionsQueryResult>;
  }
  interface SubmissionsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      eq: (propertyName: '_id' | 'formId' | 'namespace' | 'status' | '_createdDate' | '_updatedDate' | 'seen', value: any) => SubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ne: (propertyName: '_id' | 'formId' | 'status' | '_createdDate' | '_updatedDate' | 'seen', value: any) => SubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => SubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => SubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => SubmissionsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => SubmissionsQueryBuilder;
      in: (propertyName: '_id' | 'formId' | 'status' | '_createdDate' | '_updatedDate', value: any) => SubmissionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      ascending: (...propertyNames: Array<'_id' | 'formId' | 'status' | '_createdDate' | '_updatedDate' | 'seen'>) => SubmissionsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      descending: (...propertyNames: Array<'_id' | 'formId' | 'status' | '_createdDate' | '_updatedDate' | 'seen'>) => SubmissionsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
      limit: (limit: number) => SubmissionsQueryBuilder;
      /** @param cursor - A pointer to specific record */
      skipTo: (cursor: string) => SubmissionsQueryBuilder;
      find: () => Promise<SubmissionsQueryResult>;
  }
  /**
   * Returns a list of up to 100 submissions, given the provided paging, filtering, and sorting.
   *
   * You can only query submissions for export from a specified namespace. Use the query filter on the `namespace` field, otherwise you will receive an error.
   *
   * For field support for filters and sorting, see [Form Submissions: Supported Filters and Sorting](https://dev.wix.com/docs/rest/api-reference/wix-forms/form-submissions/sort-and-filter).option
   *
   * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language), [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination), and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
   * @param query - Query options.
   * @internal
   * @documentationMaturity preview
   * @requiredField query
   * @adminMethod
   */
  function querySubmissionsByNamespaceForExport(query: CursorQuery): Promise<QuerySubmissionsByNamespaceForExportResponse>;
  /**
   * > **Note:** The Form Submission API only works with the Wix Forms app. Call [GetAppInstance](https://dev.wix.com/docs/rest/api-reference/app-management/apps/app-instance/get-app-instance) to confirm that the app named `wix_forms` is installed on the site.
   * <br>
   * Counts the number of submissions belonging to forms that were filtered and contain a provided expression.
   * @param filter - A filter object. Must filter by namespace.
   * @public
   * @documentationMaturity preview
   * @requiredField filter
   * @adminMethod
   */
  function countSubmissionsByFilter(filter: Record<string, any> | null, options?: CountSubmissionsByFilterOptions): Promise<CountSubmissionsByFilterResponse>;
  interface CountSubmissionsByFilterOptions {
      /** Free text to match in searchable fields. */
      search?: SearchDetails;
  }
  /**
   * Counts the number of submissions belonging to the specified forms.
   *
   *
   * The `countSubmissions()` function is useful for analytics and tracking purposes. For example, if you have a contact form on your website, you can use this function to track how many submissions it receives daily, weekly, or monthly.
   * @public
   * @requiredField formIds
   * @requiredField namespace
   * @param namespace - The app which the form submissions belong to. For example, the namespace for the Wix Forms app is `wix.form_app.form`. Call `getSubmission()` to retrieve the namespace.
   * @param formIds - Form IDs which submissions should be counted.
   * @adminMethod
   */
  function countSubmissions(formIds: string[], namespace: string, options?: CountSubmissionsOptions): Promise<CountSubmissionsResponse>;
  interface CountSubmissionsOptions {
      /**
       * Status of the submission.
       * - `PENDING`: A submission is created, but has not yet been recorded in the Wix Forms collection.
       * - `PAYMENT_WAITING`: A form submission requiring payment is created.
       * - `PAYMENT_CANCELED`: An order of a form submission is canceled.
       * - `CONFIRMED`: A submission is recorded in the Wix Forms collection.
       */
      statuses?: SubmissionStatus[];
  }
  /**
   * > **Note:**
   * > The Submissions API is only available in the Wix Studio editor.
   *
   * Counts the number of submissions belonging to the specified forms.
   * @param formIds - Form IDs.
   * @param namespace - Identifies the app which the form submissions belong to. For example, the namespace for the Wix Forms App is `"wix.form_app.form"`. The namespace of a submission can be retrieved using the Get Submission endpoint.
   * @public
   * @documentationMaturity preview
   * @requiredField formIds
   * @requiredField namespace
   * @adminMethod
   */
  function countDeletedSubmissions(formIds: string[], namespace: string, options?: CountDeletedSubmissionsOptions): Promise<CountDeletedSubmissionsResponse>;
  interface CountDeletedSubmissionsOptions {
      /**
       * List of statuses of submissions which should be taken into count
       * Default: CONFIRMED, PAYMENT_WAITING, PAYMENT_CANCELED
       */
      statuses?: SubmissionStatus[];
  }
  /**
   * Retrieves a URL generated by the [Media Manager](https://www.wix.com/velo/reference/wix-media-v2/files/generatefileuploadurl) to use when creating a submission that includes a field for uploading files.
   * > **Note:** You need at least a [Standard Premium](https://support.wix.com/en/article/choosing-a-premium-plan) plan for your site to upload files.
   *
   *
   * To learn how external clients can use the generated upload URL to upload a file to the Media Manager, see [Upload API](https://www.wix.com/velo/reference/wix-media-v2/files/upload-api).
   * @param formId - Form ID.
   * @param filename - Name of file to upload.
   * @param mimeType - [Mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#) of file to upload.
   *
   * For example, `'image/png'`
   * @public
   * @requiredField filename
   * @requiredField formId
   * @requiredField mimeType
   */
  function getMediaUploadUrl(formId: string, filename: string, mimeType: string): Promise<GetMediaUploadURLResponse>;
  /**
   * Marks form submissions as "seen".
   *
   *
   * This function marks the submissions as if they were seen by the site owner. Only site collaborators with the **[Manage Submission](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions)** permissions can mark submissions.
   * @public
   * @requiredField formId
   * @requiredField ids
   * @param ids - IDs of submissions to mark as seen.
   * @param formId - ID of the form which the submissions belong to.
   * @adminMethod
   */
  function bulkMarkSubmissionsAsSeen(ids: string[], formId: string): Promise<void>;
  /**
   * Upserts contact from submission.
   * @param submissionId - Submission from which contact needs to be upserted.
   * @public
   * @documentationMaturity preview
   * @requiredField submissionId
   * @adminMethod
   */
  function upsertContactFromSubmission(submissionId: string, options?: UpsertContactFromSubmissionOptions): Promise<UpsertContactFromSubmissionResponse>;
  interface UpsertContactFromSubmissionOptions {
      /** Optional contact id to which submission should be mapped. */
      contactId?: string | null;
      /** Indicates contact has verified primary email. */
      emailVerified?: boolean;
  }
  
  type formsV4Submission_universal_d_FormSubmission = FormSubmission;
  type formsV4Submission_universal_d_SubmissionStatus = SubmissionStatus;
  const formsV4Submission_universal_d_SubmissionStatus: typeof SubmissionStatus;
  type formsV4Submission_universal_d_Submitter = Submitter;
  type formsV4Submission_universal_d_SubmitterSubmitterOneOf = SubmitterSubmitterOneOf;
  type formsV4Submission_universal_d_ExtendedFields = ExtendedFields;
  type formsV4Submission_universal_d_OrderDetails = OrderDetails;
  type formsV4Submission_universal_d_CreateSubmissionRequest = CreateSubmissionRequest;
  type formsV4Submission_universal_d_CreateSubmissionResponse = CreateSubmissionResponse;
  type formsV4Submission_universal_d_CreateSubmissionBySubmitterRequest = CreateSubmissionBySubmitterRequest;
  type formsV4Submission_universal_d_CreateSubmissionBySubmitterResponse = CreateSubmissionBySubmitterResponse;
  type formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterRequest = BulkCreateSubmissionBySubmitterRequest;
  type formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterData = BulkCreateSubmissionBySubmitterData;
  type formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterResponse = BulkCreateSubmissionBySubmitterResponse;
  type formsV4Submission_universal_d_BulkSubmissionResult = BulkSubmissionResult;
  type formsV4Submission_universal_d_ItemMetadata = ItemMetadata;
  type formsV4Submission_universal_d_ApplicationError = ApplicationError;
  type formsV4Submission_universal_d_BulkActionMetadata = BulkActionMetadata;
  type formsV4Submission_universal_d_GetSubmissionRequest = GetSubmissionRequest;
  type formsV4Submission_universal_d_GetSubmissionResponse = GetSubmissionResponse;
  type formsV4Submission_universal_d_GetSubmissionByCheckoutIdRequest = GetSubmissionByCheckoutIdRequest;
  type formsV4Submission_universal_d_GetSubmissionByCheckoutIdResponse = GetSubmissionByCheckoutIdResponse;
  type formsV4Submission_universal_d_UpdateSubmissionRequest = UpdateSubmissionRequest;
  type formsV4Submission_universal_d_UpdateSubmissionResponse = UpdateSubmissionResponse;
  type formsV4Submission_universal_d_ConfirmSubmissionRequest = ConfirmSubmissionRequest;
  type formsV4Submission_universal_d_ConfirmSubmissionResponse = ConfirmSubmissionResponse;
  type formsV4Submission_universal_d_FormSubmissionStatusUpdatedEvent = FormSubmissionStatusUpdatedEvent;
  type formsV4Submission_universal_d_DeleteSubmissionRequest = DeleteSubmissionRequest;
  type formsV4Submission_universal_d_DeleteSubmissionResponse = DeleteSubmissionResponse;
  type formsV4Submission_universal_d_BulkDeleteSubmissionRequest = BulkDeleteSubmissionRequest;
  type formsV4Submission_universal_d_BulkDeleteSubmissionResponse = BulkDeleteSubmissionResponse;
  type formsV4Submission_universal_d_BulkDeleteSubmissionResult = BulkDeleteSubmissionResult;
  type formsV4Submission_universal_d_RestoreSubmissionFromTrashBinRequest = RestoreSubmissionFromTrashBinRequest;
  type formsV4Submission_universal_d_RestoreSubmissionFromTrashBinResponse = RestoreSubmissionFromTrashBinResponse;
  type formsV4Submission_universal_d_RemoveSubmissionFromTrashBinRequest = RemoveSubmissionFromTrashBinRequest;
  type formsV4Submission_universal_d_RemoveSubmissionFromTrashBinResponse = RemoveSubmissionFromTrashBinResponse;
  type formsV4Submission_universal_d_RemovedSubmissionFromTrash = RemovedSubmissionFromTrash;
  type formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinRequest = BulkRemoveSubmissionFromTrashBinRequest;
  type formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinResponse = BulkRemoveSubmissionFromTrashBinResponse;
  type formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinResult = BulkRemoveSubmissionFromTrashBinResult;
  type formsV4Submission_universal_d_ListDeletedSubmissionsRequest = ListDeletedSubmissionsRequest;
  type formsV4Submission_universal_d_CursorPaging = CursorPaging;
  type formsV4Submission_universal_d_ListDeletedSubmissionsResponse = ListDeletedSubmissionsResponse;
  type formsV4Submission_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type formsV4Submission_universal_d_Cursors = Cursors;
  type formsV4Submission_universal_d_GetDeletedSubmissionRequest = GetDeletedSubmissionRequest;
  type formsV4Submission_universal_d_GetDeletedSubmissionResponse = GetDeletedSubmissionResponse;
  type formsV4Submission_universal_d_QuerySubmissionRequest = QuerySubmissionRequest;
  type formsV4Submission_universal_d_CursorQuery = CursorQuery;
  type formsV4Submission_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type formsV4Submission_universal_d_Sorting = Sorting;
  type formsV4Submission_universal_d_SortOrder = SortOrder;
  const formsV4Submission_universal_d_SortOrder: typeof SortOrder;
  type formsV4Submission_universal_d_QuerySubmissionResponse = QuerySubmissionResponse;
  type formsV4Submission_universal_d_SearchSubmissionsByNamespaceRequest = SearchSubmissionsByNamespaceRequest;
  type formsV4Submission_universal_d_CursorSearch = CursorSearch;
  type formsV4Submission_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
  type formsV4Submission_universal_d_SearchDetails = SearchDetails;
  type formsV4Submission_universal_d_Mode = Mode;
  const formsV4Submission_universal_d_Mode: typeof Mode;
  type formsV4Submission_universal_d_SearchSubmissionsByNamespaceResponse = SearchSubmissionsByNamespaceResponse;
  type formsV4Submission_universal_d_SearchSubmissionsByNamespaceForExportRequest = SearchSubmissionsByNamespaceForExportRequest;
  type formsV4Submission_universal_d_SearchSubmissionsByNamespaceForExportResponse = SearchSubmissionsByNamespaceForExportResponse;
  type formsV4Submission_universal_d_QuerySubmissionsByNamespaceRequest = QuerySubmissionsByNamespaceRequest;
  type formsV4Submission_universal_d_QuerySubmissionsByNamespaceResponse = QuerySubmissionsByNamespaceResponse;
  type formsV4Submission_universal_d_QuerySubmissionsByNamespaceForExportRequest = QuerySubmissionsByNamespaceForExportRequest;
  type formsV4Submission_universal_d_QuerySubmissionsByNamespaceForExportResponse = QuerySubmissionsByNamespaceForExportResponse;
  type formsV4Submission_universal_d_CountSubmissionsByFilterRequest = CountSubmissionsByFilterRequest;
  type formsV4Submission_universal_d_CountSubmissionsByFilterResponse = CountSubmissionsByFilterResponse;
  type formsV4Submission_universal_d_FormSubmissionsCount = FormSubmissionsCount;
  type formsV4Submission_universal_d_CountSubmissionsRequest = CountSubmissionsRequest;
  type formsV4Submission_universal_d_CountSubmissionsResponse = CountSubmissionsResponse;
  type formsV4Submission_universal_d_CountDeletedSubmissionsRequest = CountDeletedSubmissionsRequest;
  type formsV4Submission_universal_d_CountDeletedSubmissionsResponse = CountDeletedSubmissionsResponse;
  type formsV4Submission_universal_d_FormDeletedSubmissionsCount = FormDeletedSubmissionsCount;
  type formsV4Submission_universal_d_GetMediaUploadURLRequest = GetMediaUploadURLRequest;
  type formsV4Submission_universal_d_GetMediaUploadURLResponse = GetMediaUploadURLResponse;
  type formsV4Submission_universal_d_BulkMarkSubmissionsAsSeenRequest = BulkMarkSubmissionsAsSeenRequest;
  type formsV4Submission_universal_d_BulkMarkSubmissionsAsSeenResponse = BulkMarkSubmissionsAsSeenResponse;
  type formsV4Submission_universal_d_DomainEvent = DomainEvent;
  type formsV4Submission_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type formsV4Submission_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type formsV4Submission_universal_d_RestoreInfo = RestoreInfo;
  type formsV4Submission_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type formsV4Submission_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type formsV4Submission_universal_d_ActionEvent = ActionEvent;
  type formsV4Submission_universal_d_Empty = Empty;
  type formsV4Submission_universal_d_MessageEnvelope = MessageEnvelope;
  type formsV4Submission_universal_d_IdentificationData = IdentificationData;
  type formsV4Submission_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type formsV4Submission_universal_d_WebhookIdentityType = WebhookIdentityType;
  const formsV4Submission_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  type formsV4Submission_universal_d_UpsertContactFromSubmissionRequest = UpsertContactFromSubmissionRequest;
  type formsV4Submission_universal_d_UpsertContactFromSubmissionResponse = UpsertContactFromSubmissionResponse;
  type formsV4Submission_universal_d_SubmitContactResponse = SubmitContactResponse;
  type formsV4Submission_universal_d_IdentityType = IdentityType;
  const formsV4Submission_universal_d_IdentityType: typeof IdentityType;
  type formsV4Submission_universal_d_SubmissionContactMapped = SubmissionContactMapped;
  type formsV4Submission_universal_d_MarketingSubscriptionDetails = MarketingSubscriptionDetails;
  type formsV4Submission_universal_d_MarketingSubscriptionDetailsOptInLevel = MarketingSubscriptionDetailsOptInLevel;
  const formsV4Submission_universal_d_MarketingSubscriptionDetailsOptInLevel: typeof MarketingSubscriptionDetailsOptInLevel;
  type formsV4Submission_universal_d_SubmissionContactMappingSkipped = SubmissionContactMappingSkipped;
  const formsV4Submission_universal_d_createSubmission: typeof createSubmission;
  type formsV4Submission_universal_d_CreateSubmissionOptions = CreateSubmissionOptions;
  const formsV4Submission_universal_d_createSubmissionBySubmitter: typeof createSubmissionBySubmitter;
  type formsV4Submission_universal_d_CreateSubmissionBySubmitterOptions = CreateSubmissionBySubmitterOptions;
  const formsV4Submission_universal_d_bulkCreateSubmissionBySubmitter: typeof bulkCreateSubmissionBySubmitter;
  type formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterOptions = BulkCreateSubmissionBySubmitterOptions;
  const formsV4Submission_universal_d_getSubmission: typeof getSubmission;
  const formsV4Submission_universal_d_getSubmissionByCheckoutId: typeof getSubmissionByCheckoutId;
  const formsV4Submission_universal_d_updateSubmission: typeof updateSubmission;
  type formsV4Submission_universal_d_UpdateSubmission = UpdateSubmission;
  type formsV4Submission_universal_d_UpdateSubmissionOptions = UpdateSubmissionOptions;
  const formsV4Submission_universal_d_confirmSubmission: typeof confirmSubmission;
  const formsV4Submission_universal_d_deleteSubmission: typeof deleteSubmission;
  type formsV4Submission_universal_d_DeleteSubmissionOptions = DeleteSubmissionOptions;
  const formsV4Submission_universal_d_bulkDeleteSubmission: typeof bulkDeleteSubmission;
  type formsV4Submission_universal_d_BulkDeleteSubmissionOptions = BulkDeleteSubmissionOptions;
  const formsV4Submission_universal_d_restoreSubmissionFromTrashBin: typeof restoreSubmissionFromTrashBin;
  const formsV4Submission_universal_d_removeSubmissionFromTrashBin: typeof removeSubmissionFromTrashBin;
  const formsV4Submission_universal_d_bulkRemoveSubmissionFromTrashBin: typeof bulkRemoveSubmissionFromTrashBin;
  type formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinOptions = BulkRemoveSubmissionFromTrashBinOptions;
  const formsV4Submission_universal_d_listDeletedSubmissions: typeof listDeletedSubmissions;
  type formsV4Submission_universal_d_ListDeletedSubmissionsOptions = ListDeletedSubmissionsOptions;
  const formsV4Submission_universal_d_getDeletedSubmission: typeof getDeletedSubmission;
  const formsV4Submission_universal_d_querySubmission: typeof querySubmission;
  type formsV4Submission_universal_d_QuerySubmissionOptions = QuerySubmissionOptions;
  const formsV4Submission_universal_d_searchSubmissionsByNamespace: typeof searchSubmissionsByNamespace;
  const formsV4Submission_universal_d_searchSubmissionsByNamespaceForExport: typeof searchSubmissionsByNamespaceForExport;
  const formsV4Submission_universal_d_querySubmissionsByNamespace: typeof querySubmissionsByNamespace;
  type formsV4Submission_universal_d_QuerySubmissionsByNamespaceOptions = QuerySubmissionsByNamespaceOptions;
  type formsV4Submission_universal_d_SubmissionsQueryResult = SubmissionsQueryResult;
  type formsV4Submission_universal_d_SubmissionsQueryBuilder = SubmissionsQueryBuilder;
  const formsV4Submission_universal_d_querySubmissionsByNamespaceForExport: typeof querySubmissionsByNamespaceForExport;
  const formsV4Submission_universal_d_countSubmissionsByFilter: typeof countSubmissionsByFilter;
  type formsV4Submission_universal_d_CountSubmissionsByFilterOptions = CountSubmissionsByFilterOptions;
  const formsV4Submission_universal_d_countSubmissions: typeof countSubmissions;
  type formsV4Submission_universal_d_CountSubmissionsOptions = CountSubmissionsOptions;
  const formsV4Submission_universal_d_countDeletedSubmissions: typeof countDeletedSubmissions;
  type formsV4Submission_universal_d_CountDeletedSubmissionsOptions = CountDeletedSubmissionsOptions;
  const formsV4Submission_universal_d_getMediaUploadUrl: typeof getMediaUploadUrl;
  const formsV4Submission_universal_d_bulkMarkSubmissionsAsSeen: typeof bulkMarkSubmissionsAsSeen;
  const formsV4Submission_universal_d_upsertContactFromSubmission: typeof upsertContactFromSubmission;
  type formsV4Submission_universal_d_UpsertContactFromSubmissionOptions = UpsertContactFromSubmissionOptions;
  namespace formsV4Submission_universal_d {
    export {
      formsV4Submission_universal_d_FormSubmission as FormSubmission,
      formsV4Submission_universal_d_SubmissionStatus as SubmissionStatus,
      formsV4Submission_universal_d_Submitter as Submitter,
      formsV4Submission_universal_d_SubmitterSubmitterOneOf as SubmitterSubmitterOneOf,
      formsV4Submission_universal_d_ExtendedFields as ExtendedFields,
      formsV4Submission_universal_d_OrderDetails as OrderDetails,
      formsV4Submission_universal_d_CreateSubmissionRequest as CreateSubmissionRequest,
      formsV4Submission_universal_d_CreateSubmissionResponse as CreateSubmissionResponse,
      formsV4Submission_universal_d_CreateSubmissionBySubmitterRequest as CreateSubmissionBySubmitterRequest,
      formsV4Submission_universal_d_CreateSubmissionBySubmitterResponse as CreateSubmissionBySubmitterResponse,
      formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterRequest as BulkCreateSubmissionBySubmitterRequest,
      formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterData as BulkCreateSubmissionBySubmitterData,
      formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterResponse as BulkCreateSubmissionBySubmitterResponse,
      formsV4Submission_universal_d_BulkSubmissionResult as BulkSubmissionResult,
      formsV4Submission_universal_d_ItemMetadata as ItemMetadata,
      formsV4Submission_universal_d_ApplicationError as ApplicationError,
      formsV4Submission_universal_d_BulkActionMetadata as BulkActionMetadata,
      formsV4Submission_universal_d_GetSubmissionRequest as GetSubmissionRequest,
      formsV4Submission_universal_d_GetSubmissionResponse as GetSubmissionResponse,
      formsV4Submission_universal_d_GetSubmissionByCheckoutIdRequest as GetSubmissionByCheckoutIdRequest,
      formsV4Submission_universal_d_GetSubmissionByCheckoutIdResponse as GetSubmissionByCheckoutIdResponse,
      formsV4Submission_universal_d_UpdateSubmissionRequest as UpdateSubmissionRequest,
      formsV4Submission_universal_d_UpdateSubmissionResponse as UpdateSubmissionResponse,
      formsV4Submission_universal_d_ConfirmSubmissionRequest as ConfirmSubmissionRequest,
      formsV4Submission_universal_d_ConfirmSubmissionResponse as ConfirmSubmissionResponse,
      formsV4Submission_universal_d_FormSubmissionStatusUpdatedEvent as FormSubmissionStatusUpdatedEvent,
      formsV4Submission_universal_d_DeleteSubmissionRequest as DeleteSubmissionRequest,
      formsV4Submission_universal_d_DeleteSubmissionResponse as DeleteSubmissionResponse,
      formsV4Submission_universal_d_BulkDeleteSubmissionRequest as BulkDeleteSubmissionRequest,
      formsV4Submission_universal_d_BulkDeleteSubmissionResponse as BulkDeleteSubmissionResponse,
      formsV4Submission_universal_d_BulkDeleteSubmissionResult as BulkDeleteSubmissionResult,
      formsV4Submission_universal_d_RestoreSubmissionFromTrashBinRequest as RestoreSubmissionFromTrashBinRequest,
      formsV4Submission_universal_d_RestoreSubmissionFromTrashBinResponse as RestoreSubmissionFromTrashBinResponse,
      formsV4Submission_universal_d_RemoveSubmissionFromTrashBinRequest as RemoveSubmissionFromTrashBinRequest,
      formsV4Submission_universal_d_RemoveSubmissionFromTrashBinResponse as RemoveSubmissionFromTrashBinResponse,
      formsV4Submission_universal_d_RemovedSubmissionFromTrash as RemovedSubmissionFromTrash,
      formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinRequest as BulkRemoveSubmissionFromTrashBinRequest,
      formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinResponse as BulkRemoveSubmissionFromTrashBinResponse,
      formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinResult as BulkRemoveSubmissionFromTrashBinResult,
      formsV4Submission_universal_d_ListDeletedSubmissionsRequest as ListDeletedSubmissionsRequest,
      formsV4Submission_universal_d_CursorPaging as CursorPaging,
      formsV4Submission_universal_d_ListDeletedSubmissionsResponse as ListDeletedSubmissionsResponse,
      formsV4Submission_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      formsV4Submission_universal_d_Cursors as Cursors,
      formsV4Submission_universal_d_GetDeletedSubmissionRequest as GetDeletedSubmissionRequest,
      formsV4Submission_universal_d_GetDeletedSubmissionResponse as GetDeletedSubmissionResponse,
      formsV4Submission_universal_d_QuerySubmissionRequest as QuerySubmissionRequest,
      formsV4Submission_universal_d_CursorQuery as CursorQuery,
      formsV4Submission_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      formsV4Submission_universal_d_Sorting as Sorting,
      formsV4Submission_universal_d_SortOrder as SortOrder,
      formsV4Submission_universal_d_QuerySubmissionResponse as QuerySubmissionResponse,
      formsV4Submission_universal_d_SearchSubmissionsByNamespaceRequest as SearchSubmissionsByNamespaceRequest,
      formsV4Submission_universal_d_CursorSearch as CursorSearch,
      formsV4Submission_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf,
      formsV4Submission_universal_d_SearchDetails as SearchDetails,
      formsV4Submission_universal_d_Mode as Mode,
      formsV4Submission_universal_d_SearchSubmissionsByNamespaceResponse as SearchSubmissionsByNamespaceResponse,
      formsV4Submission_universal_d_SearchSubmissionsByNamespaceForExportRequest as SearchSubmissionsByNamespaceForExportRequest,
      formsV4Submission_universal_d_SearchSubmissionsByNamespaceForExportResponse as SearchSubmissionsByNamespaceForExportResponse,
      formsV4Submission_universal_d_QuerySubmissionsByNamespaceRequest as QuerySubmissionsByNamespaceRequest,
      formsV4Submission_universal_d_QuerySubmissionsByNamespaceResponse as QuerySubmissionsByNamespaceResponse,
      formsV4Submission_universal_d_QuerySubmissionsByNamespaceForExportRequest as QuerySubmissionsByNamespaceForExportRequest,
      formsV4Submission_universal_d_QuerySubmissionsByNamespaceForExportResponse as QuerySubmissionsByNamespaceForExportResponse,
      formsV4Submission_universal_d_CountSubmissionsByFilterRequest as CountSubmissionsByFilterRequest,
      formsV4Submission_universal_d_CountSubmissionsByFilterResponse as CountSubmissionsByFilterResponse,
      formsV4Submission_universal_d_FormSubmissionsCount as FormSubmissionsCount,
      formsV4Submission_universal_d_CountSubmissionsRequest as CountSubmissionsRequest,
      formsV4Submission_universal_d_CountSubmissionsResponse as CountSubmissionsResponse,
      formsV4Submission_universal_d_CountDeletedSubmissionsRequest as CountDeletedSubmissionsRequest,
      formsV4Submission_universal_d_CountDeletedSubmissionsResponse as CountDeletedSubmissionsResponse,
      formsV4Submission_universal_d_FormDeletedSubmissionsCount as FormDeletedSubmissionsCount,
      formsV4Submission_universal_d_GetMediaUploadURLRequest as GetMediaUploadURLRequest,
      formsV4Submission_universal_d_GetMediaUploadURLResponse as GetMediaUploadURLResponse,
      formsV4Submission_universal_d_BulkMarkSubmissionsAsSeenRequest as BulkMarkSubmissionsAsSeenRequest,
      formsV4Submission_universal_d_BulkMarkSubmissionsAsSeenResponse as BulkMarkSubmissionsAsSeenResponse,
      formsV4Submission_universal_d_DomainEvent as DomainEvent,
      formsV4Submission_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      formsV4Submission_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      formsV4Submission_universal_d_RestoreInfo as RestoreInfo,
      formsV4Submission_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      formsV4Submission_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      formsV4Submission_universal_d_ActionEvent as ActionEvent,
      formsV4Submission_universal_d_Empty as Empty,
      formsV4Submission_universal_d_MessageEnvelope as MessageEnvelope,
      formsV4Submission_universal_d_IdentificationData as IdentificationData,
      formsV4Submission_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      formsV4Submission_universal_d_WebhookIdentityType as WebhookIdentityType,
      formsV4Submission_universal_d_UpsertContactFromSubmissionRequest as UpsertContactFromSubmissionRequest,
      formsV4Submission_universal_d_UpsertContactFromSubmissionResponse as UpsertContactFromSubmissionResponse,
      formsV4Submission_universal_d_SubmitContactResponse as SubmitContactResponse,
      formsV4Submission_universal_d_IdentityType as IdentityType,
      formsV4Submission_universal_d_SubmissionContactMapped as SubmissionContactMapped,
      formsV4Submission_universal_d_MarketingSubscriptionDetails as MarketingSubscriptionDetails,
      formsV4Submission_universal_d_MarketingSubscriptionDetailsOptInLevel as MarketingSubscriptionDetailsOptInLevel,
      formsV4Submission_universal_d_SubmissionContactMappingSkipped as SubmissionContactMappingSkipped,
      formsV4Submission_universal_d_createSubmission as createSubmission,
      formsV4Submission_universal_d_CreateSubmissionOptions as CreateSubmissionOptions,
      formsV4Submission_universal_d_createSubmissionBySubmitter as createSubmissionBySubmitter,
      formsV4Submission_universal_d_CreateSubmissionBySubmitterOptions as CreateSubmissionBySubmitterOptions,
      formsV4Submission_universal_d_bulkCreateSubmissionBySubmitter as bulkCreateSubmissionBySubmitter,
      formsV4Submission_universal_d_BulkCreateSubmissionBySubmitterOptions as BulkCreateSubmissionBySubmitterOptions,
      formsV4Submission_universal_d_getSubmission as getSubmission,
      formsV4Submission_universal_d_getSubmissionByCheckoutId as getSubmissionByCheckoutId,
      formsV4Submission_universal_d_updateSubmission as updateSubmission,
      formsV4Submission_universal_d_UpdateSubmission as UpdateSubmission,
      formsV4Submission_universal_d_UpdateSubmissionOptions as UpdateSubmissionOptions,
      formsV4Submission_universal_d_confirmSubmission as confirmSubmission,
      formsV4Submission_universal_d_deleteSubmission as deleteSubmission,
      formsV4Submission_universal_d_DeleteSubmissionOptions as DeleteSubmissionOptions,
      formsV4Submission_universal_d_bulkDeleteSubmission as bulkDeleteSubmission,
      formsV4Submission_universal_d_BulkDeleteSubmissionOptions as BulkDeleteSubmissionOptions,
      formsV4Submission_universal_d_restoreSubmissionFromTrashBin as restoreSubmissionFromTrashBin,
      formsV4Submission_universal_d_removeSubmissionFromTrashBin as removeSubmissionFromTrashBin,
      formsV4Submission_universal_d_bulkRemoveSubmissionFromTrashBin as bulkRemoveSubmissionFromTrashBin,
      formsV4Submission_universal_d_BulkRemoveSubmissionFromTrashBinOptions as BulkRemoveSubmissionFromTrashBinOptions,
      formsV4Submission_universal_d_listDeletedSubmissions as listDeletedSubmissions,
      formsV4Submission_universal_d_ListDeletedSubmissionsOptions as ListDeletedSubmissionsOptions,
      formsV4Submission_universal_d_getDeletedSubmission as getDeletedSubmission,
      formsV4Submission_universal_d_querySubmission as querySubmission,
      formsV4Submission_universal_d_QuerySubmissionOptions as QuerySubmissionOptions,
      formsV4Submission_universal_d_searchSubmissionsByNamespace as searchSubmissionsByNamespace,
      formsV4Submission_universal_d_searchSubmissionsByNamespaceForExport as searchSubmissionsByNamespaceForExport,
      formsV4Submission_universal_d_querySubmissionsByNamespace as querySubmissionsByNamespace,
      formsV4Submission_universal_d_QuerySubmissionsByNamespaceOptions as QuerySubmissionsByNamespaceOptions,
      formsV4Submission_universal_d_SubmissionsQueryResult as SubmissionsQueryResult,
      formsV4Submission_universal_d_SubmissionsQueryBuilder as SubmissionsQueryBuilder,
      formsV4Submission_universal_d_querySubmissionsByNamespaceForExport as querySubmissionsByNamespaceForExport,
      formsV4Submission_universal_d_countSubmissionsByFilter as countSubmissionsByFilter,
      formsV4Submission_universal_d_CountSubmissionsByFilterOptions as CountSubmissionsByFilterOptions,
      formsV4Submission_universal_d_countSubmissions as countSubmissions,
      formsV4Submission_universal_d_CountSubmissionsOptions as CountSubmissionsOptions,
      formsV4Submission_universal_d_countDeletedSubmissions as countDeletedSubmissions,
      formsV4Submission_universal_d_CountDeletedSubmissionsOptions as CountDeletedSubmissionsOptions,
      formsV4Submission_universal_d_getMediaUploadUrl as getMediaUploadUrl,
      formsV4Submission_universal_d_bulkMarkSubmissionsAsSeen as bulkMarkSubmissionsAsSeen,
      formsV4Submission_universal_d_upsertContactFromSubmission as upsertContactFromSubmission,
      formsV4Submission_universal_d_UpsertContactFromSubmissionOptions as UpsertContactFromSubmissionOptions,
    };
  }
  
  export { formsV4FormSpamSubmissionReport_universal_d as formSpamSubmissionReports, formsV4SpamSubmission_universal_d as spamSubmissions, formsV4Submission_universal_d as submissions, interfacesFormsV4SubmissionExtension_universal_d as submissionsExtensionSpi };
}
