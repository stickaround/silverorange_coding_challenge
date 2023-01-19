export const repoListUrl = 'https://api.github.com/users/silverorange/repos';
export const repoUrl = 'https://api.github.com/repos/silverorange';
export const readMeUrl = (repoName: string) =>
  `https://raw.githubusercontent.com/${repoName}/master/README.md`;
