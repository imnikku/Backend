import { v4 as uuidv4 } from 'uuid';

export function keyModifier(key: string) {
    const keys = key?.split('_');
    let finalKey = '';
    keys.map((item: string) => {finalKey += item.charAt(0).toUpperCase() + item.slice(1) + ' '})
    return finalKey;

}

export function UniqueKeyGeneration(){
    return uuidv4();

}