// Zawarto�� pliku dla bie��cego �rodowiska spowoduje ich zast�pienie podczas kompilacji.
// System kompilacji domy�lnie dzia�a w �rodowisku dev, kt�re u�ywa `environment.ts`, ale
// je�li zrobisz` ng build --env = prod`, u�yjesz zamiast tego `environment.prod.ts`.
// Lista kt�re �rodowisko jest aktualnie mapowane do pliku, mo�na znale�� w `.angular-cli.json`.

export const environment = {
  production: false,
  autoUpdateSession: true,
  googleClientId: '',
  facebookAppId: '',
  githubClientId: '',
  mainServiceURL: 'http://devicehive.home/api/rest',
  authServiceURL: 'http://devicehive.home/auth/rest',
  pluginServiceURL: 'http://devicehive.home/plugin/rest'
};
