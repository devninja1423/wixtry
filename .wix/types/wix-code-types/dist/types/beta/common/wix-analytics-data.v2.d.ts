declare module "wix-analytics-data.v2" {
  /** Site analytics data */
  interface SiteAnalyticsData {
      /** Data ID. */
      _id?: string;
  }
  /** The request to get analytics data */
  interface GetAnalyticsDataRequest {
      /** Date range. */
      dateRange: DateRange;
      /** Time zone. */
      timeZone?: string | null;
      /**
       * Measurement types. Supported values:
       *
       * - `TOTAL_SESSIONS`: All site visitor sessions.
       * - `TOTAL_SALES`: All sales.
       * - `TOTAL_ORDERS`: All orders.
       * - `CLICKS_TO_CONTACT`: All clicks of the "contact us" button.
       */
      measurementTypes: MeasureNameEnum[];
  }
  /** Date range. */
  interface DateRange {
      /** Custom start date in ISO 8601 format. */
      startDate?: string;
      /**
       * Custom end date in ISO 8601 format. Returned data will include all dates until the requested end date.
       * For example, { start: '2024-01-01', end: '2024-01-03' } will return data for '2024-01-01' and '2024-01-02'.
       */
      endDate?: string;
  }
  /** Available measure names */
  enum MeasureNameEnum {
      /** Total sessions count */
      TOTAL_SESSIONS = "TOTAL_SESSIONS",
      /** Total sales amount */
      TOTAL_SALES = "TOTAL_SALES",
      /** Total orders count */
      TOTAL_ORDERS = "TOTAL_ORDERS",
      /** Clicks to contact count */
      CLICKS_TO_CONTACT = "CLICKS_TO_CONTACT"
  }
  /** The response with analytics data */
  interface GetAnalyticsDataResponse {
      /** Analyitics data per type. */
      data?: MeasureItem[];
  }
  /** Measure item */
  interface MeasureItem {
      /** Measurement type. */
      type?: MeasureNameEnum;
      /** Data values per date. */
      values?: MeasureValue[];
      /** Total value. */
      total?: number;
  }
  /** Measure value with period */
  interface MeasureValue {
      /** Date in ISO 8601 format. */
      date?: string;
      /** Value. */
      value?: number;
  }
  /**
   * Retrieves analytics data, given the provided filtering.
   * @param dateRange - Date range.
   * @internal
   * @documentationMaturity preview
   * @requiredField dateRange
   * @requiredField options.measurementTypes
   * @adminMethod
   * @returns The response with analytics data
   */
  function getAnalyticsData(dateRange: DateRange, options?: GetAnalyticsDataOptions): Promise<GetAnalyticsDataResponse>;
  interface GetAnalyticsDataOptions {
      /** Time zone. */
      timeZone?: string | null;
      /**
       * Measurement types. Supported values:
       *
       * - `TOTAL_SESSIONS`: All site visitor sessions.
       * - `TOTAL_SALES`: All sales.
       * - `TOTAL_ORDERS`: All orders.
       * - `CLICKS_TO_CONTACT`: All clicks of the "contact us" button.
       */
      measurementTypes: MeasureNameEnum[];
  }
  
  type analyticsNgV2Data_universal_d_SiteAnalyticsData = SiteAnalyticsData;
  type analyticsNgV2Data_universal_d_GetAnalyticsDataRequest = GetAnalyticsDataRequest;
  type analyticsNgV2Data_universal_d_DateRange = DateRange;
  type analyticsNgV2Data_universal_d_MeasureNameEnum = MeasureNameEnum;
  const analyticsNgV2Data_universal_d_MeasureNameEnum: typeof MeasureNameEnum;
  type analyticsNgV2Data_universal_d_GetAnalyticsDataResponse = GetAnalyticsDataResponse;
  type analyticsNgV2Data_universal_d_MeasureItem = MeasureItem;
  type analyticsNgV2Data_universal_d_MeasureValue = MeasureValue;
  const analyticsNgV2Data_universal_d_getAnalyticsData: typeof getAnalyticsData;
  type analyticsNgV2Data_universal_d_GetAnalyticsDataOptions = GetAnalyticsDataOptions;
  namespace analyticsNgV2Data_universal_d {
    export {
      analyticsNgV2Data_universal_d_SiteAnalyticsData as SiteAnalyticsData,
      analyticsNgV2Data_universal_d_GetAnalyticsDataRequest as GetAnalyticsDataRequest,
      analyticsNgV2Data_universal_d_DateRange as DateRange,
      analyticsNgV2Data_universal_d_MeasureNameEnum as MeasureNameEnum,
      analyticsNgV2Data_universal_d_GetAnalyticsDataResponse as GetAnalyticsDataResponse,
      analyticsNgV2Data_universal_d_MeasureItem as MeasureItem,
      analyticsNgV2Data_universal_d_MeasureValue as MeasureValue,
      analyticsNgV2Data_universal_d_getAnalyticsData as getAnalyticsData,
      analyticsNgV2Data_universal_d_GetAnalyticsDataOptions as GetAnalyticsDataOptions,
    };
  }
  
  export { analyticsNgV2Data_universal_d as analyticsData };
}
