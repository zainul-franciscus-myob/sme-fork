export const obfuscateName = (name) =>
  name
    .split(' ')
    .map((partial) => `${partial.charAt(0)}${Array(partial.length).join('*')}`)
    .join('');

export const obfuscateEmail = (email) => {
  const separatorIndex = email.lastIndexOf('@');
  const localPart = email.slice(0, separatorIndex);
  const domain = email.slice(separatorIndex);

  return `${localPart.charAt(0)}${Array(localPart.length - 1).join(
    '*'
  )}${localPart.slice(-1)}${domain}`;
};
