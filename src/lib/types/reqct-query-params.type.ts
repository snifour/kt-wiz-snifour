/**
 * 일반 함수 타입을 정의합니다.
 */

import { Parameter } from '@/lib';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Fn<P extends any[] = any[], R = any> = (...args: P) => R;

/**
 * 비동기 함수의 타입을 정의합니다.
 * @example
 * type FetchData = AsyncFn<[url: string], string>;
 *
 * const fetchData: FetchData = async (url) => {
 *   const response = await fetch(url);
 *   return response.text();
 * };
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type AsyncFn<P extends any[] = any[], R = any> = Fn<P, Promise<R>>;

/**
 * 비동기 함수의 반환값 타입을 추출합니다.
 * @example
 * type Example = AsyncFnReturn<() => Promise<number>>;
 * // type Example = number
 */
type AsyncFnReturn<T extends AsyncFn> = Awaited<ReturnType<T>>;

/**
 * Promise의 결과 타입을 추출합니다.
 * @example
 * type Example = PromiseType<Promise<number>>;
 * // type Example = number
 */
type PromiseType<T> = T extends Promise<infer U> ? U : never;

/**
 * 비동기 함수의 파라미터 타입을 추출합니다.
 * @example
 * type Example = AsyncFnParams<(id: number) => Promise<string>>;
 * // type Example = [id: number]
 */
type AsyncFnParams<T extends AsyncFn> = Parameter<T>;

export {
  type AsyncFn,
  type AsyncFnReturn,
  type PromiseType,
  type AsyncFnParams,
};