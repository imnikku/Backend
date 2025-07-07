import { v4 as uuidv4 } from 'uuid';

export function keyModifier(key: string) {
    const keys = key?.split('_');
   return keys?.map((item: string) => (item.charAt(0).toUpperCase() + item.slice(1))).join(' ')||''

}

export function UniqueKeyGeneration(){
    return uuidv4();

}