
const enum Region {
    'AMERICA',
    'ASIA',
    'EUROPE'

};
import { City } from '../city';
export class Country {
    constructor(
        public id?: number,
        public countryName?: string,
        public countryCode?: number,
        public region?: Region,
        public city?: City,
    ) {
    }
}
