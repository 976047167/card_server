import MersenneTwister from "./mersenneTwister";
export default class Utils {
	public static getRandom (seed: number) {
		return new MersenneTwister(seed);
	}
}
