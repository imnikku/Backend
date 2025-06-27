import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigs } from 'src/config/app-config';

@Module({
    imports: [
        MongooseModule.forRoot(AppConfigs.mongodbUri, {
            // ✅ Connection Retry Logic
            retryAttempts: AppConfigs.mongo_retry_attempts,
            retryDelay: AppConfigs.mongo_retry_delay,

            // ✅ Pooling Options
            maxPoolSize: AppConfigs.mongo_max_pool_size, // Max concurrent connections
            minPoolSize: AppConfigs.mongo_min_pool_size, // Min number of idle connections in pool
 
            // ✅ Connection settings
            serverSelectionTimeoutMS: AppConfigs.mongo_server_selection_timeoutms, // Fail quickly if server is unreachable
            socketTimeoutMS: AppConfigs.mongo_socket_timeoutms, // Close sockets after inactivity

        }),
    ],
})
export class MongoDbDatabaseModule { }
