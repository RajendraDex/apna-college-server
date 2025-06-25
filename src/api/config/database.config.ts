// src/database/DatabaseConfiguration.ts

import mongoose, { Connection, ConnectOptions } from 'mongoose';
import { MONGODB_URL, MONGODB_OPTIONS, ENV } from './environment.config';

class DatabaseConfiguration {
	private static instance: DatabaseConfiguration;
	private connection: Connection | null = null;
	private readonly uri: string = MONGODB_URL;
	private readonly options: ConnectOptions = MONGODB_OPTIONS as ConnectOptions;

	private constructor() { }


	// * Get singleton instance
	public static getInstance(): DatabaseConfiguration {
		if (!DatabaseConfiguration.instance) {
			DatabaseConfiguration.instance = new DatabaseConfiguration();
		}
		return DatabaseConfiguration.instance;
	}

	public async connect(): Promise<Connection> {
		if (!this.connection) {
			try {
				const db = await mongoose.connect(this.uri, this.options);
				this.connection = db.connection;
				this.setupEvents();
				console.info('MongoDB connection established.');
			} catch (err) {
				console.error('Error establishing MongoDB connection:', err);
				throw err;
			}
		}
		return this.connection;
	}


	//* Setup Mongoose event listeners
	private setupEvents(): void {
		mongoose.connection.on('connected', () => {
			const displayUri = ENV === 'development' ? this.uri : 'Mongo Atlas';
			console.info(`Mongoose connected to ${displayUri}`);
		});

		mongoose.connection.on('error', (err) => {
			console.error('Mongoose connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			console.info('Mongoose disconnected');
		});
	}

	/**
	 * Close MongoDB connection
	 */
	public async close(): Promise<void> {
		try {
			if (this.connection) {
				await mongoose.connection.close();
				console.info('MongoDB connection closed.');
				this.connection = null;
			} else {
				console.info('MongoDB connection not found');
			}
		} catch (err) {
			console.error('Error closing MongoDB connection:', err);
		}
	}
}

const Mongoose = DatabaseConfiguration.getInstance();

export { Mongoose };
