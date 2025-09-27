
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
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model SkillLevel
 * 
 */
export type SkillLevel = $Result.DefaultSelection<Prisma.$SkillLevelPayload>
/**
 * Model Grade
 * 
 */
export type Grade = $Result.DefaultSelection<Prisma.$GradePayload>
/**
 * Model Language
 * 
 */
export type Language = $Result.DefaultSelection<Prisma.$LanguagePayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model CourseAssignment
 * 
 */
export type CourseAssignment = $Result.DefaultSelection<Prisma.$CourseAssignmentPayload>
/**
 * Model CourseVideo
 * 
 */
export type CourseVideo = $Result.DefaultSelection<Prisma.$CourseVideoPayload>
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
 * Model AnalyticsEvent
 * 
 */
export type AnalyticsEvent = $Result.DefaultSelection<Prisma.$AnalyticsEventPayload>

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
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skillLevel`: Exposes CRUD operations for the **SkillLevel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SkillLevels
    * const skillLevels = await prisma.skillLevel.findMany()
    * ```
    */
  get skillLevel(): Prisma.SkillLevelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grade`: Exposes CRUD operations for the **Grade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Grades
    * const grades = await prisma.grade.findMany()
    * ```
    */
  get grade(): Prisma.GradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.language`: Exposes CRUD operations for the **Language** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Languages
    * const languages = await prisma.language.findMany()
    * ```
    */
  get language(): Prisma.LanguageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseAssignment`: Exposes CRUD operations for the **CourseAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseAssignments
    * const courseAssignments = await prisma.courseAssignment.findMany()
    * ```
    */
  get courseAssignment(): Prisma.CourseAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseVideo`: Exposes CRUD operations for the **CourseVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseVideos
    * const courseVideos = await prisma.courseVideo.findMany()
    * ```
    */
  get courseVideo(): Prisma.CourseVideoDelegate<ExtArgs, ClientOptions>;

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

  /**
   * `prisma.analyticsEvent`: Exposes CRUD operations for the **AnalyticsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsEvents
    * const analyticsEvents = await prisma.analyticsEvent.findMany()
    * ```
    */
  get analyticsEvent(): Prisma.AnalyticsEventDelegate<ExtArgs, ClientOptions>;
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
    Category: 'Category',
    SkillLevel: 'SkillLevel',
    Grade: 'Grade',
    Language: 'Language',
    Tag: 'Tag',
    Course: 'Course',
    CourseAssignment: 'CourseAssignment',
    CourseVideo: 'CourseVideo',
    Video: 'Video',
    WatchLog: 'WatchLog',
    Quiz: 'Quiz',
    QuizAttempt: 'QuizAttempt',
    AnalyticsEvent: 'AnalyticsEvent'
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
      modelProps: "user" | "category" | "skillLevel" | "grade" | "language" | "tag" | "course" | "courseAssignment" | "courseVideo" | "video" | "watchLog" | "quiz" | "quizAttempt" | "analyticsEvent"
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
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      SkillLevel: {
        payload: Prisma.$SkillLevelPayload<ExtArgs>
        fields: Prisma.SkillLevelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillLevelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillLevelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          findFirst: {
            args: Prisma.SkillLevelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillLevelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          findMany: {
            args: Prisma.SkillLevelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>[]
          }
          create: {
            args: Prisma.SkillLevelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          createMany: {
            args: Prisma.SkillLevelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SkillLevelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>[]
          }
          delete: {
            args: Prisma.SkillLevelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          update: {
            args: Prisma.SkillLevelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          deleteMany: {
            args: Prisma.SkillLevelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillLevelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SkillLevelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>[]
          }
          upsert: {
            args: Prisma.SkillLevelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillLevelPayload>
          }
          aggregate: {
            args: Prisma.SkillLevelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkillLevel>
          }
          groupBy: {
            args: Prisma.SkillLevelGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillLevelGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillLevelCountArgs<ExtArgs>
            result: $Utils.Optional<SkillLevelCountAggregateOutputType> | number
          }
        }
      }
      Grade: {
        payload: Prisma.$GradePayload<ExtArgs>
        fields: Prisma.GradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findFirst: {
            args: Prisma.GradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findMany: {
            args: Prisma.GradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          create: {
            args: Prisma.GradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          createMany: {
            args: Prisma.GradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          delete: {
            args: Prisma.GradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          update: {
            args: Prisma.GradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          deleteMany: {
            args: Prisma.GradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          upsert: {
            args: Prisma.GradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          aggregate: {
            args: Prisma.GradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrade>
          }
          groupBy: {
            args: Prisma.GradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GradeCountArgs<ExtArgs>
            result: $Utils.Optional<GradeCountAggregateOutputType> | number
          }
        }
      }
      Language: {
        payload: Prisma.$LanguagePayload<ExtArgs>
        fields: Prisma.LanguageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LanguageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LanguageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          findFirst: {
            args: Prisma.LanguageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LanguageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          findMany: {
            args: Prisma.LanguageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          create: {
            args: Prisma.LanguageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          createMany: {
            args: Prisma.LanguageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LanguageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          delete: {
            args: Prisma.LanguageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          update: {
            args: Prisma.LanguageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          deleteMany: {
            args: Prisma.LanguageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LanguageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LanguageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>[]
          }
          upsert: {
            args: Prisma.LanguageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LanguagePayload>
          }
          aggregate: {
            args: Prisma.LanguageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLanguage>
          }
          groupBy: {
            args: Prisma.LanguageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LanguageGroupByOutputType>[]
          }
          count: {
            args: Prisma.LanguageCountArgs<ExtArgs>
            result: $Utils.Optional<LanguageCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      CourseAssignment: {
        payload: Prisma.$CourseAssignmentPayload<ExtArgs>
        fields: Prisma.CourseAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          findFirst: {
            args: Prisma.CourseAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          findMany: {
            args: Prisma.CourseAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>[]
          }
          create: {
            args: Prisma.CourseAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          createMany: {
            args: Prisma.CourseAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>[]
          }
          delete: {
            args: Prisma.CourseAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          update: {
            args: Prisma.CourseAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.CourseAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.CourseAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseAssignmentPayload>
          }
          aggregate: {
            args: Prisma.CourseAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseAssignment>
          }
          groupBy: {
            args: Prisma.CourseAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<CourseAssignmentCountAggregateOutputType> | number
          }
        }
      }
      CourseVideo: {
        payload: Prisma.$CourseVideoPayload<ExtArgs>
        fields: Prisma.CourseVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          findFirst: {
            args: Prisma.CourseVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          findMany: {
            args: Prisma.CourseVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>[]
          }
          create: {
            args: Prisma.CourseVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          createMany: {
            args: Prisma.CourseVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>[]
          }
          delete: {
            args: Prisma.CourseVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          update: {
            args: Prisma.CourseVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          deleteMany: {
            args: Prisma.CourseVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>[]
          }
          upsert: {
            args: Prisma.CourseVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseVideoPayload>
          }
          aggregate: {
            args: Prisma.CourseVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseVideo>
          }
          groupBy: {
            args: Prisma.CourseVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseVideoCountArgs<ExtArgs>
            result: $Utils.Optional<CourseVideoCountAggregateOutputType> | number
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
      AnalyticsEvent: {
        payload: Prisma.$AnalyticsEventPayload<ExtArgs>
        fields: Prisma.AnalyticsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findMany: {
            args: Prisma.AnalyticsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          create: {
            args: Prisma.AnalyticsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          createMany: {
            args: Prisma.AnalyticsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          update: {
            args: Prisma.AnalyticsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsEvent>
          }
          groupBy: {
            args: Prisma.AnalyticsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsEventCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventCountAggregateOutputType> | number
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
    category?: CategoryOmit
    skillLevel?: SkillLevelOmit
    grade?: GradeOmit
    language?: LanguageOmit
    tag?: TagOmit
    course?: CourseOmit
    courseAssignment?: CourseAssignmentOmit
    courseVideo?: CourseVideoOmit
    video?: VideoOmit
    watchLog?: WatchLogOmit
    quiz?: QuizOmit
    quizAttempt?: QuizAttemptOmit
    analyticsEvent?: AnalyticsEventOmit
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
    AnalyticsEvent: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | UserCountOutputTypeCountAssignmentsArgs
    quizAttempts?: boolean | UserCountOutputTypeCountQuizAttemptsArgs
    watchLogs?: boolean | UserCountOutputTypeCountWatchLogsArgs
    AnalyticsEvent?: boolean | UserCountOutputTypeCountAnalyticsEventArgs
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
    where?: CourseAssignmentWhereInput
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    courses: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | CategoryCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type SkillLevelCountOutputType
   */

  export type SkillLevelCountOutputType = {
    courses: number
  }

  export type SkillLevelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | SkillLevelCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * SkillLevelCountOutputType without action
   */
  export type SkillLevelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevelCountOutputType
     */
    select?: SkillLevelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillLevelCountOutputType without action
   */
  export type SkillLevelCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type GradeCountOutputType
   */

  export type GradeCountOutputType = {
    courses: number
  }

  export type GradeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | GradeCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * GradeCountOutputType without action
   */
  export type GradeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GradeCountOutputType
     */
    select?: GradeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GradeCountOutputType without action
   */
  export type GradeCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type LanguageCountOutputType
   */

  export type LanguageCountOutputType = {
    courses: number
  }

  export type LanguageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | LanguageCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * LanguageCountOutputType without action
   */
  export type LanguageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LanguageCountOutputType
     */
    select?: LanguageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LanguageCountOutputType without action
   */
  export type LanguageCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    courses: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | TagCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    tags: number
    assignments: number
    courseVideos: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | CourseCountOutputTypeCountTagsArgs
    assignments?: boolean | CourseCountOutputTypeCountAssignmentsArgs
    courseVideos?: boolean | CourseCountOutputTypeCountCourseVideosArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseAssignmentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountCourseVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseVideoWhereInput
  }


  /**
   * Count Type VideoCountOutputType
   */

  export type VideoCountOutputType = {
    courseVideos: number
    watchLogs: number
    AnalyticsEvent: number
  }

  export type VideoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseVideos?: boolean | VideoCountOutputTypeCountCourseVideosArgs
    watchLogs?: boolean | VideoCountOutputTypeCountWatchLogsArgs
    AnalyticsEvent?: boolean | VideoCountOutputTypeCountAnalyticsEventArgs
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
  export type VideoCountOutputTypeCountCourseVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseVideoWhereInput
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountWatchLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchLogWhereInput
  }

  /**
   * VideoCountOutputType without action
   */
  export type VideoCountOutputTypeCountAnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
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
    AnalyticsEvent?: boolean | User$AnalyticsEventArgs<ExtArgs>
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
    AnalyticsEvent?: boolean | User$AnalyticsEventArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      assignments: Prisma.$CourseAssignmentPayload<ExtArgs>[]
      quizAttempts: Prisma.$QuizAttemptPayload<ExtArgs>[]
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
      AnalyticsEvent: Prisma.$AnalyticsEventPayload<ExtArgs>[]
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
    assignments<T extends User$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quizAttempts<T extends User$quizAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$quizAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchLogs<T extends User$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AnalyticsEvent<T extends User$AnalyticsEventArgs<ExtArgs> = {}>(args?: Subset<T, User$AnalyticsEventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    where?: CourseAssignmentWhereInput
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    cursor?: CourseAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseAssignmentScalarFieldEnum | CourseAssignmentScalarFieldEnum[]
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
   * User.AnalyticsEvent
   */
  export type User$AnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    cursor?: AnalyticsEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
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
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courses?: boolean | Category$coursesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Category$coursesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Category$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Category$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.courses
   */
  export type Category$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model SkillLevel
   */

  export type AggregateSkillLevel = {
    _count: SkillLevelCountAggregateOutputType | null
    _avg: SkillLevelAvgAggregateOutputType | null
    _sum: SkillLevelSumAggregateOutputType | null
    _min: SkillLevelMinAggregateOutputType | null
    _max: SkillLevelMaxAggregateOutputType | null
  }

  export type SkillLevelAvgAggregateOutputType = {
    id: number | null
  }

  export type SkillLevelSumAggregateOutputType = {
    id: number | null
  }

  export type SkillLevelMinAggregateOutputType = {
    id: number | null
    level: string | null
  }

  export type SkillLevelMaxAggregateOutputType = {
    id: number | null
    level: string | null
  }

  export type SkillLevelCountAggregateOutputType = {
    id: number
    level: number
    _all: number
  }


  export type SkillLevelAvgAggregateInputType = {
    id?: true
  }

  export type SkillLevelSumAggregateInputType = {
    id?: true
  }

  export type SkillLevelMinAggregateInputType = {
    id?: true
    level?: true
  }

  export type SkillLevelMaxAggregateInputType = {
    id?: true
    level?: true
  }

  export type SkillLevelCountAggregateInputType = {
    id?: true
    level?: true
    _all?: true
  }

  export type SkillLevelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillLevel to aggregate.
     */
    where?: SkillLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillLevels to fetch.
     */
    orderBy?: SkillLevelOrderByWithRelationInput | SkillLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SkillLevels
    **/
    _count?: true | SkillLevelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillLevelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillLevelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillLevelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillLevelMaxAggregateInputType
  }

  export type GetSkillLevelAggregateType<T extends SkillLevelAggregateArgs> = {
        [P in keyof T & keyof AggregateSkillLevel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkillLevel[P]>
      : GetScalarType<T[P], AggregateSkillLevel[P]>
  }




  export type SkillLevelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillLevelWhereInput
    orderBy?: SkillLevelOrderByWithAggregationInput | SkillLevelOrderByWithAggregationInput[]
    by: SkillLevelScalarFieldEnum[] | SkillLevelScalarFieldEnum
    having?: SkillLevelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillLevelCountAggregateInputType | true
    _avg?: SkillLevelAvgAggregateInputType
    _sum?: SkillLevelSumAggregateInputType
    _min?: SkillLevelMinAggregateInputType
    _max?: SkillLevelMaxAggregateInputType
  }

  export type SkillLevelGroupByOutputType = {
    id: number
    level: string
    _count: SkillLevelCountAggregateOutputType | null
    _avg: SkillLevelAvgAggregateOutputType | null
    _sum: SkillLevelSumAggregateOutputType | null
    _min: SkillLevelMinAggregateOutputType | null
    _max: SkillLevelMaxAggregateOutputType | null
  }

  type GetSkillLevelGroupByPayload<T extends SkillLevelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillLevelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillLevelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillLevelGroupByOutputType[P]>
            : GetScalarType<T[P], SkillLevelGroupByOutputType[P]>
        }
      >
    >


  export type SkillLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    courses?: boolean | SkillLevel$coursesArgs<ExtArgs>
    _count?: boolean | SkillLevelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skillLevel"]>

  export type SkillLevelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
  }, ExtArgs["result"]["skillLevel"]>

  export type SkillLevelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
  }, ExtArgs["result"]["skillLevel"]>

  export type SkillLevelSelectScalar = {
    id?: boolean
    level?: boolean
  }

  export type SkillLevelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level", ExtArgs["result"]["skillLevel"]>
  export type SkillLevelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | SkillLevel$coursesArgs<ExtArgs>
    _count?: boolean | SkillLevelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SkillLevelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SkillLevelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SkillLevelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SkillLevel"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: string
    }, ExtArgs["result"]["skillLevel"]>
    composites: {}
  }

  type SkillLevelGetPayload<S extends boolean | null | undefined | SkillLevelDefaultArgs> = $Result.GetResult<Prisma.$SkillLevelPayload, S>

  type SkillLevelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillLevelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillLevelCountAggregateInputType | true
    }

  export interface SkillLevelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SkillLevel'], meta: { name: 'SkillLevel' } }
    /**
     * Find zero or one SkillLevel that matches the filter.
     * @param {SkillLevelFindUniqueArgs} args - Arguments to find a SkillLevel
     * @example
     * // Get one SkillLevel
     * const skillLevel = await prisma.skillLevel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillLevelFindUniqueArgs>(args: SelectSubset<T, SkillLevelFindUniqueArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SkillLevel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillLevelFindUniqueOrThrowArgs} args - Arguments to find a SkillLevel
     * @example
     * // Get one SkillLevel
     * const skillLevel = await prisma.skillLevel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillLevelFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillLevelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillLevel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelFindFirstArgs} args - Arguments to find a SkillLevel
     * @example
     * // Get one SkillLevel
     * const skillLevel = await prisma.skillLevel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillLevelFindFirstArgs>(args?: SelectSubset<T, SkillLevelFindFirstArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SkillLevel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelFindFirstOrThrowArgs} args - Arguments to find a SkillLevel
     * @example
     * // Get one SkillLevel
     * const skillLevel = await prisma.skillLevel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillLevelFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillLevelFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SkillLevels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SkillLevels
     * const skillLevels = await prisma.skillLevel.findMany()
     * 
     * // Get first 10 SkillLevels
     * const skillLevels = await prisma.skillLevel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillLevelWithIdOnly = await prisma.skillLevel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillLevelFindManyArgs>(args?: SelectSubset<T, SkillLevelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SkillLevel.
     * @param {SkillLevelCreateArgs} args - Arguments to create a SkillLevel.
     * @example
     * // Create one SkillLevel
     * const SkillLevel = await prisma.skillLevel.create({
     *   data: {
     *     // ... data to create a SkillLevel
     *   }
     * })
     * 
     */
    create<T extends SkillLevelCreateArgs>(args: SelectSubset<T, SkillLevelCreateArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SkillLevels.
     * @param {SkillLevelCreateManyArgs} args - Arguments to create many SkillLevels.
     * @example
     * // Create many SkillLevels
     * const skillLevel = await prisma.skillLevel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillLevelCreateManyArgs>(args?: SelectSubset<T, SkillLevelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SkillLevels and returns the data saved in the database.
     * @param {SkillLevelCreateManyAndReturnArgs} args - Arguments to create many SkillLevels.
     * @example
     * // Create many SkillLevels
     * const skillLevel = await prisma.skillLevel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SkillLevels and only return the `id`
     * const skillLevelWithIdOnly = await prisma.skillLevel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SkillLevelCreateManyAndReturnArgs>(args?: SelectSubset<T, SkillLevelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SkillLevel.
     * @param {SkillLevelDeleteArgs} args - Arguments to delete one SkillLevel.
     * @example
     * // Delete one SkillLevel
     * const SkillLevel = await prisma.skillLevel.delete({
     *   where: {
     *     // ... filter to delete one SkillLevel
     *   }
     * })
     * 
     */
    delete<T extends SkillLevelDeleteArgs>(args: SelectSubset<T, SkillLevelDeleteArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SkillLevel.
     * @param {SkillLevelUpdateArgs} args - Arguments to update one SkillLevel.
     * @example
     * // Update one SkillLevel
     * const skillLevel = await prisma.skillLevel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillLevelUpdateArgs>(args: SelectSubset<T, SkillLevelUpdateArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SkillLevels.
     * @param {SkillLevelDeleteManyArgs} args - Arguments to filter SkillLevels to delete.
     * @example
     * // Delete a few SkillLevels
     * const { count } = await prisma.skillLevel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillLevelDeleteManyArgs>(args?: SelectSubset<T, SkillLevelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SkillLevels
     * const skillLevel = await prisma.skillLevel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillLevelUpdateManyArgs>(args: SelectSubset<T, SkillLevelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SkillLevels and returns the data updated in the database.
     * @param {SkillLevelUpdateManyAndReturnArgs} args - Arguments to update many SkillLevels.
     * @example
     * // Update many SkillLevels
     * const skillLevel = await prisma.skillLevel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SkillLevels and only return the `id`
     * const skillLevelWithIdOnly = await prisma.skillLevel.updateManyAndReturn({
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
    updateManyAndReturn<T extends SkillLevelUpdateManyAndReturnArgs>(args: SelectSubset<T, SkillLevelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SkillLevel.
     * @param {SkillLevelUpsertArgs} args - Arguments to update or create a SkillLevel.
     * @example
     * // Update or create a SkillLevel
     * const skillLevel = await prisma.skillLevel.upsert({
     *   create: {
     *     // ... data to create a SkillLevel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SkillLevel we want to update
     *   }
     * })
     */
    upsert<T extends SkillLevelUpsertArgs>(args: SelectSubset<T, SkillLevelUpsertArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SkillLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelCountArgs} args - Arguments to filter SkillLevels to count.
     * @example
     * // Count the number of SkillLevels
     * const count = await prisma.skillLevel.count({
     *   where: {
     *     // ... the filter for the SkillLevels we want to count
     *   }
     * })
    **/
    count<T extends SkillLevelCountArgs>(
      args?: Subset<T, SkillLevelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillLevelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SkillLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SkillLevelAggregateArgs>(args: Subset<T, SkillLevelAggregateArgs>): Prisma.PrismaPromise<GetSkillLevelAggregateType<T>>

    /**
     * Group by SkillLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillLevelGroupByArgs} args - Group by arguments.
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
      T extends SkillLevelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillLevelGroupByArgs['orderBy'] }
        : { orderBy?: SkillLevelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SkillLevelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillLevelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SkillLevel model
   */
  readonly fields: SkillLevelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SkillLevel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillLevelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends SkillLevel$coursesArgs<ExtArgs> = {}>(args?: Subset<T, SkillLevel$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the SkillLevel model
   */
  interface SkillLevelFieldRefs {
    readonly id: FieldRef<"SkillLevel", 'Int'>
    readonly level: FieldRef<"SkillLevel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SkillLevel findUnique
   */
  export type SkillLevelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter, which SkillLevel to fetch.
     */
    where: SkillLevelWhereUniqueInput
  }

  /**
   * SkillLevel findUniqueOrThrow
   */
  export type SkillLevelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter, which SkillLevel to fetch.
     */
    where: SkillLevelWhereUniqueInput
  }

  /**
   * SkillLevel findFirst
   */
  export type SkillLevelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter, which SkillLevel to fetch.
     */
    where?: SkillLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillLevels to fetch.
     */
    orderBy?: SkillLevelOrderByWithRelationInput | SkillLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillLevels.
     */
    cursor?: SkillLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillLevels.
     */
    distinct?: SkillLevelScalarFieldEnum | SkillLevelScalarFieldEnum[]
  }

  /**
   * SkillLevel findFirstOrThrow
   */
  export type SkillLevelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter, which SkillLevel to fetch.
     */
    where?: SkillLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillLevels to fetch.
     */
    orderBy?: SkillLevelOrderByWithRelationInput | SkillLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SkillLevels.
     */
    cursor?: SkillLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SkillLevels.
     */
    distinct?: SkillLevelScalarFieldEnum | SkillLevelScalarFieldEnum[]
  }

  /**
   * SkillLevel findMany
   */
  export type SkillLevelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter, which SkillLevels to fetch.
     */
    where?: SkillLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SkillLevels to fetch.
     */
    orderBy?: SkillLevelOrderByWithRelationInput | SkillLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SkillLevels.
     */
    cursor?: SkillLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SkillLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SkillLevels.
     */
    skip?: number
    distinct?: SkillLevelScalarFieldEnum | SkillLevelScalarFieldEnum[]
  }

  /**
   * SkillLevel create
   */
  export type SkillLevelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * The data needed to create a SkillLevel.
     */
    data: XOR<SkillLevelCreateInput, SkillLevelUncheckedCreateInput>
  }

  /**
   * SkillLevel createMany
   */
  export type SkillLevelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SkillLevels.
     */
    data: SkillLevelCreateManyInput | SkillLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SkillLevel createManyAndReturn
   */
  export type SkillLevelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * The data used to create many SkillLevels.
     */
    data: SkillLevelCreateManyInput | SkillLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SkillLevel update
   */
  export type SkillLevelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * The data needed to update a SkillLevel.
     */
    data: XOR<SkillLevelUpdateInput, SkillLevelUncheckedUpdateInput>
    /**
     * Choose, which SkillLevel to update.
     */
    where: SkillLevelWhereUniqueInput
  }

  /**
   * SkillLevel updateMany
   */
  export type SkillLevelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SkillLevels.
     */
    data: XOR<SkillLevelUpdateManyMutationInput, SkillLevelUncheckedUpdateManyInput>
    /**
     * Filter which SkillLevels to update
     */
    where?: SkillLevelWhereInput
    /**
     * Limit how many SkillLevels to update.
     */
    limit?: number
  }

  /**
   * SkillLevel updateManyAndReturn
   */
  export type SkillLevelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * The data used to update SkillLevels.
     */
    data: XOR<SkillLevelUpdateManyMutationInput, SkillLevelUncheckedUpdateManyInput>
    /**
     * Filter which SkillLevels to update
     */
    where?: SkillLevelWhereInput
    /**
     * Limit how many SkillLevels to update.
     */
    limit?: number
  }

  /**
   * SkillLevel upsert
   */
  export type SkillLevelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * The filter to search for the SkillLevel to update in case it exists.
     */
    where: SkillLevelWhereUniqueInput
    /**
     * In case the SkillLevel found by the `where` argument doesn't exist, create a new SkillLevel with this data.
     */
    create: XOR<SkillLevelCreateInput, SkillLevelUncheckedCreateInput>
    /**
     * In case the SkillLevel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillLevelUpdateInput, SkillLevelUncheckedUpdateInput>
  }

  /**
   * SkillLevel delete
   */
  export type SkillLevelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    /**
     * Filter which SkillLevel to delete.
     */
    where: SkillLevelWhereUniqueInput
  }

  /**
   * SkillLevel deleteMany
   */
  export type SkillLevelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SkillLevels to delete
     */
    where?: SkillLevelWhereInput
    /**
     * Limit how many SkillLevels to delete.
     */
    limit?: number
  }

  /**
   * SkillLevel.courses
   */
  export type SkillLevel$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * SkillLevel without action
   */
  export type SkillLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
  }


  /**
   * Model Grade
   */

  export type AggregateGrade = {
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  export type GradeAvgAggregateOutputType = {
    id: number | null
  }

  export type GradeSumAggregateOutputType = {
    id: number | null
  }

  export type GradeMinAggregateOutputType = {
    id: number | null
    value: string | null
  }

  export type GradeMaxAggregateOutputType = {
    id: number | null
    value: string | null
  }

  export type GradeCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type GradeAvgAggregateInputType = {
    id?: true
  }

  export type GradeSumAggregateInputType = {
    id?: true
  }

  export type GradeMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type GradeMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type GradeCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type GradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grade to aggregate.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Grades
    **/
    _count?: true | GradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GradeMaxAggregateInputType
  }

  export type GetGradeAggregateType<T extends GradeAggregateArgs> = {
        [P in keyof T & keyof AggregateGrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrade[P]>
      : GetScalarType<T[P], AggregateGrade[P]>
  }




  export type GradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GradeWhereInput
    orderBy?: GradeOrderByWithAggregationInput | GradeOrderByWithAggregationInput[]
    by: GradeScalarFieldEnum[] | GradeScalarFieldEnum
    having?: GradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GradeCountAggregateInputType | true
    _avg?: GradeAvgAggregateInputType
    _sum?: GradeSumAggregateInputType
    _min?: GradeMinAggregateInputType
    _max?: GradeMaxAggregateInputType
  }

  export type GradeGroupByOutputType = {
    id: number
    value: string
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  type GetGradeGroupByPayload<T extends GradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GradeGroupByOutputType[P]>
            : GetScalarType<T[P], GradeGroupByOutputType[P]>
        }
      >
    >


  export type GradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    courses?: boolean | Grade$coursesArgs<ExtArgs>
    _count?: boolean | GradeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectScalar = {
    id?: boolean
    value?: boolean
  }

  export type GradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value", ExtArgs["result"]["grade"]>
  export type GradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Grade$coursesArgs<ExtArgs>
    _count?: boolean | GradeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Grade"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: string
    }, ExtArgs["result"]["grade"]>
    composites: {}
  }

  type GradeGetPayload<S extends boolean | null | undefined | GradeDefaultArgs> = $Result.GetResult<Prisma.$GradePayload, S>

  type GradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GradeCountAggregateInputType | true
    }

  export interface GradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Grade'], meta: { name: 'Grade' } }
    /**
     * Find zero or one Grade that matches the filter.
     * @param {GradeFindUniqueArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GradeFindUniqueArgs>(args: SelectSubset<T, GradeFindUniqueArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Grade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GradeFindUniqueOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GradeFindUniqueOrThrowArgs>(args: SelectSubset<T, GradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GradeFindFirstArgs>(args?: SelectSubset<T, GradeFindFirstArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GradeFindFirstOrThrowArgs>(args?: SelectSubset<T, GradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Grades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Grades
     * const grades = await prisma.grade.findMany()
     * 
     * // Get first 10 Grades
     * const grades = await prisma.grade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gradeWithIdOnly = await prisma.grade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GradeFindManyArgs>(args?: SelectSubset<T, GradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Grade.
     * @param {GradeCreateArgs} args - Arguments to create a Grade.
     * @example
     * // Create one Grade
     * const Grade = await prisma.grade.create({
     *   data: {
     *     // ... data to create a Grade
     *   }
     * })
     * 
     */
    create<T extends GradeCreateArgs>(args: SelectSubset<T, GradeCreateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Grades.
     * @param {GradeCreateManyArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GradeCreateManyArgs>(args?: SelectSubset<T, GradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Grades and returns the data saved in the database.
     * @param {GradeCreateManyAndReturnArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GradeCreateManyAndReturnArgs>(args?: SelectSubset<T, GradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Grade.
     * @param {GradeDeleteArgs} args - Arguments to delete one Grade.
     * @example
     * // Delete one Grade
     * const Grade = await prisma.grade.delete({
     *   where: {
     *     // ... filter to delete one Grade
     *   }
     * })
     * 
     */
    delete<T extends GradeDeleteArgs>(args: SelectSubset<T, GradeDeleteArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Grade.
     * @param {GradeUpdateArgs} args - Arguments to update one Grade.
     * @example
     * // Update one Grade
     * const grade = await prisma.grade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GradeUpdateArgs>(args: SelectSubset<T, GradeUpdateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Grades.
     * @param {GradeDeleteManyArgs} args - Arguments to filter Grades to delete.
     * @example
     * // Delete a few Grades
     * const { count } = await prisma.grade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GradeDeleteManyArgs>(args?: SelectSubset<T, GradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GradeUpdateManyArgs>(args: SelectSubset<T, GradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades and returns the data updated in the database.
     * @param {GradeUpdateManyAndReturnArgs} args - Arguments to update many Grades.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.updateManyAndReturn({
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
    updateManyAndReturn<T extends GradeUpdateManyAndReturnArgs>(args: SelectSubset<T, GradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Grade.
     * @param {GradeUpsertArgs} args - Arguments to update or create a Grade.
     * @example
     * // Update or create a Grade
     * const grade = await prisma.grade.upsert({
     *   create: {
     *     // ... data to create a Grade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Grade we want to update
     *   }
     * })
     */
    upsert<T extends GradeUpsertArgs>(args: SelectSubset<T, GradeUpsertArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeCountArgs} args - Arguments to filter Grades to count.
     * @example
     * // Count the number of Grades
     * const count = await prisma.grade.count({
     *   where: {
     *     // ... the filter for the Grades we want to count
     *   }
     * })
    **/
    count<T extends GradeCountArgs>(
      args?: Subset<T, GradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GradeAggregateArgs>(args: Subset<T, GradeAggregateArgs>): Prisma.PrismaPromise<GetGradeAggregateType<T>>

    /**
     * Group by Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeGroupByArgs} args - Group by arguments.
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
      T extends GradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GradeGroupByArgs['orderBy'] }
        : { orderBy?: GradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Grade model
   */
  readonly fields: GradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Grade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Grade$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Grade$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Grade model
   */
  interface GradeFieldRefs {
    readonly id: FieldRef<"Grade", 'Int'>
    readonly value: FieldRef<"Grade", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Grade findUnique
   */
  export type GradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findUniqueOrThrow
   */
  export type GradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findFirst
   */
  export type GradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findFirstOrThrow
   */
  export type GradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findMany
   */
  export type GradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grades to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade create
   */
  export type GradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Grade.
     */
    data: XOR<GradeCreateInput, GradeUncheckedCreateInput>
  }

  /**
   * Grade createMany
   */
  export type GradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grade createManyAndReturn
   */
  export type GradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grade update
   */
  export type GradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Grade.
     */
    data: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
    /**
     * Choose, which Grade to update.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade updateMany
   */
  export type GradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
  }

  /**
   * Grade updateManyAndReturn
   */
  export type GradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
  }

  /**
   * Grade upsert
   */
  export type GradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Grade to update in case it exists.
     */
    where: GradeWhereUniqueInput
    /**
     * In case the Grade found by the `where` argument doesn't exist, create a new Grade with this data.
     */
    create: XOR<GradeCreateInput, GradeUncheckedCreateInput>
    /**
     * In case the Grade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
  }

  /**
   * Grade delete
   */
  export type GradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter which Grade to delete.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade deleteMany
   */
  export type GradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grades to delete
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to delete.
     */
    limit?: number
  }

  /**
   * Grade.courses
   */
  export type Grade$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Grade without action
   */
  export type GradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
  }


  /**
   * Model Language
   */

  export type AggregateLanguage = {
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  export type LanguageAvgAggregateOutputType = {
    id: number | null
  }

  export type LanguageSumAggregateOutputType = {
    id: number | null
  }

  export type LanguageMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type LanguageMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type LanguageCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type LanguageAvgAggregateInputType = {
    id?: true
  }

  export type LanguageSumAggregateInputType = {
    id?: true
  }

  export type LanguageMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type LanguageMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type LanguageCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type LanguageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Language to aggregate.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Languages
    **/
    _count?: true | LanguageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LanguageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LanguageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LanguageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LanguageMaxAggregateInputType
  }

  export type GetLanguageAggregateType<T extends LanguageAggregateArgs> = {
        [P in keyof T & keyof AggregateLanguage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLanguage[P]>
      : GetScalarType<T[P], AggregateLanguage[P]>
  }




  export type LanguageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LanguageWhereInput
    orderBy?: LanguageOrderByWithAggregationInput | LanguageOrderByWithAggregationInput[]
    by: LanguageScalarFieldEnum[] | LanguageScalarFieldEnum
    having?: LanguageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LanguageCountAggregateInputType | true
    _avg?: LanguageAvgAggregateInputType
    _sum?: LanguageSumAggregateInputType
    _min?: LanguageMinAggregateInputType
    _max?: LanguageMaxAggregateInputType
  }

  export type LanguageGroupByOutputType = {
    id: number
    name: string
    _count: LanguageCountAggregateOutputType | null
    _avg: LanguageAvgAggregateOutputType | null
    _sum: LanguageSumAggregateOutputType | null
    _min: LanguageMinAggregateOutputType | null
    _max: LanguageMaxAggregateOutputType | null
  }

  type GetLanguageGroupByPayload<T extends LanguageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LanguageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LanguageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LanguageGroupByOutputType[P]>
            : GetScalarType<T[P], LanguageGroupByOutputType[P]>
        }
      >
    >


  export type LanguageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courses?: boolean | Language$coursesArgs<ExtArgs>
    _count?: boolean | LanguageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["language"]>

  export type LanguageSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type LanguageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["language"]>
  export type LanguageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Language$coursesArgs<ExtArgs>
    _count?: boolean | LanguageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LanguageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LanguageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LanguagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Language"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["language"]>
    composites: {}
  }

  type LanguageGetPayload<S extends boolean | null | undefined | LanguageDefaultArgs> = $Result.GetResult<Prisma.$LanguagePayload, S>

  type LanguageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LanguageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LanguageCountAggregateInputType | true
    }

  export interface LanguageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Language'], meta: { name: 'Language' } }
    /**
     * Find zero or one Language that matches the filter.
     * @param {LanguageFindUniqueArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LanguageFindUniqueArgs>(args: SelectSubset<T, LanguageFindUniqueArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Language that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LanguageFindUniqueOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LanguageFindUniqueOrThrowArgs>(args: SelectSubset<T, LanguageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Language that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindFirstArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LanguageFindFirstArgs>(args?: SelectSubset<T, LanguageFindFirstArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Language that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindFirstOrThrowArgs} args - Arguments to find a Language
     * @example
     * // Get one Language
     * const language = await prisma.language.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LanguageFindFirstOrThrowArgs>(args?: SelectSubset<T, LanguageFindFirstOrThrowArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Languages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Languages
     * const languages = await prisma.language.findMany()
     * 
     * // Get first 10 Languages
     * const languages = await prisma.language.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const languageWithIdOnly = await prisma.language.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LanguageFindManyArgs>(args?: SelectSubset<T, LanguageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Language.
     * @param {LanguageCreateArgs} args - Arguments to create a Language.
     * @example
     * // Create one Language
     * const Language = await prisma.language.create({
     *   data: {
     *     // ... data to create a Language
     *   }
     * })
     * 
     */
    create<T extends LanguageCreateArgs>(args: SelectSubset<T, LanguageCreateArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Languages.
     * @param {LanguageCreateManyArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LanguageCreateManyArgs>(args?: SelectSubset<T, LanguageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Languages and returns the data saved in the database.
     * @param {LanguageCreateManyAndReturnArgs} args - Arguments to create many Languages.
     * @example
     * // Create many Languages
     * const language = await prisma.language.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Languages and only return the `id`
     * const languageWithIdOnly = await prisma.language.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LanguageCreateManyAndReturnArgs>(args?: SelectSubset<T, LanguageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Language.
     * @param {LanguageDeleteArgs} args - Arguments to delete one Language.
     * @example
     * // Delete one Language
     * const Language = await prisma.language.delete({
     *   where: {
     *     // ... filter to delete one Language
     *   }
     * })
     * 
     */
    delete<T extends LanguageDeleteArgs>(args: SelectSubset<T, LanguageDeleteArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Language.
     * @param {LanguageUpdateArgs} args - Arguments to update one Language.
     * @example
     * // Update one Language
     * const language = await prisma.language.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LanguageUpdateArgs>(args: SelectSubset<T, LanguageUpdateArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Languages.
     * @param {LanguageDeleteManyArgs} args - Arguments to filter Languages to delete.
     * @example
     * // Delete a few Languages
     * const { count } = await prisma.language.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LanguageDeleteManyArgs>(args?: SelectSubset<T, LanguageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LanguageUpdateManyArgs>(args: SelectSubset<T, LanguageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Languages and returns the data updated in the database.
     * @param {LanguageUpdateManyAndReturnArgs} args - Arguments to update many Languages.
     * @example
     * // Update many Languages
     * const language = await prisma.language.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Languages and only return the `id`
     * const languageWithIdOnly = await prisma.language.updateManyAndReturn({
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
    updateManyAndReturn<T extends LanguageUpdateManyAndReturnArgs>(args: SelectSubset<T, LanguageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Language.
     * @param {LanguageUpsertArgs} args - Arguments to update or create a Language.
     * @example
     * // Update or create a Language
     * const language = await prisma.language.upsert({
     *   create: {
     *     // ... data to create a Language
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Language we want to update
     *   }
     * })
     */
    upsert<T extends LanguageUpsertArgs>(args: SelectSubset<T, LanguageUpsertArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Languages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageCountArgs} args - Arguments to filter Languages to count.
     * @example
     * // Count the number of Languages
     * const count = await prisma.language.count({
     *   where: {
     *     // ... the filter for the Languages we want to count
     *   }
     * })
    **/
    count<T extends LanguageCountArgs>(
      args?: Subset<T, LanguageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LanguageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LanguageAggregateArgs>(args: Subset<T, LanguageAggregateArgs>): Prisma.PrismaPromise<GetLanguageAggregateType<T>>

    /**
     * Group by Language.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LanguageGroupByArgs} args - Group by arguments.
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
      T extends LanguageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LanguageGroupByArgs['orderBy'] }
        : { orderBy?: LanguageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LanguageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLanguageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Language model
   */
  readonly fields: LanguageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Language.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LanguageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Language$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Language$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Language model
   */
  interface LanguageFieldRefs {
    readonly id: FieldRef<"Language", 'Int'>
    readonly name: FieldRef<"Language", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Language findUnique
   */
  export type LanguageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language findUniqueOrThrow
   */
  export type LanguageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language findFirst
   */
  export type LanguageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language findFirstOrThrow
   */
  export type LanguageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Language to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Languages.
     */
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language findMany
   */
  export type LanguageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter, which Languages to fetch.
     */
    where?: LanguageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Languages to fetch.
     */
    orderBy?: LanguageOrderByWithRelationInput | LanguageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Languages.
     */
    cursor?: LanguageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Languages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Languages.
     */
    skip?: number
    distinct?: LanguageScalarFieldEnum | LanguageScalarFieldEnum[]
  }

  /**
   * Language create
   */
  export type LanguageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The data needed to create a Language.
     */
    data: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
  }

  /**
   * Language createMany
   */
  export type LanguageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Languages.
     */
    data: LanguageCreateManyInput | LanguageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Language createManyAndReturn
   */
  export type LanguageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * The data used to create many Languages.
     */
    data: LanguageCreateManyInput | LanguageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Language update
   */
  export type LanguageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The data needed to update a Language.
     */
    data: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
    /**
     * Choose, which Language to update.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language updateMany
   */
  export type LanguageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Languages.
     */
    data: XOR<LanguageUpdateManyMutationInput, LanguageUncheckedUpdateManyInput>
    /**
     * Filter which Languages to update
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to update.
     */
    limit?: number
  }

  /**
   * Language updateManyAndReturn
   */
  export type LanguageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * The data used to update Languages.
     */
    data: XOR<LanguageUpdateManyMutationInput, LanguageUncheckedUpdateManyInput>
    /**
     * Filter which Languages to update
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to update.
     */
    limit?: number
  }

  /**
   * Language upsert
   */
  export type LanguageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * The filter to search for the Language to update in case it exists.
     */
    where: LanguageWhereUniqueInput
    /**
     * In case the Language found by the `where` argument doesn't exist, create a new Language with this data.
     */
    create: XOR<LanguageCreateInput, LanguageUncheckedCreateInput>
    /**
     * In case the Language was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LanguageUpdateInput, LanguageUncheckedUpdateInput>
  }

  /**
   * Language delete
   */
  export type LanguageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    /**
     * Filter which Language to delete.
     */
    where: LanguageWhereUniqueInput
  }

  /**
   * Language deleteMany
   */
  export type LanguageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Languages to delete
     */
    where?: LanguageWhereInput
    /**
     * Limit how many Languages to delete.
     */
    limit?: number
  }

  /**
   * Language.courses
   */
  export type Language$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Language without action
   */
  export type LanguageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courses?: boolean | Tag$coursesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Tag$coursesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
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
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
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
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Tag$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Tag$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.courses
   */
  export type Tag$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
    skillLevelId: number | null
    gradeId: number | null
    languageId: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
    skillLevelId: number | null
    gradeId: number | null
    languageId: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    thumbnailUrl: string | null
    categoryId: number | null
    skillLevelId: number | null
    gradeId: number | null
    languageId: number | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    thumbnailUrl: string | null
    categoryId: number | null
    skillLevelId: number | null
    gradeId: number | null
    languageId: number | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdBy: number
    createdAt: number
    thumbnailUrl: number
    categoryId: number
    skillLevelId: number
    gradeId: number
    languageId: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
    categoryId?: true
    skillLevelId?: true
    gradeId?: true
    languageId?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
    categoryId?: true
    skillLevelId?: true
    gradeId?: true
    languageId?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    thumbnailUrl?: true
    categoryId?: true
    skillLevelId?: true
    gradeId?: true
    languageId?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    thumbnailUrl?: true
    categoryId?: true
    skillLevelId?: true
    gradeId?: true
    languageId?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdBy?: true
    createdAt?: true
    thumbnailUrl?: true
    categoryId?: true
    skillLevelId?: true
    gradeId?: true
    languageId?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    title: string
    description: string | null
    createdBy: string | null
    createdAt: Date
    thumbnailUrl: string | null
    categoryId: number | null
    skillLevelId: number | null
    gradeId: number | null
    languageId: number | null
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    categoryId?: boolean
    skillLevelId?: boolean
    gradeId?: boolean
    languageId?: boolean
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
    tags?: boolean | Course$tagsArgs<ExtArgs>
    assignments?: boolean | Course$assignmentsArgs<ExtArgs>
    courseVideos?: boolean | Course$courseVideosArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    categoryId?: boolean
    skillLevelId?: boolean
    gradeId?: boolean
    languageId?: boolean
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    categoryId?: boolean
    skillLevelId?: boolean
    gradeId?: boolean
    languageId?: boolean
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    categoryId?: boolean
    skillLevelId?: boolean
    gradeId?: boolean
    languageId?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "createdBy" | "createdAt" | "thumbnailUrl" | "categoryId" | "skillLevelId" | "gradeId" | "languageId", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
    tags?: boolean | Course$tagsArgs<ExtArgs>
    assignments?: boolean | Course$assignmentsArgs<ExtArgs>
    courseVideos?: boolean | Course$courseVideosArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | Course$categoryArgs<ExtArgs>
    skillLevel?: boolean | Course$skillLevelArgs<ExtArgs>
    grade?: boolean | Course$gradeArgs<ExtArgs>
    language?: boolean | Course$languageArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs> | null
      skillLevel: Prisma.$SkillLevelPayload<ExtArgs> | null
      grade: Prisma.$GradePayload<ExtArgs> | null
      language: Prisma.$LanguagePayload<ExtArgs> | null
      tags: Prisma.$TagPayload<ExtArgs>[]
      assignments: Prisma.$CourseAssignmentPayload<ExtArgs>[]
      courseVideos: Prisma.$CourseVideoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      createdBy: string | null
      createdAt: Date
      thumbnailUrl: string | null
      categoryId: number | null
      skillLevelId: number | null
      gradeId: number | null
      languageId: number | null
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
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
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
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
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends Course$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Course$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    skillLevel<T extends Course$skillLevelArgs<ExtArgs> = {}>(args?: Subset<T, Course$skillLevelArgs<ExtArgs>>): Prisma__SkillLevelClient<$Result.GetResult<Prisma.$SkillLevelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    grade<T extends Course$gradeArgs<ExtArgs> = {}>(args?: Subset<T, Course$gradeArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    language<T extends Course$languageArgs<ExtArgs> = {}>(args?: Subset<T, Course$languageArgs<ExtArgs>>): Prisma__LanguageClient<$Result.GetResult<Prisma.$LanguagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends Course$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Course$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Course$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    courseVideos<T extends Course$courseVideosArgs<ExtArgs> = {}>(args?: Subset<T, Course$courseVideosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly title: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly createdBy: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly thumbnailUrl: FieldRef<"Course", 'String'>
    readonly categoryId: FieldRef<"Course", 'Int'>
    readonly skillLevelId: FieldRef<"Course", 'Int'>
    readonly gradeId: FieldRef<"Course", 'Int'>
    readonly languageId: FieldRef<"Course", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.category
   */
  export type Course$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Course.skillLevel
   */
  export type Course$skillLevelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillLevel
     */
    select?: SkillLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SkillLevel
     */
    omit?: SkillLevelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillLevelInclude<ExtArgs> | null
    where?: SkillLevelWhereInput
  }

  /**
   * Course.grade
   */
  export type Course$gradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    where?: GradeWhereInput
  }

  /**
   * Course.language
   */
  export type Course$languageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Language
     */
    select?: LanguageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Language
     */
    omit?: LanguageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LanguageInclude<ExtArgs> | null
    where?: LanguageWhereInput
  }

  /**
   * Course.tags
   */
  export type Course$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Course.assignments
   */
  export type Course$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    where?: CourseAssignmentWhereInput
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    cursor?: CourseAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseAssignmentScalarFieldEnum | CourseAssignmentScalarFieldEnum[]
  }

  /**
   * Course.courseVideos
   */
  export type Course$courseVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    where?: CourseVideoWhereInput
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    cursor?: CourseVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseVideoScalarFieldEnum | CourseVideoScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model CourseAssignment
   */

  export type AggregateCourseAssignment = {
    _count: CourseAssignmentCountAggregateOutputType | null
    _avg: CourseAssignmentAvgAggregateOutputType | null
    _sum: CourseAssignmentSumAggregateOutputType | null
    _min: CourseAssignmentMinAggregateOutputType | null
    _max: CourseAssignmentMaxAggregateOutputType | null
  }

  export type CourseAssignmentAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
    userId: number | null
  }

  export type CourseAssignmentSumAggregateOutputType = {
    id: number | null
    courseId: number | null
    userId: number | null
  }

  export type CourseAssignmentMinAggregateOutputType = {
    id: number | null
    courseId: number | null
    userId: number | null
    assignedAt: Date | null
  }

  export type CourseAssignmentMaxAggregateOutputType = {
    id: number | null
    courseId: number | null
    userId: number | null
    assignedAt: Date | null
  }

  export type CourseAssignmentCountAggregateOutputType = {
    id: number
    courseId: number
    userId: number
    assignedAt: number
    _all: number
  }


  export type CourseAssignmentAvgAggregateInputType = {
    id?: true
    courseId?: true
    userId?: true
  }

  export type CourseAssignmentSumAggregateInputType = {
    id?: true
    courseId?: true
    userId?: true
  }

  export type CourseAssignmentMinAggregateInputType = {
    id?: true
    courseId?: true
    userId?: true
    assignedAt?: true
  }

  export type CourseAssignmentMaxAggregateInputType = {
    id?: true
    courseId?: true
    userId?: true
    assignedAt?: true
  }

  export type CourseAssignmentCountAggregateInputType = {
    id?: true
    courseId?: true
    userId?: true
    assignedAt?: true
    _all?: true
  }

  export type CourseAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseAssignment to aggregate.
     */
    where?: CourseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseAssignments to fetch.
     */
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseAssignments
    **/
    _count?: true | CourseAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseAssignmentMaxAggregateInputType
  }

  export type GetCourseAssignmentAggregateType<T extends CourseAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseAssignment[P]>
      : GetScalarType<T[P], AggregateCourseAssignment[P]>
  }




  export type CourseAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseAssignmentWhereInput
    orderBy?: CourseAssignmentOrderByWithAggregationInput | CourseAssignmentOrderByWithAggregationInput[]
    by: CourseAssignmentScalarFieldEnum[] | CourseAssignmentScalarFieldEnum
    having?: CourseAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseAssignmentCountAggregateInputType | true
    _avg?: CourseAssignmentAvgAggregateInputType
    _sum?: CourseAssignmentSumAggregateInputType
    _min?: CourseAssignmentMinAggregateInputType
    _max?: CourseAssignmentMaxAggregateInputType
  }

  export type CourseAssignmentGroupByOutputType = {
    id: number
    courseId: number
    userId: number
    assignedAt: Date
    _count: CourseAssignmentCountAggregateOutputType | null
    _avg: CourseAssignmentAvgAggregateOutputType | null
    _sum: CourseAssignmentSumAggregateOutputType | null
    _min: CourseAssignmentMinAggregateOutputType | null
    _max: CourseAssignmentMaxAggregateOutputType | null
  }

  type GetCourseAssignmentGroupByPayload<T extends CourseAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], CourseAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type CourseAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    userId?: boolean
    assignedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseAssignment"]>

  export type CourseAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    userId?: boolean
    assignedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseAssignment"]>

  export type CourseAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    userId?: boolean
    assignedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseAssignment"]>

  export type CourseAssignmentSelectScalar = {
    id?: boolean
    courseId?: boolean
    userId?: boolean
    assignedAt?: boolean
  }

  export type CourseAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "userId" | "assignedAt", ExtArgs["result"]["courseAssignment"]>
  export type CourseAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CourseAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CourseAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CourseAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseAssignment"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      courseId: number
      userId: number
      assignedAt: Date
    }, ExtArgs["result"]["courseAssignment"]>
    composites: {}
  }

  type CourseAssignmentGetPayload<S extends boolean | null | undefined | CourseAssignmentDefaultArgs> = $Result.GetResult<Prisma.$CourseAssignmentPayload, S>

  type CourseAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseAssignmentCountAggregateInputType | true
    }

  export interface CourseAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseAssignment'], meta: { name: 'CourseAssignment' } }
    /**
     * Find zero or one CourseAssignment that matches the filter.
     * @param {CourseAssignmentFindUniqueArgs} args - Arguments to find a CourseAssignment
     * @example
     * // Get one CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseAssignmentFindUniqueArgs>(args: SelectSubset<T, CourseAssignmentFindUniqueArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseAssignmentFindUniqueOrThrowArgs} args - Arguments to find a CourseAssignment
     * @example
     * // Get one CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentFindFirstArgs} args - Arguments to find a CourseAssignment
     * @example
     * // Get one CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseAssignmentFindFirstArgs>(args?: SelectSubset<T, CourseAssignmentFindFirstArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentFindFirstOrThrowArgs} args - Arguments to find a CourseAssignment
     * @example
     * // Get one CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseAssignments
     * const courseAssignments = await prisma.courseAssignment.findMany()
     * 
     * // Get first 10 CourseAssignments
     * const courseAssignments = await prisma.courseAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseAssignmentWithIdOnly = await prisma.courseAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseAssignmentFindManyArgs>(args?: SelectSubset<T, CourseAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseAssignment.
     * @param {CourseAssignmentCreateArgs} args - Arguments to create a CourseAssignment.
     * @example
     * // Create one CourseAssignment
     * const CourseAssignment = await prisma.courseAssignment.create({
     *   data: {
     *     // ... data to create a CourseAssignment
     *   }
     * })
     * 
     */
    create<T extends CourseAssignmentCreateArgs>(args: SelectSubset<T, CourseAssignmentCreateArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseAssignments.
     * @param {CourseAssignmentCreateManyArgs} args - Arguments to create many CourseAssignments.
     * @example
     * // Create many CourseAssignments
     * const courseAssignment = await prisma.courseAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseAssignmentCreateManyArgs>(args?: SelectSubset<T, CourseAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CourseAssignments and returns the data saved in the database.
     * @param {CourseAssignmentCreateManyAndReturnArgs} args - Arguments to create many CourseAssignments.
     * @example
     * // Create many CourseAssignments
     * const courseAssignment = await prisma.courseAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CourseAssignments and only return the `id`
     * const courseAssignmentWithIdOnly = await prisma.courseAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CourseAssignment.
     * @param {CourseAssignmentDeleteArgs} args - Arguments to delete one CourseAssignment.
     * @example
     * // Delete one CourseAssignment
     * const CourseAssignment = await prisma.courseAssignment.delete({
     *   where: {
     *     // ... filter to delete one CourseAssignment
     *   }
     * })
     * 
     */
    delete<T extends CourseAssignmentDeleteArgs>(args: SelectSubset<T, CourseAssignmentDeleteArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseAssignment.
     * @param {CourseAssignmentUpdateArgs} args - Arguments to update one CourseAssignment.
     * @example
     * // Update one CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseAssignmentUpdateArgs>(args: SelectSubset<T, CourseAssignmentUpdateArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseAssignments.
     * @param {CourseAssignmentDeleteManyArgs} args - Arguments to filter CourseAssignments to delete.
     * @example
     * // Delete a few CourseAssignments
     * const { count } = await prisma.courseAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseAssignmentDeleteManyArgs>(args?: SelectSubset<T, CourseAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseAssignments
     * const courseAssignment = await prisma.courseAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseAssignmentUpdateManyArgs>(args: SelectSubset<T, CourseAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseAssignments and returns the data updated in the database.
     * @param {CourseAssignmentUpdateManyAndReturnArgs} args - Arguments to update many CourseAssignments.
     * @example
     * // Update many CourseAssignments
     * const courseAssignment = await prisma.courseAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CourseAssignments and only return the `id`
     * const courseAssignmentWithIdOnly = await prisma.courseAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends CourseAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CourseAssignment.
     * @param {CourseAssignmentUpsertArgs} args - Arguments to update or create a CourseAssignment.
     * @example
     * // Update or create a CourseAssignment
     * const courseAssignment = await prisma.courseAssignment.upsert({
     *   create: {
     *     // ... data to create a CourseAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseAssignment we want to update
     *   }
     * })
     */
    upsert<T extends CourseAssignmentUpsertArgs>(args: SelectSubset<T, CourseAssignmentUpsertArgs<ExtArgs>>): Prisma__CourseAssignmentClient<$Result.GetResult<Prisma.$CourseAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentCountArgs} args - Arguments to filter CourseAssignments to count.
     * @example
     * // Count the number of CourseAssignments
     * const count = await prisma.courseAssignment.count({
     *   where: {
     *     // ... the filter for the CourseAssignments we want to count
     *   }
     * })
    **/
    count<T extends CourseAssignmentCountArgs>(
      args?: Subset<T, CourseAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAssignmentAggregateArgs>(args: Subset<T, CourseAssignmentAggregateArgs>): Prisma.PrismaPromise<GetCourseAssignmentAggregateType<T>>

    /**
     * Group by CourseAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAssignmentGroupByArgs} args - Group by arguments.
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
      T extends CourseAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: CourseAssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseAssignment model
   */
  readonly fields: CourseAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CourseAssignment model
   */
  interface CourseAssignmentFieldRefs {
    readonly id: FieldRef<"CourseAssignment", 'Int'>
    readonly courseId: FieldRef<"CourseAssignment", 'Int'>
    readonly userId: FieldRef<"CourseAssignment", 'Int'>
    readonly assignedAt: FieldRef<"CourseAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseAssignment findUnique
   */
  export type CourseAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseAssignment to fetch.
     */
    where: CourseAssignmentWhereUniqueInput
  }

  /**
   * CourseAssignment findUniqueOrThrow
   */
  export type CourseAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseAssignment to fetch.
     */
    where: CourseAssignmentWhereUniqueInput
  }

  /**
   * CourseAssignment findFirst
   */
  export type CourseAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseAssignment to fetch.
     */
    where?: CourseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseAssignments to fetch.
     */
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseAssignments.
     */
    cursor?: CourseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseAssignments.
     */
    distinct?: CourseAssignmentScalarFieldEnum | CourseAssignmentScalarFieldEnum[]
  }

  /**
   * CourseAssignment findFirstOrThrow
   */
  export type CourseAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseAssignment to fetch.
     */
    where?: CourseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseAssignments to fetch.
     */
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseAssignments.
     */
    cursor?: CourseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseAssignments.
     */
    distinct?: CourseAssignmentScalarFieldEnum | CourseAssignmentScalarFieldEnum[]
  }

  /**
   * CourseAssignment findMany
   */
  export type CourseAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which CourseAssignments to fetch.
     */
    where?: CourseAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseAssignments to fetch.
     */
    orderBy?: CourseAssignmentOrderByWithRelationInput | CourseAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseAssignments.
     */
    cursor?: CourseAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseAssignments.
     */
    skip?: number
    distinct?: CourseAssignmentScalarFieldEnum | CourseAssignmentScalarFieldEnum[]
  }

  /**
   * CourseAssignment create
   */
  export type CourseAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseAssignment.
     */
    data: XOR<CourseAssignmentCreateInput, CourseAssignmentUncheckedCreateInput>
  }

  /**
   * CourseAssignment createMany
   */
  export type CourseAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseAssignments.
     */
    data: CourseAssignmentCreateManyInput | CourseAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseAssignment createManyAndReturn
   */
  export type CourseAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many CourseAssignments.
     */
    data: CourseAssignmentCreateManyInput | CourseAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseAssignment update
   */
  export type CourseAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseAssignment.
     */
    data: XOR<CourseAssignmentUpdateInput, CourseAssignmentUncheckedUpdateInput>
    /**
     * Choose, which CourseAssignment to update.
     */
    where: CourseAssignmentWhereUniqueInput
  }

  /**
   * CourseAssignment updateMany
   */
  export type CourseAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseAssignments.
     */
    data: XOR<CourseAssignmentUpdateManyMutationInput, CourseAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CourseAssignments to update
     */
    where?: CourseAssignmentWhereInput
    /**
     * Limit how many CourseAssignments to update.
     */
    limit?: number
  }

  /**
   * CourseAssignment updateManyAndReturn
   */
  export type CourseAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update CourseAssignments.
     */
    data: XOR<CourseAssignmentUpdateManyMutationInput, CourseAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which CourseAssignments to update
     */
    where?: CourseAssignmentWhereInput
    /**
     * Limit how many CourseAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseAssignment upsert
   */
  export type CourseAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseAssignment to update in case it exists.
     */
    where: CourseAssignmentWhereUniqueInput
    /**
     * In case the CourseAssignment found by the `where` argument doesn't exist, create a new CourseAssignment with this data.
     */
    create: XOR<CourseAssignmentCreateInput, CourseAssignmentUncheckedCreateInput>
    /**
     * In case the CourseAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseAssignmentUpdateInput, CourseAssignmentUncheckedUpdateInput>
  }

  /**
   * CourseAssignment delete
   */
  export type CourseAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
    /**
     * Filter which CourseAssignment to delete.
     */
    where: CourseAssignmentWhereUniqueInput
  }

  /**
   * CourseAssignment deleteMany
   */
  export type CourseAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseAssignments to delete
     */
    where?: CourseAssignmentWhereInput
    /**
     * Limit how many CourseAssignments to delete.
     */
    limit?: number
  }

  /**
   * CourseAssignment without action
   */
  export type CourseAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseAssignment
     */
    select?: CourseAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseAssignment
     */
    omit?: CourseAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model CourseVideo
   */

  export type AggregateCourseVideo = {
    _count: CourseVideoCountAggregateOutputType | null
    _avg: CourseVideoAvgAggregateOutputType | null
    _sum: CourseVideoSumAggregateOutputType | null
    _min: CourseVideoMinAggregateOutputType | null
    _max: CourseVideoMaxAggregateOutputType | null
  }

  export type CourseVideoAvgAggregateOutputType = {
    id: number | null
    courseId: number | null
    videoId: number | null
    order: number | null
  }

  export type CourseVideoSumAggregateOutputType = {
    id: number | null
    courseId: number | null
    videoId: number | null
    order: number | null
  }

  export type CourseVideoMinAggregateOutputType = {
    id: number | null
    courseId: number | null
    videoId: number | null
    order: number | null
  }

  export type CourseVideoMaxAggregateOutputType = {
    id: number | null
    courseId: number | null
    videoId: number | null
    order: number | null
  }

  export type CourseVideoCountAggregateOutputType = {
    id: number
    courseId: number
    videoId: number
    order: number
    _all: number
  }


  export type CourseVideoAvgAggregateInputType = {
    id?: true
    courseId?: true
    videoId?: true
    order?: true
  }

  export type CourseVideoSumAggregateInputType = {
    id?: true
    courseId?: true
    videoId?: true
    order?: true
  }

  export type CourseVideoMinAggregateInputType = {
    id?: true
    courseId?: true
    videoId?: true
    order?: true
  }

  export type CourseVideoMaxAggregateInputType = {
    id?: true
    courseId?: true
    videoId?: true
    order?: true
  }

  export type CourseVideoCountAggregateInputType = {
    id?: true
    courseId?: true
    videoId?: true
    order?: true
    _all?: true
  }

  export type CourseVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseVideo to aggregate.
     */
    where?: CourseVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseVideos to fetch.
     */
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseVideos
    **/
    _count?: true | CourseVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseVideoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseVideoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseVideoMaxAggregateInputType
  }

  export type GetCourseVideoAggregateType<T extends CourseVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseVideo[P]>
      : GetScalarType<T[P], AggregateCourseVideo[P]>
  }




  export type CourseVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseVideoWhereInput
    orderBy?: CourseVideoOrderByWithAggregationInput | CourseVideoOrderByWithAggregationInput[]
    by: CourseVideoScalarFieldEnum[] | CourseVideoScalarFieldEnum
    having?: CourseVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseVideoCountAggregateInputType | true
    _avg?: CourseVideoAvgAggregateInputType
    _sum?: CourseVideoSumAggregateInputType
    _min?: CourseVideoMinAggregateInputType
    _max?: CourseVideoMaxAggregateInputType
  }

  export type CourseVideoGroupByOutputType = {
    id: number
    courseId: number
    videoId: number
    order: number
    _count: CourseVideoCountAggregateOutputType | null
    _avg: CourseVideoAvgAggregateOutputType | null
    _sum: CourseVideoSumAggregateOutputType | null
    _min: CourseVideoMinAggregateOutputType | null
    _max: CourseVideoMaxAggregateOutputType | null
  }

  type GetCourseVideoGroupByPayload<T extends CourseVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseVideoGroupByOutputType[P]>
            : GetScalarType<T[P], CourseVideoGroupByOutputType[P]>
        }
      >
    >


  export type CourseVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    videoId?: boolean
    order?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseVideo"]>

  export type CourseVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    videoId?: boolean
    order?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseVideo"]>

  export type CourseVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    videoId?: boolean
    order?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseVideo"]>

  export type CourseVideoSelectScalar = {
    id?: boolean
    courseId?: boolean
    videoId?: boolean
    order?: boolean
  }

  export type CourseVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "videoId" | "order", ExtArgs["result"]["courseVideo"]>
  export type CourseVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type CourseVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type CourseVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $CourseVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseVideo"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      courseId: number
      videoId: number
      order: number
    }, ExtArgs["result"]["courseVideo"]>
    composites: {}
  }

  type CourseVideoGetPayload<S extends boolean | null | undefined | CourseVideoDefaultArgs> = $Result.GetResult<Prisma.$CourseVideoPayload, S>

  type CourseVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseVideoCountAggregateInputType | true
    }

  export interface CourseVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseVideo'], meta: { name: 'CourseVideo' } }
    /**
     * Find zero or one CourseVideo that matches the filter.
     * @param {CourseVideoFindUniqueArgs} args - Arguments to find a CourseVideo
     * @example
     * // Get one CourseVideo
     * const courseVideo = await prisma.courseVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseVideoFindUniqueArgs>(args: SelectSubset<T, CourseVideoFindUniqueArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseVideoFindUniqueOrThrowArgs} args - Arguments to find a CourseVideo
     * @example
     * // Get one CourseVideo
     * const courseVideo = await prisma.courseVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoFindFirstArgs} args - Arguments to find a CourseVideo
     * @example
     * // Get one CourseVideo
     * const courseVideo = await prisma.courseVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseVideoFindFirstArgs>(args?: SelectSubset<T, CourseVideoFindFirstArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoFindFirstOrThrowArgs} args - Arguments to find a CourseVideo
     * @example
     * // Get one CourseVideo
     * const courseVideo = await prisma.courseVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseVideos
     * const courseVideos = await prisma.courseVideo.findMany()
     * 
     * // Get first 10 CourseVideos
     * const courseVideos = await prisma.courseVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseVideoWithIdOnly = await prisma.courseVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseVideoFindManyArgs>(args?: SelectSubset<T, CourseVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseVideo.
     * @param {CourseVideoCreateArgs} args - Arguments to create a CourseVideo.
     * @example
     * // Create one CourseVideo
     * const CourseVideo = await prisma.courseVideo.create({
     *   data: {
     *     // ... data to create a CourseVideo
     *   }
     * })
     * 
     */
    create<T extends CourseVideoCreateArgs>(args: SelectSubset<T, CourseVideoCreateArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseVideos.
     * @param {CourseVideoCreateManyArgs} args - Arguments to create many CourseVideos.
     * @example
     * // Create many CourseVideos
     * const courseVideo = await prisma.courseVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseVideoCreateManyArgs>(args?: SelectSubset<T, CourseVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CourseVideos and returns the data saved in the database.
     * @param {CourseVideoCreateManyAndReturnArgs} args - Arguments to create many CourseVideos.
     * @example
     * // Create many CourseVideos
     * const courseVideo = await prisma.courseVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CourseVideos and only return the `id`
     * const courseVideoWithIdOnly = await prisma.courseVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CourseVideo.
     * @param {CourseVideoDeleteArgs} args - Arguments to delete one CourseVideo.
     * @example
     * // Delete one CourseVideo
     * const CourseVideo = await prisma.courseVideo.delete({
     *   where: {
     *     // ... filter to delete one CourseVideo
     *   }
     * })
     * 
     */
    delete<T extends CourseVideoDeleteArgs>(args: SelectSubset<T, CourseVideoDeleteArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseVideo.
     * @param {CourseVideoUpdateArgs} args - Arguments to update one CourseVideo.
     * @example
     * // Update one CourseVideo
     * const courseVideo = await prisma.courseVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseVideoUpdateArgs>(args: SelectSubset<T, CourseVideoUpdateArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseVideos.
     * @param {CourseVideoDeleteManyArgs} args - Arguments to filter CourseVideos to delete.
     * @example
     * // Delete a few CourseVideos
     * const { count } = await prisma.courseVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseVideoDeleteManyArgs>(args?: SelectSubset<T, CourseVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseVideos
     * const courseVideo = await prisma.courseVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseVideoUpdateManyArgs>(args: SelectSubset<T, CourseVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseVideos and returns the data updated in the database.
     * @param {CourseVideoUpdateManyAndReturnArgs} args - Arguments to update many CourseVideos.
     * @example
     * // Update many CourseVideos
     * const courseVideo = await prisma.courseVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CourseVideos and only return the `id`
     * const courseVideoWithIdOnly = await prisma.courseVideo.updateManyAndReturn({
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
    updateManyAndReturn<T extends CourseVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CourseVideo.
     * @param {CourseVideoUpsertArgs} args - Arguments to update or create a CourseVideo.
     * @example
     * // Update or create a CourseVideo
     * const courseVideo = await prisma.courseVideo.upsert({
     *   create: {
     *     // ... data to create a CourseVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseVideo we want to update
     *   }
     * })
     */
    upsert<T extends CourseVideoUpsertArgs>(args: SelectSubset<T, CourseVideoUpsertArgs<ExtArgs>>): Prisma__CourseVideoClient<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoCountArgs} args - Arguments to filter CourseVideos to count.
     * @example
     * // Count the number of CourseVideos
     * const count = await prisma.courseVideo.count({
     *   where: {
     *     // ... the filter for the CourseVideos we want to count
     *   }
     * })
    **/
    count<T extends CourseVideoCountArgs>(
      args?: Subset<T, CourseVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseVideoAggregateArgs>(args: Subset<T, CourseVideoAggregateArgs>): Prisma.PrismaPromise<GetCourseVideoAggregateType<T>>

    /**
     * Group by CourseVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseVideoGroupByArgs} args - Group by arguments.
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
      T extends CourseVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseVideoGroupByArgs['orderBy'] }
        : { orderBy?: CourseVideoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseVideo model
   */
  readonly fields: CourseVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CourseVideo model
   */
  interface CourseVideoFieldRefs {
    readonly id: FieldRef<"CourseVideo", 'Int'>
    readonly courseId: FieldRef<"CourseVideo", 'Int'>
    readonly videoId: FieldRef<"CourseVideo", 'Int'>
    readonly order: FieldRef<"CourseVideo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CourseVideo findUnique
   */
  export type CourseVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter, which CourseVideo to fetch.
     */
    where: CourseVideoWhereUniqueInput
  }

  /**
   * CourseVideo findUniqueOrThrow
   */
  export type CourseVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter, which CourseVideo to fetch.
     */
    where: CourseVideoWhereUniqueInput
  }

  /**
   * CourseVideo findFirst
   */
  export type CourseVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter, which CourseVideo to fetch.
     */
    where?: CourseVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseVideos to fetch.
     */
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseVideos.
     */
    cursor?: CourseVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseVideos.
     */
    distinct?: CourseVideoScalarFieldEnum | CourseVideoScalarFieldEnum[]
  }

  /**
   * CourseVideo findFirstOrThrow
   */
  export type CourseVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter, which CourseVideo to fetch.
     */
    where?: CourseVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseVideos to fetch.
     */
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseVideos.
     */
    cursor?: CourseVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseVideos.
     */
    distinct?: CourseVideoScalarFieldEnum | CourseVideoScalarFieldEnum[]
  }

  /**
   * CourseVideo findMany
   */
  export type CourseVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter, which CourseVideos to fetch.
     */
    where?: CourseVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseVideos to fetch.
     */
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseVideos.
     */
    cursor?: CourseVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseVideos.
     */
    skip?: number
    distinct?: CourseVideoScalarFieldEnum | CourseVideoScalarFieldEnum[]
  }

  /**
   * CourseVideo create
   */
  export type CourseVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseVideo.
     */
    data: XOR<CourseVideoCreateInput, CourseVideoUncheckedCreateInput>
  }

  /**
   * CourseVideo createMany
   */
  export type CourseVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseVideos.
     */
    data: CourseVideoCreateManyInput | CourseVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseVideo createManyAndReturn
   */
  export type CourseVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * The data used to create many CourseVideos.
     */
    data: CourseVideoCreateManyInput | CourseVideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseVideo update
   */
  export type CourseVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseVideo.
     */
    data: XOR<CourseVideoUpdateInput, CourseVideoUncheckedUpdateInput>
    /**
     * Choose, which CourseVideo to update.
     */
    where: CourseVideoWhereUniqueInput
  }

  /**
   * CourseVideo updateMany
   */
  export type CourseVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseVideos.
     */
    data: XOR<CourseVideoUpdateManyMutationInput, CourseVideoUncheckedUpdateManyInput>
    /**
     * Filter which CourseVideos to update
     */
    where?: CourseVideoWhereInput
    /**
     * Limit how many CourseVideos to update.
     */
    limit?: number
  }

  /**
   * CourseVideo updateManyAndReturn
   */
  export type CourseVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * The data used to update CourseVideos.
     */
    data: XOR<CourseVideoUpdateManyMutationInput, CourseVideoUncheckedUpdateManyInput>
    /**
     * Filter which CourseVideos to update
     */
    where?: CourseVideoWhereInput
    /**
     * Limit how many CourseVideos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CourseVideo upsert
   */
  export type CourseVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseVideo to update in case it exists.
     */
    where: CourseVideoWhereUniqueInput
    /**
     * In case the CourseVideo found by the `where` argument doesn't exist, create a new CourseVideo with this data.
     */
    create: XOR<CourseVideoCreateInput, CourseVideoUncheckedCreateInput>
    /**
     * In case the CourseVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseVideoUpdateInput, CourseVideoUncheckedUpdateInput>
  }

  /**
   * CourseVideo delete
   */
  export type CourseVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    /**
     * Filter which CourseVideo to delete.
     */
    where: CourseVideoWhereUniqueInput
  }

  /**
   * CourseVideo deleteMany
   */
  export type CourseVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseVideos to delete
     */
    where?: CourseVideoWhereInput
    /**
     * Limit how many CourseVideos to delete.
     */
    limit?: number
  }

  /**
   * CourseVideo without action
   */
  export type CourseVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
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
    thumbnailUrl: string | null
    description: string | null
  }

  export type VideoMaxAggregateOutputType = {
    id: number | null
    title: string | null
    platform: string | null
    videoUrl: string | null
    videoId: string | null
    duration: number | null
    createdAt: Date | null
    thumbnailUrl: string | null
    description: string | null
  }

  export type VideoCountAggregateOutputType = {
    id: number
    title: number
    platform: number
    videoUrl: number
    videoId: number
    duration: number
    createdAt: number
    thumbnailUrl: number
    description: number
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
    thumbnailUrl?: true
    description?: true
  }

  export type VideoMaxAggregateInputType = {
    id?: true
    title?: true
    platform?: true
    videoUrl?: true
    videoId?: true
    duration?: true
    createdAt?: true
    thumbnailUrl?: true
    description?: true
  }

  export type VideoCountAggregateInputType = {
    id?: true
    title?: true
    platform?: true
    videoUrl?: true
    videoId?: true
    duration?: true
    createdAt?: true
    thumbnailUrl?: true
    description?: true
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
    thumbnailUrl: string | null
    description: string | null
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
    thumbnailUrl?: boolean
    description?: boolean
    courseVideos?: boolean | Video$courseVideosArgs<ExtArgs>
    quiz?: boolean | Video$quizArgs<ExtArgs>
    watchLogs?: boolean | Video$watchLogsArgs<ExtArgs>
    AnalyticsEvent?: boolean | Video$AnalyticsEventArgs<ExtArgs>
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
    thumbnailUrl?: boolean
    description?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    description?: boolean
  }, ExtArgs["result"]["video"]>

  export type VideoSelectScalar = {
    id?: boolean
    title?: boolean
    platform?: boolean
    videoUrl?: boolean
    videoId?: boolean
    duration?: boolean
    createdAt?: boolean
    thumbnailUrl?: boolean
    description?: boolean
  }

  export type VideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "platform" | "videoUrl" | "videoId" | "duration" | "createdAt" | "thumbnailUrl" | "description", ExtArgs["result"]["video"]>
  export type VideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseVideos?: boolean | Video$courseVideosArgs<ExtArgs>
    quiz?: boolean | Video$quizArgs<ExtArgs>
    watchLogs?: boolean | Video$watchLogsArgs<ExtArgs>
    AnalyticsEvent?: boolean | Video$AnalyticsEventArgs<ExtArgs>
    _count?: boolean | VideoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Video"
    objects: {
      courseVideos: Prisma.$CourseVideoPayload<ExtArgs>[]
      quiz: Prisma.$QuizPayload<ExtArgs> | null
      watchLogs: Prisma.$WatchLogPayload<ExtArgs>[]
      AnalyticsEvent: Prisma.$AnalyticsEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      platform: string
      videoUrl: string
      videoId: string
      duration: number
      createdAt: Date
      thumbnailUrl: string | null
      description: string | null
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
    courseVideos<T extends Video$courseVideosArgs<ExtArgs> = {}>(args?: Subset<T, Video$courseVideosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz<T extends Video$quizArgs<ExtArgs> = {}>(args?: Subset<T, Video$quizArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    watchLogs<T extends Video$watchLogsArgs<ExtArgs> = {}>(args?: Subset<T, Video$watchLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AnalyticsEvent<T extends Video$AnalyticsEventArgs<ExtArgs> = {}>(args?: Subset<T, Video$AnalyticsEventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly thumbnailUrl: FieldRef<"Video", 'String'>
    readonly description: FieldRef<"Video", 'String'>
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
   * Video.courseVideos
   */
  export type Video$courseVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseVideo
     */
    select?: CourseVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseVideo
     */
    omit?: CourseVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseVideoInclude<ExtArgs> | null
    where?: CourseVideoWhereInput
    orderBy?: CourseVideoOrderByWithRelationInput | CourseVideoOrderByWithRelationInput[]
    cursor?: CourseVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseVideoScalarFieldEnum | CourseVideoScalarFieldEnum[]
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
   * Video.AnalyticsEvent
   */
  export type Video$AnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    cursor?: AnalyticsEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
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
    updatedAt: Date | null
    lastUpdateTime: Date | null
  }

  export type WatchLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    totalWatchTime: number | null
    isCompleted: boolean | null
    watchedPercentage: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastUpdateTime: Date | null
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
    updatedAt: number
    lastUpdateTime: number
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
    updatedAt?: true
    lastUpdateTime?: true
  }

  export type WatchLogMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    totalWatchTime?: true
    isCompleted?: true
    watchedPercentage?: true
    createdAt?: true
    updatedAt?: true
    lastUpdateTime?: true
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
    updatedAt?: true
    lastUpdateTime?: true
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
    updatedAt: Date
    lastUpdateTime: Date | null
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
    updatedAt?: boolean
    lastUpdateTime?: boolean
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
    updatedAt?: boolean
    lastUpdateTime?: boolean
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
    updatedAt?: boolean
    lastUpdateTime?: boolean
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
    updatedAt?: boolean
    lastUpdateTime?: boolean
  }

  export type WatchLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "totalWatchTime" | "isCompleted" | "watchedPercentage" | "skipEvents" | "pauseEvents" | "createdAt" | "updatedAt" | "lastUpdateTime", ExtArgs["result"]["watchLog"]>
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
      updatedAt: Date
      lastUpdateTime: Date | null
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
    readonly updatedAt: FieldRef<"WatchLog", 'DateTime'>
    readonly lastUpdateTime: FieldRef<"WatchLog", 'DateTime'>
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
    generatedBy: string | null
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
      generatedBy: string | null
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
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizAttempt"]>

  export type QuizAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    quizId?: boolean
    score?: boolean
    completedAt?: boolean
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
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
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type QuizAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz?: boolean | QuizDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $QuizAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizAttempt"
    objects: {
      quiz: Prisma.$QuizPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
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
    quiz<T extends QuizDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizDefaultArgs<ExtArgs>>): Prisma__QuizClient<$Result.GetResult<Prisma.$QuizPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Model AnalyticsEvent
   */

  export type AggregateAnalyticsEvent = {
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  export type AnalyticsEventAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
  }

  export type AnalyticsEventSumAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
  }

  export type AnalyticsEventMinAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    eventType: string | null
    timestamp: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    videoId: number | null
    eventType: string | null
    timestamp: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    userId: number
    videoId: number
    eventType: number
    data: number
    timestamp: number
    _all: number
  }


  export type AnalyticsEventAvgAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
  }

  export type AnalyticsEventSumAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
  }

  export type AnalyticsEventMinAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    eventType?: true
    timestamp?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    eventType?: true
    timestamp?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    eventType?: true
    data?: true
    timestamp?: true
    _all?: true
  }

  export type AnalyticsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvent to aggregate.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsEvents
    **/
    _count?: true | AnalyticsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type GetAnalyticsEventAggregateType<T extends AnalyticsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
      : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
  }




  export type AnalyticsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithAggregationInput | AnalyticsEventOrderByWithAggregationInput[]
    by: AnalyticsEventScalarFieldEnum[] | AnalyticsEventScalarFieldEnum
    having?: AnalyticsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsEventCountAggregateInputType | true
    _avg?: AnalyticsEventAvgAggregateInputType
    _sum?: AnalyticsEventSumAggregateInputType
    _min?: AnalyticsEventMinAggregateInputType
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type AnalyticsEventGroupByOutputType = {
    id: number
    userId: number
    videoId: number
    eventType: string
    data: JsonValue
    timestamp: Date
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  type GetAnalyticsEventGroupByPayload<T extends AnalyticsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    eventType?: boolean
    data?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    eventType?: boolean
    data?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    eventType?: boolean
    data?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectScalar = {
    id?: boolean
    userId?: boolean
    videoId?: boolean
    eventType?: boolean
    data?: boolean
    timestamp?: boolean
  }

  export type AnalyticsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "eventType" | "data" | "timestamp", ExtArgs["result"]["analyticsEvent"]>
  export type AnalyticsEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    video?: boolean | VideoDefaultArgs<ExtArgs>
  }

  export type $AnalyticsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      video: Prisma.$VideoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      videoId: number
      eventType: string
      data: Prisma.JsonValue
      timestamp: Date
    }, ExtArgs["result"]["analyticsEvent"]>
    composites: {}
  }

  type AnalyticsEventGetPayload<S extends boolean | null | undefined | AnalyticsEventDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsEventPayload, S>

  type AnalyticsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsEventCountAggregateInputType | true
    }

  export interface AnalyticsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsEvent'], meta: { name: 'AnalyticsEvent' } }
    /**
     * Find zero or one AnalyticsEvent that matches the filter.
     * @param {AnalyticsEventFindUniqueArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsEventFindUniqueArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticsEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsEventFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsEventFindFirstArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany()
     * 
     * // Get first 10 AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsEventFindManyArgs>(args?: SelectSubset<T, AnalyticsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticsEvent.
     * @param {AnalyticsEventCreateArgs} args - Arguments to create a AnalyticsEvent.
     * @example
     * // Create one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.create({
     *   data: {
     *     // ... data to create a AnalyticsEvent
     *   }
     * })
     * 
     */
    create<T extends AnalyticsEventCreateArgs>(args: SelectSubset<T, AnalyticsEventCreateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticsEvents.
     * @param {AnalyticsEventCreateManyArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsEventCreateManyArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsEvents and returns the data saved in the database.
     * @param {AnalyticsEventCreateManyAndReturnArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticsEvent.
     * @param {AnalyticsEventDeleteArgs} args - Arguments to delete one AnalyticsEvent.
     * @example
     * // Delete one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsEvent
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsEventDeleteArgs>(args: SelectSubset<T, AnalyticsEventDeleteArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticsEvent.
     * @param {AnalyticsEventUpdateArgs} args - Arguments to update one AnalyticsEvent.
     * @example
     * // Update one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsEventUpdateArgs>(args: SelectSubset<T, AnalyticsEventUpdateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticsEvents.
     * @param {AnalyticsEventDeleteManyArgs} args - Arguments to filter AnalyticsEvents to delete.
     * @example
     * // Delete a few AnalyticsEvents
     * const { count } = await prisma.analyticsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsEventDeleteManyArgs>(args?: SelectSubset<T, AnalyticsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsEventUpdateManyArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents and returns the data updated in the database.
     * @param {AnalyticsEventUpdateManyAndReturnArgs} args - Arguments to update many AnalyticsEvents.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AnalyticsEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticsEvent.
     * @param {AnalyticsEventUpsertArgs} args - Arguments to update or create a AnalyticsEvent.
     * @example
     * // Update or create a AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.upsert({
     *   create: {
     *     // ... data to create a AnalyticsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsEvent we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsEventUpsertArgs>(args: SelectSubset<T, AnalyticsEventUpsertArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventCountArgs} args - Arguments to filter AnalyticsEvents to count.
     * @example
     * // Count the number of AnalyticsEvents
     * const count = await prisma.analyticsEvent.count({
     *   where: {
     *     // ... the filter for the AnalyticsEvents we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsEventCountArgs>(
      args?: Subset<T, AnalyticsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnalyticsEventAggregateArgs>(args: Subset<T, AnalyticsEventAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsEventAggregateType<T>>

    /**
     * Group by AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventGroupByArgs} args - Group by arguments.
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
      T extends AnalyticsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsEventGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnalyticsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsEvent model
   */
  readonly fields: AnalyticsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AnalyticsEvent model
   */
  interface AnalyticsEventFieldRefs {
    readonly id: FieldRef<"AnalyticsEvent", 'Int'>
    readonly userId: FieldRef<"AnalyticsEvent", 'Int'>
    readonly videoId: FieldRef<"AnalyticsEvent", 'Int'>
    readonly eventType: FieldRef<"AnalyticsEvent", 'String'>
    readonly data: FieldRef<"AnalyticsEvent", 'Json'>
    readonly timestamp: FieldRef<"AnalyticsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsEvent findUnique
   */
  export type AnalyticsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findUniqueOrThrow
   */
  export type AnalyticsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findFirst
   */
  export type AnalyticsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findFirstOrThrow
   */
  export type AnalyticsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findMany
   */
  export type AnalyticsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvents to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent create
   */
  export type AnalyticsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
  }

  /**
   * AnalyticsEvent createMany
   */
  export type AnalyticsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent createManyAndReturn
   */
  export type AnalyticsEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent update
   */
  export type AnalyticsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsEvent to update.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent updateMany
   */
  export type AnalyticsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent updateManyAndReturn
   */
  export type AnalyticsEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent upsert
   */
  export type AnalyticsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsEvent to update in case it exists.
     */
    where: AnalyticsEventWhereUniqueInput
    /**
     * In case the AnalyticsEvent found by the `where` argument doesn't exist, create a new AnalyticsEvent with this data.
     */
    create: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
    /**
     * In case the AnalyticsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
  }

  /**
   * AnalyticsEvent delete
   */
  export type AnalyticsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter which AnalyticsEvent to delete.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent deleteMany
   */
  export type AnalyticsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvents to delete
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to delete.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent without action
   */
  export type AnalyticsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
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


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SkillLevelScalarFieldEnum: {
    id: 'id',
    level: 'level'
  };

  export type SkillLevelScalarFieldEnum = (typeof SkillLevelScalarFieldEnum)[keyof typeof SkillLevelScalarFieldEnum]


  export const GradeScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type GradeScalarFieldEnum = (typeof GradeScalarFieldEnum)[keyof typeof GradeScalarFieldEnum]


  export const LanguageScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type LanguageScalarFieldEnum = (typeof LanguageScalarFieldEnum)[keyof typeof LanguageScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    thumbnailUrl: 'thumbnailUrl',
    categoryId: 'categoryId',
    skillLevelId: 'skillLevelId',
    gradeId: 'gradeId',
    languageId: 'languageId'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const CourseAssignmentScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    userId: 'userId',
    assignedAt: 'assignedAt'
  };

  export type CourseAssignmentScalarFieldEnum = (typeof CourseAssignmentScalarFieldEnum)[keyof typeof CourseAssignmentScalarFieldEnum]


  export const CourseVideoScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    videoId: 'videoId',
    order: 'order'
  };

  export type CourseVideoScalarFieldEnum = (typeof CourseVideoScalarFieldEnum)[keyof typeof CourseVideoScalarFieldEnum]


  export const VideoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    platform: 'platform',
    videoUrl: 'videoUrl',
    videoId: 'videoId',
    duration: 'duration',
    createdAt: 'createdAt',
    thumbnailUrl: 'thumbnailUrl',
    description: 'description'
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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastUpdateTime: 'lastUpdateTime'
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


  export const AnalyticsEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    videoId: 'videoId',
    eventType: 'eventType',
    data: 'data',
    timestamp: 'timestamp'
  };

  export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum]


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
    assignments?: CourseAssignmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    AnalyticsEvent?: AnalyticsEventListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    assignments?: CourseAssignmentOrderByRelationAggregateInput
    quizAttempts?: QuizAttemptOrderByRelationAggregateInput
    watchLogs?: WatchLogOrderByRelationAggregateInput
    AnalyticsEvent?: AnalyticsEventOrderByRelationAggregateInput
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
    assignments?: CourseAssignmentListRelationFilter
    quizAttempts?: QuizAttemptListRelationFilter
    watchLogs?: WatchLogListRelationFilter
    AnalyticsEvent?: AnalyticsEventListRelationFilter
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

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    courses?: CourseListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    courses?: CourseListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
  }

  export type SkillLevelWhereInput = {
    AND?: SkillLevelWhereInput | SkillLevelWhereInput[]
    OR?: SkillLevelWhereInput[]
    NOT?: SkillLevelWhereInput | SkillLevelWhereInput[]
    id?: IntFilter<"SkillLevel"> | number
    level?: StringFilter<"SkillLevel"> | string
    courses?: CourseListRelationFilter
  }

  export type SkillLevelOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type SkillLevelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    level?: string
    AND?: SkillLevelWhereInput | SkillLevelWhereInput[]
    OR?: SkillLevelWhereInput[]
    NOT?: SkillLevelWhereInput | SkillLevelWhereInput[]
    courses?: CourseListRelationFilter
  }, "id" | "level">

  export type SkillLevelOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    _count?: SkillLevelCountOrderByAggregateInput
    _avg?: SkillLevelAvgOrderByAggregateInput
    _max?: SkillLevelMaxOrderByAggregateInput
    _min?: SkillLevelMinOrderByAggregateInput
    _sum?: SkillLevelSumOrderByAggregateInput
  }

  export type SkillLevelScalarWhereWithAggregatesInput = {
    AND?: SkillLevelScalarWhereWithAggregatesInput | SkillLevelScalarWhereWithAggregatesInput[]
    OR?: SkillLevelScalarWhereWithAggregatesInput[]
    NOT?: SkillLevelScalarWhereWithAggregatesInput | SkillLevelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SkillLevel"> | number
    level?: StringWithAggregatesFilter<"SkillLevel"> | string
  }

  export type GradeWhereInput = {
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    id?: IntFilter<"Grade"> | number
    value?: StringFilter<"Grade"> | string
    courses?: CourseListRelationFilter
  }

  export type GradeOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type GradeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: string
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    courses?: CourseListRelationFilter
  }, "id" | "value">

  export type GradeOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: GradeCountOrderByAggregateInput
    _avg?: GradeAvgOrderByAggregateInput
    _max?: GradeMaxOrderByAggregateInput
    _min?: GradeMinOrderByAggregateInput
    _sum?: GradeSumOrderByAggregateInput
  }

  export type GradeScalarWhereWithAggregatesInput = {
    AND?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    OR?: GradeScalarWhereWithAggregatesInput[]
    NOT?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Grade"> | number
    value?: StringWithAggregatesFilter<"Grade"> | string
  }

  export type LanguageWhereInput = {
    AND?: LanguageWhereInput | LanguageWhereInput[]
    OR?: LanguageWhereInput[]
    NOT?: LanguageWhereInput | LanguageWhereInput[]
    id?: IntFilter<"Language"> | number
    name?: StringFilter<"Language"> | string
    courses?: CourseListRelationFilter
  }

  export type LanguageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type LanguageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: LanguageWhereInput | LanguageWhereInput[]
    OR?: LanguageWhereInput[]
    NOT?: LanguageWhereInput | LanguageWhereInput[]
    courses?: CourseListRelationFilter
  }, "id" | "name">

  export type LanguageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: LanguageCountOrderByAggregateInput
    _avg?: LanguageAvgOrderByAggregateInput
    _max?: LanguageMaxOrderByAggregateInput
    _min?: LanguageMinOrderByAggregateInput
    _sum?: LanguageSumOrderByAggregateInput
  }

  export type LanguageScalarWhereWithAggregatesInput = {
    AND?: LanguageScalarWhereWithAggregatesInput | LanguageScalarWhereWithAggregatesInput[]
    OR?: LanguageScalarWhereWithAggregatesInput[]
    NOT?: LanguageScalarWhereWithAggregatesInput | LanguageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Language"> | number
    name?: StringWithAggregatesFilter<"Language"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    courses?: CourseListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    courses?: CourseOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    courses?: CourseListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    createdBy?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    thumbnailUrl?: StringNullableFilter<"Course"> | string | null
    categoryId?: IntNullableFilter<"Course"> | number | null
    skillLevelId?: IntNullableFilter<"Course"> | number | null
    gradeId?: IntNullableFilter<"Course"> | number | null
    languageId?: IntNullableFilter<"Course"> | number | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    skillLevel?: XOR<SkillLevelNullableScalarRelationFilter, SkillLevelWhereInput> | null
    grade?: XOR<GradeNullableScalarRelationFilter, GradeWhereInput> | null
    language?: XOR<LanguageNullableScalarRelationFilter, LanguageWhereInput> | null
    tags?: TagListRelationFilter
    assignments?: CourseAssignmentListRelationFilter
    courseVideos?: CourseVideoListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    skillLevelId?: SortOrderInput | SortOrder
    gradeId?: SortOrderInput | SortOrder
    languageId?: SortOrderInput | SortOrder
    category?: CategoryOrderByWithRelationInput
    skillLevel?: SkillLevelOrderByWithRelationInput
    grade?: GradeOrderByWithRelationInput
    language?: LanguageOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    assignments?: CourseAssignmentOrderByRelationAggregateInput
    courseVideos?: CourseVideoOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    createdBy?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    thumbnailUrl?: StringNullableFilter<"Course"> | string | null
    categoryId?: IntNullableFilter<"Course"> | number | null
    skillLevelId?: IntNullableFilter<"Course"> | number | null
    gradeId?: IntNullableFilter<"Course"> | number | null
    languageId?: IntNullableFilter<"Course"> | number | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    skillLevel?: XOR<SkillLevelNullableScalarRelationFilter, SkillLevelWhereInput> | null
    grade?: XOR<GradeNullableScalarRelationFilter, GradeWhereInput> | null
    language?: XOR<LanguageNullableScalarRelationFilter, LanguageWhereInput> | null
    tags?: TagListRelationFilter
    assignments?: CourseAssignmentListRelationFilter
    courseVideos?: CourseVideoListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    skillLevelId?: SortOrderInput | SortOrder
    gradeId?: SortOrderInput | SortOrder
    languageId?: SortOrderInput | SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    title?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Course"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Course"> | string | null
    categoryId?: IntNullableWithAggregatesFilter<"Course"> | number | null
    skillLevelId?: IntNullableWithAggregatesFilter<"Course"> | number | null
    gradeId?: IntNullableWithAggregatesFilter<"Course"> | number | null
    languageId?: IntNullableWithAggregatesFilter<"Course"> | number | null
  }

  export type CourseAssignmentWhereInput = {
    AND?: CourseAssignmentWhereInput | CourseAssignmentWhereInput[]
    OR?: CourseAssignmentWhereInput[]
    NOT?: CourseAssignmentWhereInput | CourseAssignmentWhereInput[]
    id?: IntFilter<"CourseAssignment"> | number
    courseId?: IntFilter<"CourseAssignment"> | number
    userId?: IntFilter<"CourseAssignment"> | number
    assignedAt?: DateTimeFilter<"CourseAssignment"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CourseAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CourseAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    courseId_userId?: CourseAssignmentCourseId_userIdCompoundUniqueInput
    AND?: CourseAssignmentWhereInput | CourseAssignmentWhereInput[]
    OR?: CourseAssignmentWhereInput[]
    NOT?: CourseAssignmentWhereInput | CourseAssignmentWhereInput[]
    courseId?: IntFilter<"CourseAssignment"> | number
    userId?: IntFilter<"CourseAssignment"> | number
    assignedAt?: DateTimeFilter<"CourseAssignment"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "courseId_userId">

  export type CourseAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    _count?: CourseAssignmentCountOrderByAggregateInput
    _avg?: CourseAssignmentAvgOrderByAggregateInput
    _max?: CourseAssignmentMaxOrderByAggregateInput
    _min?: CourseAssignmentMinOrderByAggregateInput
    _sum?: CourseAssignmentSumOrderByAggregateInput
  }

  export type CourseAssignmentScalarWhereWithAggregatesInput = {
    AND?: CourseAssignmentScalarWhereWithAggregatesInput | CourseAssignmentScalarWhereWithAggregatesInput[]
    OR?: CourseAssignmentScalarWhereWithAggregatesInput[]
    NOT?: CourseAssignmentScalarWhereWithAggregatesInput | CourseAssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CourseAssignment"> | number
    courseId?: IntWithAggregatesFilter<"CourseAssignment"> | number
    userId?: IntWithAggregatesFilter<"CourseAssignment"> | number
    assignedAt?: DateTimeWithAggregatesFilter<"CourseAssignment"> | Date | string
  }

  export type CourseVideoWhereInput = {
    AND?: CourseVideoWhereInput | CourseVideoWhereInput[]
    OR?: CourseVideoWhereInput[]
    NOT?: CourseVideoWhereInput | CourseVideoWhereInput[]
    id?: IntFilter<"CourseVideo"> | number
    courseId?: IntFilter<"CourseVideo"> | number
    videoId?: IntFilter<"CourseVideo"> | number
    order?: IntFilter<"CourseVideo"> | number
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type CourseVideoOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
    course?: CourseOrderByWithRelationInput
    video?: VideoOrderByWithRelationInput
  }

  export type CourseVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    courseId_videoId?: CourseVideoCourseIdVideoIdCompoundUniqueInput
    AND?: CourseVideoWhereInput | CourseVideoWhereInput[]
    OR?: CourseVideoWhereInput[]
    NOT?: CourseVideoWhereInput | CourseVideoWhereInput[]
    courseId?: IntFilter<"CourseVideo"> | number
    videoId?: IntFilter<"CourseVideo"> | number
    order?: IntFilter<"CourseVideo"> | number
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id" | "courseId_videoId">

  export type CourseVideoOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
    _count?: CourseVideoCountOrderByAggregateInput
    _avg?: CourseVideoAvgOrderByAggregateInput
    _max?: CourseVideoMaxOrderByAggregateInput
    _min?: CourseVideoMinOrderByAggregateInput
    _sum?: CourseVideoSumOrderByAggregateInput
  }

  export type CourseVideoScalarWhereWithAggregatesInput = {
    AND?: CourseVideoScalarWhereWithAggregatesInput | CourseVideoScalarWhereWithAggregatesInput[]
    OR?: CourseVideoScalarWhereWithAggregatesInput[]
    NOT?: CourseVideoScalarWhereWithAggregatesInput | CourseVideoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CourseVideo"> | number
    courseId?: IntWithAggregatesFilter<"CourseVideo"> | number
    videoId?: IntWithAggregatesFilter<"CourseVideo"> | number
    order?: IntWithAggregatesFilter<"CourseVideo"> | number
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
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    description?: StringNullableFilter<"Video"> | string | null
    courseVideos?: CourseVideoListRelationFilter
    quiz?: XOR<QuizNullableScalarRelationFilter, QuizWhereInput> | null
    watchLogs?: WatchLogListRelationFilter
    AnalyticsEvent?: AnalyticsEventListRelationFilter
  }

  export type VideoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    courseVideos?: CourseVideoOrderByRelationAggregateInput
    quiz?: QuizOrderByWithRelationInput
    watchLogs?: WatchLogOrderByRelationAggregateInput
    AnalyticsEvent?: AnalyticsEventOrderByRelationAggregateInput
  }

  export type VideoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    videoId?: string
    AND?: VideoWhereInput | VideoWhereInput[]
    OR?: VideoWhereInput[]
    NOT?: VideoWhereInput | VideoWhereInput[]
    title?: StringFilter<"Video"> | string
    platform?: StringFilter<"Video"> | string
    videoUrl?: StringFilter<"Video"> | string
    duration?: IntFilter<"Video"> | number
    createdAt?: DateTimeFilter<"Video"> | Date | string
    thumbnailUrl?: StringNullableFilter<"Video"> | string | null
    description?: StringNullableFilter<"Video"> | string | null
    courseVideos?: CourseVideoListRelationFilter
    quiz?: XOR<QuizNullableScalarRelationFilter, QuizWhereInput> | null
    watchLogs?: WatchLogListRelationFilter
    AnalyticsEvent?: AnalyticsEventListRelationFilter
  }, "id" | "videoId">

  export type VideoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
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
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Video"> | string | null
    description?: StringNullableWithAggregatesFilter<"Video"> | string | null
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
    updatedAt?: DateTimeFilter<"WatchLog"> | Date | string
    lastUpdateTime?: DateTimeNullableFilter<"WatchLog"> | Date | string | null
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
    updatedAt?: SortOrder
    lastUpdateTime?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    video?: VideoOrderByWithRelationInput
  }

  export type WatchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_videoId?: WatchLogUserIdVideoIdCompoundUniqueInput
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
    updatedAt?: DateTimeFilter<"WatchLog"> | Date | string
    lastUpdateTime?: DateTimeNullableFilter<"WatchLog"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id" | "userId_videoId">

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
    updatedAt?: SortOrder
    lastUpdateTime?: SortOrderInput | SortOrder
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
    updatedAt?: DateTimeWithAggregatesFilter<"WatchLog"> | Date | string
    lastUpdateTime?: DateTimeNullableWithAggregatesFilter<"WatchLog"> | Date | string | null
  }

  export type QuizWhereInput = {
    AND?: QuizWhereInput | QuizWhereInput[]
    OR?: QuizWhereInput[]
    NOT?: QuizWhereInput | QuizWhereInput[]
    id?: IntFilter<"Quiz"> | number
    videoId?: IntFilter<"Quiz"> | number
    generatedBy?: StringNullableFilter<"Quiz"> | string | null
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    questions?: JsonFilter<"Quiz">
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    attempts?: QuizAttemptListRelationFilter
  }

  export type QuizOrderByWithRelationInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
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
    generatedBy?: StringNullableFilter<"Quiz"> | string | null
    createdAt?: DateTimeFilter<"Quiz"> | Date | string
    questions?: JsonFilter<"Quiz">
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
    attempts?: QuizAttemptListRelationFilter
  }, "id" | "videoId">

  export type QuizOrderByWithAggregationInput = {
    id?: SortOrder
    videoId?: SortOrder
    generatedBy?: SortOrderInput | SortOrder
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
    generatedBy?: StringNullableWithAggregatesFilter<"Quiz"> | string | null
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
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type QuizAttemptOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    quizId?: SortOrder
    score?: SortOrder
    completedAt?: SortOrder
    quiz?: QuizOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
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
    quiz?: XOR<QuizScalarRelationFilter, QuizWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
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

  export type AnalyticsEventWhereInput = {
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    id?: IntFilter<"AnalyticsEvent"> | number
    userId?: IntFilter<"AnalyticsEvent"> | number
    videoId?: IntFilter<"AnalyticsEvent"> | number
    eventType?: StringFilter<"AnalyticsEvent"> | string
    data?: JsonFilter<"AnalyticsEvent">
    timestamp?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }

  export type AnalyticsEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    eventType?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
    video?: VideoOrderByWithRelationInput
  }

  export type AnalyticsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    userId?: IntFilter<"AnalyticsEvent"> | number
    videoId?: IntFilter<"AnalyticsEvent"> | number
    eventType?: StringFilter<"AnalyticsEvent"> | string
    data?: JsonFilter<"AnalyticsEvent">
    timestamp?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    video?: XOR<VideoScalarRelationFilter, VideoWhereInput>
  }, "id">

  export type AnalyticsEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    eventType?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
    _count?: AnalyticsEventCountOrderByAggregateInput
    _avg?: AnalyticsEventAvgOrderByAggregateInput
    _max?: AnalyticsEventMaxOrderByAggregateInput
    _min?: AnalyticsEventMinOrderByAggregateInput
    _sum?: AnalyticsEventSumOrderByAggregateInput
  }

  export type AnalyticsEventScalarWhereWithAggregatesInput = {
    AND?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    OR?: AnalyticsEventScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AnalyticsEvent"> | number
    userId?: IntWithAggregatesFilter<"AnalyticsEvent"> | number
    videoId?: IntWithAggregatesFilter<"AnalyticsEvent"> | number
    eventType?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    data?: JsonWithAggregatesFilter<"AnalyticsEvent">
    timestamp?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutUserNestedInput
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

  export type CategoryCreateInput = {
    name: string
    courses?: CourseCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    courses?: CourseUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillLevelCreateInput = {
    level: string
    courses?: CourseCreateNestedManyWithoutSkillLevelInput
  }

  export type SkillLevelUncheckedCreateInput = {
    id?: number
    level: string
    courses?: CourseUncheckedCreateNestedManyWithoutSkillLevelInput
  }

  export type SkillLevelUpdateInput = {
    level?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutSkillLevelNestedInput
  }

  export type SkillLevelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutSkillLevelNestedInput
  }

  export type SkillLevelCreateManyInput = {
    id?: number
    level: string
  }

  export type SkillLevelUpdateManyMutationInput = {
    level?: StringFieldUpdateOperationsInput | string
  }

  export type SkillLevelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
  }

  export type GradeCreateInput = {
    value: string
    courses?: CourseCreateNestedManyWithoutGradeInput
  }

  export type GradeUncheckedCreateInput = {
    id?: number
    value: string
    courses?: CourseUncheckedCreateNestedManyWithoutGradeInput
  }

  export type GradeUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutGradeNestedInput
  }

  export type GradeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutGradeNestedInput
  }

  export type GradeCreateManyInput = {
    id?: number
    value: string
  }

  export type GradeUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GradeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageCreateInput = {
    name: string
    courses?: CourseCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUncheckedCreateInput = {
    id?: number
    name: string
    courses?: CourseUncheckedCreateNestedManyWithoutLanguageInput
  }

  export type LanguageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutLanguageNestedInput
  }

  export type LanguageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutLanguageNestedInput
  }

  export type LanguageCreateManyInput = {
    id?: number
    name: string
  }

  export type LanguageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    name: string
    courses?: CourseCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    courses?: CourseUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    courses?: CourseUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
  }

  export type CourseUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseAssignmentCreateInput = {
    assignedAt: Date | string
    course: CourseCreateNestedOneWithoutAssignmentsInput
    user: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type CourseAssignmentUncheckedCreateInput = {
    id?: number
    courseId: number
    userId: number
    assignedAt: Date | string
  }

  export type CourseAssignmentUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
    user?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type CourseAssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseAssignmentCreateManyInput = {
    id?: number
    courseId: number
    userId: number
    assignedAt: Date | string
  }

  export type CourseAssignmentUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseAssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseVideoCreateInput = {
    order: number
    course: CourseCreateNestedOneWithoutCourseVideosInput
    video: VideoCreateNestedOneWithoutCourseVideosInput
  }

  export type CourseVideoUncheckedCreateInput = {
    id?: number
    courseId: number
    videoId: number
    order: number
  }

  export type CourseVideoUpdateInput = {
    order?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutCourseVideosNestedInput
    video?: VideoUpdateOneRequiredWithoutCourseVideosNestedInput
  }

  export type CourseVideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CourseVideoCreateManyInput = {
    id?: number
    courseId: number
    videoId: number
    order: number
  }

  export type CourseVideoUpdateManyMutationInput = {
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CourseVideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
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
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoCreateManyInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
  }

  export type VideoUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VideoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WatchLogCreateInput = {
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
    user: UserCreateNestedOneWithoutWatchLogsInput
    video: VideoCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateInput = {
    id?: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type WatchLogUpdateInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WatchLogCreateManyInput = {
    id?: number
    userId: number
    videoId: number
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type WatchLogUpdateManyMutationInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuizCreateInput = {
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    video: VideoCreateNestedOneWithoutQuizInput
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateInput = {
    id?: number
    videoId: number
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizUpdateInput = {
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    video?: VideoUpdateOneRequiredWithoutQuizNestedInput
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
  }

  export type QuizCreateManyInput = {
    id?: number
    videoId: number
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
  }

  export type QuizUpdateManyMutationInput = {
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
  }

  export type QuizUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
  }

  export type QuizAttemptCreateInput = {
    score: number
    completedAt: Date | string
    quiz: QuizCreateNestedOneWithoutAttemptsInput
    user: UserCreateNestedOneWithoutQuizAttemptsInput
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
    quiz?: QuizUpdateOneRequiredWithoutAttemptsNestedInput
    user?: UserUpdateOneRequiredWithoutQuizAttemptsNestedInput
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

  export type AnalyticsEventCreateInput = {
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAnalyticsEventInput
    video: VideoCreateNestedOneWithoutAnalyticsEventInput
  }

  export type AnalyticsEventUncheckedCreateInput = {
    id?: number
    userId: number
    videoId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAnalyticsEventNestedInput
    video?: VideoUpdateOneRequiredWithoutAnalyticsEventNestedInput
  }

  export type AnalyticsEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id?: number
    userId: number
    videoId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type CourseAssignmentListRelationFilter = {
    every?: CourseAssignmentWhereInput
    some?: CourseAssignmentWhereInput
    none?: CourseAssignmentWhereInput
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

  export type AnalyticsEventListRelationFilter = {
    every?: AnalyticsEventWhereInput
    some?: AnalyticsEventWhereInput
    none?: AnalyticsEventWhereInput
  }

  export type CourseAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalyticsEventOrderByRelationAggregateInput = {
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

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillLevelCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type SkillLevelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillLevelMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type SkillLevelMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
  }

  export type SkillLevelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GradeCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type GradeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GradeMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type GradeMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type GradeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LanguageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LanguageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type LanguageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type SkillLevelNullableScalarRelationFilter = {
    is?: SkillLevelWhereInput | null
    isNot?: SkillLevelWhereInput | null
  }

  export type GradeNullableScalarRelationFilter = {
    is?: GradeWhereInput | null
    isNot?: GradeWhereInput | null
  }

  export type LanguageNullableScalarRelationFilter = {
    is?: LanguageWhereInput | null
    isNot?: LanguageWhereInput | null
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type CourseVideoListRelationFilter = {
    every?: CourseVideoWhereInput
    some?: CourseVideoWhereInput
    none?: CourseVideoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseVideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrder
    categoryId?: SortOrder
    skillLevelId?: SortOrder
    gradeId?: SortOrder
    languageId?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    skillLevelId?: SortOrder
    gradeId?: SortOrder
    languageId?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrder
    categoryId?: SortOrder
    skillLevelId?: SortOrder
    gradeId?: SortOrder
    languageId?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrder
    categoryId?: SortOrder
    skillLevelId?: SortOrder
    gradeId?: SortOrder
    languageId?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
    skillLevelId?: SortOrder
    gradeId?: SortOrder
    languageId?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CourseAssignmentCourseId_userIdCompoundUniqueInput = {
    courseId: number
    userId: number
  }

  export type CourseAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CourseAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
  }

  export type CourseAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CourseAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CourseAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    userId?: SortOrder
  }

  export type VideoScalarRelationFilter = {
    is?: VideoWhereInput
    isNot?: VideoWhereInput
  }

  export type CourseVideoCourseIdVideoIdCompoundUniqueInput = {
    courseId: number
    videoId: number
  }

  export type CourseVideoCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type CourseVideoAvgOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type CourseVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type CourseVideoMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    videoId?: SortOrder
    order?: SortOrder
  }

  export type CourseVideoSumOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
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
    thumbnailUrl?: SortOrder
    description?: SortOrder
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
    thumbnailUrl?: SortOrder
    description?: SortOrder
  }

  export type VideoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    platform?: SortOrder
    videoUrl?: SortOrder
    videoId?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    thumbnailUrl?: SortOrder
    description?: SortOrder
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type WatchLogUserIdVideoIdCompoundUniqueInput = {
    userId: number
    videoId: number
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
    updatedAt?: SortOrder
    lastUpdateTime?: SortOrder
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
    updatedAt?: SortOrder
    lastUpdateTime?: SortOrder
  }

  export type WatchLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    totalWatchTime?: SortOrder
    isCompleted?: SortOrder
    watchedPercentage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastUpdateTime?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    eventType?: SortOrder
    data?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
  }

  export type AnalyticsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
  }

  export type CourseAssignmentCreateNestedManyWithoutUserInput = {
    create?: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput> | CourseAssignmentCreateWithoutUserInput[] | CourseAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutUserInput | CourseAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: CourseAssignmentCreateManyUserInputEnvelope
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
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

  export type AnalyticsEventCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput> | AnalyticsEventCreateWithoutUserInput[] | AnalyticsEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutUserInput | AnalyticsEventCreateOrConnectWithoutUserInput[]
    createMany?: AnalyticsEventCreateManyUserInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type CourseAssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput> | CourseAssignmentCreateWithoutUserInput[] | CourseAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutUserInput | CourseAssignmentCreateOrConnectWithoutUserInput[]
    createMany?: CourseAssignmentCreateManyUserInputEnvelope
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
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

  export type AnalyticsEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput> | AnalyticsEventCreateWithoutUserInput[] | AnalyticsEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutUserInput | AnalyticsEventCreateOrConnectWithoutUserInput[]
    createMany?: AnalyticsEventCreateManyUserInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
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

  export type CourseAssignmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput> | CourseAssignmentCreateWithoutUserInput[] | CourseAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutUserInput | CourseAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: CourseAssignmentUpsertWithWhereUniqueWithoutUserInput | CourseAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CourseAssignmentCreateManyUserInputEnvelope
    set?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    disconnect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    delete?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    update?: CourseAssignmentUpdateWithWhereUniqueWithoutUserInput | CourseAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CourseAssignmentUpdateManyWithWhereWithoutUserInput | CourseAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
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

  export type AnalyticsEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput> | AnalyticsEventCreateWithoutUserInput[] | AnalyticsEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutUserInput | AnalyticsEventCreateOrConnectWithoutUserInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutUserInput | AnalyticsEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalyticsEventCreateManyUserInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutUserInput | AnalyticsEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutUserInput | AnalyticsEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CourseAssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput> | CourseAssignmentCreateWithoutUserInput[] | CourseAssignmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutUserInput | CourseAssignmentCreateOrConnectWithoutUserInput[]
    upsert?: CourseAssignmentUpsertWithWhereUniqueWithoutUserInput | CourseAssignmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CourseAssignmentCreateManyUserInputEnvelope
    set?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    disconnect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    delete?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    update?: CourseAssignmentUpdateWithWhereUniqueWithoutUserInput | CourseAssignmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CourseAssignmentUpdateManyWithWhereWithoutUserInput | CourseAssignmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
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

  export type AnalyticsEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput> | AnalyticsEventCreateWithoutUserInput[] | AnalyticsEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutUserInput | AnalyticsEventCreateOrConnectWithoutUserInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutUserInput | AnalyticsEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalyticsEventCreateManyUserInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutUserInput | AnalyticsEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutUserInput | AnalyticsEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput> | CourseCreateWithoutCategoryInput[] | CourseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCategoryInput | CourseCreateOrConnectWithoutCategoryInput[]
    createMany?: CourseCreateManyCategoryInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput> | CourseCreateWithoutCategoryInput[] | CourseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCategoryInput | CourseCreateOrConnectWithoutCategoryInput[]
    createMany?: CourseCreateManyCategoryInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput> | CourseCreateWithoutCategoryInput[] | CourseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCategoryInput | CourseCreateOrConnectWithoutCategoryInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutCategoryInput | CourseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CourseCreateManyCategoryInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutCategoryInput | CourseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutCategoryInput | CourseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput> | CourseCreateWithoutCategoryInput[] | CourseUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutCategoryInput | CourseCreateOrConnectWithoutCategoryInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutCategoryInput | CourseUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CourseCreateManyCategoryInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutCategoryInput | CourseUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutCategoryInput | CourseUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutSkillLevelInput = {
    create?: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput> | CourseCreateWithoutSkillLevelInput[] | CourseUncheckedCreateWithoutSkillLevelInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSkillLevelInput | CourseCreateOrConnectWithoutSkillLevelInput[]
    createMany?: CourseCreateManySkillLevelInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutSkillLevelInput = {
    create?: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput> | CourseCreateWithoutSkillLevelInput[] | CourseUncheckedCreateWithoutSkillLevelInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSkillLevelInput | CourseCreateOrConnectWithoutSkillLevelInput[]
    createMany?: CourseCreateManySkillLevelInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutSkillLevelNestedInput = {
    create?: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput> | CourseCreateWithoutSkillLevelInput[] | CourseUncheckedCreateWithoutSkillLevelInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSkillLevelInput | CourseCreateOrConnectWithoutSkillLevelInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSkillLevelInput | CourseUpsertWithWhereUniqueWithoutSkillLevelInput[]
    createMany?: CourseCreateManySkillLevelInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSkillLevelInput | CourseUpdateWithWhereUniqueWithoutSkillLevelInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSkillLevelInput | CourseUpdateManyWithWhereWithoutSkillLevelInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutSkillLevelNestedInput = {
    create?: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput> | CourseCreateWithoutSkillLevelInput[] | CourseUncheckedCreateWithoutSkillLevelInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSkillLevelInput | CourseCreateOrConnectWithoutSkillLevelInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSkillLevelInput | CourseUpsertWithWhereUniqueWithoutSkillLevelInput[]
    createMany?: CourseCreateManySkillLevelInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSkillLevelInput | CourseUpdateWithWhereUniqueWithoutSkillLevelInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSkillLevelInput | CourseUpdateManyWithWhereWithoutSkillLevelInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutGradeInput = {
    create?: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput> | CourseCreateWithoutGradeInput[] | CourseUncheckedCreateWithoutGradeInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutGradeInput | CourseCreateOrConnectWithoutGradeInput[]
    createMany?: CourseCreateManyGradeInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutGradeInput = {
    create?: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput> | CourseCreateWithoutGradeInput[] | CourseUncheckedCreateWithoutGradeInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutGradeInput | CourseCreateOrConnectWithoutGradeInput[]
    createMany?: CourseCreateManyGradeInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutGradeNestedInput = {
    create?: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput> | CourseCreateWithoutGradeInput[] | CourseUncheckedCreateWithoutGradeInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutGradeInput | CourseCreateOrConnectWithoutGradeInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutGradeInput | CourseUpsertWithWhereUniqueWithoutGradeInput[]
    createMany?: CourseCreateManyGradeInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutGradeInput | CourseUpdateWithWhereUniqueWithoutGradeInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutGradeInput | CourseUpdateManyWithWhereWithoutGradeInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutGradeNestedInput = {
    create?: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput> | CourseCreateWithoutGradeInput[] | CourseUncheckedCreateWithoutGradeInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutGradeInput | CourseCreateOrConnectWithoutGradeInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutGradeInput | CourseUpsertWithWhereUniqueWithoutGradeInput[]
    createMany?: CourseCreateManyGradeInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutGradeInput | CourseUpdateWithWhereUniqueWithoutGradeInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutGradeInput | CourseUpdateManyWithWhereWithoutGradeInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutLanguageInput = {
    create?: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput> | CourseCreateWithoutLanguageInput[] | CourseUncheckedCreateWithoutLanguageInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutLanguageInput | CourseCreateOrConnectWithoutLanguageInput[]
    createMany?: CourseCreateManyLanguageInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutLanguageInput = {
    create?: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput> | CourseCreateWithoutLanguageInput[] | CourseUncheckedCreateWithoutLanguageInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutLanguageInput | CourseCreateOrConnectWithoutLanguageInput[]
    createMany?: CourseCreateManyLanguageInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutLanguageNestedInput = {
    create?: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput> | CourseCreateWithoutLanguageInput[] | CourseUncheckedCreateWithoutLanguageInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutLanguageInput | CourseCreateOrConnectWithoutLanguageInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutLanguageInput | CourseUpsertWithWhereUniqueWithoutLanguageInput[]
    createMany?: CourseCreateManyLanguageInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutLanguageInput | CourseUpdateWithWhereUniqueWithoutLanguageInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutLanguageInput | CourseUpdateManyWithWhereWithoutLanguageInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutLanguageNestedInput = {
    create?: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput> | CourseCreateWithoutLanguageInput[] | CourseUncheckedCreateWithoutLanguageInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutLanguageInput | CourseCreateOrConnectWithoutLanguageInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutLanguageInput | CourseUpsertWithWhereUniqueWithoutLanguageInput[]
    createMany?: CourseCreateManyLanguageInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutLanguageInput | CourseUpdateWithWhereUniqueWithoutLanguageInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutLanguageInput | CourseUpdateManyWithWhereWithoutLanguageInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseCreateNestedManyWithoutTagsInput = {
    create?: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput> | CourseCreateWithoutTagsInput[] | CourseUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTagsInput | CourseCreateOrConnectWithoutTagsInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput> | CourseCreateWithoutTagsInput[] | CourseUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTagsInput | CourseCreateOrConnectWithoutTagsInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type CourseUpdateManyWithoutTagsNestedInput = {
    create?: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput> | CourseCreateWithoutTagsInput[] | CourseUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTagsInput | CourseCreateOrConnectWithoutTagsInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTagsInput | CourseUpsertWithWhereUniqueWithoutTagsInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTagsInput | CourseUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTagsInput | CourseUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput> | CourseCreateWithoutTagsInput[] | CourseUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTagsInput | CourseCreateOrConnectWithoutTagsInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTagsInput | CourseUpsertWithWhereUniqueWithoutTagsInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTagsInput | CourseUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTagsInput | CourseUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutCoursesInput = {
    create?: XOR<CategoryCreateWithoutCoursesInput, CategoryUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCoursesInput
    connect?: CategoryWhereUniqueInput
  }

  export type SkillLevelCreateNestedOneWithoutCoursesInput = {
    create?: XOR<SkillLevelCreateWithoutCoursesInput, SkillLevelUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SkillLevelCreateOrConnectWithoutCoursesInput
    connect?: SkillLevelWhereUniqueInput
  }

  export type GradeCreateNestedOneWithoutCoursesInput = {
    create?: XOR<GradeCreateWithoutCoursesInput, GradeUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: GradeCreateOrConnectWithoutCoursesInput
    connect?: GradeWhereUniqueInput
  }

  export type LanguageCreateNestedOneWithoutCoursesInput = {
    create?: XOR<LanguageCreateWithoutCoursesInput, LanguageUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutCoursesInput
    connect?: LanguageWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutCoursesInput = {
    create?: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput> | TagCreateWithoutCoursesInput[] | TagUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCoursesInput | TagCreateOrConnectWithoutCoursesInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type CourseAssignmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput> | CourseAssignmentCreateWithoutCourseInput[] | CourseAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutCourseInput | CourseAssignmentCreateOrConnectWithoutCourseInput[]
    createMany?: CourseAssignmentCreateManyCourseInputEnvelope
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
  }

  export type CourseVideoCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput> | CourseVideoCreateWithoutCourseInput[] | CourseVideoUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutCourseInput | CourseVideoCreateOrConnectWithoutCourseInput[]
    createMany?: CourseVideoCreateManyCourseInputEnvelope
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutCoursesInput = {
    create?: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput> | TagCreateWithoutCoursesInput[] | TagUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCoursesInput | TagCreateOrConnectWithoutCoursesInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput> | CourseAssignmentCreateWithoutCourseInput[] | CourseAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutCourseInput | CourseAssignmentCreateOrConnectWithoutCourseInput[]
    createMany?: CourseAssignmentCreateManyCourseInputEnvelope
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
  }

  export type CourseVideoUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput> | CourseVideoCreateWithoutCourseInput[] | CourseVideoUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutCourseInput | CourseVideoCreateOrConnectWithoutCourseInput[]
    createMany?: CourseVideoCreateManyCourseInputEnvelope
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CategoryUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<CategoryCreateWithoutCoursesInput, CategoryUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutCoursesInput
    upsert?: CategoryUpsertWithoutCoursesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutCoursesInput, CategoryUpdateWithoutCoursesInput>, CategoryUncheckedUpdateWithoutCoursesInput>
  }

  export type SkillLevelUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<SkillLevelCreateWithoutCoursesInput, SkillLevelUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SkillLevelCreateOrConnectWithoutCoursesInput
    upsert?: SkillLevelUpsertWithoutCoursesInput
    disconnect?: SkillLevelWhereInput | boolean
    delete?: SkillLevelWhereInput | boolean
    connect?: SkillLevelWhereUniqueInput
    update?: XOR<XOR<SkillLevelUpdateToOneWithWhereWithoutCoursesInput, SkillLevelUpdateWithoutCoursesInput>, SkillLevelUncheckedUpdateWithoutCoursesInput>
  }

  export type GradeUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<GradeCreateWithoutCoursesInput, GradeUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: GradeCreateOrConnectWithoutCoursesInput
    upsert?: GradeUpsertWithoutCoursesInput
    disconnect?: GradeWhereInput | boolean
    delete?: GradeWhereInput | boolean
    connect?: GradeWhereUniqueInput
    update?: XOR<XOR<GradeUpdateToOneWithWhereWithoutCoursesInput, GradeUpdateWithoutCoursesInput>, GradeUncheckedUpdateWithoutCoursesInput>
  }

  export type LanguageUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<LanguageCreateWithoutCoursesInput, LanguageUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: LanguageCreateOrConnectWithoutCoursesInput
    upsert?: LanguageUpsertWithoutCoursesInput
    disconnect?: LanguageWhereInput | boolean
    delete?: LanguageWhereInput | boolean
    connect?: LanguageWhereUniqueInput
    update?: XOR<XOR<LanguageUpdateToOneWithWhereWithoutCoursesInput, LanguageUpdateWithoutCoursesInput>, LanguageUncheckedUpdateWithoutCoursesInput>
  }

  export type TagUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput> | TagCreateWithoutCoursesInput[] | TagUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCoursesInput | TagCreateOrConnectWithoutCoursesInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutCoursesInput | TagUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutCoursesInput | TagUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: TagUpdateManyWithWhereWithoutCoursesInput | TagUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type CourseAssignmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput> | CourseAssignmentCreateWithoutCourseInput[] | CourseAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutCourseInput | CourseAssignmentCreateOrConnectWithoutCourseInput[]
    upsert?: CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput | CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseAssignmentCreateManyCourseInputEnvelope
    set?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    disconnect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    delete?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    update?: CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput | CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseAssignmentUpdateManyWithWhereWithoutCourseInput | CourseAssignmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
  }

  export type CourseVideoUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput> | CourseVideoCreateWithoutCourseInput[] | CourseVideoUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutCourseInput | CourseVideoCreateOrConnectWithoutCourseInput[]
    upsert?: CourseVideoUpsertWithWhereUniqueWithoutCourseInput | CourseVideoUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseVideoCreateManyCourseInputEnvelope
    set?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    disconnect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    delete?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    update?: CourseVideoUpdateWithWhereUniqueWithoutCourseInput | CourseVideoUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseVideoUpdateManyWithWhereWithoutCourseInput | CourseVideoUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TagUncheckedUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput> | TagCreateWithoutCoursesInput[] | TagUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TagCreateOrConnectWithoutCoursesInput | TagCreateOrConnectWithoutCoursesInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutCoursesInput | TagUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutCoursesInput | TagUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: TagUpdateManyWithWhereWithoutCoursesInput | TagUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput> | CourseAssignmentCreateWithoutCourseInput[] | CourseAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseAssignmentCreateOrConnectWithoutCourseInput | CourseAssignmentCreateOrConnectWithoutCourseInput[]
    upsert?: CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput | CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseAssignmentCreateManyCourseInputEnvelope
    set?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    disconnect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    delete?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    connect?: CourseAssignmentWhereUniqueInput | CourseAssignmentWhereUniqueInput[]
    update?: CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput | CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseAssignmentUpdateManyWithWhereWithoutCourseInput | CourseAssignmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
  }

  export type CourseVideoUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput> | CourseVideoCreateWithoutCourseInput[] | CourseVideoUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutCourseInput | CourseVideoCreateOrConnectWithoutCourseInput[]
    upsert?: CourseVideoUpsertWithWhereUniqueWithoutCourseInput | CourseVideoUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseVideoCreateManyCourseInputEnvelope
    set?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    disconnect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    delete?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    update?: CourseVideoUpdateWithWhereUniqueWithoutCourseInput | CourseVideoUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseVideoUpdateManyWithWhereWithoutCourseInput | CourseVideoUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAssignmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAssignmentsInput
    upsert?: CourseUpsertWithoutAssignmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutAssignmentsInput, CourseUpdateWithoutAssignmentsInput>, CourseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    upsert?: UserUpsertWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignmentsInput, UserUpdateWithoutAssignmentsInput>, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CourseCreateNestedOneWithoutCourseVideosInput = {
    create?: XOR<CourseCreateWithoutCourseVideosInput, CourseUncheckedCreateWithoutCourseVideosInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseVideosInput
    connect?: CourseWhereUniqueInput
  }

  export type VideoCreateNestedOneWithoutCourseVideosInput = {
    create?: XOR<VideoCreateWithoutCourseVideosInput, VideoUncheckedCreateWithoutCourseVideosInput>
    connectOrCreate?: VideoCreateOrConnectWithoutCourseVideosInput
    connect?: VideoWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutCourseVideosNestedInput = {
    create?: XOR<CourseCreateWithoutCourseVideosInput, CourseUncheckedCreateWithoutCourseVideosInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseVideosInput
    upsert?: CourseUpsertWithoutCourseVideosInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutCourseVideosInput, CourseUpdateWithoutCourseVideosInput>, CourseUncheckedUpdateWithoutCourseVideosInput>
  }

  export type VideoUpdateOneRequiredWithoutCourseVideosNestedInput = {
    create?: XOR<VideoCreateWithoutCourseVideosInput, VideoUncheckedCreateWithoutCourseVideosInput>
    connectOrCreate?: VideoCreateOrConnectWithoutCourseVideosInput
    upsert?: VideoUpsertWithoutCourseVideosInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutCourseVideosInput, VideoUpdateWithoutCourseVideosInput>, VideoUncheckedUpdateWithoutCourseVideosInput>
  }

  export type CourseVideoCreateNestedManyWithoutVideoInput = {
    create?: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput> | CourseVideoCreateWithoutVideoInput[] | CourseVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutVideoInput | CourseVideoCreateOrConnectWithoutVideoInput[]
    createMany?: CourseVideoCreateManyVideoInputEnvelope
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
  }

  export type QuizCreateNestedOneWithoutVideoInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    connect?: QuizWhereUniqueInput
  }

  export type WatchLogCreateNestedManyWithoutVideoInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type AnalyticsEventCreateNestedManyWithoutVideoInput = {
    create?: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput> | AnalyticsEventCreateWithoutVideoInput[] | AnalyticsEventUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutVideoInput | AnalyticsEventCreateOrConnectWithoutVideoInput[]
    createMany?: AnalyticsEventCreateManyVideoInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type CourseVideoUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput> | CourseVideoCreateWithoutVideoInput[] | CourseVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutVideoInput | CourseVideoCreateOrConnectWithoutVideoInput[]
    createMany?: CourseVideoCreateManyVideoInputEnvelope
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
  }

  export type QuizUncheckedCreateNestedOneWithoutVideoInput = {
    create?: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
    connectOrCreate?: QuizCreateOrConnectWithoutVideoInput
    connect?: QuizWhereUniqueInput
  }

  export type WatchLogUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput> | WatchLogCreateWithoutVideoInput[] | WatchLogUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: WatchLogCreateOrConnectWithoutVideoInput | WatchLogCreateOrConnectWithoutVideoInput[]
    createMany?: WatchLogCreateManyVideoInputEnvelope
    connect?: WatchLogWhereUniqueInput | WatchLogWhereUniqueInput[]
  }

  export type AnalyticsEventUncheckedCreateNestedManyWithoutVideoInput = {
    create?: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput> | AnalyticsEventCreateWithoutVideoInput[] | AnalyticsEventUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutVideoInput | AnalyticsEventCreateOrConnectWithoutVideoInput[]
    createMany?: AnalyticsEventCreateManyVideoInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type CourseVideoUpdateManyWithoutVideoNestedInput = {
    create?: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput> | CourseVideoCreateWithoutVideoInput[] | CourseVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutVideoInput | CourseVideoCreateOrConnectWithoutVideoInput[]
    upsert?: CourseVideoUpsertWithWhereUniqueWithoutVideoInput | CourseVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: CourseVideoCreateManyVideoInputEnvelope
    set?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    disconnect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    delete?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    update?: CourseVideoUpdateWithWhereUniqueWithoutVideoInput | CourseVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: CourseVideoUpdateManyWithWhereWithoutVideoInput | CourseVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
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

  export type AnalyticsEventUpdateManyWithoutVideoNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput> | AnalyticsEventCreateWithoutVideoInput[] | AnalyticsEventUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutVideoInput | AnalyticsEventCreateOrConnectWithoutVideoInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutVideoInput | AnalyticsEventUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: AnalyticsEventCreateManyVideoInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutVideoInput | AnalyticsEventUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutVideoInput | AnalyticsEventUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type CourseVideoUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput> | CourseVideoCreateWithoutVideoInput[] | CourseVideoUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: CourseVideoCreateOrConnectWithoutVideoInput | CourseVideoCreateOrConnectWithoutVideoInput[]
    upsert?: CourseVideoUpsertWithWhereUniqueWithoutVideoInput | CourseVideoUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: CourseVideoCreateManyVideoInputEnvelope
    set?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    disconnect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    delete?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    connect?: CourseVideoWhereUniqueInput | CourseVideoWhereUniqueInput[]
    update?: CourseVideoUpdateWithWhereUniqueWithoutVideoInput | CourseVideoUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: CourseVideoUpdateManyWithWhereWithoutVideoInput | CourseVideoUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
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

  export type AnalyticsEventUncheckedUpdateManyWithoutVideoNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput> | AnalyticsEventCreateWithoutVideoInput[] | AnalyticsEventUncheckedCreateWithoutVideoInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutVideoInput | AnalyticsEventCreateOrConnectWithoutVideoInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutVideoInput | AnalyticsEventUpsertWithWhereUniqueWithoutVideoInput[]
    createMany?: AnalyticsEventCreateManyVideoInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutVideoInput | AnalyticsEventUpdateWithWhereUniqueWithoutVideoInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutVideoInput | AnalyticsEventUpdateManyWithWhereWithoutVideoInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type QuizCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutQuizAttemptsInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type QuizUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: QuizCreateOrConnectWithoutAttemptsInput
    upsert?: QuizUpsertWithoutAttemptsInput
    connect?: QuizWhereUniqueInput
    update?: XOR<XOR<QuizUpdateToOneWithWhereWithoutAttemptsInput, QuizUpdateWithoutAttemptsInput>, QuizUncheckedUpdateWithoutAttemptsInput>
  }

  export type UserUpdateOneRequiredWithoutQuizAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutQuizAttemptsInput
    upsert?: UserUpsertWithoutQuizAttemptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQuizAttemptsInput, UserUpdateWithoutQuizAttemptsInput>, UserUncheckedUpdateWithoutQuizAttemptsInput>
  }

  export type UserCreateNestedOneWithoutAnalyticsEventInput = {
    create?: XOR<UserCreateWithoutAnalyticsEventInput, UserUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalyticsEventInput
    connect?: UserWhereUniqueInput
  }

  export type VideoCreateNestedOneWithoutAnalyticsEventInput = {
    create?: XOR<VideoCreateWithoutAnalyticsEventInput, VideoUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: VideoCreateOrConnectWithoutAnalyticsEventInput
    connect?: VideoWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAnalyticsEventNestedInput = {
    create?: XOR<UserCreateWithoutAnalyticsEventInput, UserUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalyticsEventInput
    upsert?: UserUpsertWithoutAnalyticsEventInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnalyticsEventInput, UserUpdateWithoutAnalyticsEventInput>, UserUncheckedUpdateWithoutAnalyticsEventInput>
  }

  export type VideoUpdateOneRequiredWithoutAnalyticsEventNestedInput = {
    create?: XOR<VideoCreateWithoutAnalyticsEventInput, VideoUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: VideoCreateOrConnectWithoutAnalyticsEventInput
    upsert?: VideoUpsertWithoutAnalyticsEventInput
    connect?: VideoWhereUniqueInput
    update?: XOR<XOR<VideoUpdateToOneWithWhereWithoutAnalyticsEventInput, VideoUpdateWithoutAnalyticsEventInput>, VideoUncheckedUpdateWithoutAnalyticsEventInput>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CourseAssignmentCreateWithoutUserInput = {
    assignedAt: Date | string
    course: CourseCreateNestedOneWithoutAssignmentsInput
  }

  export type CourseAssignmentUncheckedCreateWithoutUserInput = {
    id?: number
    courseId: number
    assignedAt: Date | string
  }

  export type CourseAssignmentCreateOrConnectWithoutUserInput = {
    where: CourseAssignmentWhereUniqueInput
    create: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput>
  }

  export type CourseAssignmentCreateManyUserInputEnvelope = {
    data: CourseAssignmentCreateManyUserInput | CourseAssignmentCreateManyUserInput[]
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
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
    video: VideoCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutUserInput = {
    id?: number
    videoId: number
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type WatchLogCreateOrConnectWithoutUserInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutUserInput, WatchLogUncheckedCreateWithoutUserInput>
  }

  export type WatchLogCreateManyUserInputEnvelope = {
    data: WatchLogCreateManyUserInput | WatchLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsEventCreateWithoutUserInput = {
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    video: VideoCreateNestedOneWithoutAnalyticsEventInput
  }

  export type AnalyticsEventUncheckedCreateWithoutUserInput = {
    id?: number
    videoId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AnalyticsEventCreateOrConnectWithoutUserInput = {
    where: AnalyticsEventWhereUniqueInput
    create: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput>
  }

  export type AnalyticsEventCreateManyUserInputEnvelope = {
    data: AnalyticsEventCreateManyUserInput | AnalyticsEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CourseAssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: CourseAssignmentWhereUniqueInput
    update: XOR<CourseAssignmentUpdateWithoutUserInput, CourseAssignmentUncheckedUpdateWithoutUserInput>
    create: XOR<CourseAssignmentCreateWithoutUserInput, CourseAssignmentUncheckedCreateWithoutUserInput>
  }

  export type CourseAssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: CourseAssignmentWhereUniqueInput
    data: XOR<CourseAssignmentUpdateWithoutUserInput, CourseAssignmentUncheckedUpdateWithoutUserInput>
  }

  export type CourseAssignmentUpdateManyWithWhereWithoutUserInput = {
    where: CourseAssignmentScalarWhereInput
    data: XOR<CourseAssignmentUpdateManyMutationInput, CourseAssignmentUncheckedUpdateManyWithoutUserInput>
  }

  export type CourseAssignmentScalarWhereInput = {
    AND?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
    OR?: CourseAssignmentScalarWhereInput[]
    NOT?: CourseAssignmentScalarWhereInput | CourseAssignmentScalarWhereInput[]
    id?: IntFilter<"CourseAssignment"> | number
    courseId?: IntFilter<"CourseAssignment"> | number
    userId?: IntFilter<"CourseAssignment"> | number
    assignedAt?: DateTimeFilter<"CourseAssignment"> | Date | string
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
    updatedAt?: DateTimeFilter<"WatchLog"> | Date | string
    lastUpdateTime?: DateTimeNullableFilter<"WatchLog"> | Date | string | null
  }

  export type AnalyticsEventUpsertWithWhereUniqueWithoutUserInput = {
    where: AnalyticsEventWhereUniqueInput
    update: XOR<AnalyticsEventUpdateWithoutUserInput, AnalyticsEventUncheckedUpdateWithoutUserInput>
    create: XOR<AnalyticsEventCreateWithoutUserInput, AnalyticsEventUncheckedCreateWithoutUserInput>
  }

  export type AnalyticsEventUpdateWithWhereUniqueWithoutUserInput = {
    where: AnalyticsEventWhereUniqueInput
    data: XOR<AnalyticsEventUpdateWithoutUserInput, AnalyticsEventUncheckedUpdateWithoutUserInput>
  }

  export type AnalyticsEventUpdateManyWithWhereWithoutUserInput = {
    where: AnalyticsEventScalarWhereInput
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyWithoutUserInput>
  }

  export type AnalyticsEventScalarWhereInput = {
    AND?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    OR?: AnalyticsEventScalarWhereInput[]
    NOT?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    id?: IntFilter<"AnalyticsEvent"> | number
    userId?: IntFilter<"AnalyticsEvent"> | number
    videoId?: IntFilter<"AnalyticsEvent"> | number
    eventType?: StringFilter<"AnalyticsEvent"> | string
    data?: JsonFilter<"AnalyticsEvent">
    timestamp?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type CourseCreateWithoutCategoryInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCategoryInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCategoryInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput>
  }

  export type CourseCreateManyCategoryInputEnvelope = {
    data: CourseCreateManyCategoryInput | CourseCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutCategoryInput, CourseUncheckedUpdateWithoutCategoryInput>
    create: XOR<CourseCreateWithoutCategoryInput, CourseUncheckedCreateWithoutCategoryInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutCategoryInput, CourseUncheckedUpdateWithoutCategoryInput>
  }

  export type CourseUpdateManyWithWhereWithoutCategoryInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: IntFilter<"Course"> | number
    title?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    createdBy?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    thumbnailUrl?: StringNullableFilter<"Course"> | string | null
    categoryId?: IntNullableFilter<"Course"> | number | null
    skillLevelId?: IntNullableFilter<"Course"> | number | null
    gradeId?: IntNullableFilter<"Course"> | number | null
    languageId?: IntNullableFilter<"Course"> | number | null
  }

  export type CourseCreateWithoutSkillLevelInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutSkillLevelInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    gradeId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSkillLevelInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput>
  }

  export type CourseCreateManySkillLevelInputEnvelope = {
    data: CourseCreateManySkillLevelInput | CourseCreateManySkillLevelInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutSkillLevelInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutSkillLevelInput, CourseUncheckedUpdateWithoutSkillLevelInput>
    create: XOR<CourseCreateWithoutSkillLevelInput, CourseUncheckedCreateWithoutSkillLevelInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutSkillLevelInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutSkillLevelInput, CourseUncheckedUpdateWithoutSkillLevelInput>
  }

  export type CourseUpdateManyWithWhereWithoutSkillLevelInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutSkillLevelInput>
  }

  export type CourseCreateWithoutGradeInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutGradeInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutGradeInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput>
  }

  export type CourseCreateManyGradeInputEnvelope = {
    data: CourseCreateManyGradeInput | CourseCreateManyGradeInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutGradeInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutGradeInput, CourseUncheckedUpdateWithoutGradeInput>
    create: XOR<CourseCreateWithoutGradeInput, CourseUncheckedCreateWithoutGradeInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutGradeInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutGradeInput, CourseUncheckedUpdateWithoutGradeInput>
  }

  export type CourseUpdateManyWithWhereWithoutGradeInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutGradeInput>
  }

  export type CourseCreateWithoutLanguageInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutLanguageInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutLanguageInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput>
  }

  export type CourseCreateManyLanguageInputEnvelope = {
    data: CourseCreateManyLanguageInput | CourseCreateManyLanguageInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutLanguageInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutLanguageInput, CourseUncheckedUpdateWithoutLanguageInput>
    create: XOR<CourseCreateWithoutLanguageInput, CourseUncheckedCreateWithoutLanguageInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutLanguageInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutLanguageInput, CourseUncheckedUpdateWithoutLanguageInput>
  }

  export type CourseUpdateManyWithWhereWithoutLanguageInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutLanguageInput>
  }

  export type CourseCreateWithoutTagsInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutTagsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput>
  }

  export type CourseUpsertWithWhereUniqueWithoutTagsInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutTagsInput, CourseUncheckedUpdateWithoutTagsInput>
    create: XOR<CourseCreateWithoutTagsInput, CourseUncheckedCreateWithoutTagsInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutTagsInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutTagsInput, CourseUncheckedUpdateWithoutTagsInput>
  }

  export type CourseUpdateManyWithWhereWithoutTagsInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutTagsInput>
  }

  export type CategoryCreateWithoutCoursesInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutCoursesInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutCoursesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutCoursesInput, CategoryUncheckedCreateWithoutCoursesInput>
  }

  export type SkillLevelCreateWithoutCoursesInput = {
    level: string
  }

  export type SkillLevelUncheckedCreateWithoutCoursesInput = {
    id?: number
    level: string
  }

  export type SkillLevelCreateOrConnectWithoutCoursesInput = {
    where: SkillLevelWhereUniqueInput
    create: XOR<SkillLevelCreateWithoutCoursesInput, SkillLevelUncheckedCreateWithoutCoursesInput>
  }

  export type GradeCreateWithoutCoursesInput = {
    value: string
  }

  export type GradeUncheckedCreateWithoutCoursesInput = {
    id?: number
    value: string
  }

  export type GradeCreateOrConnectWithoutCoursesInput = {
    where: GradeWhereUniqueInput
    create: XOR<GradeCreateWithoutCoursesInput, GradeUncheckedCreateWithoutCoursesInput>
  }

  export type LanguageCreateWithoutCoursesInput = {
    name: string
  }

  export type LanguageUncheckedCreateWithoutCoursesInput = {
    id?: number
    name: string
  }

  export type LanguageCreateOrConnectWithoutCoursesInput = {
    where: LanguageWhereUniqueInput
    create: XOR<LanguageCreateWithoutCoursesInput, LanguageUncheckedCreateWithoutCoursesInput>
  }

  export type TagCreateWithoutCoursesInput = {
    name: string
  }

  export type TagUncheckedCreateWithoutCoursesInput = {
    id?: number
    name: string
  }

  export type TagCreateOrConnectWithoutCoursesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput>
  }

  export type CourseAssignmentCreateWithoutCourseInput = {
    assignedAt: Date | string
    user: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type CourseAssignmentUncheckedCreateWithoutCourseInput = {
    id?: number
    userId: number
    assignedAt: Date | string
  }

  export type CourseAssignmentCreateOrConnectWithoutCourseInput = {
    where: CourseAssignmentWhereUniqueInput
    create: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput>
  }

  export type CourseAssignmentCreateManyCourseInputEnvelope = {
    data: CourseAssignmentCreateManyCourseInput | CourseAssignmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type CourseVideoCreateWithoutCourseInput = {
    order: number
    video: VideoCreateNestedOneWithoutCourseVideosInput
  }

  export type CourseVideoUncheckedCreateWithoutCourseInput = {
    id?: number
    videoId: number
    order: number
  }

  export type CourseVideoCreateOrConnectWithoutCourseInput = {
    where: CourseVideoWhereUniqueInput
    create: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput>
  }

  export type CourseVideoCreateManyCourseInputEnvelope = {
    data: CourseVideoCreateManyCourseInput | CourseVideoCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutCoursesInput = {
    update: XOR<CategoryUpdateWithoutCoursesInput, CategoryUncheckedUpdateWithoutCoursesInput>
    create: XOR<CategoryCreateWithoutCoursesInput, CategoryUncheckedCreateWithoutCoursesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutCoursesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutCoursesInput, CategoryUncheckedUpdateWithoutCoursesInput>
  }

  export type CategoryUpdateWithoutCoursesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SkillLevelUpsertWithoutCoursesInput = {
    update: XOR<SkillLevelUpdateWithoutCoursesInput, SkillLevelUncheckedUpdateWithoutCoursesInput>
    create: XOR<SkillLevelCreateWithoutCoursesInput, SkillLevelUncheckedCreateWithoutCoursesInput>
    where?: SkillLevelWhereInput
  }

  export type SkillLevelUpdateToOneWithWhereWithoutCoursesInput = {
    where?: SkillLevelWhereInput
    data: XOR<SkillLevelUpdateWithoutCoursesInput, SkillLevelUncheckedUpdateWithoutCoursesInput>
  }

  export type SkillLevelUpdateWithoutCoursesInput = {
    level?: StringFieldUpdateOperationsInput | string
  }

  export type SkillLevelUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
  }

  export type GradeUpsertWithoutCoursesInput = {
    update: XOR<GradeUpdateWithoutCoursesInput, GradeUncheckedUpdateWithoutCoursesInput>
    create: XOR<GradeCreateWithoutCoursesInput, GradeUncheckedCreateWithoutCoursesInput>
    where?: GradeWhereInput
  }

  export type GradeUpdateToOneWithWhereWithoutCoursesInput = {
    where?: GradeWhereInput
    data: XOR<GradeUpdateWithoutCoursesInput, GradeUncheckedUpdateWithoutCoursesInput>
  }

  export type GradeUpdateWithoutCoursesInput = {
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GradeUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUpsertWithoutCoursesInput = {
    update: XOR<LanguageUpdateWithoutCoursesInput, LanguageUncheckedUpdateWithoutCoursesInput>
    create: XOR<LanguageCreateWithoutCoursesInput, LanguageUncheckedCreateWithoutCoursesInput>
    where?: LanguageWhereInput
  }

  export type LanguageUpdateToOneWithWhereWithoutCoursesInput = {
    where?: LanguageWhereInput
    data: XOR<LanguageUpdateWithoutCoursesInput, LanguageUncheckedUpdateWithoutCoursesInput>
  }

  export type LanguageUpdateWithoutCoursesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type LanguageUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUpsertWithWhereUniqueWithoutCoursesInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutCoursesInput, TagUncheckedUpdateWithoutCoursesInput>
    create: XOR<TagCreateWithoutCoursesInput, TagUncheckedCreateWithoutCoursesInput>
  }

  export type TagUpdateWithWhereUniqueWithoutCoursesInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutCoursesInput, TagUncheckedUpdateWithoutCoursesInput>
  }

  export type TagUpdateManyWithWhereWithoutCoursesInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutCoursesInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
  }

  export type CourseAssignmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseAssignmentWhereUniqueInput
    update: XOR<CourseAssignmentUpdateWithoutCourseInput, CourseAssignmentUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseAssignmentCreateWithoutCourseInput, CourseAssignmentUncheckedCreateWithoutCourseInput>
  }

  export type CourseAssignmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseAssignmentWhereUniqueInput
    data: XOR<CourseAssignmentUpdateWithoutCourseInput, CourseAssignmentUncheckedUpdateWithoutCourseInput>
  }

  export type CourseAssignmentUpdateManyWithWhereWithoutCourseInput = {
    where: CourseAssignmentScalarWhereInput
    data: XOR<CourseAssignmentUpdateManyMutationInput, CourseAssignmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseVideoUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseVideoWhereUniqueInput
    update: XOR<CourseVideoUpdateWithoutCourseInput, CourseVideoUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseVideoCreateWithoutCourseInput, CourseVideoUncheckedCreateWithoutCourseInput>
  }

  export type CourseVideoUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseVideoWhereUniqueInput
    data: XOR<CourseVideoUpdateWithoutCourseInput, CourseVideoUncheckedUpdateWithoutCourseInput>
  }

  export type CourseVideoUpdateManyWithWhereWithoutCourseInput = {
    where: CourseVideoScalarWhereInput
    data: XOR<CourseVideoUpdateManyMutationInput, CourseVideoUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseVideoScalarWhereInput = {
    AND?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
    OR?: CourseVideoScalarWhereInput[]
    NOT?: CourseVideoScalarWhereInput | CourseVideoScalarWhereInput[]
    id?: IntFilter<"CourseVideo"> | number
    courseId?: IntFilter<"CourseVideo"> | number
    videoId?: IntFilter<"CourseVideo"> | number
    order?: IntFilter<"CourseVideo"> | number
  }

  export type CourseCreateWithoutAssignmentsInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    courseVideos?: CourseVideoCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutAssignmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserCreateWithoutAssignmentsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutUserInput
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
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
  }

  export type CourseUpsertWithoutAssignmentsInput = {
    update: XOR<CourseUpdateWithoutAssignmentsInput, CourseUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutAssignmentsInput, CourseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CourseUpdateWithoutAssignmentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
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
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutUserNestedInput
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
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CourseCreateWithoutCourseVideosInput = {
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    category?: CategoryCreateNestedOneWithoutCoursesInput
    skillLevel?: SkillLevelCreateNestedOneWithoutCoursesInput
    grade?: GradeCreateNestedOneWithoutCoursesInput
    language?: LanguageCreateNestedOneWithoutCoursesInput
    tags?: TagCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCourseVideosInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
    tags?: TagUncheckedCreateNestedManyWithoutCoursesInput
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCourseVideosInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCourseVideosInput, CourseUncheckedCreateWithoutCourseVideosInput>
  }

  export type VideoCreateWithoutCourseVideosInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    quiz?: QuizCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutCourseVideosInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutCourseVideosInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutCourseVideosInput, VideoUncheckedCreateWithoutCourseVideosInput>
  }

  export type CourseUpsertWithoutCourseVideosInput = {
    update: XOR<CourseUpdateWithoutCourseVideosInput, CourseUncheckedUpdateWithoutCourseVideosInput>
    create: XOR<CourseCreateWithoutCourseVideosInput, CourseUncheckedCreateWithoutCourseVideosInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutCourseVideosInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutCourseVideosInput, CourseUncheckedUpdateWithoutCourseVideosInput>
  }

  export type CourseUpdateWithoutCourseVideosInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCourseVideosInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type VideoUpsertWithoutCourseVideosInput = {
    update: XOR<VideoUpdateWithoutCourseVideosInput, VideoUncheckedUpdateWithoutCourseVideosInput>
    create: XOR<VideoCreateWithoutCourseVideosInput, VideoUncheckedCreateWithoutCourseVideosInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutCourseVideosInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutCourseVideosInput, VideoUncheckedUpdateWithoutCourseVideosInput>
  }

  export type VideoUpdateWithoutCourseVideosInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quiz?: QuizUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutCourseVideosInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type CourseVideoCreateWithoutVideoInput = {
    order: number
    course: CourseCreateNestedOneWithoutCourseVideosInput
  }

  export type CourseVideoUncheckedCreateWithoutVideoInput = {
    id?: number
    courseId: number
    order: number
  }

  export type CourseVideoCreateOrConnectWithoutVideoInput = {
    where: CourseVideoWhereUniqueInput
    create: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput>
  }

  export type CourseVideoCreateManyVideoInputEnvelope = {
    data: CourseVideoCreateManyVideoInput | CourseVideoCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type QuizCreateWithoutVideoInput = {
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptCreateNestedManyWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutVideoInput = {
    id?: number
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedCreateNestedManyWithoutQuizInput
  }

  export type QuizCreateOrConnectWithoutVideoInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutVideoInput, QuizUncheckedCreateWithoutVideoInput>
  }

  export type WatchLogCreateWithoutVideoInput = {
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
    user: UserCreateNestedOneWithoutWatchLogsInput
  }

  export type WatchLogUncheckedCreateWithoutVideoInput = {
    id?: number
    userId: number
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type WatchLogCreateOrConnectWithoutVideoInput = {
    where: WatchLogWhereUniqueInput
    create: XOR<WatchLogCreateWithoutVideoInput, WatchLogUncheckedCreateWithoutVideoInput>
  }

  export type WatchLogCreateManyVideoInputEnvelope = {
    data: WatchLogCreateManyVideoInput | WatchLogCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type AnalyticsEventCreateWithoutVideoInput = {
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAnalyticsEventInput
  }

  export type AnalyticsEventUncheckedCreateWithoutVideoInput = {
    id?: number
    userId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AnalyticsEventCreateOrConnectWithoutVideoInput = {
    where: AnalyticsEventWhereUniqueInput
    create: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput>
  }

  export type AnalyticsEventCreateManyVideoInputEnvelope = {
    data: AnalyticsEventCreateManyVideoInput | AnalyticsEventCreateManyVideoInput[]
    skipDuplicates?: boolean
  }

  export type CourseVideoUpsertWithWhereUniqueWithoutVideoInput = {
    where: CourseVideoWhereUniqueInput
    update: XOR<CourseVideoUpdateWithoutVideoInput, CourseVideoUncheckedUpdateWithoutVideoInput>
    create: XOR<CourseVideoCreateWithoutVideoInput, CourseVideoUncheckedCreateWithoutVideoInput>
  }

  export type CourseVideoUpdateWithWhereUniqueWithoutVideoInput = {
    where: CourseVideoWhereUniqueInput
    data: XOR<CourseVideoUpdateWithoutVideoInput, CourseVideoUncheckedUpdateWithoutVideoInput>
  }

  export type CourseVideoUpdateManyWithWhereWithoutVideoInput = {
    where: CourseVideoScalarWhereInput
    data: XOR<CourseVideoUpdateManyMutationInput, CourseVideoUncheckedUpdateManyWithoutVideoInput>
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
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUpdateManyWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    attempts?: QuizAttemptUncheckedUpdateManyWithoutQuizNestedInput
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

  export type AnalyticsEventUpsertWithWhereUniqueWithoutVideoInput = {
    where: AnalyticsEventWhereUniqueInput
    update: XOR<AnalyticsEventUpdateWithoutVideoInput, AnalyticsEventUncheckedUpdateWithoutVideoInput>
    create: XOR<AnalyticsEventCreateWithoutVideoInput, AnalyticsEventUncheckedCreateWithoutVideoInput>
  }

  export type AnalyticsEventUpdateWithWhereUniqueWithoutVideoInput = {
    where: AnalyticsEventWhereUniqueInput
    data: XOR<AnalyticsEventUpdateWithoutVideoInput, AnalyticsEventUncheckedUpdateWithoutVideoInput>
  }

  export type AnalyticsEventUpdateManyWithWhereWithoutVideoInput = {
    where: AnalyticsEventScalarWhereInput
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyWithoutVideoInput>
  }

  export type UserCreateWithoutWatchLogsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchLogsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutUserInput
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
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutWatchLogsInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutVideoInput
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
    assignments?: CourseAssignmentUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutUserNestedInput
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
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutWatchLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type VideoCreateWithoutQuizInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutQuizInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutVideoInput
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
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutQuizInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutVideoNestedInput
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

  export type QuizCreateWithoutAttemptsInput = {
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
    video: VideoCreateNestedOneWithoutQuizInput
  }

  export type QuizUncheckedCreateWithoutAttemptsInput = {
    id?: number
    videoId: number
    generatedBy?: string | null
    createdAt: Date | string
    questions: JsonNullValueInput | InputJsonValue
  }

  export type QuizCreateOrConnectWithoutAttemptsInput = {
    where: QuizWhereUniqueInput
    create: XOR<QuizCreateWithoutAttemptsInput, QuizUncheckedCreateWithoutAttemptsInput>
  }

  export type UserCreateWithoutQuizAttemptsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQuizAttemptsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQuizAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQuizAttemptsInput, UserUncheckedCreateWithoutQuizAttemptsInput>
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
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
    video?: VideoUpdateOneRequiredWithoutQuizNestedInput
  }

  export type QuizUncheckedUpdateWithoutAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    generatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: JsonNullValueInput | InputJsonValue
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
    assignments?: CourseAssignmentUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQuizAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAnalyticsEventInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnalyticsEventInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt?: Date | string
    assignments?: CourseAssignmentUncheckedCreateNestedManyWithoutUserInput
    quizAttempts?: QuizAttemptUncheckedCreateNestedManyWithoutUserInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnalyticsEventInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnalyticsEventInput, UserUncheckedCreateWithoutAnalyticsEventInput>
  }

  export type VideoCreateWithoutAnalyticsEventInput = {
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoCreateNestedManyWithoutVideoInput
    quiz?: QuizCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogCreateNestedManyWithoutVideoInput
  }

  export type VideoUncheckedCreateWithoutAnalyticsEventInput = {
    id?: number
    title: string
    platform: string
    videoUrl: string
    videoId: string
    duration: number
    createdAt: Date | string
    thumbnailUrl?: string | null
    description?: string | null
    courseVideos?: CourseVideoUncheckedCreateNestedManyWithoutVideoInput
    quiz?: QuizUncheckedCreateNestedOneWithoutVideoInput
    watchLogs?: WatchLogUncheckedCreateNestedManyWithoutVideoInput
  }

  export type VideoCreateOrConnectWithoutAnalyticsEventInput = {
    where: VideoWhereUniqueInput
    create: XOR<VideoCreateWithoutAnalyticsEventInput, VideoUncheckedCreateWithoutAnalyticsEventInput>
  }

  export type UserUpsertWithoutAnalyticsEventInput = {
    update: XOR<UserUpdateWithoutAnalyticsEventInput, UserUncheckedUpdateWithoutAnalyticsEventInput>
    create: XOR<UserCreateWithoutAnalyticsEventInput, UserUncheckedCreateWithoutAnalyticsEventInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnalyticsEventInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnalyticsEventInput, UserUncheckedUpdateWithoutAnalyticsEventInput>
  }

  export type UserUpdateWithoutAnalyticsEventInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnalyticsEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutUserNestedInput
    quizAttempts?: QuizAttemptUncheckedUpdateManyWithoutUserNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VideoUpsertWithoutAnalyticsEventInput = {
    update: XOR<VideoUpdateWithoutAnalyticsEventInput, VideoUncheckedUpdateWithoutAnalyticsEventInput>
    create: XOR<VideoCreateWithoutAnalyticsEventInput, VideoUncheckedCreateWithoutAnalyticsEventInput>
    where?: VideoWhereInput
  }

  export type VideoUpdateToOneWithWhereWithoutAnalyticsEventInput = {
    where?: VideoWhereInput
    data: XOR<VideoUpdateWithoutAnalyticsEventInput, VideoUncheckedUpdateWithoutAnalyticsEventInput>
  }

  export type VideoUpdateWithoutAnalyticsEventInput = {
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUpdateManyWithoutVideoNestedInput
    quiz?: QuizUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUpdateManyWithoutVideoNestedInput
  }

  export type VideoUncheckedUpdateWithoutAnalyticsEventInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoUrl?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutVideoNestedInput
    quiz?: QuizUncheckedUpdateOneWithoutVideoNestedInput
    watchLogs?: WatchLogUncheckedUpdateManyWithoutVideoNestedInput
  }

  export type CourseAssignmentCreateManyUserInput = {
    id?: number
    courseId: number
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
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type AnalyticsEventCreateManyUserInput = {
    id?: number
    videoId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type CourseAssignmentUpdateWithoutUserInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type CourseAssignmentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseAssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticsEventUpdateWithoutUserInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    video?: VideoUpdateOneRequiredWithoutAnalyticsEventNestedInput
  }

  export type AnalyticsEventUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateManyCategoryInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    skillLevelId?: number | null
    gradeId?: number | null
    languageId?: number | null
  }

  export type CourseUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseCreateManySkillLevelInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    gradeId?: number | null
    languageId?: number | null
  }

  export type CourseUpdateWithoutSkillLevelInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutSkillLevelInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutSkillLevelInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseCreateManyGradeInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    languageId?: number | null
  }

  export type CourseUpdateWithoutGradeInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutGradeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutGradeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseCreateManyLanguageInput = {
    id?: number
    title: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    thumbnailUrl?: string | null
    categoryId?: number | null
    skillLevelId?: number | null
    gradeId?: number | null
  }

  export type CourseUpdateWithoutLanguageInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    tags?: TagUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutLanguageInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: TagUncheckedUpdateManyWithoutCoursesNestedInput
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutLanguageInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneWithoutCoursesNestedInput
    skillLevel?: SkillLevelUpdateOneWithoutCoursesNestedInput
    grade?: GradeUpdateOneWithoutCoursesNestedInput
    language?: LanguageUpdateOneWithoutCoursesNestedInput
    assignments?: CourseAssignmentUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
    assignments?: CourseAssignmentUncheckedUpdateManyWithoutCourseNestedInput
    courseVideos?: CourseVideoUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    skillLevelId?: NullableIntFieldUpdateOperationsInput | number | null
    gradeId?: NullableIntFieldUpdateOperationsInput | number | null
    languageId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CourseAssignmentCreateManyCourseInput = {
    id?: number
    userId: number
    assignedAt: Date | string
  }

  export type CourseVideoCreateManyCourseInput = {
    id?: number
    videoId: number
    order: number
  }

  export type TagUpdateWithoutCoursesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutCoursesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CourseAssignmentUpdateWithoutCourseInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type CourseAssignmentUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseAssignmentUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseVideoUpdateWithoutCourseInput = {
    order?: IntFieldUpdateOperationsInput | number
    video?: VideoUpdateOneRequiredWithoutCourseVideosNestedInput
  }

  export type CourseVideoUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CourseVideoUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    videoId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CourseVideoCreateManyVideoInput = {
    id?: number
    courseId: number
    order: number
  }

  export type WatchLogCreateManyVideoInput = {
    id?: number
    userId: number
    totalWatchTime: number
    isCompleted?: boolean
    watchedPercentage?: number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastUpdateTime?: Date | string | null
  }

  export type AnalyticsEventCreateManyVideoInput = {
    id?: number
    userId: number
    eventType: string
    data: JsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type CourseVideoUpdateWithoutVideoInput = {
    order?: IntFieldUpdateOperationsInput | number
    course?: CourseUpdateOneRequiredWithoutCourseVideosNestedInput
  }

  export type CourseVideoUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type CourseVideoUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
  }

  export type WatchLogUpdateWithoutVideoInput = {
    totalWatchTime?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    watchedPercentage?: FloatFieldUpdateOperationsInput | number
    skipEvents?: JsonNullValueInput | InputJsonValue
    pauseEvents?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUpdateTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnalyticsEventUpdateWithoutVideoInput = {
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAnalyticsEventNestedInput
  }

  export type AnalyticsEventUncheckedUpdateWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutVideoInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    eventType?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
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