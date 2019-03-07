export default class Utils{
    public static getRandom(seed:number){
        return new Random(seed)
    }
}
export class Random{
    constructor(seed:number =5){
        this.rseed = seed
    }
    private rseed:number;

    //线性同余法生成的数字区间包含最大值和最小值
    public random(min:number = 0, max:number =1,integer:boolean = false) {
        this.rseed = (this.rseed * 9301 + 49297) % 233280;
        const rnd = this.rseed / 233280.0;
        let reslut = min + rnd * (max - min) ;
        if (integer) reslut = Math.ceil(reslut)
        return reslut
    };
}