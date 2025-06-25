import express, { Application } from 'express';
import { RequestListener } from 'http';
import { readFileSync } from 'fs';
import { Server as HTTPServer, createServer, ServerOptions } from 'https';

import { ENV,PORT, SSL } from './environment.config'


class ServerConfiguration {
  private static _instance: ServerConfiguration;

  private options = {
    credentials: {
      key: SSL.IS_ACTIVE ? readFileSync(SSL.KEY, 'utf8') : null,
      cert: SSL.IS_ACTIVE ? readFileSync(SSL.CERT, 'utf8') : null,
    },
    port: PORT,
  };

  private server!: Application | HTTPServer;
  private constructor() {}

  static getInstance(): ServerConfiguration {
    if (!ServerConfiguration._instance) {
      ServerConfiguration._instance = new ServerConfiguration();
    }
    return ServerConfiguration._instance;
  }

  init(app: Application): ServerConfiguration {
    this.server = !this.server
      ? SSL.IS_ACTIVE
        ? createServer(this.options.credentials as ServerOptions, app as RequestListener)
        : app
      : this.server;
    return this;
  }

  listen(): any {
    const port = SSL.IS_ACTIVE ? 443 : PORT;
    const protocol = SSL.IS_ACTIVE ? 'HTTPS' : 'HTTP';
    return this.server.listen(port, () => {
      console.log('info', `${protocol} server is now running on port ${port} (${ENV})`);
    });
  }
}

const Server = ServerConfiguration.getInstance();
export { Server };
