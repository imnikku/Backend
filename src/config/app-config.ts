import * as dotenv from 'dotenv';

dotenv.config();

/**
 * ✅ Centralized Application configuration helper class
 */
export const AppConfigs = {
    // ✅ app info 
    app_version: process.env.APP_VERSION || 'V.1.0',
    app_name: process.env.APP_NAME || 'BACKEND',
    port: process.env.PORT || 3000,


    // ✅ Mongodb Connection details 
    mongodbUri: process.env.MONGO_URI || 'N/A',
    mongo_max_pool_size: Number(process.env.MONGO_MAX_POOL_SIZE || 10),
    mongo_min_pool_size: Number(process.env.MONGO_MIN_POOL_SIZE || 5),
    mongo_retry_attempts: Number(process.env.MONGO_RETRY_ATTEMPTS || 5),
    mongo_retry_delay: Number(process.env.MONGO_RETRY_DELAY || 3000),
    mongo_server_selection_timeoutms: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUTMS || 5000),
    mongo_socket_timeoutms: Number(process.env.MONGO_SOCKET_TIMEOUTMS || 4500),


    // ✅ Redis Connection details 
    redis_host:process.env.REDIS_HOST||'localhost',
    redis_port:Number(process.env.REDIS_PORT||6379),
    redis_password:process.env.REDIS_PASSWORD||'P@ssword',
    redis_user:process.env.REDIS_USER||'user',
    redis_db:Number(process.env.REDIS_DB||0),
    redis_cache_ttl:Number(process.env.CACHE_TTL || 43200),
    redis_pub:process.env.REDIS_PUB ||'REDIS_PUBLISHER',
    redis_sub:process.env.REDIS_SUB ||'REDIS_SUBSCRIBER',
    redis_connection_timeout:Number(process.env.REDIS_CONNECTION_TIMEOUT||10000),
    redis_keep_alive:Number(process.env.REDIS_KEEP_ALIVE||2100),
    redis_max_retry:Number(process.env.REDIS_MAX_RETRY||18),
    redis_client:process.env.REDIS_CLIENT||'REDIS_CLIENT',
    redis_cache_environment:process.env.REDIS_CACHE_ENVIRONMENT||'DEV',
    redis_url:process.env.REDIS_URL||'N/A'




};
