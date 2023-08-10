import { ConnectionManager, Connection } from 'typeorm';
import { User } from './entity/User';  // Adjust this path based on your folder structure

const connectionManager = new ConnectionManager();

export async function getDatabaseConnection(): Promise<Connection> {
  if (!connectionManager.has('default')) {
    // If no connection exists, create a new one
    connectionManager.create({
      // ... your TypeORM config here ...
      entities: [User],
      name: 'default',
    });
  }
  
  const connection = connectionManager.get('default');

  if (!connection.isConnected) {
    await connection.connect();
  }

  return connection;
}
