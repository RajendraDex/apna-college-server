import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

import { 
  API_VERSION ,
  CONTENT_TYPE,
  DOMAIN,
  ENV,
 } from './environment.config'

class ExpressConfiguration {
  private static _instance: ExpressConfiguration;
  public application!: Application;

  private options = {
    cors: {},
    helmet: {},
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    },
  };

  private constructor() {}

  static getInstance(): ExpressConfiguration {
    if (!ExpressConfiguration._instance) {
      ExpressConfiguration._instance = new ExpressConfiguration();
    }
    return ExpressConfiguration._instance;
  }

  init(): this {
    if (!this.application) {
      this.application = express();
    }
    return this;
  }

  plug(): this {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
    this.application.use(hpp({ checkBody: false }));
    this.application.use(compression());
    this.application.use(helmet());
    this.application.use(cors());

    const limiter = rateLimit(this.options.rateLimit);
    this.application.use(limiter);
 

    return this;
  }
}

const Application = ExpressConfiguration.getInstance().init().plug().application;

export { Application };
