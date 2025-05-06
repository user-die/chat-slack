import type { UseFetchOptions } from '@vueuse/core'
import useAppFetch from './useFetch'

class BaseApi {
  networkClient: typeof useAppFetch

  constructor(networkClient: typeof useAppFetch) {
    this.networkClient = networkClient
  }

  get<T>(url: string, RequestInit?: RequestInit, useFetchOptions?: UseFetchOptions) {
    return this.networkClient(url, RequestInit || {}, useFetchOptions)
      .get()
      .json<T>()
  }

  delete<T>(url: string, RequestInit?: RequestInit, useFetchOptions?: UseFetchOptions) {
    return this.networkClient(url, RequestInit || {}, useFetchOptions)
      .delete()
      .json<T>()
  }

  post<T>(
    url: string,
    body: unknown,
    RequestInit?: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) {
    return this.networkClient(url, RequestInit || {}, useFetchOptions)
      .post(body)
      .json<T>()
  }

  patch<T>(
    url: string,
    body: unknown,
    RequestInit?: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ) {
    return this.networkClient(url, RequestInit || {}, useFetchOptions)
      .patch(body)
      .json<T>()
  }

  put<T>(url: string, body: unknown, RequestInit?: RequestInit, useFetchOptions?: UseFetchOptions) {
    return this.networkClient(url, RequestInit || {}, useFetchOptions)
      .put(body)
      .json<T>()
  }
}

export const Api = new BaseApi(useAppFetch)
