declare module "wix-cache-backend" {
    interface InvalidateCacheRequest {
        /** An array of objects containing a `tag` field used to identify the cache to invalidate. All cached return values with any listed tags are invalidated. If no tags are specified, nothing is invalidated. */
        invalidationMethods?: InvalidationMethods[];
    }
    interface InvalidationMethods extends InvalidationMethodsInvalidateByOneOf {
        /** Identifiers of the caches to invalidate. */
        tag?: string;
    }
    /** @oneof */
    interface InvalidationMethodsInvalidateByOneOf {
        /** Identifiers of the caches to invalidate. */
        tag?: string;
    }
    interface InvalidateCacheResponse {
    }
    /**
     * Clears the cache of the function return values using specified tags.
     *
     * This function invalidates or clears the cached return values of your backend function calls, using specified tags. The `invalidationMethods` parameter takes an array of objects, each containing a `tag` field that represents the tags associated with the cached return values. These tags are defined using the `webMethod()` function in the [`wix-web-module`](https://dev.wix.com/docs/velo/api-reference/wix-web-module/web-method). For example, using an array such as `[{ tag: "contacts" }, { tag: "labels" }]` will invalidate any previously cached return values tagged with "contacts" or "labels".
     *
     * <blockquote class="important">
     *
     * __Important:__
     * - If you don't use the `tags` identifier property when caching the function call's return value, you can only invalidate the cached return value when the TTL expires, or when you republish your site with a code change.
     *
     * - This function only invalidates the caches from your backend function calls. To invalidate the Server Side Rendering (SSR) cache for your site, use the `invalidateCache()` function from the [`wix-site-backend`](https://dev.wix.com/docs/velo/api-reference/wix-site-backend/invalidate-cache) module.
     *
     * </blockquote>
     * @param invalidationMethods - An array of objects containing a `tag` field used to identify the cache to invalidate. All cached return values with any listed tags are invalidated. If no tags are specified, nothing is invalidated.
     * @public
     * @documentationMaturity preview
     * @requiredField invalidationMethods
     * @adminMethod
     */
    function invalidateCache(invalidationMethods: InvalidationMethods[], options?: InvalidateCacheOptions): Promise<void>;
    interface InvalidateCacheOptions {
    }
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheRequest = InvalidateCacheRequest;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethods = InvalidationMethods;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethodsInvalidateByOneOf = InvalidationMethodsInvalidateByOneOf;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheResponse = InvalidateCacheResponse;
    const ssrV1InvalidateCacheRequestCache_universal_d_invalidateCache: typeof invalidateCache;
    type ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheOptions = InvalidateCacheOptions;
    namespace ssrV1InvalidateCacheRequestCache_universal_d {
        export { ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheRequest as InvalidateCacheRequest, ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethods as InvalidationMethods, ssrV1InvalidateCacheRequestCache_universal_d_InvalidationMethodsInvalidateByOneOf as InvalidationMethodsInvalidateByOneOf, ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheResponse as InvalidateCacheResponse, ssrV1InvalidateCacheRequestCache_universal_d_invalidateCache as invalidateCache, ssrV1InvalidateCacheRequestCache_universal_d_InvalidateCacheOptions as InvalidateCacheOptions, };
    }
    export { ssrV1InvalidateCacheRequestCache_universal_d as cache };
}
