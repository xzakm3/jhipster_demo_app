
const enum Region {
    'AMERICA',
    'ASIA',
    'EUROPE'

};
export class Country {
    constructor(
        public id?: number,
        public countryName?: string,
        public countryCode?: number,
        public region?: Region,
    ) {
    }
}
