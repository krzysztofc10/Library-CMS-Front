export const colorHash = (str: string) => {
  let hash = 0;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 4);

  return `#${color.padStart(4, '0')}`;
};
