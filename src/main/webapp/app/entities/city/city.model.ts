import { Country } from '../country';
export class City {
    constructor(
        public id?: number,
        public cityName?: string,
        public longtitude?: number,
        public latitude?: number,
        public country?: Country,
    ) {
    }
}
