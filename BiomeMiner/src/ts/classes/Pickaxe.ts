export default class {
    name:number;
    properties:{};
    constructor({name,properties = {}}:{name:number,properties:object}){
        this.name = name;
        this.properties = properties;
    }
}