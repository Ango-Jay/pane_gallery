export const getMultiples = (base: number, min: number, max: number) => {
  let multiple = min;
  const multiples: number[] = [];

  for (multiple; multiple < max; multiple = multiple + base) {
    multiples.push(multiple);
  }

  return multiples;
};
