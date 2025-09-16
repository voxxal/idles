class Chip{
    constructor(t){
        this.t = t
    }
    removeT(index){
        this.t.splice(index,1);
    }
}