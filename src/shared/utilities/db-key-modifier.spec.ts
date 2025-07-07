import { keyModifier, UniqueKeyGeneration } from "./db-key-modifier";

describe('keyModifier', () => {
  it('should convert snake_case to Title Case', () => {
    expect(keyModifier('first_name')).toBe('First Name');
    expect(keyModifier('user_id')).toBe('User Id');
  });

  it('should return empty string for empty input', () => {
    expect(keyModifier('')).toBe('');
  });

  it('should handle single word correctly', () => {
    expect(keyModifier('username')).toBe('Username');
  });

  it('should handle null or undefined input', () => {
    expect(keyModifier(undefined as any)).toBe('');
    expect(keyModifier(null as any)).toBe('');
  });
  
});

describe('UniqueKeyGeneration', () => {
  it('should generate a valid UUID v4', () => {
    const uuid = UniqueKeyGeneration();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuid).toMatch(uuidRegex);
  });

  it('should generate unique UUIDs on each call', () => {
    const uuid1 = UniqueKeyGeneration();
    const uuid2 = UniqueKeyGeneration();
    expect(uuid1).not.toBe(uuid2);
  });
   it('should return a string', () => {
    const uuid = UniqueKeyGeneration();
    expect(typeof uuid).toBe('string');
  });

  it('should return a 36-character string', () => {
    const uuid = UniqueKeyGeneration();
    expect(uuid.length).toBe(36);
  });
});
