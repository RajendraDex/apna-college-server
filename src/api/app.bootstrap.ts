import { Server } from './config/server.config';
import { Mongoose} from './config/database.config';


Mongoose.connect().then(() => {
	console.info('Connected to MongoDB- Boostrap');
})

import { Application } from './config/app.config';

const application = Application;
const server = Server.init(application).listen() as unknown;

export { application, server };
