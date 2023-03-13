/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
/**
 * BLS (Barreto-Lynn-Scott) family of pairing-friendly curves.
 * Implements BLS (Boneh-Lynn-Shacham) signatures.
 * Consists of two curves: G1 and G2:
 * - G1 is a subgroup of (x, y) E(Fq) over y² = x³ + 4.
 * - G2 is a subgroup of ((x₁, x₂+i), (y₁, y₂+i)) E(Fq²) over y² = x³ + 4(1 + i) where i is √-1
 * - Gt, created by bilinear (ate) pairing e(G1, G2), consists of p-th roots of unity in
 *   Fq^k where k is embedding degree. Only degree 12 is currently supported, 24 is not.
 * Pairing is used to aggregate and verify signatures.
 * We are using Fp for private keys (shorter) and Fp₂ for signatures (longer).
 * Some projects may prefer to swap this relation, it is not supported for now.
 */
import { AffinePoint } from './curve.js';
import { Field } from './modular.js';
import { Hex, PrivKey, CHash } from './utils.js';
import * as htf from './hash-to-curve.js';
import { CurvePointsType, ProjPointType as ProjPointType, CurvePointsRes } from './weierstrass.js';
declare type Fp = bigint;
export declare type SignatureCoder<Fp2> = {
    decode(hex: Hex): ProjPointType<Fp2>;
    encode(point: ProjPointType<Fp2>): Uint8Array;
};
export declare type CurveType<Fp, Fp2, Fp6, Fp12> = {
    r: bigint;
    G1: Omit<CurvePointsType<Fp>, 'n'> & {
        mapToCurve: htf.MapToCurve<Fp>;
        htfDefaults: htf.Opts;
    };
    G2: Omit<CurvePointsType<Fp2>, 'n'> & {
        Signature: SignatureCoder<Fp2>;
        mapToCurve: htf.MapToCurve<Fp2>;
        htfDefaults: htf.Opts;
    };
    x: bigint;
    Fp: Field<Fp>;
    Fr: Field<bigint>;
    Fp2: Field<Fp2> & {
        reim: (num: Fp2) => {
            re: bigint;
            im: bigint;
        };
        multiplyByB: (num: Fp2) => Fp2;
        frobeniusMap(num: Fp2, power: number): Fp2;
    };
    Fp6: Field<Fp6>;
    Fp12: Field<Fp12> & {
        frobeniusMap(num: Fp12, power: number): Fp12;
        multiplyBy014(num: Fp12, o0: Fp2, o1: Fp2, o4: Fp2): Fp12;
        conjugate(num: Fp12): Fp12;
        finalExponentiate(num: Fp12): Fp12;
    };
    htfDefaults: htf.Opts;
    hash: CHash;
    randomBytes: (bytesLength?: number) => Uint8Array;
};
export declare type CurveFn<Fp, Fp2, Fp6, Fp12> = {
    CURVE: CurveType<Fp, Fp2, Fp6, Fp12>;
    Fr: Field<bigint>;
    Fp: Field<Fp>;
    Fp2: Field<Fp2>;
    Fp6: Field<Fp6>;
    Fp12: Field<Fp12>;
    G1: CurvePointsRes<Fp> & ReturnType<typeof htf.createHasher<Fp>>;
    G2: CurvePointsRes<Fp2> & ReturnType<typeof htf.createHasher<Fp2>>;
    Signature: SignatureCoder<Fp2>;
    millerLoop: (ell: [Fp2, Fp2, Fp2][], g1: [Fp, Fp]) => Fp12;
    calcPairingPrecomputes: (p: AffinePoint<Fp2>) => [Fp2, Fp2, Fp2][];
    pairing: (P: ProjPointType<Fp>, Q: ProjPointType<Fp2>, withFinalExponent?: boolean) => Fp12;
    getPublicKey: (privateKey: PrivKey) => Uint8Array;
    sign: {
        (message: Hex, privateKey: PrivKey): Uint8Array;
        (message: ProjPointType<Fp2>, privateKey: PrivKey): ProjPointType<Fp2>;
    };
    verify: (signature: Hex | ProjPointType<Fp2>, message: Hex | ProjPointType<Fp2>, publicKey: Hex | ProjPointType<Fp>) => boolean;
    aggregatePublicKeys: {
        (publicKeys: Hex[]): Uint8Array;
        (publicKeys: ProjPointType<Fp>[]): ProjPointType<Fp>;
    };
    aggregateSignatures: {
        (signatures: Hex[]): Uint8Array;
        (signatures: ProjPointType<Fp2>[]): ProjPointType<Fp2>;
    };
    verifyBatch: (signature: Hex | ProjPointType<Fp2>, messages: (Hex | ProjPointType<Fp2>)[], publicKeys: (Hex | ProjPointType<Fp>)[]) => boolean;
    utils: {
        randomPrivateKey: () => Uint8Array;
    };
};
export declare function bls<Fp2, Fp6, Fp12>(CURVE: CurveType<Fp, Fp2, Fp6, Fp12>): CurveFn<Fp, Fp2, Fp6, Fp12>;
export {};
//# sourceMappingURL=bls.d.ts.map