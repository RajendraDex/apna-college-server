import dotenv from 'dotenv';
import { join } from 'path';
import joi from 'joi';

interface ISSL {
  IS_ACTIVE: boolean;
  KEY: string;
  CERT: string;
}

export class Environment {
  private static instance: Environment;
  private rawEnv!: NodeJS.ProcessEnv;
  private variables!: Record<string, any>;
  public cluster!: Record<string, unknown>;

  private constructor() {}

  static get(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  loads(): this {
    dotenv.config({
      path: join(__dirname, '../../../.env'),
    });
    return this;
  }

  extracts(): this {
    this.rawEnv = process.env;
    return this;
  }

  validates(): this {
    const schema = joi
      .object({
        MONGO_URL: joi.string().uri().required(),
        MAX_POOL_SIZE: joi.number().default(20),
        PORT: joi.number().default(4000),
        API_VERSION: joi.string().default('v1'),
        IS_SSL_ACTIVE: joi.boolean().default(false),
        SSL_KEY: joi.string().default(null),
        SSL_CERT: joi.string().default(null),
      })
      .unknown();

    const { value, error } = schema.validate(this.rawEnv);

    if (error) {
      throw new Error(`❌ Environment variable validation error: ${error.message}`);
    }

    this.variables = value;
    return this;
  }

  aggregates(): this {
    this.cluster = {
        ACCESS_TOKEN: {
          SECRET: this.variables.ACCESS_TOKEN_SECRET,
          DURATION: this.variables.ACCESS_TOKEN_DURATION
        },
        API_VERSION: this.variables.API_VERSION,
        AUTHORIZED: this.variables.AUTHORIZED,
        CDN: this.variables.CDN,
        CONTENT_TYPE: this.variables.CONTENT_TYPE,
        DOMAIN: this.variables.DOMAIN,
        ENV: this.variables.NODE_ENV,
        PORT: this.variables.PORT,
        REFRESH_TOKEN: {
          DURATION: this.variables.REFRESH_TOKEN_DURATION,
          SECRET: this.variables.REFRESH_TOKEN_SECRET,
          UNIT: this.variables.REFRESH_TOKEN_UNIT
        },
        SSL: {
          IS_ACTIVE: this.variables.SSL_CERT !== null && this.variables.SSL_KEY !== null,
          CERT: this.variables.SSL_CERT,
          KEY: this.variables.SSL_KEY
        },
        MONGODB_URL: this.variables.MONGO_URL,
        MONGODB_OPTIONS: {
          maxPoolSize: this.variables.MAX_POOL_SIZE,
        }
    };

    return this;
  }

  directories(): this {
    // Optional: do some file/directory-level validation here
    return this;
  }
}

export const environment = Environment.get()
  .loads()
  .extracts()
  .validates()
  .aggregates()
  .directories();

const ACCESS_TOKEN  = environment.cluster.ACCESS_TOKEN;
const API_VERSION   = environment.cluster.API_VERSION as string;
const AUTHORIZED    = environment.cluster.AUTHORIZED as string;
const CDN           = environment.cluster.CDN as string;
const CONTENT_TYPE  = environment.cluster.CONTENT_TYPE as string;
const DOMAIN        = environment.cluster.DOMAINE as string;
const ENV           = environment.cluster.ENV as string;
const PORT          = environment.cluster.PORT as number;
const REFRESH_TOKEN = environment.cluster.REFRESH_TOKEN;
const SSL           = environment.cluster.SSL as ISSL;
const MONGODB_URL       = environment.cluster.MONGODB_URL as string;
const MONGODB_OPTIONS = environment.cluster.MONGODB_OPTIONS;

export {
  ACCESS_TOKEN,
  API_VERSION ,
  AUTHORIZED,
  CDN,
  CONTENT_TYPE,
  DOMAIN,
  ENV,
  PORT,
  REFRESH_TOKEN,
  SSL,
  MONGODB_URL,
  MONGODB_OPTIONS
}
