declare module "wix-members-area.v1" {
  /** Fake FQDN to comply with the rules */
  interface SantaMember {
      /** fake id */
      _id?: string | null;
  }
  interface GetMyMemberPageRequest {
      /** My member page config */
      config?: Config;
      /** My member page full url */
      fullUrl?: string;
      /** My member page roles */
      pageRoles?: Record<string, PageRole>;
      /** My member page request info */
      requestInfo?: RequestInfo;
      /** My member page router prefix */
      routerPrefix?: string;
      /** My member page router suffix */
      routerSuffix?: string;
  }
  interface Config {
      /** Configuration patterns */
      patterns?: Record<string, Pattern>;
      /** Configuration type */
      type?: string;
  }
  interface Pattern {
      /** Pattern app data */
      appData?: AppData;
      /** Pattern page id */
      page?: string;
      /** Pattern seo data */
      seoData?: SeoData;
      /** Pattern social home flag */
      socialHome?: boolean;
      /** Pattern page title */
      title?: string;
  }
  interface AppData {
      /** App definition id */
      appDefinitionId?: string;
      /** App page id */
      appPageId?: string;
      /** App menu order */
      menuOrder?: number;
      /** App numbers */
      numbers?: Numbers;
      /** Which roles app is visible to */
      visibleForRoles?: string[] | null;
  }
  interface Numbers {
      /** Number default value */
      default?: number;
      /** Number key */
      key?: string;
  }
  interface SeoData {
      /** SEO description */
      description?: string | null;
      /** SEO keywords */
      keywords?: string | null;
      /** SEO no index flag */
      noIndex?: string;
      /** SEO title */
      title?: string;
  }
  interface PageRole {
      /** Page role id */
      _id?: string;
      /** Page title */
      title?: string;
  }
  interface RequestInfo {
      /** Request info environment */
      env?: string;
      /** Request form factor */
      formFactor?: string;
  }
  interface GetMyMemberPageResponse {
      /** Get mt member page result */
      result?: MemberPageResult;
  }
  interface MemberPageResult {
      /** Data Struct can return types of FullData or RolesData messages. */
      data?: Record<string, any> | null;
      /** Page head */
      head?: Head;
      /** A message */
      message?: string | null;
      /** Page id */
      page?: string;
      /** Public data */
      publicData?: PublicData;
      /** Page redirect url */
      redirectUrl?: string | null;
      /** Page status */
      status?: number;
      /** Page tpa inner route */
      tpaInnerRoute?: string | null;
  }
  interface Head {
      /** Head description */
      description?: string | null;
      /** Head keywords */
      keywords?: string | null;
      /** Head meta tags */
      metaTags?: Record<string, string>;
      /** Head no index flag */
      noIndex?: string;
      /** Head title */
      title?: string | null;
  }
  interface PublicData {
      /** Viewed member */
      viewedUser?: ViewedUser;
  }
  interface ViewedUser {
      /** Viewed member id */
      _id?: string;
      /** Viewed member name */
      name?: string | null;
      /** Viewed member roles */
      roles?: string[];
      /** Viewed member slug */
      slug?: string | null;
  }
  interface GetSiteMapRequest {
      /** Get site map configuration */
      config?: Config;
      /** Get site map url of the page */
      fullUrl?: string;
      /** Get site map page roles */
      pageRoles?: Record<string, PageRole>;
      /** Get site map request info */
      requestInfo?: RequestInfo;
      /** Get site map router prefix */
      routerPrefix?: string;
      /** Get site map router suffix */
      routerSuffix?: string;
  }
  interface GetSiteMapResponse {
      /** Site map result */
      result?: any;
  }
  /**
   * Returns my member page
   * @public
   * @documentationMaturity preview
   */
  function getMyMemberPage(options?: GetMyMemberPageOptions): Promise<GetMyMemberPageResponse>;
  interface GetMyMemberPageOptions {
      /** My member page config */
      config?: Config;
      /** My member page full url */
      fullUrl?: string;
      /** My member page roles */
      pageRoles?: Record<string, PageRole>;
      /** My member page request info */
      requestInfo?: RequestInfo;
      /** My member page router prefix */
      routerPrefix?: string;
      /** My member page router suffix */
      routerSuffix?: string;
  }
  /**
   * Returns site map
   * No permission as the request can be made by anything pretty much
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function getSiteMap(options?: GetSiteMapOptions): Promise<GetSiteMapResponse>;
  interface GetSiteMapOptions {
      /** Get site map configuration */
      config?: Config;
      /** Get site map url of the page */
      fullUrl?: string;
      /** Get site map page roles */
      pageRoles?: Record<string, PageRole>;
      /** Get site map request info */
      requestInfo?: RequestInfo;
      /** Get site map router prefix */
      routerPrefix?: string;
      /** Get site map router suffix */
      routerSuffix?: string;
  }
  
  type membersV1SantaMember_universal_d_SantaMember = SantaMember;
  type membersV1SantaMember_universal_d_GetMyMemberPageRequest = GetMyMemberPageRequest;
  type membersV1SantaMember_universal_d_Config = Config;
  type membersV1SantaMember_universal_d_Pattern = Pattern;
  type membersV1SantaMember_universal_d_AppData = AppData;
  type membersV1SantaMember_universal_d_Numbers = Numbers;
  type membersV1SantaMember_universal_d_SeoData = SeoData;
  type membersV1SantaMember_universal_d_PageRole = PageRole;
  type membersV1SantaMember_universal_d_RequestInfo = RequestInfo;
  type membersV1SantaMember_universal_d_GetMyMemberPageResponse = GetMyMemberPageResponse;
  type membersV1SantaMember_universal_d_MemberPageResult = MemberPageResult;
  type membersV1SantaMember_universal_d_Head = Head;
  type membersV1SantaMember_universal_d_PublicData = PublicData;
  type membersV1SantaMember_universal_d_ViewedUser = ViewedUser;
  type membersV1SantaMember_universal_d_GetSiteMapRequest = GetSiteMapRequest;
  type membersV1SantaMember_universal_d_GetSiteMapResponse = GetSiteMapResponse;
  const membersV1SantaMember_universal_d_getMyMemberPage: typeof getMyMemberPage;
  type membersV1SantaMember_universal_d_GetMyMemberPageOptions = GetMyMemberPageOptions;
  const membersV1SantaMember_universal_d_getSiteMap: typeof getSiteMap;
  type membersV1SantaMember_universal_d_GetSiteMapOptions = GetSiteMapOptions;
  namespace membersV1SantaMember_universal_d {
    export {
      membersV1SantaMember_universal_d_SantaMember as SantaMember,
      membersV1SantaMember_universal_d_GetMyMemberPageRequest as GetMyMemberPageRequest,
      membersV1SantaMember_universal_d_Config as Config,
      membersV1SantaMember_universal_d_Pattern as Pattern,
      membersV1SantaMember_universal_d_AppData as AppData,
      membersV1SantaMember_universal_d_Numbers as Numbers,
      membersV1SantaMember_universal_d_SeoData as SeoData,
      membersV1SantaMember_universal_d_PageRole as PageRole,
      membersV1SantaMember_universal_d_RequestInfo as RequestInfo,
      membersV1SantaMember_universal_d_GetMyMemberPageResponse as GetMyMemberPageResponse,
      membersV1SantaMember_universal_d_MemberPageResult as MemberPageResult,
      membersV1SantaMember_universal_d_Head as Head,
      membersV1SantaMember_universal_d_PublicData as PublicData,
      membersV1SantaMember_universal_d_ViewedUser as ViewedUser,
      membersV1SantaMember_universal_d_GetSiteMapRequest as GetSiteMapRequest,
      membersV1SantaMember_universal_d_GetSiteMapResponse as GetSiteMapResponse,
      membersV1SantaMember_universal_d_getMyMemberPage as getMyMemberPage,
      membersV1SantaMember_universal_d_GetMyMemberPageOptions as GetMyMemberPageOptions,
      membersV1SantaMember_universal_d_getSiteMap as getSiteMap,
      membersV1SantaMember_universal_d_GetSiteMapOptions as GetSiteMapOptions,
    };
  }
  
  export { membersV1SantaMember_universal_d as santaMember };
}
