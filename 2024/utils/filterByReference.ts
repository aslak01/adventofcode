/**
 * Filters source array based on truthy values in reference array
 */
const filterByReference = <T>(
  [...source]: T[],
  [...reference]: unknown[],
): T[] => {
  if (source.length !== reference.length) {
    throw new Error("Arrays must have same length");
  }
  return source.filter((_, i) => reference[i]);
};

export { filterByReference };
