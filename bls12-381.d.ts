/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
import { CurveFn } from './abstract/bls.js';
import * as mod from './abstract/modular.js';
declare const Fp: Readonly<mod.Field<bigint> & Required<Pick<mod.Field<bigint>, "isOdd">>>;
declare type Fp = bigint;
declare type BigintTuple = [bigint, bigint];
declare type Fp2 = {
    c0: bigint;
    c1: bigint;
};
declare type Fp2Utils = {
    fromBigTuple: (tuple: BigintTuple | bigint[]) => Fp2;
    reim: (num: Fp2) => {
        re: bigint;
        im: bigint;
    };
    mulByNonresidue: (num: Fp2) => Fp2;
    multiplyByB: (num: Fp2) => Fp2;
    frobeniusMap(num: Fp2, power: number): Fp2;
};
declare const Fp2: mod.Field<Fp2> & Fp2Utils;
declare type BigintSix = [bigint, bigint, bigint, bigint, bigint, bigint];
declare type Fp6 = {
    c0: Fp2;
    c1: Fp2;
    c2: Fp2;
};
declare type Fp6Utils = {
    fromBigSix: (tuple: BigintSix) => Fp6;
    mulByNonresidue: (num: Fp6) => Fp6;
    frobeniusMap(num: Fp6, power: number): Fp6;
    multiplyBy1(num: Fp6, b1: Fp2): Fp6;
    multiplyBy01(num: Fp6, b0: Fp2, b1: Fp2): Fp6;
    multiplyByFp2(lhs: Fp6, rhs: Fp2): Fp6;
};
declare const Fp6: mod.Field<Fp6> & Fp6Utils;
declare type Fp12 = {
    c0: Fp6;
    c1: Fp6;
};
declare type BigintTwelve = [
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint,
    bigint
];
declare type Fp12Utils = {
    fromBigTwelve: (t: BigintTwelve) => Fp12;
    frobeniusMap(num: Fp12, power: number): Fp12;
    multiplyBy014(num: Fp12, o0: Fp2, o1: Fp2, o4: Fp2): Fp12;
    multiplyByFp2(lhs: Fp12, rhs: Fp2): Fp12;
    conjugate(num: Fp12): Fp12;
    finalExponentiate(num: Fp12): Fp12;
    _cyclotomicSquare(num: Fp12): Fp12;
    _cyclotomicExp(num: Fp12, n: bigint): Fp12;
};
declare const Fp12: mod.Field<Fp12> & Fp12Utils;
export declare const bls12_381: CurveFn<Fp, Fp2, Fp6, Fp12>;
export {};
//# sourceMappingURL=bls12-381.d.ts.map