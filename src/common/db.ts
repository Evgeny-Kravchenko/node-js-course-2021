import { getConnection, createConnection, ConnectionOptions } from 'typeorm';
import config from './ormconfig';

const connectToDB = async (): Promise<void> => {
  let connection;
  try {
    connection = getConnection();
  } catch (err) {
    console.error('Something went wrong with connection to DB', err);
  }
  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      createConnection(config as ConnectionOptions);
    }
    console.log('Successfully connected to DB!');
  } catch (err) {
    console.error('Something went wrong with connection to DB', err);
  }
};

export const TryDBConnect = async (cb: () => void): Promise<void> => {
  try {
    await connectToDB();
    cb();
  } catch (err) {
    console.log('Something went wrong with connection to DB', err);
  }
};
