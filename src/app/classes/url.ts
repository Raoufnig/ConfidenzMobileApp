export class Url {
    static readonly API_VERSION = 'v1';
    static readonly BASE_URL = 'http://localhost:8000';
    static readonly ALL_URL= this.BASE_URL + '/api/'+ this.API_VERSION;
    static readonly COMPAGNY_URL = this.BASE_URL + '/api/'+ this.API_VERSION + '/compagnies';
    static readonly EMPLOYEE_URL = this.BASE_URL + '/api/'+ this.API_VERSION + '/employee';
}