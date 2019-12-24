export class Recipe{
    coffee: number;
    steamedMilk: number;
    foamedMilk: number;
    water: number;
    chocolate: number;
    name: string;
    
    getTotal(){
        return this.coffee + this.steamedMilk + this.foamedMilk + this.water + this.chocolate;
    }

    setDefault(){
        if (this.coffee === undefined){
            this.coffee = 0;
        }
        if (this.steamedMilk === undefined){
            this.steamedMilk = 0;
        }
        if (this.foamedMilk === undefined){
            this.foamedMilk = 0;
        }
        if (this.water === undefined){
            this.water = 0;
        }
        if (this.chocolate === undefined){
            this.chocolate = 0;
        }
    }
}

    