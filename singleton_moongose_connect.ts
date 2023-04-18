import mongoose from 'mongoose';

class MongoConnection {
  private static instance: MongoConnection;
  private uri: string;
  private options: mongoose.ConnectOptions;
  private isConnected: boolean;

  private constructor(uri: string, options: mongoose.ConnectOptions) {
    this.uri = uri;
    this.options = options;
    this.isConnected = false;
    this.connect()
  }

  public static getInstance(uri: string, options: mongoose.ConnectOptions): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection(uri, options);
    }
    return MongoConnection.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      await mongoose.connect(this.uri, this.options);
      this.isConnected = true;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
    }
  }
}

const uri = 'mongodb://localhost/mydatabase';
const options: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = MongoConnection.getInstance(uri, options);

export default connection;
