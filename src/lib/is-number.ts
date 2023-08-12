export default function isNumber<N extends string>(input: N) {
  return /^\d+$/.test(input) as N extends infer N2
      ? N2 extends `${number}`
          ? true
          : false
      : false;
}