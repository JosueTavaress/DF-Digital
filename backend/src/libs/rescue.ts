import { Request, Response, NextFunction } from 'express'

export { Request, Response, NextFunction }
export declare type Callback<T extends any | Error, R> = (...args: T[]) => Promise<R> | R
export declare type ErrorConstructor = { new(...args: any[]): Error }

export declare interface Rescue<T, R> {
  (callback: Callback<T, R>): R
  from (constructor: ErrorConstructor, callback: Callback<T, R>): R
  all (callbacks: Callback<T, R>[]): R[]
}

const rescue: Rescue<any, any> = function rescue(callback) {
  return async function rescuehandler(...args: any[]): Promise<void> {
    const next = args.slice(-1).pop() as NextFunction;

    if (typeof next !== 'function') {
      throw new TypeError('The last parameter received by express-rescue is not a function. Are you sure you passed its return as a middleware?');
    }

    try {
      await callback(...args);
    } catch (err) {
      next(err);
    }
  };
};

rescue.from = function rescuefrom (constructor, callback) {
  return function errorhandler (err: Error, req: Request, res: Response, next: NextFunction) {
    if (!(err instanceof constructor)) {
      next(err)
      return
    }

    callback(err, req, res, next)
  }
}

rescue.all = function rescueall (callbacks) {
  return callbacks.map(rescue)
}

export default rescue