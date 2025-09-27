
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Module
 * 
 */
export type Module = $Result.DefaultSelection<Prisma.$ModulePayload>
/**
 * Model ModuleAssignment
 * 
 */
export type ModuleAssignment = $Result.DefaultSelection<Prisma.$ModuleAssignmentPayload>
/**
 * Model ModuleVideo
 * 
 */
export type ModuleVideo = $Result.DefaultSelection<Prisma.$ModuleVideoPayload>
/**
 * Model Video
 * 
 */
export type Video = $Result.DefaultSelection<Prisma.$VideoPayload>
/**
 * Model WatchLog
 * 
 */
export type WatchLog = $Result.DefaultSelection<Prisma.$WatchLogPayload>
/**
 * Model Quiz
 * 
 */
export type Quiz = $Result.DefaultSelection<Prisma.$QuizPayload>
/**
 * Model QuizAttempt
 * 
 */
export type QuizAttempt = $Result.DefaultSelection<Prisma.$QuizAttemptPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
  STUDENT: 'STUDENT'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.module`: Exposes CRUD operations for the **Module** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modules
    * const modules = await prisma.module.findMany()
    * ```
    */
  get module(): Prisma.ModuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moduleAssignment`: Exposes CRUD operations for the **ModuleAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuleAssignments
    * const moduleAssignments = await prisma.moduleAssignment.findMany()
    * ```
    */
  get moduleAssignment(): Prisma.ModuleAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moduleVideo`: Exposes CRUD operations for the **ModuleVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModuleVideos
    * const moduleVideos = await prisma.moduleVideo.findMany()
    * ```
    */
  get moduleVideo(): Prisma.ModuleVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.video`: Exposes CRUD operations for the **Video** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Videos
    * const videos = await prisma.video.findMany()
    * ```
    */
  get video(): Prisma.VideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchLog`: Exposes CRUD operations for the **WatchLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchLogs
    * const watchLogs = await prisma.watchLog.findMany()
    * ```
    */
  get watchLog(): Prisma.WatchLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quiz`: Exposes CRUD operations for the **Quiz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quizzes
    * const quizzes = await prisma.quiz.findMany()
    * ```
    */
  get quiz(): Prisma.QuizDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizAttempt`: Exposes CRUD operations for the **QuizAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizAttempts
    * const quizAttempts = await prisma.quizAttempt.findMany()
    * ```
    */
  get quizAttempt(): Prisma.QuizAttemptDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Module: 'Module',
    ModuleAssignment: 'ModuleAssignment',
    ModuleVideo: 'ModuleVideo',
    Video: 'Video',
    WatchLog: 'WatchLog',
    Quiz: 'Quiz',
    QuizAttempt: 'QuizAttempt'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "module" | "moduleAssignment" | "moduleVideo" | "video" | "watchLog" | "quiz" | "quizAttempt"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Module: {
        payload: Prisma.$ModulePayload<ExtArgs>
        fields: Prisma.ModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findFirst: {
            args: Prisma.ModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findMany: {
            args: Prisma.ModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          create: {
            args: Prisma.ModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          createMany: {
            args: Prisma.ModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          delete: {
            args: Prisma.ModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          update: {
            args: Prisma.ModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          deleteMany: {
            args: Prisma.ModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          upsert: {
            args: Prisma.ModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          aggregate: {
            args: Prisma.ModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModule>
          }
          groupBy: {
            args: Prisma.ModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuleCountArgs<ExtArgs>
            result: $Utils.Optional<ModuleCountAggregateOutputType> | number
          }
        }
      }
      ModuleAssignment: {
        payload: Prisma.$ModuleAssignmentPayload<ExtArgs>
        fields: Prisma.ModuleAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuleAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuleAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          findFirst: {
            args: Prisma.ModuleAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuleAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          findMany: {
            args: Prisma.ModuleAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>[]
          }
          create: {
            args: Prisma.ModuleAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          createMany: {
            args: Prisma.ModuleAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModuleAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>[]
          }
          delete: {
            args: Prisma.ModuleAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          update: {
            args: Prisma.ModuleAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.ModuleAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModuleAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModuleAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.ModuleAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleAssignmentPayload>
          }
          aggregate: {
            args: Prisma.ModuleAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModuleAssignment>
          }
          groupBy: {
            args: Prisma.ModuleAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModuleAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuleAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<ModuleAssignmentCountAggregateOutputType> | number
          }
        }
      }
      ModuleVideo: {
        payload: Prisma.$ModuleVideoPayload<ExtArgs>
        fields: Prisma.ModuleVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuleVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuleVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          findFirst: {
            args: Prisma.ModuleVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuleVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          findMany: {
            args: Prisma.ModuleVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>[]
          }
          create: {
            args: Prisma.ModuleVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          createMany: {
            args: Prisma.ModuleVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModuleVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>[]
          }
          delete: {
            args: Prisma.ModuleVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          update: {
            args: Prisma.ModuleVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          deleteMany: {
            args: Prisma.ModuleVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModuleVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModuleVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>[]
          }
          upsert: {
            args: Prisma.ModuleVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModuleVideoPayload>
          }
          aggregate: {
            args: Prisma.ModuleVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModuleVideo>
          }
          groupBy: {
            args: Prisma.ModuleVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModuleVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuleVideoCountArgs<ExtArgs>
            result: $Utils.Optional<ModuleVideoCountAggregateOutputType> | number
          }
        }
      }
      Video: {
        payload: Prisma.$VideoPayload<ExtArgs>
        fields: Prisma.VideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findFirst: {
            args: Prisma.VideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          findMany: {
            args: Prisma.VideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          create: {
            args: Prisma.VideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          createMany: {
            args: Prisma.VideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          delete: {
            args: Prisma.VideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          update: {
            args: Prisma.VideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          deleteMany: {
            args: Prisma.VideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>[]
          }
          upsert: {
            args: Prisma.VideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoPayload>
          }
          aggregate: {
            args: Prisma.VideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideo>
          }
          groupBy: {
            args: Prisma.VideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoCountArgs<ExtArgs>
            result: $Utils.Optional<VideoCountAggregateOutputType> | number
          }
        }
      }
      WatchLog: {
        payload: Prisma.$WatchLogPayload<ExtArgs>
        fields: Prisma.WatchLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          findFirst: {
            args: Prisma.WatchLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          findMany: {
            args: Prisma.WatchLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>[]
          }
          create: {
            args: Prisma.WatchLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          createMany: {
            args: Prisma.WatchLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>[]
          }
          delete: {
            args: Prisma.WatchLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          update: {
            args: Prisma.WatchLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          deleteMany: {
            args: Prisma.WatchLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>[]
          }
          upsert: {
            args: Prisma.WatchLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchLogPayload>
          }
          aggregate: {
            args: Prisma.WatchLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchLog>
          }
          groupBy: {
            args: Prisma.WatchLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchLogCountArgs<ExtArgs>
            result: $Utils.Optional<WatchLogCountAggregateOutputType> | number
          }
        }
      }
      Quiz: {
        payload: Prisma.$QuizPayload<ExtArgs>
        fields: Prisma.QuizFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findFirst: {
            args: Prisma.QuizFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          findMany: {
            args: Prisma.QuizFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          create: {
            args: Prisma.QuizCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          createMany: {
            args: Prisma.QuizCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          delete: {
            args: Prisma.QuizDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          update: {
            args: Prisma.QuizUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          deleteMany: {
            args: Prisma.QuizDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>[]
          }
          upsert: {
            args: Prisma.QuizUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizPayload>
          }
          aggregate: {
            args: Prisma.QuizAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuiz>
          }
          groupBy: {
            args: Prisma.QuizGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizCountArgs<ExtArgs>
            result: $Utils.Optional<QuizCountAggregateOutputType> | number
          }
        }
      }
      QuizAttempt: {
        payload: Prisma.$QuizAttemptPayload<ExtArgs>
        fields: Prisma.QuizAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findFirst: {
            args: Prisma.QuizAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          findMany: {
            args: Prisma.QuizAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          create: {
            args: Prisma.QuizAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          createMany: {
            args: Prisma.QuizAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          delete: {
            args: Prisma.QuizAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          update: {
            args: Prisma.QuizAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          deleteMany: {
            args: Prisma.QuizAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>[]
          }
          upsert: {
            args: Prisma.QuizAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizAttemptPayload>
          }
          aggregate: {
            args: Prisma.QuizAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizAttempt>
          }
          groupBy: {
            args: Prisma.QuizAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<QuizAttemptCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    module?: ModuleOmit
    moduleAssignment?: ModuleAssignmentOmit
    moduleVideo?: ModuleVideoOmit
    video?: VideoOmit
    watchLog?: WatchLogOmit
    quiz?: QuizOmit
    quizAttempt?: QuizAttemptOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    assignments: number
    quizAttempts: number
    watchLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | UserCountOutputTypeCountAssignmentsArgs
    quizAttempts?: boolean | UserCountOutputTypeCountQuizAttemptsArgs
    watchLogs?: boolean | UserCountOutputTypeCountWatchLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleAssignmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQuizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
  }


  /**
   * Count Type ModuleCountOutputType
   */

  export type ModuleCountOutputType = {
    assignments: number
    moduleVideos: number
  }

  export type ModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | ModuleCountOutputTypeCountAssignmentsArgs
    moduleVideos?: boolean | ModuleCountOutputTypeCountModuleVideosArgs
  }

  // Custom InputTypes
  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleCountOutputType
     */
    select?: ModuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleAssignmentWhereInput
  }

  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeCountModuleVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleVideoWhereInput
  }


  /**
   * Count Type VideoCountOutputType
   */

  export type VideoCountOutputType = {
    moduleVideos: number
    watchLogs: number
  }

  export type VideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moduleVideos?: boolean | VideoCountOutputTypeCountModuleVideosArgs
    watchLogs?: boolean | VideoCountOutputTypeCountWatchLogsArgs
  }

  // Custom InputTypes
  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoCountOutputType
     */
    select?: VideoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountModuleVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleVideoWhereInput
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountWatchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
  }


  /**
   * Count Type QuizCountOutputType
   */

  export type QuizCountOutputType = {
    attempts: number
  }

  export type QuizCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | QuizCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizCountOutputType
     */
    select?: QuizCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizCountOutputType without action
   */
  export type QuizCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    quizAttempts?: boolean | User$quizAttemptsArgs<ExtArgs>
    watchLogs?: boolean | User$watchLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    quizAttempts?: boolean | User$quizAttemptsArgs<ExtArgs>
    watchLogs?: boolean | User$watchLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assignments: Prisma.$ModuleAssignmentPayload<ExtArgs>[]
      quizAttempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends User$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizAttempts<T extends User$quizAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$quizAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchLogs<T extends User$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.assignments
   */
  export type User$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    where?: ModuleAssignmentWhereInput
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    cursor?: ModuleAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuleAssignmentScalarFieldEnum | ModuleAssignmentScalarFieldEnum[]
  }

  /**
   * User.quizAttempts
   */
  export type User$quizAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * User.watchLogs
   */
  export type User$watchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    cursor?: WatchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Module
   */

  export type AggregateModule = {
    _count: ModuleCountAggregateOutputType | null
    _avg: ModuleAvgAggregateOutputType | null
    _sum: ModuleSumAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  export type ModuleAvgAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type ModuleSumAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type ModuleMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type ModuleMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type ModuleCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type ModuleAvgAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type ModuleSumAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type ModuleMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
  }

  export type ModuleMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
  }

  export type ModuleCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type ModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Module to aggregate.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modules
    **/
    _count?: true | ModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleMaxAggregateInputType
  }

  export type GetModuleAggregateType<T extends ModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModule[P]>
      : GetScalarType<T[P], AggregateModule[P]>
  }




  export type ModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleWhereInput
    orderBy?: ModuleOrderByWithAggregationInput | ModuleOrderByWithAggregationInput[]
    by: ModuleScalarFieldEnum[] | ModuleScalarFieldEnum
    having?: ModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleCountAggregateInputType | true
    _avg?: ModuleAvgAggregateInputType
    _sum?: ModuleSumAggregateInputType
    _min?: ModuleMinAggregateInputType
    _max?: ModuleMaxAggregateInputType
  }

  export type ModuleGroupByOutputType = {
    id: number
    title: string
    description: string | null
    createdBy: number
    createdAt: Date
    _count: ModuleCountAggregateOutputType | null
    _avg: ModuleAvgAggregateOutputType | null
    _sum: ModuleSumAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  type GetModuleGroupByPayload<T extends ModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleGroupByOutputType[P]>
        }
      >
    >


  export type ModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    assignments?: boolean | Module$assignmentsArgs<ExtArgs>
    moduleVideos?: boolean | Module$moduleVideosArgs<ExtArgs>
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type ModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "createdBy" | "createdAt", ExtArgs["result"]["module"]>
  export type ModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Module$assignmentsArgs<ExtArgs>
    moduleVideos?: boolean | Module$moduleVideosArgs<ExtArgs>
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ModuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ModuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Module"
    objects: {
      assignments: Prisma.$ModuleAssignmentPayload<ExtArgs>[]
      moduleVideos: Prisma.$ModuleVideoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      createdBy: number
      createdAt: Date
    }, ExtArgs["result"]["module"]>
    composites: {}
  }

  type ModuleGetPayload<S extends boolean | null | undefined | ModuleDefaultArgs> = $Result.GetResult<Prisma.$ModulePayload, S>

  type ModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModuleCountAggregateInputType | true
    }

  export interface ModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Module'], meta: { name: 'Module' } }
    /**
     * Find zero or one Module that matches the filter.
     * @param {ModuleFindUniqueArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModuleFindUniqueArgs>(args: SelectSubset<T, ModuleFindUniqueArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Module that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModuleFindUniqueOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Module that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModuleFindFirstArgs>(args?: SelectSubset<T, ModuleFindFirstArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Module that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Modules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modules
     * const modules = await prisma.module.findMany()
     * 
     * // Get first 10 Modules
     * const modules = await prisma.module.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduleWithIdOnly = await prisma.module.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModuleFindManyArgs>(args?: SelectSubset<T, ModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Module.
     * @param {ModuleCreateArgs} args - Arguments to create a Module.
     * @example
     * // Create one Module
     * const Module = await prisma.module.create({
     *   data: {
     *     // ... data to create a Module
     *   }
     * })
     * 
     */
    create<T extends ModuleCreateArgs>(args: SelectSubset<T, ModuleCreateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Modules.
     * @param {ModuleCreateManyArgs} args - Arguments to create many Modules.
     * @example
     * // Create many Modules
     * const module = await prisma.module.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModuleCreateManyArgs>(args?: SelectSubset<T, ModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Modules and returns the data saved in the database.
     * @param {ModuleCreateManyAndReturnArgs} args - Arguments to create many Modules.
     * @example
     * // Create many Modules
     * const module = await prisma.module.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Modules and only return the `id`
     * const moduleWithIdOnly = await prisma.module.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Module.
     * @param {ModuleDeleteArgs} args - Arguments to delete one Module.
     * @example
     * // Delete one Module
     * const Module = await prisma.module.delete({
     *   where: {
     *     // ... filter to delete one Module
     *   }
     * })
     * 
     */
    delete<T extends ModuleDeleteArgs>(args: SelectSubset<T, ModuleDeleteArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Module.
     * @param {ModuleUpdateArgs} args - Arguments to update one Module.
     * @example
     * // Update one Module
     * const module = await prisma.module.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModuleUpdateArgs>(args: SelectSubset<T, ModuleUpdateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Modules.
     * @param {ModuleDeleteManyArgs} args - Arguments to filter Modules to delete.
     * @example
     * // Delete a few Modules
     * const { count } = await prisma.module.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModuleDeleteManyArgs>(args?: SelectSubset<T, ModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modules
     * const module = await prisma.module.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModuleUpdateManyArgs>(args: SelectSubset<T, ModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modules and returns the data updated in the database.
     * @param {ModuleUpdateManyAndReturnArgs} args - Arguments to update many Modules.
     * @example
     * // Update many Modules
     * const module = await prisma.module.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Modules and only return the `id`
     * const moduleWithIdOnly = await prisma.module.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Module.
     * @param {ModuleUpsertArgs} args - Arguments to update or create a Module.
     * @example
     * // Update or create a Module
     * const module = await prisma.module.upsert({
     *   create: {
     *     // ... data to create a Module
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Module we want to update
     *   }
     * })
     */
    upsert<T extends ModuleUpsertArgs>(args: SelectSubset<T, ModuleUpsertArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleCountArgs} args - Arguments to filter Modules to count.
     * @example
     * // Count the number of Modules
     * const count = await prisma.module.count({
     *   where: {
     *     // ... the filter for the Modules we want to count
     *   }
     * })
    **/
    count<T extends ModuleCountArgs>(
      args?: Subset<T, ModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleAggregateArgs>(args: Subset<T, ModuleAggregateArgs>): Prisma.PrismaPromise<GetModuleAggregateType<T>>

    /**
     * Group by Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleGroupByArgs['orderBy'] }
        : { orderBy?: ModuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Module model
   */
  readonly fields: ModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Module.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Module$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Module$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    moduleVideos<T extends Module$moduleVideosArgs<ExtArgs> = {}>(args?: Subset<T, Module$moduleVideosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Module model
   */
  interface ModuleFieldRefs {
    readonly id: FieldRef<"Module", 'Int'>
    readonly title: FieldRef<"Module", 'String'>
    readonly description: FieldRef<"Module", 'String'>
    readonly createdBy: FieldRef<"Module", 'Int'>
    readonly createdAt: FieldRef<"Module", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Module findUnique
   */
  export type ModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module findUniqueOrThrow
   */
  export type ModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module findFirst
   */
  export type ModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }

  /**
   * Module findFirstOrThrow
   */
  export type ModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }

  /**
   * Module findMany
   */
  export type ModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Modules to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }

  /**
   * Module create
   */
  export type ModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a Module.
     */
    data: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
  }

  /**
   * Module createMany
   */
  export type ModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modules.
     */
    data: ModuleCreateManyInput | ModuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Module createManyAndReturn
   */
  export type ModuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * The data used to create many Modules.
     */
    data: ModuleCreateManyInput | ModuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Module update
   */
  export type ModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a Module.
     */
    data: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
    /**
     * Choose, which Module to update.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module updateMany
   */
  export type ModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modules.
     */
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>
    /**
     * Filter which Modules to update
     */
    where?: ModuleWhereInput
    /**
     * Limit how many Modules to update.
     */
    limit?: number
  }

  /**
   * Module updateManyAndReturn
   */
  export type ModuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * The data used to update Modules.
     */
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>
    /**
     * Filter which Modules to update
     */
    where?: ModuleWhereInput
    /**
     * Limit how many Modules to update.
     */
    limit?: number
  }

  /**
   * Module upsert
   */
  export type ModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the Module to update in case it exists.
     */
    where: ModuleWhereUniqueInput
    /**
     * In case the Module found by the `where` argument doesn't exist, create a new Module with this data.
     */
    create: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
    /**
     * In case the Module was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
  }

  /**
   * Module delete
   */
  export type ModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter which Module to delete.
     */
    where: ModuleWhereUniqueInput
  }

  /**
   * Module deleteMany
   */
  export type ModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modules to delete
     */
    where?: ModuleWhereInput
    /**
     * Limit how many Modules to delete.
     */
    limit?: number
  }

  /**
   * Module.assignments
   */
  export type Module$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    where?: ModuleAssignmentWhereInput
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    cursor?: ModuleAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuleAssignmentScalarFieldEnum | ModuleAssignmentScalarFieldEnum[]
  }

  /**
   * Module.moduleVideos
   */
  export type Module$moduleVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    where?: ModuleVideoWhereInput
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    cursor?: ModuleVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuleVideoScalarFieldEnum | ModuleVideoScalarFieldEnum[]
  }

  /**
   * Module without action
   */
  export type ModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Module
     */
    omit?: ModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleInclude<ExtArgs> | null
  }


  /**
   * Model ModuleAssignment
   */

  export type AggregateModuleAssignment = {
    _count: ModuleAssignmentCountAggregateOutputType | null
    _avg: ModuleAssignmentAvgAggregateOutputType | null
    _sum: ModuleAssignmentSumAggregateOutputType | null
    _min: ModuleAssignmentMinAggregateOutputType | null
    _max: ModuleAssignmentMaxAggregateOutputType | null
  }

  export type ModuleAssignmentAvgAggregateOutputType = {
    id: number | null
    moduleId: number | null
    userId: number | null
  }

  export type ModuleAssignmentSumAggregateOutputType = {
    id: number | null
    moduleId: number | null
    userId: number | null
  }

  export type ModuleAssignmentMinAggregateOutputType = {
    id: number | null
    moduleId: number | null
    userId: number | null
    assignedAt: Date | null
  }

  export type ModuleAssignmentMaxAggregateOutputType = {
    id: number | null
    moduleId: number | null
    userId: number | null
    assignedAt: Date | null
  }

  export type ModuleAssignmentCountAggregateOutputType = {
    id: number
    moduleId: number
    userId: number
    assignedAt: number
    _all: number
  }


  export type ModuleAssignmentAvgAggregateInputType = {
    id?: true
    moduleId?: true
    userId?: true
  }

  export type ModuleAssignmentSumAggregateInputType = {
    id?: true
    moduleId?: true
    userId?: true
  }

  export type ModuleAssignmentMinAggregateInputType = {
    id?: true
    moduleId?: true
    userId?: true
    assignedAt?: true
  }

  export type ModuleAssignmentMaxAggregateInputType = {
    id?: true
    moduleId?: true
    userId?: true
    assignedAt?: true
  }

  export type ModuleAssignmentCountAggregateInputType = {
    id?: true
    moduleId?: true
    userId?: true
    assignedAt?: true
    _all?: true
  }

  export type ModuleAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuleAssignment to aggregate.
     */
    where?: ModuleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleAssignments to fetch.
     */
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuleAssignments
    **/
    _count?: true | ModuleAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModuleAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModuleAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleAssignmentMaxAggregateInputType
  }

  export type GetModuleAssignmentAggregateType<T extends ModuleAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateModuleAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuleAssignment[P]>
      : GetScalarType<T[P], AggregateModuleAssignment[P]>
  }




  export type ModuleAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleAssignmentWhereInput
    orderBy?: ModuleAssignmentOrderByWithAggregationInput | ModuleAssignmentOrderByWithAggregationInput[]
    by: ModuleAssignmentScalarFieldEnum[] | ModuleAssignmentScalarFieldEnum
    having?: ModuleAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleAssignmentCountAggregateInputType | true
    _avg?: ModuleAssignmentAvgAggregateInputType
    _sum?: ModuleAssignmentSumAggregateInputType
    _min?: ModuleAssignmentMinAggregateInputType
    _max?: ModuleAssignmentMaxAggregateInputType
  }

  export type ModuleAssignmentGroupByOutputType = {
    id: number
    moduleId: number
    userId: number
    assignedAt: Date
    _count: ModuleAssignmentCountAggregateOutputType | null
    _avg: ModuleAssignmentAvgAggregateOutputType | null
    _sum: ModuleAssignmentSumAggregateOutputType | null
    _min: ModuleAssignmentMinAggregateOutputType | null
    _max: ModuleAssignmentMaxAggregateOutputType | null
  }

  type GetModuleAssignmentGroupByPayload<T extends ModuleAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuleAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type ModuleAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    userId?: boolean
    assignedAt?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleAssignment"]>

  export type ModuleAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    userId?: boolean
    assignedAt?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleAssignment"]>

  export type ModuleAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    userId?: boolean
    assignedAt?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleAssignment"]>

  export type ModuleAssignmentSelectScalar = {
    id?: boolean
    moduleId?: boolean
    userId?: boolean
    assignedAt?: boolean
  }

  export type ModuleAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "moduleId" | "userId" | "assignedAt", ExtArgs["result"]["moduleAssignment"]>
  export type ModuleAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ModuleAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ModuleAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ModuleAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModuleAssignment"
    objects: {
      module: Prisma.$ModulePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      moduleId: number
      userId: number
      assignedAt: Date
    }, ExtArgs["result"]["moduleAssignment"]>
    composites: {}
  }

  type ModuleAssignmentGetPayload<S extends boolean | null | undefined | ModuleAssignmentDefaultArgs> = $Result.GetResult<Prisma.$ModuleAssignmentPayload, S>

  type ModuleAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModuleAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModuleAssignmentCountAggregateInputType | true
    }

  export interface ModuleAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModuleAssignment'], meta: { name: 'ModuleAssignment' } }
    /**
     * Find zero or one ModuleAssignment that matches the filter.
     * @param {ModuleAssignmentFindUniqueArgs} args - Arguments to find a ModuleAssignment
     * @example
     * // Get one ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModuleAssignmentFindUniqueArgs>(args: SelectSubset<T, ModuleAssignmentFindUniqueArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModuleAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModuleAssignmentFindUniqueOrThrowArgs} args - Arguments to find a ModuleAssignment
     * @example
     * // Get one ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModuleAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuleAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModuleAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentFindFirstArgs} args - Arguments to find a ModuleAssignment
     * @example
     * // Get one ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModuleAssignmentFindFirstArgs>(args?: SelectSubset<T, ModuleAssignmentFindFirstArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModuleAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentFindFirstOrThrowArgs} args - Arguments to find a ModuleAssignment
     * @example
     * // Get one ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModuleAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuleAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModuleAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuleAssignments
     * const moduleAssignments = await prisma.moduleAssignment.findMany()
     * 
     * // Get first 10 ModuleAssignments
     * const moduleAssignments = await prisma.moduleAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduleAssignmentWithIdOnly = await prisma.moduleAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModuleAssignmentFindManyArgs>(args?: SelectSubset<T, ModuleAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModuleAssignment.
     * @param {ModuleAssignmentCreateArgs} args - Arguments to create a ModuleAssignment.
     * @example
     * // Create one ModuleAssignment
     * const ModuleAssignment = await prisma.moduleAssignment.create({
     *   data: {
     *     // ... data to create a ModuleAssignment
     *   }
     * })
     * 
     */
    create<T extends ModuleAssignmentCreateArgs>(args: SelectSubset<T, ModuleAssignmentCreateArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModuleAssignments.
     * @param {ModuleAssignmentCreateManyArgs} args - Arguments to create many ModuleAssignments.
     * @example
     * // Create many ModuleAssignments
     * const moduleAssignment = await prisma.moduleAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModuleAssignmentCreateManyArgs>(args?: SelectSubset<T, ModuleAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModuleAssignments and returns the data saved in the database.
     * @param {ModuleAssignmentCreateManyAndReturnArgs} args - Arguments to create many ModuleAssignments.
     * @example
     * // Create many ModuleAssignments
     * const moduleAssignment = await prisma.moduleAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModuleAssignments and only return the `id`
     * const moduleAssignmentWithIdOnly = await prisma.moduleAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModuleAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuleAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModuleAssignment.
     * @param {ModuleAssignmentDeleteArgs} args - Arguments to delete one ModuleAssignment.
     * @example
     * // Delete one ModuleAssignment
     * const ModuleAssignment = await prisma.moduleAssignment.delete({
     *   where: {
     *     // ... filter to delete one ModuleAssignment
     *   }
     * })
     * 
     */
    delete<T extends ModuleAssignmentDeleteArgs>(args: SelectSubset<T, ModuleAssignmentDeleteArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModuleAssignment.
     * @param {ModuleAssignmentUpdateArgs} args - Arguments to update one ModuleAssignment.
     * @example
     * // Update one ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModuleAssignmentUpdateArgs>(args: SelectSubset<T, ModuleAssignmentUpdateArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModuleAssignments.
     * @param {ModuleAssignmentDeleteManyArgs} args - Arguments to filter ModuleAssignments to delete.
     * @example
     * // Delete a few ModuleAssignments
     * const { count } = await prisma.moduleAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModuleAssignmentDeleteManyArgs>(args?: SelectSubset<T, ModuleAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuleAssignments
     * const moduleAssignment = await prisma.moduleAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModuleAssignmentUpdateManyArgs>(args: SelectSubset<T, ModuleAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleAssignments and returns the data updated in the database.
     * @param {ModuleAssignmentUpdateManyAndReturnArgs} args - Arguments to update many ModuleAssignments.
     * @example
     * // Update many ModuleAssignments
     * const moduleAssignment = await prisma.moduleAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModuleAssignments and only return the `id`
     * const moduleAssignmentWithIdOnly = await prisma.moduleAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModuleAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuleAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModuleAssignment.
     * @param {ModuleAssignmentUpsertArgs} args - Arguments to update or create a ModuleAssignment.
     * @example
     * // Update or create a ModuleAssignment
     * const moduleAssignment = await prisma.moduleAssignment.upsert({
     *   create: {
     *     // ... data to create a ModuleAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuleAssignment we want to update
     *   }
     * })
     */
    upsert<T extends ModuleAssignmentUpsertArgs>(args: SelectSubset<T, ModuleAssignmentUpsertArgs<ExtArgs>>): Prisma__ModuleAssignmentClient<$Result.GetResult<Prisma.$ModuleAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModuleAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentCountArgs} args - Arguments to filter ModuleAssignments to count.
     * @example
     * // Count the number of ModuleAssignments
     * const count = await prisma.moduleAssignment.count({
     *   where: {
     *     // ... the filter for the ModuleAssignments we want to count
     *   }
     * })
    **/
    count<T extends ModuleAssignmentCountArgs>(
      args?: Subset<T, ModuleAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuleAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleAssignmentAggregateArgs>(args: Subset<T, ModuleAssignmentAggregateArgs>): Prisma.PrismaPromise<GetModuleAssignmentAggregateType<T>>

    /**
     * Group by ModuleAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: ModuleAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModuleAssignment model
   */
  readonly fields: ModuleAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuleAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuleAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    module<T extends ModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuleDefaultArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModuleAssignment model
   */
  interface ModuleAssignmentFieldRefs {
    readonly id: FieldRef<"ModuleAssignment", 'Int'>
    readonly moduleId: FieldRef<"ModuleAssignment", 'Int'>
    readonly userId: FieldRef<"ModuleAssignment", 'Int'>
    readonly assignedAt: FieldRef<"ModuleAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModuleAssignment findUnique
   */
  export type ModuleAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ModuleAssignment to fetch.
     */
    where: ModuleAssignmentWhereUniqueInput
  }

  /**
   * ModuleAssignment findUniqueOrThrow
   */
  export type ModuleAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ModuleAssignment to fetch.
     */
    where: ModuleAssignmentWhereUniqueInput
  }

  /**
   * ModuleAssignment findFirst
   */
  export type ModuleAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ModuleAssignment to fetch.
     */
    where?: ModuleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleAssignments to fetch.
     */
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleAssignments.
     */
    cursor?: ModuleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleAssignments.
     */
    distinct?: ModuleAssignmentScalarFieldEnum | ModuleAssignmentScalarFieldEnum[]
  }

  /**
   * ModuleAssignment findFirstOrThrow
   */
  export type ModuleAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ModuleAssignment to fetch.
     */
    where?: ModuleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleAssignments to fetch.
     */
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleAssignments.
     */
    cursor?: ModuleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleAssignments.
     */
    distinct?: ModuleAssignmentScalarFieldEnum | ModuleAssignmentScalarFieldEnum[]
  }

  /**
   * ModuleAssignment findMany
   */
  export type ModuleAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ModuleAssignments to fetch.
     */
    where?: ModuleAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleAssignments to fetch.
     */
    orderBy?: ModuleAssignmentOrderByWithRelationInput | ModuleAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuleAssignments.
     */
    cursor?: ModuleAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleAssignments.
     */
    skip?: number
    distinct?: ModuleAssignmentScalarFieldEnum | ModuleAssignmentScalarFieldEnum[]
  }

  /**
   * ModuleAssignment create
   */
  export type ModuleAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ModuleAssignment.
     */
    data: XOR<ModuleAssignmentCreateInput, ModuleAssignmentUncheckedCreateInput>
  }

  /**
   * ModuleAssignment createMany
   */
  export type ModuleAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModuleAssignments.
     */
    data: ModuleAssignmentCreateManyInput | ModuleAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModuleAssignment createManyAndReturn
   */
  export type ModuleAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many ModuleAssignments.
     */
    data: ModuleAssignmentCreateManyInput | ModuleAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModuleAssignment update
   */
  export type ModuleAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ModuleAssignment.
     */
    data: XOR<ModuleAssignmentUpdateInput, ModuleAssignmentUncheckedUpdateInput>
    /**
     * Choose, which ModuleAssignment to update.
     */
    where: ModuleAssignmentWhereUniqueInput
  }

  /**
   * ModuleAssignment updateMany
   */
  export type ModuleAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModuleAssignments.
     */
    data: XOR<ModuleAssignmentUpdateManyMutationInput, ModuleAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ModuleAssignments to update
     */
    where?: ModuleAssignmentWhereInput
    /**
     * Limit how many ModuleAssignments to update.
     */
    limit?: number
  }

  /**
   * ModuleAssignment updateManyAndReturn
   */
  export type ModuleAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update ModuleAssignments.
     */
    data: XOR<ModuleAssignmentUpdateManyMutationInput, ModuleAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ModuleAssignments to update
     */
    where?: ModuleAssignmentWhereInput
    /**
     * Limit how many ModuleAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModuleAssignment upsert
   */
  export type ModuleAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ModuleAssignment to update in case it exists.
     */
    where: ModuleAssignmentWhereUniqueInput
    /**
     * In case the ModuleAssignment found by the `where` argument doesn't exist, create a new ModuleAssignment with this data.
     */
    create: XOR<ModuleAssignmentCreateInput, ModuleAssignmentUncheckedCreateInput>
    /**
     * In case the ModuleAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuleAssignmentUpdateInput, ModuleAssignmentUncheckedUpdateInput>
  }

  /**
   * ModuleAssignment delete
   */
  export type ModuleAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
    /**
     * Filter which ModuleAssignment to delete.
     */
    where: ModuleAssignmentWhereUniqueInput
  }

  /**
   * ModuleAssignment deleteMany
   */
  export type ModuleAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuleAssignments to delete
     */
    where?: ModuleAssignmentWhereInput
    /**
     * Limit how many ModuleAssignments to delete.
     */
    limit?: number
  }

  /**
   * ModuleAssignment without action
   */
  export type ModuleAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleAssignment
     */
    select?: ModuleAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleAssignment
     */
    omit?: ModuleAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model ModuleVideo
   */

  export type AggregateModuleVideo = {
    _count: ModuleVideoCountAggregateOutputType | null
    _avg: ModuleVideoAvgAggregateOutputType | null
    _sum: ModuleVideoSumAggregateOutputType | null
    _min: ModuleVideoMinAggregateOutputType | null
    _max: ModuleVideoMaxAggregateOutputType | null
  }

  export type ModuleVideoAvgAggregateOutputType = {
    id: number | null
    moduleId: number | null
    videoId: number | null
    order: number | null
  }

  export type ModuleVideoSumAggregateOutputType = {
    id: number | null
    moduleId: number | null
    videoId: number | null
    order: number | null
  }

  export type ModuleVideoMinAggregateOutputType = {
    id: number | null
    moduleId: number | null
    videoId: number | null
    order: number | null
  }

  export type ModuleVideoMaxAggregateOutputType = {
    id: number | null
    moduleId: number | null
    videoId: number | null
    order: number | null
  }

  export type ModuleVideoCountAggregateOutputType = {
    id: number
    moduleId: number
    videoId: number
    order: number
    _all: number
  }


  export type ModuleVideoAvgAggregateInputType = {
    id?: true
    moduleId?: true
    videoId?: true
    order?: true
  }

  export type ModuleVideoSumAggregateInputType = {
    id?: true
    moduleId?: true
    videoId?: true
    order?: true
  }

  export type ModuleVideoMinAggregateInputType = {
    id?: true
    moduleId?: true
    videoId?: true
    order?: true
  }

  export type ModuleVideoMaxAggregateInputType = {
    id?: true
    moduleId?: true
    videoId?: true
    order?: true
  }

  export type ModuleVideoCountAggregateInputType = {
    id?: true
    moduleId?: true
    videoId?: true
    order?: true
    _all?: true
  }

  export type ModuleVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuleVideo to aggregate.
     */
    where?: ModuleVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleVideos to fetch.
     */
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuleVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModuleVideos
    **/
    _count?: true | ModuleVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModuleVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModuleVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleVideoMaxAggregateInputType
  }

  export type GetModuleVideoAggregateType<T extends ModuleVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateModuleVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModuleVideo[P]>
      : GetScalarType<T[P], AggregateModuleVideo[P]>
  }




  export type ModuleVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleVideoWhereInput
    orderBy?: ModuleVideoOrderByWithAggregationInput | ModuleVideoOrderByWithAggregationInput[]
    by: ModuleVideoScalarFieldEnum[] | ModuleVideoScalarFieldEnum
    having?: ModuleVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleVideoCountAggregateInputType | true
    _avg?: ModuleVideoAvgAggregateInputType
    _sum?: ModuleVideoSumAggregateInputType
    _min?: ModuleVideoMinAggregateInputType
    _max?: ModuleVideoMaxAggregateInputType
  }

  export type ModuleVideoGroupByOutputType = {
    id: number
    moduleId: number
    videoId: number
    order: number
    _count: ModuleVideoCountAggregateOutputType | null
    _avg: ModuleVideoAvgAggregateOutputType | null
    _sum: ModuleVideoSumAggregateOutputType | null
    _min: ModuleVideoMinAggregateOutputType | null
    _max: ModuleVideoMaxAggregateOutputType | null
  }

  type GetModuleVideoGroupByPayload<T extends ModuleVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuleVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleVideoGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleVideoGroupByOutputType[P]>
        }
      >
    >


  export type ModuleVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    videoId?: boolean
    order?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleVideo"]>

  export type ModuleVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    videoId?: boolean
    order?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleVideo"]>

  export type ModuleVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    moduleId?: boolean
    videoId?: boolean
    order?: boolean
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moduleVideo"]>

  export type ModuleVideoSelectScalar = {
    id?: boolean
    moduleId?: boolean
    videoId?: boolean
    order?: boolean
  }

  export type ModuleVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "moduleId" | "videoId" | "order", ExtArgs["result"]["moduleVideo"]>
  export type ModuleVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type ModuleVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type ModuleVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    module?: boolean | ModuleDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $ModuleVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModuleVideo"
    objects: {
      module: Prisma.$ModulePayload<ExtArgs>
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      moduleId: number
      videoId: number
      order: number
    }, ExtArgs["result"]["moduleVideo"]>
    composites: {}
  }

  type ModuleVideoGetPayload<S extends boolean | null | undefined | ModuleVideoDefaultArgs> = $Result.GetResult<Prisma.$ModuleVideoPayload, S>

  type ModuleVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModuleVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModuleVideoCountAggregateInputType | true
    }

  export interface ModuleVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModuleVideo'], meta: { name: 'ModuleVideo' } }
    /**
     * Find zero or one ModuleVideo that matches the filter.
     * @param {ModuleVideoFindUniqueArgs} args - Arguments to find a ModuleVideo
     * @example
     * // Get one ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModuleVideoFindUniqueArgs>(args: SelectSubset<T, ModuleVideoFindUniqueArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModuleVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModuleVideoFindUniqueOrThrowArgs} args - Arguments to find a ModuleVideo
     * @example
     * // Get one ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModuleVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuleVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModuleVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoFindFirstArgs} args - Arguments to find a ModuleVideo
     * @example
     * // Get one ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModuleVideoFindFirstArgs>(args?: SelectSubset<T, ModuleVideoFindFirstArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModuleVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoFindFirstOrThrowArgs} args - Arguments to find a ModuleVideo
     * @example
     * // Get one ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModuleVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuleVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModuleVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModuleVideos
     * const moduleVideos = await prisma.moduleVideo.findMany()
     * 
     * // Get first 10 ModuleVideos
     * const moduleVideos = await prisma.moduleVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduleVideoWithIdOnly = await prisma.moduleVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModuleVideoFindManyArgs>(args?: SelectSubset<T, ModuleVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModuleVideo.
     * @param {ModuleVideoCreateArgs} args - Arguments to create a ModuleVideo.
     * @example
     * // Create one ModuleVideo
     * const ModuleVideo = await prisma.moduleVideo.create({
     *   data: {
     *     // ... data to create a ModuleVideo
     *   }
     * })
     * 
     */
    create<T extends ModuleVideoCreateArgs>(args: SelectSubset<T, ModuleVideoCreateArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModuleVideos.
     * @param {ModuleVideoCreateManyArgs} args - Arguments to create many ModuleVideos.
     * @example
     * // Create many ModuleVideos
     * const moduleVideo = await prisma.moduleVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModuleVideoCreateManyArgs>(args?: SelectSubset<T, ModuleVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModuleVideos and returns the data saved in the database.
     * @param {ModuleVideoCreateManyAndReturnArgs} args - Arguments to create many ModuleVideos.
     * @example
     * // Create many ModuleVideos
     * const moduleVideo = await prisma.moduleVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModuleVideos and only return the `id`
     * const moduleVideoWithIdOnly = await prisma.moduleVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModuleVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuleVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModuleVideo.
     * @param {ModuleVideoDeleteArgs} args - Arguments to delete one ModuleVideo.
     * @example
     * // Delete one ModuleVideo
     * const ModuleVideo = await prisma.moduleVideo.delete({
     *   where: {
     *     // ... filter to delete one ModuleVideo
     *   }
     * })
     * 
     */
    delete<T extends ModuleVideoDeleteArgs>(args: SelectSubset<T, ModuleVideoDeleteArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModuleVideo.
     * @param {ModuleVideoUpdateArgs} args - Arguments to update one ModuleVideo.
     * @example
     * // Update one ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModuleVideoUpdateArgs>(args: SelectSubset<T, ModuleVideoUpdateArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModuleVideos.
     * @param {ModuleVideoDeleteManyArgs} args - Arguments to filter ModuleVideos to delete.
     * @example
     * // Delete a few ModuleVideos
     * const { count } = await prisma.moduleVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModuleVideoDeleteManyArgs>(args?: SelectSubset<T, ModuleVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModuleVideos
     * const moduleVideo = await prisma.moduleVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModuleVideoUpdateManyArgs>(args: SelectSubset<T, ModuleVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModuleVideos and returns the data updated in the database.
     * @param {ModuleVideoUpdateManyAndReturnArgs} args - Arguments to update many ModuleVideos.
     * @example
     * // Update many ModuleVideos
     * const moduleVideo = await prisma.moduleVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModuleVideos and only return the `id`
     * const moduleVideoWithIdOnly = await prisma.moduleVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModuleVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuleVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModuleVideo.
     * @param {ModuleVideoUpsertArgs} args - Arguments to update or create a ModuleVideo.
     * @example
     * // Update or create a ModuleVideo
     * const moduleVideo = await prisma.moduleVideo.upsert({
     *   create: {
     *     // ... data to create a ModuleVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModuleVideo we want to update
     *   }
     * })
     */
    upsert<T extends ModuleVideoUpsertArgs>(args: SelectSubset<T, ModuleVideoUpsertArgs<ExtArgs>>): Prisma__ModuleVideoClient<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModuleVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoCountArgs} args - Arguments to filter ModuleVideos to count.
     * @example
     * // Count the number of ModuleVideos
     * const count = await prisma.moduleVideo.count({
     *   where: {
     *     // ... the filter for the ModuleVideos we want to count
     *   }
     * })
    **/
    count<T extends ModuleVideoCountArgs>(
      args?: Subset<T, ModuleVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModuleVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModuleVideoAggregateArgs>(args: Subset<T, ModuleVideoAggregateArgs>): Prisma.PrismaPromise<GetModuleVideoAggregateType<T>>

    /**
     * Group by ModuleVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleVideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModuleVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleVideoGroupByArgs['orderBy'] }
        : { orderBy?: ModuleVideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModuleVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModuleVideo model
   */
  readonly fields: ModuleVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModuleVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuleVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    module<T extends ModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuleDefaultArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModuleVideo model
   */
  interface ModuleVideoFieldRefs {
    readonly id: FieldRef<"ModuleVideo", 'Int'>
    readonly moduleId: FieldRef<"ModuleVideo", 'Int'>
    readonly videoId: FieldRef<"ModuleVideo", 'Int'>
    readonly order: FieldRef<"ModuleVideo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ModuleVideo findUnique
   */
  export type ModuleVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter, which ModuleVideo to fetch.
     */
    where: ModuleVideoWhereUniqueInput
  }

  /**
   * ModuleVideo findUniqueOrThrow
   */
  export type ModuleVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter, which ModuleVideo to fetch.
     */
    where: ModuleVideoWhereUniqueInput
  }

  /**
   * ModuleVideo findFirst
   */
  export type ModuleVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter, which ModuleVideo to fetch.
     */
    where?: ModuleVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleVideos to fetch.
     */
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleVideos.
     */
    cursor?: ModuleVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleVideos.
     */
    distinct?: ModuleVideoScalarFieldEnum | ModuleVideoScalarFieldEnum[]
  }

  /**
   * ModuleVideo findFirstOrThrow
   */
  export type ModuleVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter, which ModuleVideo to fetch.
     */
    where?: ModuleVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleVideos to fetch.
     */
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModuleVideos.
     */
    cursor?: ModuleVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModuleVideos.
     */
    distinct?: ModuleVideoScalarFieldEnum | ModuleVideoScalarFieldEnum[]
  }

  /**
   * ModuleVideo findMany
   */
  export type ModuleVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter, which ModuleVideos to fetch.
     */
    where?: ModuleVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModuleVideos to fetch.
     */
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModuleVideos.
     */
    cursor?: ModuleVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModuleVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModuleVideos.
     */
    skip?: number
    distinct?: ModuleVideoScalarFieldEnum | ModuleVideoScalarFieldEnum[]
  }

  /**
   * ModuleVideo create
   */
  export type ModuleVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a ModuleVideo.
     */
    data: XOR<ModuleVideoCreateInput, ModuleVideoUncheckedCreateInput>
  }

  /**
   * ModuleVideo createMany
   */
  export type ModuleVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModuleVideos.
     */
    data: ModuleVideoCreateManyInput | ModuleVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModuleVideo createManyAndReturn
   */
  export type ModuleVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * The data used to create many ModuleVideos.
     */
    data: ModuleVideoCreateManyInput | ModuleVideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModuleVideo update
   */
  export type ModuleVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a ModuleVideo.
     */
    data: XOR<ModuleVideoUpdateInput, ModuleVideoUncheckedUpdateInput>
    /**
     * Choose, which ModuleVideo to update.
     */
    where: ModuleVideoWhereUniqueInput
  }

  /**
   * ModuleVideo updateMany
   */
  export type ModuleVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModuleVideos.
     */
    data: XOR<ModuleVideoUpdateManyMutationInput, ModuleVideoUncheckedUpdateManyInput>
    /**
     * Filter which ModuleVideos to update
     */
    where?: ModuleVideoWhereInput
    /**
     * Limit how many ModuleVideos to update.
     */
    limit?: number
  }

  /**
   * ModuleVideo updateManyAndReturn
   */
  export type ModuleVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * The data used to update ModuleVideos.
     */
    data: XOR<ModuleVideoUpdateManyMutationInput, ModuleVideoUncheckedUpdateManyInput>
    /**
     * Filter which ModuleVideos to update
     */
    where?: ModuleVideoWhereInput
    /**
     * Limit how many ModuleVideos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModuleVideo upsert
   */
  export type ModuleVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the ModuleVideo to update in case it exists.
     */
    where: ModuleVideoWhereUniqueInput
    /**
     * In case the ModuleVideo found by the `where` argument doesn't exist, create a new ModuleVideo with this data.
     */
    create: XOR<ModuleVideoCreateInput, ModuleVideoUncheckedCreateInput>
    /**
     * In case the ModuleVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuleVideoUpdateInput, ModuleVideoUncheckedUpdateInput>
  }

  /**
   * ModuleVideo delete
   */
  export type ModuleVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    /**
     * Filter which ModuleVideo to delete.
     */
    where: ModuleVideoWhereUniqueInput
  }

  /**
   * ModuleVideo deleteMany
   */
  export type ModuleVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModuleVideos to delete
     */
    where?: ModuleVideoWhereInput
    /**
     * Limit how many ModuleVideos to delete.
     */
    limit?: number
  }

  /**
   * ModuleVideo without action
   */
  export type ModuleVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
  }


  /**
   * Model Video
   */

  export type AggregateVideo = {
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  export type VideoAvgAggregateOutputType = {
    id: number | null
    duration: number | null
  }

  export type VideoSumAggregateOutputType = {
    id: number | null
    duration: number | null
  }

  export type VideoMinAggregateOutputType = {
    id: number | null
    title: string | null
    platform: string | null
    videoUrl: string | null
    videoId: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type VideoMaxAggregateOutputType = {
    id: number | null
    title: string | null
    platform: string | null
    videoUrl: string | null
    videoId: string | null
    duration: number | null
    createdAt: Date | null
  }

  export type VideoCountAggregateOutputType = {
    id: number
    title: number
    platform: number
    videoUrl: number
    videoId: number
    duration: number
    createdAt: number
    _all: number
  }


  export type VideoAvgAggregateInputType = {
    id?: true
    duration?: true
  }

  export type VideoSumAggregateInputType = {
    id?: true
    duration?: true
  }

  export type VideoMinAggregateInputType = {
    id?: true
    title?: true
    platform?: true
    videoUrl?: true
    videoId?: true
    duration?: true
    createdAt?: true
  }

  export type VideoMaxAggregateInputType = {
    id?: true
    title?: true
    platform?: true
    videoUrl?: true
    videoId?: true
    duration?: true
    createdAt?: true
  }

  export type VideoCountAggregateInputType = {
    id?: true
    title?: true
    platform?: true
    videoUrl?: true
    videoId?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type VideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Video to aggregate.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Videos
    **/
    _count?: true | VideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoMaxAggregateInputType
  }

  export type GetVideoAggregateType<T extends VideoAggregateArgs> = {
        [P in keyof T & keyof AggregateVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideo[P]>
      : GetScalarType<T[P], AggregateVideo[P]>
  }




  export type VideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoWhereInput
    orderBy?: VideoOrderByWithAggregationInput | VideoOrderByWithAggregationInput[]
    by: VideoScalarFieldEnum[] | VideoScalarFieldEnum
    having?: VideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoCountAggregateInputType | true
    _avg?: VideoAvgAggregateInputType
    _sum?: VideoSumAggregateInputType
    _min?: VideoMinAggregateInputType
    _max?: VideoMaxAggregateInputType
  }

  export type VideoGroupByOutputType = {
    id: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date
    _count: VideoCountAggregateOutputType | null
    _avg: VideoAvgAggregateOutputType | null
    _sum: VideoSumAggregateOutputType | null
    _min: VideoMinAggregateOutputType | null
    _max: VideoMaxAggregateOutputType | null
  }

  type GetVideoGroupByPayload<T extends VideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoGroupByOutputType[P]>
            : GetScalarType<T[P], VideoGroupByOutputType[P]>
        }
      >
    >


  export type VideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
    moduleVideos?: boolean | Video$moduleVideosArgs<ExtArgs>
    watchLogs?: boolean | Video$watchLogsArgs<ExtArgs>
    quiz?: boolean | Video$quizArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["video"]>

  export type VideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectScalar = {
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
  }

  export type VideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "platform" | "videoUrl" | "videoId" | "duration" | "createdAt", ExtArgs["result"]["video"]>
  export type VideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    moduleVideos?: boolean | Video$moduleVideosArgs<ExtArgs>
    watchLogs?: boolean | Video$watchLogsArgs<ExtArgs>
    quiz?: boolean | Video$quizArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Video"
    objects: {
      moduleVideos: Prisma.$ModuleVideoPayload<ExtArgs>[]
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
      quiz: Prisma.$QuizPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      platform: string
      videoUrl: string
      videoId: string
      duration: number
      createdAt: Date
    }, ExtArgs["result"]["video"]>
    composites: {}
  }

  type VideoGetPayload<S extends boolean | null | undefined | VideoDefaultArgs> = $Result.GetResult<Prisma.$VideoPayload, S>

  type VideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoCountAggregateInputType | true
    }

  export interface VideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Video'], meta: { name: 'Video' } }
    /**
     * Find zero or one Video that matches the filter.
     * @param {VideoFindUniqueArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoFindUniqueArgs>(args: SelectSubset<T, VideoFindUniqueArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Video that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoFindUniqueOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoFindFirstArgs>(args?: SelectSubset<T, VideoFindFirstArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Video that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindFirstOrThrowArgs} args - Arguments to find a Video
     * @example
     * // Get one Video
     * const video = await prisma.video.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Videos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Videos
     * const videos = await prisma.video.findMany()
     * 
     * // Get first 10 Videos
     * const videos = await prisma.video.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoWithIdOnly = await prisma.video.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoFindManyArgs>(args?: SelectSubset<T, VideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Video.
     * @param {VideoCreateArgs} args - Arguments to create a Video.
     * @example
     * // Create one Video
     * const Video = await prisma.video.create({
     *   data: {
     *     // ... data to create a Video
     *   }
     * })
     * 
     */
    create<T extends VideoCreateArgs>(args: SelectSubset<T, VideoCreateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Videos.
     * @param {VideoCreateManyArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoCreateManyArgs>(args?: SelectSubset<T, VideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Videos and returns the data saved in the database.
     * @param {VideoCreateManyAndReturnArgs} args - Arguments to create many Videos.
     * @example
     * // Create many Videos
     * const video = await prisma.video.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Video.
     * @param {VideoDeleteArgs} args - Arguments to delete one Video.
     * @example
     * // Delete one Video
     * const Video = await prisma.video.delete({
     *   where: {
     *     // ... filter to delete one Video
     *   }
     * })
     * 
     */
    delete<T extends VideoDeleteArgs>(args: SelectSubset<T, VideoDeleteArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Video.
     * @param {VideoUpdateArgs} args - Arguments to update one Video.
     * @example
     * // Update one Video
     * const video = await prisma.video.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoUpdateArgs>(args: SelectSubset<T, VideoUpdateArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Videos.
     * @param {VideoDeleteManyArgs} args - Arguments to filter Videos to delete.
     * @example
     * // Delete a few Videos
     * const { count } = await prisma.video.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoDeleteManyArgs>(args?: SelectSubset<T, VideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoUpdateManyArgs>(args: SelectSubset<T, VideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Videos and returns the data updated in the database.
     * @param {VideoUpdateManyAndReturnArgs} args - Arguments to update many Videos.
     * @example
     * // Update many Videos
     * const video = await prisma.video.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Videos and only return the `id`
     * const videoWithIdOnly = await prisma.video.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Video.
     * @param {VideoUpsertArgs} args - Arguments to update or create a Video.
     * @example
     * // Update or create a Video
     * const video = await prisma.video.upsert({
     *   create: {
     *     // ... data to create a Video
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Video we want to update
     *   }
     * })
     */
    upsert<T extends VideoUpsertArgs>(args: SelectSubset<T, VideoUpsertArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Videos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoCountArgs} args - Arguments to filter Videos to count.
     * @example
     * // Count the number of Videos
     * const count = await prisma.video.count({
     *   where: {
     *     // ... the filter for the Videos we want to count
     *   }
     * })
    **/
    count<T extends VideoCountArgs>(
      args?: Subset<T, VideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoAggregateArgs>(args: Subset<T, VideoAggregateArgs>): Prisma.PrismaPromise<GetVideoAggregateType<T>>

    /**
     * Group by Video.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoGroupByArgs['orderBy'] }
        : { orderBy?: VideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Video model
   */
  readonly fields: VideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Video.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    moduleVideos<T extends Video$moduleVideosArgs<ExtArgs> = {}>(args?: Subset<T, Video$moduleVideosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModuleVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchLogs<T extends Video$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, Video$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz<T extends Video$quizArgs<ExtArgs> = {}>(args?: Subset<T, Video$quizArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Video model
   */
  interface VideoFieldRefs {
    readonly id: FieldRef<"Video", 'Int'>
    readonly title: FieldRef<"Video", 'String'>
    readonly platform: FieldRef<"Video", 'String'>
    readonly videoUrl: FieldRef<"Video", 'String'>
    readonly videoId: FieldRef<"Video", 'String'>
    readonly duration: FieldRef<"Video", 'Int'>
    readonly createdAt: FieldRef<"Video", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Video findUnique
   */
  export type VideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findUniqueOrThrow
   */
  export type VideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video findFirst
   */
  export type VideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findFirstOrThrow
   */
  export type VideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Video to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Videos.
     */
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video findMany
   */
  export type VideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter, which Videos to fetch.
     */
    where?: VideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Videos to fetch.
     */
    orderBy?: VideoOrderByWithRelationInput | VideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Videos.
     */
    cursor?: VideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Videos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Videos.
     */
    skip?: number
    distinct?: VideoScalarFieldEnum | VideoScalarFieldEnum[]
  }

  /**
   * Video create
   */
  export type VideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to create a Video.
     */
    data: XOR<VideoCreateInput, VideoUncheckedCreateInput>
  }

  /**
   * Video createMany
   */
  export type VideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Video createManyAndReturn
   */
  export type VideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to create many Videos.
     */
    data: VideoCreateManyInput | VideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Video update
   */
  export type VideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The data needed to update a Video.
     */
    data: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
    /**
     * Choose, which Video to update.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video updateMany
   */
  export type VideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
  }

  /**
   * Video updateManyAndReturn
   */
  export type VideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * The data used to update Videos.
     */
    data: XOR<VideoUpdateManyMutationInput, VideoUncheckedUpdateManyInput>
    /**
     * Filter which Videos to update
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to update.
     */
    limit?: number
  }

  /**
   * Video upsert
   */
  export type VideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * The filter to search for the Video to update in case it exists.
     */
    where: VideoWhereUniqueInput
    /**
     * In case the Video found by the `where` argument doesn't exist, create a new Video with this data.
     */
    create: XOR<VideoCreateInput, VideoUncheckedCreateInput>
    /**
     * In case the Video was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoUpdateInput, VideoUncheckedUpdateInput>
  }

  /**
   * Video delete
   */
  export type VideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
    /**
     * Filter which Video to delete.
     */
    where: VideoWhereUniqueInput
  }

  /**
   * Video deleteMany
   */
  export type VideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Videos to delete
     */
    where?: VideoWhereInput
    /**
     * Limit how many Videos to delete.
     */
    limit?: number
  }

  /**
   * Video.moduleVideos
   */
  export type Video$moduleVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleVideo
     */
    select?: ModuleVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModuleVideo
     */
    omit?: ModuleVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModuleVideoInclude<ExtArgs> | null
    where?: ModuleVideoWhereInput
    orderBy?: ModuleVideoOrderByWithRelationInput | ModuleVideoOrderByWithRelationInput[]
    cursor?: ModuleVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuleVideoScalarFieldEnum | ModuleVideoScalarFieldEnum[]
  }

  /**
   * Video.watchLogs
   */
  export type Video$watchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    cursor?: WatchLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * Video.quiz
   */
  export type Video$quizArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    where?: QuizWhereInput
  }

  /**
   * Video without action
   */
  export type VideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Video
     */
    select?: VideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Video
     */
    omit?: VideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoInclude<ExtArgs> | null
  }


  /**
   * Model WatchLog
   */

  export type AggregateWatchLog = {
    _count: WatchLogCountAggregateOutputType | null
    _avg: WatchLogAvgAggregateOutputType | null
    _sum: WatchLogSumAggregateOutputType | null
    _min: WatchLogMinAggregateOutputType | null
    _max: WatchLogMaxAggregateOutputType | null
  }

  export type WatchLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    totalWatchTime: number | null
    watchedPercentage: number | null
  }

  export type WatchLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    totalWatchTime: number | null
    watchedPercentage: number | null
  }

  export type WatchLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    totalWatchTime: number | null
    isCompleted: boolean | null
    watchedPercentage: number | null
    createdAt: Date | null
  }

  export type WatchLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    totalWatchTime: number | null
    isCompleted: boolean | null
    watchedPercentage: number | null
    createdAt: Date | null
  }

  export type WatchLogCountAggregateOutputType = {
    id: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted: number
    watchedPercentage: number
    skipEvents: number
    pauseEvents: number
    createdAt: number
    _all: number
  }


  export type WatchLogAvgAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    watchedPercentage?: true
  }

  export type WatchLogSumAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    watchedPercentage?: true
  }

  export type WatchLogMinAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    isCompleted?: true
    watchedPercentage?: true
    createdAt?: true
  }

  export type WatchLogMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    isCompleted?: true
    watchedPercentage?: true
    createdAt?: true
  }

  export type WatchLogCountAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    isCompleted?: true
    watchedPercentage?: true
    skipEvents?: true
    pauseEvents?: true
    createdAt?: true
    _all?: true
  }

  export type WatchLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchLog to aggregate.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchLogs
    **/
    _count?: true | WatchLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchLogMaxAggregateInputType
  }

  export type GetWatchLogAggregateType<T extends WatchLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchLog[P]>
      : GetScalarType<T[P], AggregateWatchLog[P]>
  }




  export type WatchLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
    orderBy?: WatchLogOrderByWithAggregationInput | WatchLogOrderByWithAggregationInput[]
    by: WatchLogScalarFieldEnum[] | WatchLogScalarFieldEnum
    having?: WatchLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchLogCountAggregateInputType | true
    _avg?: WatchLogAvgAggregateInputType
    _sum?: WatchLogSumAggregateInputType
    _min?: WatchLogMinAggregateInputType
    _max?: WatchLogMaxAggregateInputType
  }

  export type WatchLogGroupByOutputType = {
    id: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonValue
    pauseEvents: JsonValue
    createdAt: Date
    _count: WatchLogCountAggregateOutputType | null
    _avg: WatchLogAvgAggregateOutputType | null
    _sum: WatchLogSumAggregateOutputType | null
    _min: WatchLogMinAggregateOutputType | null
    _max: WatchLogMaxAggregateOutputType | null
  }

  type GetWatchLogGroupByPayload<T extends WatchLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchLogGroupByOutputType[P]>
            : GetScalarType<T[P], WatchLogGroupByOutputType[P]>
        }
      >
    >


  export type WatchLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    totalWatchTime?: boolean
    isCompleted?: boolean
    watchedPercentage?: boolean
    skipEvents?: boolean
    pauseEvents?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchLog"]>

  export type WatchLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    totalWatchTime?: boolean
    isCompleted?: boolean
    watchedPercentage?: boolean
    skipEvents?: boolean
    pauseEvents?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchLog"]>

  export type WatchLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    totalWatchTime?: boolean
    isCompleted?: boolean
    watchedPercentage?: boolean
    skipEvents?: boolean
    pauseEvents?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchLog"]>

  export type WatchLogSelectScalar = {
    id?: boolean
    userId?: boolean
    videoId?: boolean
    totalWatchTime?: boolean
    isCompleted?: boolean
    watchedPercentage?: boolean
    skipEvents?: boolean
    pauseEvents?: boolean
    createdAt?: boolean
  }

  export type WatchLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "totalWatchTime" | "isCompleted" | "watchedPercentage" | "skipEvents" | "pauseEvents" | "createdAt", ExtArgs["result"]["watchLog"]>
  export type WatchLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type WatchLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type WatchLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $WatchLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      videoId: number
      totalWatchTime: number
      isCompleted: boolean
      watchedPercentage: number
      skipEvents: Prisma.JsonValue
      pauseEvents: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["watchLog"]>
    composites: {}
  }

  type WatchLogGetPayload<S extends boolean | null | undefined | WatchLogDefaultArgs> = $Result.GetResult<Prisma.$WatchLogPayload, S>

  type WatchLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchLogCountAggregateInputType | true
    }

  export interface WatchLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchLog'], meta: { name: 'WatchLog' } }
    /**
     * Find zero or one WatchLog that matches the filter.
     * @param {WatchLogFindUniqueArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchLogFindUniqueArgs>(args: SelectSubset<T, WatchLogFindUniqueArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WatchLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchLogFindUniqueOrThrowArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindFirstArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchLogFindFirstArgs>(args?: SelectSubset<T, WatchLogFindFirstArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindFirstOrThrowArgs} args - Arguments to find a WatchLog
     * @example
     * // Get one WatchLog
     * const watchLog = await prisma.watchLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WatchLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchLogs
     * const watchLogs = await prisma.watchLog.findMany()
     * 
     * // Get first 10 WatchLogs
     * const watchLogs = await prisma.watchLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchLogWithIdOnly = await prisma.watchLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchLogFindManyArgs>(args?: SelectSubset<T, WatchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WatchLog.
     * @param {WatchLogCreateArgs} args - Arguments to create a WatchLog.
     * @example
     * // Create one WatchLog
     * const WatchLog = await prisma.watchLog.create({
     *   data: {
     *     // ... data to create a WatchLog
     *   }
     * })
     * 
     */
    create<T extends WatchLogCreateArgs>(args: SelectSubset<T, WatchLogCreateArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WatchLogs.
     * @param {WatchLogCreateManyArgs} args - Arguments to create many WatchLogs.
     * @example
     * // Create many WatchLogs
     * const watchLog = await prisma.watchLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchLogCreateManyArgs>(args?: SelectSubset<T, WatchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchLogs and returns the data saved in the database.
     * @param {WatchLogCreateManyAndReturnArgs} args - Arguments to create many WatchLogs.
     * @example
     * // Create many WatchLogs
     * const watchLog = await prisma.watchLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchLogs and only return the `id`
     * const watchLogWithIdOnly = await prisma.watchLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WatchLog.
     * @param {WatchLogDeleteArgs} args - Arguments to delete one WatchLog.
     * @example
     * // Delete one WatchLog
     * const WatchLog = await prisma.watchLog.delete({
     *   where: {
     *     // ... filter to delete one WatchLog
     *   }
     * })
     * 
     */
    delete<T extends WatchLogDeleteArgs>(args: SelectSubset<T, WatchLogDeleteArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WatchLog.
     * @param {WatchLogUpdateArgs} args - Arguments to update one WatchLog.
     * @example
     * // Update one WatchLog
     * const watchLog = await prisma.watchLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchLogUpdateArgs>(args: SelectSubset<T, WatchLogUpdateArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WatchLogs.
     * @param {WatchLogDeleteManyArgs} args - Arguments to filter WatchLogs to delete.
     * @example
     * // Delete a few WatchLogs
     * const { count } = await prisma.watchLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchLogDeleteManyArgs>(args?: SelectSubset<T, WatchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchLogs
     * const watchLog = await prisma.watchLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchLogUpdateManyArgs>(args: SelectSubset<T, WatchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchLogs and returns the data updated in the database.
     * @param {WatchLogUpdateManyAndReturnArgs} args - Arguments to update many WatchLogs.
     * @example
     * // Update many WatchLogs
     * const watchLog = await prisma.watchLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WatchLogs and only return the `id`
     * const watchLogWithIdOnly = await prisma.watchLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WatchLog.
     * @param {WatchLogUpsertArgs} args - Arguments to update or create a WatchLog.
     * @example
     * // Update or create a WatchLog
     * const watchLog = await prisma.watchLog.upsert({
     *   create: {
     *     // ... data to create a WatchLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchLog we want to update
     *   }
     * })
     */
    upsert<T extends WatchLogUpsertArgs>(args: SelectSubset<T, WatchLogUpsertArgs<ExtArgs>>): Prisma__WatchLogClient<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WatchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogCountArgs} args - Arguments to filter WatchLogs to count.
     * @example
     * // Count the number of WatchLogs
     * const count = await prisma.watchLog.count({
     *   where: {
     *     // ... the filter for the WatchLogs we want to count
     *   }
     * })
    **/
    count<T extends WatchLogCountArgs>(
      args?: Subset<T, WatchLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchLogAggregateArgs>(args: Subset<T, WatchLogAggregateArgs>): Prisma.PrismaPromise<GetWatchLogAggregateType<T>>

    /**
     * Group by WatchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchLogGroupByArgs['orderBy'] }
        : { orderBy?: WatchLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchLog model
   */
  readonly fields: WatchLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchLog model
   */
  interface WatchLogFieldRefs {
    readonly id: FieldRef<"WatchLog", 'Int'>
    readonly userId: FieldRef<"WatchLog", 'Int'>
    readonly videoId: FieldRef<"WatchLog", 'Int'>
    readonly totalWatchTime: FieldRef<"WatchLog", 'Int'>
    readonly isCompleted: FieldRef<"WatchLog", 'Boolean'>
    readonly watchedPercentage: FieldRef<"WatchLog", 'Float'>
    readonly skipEvents: FieldRef<"WatchLog", 'Json'>
    readonly pauseEvents: FieldRef<"WatchLog", 'Json'>
    readonly createdAt: FieldRef<"WatchLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WatchLog findUnique
   */
  export type WatchLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog findUniqueOrThrow
   */
  export type WatchLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog findFirst
   */
  export type WatchLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchLogs.
     */
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog findFirstOrThrow
   */
  export type WatchLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLog to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchLogs.
     */
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog findMany
   */
  export type WatchLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter, which WatchLogs to fetch.
     */
    where?: WatchLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchLogs to fetch.
     */
    orderBy?: WatchLogOrderByWithRelationInput | WatchLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchLogs.
     */
    cursor?: WatchLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchLogs.
     */
    skip?: number
    distinct?: WatchLogScalarFieldEnum | WatchLogScalarFieldEnum[]
  }

  /**
   * WatchLog create
   */
  export type WatchLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchLog.
     */
    data: XOR<WatchLogCreateInput, WatchLogUncheckedCreateInput>
  }

  /**
   * WatchLog createMany
   */
  export type WatchLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchLogs.
     */
    data: WatchLogCreateManyInput | WatchLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WatchLog createManyAndReturn
   */
  export type WatchLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * The data used to create many WatchLogs.
     */
    data: WatchLogCreateManyInput | WatchLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchLog update
   */
  export type WatchLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchLog.
     */
    data: XOR<WatchLogUpdateInput, WatchLogUncheckedUpdateInput>
    /**
     * Choose, which WatchLog to update.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog updateMany
   */
  export type WatchLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchLogs.
     */
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyInput>
    /**
     * Filter which WatchLogs to update
     */
    where?: WatchLogWhereInput
    /**
     * Limit how many WatchLogs to update.
     */
    limit?: number
  }

  /**
   * WatchLog updateManyAndReturn
   */
  export type WatchLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * The data used to update WatchLogs.
     */
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyInput>
    /**
     * Filter which WatchLogs to update
     */
    where?: WatchLogWhereInput
    /**
     * Limit how many WatchLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchLog upsert
   */
  export type WatchLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchLog to update in case it exists.
     */
    where: WatchLogWhereUniqueInput
    /**
     * In case the WatchLog found by the `where` argument doesn't exist, create a new WatchLog with this data.
     */
    create: XOR<WatchLogCreateInput, WatchLogUncheckedCreateInput>
    /**
     * In case the WatchLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchLogUpdateInput, WatchLogUncheckedUpdateInput>
  }

  /**
   * WatchLog delete
   */
  export type WatchLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
    /**
     * Filter which WatchLog to delete.
     */
    where: WatchLogWhereUniqueInput
  }

  /**
   * WatchLog deleteMany
   */
  export type WatchLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchLogs to delete
     */
    where?: WatchLogWhereInput
    /**
     * Limit how many WatchLogs to delete.
     */
    limit?: number
  }

  /**
   * WatchLog without action
   */
  export type WatchLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchLog
     */
    select?: WatchLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchLog
     */
    omit?: WatchLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchLogInclude<ExtArgs> | null
  }


  /**
   * Model Quiz
   */

  export type AggregateQuiz = {
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  export type QuizAvgAggregateOutputType = {
    id: number | null
    videoId: number | null
  }

  export type QuizSumAggregateOutputType = {
    id: number | null
    videoId: number | null
  }

  export type QuizMinAggregateOutputType = {
    id: number | null
    videoId: number | null
    generatedBy: string | null
    createdAt: Date | null
  }

  export type QuizMaxAggregateOutputType = {
    id: number | null
    videoId: number | null
    generatedBy: string | null
    createdAt: Date | null
  }

  export type QuizCountAggregateOutputType = {
    id: number
    videoId: number
    generatedBy: number
    createdAt: number
    questions: number
    _all: number
  }


  export type QuizAvgAggregateInputType = {
    id?: true
    videoId?: true
  }

  export type QuizSumAggregateInputType = {
    id?: true
    videoId?: true
  }

  export type QuizMinAggregateInputType = {
    id?: true
    videoId?: true
    generatedBy?: true
    createdAt?: true
  }

  export type QuizMaxAggregateInputType = {
    id?: true
    videoId?: true
    generatedBy?: true
    createdAt?: true
  }

  export type QuizCountAggregateInputType = {
    id?: true
    videoId?: true
    generatedBy?: true
    createdAt?: true
    questions?: true
    _all?: true
  }

  export type QuizAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quiz to aggregate.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quizzes
    **/
    _count?: true | QuizCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizMaxAggregateInputType
  }

  export type GetQuizAggregateType<T extends QuizAggregateArgs> = {
        [P in keyof T & keyof AggregateQuiz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuiz[P]>
      : GetScalarType<T[P], AggregateQuiz[P]>
  }




  export type QuizGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizWhereInput
    orderBy?: QuizOrderByWithAggregationInput | QuizOrderByWithAggregationInput[]
    by: QuizScalarFieldEnum[] | QuizScalarFieldEnum
    having?: QuizScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizCountAggregateInputType | true
    _avg?: QuizAvgAggregateInputType
    _sum?: QuizSumAggregateInputType
    _min?: QuizMinAggregateInputType
    _max?: QuizMaxAggregateInputType
  }

  export type QuizGroupByOutputType = {
    id: number
    videoId: number
    generatedBy: string
    createdAt: Date
    questions: JsonValue
    _count: QuizCountAggregateOutputType | null
    _avg: QuizAvgAggregateOutputType | null
    _sum: QuizSumAggregateOutputType | null
    _min: QuizMinAggregateOutputType | null
    _max: QuizMaxAggregateOutputType | null
  }

  type GetQuizGroupByPayload<T extends QuizGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizGroupByOutputType[P]>
            : GetScalarType<T[P], QuizGroupByOutputType[P]>
        }
      >
    >


  export type QuizSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    generatedBy?: boolean
    createdAt?: boolean
    questions?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    generatedBy?: boolean
    createdAt?: boolean
    questions?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    videoId?: boolean
    generatedBy?: boolean
    createdAt?: boolean
    questions?: boolean
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quiz"]>

  export type QuizSelectScalar = {
    id?: boolean
    videoId?: boolean
    generatedBy?: boolean
    createdAt?: boolean
    questions?: boolean
  }

  export type QuizOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "videoId" | "generatedBy" | "createdAt" | "questions", ExtArgs["result"]["quiz"]>
  export type QuizInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
    attempts?: boolean | Quiz$attemptsArgs<ExtArgs>
    _count?: boolean | QuizCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type QuizIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $QuizPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quiz"
    objects: {
      video: Prisma.$VideoPayload<ExtArgs>
      attempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      videoId: number
      generatedBy: string
      createdAt: Date
      questions: Prisma.JsonValue
    }, ExtArgs["result"]["quiz"]>
    composites: {}
  }

  type QuizGetPayload<S extends boolean | null | undefined | QuizDefaultArgs> = $Result.GetResult<Prisma.$QuizPayload, S>

  type QuizCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizCountAggregateInputType | true
    }

  export interface QuizDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quiz'], meta: { name: 'Quiz' } }
    /**
     * Find zero or one Quiz that matches the filter.
     * @param {QuizFindUniqueArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizFindUniqueArgs>(args: SelectSubset<T, QuizFindUniqueArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quiz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizFindUniqueOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizFindFirstArgs>(args?: SelectSubset<T, QuizFindFirstArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quiz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindFirstOrThrowArgs} args - Arguments to find a Quiz
     * @example
     * // Get one Quiz
     * const quiz = await prisma.quiz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quizzes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quizzes
     * const quizzes = await prisma.quiz.findMany()
     * 
     * // Get first 10 Quizzes
     * const quizzes = await prisma.quiz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizWithIdOnly = await prisma.quiz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizFindManyArgs>(args?: SelectSubset<T, QuizFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quiz.
     * @param {QuizCreateArgs} args - Arguments to create a Quiz.
     * @example
     * // Create one Quiz
     * const Quiz = await prisma.quiz.create({
     *   data: {
     *     // ... data to create a Quiz
     *   }
     * })
     * 
     */
    create<T extends QuizCreateArgs>(args: SelectSubset<T, QuizCreateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quizzes.
     * @param {QuizCreateManyArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizCreateManyArgs>(args?: SelectSubset<T, QuizCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quizzes and returns the data saved in the database.
     * @param {QuizCreateManyAndReturnArgs} args - Arguments to create many Quizzes.
     * @example
     * // Create many Quizzes
     * const quiz = await prisma.quiz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quiz.
     * @param {QuizDeleteArgs} args - Arguments to delete one Quiz.
     * @example
     * // Delete one Quiz
     * const Quiz = await prisma.quiz.delete({
     *   where: {
     *     // ... filter to delete one Quiz
     *   }
     * })
     * 
     */
    delete<T extends QuizDeleteArgs>(args: SelectSubset<T, QuizDeleteArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quiz.
     * @param {QuizUpdateArgs} args - Arguments to update one Quiz.
     * @example
     * // Update one Quiz
     * const quiz = await prisma.quiz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizUpdateArgs>(args: SelectSubset<T, QuizUpdateArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quizzes.
     * @param {QuizDeleteManyArgs} args - Arguments to filter Quizzes to delete.
     * @example
     * // Delete a few Quizzes
     * const { count } = await prisma.quiz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizDeleteManyArgs>(args?: SelectSubset<T, QuizDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizUpdateManyArgs>(args: SelectSubset<T, QuizUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quizzes and returns the data updated in the database.
     * @param {QuizUpdateManyAndReturnArgs} args - Arguments to update many Quizzes.
     * @example
     * // Update many Quizzes
     * const quiz = await prisma.quiz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quizzes and only return the `id`
     * const quizWithIdOnly = await prisma.quiz.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quiz.
     * @param {QuizUpsertArgs} args - Arguments to update or create a Quiz.
     * @example
     * // Update or create a Quiz
     * const quiz = await prisma.quiz.upsert({
     *   create: {
     *     // ... data to create a Quiz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quiz we want to update
     *   }
     * })
     */
    upsert<T extends QuizUpsertArgs>(args: SelectSubset<T, QuizUpsertArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quizzes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizCountArgs} args - Arguments to filter Quizzes to count.
     * @example
     * // Count the number of Quizzes
     * const count = await prisma.quiz.count({
     *   where: {
     *     // ... the filter for the Quizzes we want to count
     *   }
     * })
    **/
    count<T extends QuizCountArgs>(
      args?: Subset<T, QuizCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAggregateArgs>(args: Subset<T, QuizAggregateArgs>): Prisma.PrismaPromise<GetQuizAggregateType<T>>

    /**
     * Group by Quiz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizGroupByArgs['orderBy'] }
        : { orderBy?: QuizGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quiz model
   */
  readonly fields: QuizFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quiz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    video<T extends VideoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VideoDefaultArgs<ExtArgs>>): Prisma__VideoClient<$Result.GetResult<Prisma.$VideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attempts<T extends Quiz$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Quiz$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quiz model
   */
  interface QuizFieldRefs {
    readonly id: FieldRef<"Quiz", 'Int'>
    readonly videoId: FieldRef<"Quiz", 'Int'>
    readonly generatedBy: FieldRef<"Quiz", 'String'>
    readonly createdAt: FieldRef<"Quiz", 'DateTime'>
    readonly questions: FieldRef<"Quiz", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Quiz findUnique
   */
  export type QuizFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findUniqueOrThrow
   */
  export type QuizFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz findFirst
   */
  export type QuizFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findFirstOrThrow
   */
  export type QuizFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quiz to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quizzes.
     */
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz findMany
   */
  export type QuizFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter, which Quizzes to fetch.
     */
    where?: QuizWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quizzes to fetch.
     */
    orderBy?: QuizOrderByWithRelationInput | QuizOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quizzes.
     */
    cursor?: QuizWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quizzes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quizzes.
     */
    skip?: number
    distinct?: QuizScalarFieldEnum | QuizScalarFieldEnum[]
  }

  /**
   * Quiz create
   */
  export type QuizCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to create a Quiz.
     */
    data: XOR<QuizCreateInput, QuizUncheckedCreateInput>
  }

  /**
   * Quiz createMany
   */
  export type QuizCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quiz createManyAndReturn
   */
  export type QuizCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to create many Quizzes.
     */
    data: QuizCreateManyInput | QuizCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz update
   */
  export type QuizUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The data needed to update a Quiz.
     */
    data: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
    /**
     * Choose, which Quiz to update.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz updateMany
   */
  export type QuizUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
  }

  /**
   * Quiz updateManyAndReturn
   */
  export type QuizUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * The data used to update Quizzes.
     */
    data: XOR<QuizUpdateManyMutationInput, QuizUncheckedUpdateManyInput>
    /**
     * Filter which Quizzes to update
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Quiz upsert
   */
  export type QuizUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * The filter to search for the Quiz to update in case it exists.
     */
    where: QuizWhereUniqueInput
    /**
     * In case the Quiz found by the `where` argument doesn't exist, create a new Quiz with this data.
     */
    create: XOR<QuizCreateInput, QuizUncheckedCreateInput>
    /**
     * In case the Quiz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizUpdateInput, QuizUncheckedUpdateInput>
  }

  /**
   * Quiz delete
   */
  export type QuizDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
    /**
     * Filter which Quiz to delete.
     */
    where: QuizWhereUniqueInput
  }

  /**
   * Quiz deleteMany
   */
  export type QuizDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quizzes to delete
     */
    where?: QuizWhereInput
    /**
     * Limit how many Quizzes to delete.
     */
    limit?: number
  }

  /**
   * Quiz.attempts
   */
  export type Quiz$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    cursor?: QuizAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * Quiz without action
   */
  export type QuizDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quiz
     */
    select?: QuizSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quiz
     */
    omit?: QuizOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizInclude<ExtArgs> | null
  }


  /**
   * Model QuizAttempt
   */

  export type AggregateQuizAttempt = {
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  export type QuizAttemptAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    quizId: number | null
    score: number | null
  }

  export type QuizAttemptSumAggregateOutputType = {
    id: number | null
    userId: number | null
    quizId: number | null
    score: number | null
  }

  export type QuizAttemptMinAggregateOutputType = {
    id: number | null
    userId: number | null
    quizId: number | null
    score: number | null
    completedAt: Date | null
  }

  export type QuizAttemptMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    quizId: number | null
    score: number | null
    completedAt: Date | null
  }

  export type QuizAttemptCountAggregateOutputType = {
    id: number
    userId: number
    quizId: number
    score: number
    completedAt: number
    _all: number
  }


  export type QuizAttemptAvgAggregateInputType = {
    id?: true
    userId?: true
    quizId?: true
    score?: true
  }

  export type QuizAttemptSumAggregateInputType = {
    id?: true
    userId?: true
    quizId?: true
    score?: true
  }

  export type QuizAttemptMinAggregateInputType = {
    id?: true
    userId?: true
    quizId?: true
    score?: true
    completedAt?: true
  }

  export type QuizAttemptMaxAggregateInputType = {
    id?: true
    userId?: true
    quizId?: true
    score?: true
    completedAt?: true
  }

  export type QuizAttemptCountAggregateInputType = {
    id?: true
    userId?: true
    quizId?: true
    score?: true
    completedAt?: true
    _all?: true
  }

  export type QuizAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempt to aggregate.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizAttempts
    **/
    _count?: true | QuizAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type GetQuizAttemptAggregateType<T extends QuizAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizAttempt[P]>
      : GetScalarType<T[P], AggregateQuizAttempt[P]>
  }




  export type QuizAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizAttemptWhereInput
    orderBy?: QuizAttemptOrderByWithAggregationInput | QuizAttemptOrderByWithAggregationInput[]
    by: QuizAttemptScalarFieldEnum[] | QuizAttemptScalarFieldEnum
    having?: QuizAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizAttemptCountAggregateInputType | true
    _avg?: QuizAttemptAvgAggregateInputType
    _sum?: QuizAttemptSumAggregateInputType
    _min?: QuizAttemptMinAggregateInputType
    _max?: QuizAttemptMaxAggregateInputType
  }

  export type QuizAttemptGroupByOutputType = {
    id: number
    userId: number
    quizId: number
    score: number
    completedAt: Date
    _count: QuizAttemptCountAggregateOutputType | null
    _avg: QuizAttemptAvgAggregateOutputType | null
    _sum: QuizAttemptSumAggregateOutputType | null
    _min: QuizAttemptMinAggregateOutputType | null
    _max: QuizAttemptMaxAggregateOutputType | null
  }

  type GetQuizAttemptGroupByPayload<T extends QuizAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], QuizAttemptGroupByOutputType[P]>
        }
      >
    >


  export type QuizAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectScalar = {
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
  }

  export type QuizAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "quizId" | "score" | "completedAt", ExtArgs["result"]["quizAttempt"]>
  export type QuizAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
  }

  export type $QuizAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizAttempt"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      quiz: Prisma.$QuizPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      quizId: number
      score: number
      completedAt: Date
    }, ExtArgs["result"]["quizAttempt"]>
    composites: {}
  }

  type QuizAttemptGetPayload<S extends boolean | null | undefined | QuizAttemptDefaultArgs> = $Result.GetResult<Prisma.$QuizAttemptPayload, S>

  type QuizAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizAttemptCountAggregateInputType | true
    }

  export interface QuizAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizAttempt'], meta: { name: 'QuizAttempt' } }
    /**
     * Find zero or one QuizAttempt that matches the filter.
     * @param {QuizAttemptFindUniqueArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizAttemptFindUniqueArgs>(args: SelectSubset<T, QuizAttemptFindUniqueArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizAttemptFindUniqueOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizAttemptFindFirstArgs>(args?: SelectSubset<T, QuizAttemptFindFirstArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindFirstOrThrowArgs} args - Arguments to find a QuizAttempt
     * @example
     * // Get one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany()
     * 
     * // Get first 10 QuizAttempts
     * const quizAttempts = await prisma.quizAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizAttemptFindManyArgs>(args?: SelectSubset<T, QuizAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizAttempt.
     * @param {QuizAttemptCreateArgs} args - Arguments to create a QuizAttempt.
     * @example
     * // Create one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.create({
     *   data: {
     *     // ... data to create a QuizAttempt
     *   }
     * })
     * 
     */
    create<T extends QuizAttemptCreateArgs>(args: SelectSubset<T, QuizAttemptCreateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizAttempts.
     * @param {QuizAttemptCreateManyArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizAttemptCreateManyArgs>(args?: SelectSubset<T, QuizAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizAttempts and returns the data saved in the database.
     * @param {QuizAttemptCreateManyAndReturnArgs} args - Arguments to create many QuizAttempts.
     * @example
     * // Create many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizAttempts and only return the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizAttempt.
     * @param {QuizAttemptDeleteArgs} args - Arguments to delete one QuizAttempt.
     * @example
     * // Delete one QuizAttempt
     * const QuizAttempt = await prisma.quizAttempt.delete({
     *   where: {
     *     // ... filter to delete one QuizAttempt
     *   }
     * })
     * 
     */
    delete<T extends QuizAttemptDeleteArgs>(args: SelectSubset<T, QuizAttemptDeleteArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizAttempt.
     * @param {QuizAttemptUpdateArgs} args - Arguments to update one QuizAttempt.
     * @example
     * // Update one QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizAttemptUpdateArgs>(args: SelectSubset<T, QuizAttemptUpdateArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizAttempts.
     * @param {QuizAttemptDeleteManyArgs} args - Arguments to filter QuizAttempts to delete.
     * @example
     * // Delete a few QuizAttempts
     * const { count } = await prisma.quizAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizAttemptDeleteManyArgs>(args?: SelectSubset<T, QuizAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizAttemptUpdateManyArgs>(args: SelectSubset<T, QuizAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizAttempts and returns the data updated in the database.
     * @param {QuizAttemptUpdateManyAndReturnArgs} args - Arguments to update many QuizAttempts.
     * @example
     * // Update many QuizAttempts
     * const quizAttempt = await prisma.quizAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizAttempts and only return the `id`
     * const quizAttemptWithIdOnly = await prisma.quizAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizAttempt.
     * @param {QuizAttemptUpsertArgs} args - Arguments to update or create a QuizAttempt.
     * @example
     * // Update or create a QuizAttempt
     * const quizAttempt = await prisma.quizAttempt.upsert({
     *   create: {
     *     // ... data to create a QuizAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizAttempt we want to update
     *   }
     * })
     */
    upsert<T extends QuizAttemptUpsertArgs>(args: SelectSubset<T, QuizAttemptUpsertArgs<ExtArgs>>): Prisma__QuizAttemptClient<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptCountArgs} args - Arguments to filter QuizAttempts to count.
     * @example
     * // Count the number of QuizAttempts
     * const count = await prisma.quizAttempt.count({
     *   where: {
     *     // ... the filter for the QuizAttempts we want to count
     *   }
     * })
    **/
    count<T extends QuizAttemptCountArgs>(
      args?: Subset<T, QuizAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizAttemptAggregateArgs>(args: Subset<T, QuizAttemptAggregateArgs>): Prisma.PrismaPromise<GetQuizAttemptAggregateType<T>>

    /**
     * Group by QuizAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizAttemptGroupByArgs['orderBy'] }
        : { orderBy?: QuizAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizAttempt model
   */
  readonly fields: QuizAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizAttempt model
   */
  interface QuizAttemptFieldRefs {
    readonly id: FieldRef<"QuizAttempt", 'Int'>
    readonly userId: FieldRef<"QuizAttempt", 'Int'>
    readonly quizId: FieldRef<"QuizAttempt", 'Int'>
    readonly score: FieldRef<"QuizAttempt", 'Float'>
    readonly completedAt: FieldRef<"QuizAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizAttempt findUnique
   */
  export type QuizAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findUniqueOrThrow
   */
  export type QuizAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt findFirst
   */
  export type QuizAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findFirstOrThrow
   */
  export type QuizAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempt to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizAttempts.
     */
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt findMany
   */
  export type QuizAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter, which QuizAttempts to fetch.
     */
    where?: QuizAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizAttempts to fetch.
     */
    orderBy?: QuizAttemptOrderByWithRelationInput | QuizAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizAttempts.
     */
    cursor?: QuizAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizAttempts.
     */
    skip?: number
    distinct?: QuizAttemptScalarFieldEnum | QuizAttemptScalarFieldEnum[]
  }

  /**
   * QuizAttempt create
   */
  export type QuizAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizAttempt.
     */
    data: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
  }

  /**
   * QuizAttempt createMany
   */
  export type QuizAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizAttempt createManyAndReturn
   */
  export type QuizAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many QuizAttempts.
     */
    data: QuizAttemptCreateManyInput | QuizAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAttempt update
   */
  export type QuizAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizAttempt.
     */
    data: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
    /**
     * Choose, which QuizAttempt to update.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt updateMany
   */
  export type QuizAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizAttempts.
     */
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyInput>
    /**
     * Filter which QuizAttempts to update
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to update.
     */
    limit?: number
  }

  /**
   * QuizAttempt updateManyAndReturn
   */
  export type QuizAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * The data used to update QuizAttempts.
     */
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyInput>
    /**
     * Filter which QuizAttempts to update
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizAttempt upsert
   */
  export type QuizAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizAttempt to update in case it exists.
     */
    where: QuizAttemptWhereUniqueInput
    /**
     * In case the QuizAttempt found by the `where` argument doesn't exist, create a new QuizAttempt with this data.
     */
    create: XOR<QuizAttemptCreateInput, QuizAttemptUncheckedCreateInput>
    /**
     * In case the QuizAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizAttemptUpdateInput, QuizAttemptUncheckedUpdateInput>
  }

  /**
   * QuizAttempt delete
   */
  export type QuizAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
    /**
     * Filter which QuizAttempt to delete.
     */
    where: QuizAttemptWhereUniqueInput
  }

  /**
   * QuizAttempt deleteMany
   */
  export type QuizAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizAttempts to delete
     */
    where?: QuizAttemptWhereInput
    /**
     * Limit how many QuizAttempts to delete.
     */
    limit?: number
  }

  /**
   * QuizAttempt without action
   */
  export type QuizAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizAttempt
     */
    select?: QuizAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizAttempt
     */
    omit?: QuizAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizAttemptInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ModuleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum]


  export const ModuleAssignmentScalarFieldEnum: {
    id: 'id',
    moduleId: 'moduleId',
    userId: 'userId',
    assignedAt: 'assignedAt'
  };

  export type ModuleAssignmentScalarFieldEnum = (typeof ModuleAssignmentScalarFieldEnum)[keyof typeof ModuleAssignmentScalarFieldEnum]


  export const ModuleVideoScalarFieldEnum: {
    id: 'id',
    moduleId: 'moduleId',
    videoId: 'videoId',
    order: 'order'
  };

  export type ModuleVideoScalarFieldEnum = (typeof ModuleVideoScalarFieldEnum)[keyof typeof ModuleVideoScalarFieldEnum]


  export const VideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    platform: 'platform',
    videoUrl: 'videoUrl',
    videoId: 'videoId',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type VideoScalarFieldEnum = (typeof VideoScalarFieldEnum)[keyof typeof VideoScalarFieldEnum]


  export const WatchLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    videoId: 'videoId',
    totalWatchTime: 'totalWatchTime',
    isCompleted: 'isCompleted',
    watchedPercentage: 'watchedPercentage',
    skipEvents: 'skipEvents',
    pauseEvents: 'pauseEvents',
    createdAt: 'createdAt'
  };

  export type WatchLogScalarFieldEnum = (typeof WatchLogScalarFieldEnum)[keyof typeof WatchLogScalarFieldEnum]


  export const QuizScalarFieldEnum: {
    id: 'id',
    videoId: 'videoId',
    generatedBy: 'generatedBy',
    createdAt: 'createdAt',
    questions: 'questions'
  };

  export type QuizScalarFieldEnum = (typeof QuizScalarFieldEnum)[keyof typeof QuizScalarFieldEnum]


  export const QuizAttemptScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    quizId: 'quizId',
    score: 'score',
    completedAt: 'completedAt'
  };

  export type QuizAttemptScalarFieldEnum = (typeof QuizAttemptScalarFieldEnum)[keyof typeof QuizAttemptScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    assignments?: ModuleAssignmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    assignments?: ModuleAssignmentOrderByRelationAggregateInput
    quizAttempts?: QuizAttemptOrderByRelationAggregateInput
    watchLogs?: WatchLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    assignments?: ModuleAssignmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ModuleWhereInput = {
    AND?: ModuleWhereInput | ModuleWhereInput[]
    OR?: ModuleWhereInput[]
    NOT?: ModuleWhereInput | ModuleWhereInput[]
    id?: IntFilter<"Module"> | number
    title?: StringFilter<"Module"> | string
    description?: StringNullableFilter<"Module"> | string | null
    createdBy?: IntFilter<"Module"> | number
    createdAt?: DateTimeFilter<"Module"> | Date | string
    assignments?: ModuleAssignmentListRelationFilter
    moduleVideos?: ModuleVideoListRelationFilter
  }

  export type ModuleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    assignments?: ModuleAssignmentOrderByRelationAggregateInput
    moduleVideos?: ModuleVideoOrderByRelationAggregateInput
  }

  export type ModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ModuleWhereInput | ModuleWhereInput[]
    OR?: ModuleWhereInput[]
    NOT?: ModuleWhereInput | ModuleWhereInput[]
    title?: StringFilter<"Module"> | string
    description?: StringNullableFilter<"Module"> | string | null
    createdBy?: IntFilter<"Module"> | number
    createdAt?: DateTimeFilter<"Module"> | Date | string
    assignments?: ModuleAssignmentListRelationFilter
    moduleVideos?: ModuleVideoListRelationFilter
  }, "id">

  export type ModuleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: ModuleCountOrderByAggregateInput
    _avg?: ModuleAvgOrderByAggregateInput
    _max?: ModuleMaxOrderByAggregateInput
    _min?: ModuleMinOrderByAggregateInput
    _sum?: ModuleSumOrderByAggregateInput
  }

  export type ModuleScalarWhereWithAggregatesInput = {
    AND?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[]
    OR?: ModuleScalarWhereWithAggregatesInput[]
    NOT?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Module"> | number
    title?: StringWithAggregatesFilter<"Module"> | string
    description?: StringNullableWithAggregatesFilter<"Module"> | string | null
    createdBy?: IntWithAggregatesFilter<"Module"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Module"> | Date | string
  }

  export type ModuleAssignmentWhereInput = {
    AND?: ModuleAssignmentWhereInput | ModuleAssignmentWhereInput[]
    OR?: ModuleAssignmentWhereInput[]
    NOT?: ModuleAssignmentWhereInput | ModuleAssignmentWhereInput[]
    id?: IntFilter<"ModuleAssignment"> | number
    moduleId?: IntFilter<"ModuleAssignment"> | number
    userId?: IntFilter<"ModuleAssignment"> | number
    assignedAt?: DateTimeFilter<"ModuleAssignment"> | Date | string
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ModuleAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    module?: ModuleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ModuleAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ModuleAssignmentWhereInput | ModuleAssignmentWhereInput[]
    OR?: ModuleAssignmentWhereInput[]
    NOT?: ModuleAssignmentWhereInput | ModuleAssignmentWhereInput[]
    moduleId?: IntFilter<"ModuleAssignment"> | number
    userId?: IntFilter<"ModuleAssignment"> | number
    assignedAt?: DateTimeFilter<"ModuleAssignment"> | Date | string
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ModuleAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    _count?: ModuleAssignmentCountOrderByAggregateInput
    _avg?: ModuleAssignmentAvgOrderByAggregateInput
    _max?: ModuleAssignmentMaxOrderByAggregateInput
    _min?: ModuleAssignmentMinOrderByAggregateInput
    _sum?: ModuleAssignmentSumOrderByAggregateInput
  }

  export type ModuleAssignmentScalarWhereWithAggregatesInput = {
    AND?: ModuleAssignmentScalarWhereWithAggregatesInput | ModuleAssignmentScalarWhereWithAggregatesInput[]
    OR?: ModuleAssignmentScalarWhereWithAggregatesInput[]
    NOT?: ModuleAssignmentScalarWhereWithAggregatesInput | ModuleAssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ModuleAssignment"> | number
    moduleId?: IntWithAggregatesFilter<"ModuleAssignment"> | number
    userId?: IntWithAggregatesFilter<"ModuleAssignment"> | number
    assignedAt?: DateTimeWithAggregatesFilter<"ModuleAssignment"> | Date | string
  }

  export type ModuleVideoWhereInput = {
    AND?: ModuleVideoWhereInput | ModuleVideoWhereInput[]
    OR?: ModuleVideoWhereInput[]
    NOT?: ModuleVideoWhereInput | ModuleVideoWhereInput[]
    id?: IntFilter<"ModuleVideo"> | number
    moduleId?: IntFilter<"ModuleVideo"> | number
    videoId?: IntFilter<"ModuleVideo"> | number
    order?: IntFilter<"ModuleVideo"> | number
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type ModuleVideoOrderByWithRelationInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
    module?: ModuleOrderByWithRelationInput
    video?: VideoOrderByWithRelationInput
  }

  export type ModuleVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ModuleVideoWhereInput | ModuleVideoWhereInput[]
    OR?: ModuleVideoWhereInput[]
    NOT?: ModuleVideoWhereInput | ModuleVideoWhereInput[]
    moduleId?: IntFilter<"ModuleVideo"> | number
    videoId?: IntFilter<"ModuleVideo"> | number
    order?: IntFilter<"ModuleVideo"> | number
    module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id">

  export type ModuleVideoOrderByWithAggregationInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
    _count?: ModuleVideoCountOrderByAggregateInput
    _avg?: ModuleVideoAvgOrderByAggregateInput
    _max?: ModuleVideoMaxOrderByAggregateInput
    _min?: ModuleVideoMinOrderByAggregateInput
    _sum?: ModuleVideoSumOrderByAggregateInput
  }

  export type ModuleVideoScalarWhereWithAggregatesInput = {
    AND?: ModuleVideoScalarWhereWithAggregatesInput | ModuleVideoScalarWhereWithAggregatesInput[]
    OR?: ModuleVideoScalarWhereWithAggregatesInput[]
    NOT?: ModuleVideoScalarWhereWithAggregatesInput | ModuleVideoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ModuleVideo"> | number
    moduleId?: IntWithAggregatesFilter<"ModuleVideo"> | number
    videoId?: IntWithAggregatesFilter<"ModuleVideo"> | number
    order?: IntWithAggregatesFilter<"ModuleVideo"> | number
  }

  export type VideoWhereInput = {
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    id?: IntFilter<"Video"> | number
    title?: StringFilter<"Video"> | string
    platform?: StringFilter<"Video"> | string
    videoUrl?: StringFilter<"Video"> | string
    videoId?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
    createdAt?: DateTimeFilter<"Video"> | Date | string
    moduleVideos?: ModuleVideoListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    quiz?: XOR<QuizNullableScalarRelationFilter, QuizWhereInput> | null
  }

  export type VideoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    moduleVideos?: ModuleVideoOrderByRelationAggregateInput
    watchLogs?: WatchLogOrderByRelationAggregateInput
    quiz?: QuizOrderByWithRelationInput
  }

  export type VideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    title?: StringFilter<"Video"> | string
    platform?: StringFilter<"Video"> | string
    videoUrl?: StringFilter<"Video"> | string
    videoId?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
    createdAt?: DateTimeFilter<"Video"> | Date | string
    moduleVideos?: ModuleVideoListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    quiz?: XOR<QuizNullableScalarRelationFilter, QuizWhereInput> | null
  }, "id">

  export type VideoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    _count?: VideoCountOrderByAggregateInput
    _avg?: VideoAvgOrderByAggregateInput
    _max?: VideoMaxOrderByAggregateInput
    _min?: VideoMinOrderByAggregateInput
    _sum?: VideoSumOrderByAggregateInput
  }

  export type VideoScalarWhereWithAggregatesInput = {
    AND?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    OR?: VideoScalarWhereWithAggregatesInput[]
    NOT?: VideoScalarWhereWithAggregatesInput | VideoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Video"> | number
    title?: StringWithAggregatesFilter<"Video"> | string
    platform?: StringWithAggregatesFilter<"Video"> | string
    videoUrl?: StringWithAggregatesFilter<"Video"> | string
    videoId?: StringWithAggregatesFilter<"Video"> | string
    duration?: IntWithAggregatesFilter<"Video"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Video"> | Date | string
  }

  export type WatchLogWhereInput = {
    AND?: WatchLogWhereInput | WatchLogWhereInput[]
    OR?: WatchLogWhereInput[]
    NOT?: WatchLogWhereInput | WatchLogWhereInput[]
    id?: IntFilter<"WatchLog"> | number
    userId?: IntFilter<"WatchLog"> | number
    videoId?: IntFilter<"WatchLog"> | number
    totalWatchTime?: IntFilter<"WatchLog"> | number
    isCompleted?: BoolFilter<"WatchLog"> | boolean
    watchedPercentage?: FloatFilter<"WatchLog"> | number
    skipEvents?: JsonFilter<"WatchLog">
    pauseEvents?: JsonFilter<"WatchLog">
    createdAt?: DateTimeFilter<"WatchLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type WatchLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    skipEvents?: SortOrder
    pauseEvents?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    video?: VideoOrderByWithRelationInput
  }

  export type WatchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WatchLogWhereInput | WatchLogWhereInput[]
    OR?: WatchLogWhereInput[]
    NOT?: WatchLogWhereInput | WatchLogWhereInput[]
    userId?: IntFilter<"WatchLog"> | number
    videoId?: IntFilter<"WatchLog"> | number
    totalWatchTime?: IntFilter<"WatchLog"> | number
    isCompleted?: BoolFilter<"WatchLog"> | boolean
    watchedPercentage?: FloatFilter<"WatchLog"> | number
    skipEvents?: JsonFilter<"WatchLog">
    pauseEvents?: JsonFilter<"WatchLog">
    createdAt?: DateTimeFilter<"WatchLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id">

  export type WatchLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    skipEvents?: SortOrder
    pauseEvents?: SortOrder
    createdAt?: SortOrder
    _count?: WatchLogCountOrderByAggregateInput
    _avg?: WatchLogAvgOrderByAggregateInput
    _max?: WatchLogMaxOrderByAggregateInput
    _min?: WatchLogMinOrderByAggregateInput
    _sum?: WatchLogSumOrderByAggregateInput
  }

  export type WatchLogScalarWhereWithAggregatesInput = {
    AND?: WatchLogScalarWhereWithAggregatesInput | WatchLogScalarWhereWithAggregatesInput[]
    OR?: WatchLogScalarWhereWithAggregatesInput[]
    NOT?: WatchLogScalarWhereWithAggregatesInput | WatchLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WatchLog"> | number
    userId?: IntWithAggregatesFilter<"WatchLog"> | number
    videoId?: IntWithAggregatesFilter<"WatchLog"> | number
    totalWatchTime?: IntWithAggregatesFilter<"WatchLog"> | number
    isCompleted?: BoolWithAggregatesFilter<"WatchLog"> | boolean
    watchedPercentage?: FloatWithAggregatesFilter<"WatchLog"> | number
    skipEvents?: JsonWithAggregatesFilter<"WatchLog">
    pauseEvents?: JsonWithAggregatesFilter<"WatchLog">
    createdAt?: DateTimeWithAggregatesFilter<"WatchLog"> | Date | string
  }

  export type QuizWhereInput = {
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    id?: IntFilter<"Quiz"> | number
    videoId?: IntFilter<"Quiz"> | number
    generatedBy?: StringFilter<"Quiz"> | string
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    questions?: JsonFilter<"Quiz">
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    attempts?: QuizAttemptListRelationFilter
  }

  export type QuizOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
    questions?: SortOrder
    video?: VideoOrderByWithRelationInput
    attempts?: QuizAttemptOrderByRelationAggregateInput
  }

  export type QuizWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    videoId?: number
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    generatedBy?: StringFilter<"Quiz"> | string
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    questions?: JsonFilter<"Quiz">
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    attempts?: QuizAttemptListRelationFilter
  }, "id" | "videoId">

  export type QuizOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
    questions?: SortOrder
    _count?: QuizCountOrderByAggregateInput
    _avg?: QuizAvgOrderByAggregateInput
    _max?: QuizMaxOrderByAggregateInput
    _min?: QuizMinOrderByAggregateInput
    _sum?: QuizSumOrderByAggregateInput
  }

  export type QuizScalarWhereWithAggregatesInput = {
    AND?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    OR?: QuizScalarWhereWithAggregatesInput[]
    NOT?: QuizScalarWhereWithAggregatesInput | QuizScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Quiz"> | number
    videoId?: IntWithAggregatesFilter<"Quiz"> | number
    generatedBy?: StringWithAggregatesFilter<"Quiz"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Quiz"> | Date | string
    questions?: JsonWithAggregatesFilter<"Quiz">
  }

  export type QuizAttemptWhereInput = {
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    id?: IntFilter<"QuizAttempt"> | number
    userId?: IntFilter<"QuizAttempt"> | number
    quizId?: IntFilter<"QuizAttempt"> | number
    score?: FloatFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }

  export type QuizAttemptOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    quiz?: QuizOrderByWithRelationInput
  }

  export type QuizAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    OR?: QuizAttemptWhereInput[]
    NOT?: QuizAttemptWhereInput | QuizAttemptWhereInput[]
    userId?: IntFilter<"QuizAttempt"> | number
    quizId?: IntFilter<"QuizAttempt"> | number
    score?: FloatFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
  }, "id">

  export type QuizAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
    _count?: QuizAttemptCountOrderByAggregateInput
    _avg?: QuizAttemptAvgOrderByAggregateInput
    _max?: QuizAttemptMaxOrderByAggregateInput
    _min?: QuizAttemptMinOrderByAggregateInput
    _sum?: QuizAttemptSumOrderByAggregateInput
  }

  export type QuizAttemptScalarWhereWithAggregatesInput = {
    AND?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    OR?: QuizAttemptScalarWhereWithAggregatesInput[]
    NOT?: QuizAttemptScalarWhereWithAggregatesInput | QuizAttemptScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QuizAttempt"> | number
    userId?: IntWithAggregatesFilter<"QuizAttempt"> | number
    quizId?: IntWithAggregatesFilter<"QuizAttempt"> | number
    score?: FloatWithAggregatesFilter<"QuizAttempt"> | number
    completedAt?: DateTimeWithAggregatesFilter<"QuizAttempt"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleCreateInput = {
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    assignments?: ModuleAssignmentCreateNestedManyWithoutModuleInput
    moduleVideos?: ModuleVideoCreateNestedManyWithoutModuleInput
  }

  export type ModuleUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    assignments?: ModuleAssignmentUncheckedCreateNestedManyWithoutModuleInput
    moduleVideos?: ModuleVideoUncheckedCreateNestedManyWithoutModuleInput
  }

  export type ModuleUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUpdateManyWithoutModuleNestedInput
    moduleVideos?: ModuleVideoUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUncheckedUpdateManyWithoutModuleNestedInput
    moduleVideos?: ModuleVideoUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type ModuleCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
  }

  export type ModuleUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentCreateInput = {
    assignedAt: Date | string
    module: ModuleCreateNestedOneWithoutAssignmentsInput
    user: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type ModuleAssignmentUncheckedCreateInput = {
    id?: number
    moduleId: number
    userId: number
    assignedAt: Date | string
  }

  export type ModuleAssignmentUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: ModuleUpdateOneRequiredWithoutAssignmentsNestedInput
    user?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ModuleAssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentCreateManyInput = {
    id?: number
    moduleId: number
    userId: number
    assignedAt: Date | string
  }

  export type ModuleAssignmentUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleVideoCreateInput = {
    order: number
    module: ModuleCreateNestedOneWithoutModuleVideosInput
    video: VideoCreateNestedOneWithoutModuleVideosInput
  }

  export type ModuleVideoUncheckedCreateInput = {
    id?: number
    moduleId: number
    videoId: number
    order: number
  }

  export type ModuleVideoUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    module?: ModuleUpdateOneRequiredWithoutModuleVideosNestedInput
    video?: VideoUpdateOneRequiredWithoutModuleVideosNestedInput
  }

  export type ModuleVideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleVideoCreateManyInput = {
    id?: number
    moduleId: number
    videoId: number
    order: number
  }

  export type ModuleVideoUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleVideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type VideoCreateInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
  }

  export type VideoUncheckedCreateInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoUncheckedCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
  }

  export type VideoUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUncheckedUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
  }

  export type VideoCreateManyInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
  }

  export type VideoUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogCreateInput = {
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
    user: UserCreateNestedOneWithoutWatchLogsInput
    video: VideoCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateInput = {
    id?: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type WatchLogUpdateInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchLogsNestedInput
    video?: VideoUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogCreateManyInput = {
    id?: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type WatchLogUpdateManyMutationInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizCreateInput = {
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    video: VideoCreateNestedOneWithoutQuizInput
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateInput = {
    id?: number
    videoId: number
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizUpdateInput = {
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    video?: VideoUpdateOneRequiredWithoutQuizNestedInput
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizCreateManyInput = {
    id?: number
    videoId: number
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
  }

  export type QuizUpdateManyMutationInput = {
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
  }

  export type QuizUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
  }

  export type QuizAttemptCreateInput = {
    score: number
    completedAt: Date | string
    user: UserCreateNestedOneWithoutQuizAttemptsInput
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateInput = {
    id?: number
    userId: number
    quizId: number
    score: number
    completedAt: Date | string
  }

  export type QuizAttemptUpdateInput = {
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQuizAttemptsNestedInput
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    quizId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateManyInput = {
    id?: number
    userId: number
    quizId: number
    score: number
    completedAt: Date | string
  }

  export type QuizAttemptUpdateManyMutationInput = {
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    quizId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ModuleAssignmentListRelationFilter = {
    every?: ModuleAssignmentWhereInput
    some?: ModuleAssignmentWhereInput
    none?: ModuleAssignmentWhereInput
  }

  export type QuizAttemptListRelationFilter = {
    every?: QuizAttemptWhereInput
    some?: QuizAttemptWhereInput
    none?: QuizAttemptWhereInput
  }

  export type WatchLogListRelationFilter = {
    every?: WatchLogWhereInput
    some?: WatchLogWhereInput
    none?: WatchLogWhereInput
  }

  export type ModuleAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ModuleVideoListRelationFilter = {
    every?: ModuleVideoWhereInput
    some?: ModuleVideoWhereInput
    none?: ModuleVideoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ModuleVideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModuleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ModuleAvgOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type ModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ModuleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ModuleSumOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ModuleScalarRelationFilter = {
    is?: ModuleWhereInput
    isNot?: ModuleWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ModuleAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ModuleAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
  }

  export type ModuleAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ModuleAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type ModuleAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    userId?: SortOrder
  }

  export type VideoScalarRelationFilter = {
    is?: VideoWhereInput
    isNot?: VideoWhereInput
  }

  export type ModuleVideoCountOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type ModuleVideoAvgOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type ModuleVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type ModuleVideoMinOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type ModuleVideoSumOrderByAggregateInput = {
    id?: SortOrder
    moduleId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type QuizNullableScalarRelationFilter = {
    is?: QuizWhereInput | null
    isNot?: QuizWhereInput | null
  }

  export type VideoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
  }

  export type VideoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoSumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WatchLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    skipEvents?: SortOrder
    pauseEvents?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    watchedPercentage?: SortOrder
  }

  export type WatchLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    watchedPercentage?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type QuizCountOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
    questions?: SortOrder
  }

  export type QuizAvgOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
  }

  export type QuizMaxOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizMinOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type QuizSumOrderByAggregateInput = {
    id?: SortOrder
    videoId?: SortOrder
  }

  export type QuizScalarRelationFilter = {
    is?: QuizWhereInput
    isNot?: QuizWhereInput
  }

  export type QuizAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
  }

  export type QuizAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
  }

  export type QuizAttemptSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
  }

  export type ModuleAssignmentCreateNestedManyWithoutUserInput = {
    create?: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput> | ModuleAssignmentCreateWithoutUserInput[] | ModuleAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutUserInput | ModuleAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: ModuleAssignmentCreateManyUserInputEnvelope
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
  }

  export type QuizAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput> | QuizAttemptCreateWithoutUserInput[] | QuizAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutUserInput | QuizAttemptCreateOrConnectWithoutUserInput[]
    createMany?: QuizAttemptCreateManyUserInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type WatchLogCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput> | WatchLogCreateWithoutUserInput[] | WatchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutUserInput | WatchLogCreateOrConnectWithoutUserInput[]
    createMany?: WatchLogCreateManyUserInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type ModuleAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput> | ModuleAssignmentCreateWithoutUserInput[] | ModuleAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutUserInput | ModuleAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: ModuleAssignmentCreateManyUserInputEnvelope
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput> | QuizAttemptCreateWithoutUserInput[] | QuizAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutUserInput | QuizAttemptCreateOrConnectWithoutUserInput[]
    createMany?: QuizAttemptCreateManyUserInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type WatchLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput> | WatchLogCreateWithoutUserInput[] | WatchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutUserInput | WatchLogCreateOrConnectWithoutUserInput[]
    createMany?: WatchLogCreateManyUserInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ModuleAssignmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput> | ModuleAssignmentCreateWithoutUserInput[] | ModuleAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutUserInput | ModuleAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: ModuleAssignmentUpsertWithWhereUniqueWithoutUserInput | ModuleAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ModuleAssignmentCreateManyUserInputEnvelope
    set?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    disconnect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    delete?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    update?: ModuleAssignmentUpdateWithWhereUniqueWithoutUserInput | ModuleAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ModuleAssignmentUpdateManyWithWhereWithoutUserInput | ModuleAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
  }

  export type QuizAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput> | QuizAttemptCreateWithoutUserInput[] | QuizAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutUserInput | QuizAttemptCreateOrConnectWithoutUserInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutUserInput | QuizAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuizAttemptCreateManyUserInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutUserInput | QuizAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutUserInput | QuizAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type WatchLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput> | WatchLogCreateWithoutUserInput[] | WatchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutUserInput | WatchLogCreateOrConnectWithoutUserInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutUserInput | WatchLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchLogCreateManyUserInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutUserInput | WatchLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutUserInput | WatchLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModuleAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput> | ModuleAssignmentCreateWithoutUserInput[] | ModuleAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutUserInput | ModuleAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: ModuleAssignmentUpsertWithWhereUniqueWithoutUserInput | ModuleAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ModuleAssignmentCreateManyUserInputEnvelope
    set?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    disconnect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    delete?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    update?: ModuleAssignmentUpdateWithWhereUniqueWithoutUserInput | ModuleAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ModuleAssignmentUpdateManyWithWhereWithoutUserInput | ModuleAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput> | QuizAttemptCreateWithoutUserInput[] | QuizAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutUserInput | QuizAttemptCreateOrConnectWithoutUserInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutUserInput | QuizAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QuizAttemptCreateManyUserInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutUserInput | QuizAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutUserInput | QuizAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type WatchLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput> | WatchLogCreateWithoutUserInput[] | WatchLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutUserInput | WatchLogCreateOrConnectWithoutUserInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutUserInput | WatchLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchLogCreateManyUserInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutUserInput | WatchLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutUserInput | WatchLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type ModuleAssignmentCreateNestedManyWithoutModuleInput = {
    create?: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput> | ModuleAssignmentCreateWithoutModuleInput[] | ModuleAssignmentUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutModuleInput | ModuleAssignmentCreateOrConnectWithoutModuleInput[]
    createMany?: ModuleAssignmentCreateManyModuleInputEnvelope
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
  }

  export type ModuleVideoCreateNestedManyWithoutModuleInput = {
    create?: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput> | ModuleVideoCreateWithoutModuleInput[] | ModuleVideoUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutModuleInput | ModuleVideoCreateOrConnectWithoutModuleInput[]
    createMany?: ModuleVideoCreateManyModuleInputEnvelope
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
  }

  export type ModuleAssignmentUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput> | ModuleAssignmentCreateWithoutModuleInput[] | ModuleAssignmentUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutModuleInput | ModuleAssignmentCreateOrConnectWithoutModuleInput[]
    createMany?: ModuleAssignmentCreateManyModuleInputEnvelope
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
  }

  export type ModuleVideoUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput> | ModuleVideoCreateWithoutModuleInput[] | ModuleVideoUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutModuleInput | ModuleVideoCreateOrConnectWithoutModuleInput[]
    createMany?: ModuleVideoCreateManyModuleInputEnvelope
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ModuleAssignmentUpdateManyWithoutModuleNestedInput = {
    create?: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput> | ModuleAssignmentCreateWithoutModuleInput[] | ModuleAssignmentUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutModuleInput | ModuleAssignmentCreateOrConnectWithoutModuleInput[]
    upsert?: ModuleAssignmentUpsertWithWhereUniqueWithoutModuleInput | ModuleAssignmentUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: ModuleAssignmentCreateManyModuleInputEnvelope
    set?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    disconnect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    delete?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    update?: ModuleAssignmentUpdateWithWhereUniqueWithoutModuleInput | ModuleAssignmentUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: ModuleAssignmentUpdateManyWithWhereWithoutModuleInput | ModuleAssignmentUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
  }

  export type ModuleVideoUpdateManyWithoutModuleNestedInput = {
    create?: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput> | ModuleVideoCreateWithoutModuleInput[] | ModuleVideoUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutModuleInput | ModuleVideoCreateOrConnectWithoutModuleInput[]
    upsert?: ModuleVideoUpsertWithWhereUniqueWithoutModuleInput | ModuleVideoUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: ModuleVideoCreateManyModuleInputEnvelope
    set?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    disconnect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    delete?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    update?: ModuleVideoUpdateWithWhereUniqueWithoutModuleInput | ModuleVideoUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: ModuleVideoUpdateManyWithWhereWithoutModuleInput | ModuleVideoUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
  }

  export type ModuleAssignmentUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput> | ModuleAssignmentCreateWithoutModuleInput[] | ModuleAssignmentUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleAssignmentCreateOrConnectWithoutModuleInput | ModuleAssignmentCreateOrConnectWithoutModuleInput[]
    upsert?: ModuleAssignmentUpsertWithWhereUniqueWithoutModuleInput | ModuleAssignmentUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: ModuleAssignmentCreateManyModuleInputEnvelope
    set?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    disconnect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    delete?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    connect?: ModuleAssignmentWhereUniqueInput | ModuleAssignmentWhereUniqueInput[]
    update?: ModuleAssignmentUpdateWithWhereUniqueWithoutModuleInput | ModuleAssignmentUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: ModuleAssignmentUpdateManyWithWhereWithoutModuleInput | ModuleAssignmentUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
  }

  export type ModuleVideoUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput> | ModuleVideoCreateWithoutModuleInput[] | ModuleVideoUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutModuleInput | ModuleVideoCreateOrConnectWithoutModuleInput[]
    upsert?: ModuleVideoUpsertWithWhereUniqueWithoutModuleInput | ModuleVideoUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: ModuleVideoCreateManyModuleInputEnvelope
    set?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    disconnect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    delete?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    update?: ModuleVideoUpdateWithWhereUniqueWithoutModuleInput | ModuleVideoUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: ModuleVideoUpdateManyWithWhereWithoutModuleInput | ModuleVideoUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
  }

  export type ModuleCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ModuleCreateWithoutAssignmentsInput, ModuleUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutAssignmentsInput
    connect?: ModuleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type ModuleUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ModuleCreateWithoutAssignmentsInput, ModuleUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutAssignmentsInput
    upsert?: ModuleUpsertWithoutAssignmentsInput
    connect?: ModuleWhereUniqueInput
    update?: XOR<XOR<ModuleUpdateToOneWithWhereWithoutAssignmentsInput, ModuleUpdateWithoutAssignmentsInput>, ModuleUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    upsert?: UserUpsertWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignmentsInput, UserUpdateWithoutAssignmentsInput>, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ModuleCreateNestedOneWithoutModuleVideosInput = {
    create?: XOR<ModuleCreateWithoutModuleVideosInput, ModuleUncheckedCreateWithoutModuleVideosInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutModuleVideosInput
    connect?: ModuleWhereUniqueInput
  }

  export type VideoCreateNestedOneWithoutModuleVideosInput = {
    create?: XOR<VideoCreateWithoutModuleVideosInput, VideoUncheckedCreateWithoutModuleVideosInput>
    connectOrCreate?: VideoCreateOrConnectWithoutModuleVideosInput
    connect?: VideoWhereUniqueInput
  }

  export type ModuleUpdateOneRequiredWithoutModuleVideosNestedInput = {
    create?: XOR<ModuleCreateWithoutModuleVideosInput, ModuleUncheckedCreateWithoutModuleVideosInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutModuleVideosInput
    upsert?: ModuleUpsertWithoutModuleVideosInput
    connect?: ModuleWhereUniqueInput
    update?: XOR<XOR<ModuleUpdateToOneWithWhereWithoutModuleVideosInput, ModuleUpdateWithoutModuleVideosInput>, ModuleUncheckedUpdateWithoutModuleVideosInput>
  }

  export type VideoUpdateOneRequiredWithoutModuleVideosNestedInput = {
    create?: XOR<VideoCreateWithoutModuleVideosInput, VideoUncheckedCreateWithoutModuleVideosInput>
    connectOrCreate?: VideoCreateOrConnectWithoutModuleVideosInput
    upsert?: VideoUpsertWithoutModuleVideosInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutModuleVideosInput, VideoUpdateWithoutModuleVideosInput>, VideoUncheckedUpdateWithoutModuleVideosInput>
  }

  export type ModuleVideoCreateNestedManyWithoutVideoInput = {
    create?: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput> | ModuleVideoCreateWithoutVideoInput[] | ModuleVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutVideoInput | ModuleVideoCreateOrConnectWithoutVideoInput[]
    createMany?: ModuleVideoCreateManyVideoInputEnvelope
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
  }

  export type WatchLogCreateNestedManyWithoutVideoInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type QuizCreateNestedOneWithoutVideoInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    connect?: QuizWhereUniqueInput
  }

  export type ModuleVideoUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput> | ModuleVideoCreateWithoutVideoInput[] | ModuleVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutVideoInput | ModuleVideoCreateOrConnectWithoutVideoInput[]
    createMany?: ModuleVideoCreateManyVideoInputEnvelope
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
  }

  export type WatchLogUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type QuizUncheckedCreateNestedOneWithoutVideoInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    connect?: QuizWhereUniqueInput
  }

  export type ModuleVideoUpdateManyWithoutVideoNestedInput = {
    create?: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput> | ModuleVideoCreateWithoutVideoInput[] | ModuleVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutVideoInput | ModuleVideoCreateOrConnectWithoutVideoInput[]
    upsert?: ModuleVideoUpsertWithWhereUniqueWithoutVideoInput | ModuleVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: ModuleVideoCreateManyVideoInputEnvelope
    set?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    disconnect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    delete?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    update?: ModuleVideoUpdateWithWhereUniqueWithoutVideoInput | ModuleVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: ModuleVideoUpdateManyWithWhereWithoutVideoInput | ModuleVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
  }

  export type WatchLogUpdateManyWithoutVideoNestedInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutVideoInput | WatchLogUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutVideoInput | WatchLogUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutVideoInput | WatchLogUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type QuizUpdateOneWithoutVideoNestedInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    upsert?: QuizUpsertWithoutVideoInput
    disconnect?: QuizWhereInput | boolean
    delete?: QuizWhereInput | boolean
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutVideoInput, QuizUpdateWithoutVideoInput>, QuizUncheckedUpdateWithoutVideoInput>
  }

  export type ModuleVideoUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput> | ModuleVideoCreateWithoutVideoInput[] | ModuleVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: ModuleVideoCreateOrConnectWithoutVideoInput | ModuleVideoCreateOrConnectWithoutVideoInput[]
    upsert?: ModuleVideoUpsertWithWhereUniqueWithoutVideoInput | ModuleVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: ModuleVideoCreateManyVideoInputEnvelope
    set?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    disconnect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    delete?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    connect?: ModuleVideoWhereUniqueInput | ModuleVideoWhereUniqueInput[]
    update?: ModuleVideoUpdateWithWhereUniqueWithoutVideoInput | ModuleVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: ModuleVideoUpdateManyWithWhereWithoutVideoInput | ModuleVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
  }

  export type WatchLogUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    upsert?: WatchLogUpsertWithWhereUniqueWithoutVideoInput | WatchLogUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    set?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    disconnect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    delete?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
    update?: WatchLogUpdateWithWhereUniqueWithoutVideoInput | WatchLogUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: WatchLogUpdateManyWithWhereWithoutVideoInput | WatchLogUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
  }

  export type QuizUncheckedUpdateOneWithoutVideoNestedInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    upsert?: QuizUpsertWithoutVideoInput
    disconnect?: QuizWhereInput | boolean
    delete?: QuizWhereInput | boolean
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutVideoInput, QuizUpdateWithoutVideoInput>, QuizUncheckedUpdateWithoutVideoInput>
  }

  export type UserCreateNestedOneWithoutWatchLogsInput = {
    create?: XOR<UserCreateWithoutWatchLogsInput, UserUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchLogsInput
    connect?: UserWhereUniqueInput
  }

  export type VideoCreateNestedOneWithoutWatchLogsInput = {
    create?: XOR<VideoCreateWithoutWatchLogsInput, VideoUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutWatchLogsInput
    connect?: VideoWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWatchLogsNestedInput = {
    create?: XOR<UserCreateWithoutWatchLogsInput, UserUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchLogsInput
    upsert?: UserUpsertWithoutWatchLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchLogsInput, UserUpdateWithoutWatchLogsInput>, UserUncheckedUpdateWithoutWatchLogsInput>
  }

  export type VideoUpdateOneRequiredWithoutWatchLogsNestedInput = {
    create?: XOR<VideoCreateWithoutWatchLogsInput, VideoUncheckedCreateWithoutWatchLogsInput>
    connectOrCreate?: VideoCreateOrConnectWithoutWatchLogsInput
    upsert?: VideoUpsertWithoutWatchLogsInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutWatchLogsInput, VideoUpdateWithoutWatchLogsInput>, VideoUncheckedUpdateWithoutWatchLogsInput>
  }

  export type VideoCreateNestedOneWithoutQuizInput = {
    create?: XOR<VideoCreateWithoutQuizInput, VideoUncheckedCreateWithoutQuizInput>
    connectOrCreate?: VideoCreateOrConnectWithoutQuizInput
    connect?: VideoWhereUniqueInput
  }

  export type QuizAttemptCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type QuizAttemptUncheckedCreateNestedManyWithoutQuizInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
  }

  export type VideoUpdateOneRequiredWithoutQuizNestedInput = {
    create?: XOR<VideoCreateWithoutQuizInput, VideoUncheckedCreateWithoutQuizInput>
    connectOrCreate?: VideoCreateOrConnectWithoutQuizInput
    upsert?: VideoUpsertWithoutQuizInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutQuizInput, VideoUpdateWithoutQuizInput>, VideoUncheckedUpdateWithoutQuizInput>
  }

  export type QuizAttemptUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput = {
    create?: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput> | QuizAttemptCreateWithoutQuizInput[] | QuizAttemptUncheckedCreateWithoutQuizInput[]
    connectOrCreate?: QuizAttemptCreateOrConnectWithoutQuizInput | QuizAttemptCreateOrConnectWithoutQuizInput[]
    upsert?: QuizAttemptUpsertWithWhereUniqueWithoutQuizInput | QuizAttemptUpsertWithWhereUniqueWithoutQuizInput[]
    createMany?: QuizAttemptCreateManyQuizInputEnvelope
    set?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    disconnect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    delete?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    connect?: QuizAttemptWhereUniqueInput | QuizAttemptWhereUniqueInput[]
    update?: QuizAttemptUpdateWithWhereUniqueWithoutQuizInput | QuizAttemptUpdateWithWhereUniqueWithoutQuizInput[]
    updateMany?: QuizAttemptUpdateManyWithWhereWithoutQuizInput | QuizAttemptUpdateManyWithWhereWithoutQuizInput[]
    deleteMany?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutQuizAttemptsInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type QuizCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutQuizAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    upsert?: UserUpsertWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuizAttemptsInput, UserUpdateWithoutQuizAttemptsInput>, UserUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type QuizUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    upsert?: QuizUpsertWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutAttemptsInput, QuizUpdateWithoutAttemptsInput>, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ModuleAssignmentCreateWithoutUserInput = {
    assignedAt: Date | string
    module: ModuleCreateNestedOneWithoutAssignmentsInput
  }

  export type ModuleAssignmentUncheckedCreateWithoutUserInput = {
    id?: number
    moduleId: number
    assignedAt: Date | string
  }

  export type ModuleAssignmentCreateOrConnectWithoutUserInput = {
    where: ModuleAssignmentWhereUniqueInput
    create: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput>
  }

  export type ModuleAssignmentCreateManyUserInputEnvelope = {
    data: ModuleAssignmentCreateManyUserInput | ModuleAssignmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QuizAttemptCreateWithoutUserInput = {
    score: number
    completedAt: Date | string
    quiz: QuizCreateNestedOneWithoutAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutUserInput = {
    id?: number
    quizId: number
    score: number
    completedAt: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutUserInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput>
  }

  export type QuizAttemptCreateManyUserInputEnvelope = {
    data: QuizAttemptCreateManyUserInput | QuizAttemptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchLogCreateWithoutUserInput = {
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
    video: VideoCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutUserInput = {
    id?: number
    videoId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type WatchLogCreateOrConnectWithoutUserInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput>
  }

  export type WatchLogCreateManyUserInputEnvelope = {
    data: WatchLogCreateManyUserInput | WatchLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ModuleAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: ModuleAssignmentWhereUniqueInput
    update: XOR<ModuleAssignmentUpdateWithoutUserInput, ModuleAssignmentUncheckedUpdateWithoutUserInput>
    create: XOR<ModuleAssignmentCreateWithoutUserInput, ModuleAssignmentUncheckedCreateWithoutUserInput>
  }

  export type ModuleAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: ModuleAssignmentWhereUniqueInput
    data: XOR<ModuleAssignmentUpdateWithoutUserInput, ModuleAssignmentUncheckedUpdateWithoutUserInput>
  }

  export type ModuleAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: ModuleAssignmentScalarWhereInput
    data: XOR<ModuleAssignmentUpdateManyMutationInput, ModuleAssignmentUncheckedUpdateManyWithoutUserInput>
  }

  export type ModuleAssignmentScalarWhereInput = {
    AND?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
    OR?: ModuleAssignmentScalarWhereInput[]
    NOT?: ModuleAssignmentScalarWhereInput | ModuleAssignmentScalarWhereInput[]
    id?: IntFilter<"ModuleAssignment"> | number
    moduleId?: IntFilter<"ModuleAssignment"> | number
    userId?: IntFilter<"ModuleAssignment"> | number
    assignedAt?: DateTimeFilter<"ModuleAssignment"> | Date | string
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutUserInput, QuizAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<QuizAttemptCreateWithoutUserInput, QuizAttemptUncheckedCreateWithoutUserInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutUserInput, QuizAttemptUncheckedUpdateWithoutUserInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutUserInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutUserInput>
  }

  export type QuizAttemptScalarWhereInput = {
    AND?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    OR?: QuizAttemptScalarWhereInput[]
    NOT?: QuizAttemptScalarWhereInput | QuizAttemptScalarWhereInput[]
    id?: IntFilter<"QuizAttempt"> | number
    userId?: IntFilter<"QuizAttempt"> | number
    quizId?: IntFilter<"QuizAttempt"> | number
    score?: FloatFilter<"QuizAttempt"> | number
    completedAt?: DateTimeFilter<"QuizAttempt"> | Date | string
  }

  export type WatchLogUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchLogWhereUniqueInput
    update: XOR<WatchLogUpdateWithoutUserInput, WatchLogUncheckedUpdateWithoutUserInput>
    create: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput>
  }

  export type WatchLogUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchLogWhereUniqueInput
    data: XOR<WatchLogUpdateWithoutUserInput, WatchLogUncheckedUpdateWithoutUserInput>
  }

  export type WatchLogUpdateManyWithWhereWithoutUserInput = {
    where: WatchLogScalarWhereInput
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchLogScalarWhereInput = {
    AND?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
    OR?: WatchLogScalarWhereInput[]
    NOT?: WatchLogScalarWhereInput | WatchLogScalarWhereInput[]
    id?: IntFilter<"WatchLog"> | number
    userId?: IntFilter<"WatchLog"> | number
    videoId?: IntFilter<"WatchLog"> | number
    totalWatchTime?: IntFilter<"WatchLog"> | number
    isCompleted?: BoolFilter<"WatchLog"> | boolean
    watchedPercentage?: FloatFilter<"WatchLog"> | number
    skipEvents?: JsonFilter<"WatchLog">
    pauseEvents?: JsonFilter<"WatchLog">
    createdAt?: DateTimeFilter<"WatchLog"> | Date | string
  }

  export type ModuleAssignmentCreateWithoutModuleInput = {
    assignedAt: Date | string
    user: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type ModuleAssignmentUncheckedCreateWithoutModuleInput = {
    id?: number
    userId: number
    assignedAt: Date | string
  }

  export type ModuleAssignmentCreateOrConnectWithoutModuleInput = {
    where: ModuleAssignmentWhereUniqueInput
    create: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput>
  }

  export type ModuleAssignmentCreateManyModuleInputEnvelope = {
    data: ModuleAssignmentCreateManyModuleInput | ModuleAssignmentCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type ModuleVideoCreateWithoutModuleInput = {
    order: number
    video: VideoCreateNestedOneWithoutModuleVideosInput
  }

  export type ModuleVideoUncheckedCreateWithoutModuleInput = {
    id?: number
    videoId: number
    order: number
  }

  export type ModuleVideoCreateOrConnectWithoutModuleInput = {
    where: ModuleVideoWhereUniqueInput
    create: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput>
  }

  export type ModuleVideoCreateManyModuleInputEnvelope = {
    data: ModuleVideoCreateManyModuleInput | ModuleVideoCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type ModuleAssignmentUpsertWithWhereUniqueWithoutModuleInput = {
    where: ModuleAssignmentWhereUniqueInput
    update: XOR<ModuleAssignmentUpdateWithoutModuleInput, ModuleAssignmentUncheckedUpdateWithoutModuleInput>
    create: XOR<ModuleAssignmentCreateWithoutModuleInput, ModuleAssignmentUncheckedCreateWithoutModuleInput>
  }

  export type ModuleAssignmentUpdateWithWhereUniqueWithoutModuleInput = {
    where: ModuleAssignmentWhereUniqueInput
    data: XOR<ModuleAssignmentUpdateWithoutModuleInput, ModuleAssignmentUncheckedUpdateWithoutModuleInput>
  }

  export type ModuleAssignmentUpdateManyWithWhereWithoutModuleInput = {
    where: ModuleAssignmentScalarWhereInput
    data: XOR<ModuleAssignmentUpdateManyMutationInput, ModuleAssignmentUncheckedUpdateManyWithoutModuleInput>
  }

  export type ModuleVideoUpsertWithWhereUniqueWithoutModuleInput = {
    where: ModuleVideoWhereUniqueInput
    update: XOR<ModuleVideoUpdateWithoutModuleInput, ModuleVideoUncheckedUpdateWithoutModuleInput>
    create: XOR<ModuleVideoCreateWithoutModuleInput, ModuleVideoUncheckedCreateWithoutModuleInput>
  }

  export type ModuleVideoUpdateWithWhereUniqueWithoutModuleInput = {
    where: ModuleVideoWhereUniqueInput
    data: XOR<ModuleVideoUpdateWithoutModuleInput, ModuleVideoUncheckedUpdateWithoutModuleInput>
  }

  export type ModuleVideoUpdateManyWithWhereWithoutModuleInput = {
    where: ModuleVideoScalarWhereInput
    data: XOR<ModuleVideoUpdateManyMutationInput, ModuleVideoUncheckedUpdateManyWithoutModuleInput>
  }

  export type ModuleVideoScalarWhereInput = {
    AND?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
    OR?: ModuleVideoScalarWhereInput[]
    NOT?: ModuleVideoScalarWhereInput | ModuleVideoScalarWhereInput[]
    id?: IntFilter<"ModuleVideo"> | number
    moduleId?: IntFilter<"ModuleVideo"> | number
    videoId?: IntFilter<"ModuleVideo"> | number
    order?: IntFilter<"ModuleVideo"> | number
  }

  export type ModuleCreateWithoutAssignmentsInput = {
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoCreateNestedManyWithoutModuleInput
  }

  export type ModuleUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoUncheckedCreateNestedManyWithoutModuleInput
  }

  export type ModuleCreateOrConnectWithoutAssignmentsInput = {
    where: ModuleWhereUniqueInput
    create: XOR<ModuleCreateWithoutAssignmentsInput, ModuleUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserCreateWithoutAssignmentsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
  }

  export type ModuleUpsertWithoutAssignmentsInput = {
    update: XOR<ModuleUpdateWithoutAssignmentsInput, ModuleUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ModuleCreateWithoutAssignmentsInput, ModuleUncheckedCreateWithoutAssignmentsInput>
    where?: ModuleWhereInput
  }

  export type ModuleUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ModuleWhereInput
    data: XOR<ModuleUpdateWithoutAssignmentsInput, ModuleUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ModuleUpdateWithoutAssignmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type UserUpsertWithoutAssignmentsInput = {
    update: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ModuleCreateWithoutModuleVideosInput = {
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    assignments?: ModuleAssignmentCreateNestedManyWithoutModuleInput
  }

  export type ModuleUncheckedCreateWithoutModuleVideosInput = {
    id?: number
    title: string
    description?: string | null
    createdBy: number
    createdAt: Date | string
    assignments?: ModuleAssignmentUncheckedCreateNestedManyWithoutModuleInput
  }

  export type ModuleCreateOrConnectWithoutModuleVideosInput = {
    where: ModuleWhereUniqueInput
    create: XOR<ModuleCreateWithoutModuleVideosInput, ModuleUncheckedCreateWithoutModuleVideosInput>
  }

  export type VideoCreateWithoutModuleVideosInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutModuleVideosInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutModuleVideosInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutModuleVideosInput, VideoUncheckedCreateWithoutModuleVideosInput>
  }

  export type ModuleUpsertWithoutModuleVideosInput = {
    update: XOR<ModuleUpdateWithoutModuleVideosInput, ModuleUncheckedUpdateWithoutModuleVideosInput>
    create: XOR<ModuleCreateWithoutModuleVideosInput, ModuleUncheckedCreateWithoutModuleVideosInput>
    where?: ModuleWhereInput
  }

  export type ModuleUpdateToOneWithWhereWithoutModuleVideosInput = {
    where?: ModuleWhereInput
    data: XOR<ModuleUpdateWithoutModuleVideosInput, ModuleUncheckedUpdateWithoutModuleVideosInput>
  }

  export type ModuleUpdateWithoutModuleVideosInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateWithoutModuleVideosInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type VideoUpsertWithoutModuleVideosInput = {
    update: XOR<VideoUpdateWithoutModuleVideosInput, VideoUncheckedUpdateWithoutModuleVideosInput>
    create: XOR<VideoCreateWithoutModuleVideosInput, VideoUncheckedCreateWithoutModuleVideosInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutModuleVideosInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutModuleVideosInput, VideoUncheckedUpdateWithoutModuleVideosInput>
  }

  export type VideoUpdateWithoutModuleVideosInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutModuleVideosInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
  }

  export type ModuleVideoCreateWithoutVideoInput = {
    order: number
    module: ModuleCreateNestedOneWithoutModuleVideosInput
  }

  export type ModuleVideoUncheckedCreateWithoutVideoInput = {
    id?: number
    moduleId: number
    order: number
  }

  export type ModuleVideoCreateOrConnectWithoutVideoInput = {
    where: ModuleVideoWhereUniqueInput
    create: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput>
  }

  export type ModuleVideoCreateManyVideoInputEnvelope = {
    data: ModuleVideoCreateManyVideoInput | ModuleVideoCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type WatchLogCreateWithoutVideoInput = {
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
    user: UserCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutVideoInput = {
    id?: number
    userId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type WatchLogCreateOrConnectWithoutVideoInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput>
  }

  export type WatchLogCreateManyVideoInputEnvelope = {
    data: WatchLogCreateManyVideoInput | WatchLogCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type QuizCreateWithoutVideoInput = {
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutVideoInput = {
    id?: number
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutVideoInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
  }

  export type ModuleVideoUpsertWithWhereUniqueWithoutVideoInput = {
    where: ModuleVideoWhereUniqueInput
    update: XOR<ModuleVideoUpdateWithoutVideoInput, ModuleVideoUncheckedUpdateWithoutVideoInput>
    create: XOR<ModuleVideoCreateWithoutVideoInput, ModuleVideoUncheckedCreateWithoutVideoInput>
  }

  export type ModuleVideoUpdateWithWhereUniqueWithoutVideoInput = {
    where: ModuleVideoWhereUniqueInput
    data: XOR<ModuleVideoUpdateWithoutVideoInput, ModuleVideoUncheckedUpdateWithoutVideoInput>
  }

  export type ModuleVideoUpdateManyWithWhereWithoutVideoInput = {
    where: ModuleVideoScalarWhereInput
    data: XOR<ModuleVideoUpdateManyMutationInput, ModuleVideoUncheckedUpdateManyWithoutVideoInput>
  }

  export type WatchLogUpsertWithWhereUniqueWithoutVideoInput = {
    where: WatchLogWhereUniqueInput
    update: XOR<WatchLogUpdateWithoutVideoInput, WatchLogUncheckedUpdateWithoutVideoInput>
    create: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput>
  }

  export type WatchLogUpdateWithWhereUniqueWithoutVideoInput = {
    where: WatchLogWhereUniqueInput
    data: XOR<WatchLogUpdateWithoutVideoInput, WatchLogUncheckedUpdateWithoutVideoInput>
  }

  export type WatchLogUpdateManyWithWhereWithoutVideoInput = {
    where: WatchLogScalarWhereInput
    data: XOR<WatchLogUpdateManyMutationInput, WatchLogUncheckedUpdateManyWithoutVideoInput>
  }

  export type QuizUpsertWithoutVideoInput = {
    update: XOR<QuizUpdateWithoutVideoInput, QuizUncheckedUpdateWithoutVideoInput>
    create: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutVideoInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutVideoInput, QuizUncheckedUpdateWithoutVideoInput>
  }

  export type QuizUpdateWithoutVideoInput = {
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type UserCreateWithoutWatchLogsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchLogsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchLogsInput, UserUncheckedCreateWithoutWatchLogsInput>
  }

  export type VideoCreateWithoutWatchLogsInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutWatchLogsInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutWatchLogsInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutWatchLogsInput, VideoUncheckedCreateWithoutWatchLogsInput>
  }

  export type UserUpsertWithoutWatchLogsInput = {
    update: XOR<UserUpdateWithoutWatchLogsInput, UserUncheckedUpdateWithoutWatchLogsInput>
    create: XOR<UserCreateWithoutWatchLogsInput, UserUncheckedCreateWithoutWatchLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchLogsInput, UserUncheckedUpdateWithoutWatchLogsInput>
  }

  export type UserUpdateWithoutWatchLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoUpsertWithoutWatchLogsInput = {
    update: XOR<VideoUpdateWithoutWatchLogsInput, VideoUncheckedUpdateWithoutWatchLogsInput>
    create: XOR<VideoCreateWithoutWatchLogsInput, VideoUncheckedCreateWithoutWatchLogsInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutWatchLogsInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutWatchLogsInput, VideoUncheckedUpdateWithoutWatchLogsInput>
  }

  export type VideoUpdateWithoutWatchLogsInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutWatchLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
  }

  export type VideoCreateWithoutQuizInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutQuizInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    moduleVideos?: ModuleVideoUncheckedCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutQuizInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutQuizInput, VideoUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptCreateWithoutQuizInput = {
    score: number
    completedAt: Date | string
    user: UserCreateNestedOneWithoutQuizAttemptsInput
  }

  export type QuizAttemptUncheckedCreateWithoutQuizInput = {
    id?: number
    userId: number
    score: number
    completedAt: Date | string
  }

  export type QuizAttemptCreateOrConnectWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptCreateManyQuizInputEnvelope = {
    data: QuizAttemptCreateManyQuizInput | QuizAttemptCreateManyQuizInput[]
    skipDuplicates?: boolean
  }

  export type VideoUpsertWithoutQuizInput = {
    update: XOR<VideoUpdateWithoutQuizInput, VideoUncheckedUpdateWithoutQuizInput>
    create: XOR<VideoCreateWithoutQuizInput, VideoUncheckedCreateWithoutQuizInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutQuizInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutQuizInput, VideoUncheckedUpdateWithoutQuizInput>
  }

  export type VideoUpdateWithoutQuizInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutQuizInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moduleVideos?: ModuleVideoUncheckedUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type QuizAttemptUpsertWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    update: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
    create: XOR<QuizAttemptCreateWithoutQuizInput, QuizAttemptUncheckedCreateWithoutQuizInput>
  }

  export type QuizAttemptUpdateWithWhereUniqueWithoutQuizInput = {
    where: QuizAttemptWhereUniqueInput
    data: XOR<QuizAttemptUpdateWithoutQuizInput, QuizAttemptUncheckedUpdateWithoutQuizInput>
  }

  export type QuizAttemptUpdateManyWithWhereWithoutQuizInput = {
    where: QuizAttemptScalarWhereInput
    data: XOR<QuizAttemptUpdateManyMutationInput, QuizAttemptUncheckedUpdateManyWithoutQuizInput>
  }

  export type UserCreateWithoutQuizAttemptsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuizAttemptsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: ModuleAssignmentUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuizAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
  }

  export type QuizCreateWithoutAttemptsInput = {
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    video: VideoCreateNestedOneWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutAttemptsInput = {
    id?: number
    videoId: number
    generatedBy: string
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
  }

  export type QuizCreateOrConnectWithoutAttemptsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
  }

  export type UserUpsertWithoutQuizAttemptsInput = {
    update: XOR<UserUpdateWithoutQuizAttemptsInput, UserUncheckedUpdateWithoutQuizAttemptsInput>
    create: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQuizAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQuizAttemptsInput, UserUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type UserUpdateWithoutQuizAttemptsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuizAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ModuleAssignmentUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QuizUpsertWithoutAttemptsInput = {
    update: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    where?: QuizWhereInput
  }

  export type QuizUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: QuizWhereInput
    data: XOR<QuizUpdateWithoutAttemptsInput, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type QuizUpdateWithoutAttemptsInput = {
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    video?: VideoUpdateOneRequiredWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
  }

  export type ModuleAssignmentCreateManyUserInput = {
    id?: number
    moduleId: number
    assignedAt: Date | string
  }

  export type QuizAttemptCreateManyUserInput = {
    id?: number
    quizId: number
    score: number
    completedAt: Date | string
  }

  export type WatchLogCreateManyUserInput = {
    id?: number
    videoId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type ModuleAssignmentUpdateWithoutUserInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    module?: ModuleUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ModuleAssignmentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUpdateWithoutUserInput = {
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    quizId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    quizId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogUpdateWithoutUserInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: VideoUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentCreateManyModuleInput = {
    id?: number
    userId: number
    assignedAt: Date | string
  }

  export type ModuleVideoCreateManyModuleInput = {
    id?: number
    videoId: number
    order: number
  }

  export type ModuleAssignmentUpdateWithoutModuleInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ModuleAssignmentUncheckedUpdateWithoutModuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleAssignmentUncheckedUpdateManyWithoutModuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModuleVideoUpdateWithoutModuleInput = {
    order?: IntFieldUpdateOperationsInput | number
    video?: VideoUpdateOneRequiredWithoutModuleVideosNestedInput
  }

  export type ModuleVideoUncheckedUpdateWithoutModuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleVideoUncheckedUpdateManyWithoutModuleInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleVideoCreateManyVideoInput = {
    id?: number
    moduleId: number
    order: number
  }

  export type WatchLogCreateManyVideoInput = {
    id?: number
    userId: number
    totalWatchTime: number
    isCompleted: boolean
    watchedPercentage: number
    skipEvents: JsonNullValueInput | InputJsonValue
    pauseEvents: JsonNullValueInput | InputJsonValue
    createdAt: Date | string
  }

  export type ModuleVideoUpdateWithoutVideoInput = {
    order?: IntFieldUpdateOperationsInput | number
    module?: ModuleUpdateOneRequiredWithoutModuleVideosNestedInput
  }

  export type ModuleVideoUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ModuleVideoUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogUpdateWithoutVideoInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchLogsNestedInput
  }

  export type WatchLogUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchLogUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptCreateManyQuizInput = {
    id?: number
    userId: number
    score: number
    completedAt: Date | string
  }

  export type QuizAttemptUpdateWithoutQuizInput = {
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutQuizAttemptsNestedInput
  }

  export type QuizAttemptUncheckedUpdateWithoutQuizInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizAttemptUncheckedUpdateManyWithoutQuizInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}