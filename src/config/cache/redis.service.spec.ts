import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { AppConfigs } from '../app-config';

describe('RedisService', () => {
  let service: RedisService;
  let clientMock: jest.Mocked<Redis>;
  let publisherMock: jest.Mocked<Redis>;
  let subscriberMock: jest.Mocked<Redis>;

  beforeEach(() => {
    clientMock = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      exists: jest.fn(),
    } as any;

    publisherMock = {
      publish: jest.fn(),
    } as any;

    subscriberMock = {
      subscribe: jest.fn(),
      on: jest.fn(),
    } as any;

    service = new RedisService(clientMock, publisherMock, subscriberMock);
  });

  describe('generateKey', () => {
    it('should generate correct namespaced Redis key', () => {
      const type = 'user';
      const id = '123';
      const expectedKey = `{${AppConfigs.app_name}:${AppConfigs.redis_cache_environment}}:${type}:${id}`;

      expect(service.generateKey(type, id)).toBe(expectedKey);
    });
  });

  describe('cache methods', () => {
    it('get should return parsed JSON value when key exists', async () => {
      const cachedValue = { name: 'John' };
      clientMock.get.mockResolvedValue(JSON.stringify(cachedValue));

      const result = await service.get('user', '1');
      expect(clientMock.get).toHaveBeenCalledWith(service.generateKey('user', '1'));
      expect(result).toEqual(cachedValue);
    });

    it('get should return null when key does not exist', async () => {
      clientMock.get.mockResolvedValue(null);

      const result = await service.get('user', '2');
      expect(clientMock.get).toHaveBeenCalledWith(service.generateKey('user', '2'));
      expect(result).toBeNull();
    });

    it('set should store JSON string with expiration', async () => {
      const value = { name: 'Jane' };
      const ttl = 120;

      await service.set('user', '3', value, ttl);

      expect(clientMock.set).toHaveBeenCalledWith(
        service.generateKey('user', '3'),
        JSON.stringify(value),
        'EX',
        ttl,
      );
    });

    it('del should delete the key', async () => {
      await service.del('user', '4');

      expect(clientMock.del).toHaveBeenCalledWith(service.generateKey('user', '4'));
    });

    it('exists should return true if key exists', async () => {
      clientMock.exists.mockResolvedValue(1);

      const exists = await service.exists('user', '5');

      expect(clientMock.exists).toHaveBeenCalledWith(service.generateKey('user', '5'));
      expect(exists).toBe(true);
    });

    it('exists should return false if key does not exist', async () => {
      clientMock.exists.mockResolvedValue(0);

      const exists = await service.exists('user', '6');

      expect(clientMock.exists).toHaveBeenCalledWith(service.generateKey('user', '6'));
      expect(exists).toBe(false);
    });
  });

  describe('pub/sub methods', () => {
    it('publish should send stringified message if object passed', async () => {
      const channel = 'channel1';
      const message = { foo: 'bar' };

      await service.publish(channel, message);

      expect(publisherMock.publish).toHaveBeenCalledWith(channel, JSON.stringify(message));
    });

    it('publish should send message directly if string passed', async () => {
      const channel = 'channel2';
      const message = 'simple string';

      await service.publish(channel, message);

      expect(publisherMock.publish).toHaveBeenCalledWith(channel, message);
    });

    it('subscribe should subscribe to channel and handle messages', () => {
      const channel = 'test-channel';
      const handler = jest.fn();

      service.subscribe(channel, handler);

      expect(subscriberMock.subscribe).toHaveBeenCalledWith(channel);
      expect(subscriberMock.on).toHaveBeenCalledWith('message', expect.any(Function));

      // Extract the handler passed to subscriberMock.on
      const messageHandler = subscriberMock.on.mock.calls.find(call => call[0] === 'message')?.[1];

      expect(messageHandler).toBeDefined();

      // Call handler with matching channel and message
      messageHandler!(channel, 'hello');

      expect(handler).toHaveBeenCalledWith('hello');

      // Call handler with non-matching channel (should not call handler)
      handler.mockClear();
      messageHandler!('other-channel', 'world');
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('onModuleInit', () => {
    it('should subscribe to "system:logs" channel', () => {
      service.onModuleInit();

      expect(subscriberMock.subscribe).toHaveBeenCalledWith('system:logs');

      // The 'message' event handler should be set up
      expect(subscriberMock.on).toHaveBeenCalledWith('message', expect.any(Function));
    });
  });
});
