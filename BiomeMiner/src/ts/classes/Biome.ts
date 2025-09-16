import Ore from './Ore';
interface BiomeTypes {
    name: string;
    css: string;
    ores: Ore[];
};

export default class{
    #name: string;
    css: string;
    ores: Ore[];
    constructor({name,css,ores}: BiomeTypes) {
        this.#name = name;
        this.css = css;
        this.ores = ores;
    }
    get name():string{
        return this.#name;
    }
}