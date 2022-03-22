export type Coins = {
    5: number;
    10: number;
    20: number;
    50: number;
    100: number;
};

export class Deposit {
    private readonly _coins: Coins = {
        5: 0,
        10: 0,
        20: 0,
        50: 0,
        100: 0,
    };

    constructor(coins?: Coins) {
        this._coins = Object.assign({}, this._coins, coins);
    }

    get coins() {
        return Object.assign({}, this._coins);
    }

    get denums() {
        return Object.keys(this.coins).map(Number);
    }

    get balance() {
        return Object.entries(this.coins).reduce((acc, [value, amount]) => acc + Number(value) * amount, 0);
    }

    public add(deposit: Deposit | Coins) {
        const addedCoins = deposit instanceof Deposit ? deposit.coins : deposit;
        const newCoins = Object.entries(this.coins).reduce(
            (coins, [value, amount]) => ({
                ...coins,
                // eslint-disable-next-line security/detect-object-injection
                [value]: amount + addedCoins[value] ?? 0,
            }),
            {} as Coins,
        );
        return new Deposit(newCoins);
    }

    public subtract(amount: number): Deposit {
        const result = this.findOptimalChange(amount, this.denums);
        return new Deposit(result);
    }

    public toArray() {
        return Object.entries(this.coins);
    }

    /* eslint-disable security/detect-object-injection, max-lines-per-function */
    public findOptimalChange(amount: number, coins: number[]): Coins {
        const sortedCoins = coins.sort();

        const arrayOfOPT = Array(amount + 1)
            .fill(0)
            .map(() => [] as number[][]);

        const temp_solutions = arrayOfOPT;
        for (let coinIndex = 0; coinIndex < sortedCoins.length; coinIndex++) {
            for (let i = 0; i < amount + 1; i++) {
                if (sortedCoins[coinIndex] > i) continue;

                temp_solutions[i] = temp_solutions[i].concat(
                    temp_solutions[i - sortedCoins[coinIndex]].length
                        ? temp_solutions[i - sortedCoins[coinIndex]].map((smallOpt) =>
                              [sortedCoins[coinIndex]].concat(smallOpt),
                          )
                        : [[sortedCoins[coinIndex]]],
                );
            }
        }

        const solution = temp_solutions
            .pop()
            .sort((a, b) => a.length - b.length)
            .shift()
            .reduce((coins, value) => ({ ...coins, [value]: (coins[value] ?? 0) + 1 }), {} as Coins);

        return solution;
    }
    /* esling-enable */
}
