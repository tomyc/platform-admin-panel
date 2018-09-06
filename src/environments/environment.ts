// Zawartoœæ pliku dla bie¿¹cego œrodowiska spowoduje ich zast¹pienie podczas kompilacji.
// System kompilacji domyœlnie dzia³a w œrodowisku dev, które u¿ywa `environment.ts`, ale
// jeœli zrobisz` ng build --env = prod`, u¿yjesz zamiast tego `environment.prod.ts`.
// Lista które œrodowisko jest aktualnie mapowane do pliku, mo¿na znaleŸæ w `.angular-cli.json`.

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
