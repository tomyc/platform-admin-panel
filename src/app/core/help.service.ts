import {Injectable} from '@angular/core';

@Injectable()
export class HelpService {

  constructor() {
  }

  /*
  Device
   */

  getDeviceNameTip(): string {
    return 'Nazwa urządzenia. Służy do późniejszej identyfikacji urządzenia.';
  }

  getDeviceNetworkTip(): string {
    return 'Sieć, do której należy urządzenie.';
  }

  getDeviceDeviceTypeTip(): string {
    return 'Typ urządzenia.';
  }

  getDeviceOperationTip(): string {
    return 'Informacja o stanie działania urządzenia. Urządzenie może działać normalnie lub pozostać zablokowane.';
  }

  getDeviceDataTip(): string {
    return 'Dowolne dane o urządzeniu w formacie JSON.';
  }

  /*
  Network
   */

  getNetworkNameTip(): string {
    return 'Nazwa sieci musi być unikalna.';
  }

  getNetworkDescriptionTip(): string {
    return 'Dowolny opis sieci w formacie tekstowym.';
  }

  /*
  Device Type
   */
  getDeviceTypeNameTip(): string {
    return 'Nazwa typu urządzenia musi być unikalna.';
  }

  getDeviceTypeDescriptionTip(): string {
    return 'Dowolny opis typu urządzenia w formacie tekstowym.';
  }

  /*
  User
   */
  getUserLoginTip(): string {
    return 'Login musi być unikalny.';
  }

  getUserRoleTip(): string {
    return 'Administratorzy mają prawo dodawać/edytować/usuwać dowolne jednostki. Klienci mogą kontrolować tylko własne urządzenia.';
  }

  getUserStatusTip(): string {
    return 'Tylko użytkownicy ze statusem ACTIVE mogą się logować. Wyłączeni użytkownicy zostali zablokowani ' +
      'w systemie przez administratora. Ponieważ wprowadzili nieprawidłowe hasło 5 razy z rzędu.';
  }

  getUserPasswordTip(): string {
    return 'Hasło dla użytkownika. Hasło musi mieć co najmniej 6 znaków.';
  }

  getUserLastLoginTip(): string {
    return 'Data i czas ostatniego zalogowania użytkownika (strefa UTC).';
  }

  getUserDataTip(): string {
    return 'Dowolne dane na temat użytkownika zapisane w formacie JSON.';
  }

  /*
  JWT Tokens
   */
  getJwtTip(): string {
    return 'Wygenerowane zostaną dwa tokeny. Jeśli nie określono daty wygaśnięcia, token dostępu będzie ważny przez 30 minut, ' +
      'a token odświeżania będzie ważny przez 6 miesięcy.';
  }

  /*
  Plugin
   */
  getPluginNameTip(): string {
    return 'Nazwa wtyczki, która musi być unikalna.';
  }

  getPluginDescriptionTip(): string {
    return 'Dowolny opis wtyczki.';
  }

  getPluginFilterTip(): string {
    return 'Informacje dotyczące danych, które otrzyma wtyczka. Format to: [polecenia, zaktualizowane polecenia,' +
      'powiadomienia lub wszystko]/rozdzielona przecinkami lista identyfikatorów sieci/rozdzielona przecinkami lista ' +
      'identyfikatorów typów urządzeń/identyfikator urządzenia/lista nazw oddzielonych przecinkami';
  }

  getPluginStatusTip(): string {
    return 'Aktualny status wtyczki. Utworzony (CREATED) jest zarezerwowane dla nowo tworzonych wtyczek i nie może być ustawione ręcznie.';
  }

  getPluginParametersTip(): string {
    return 'Dowolne dane o wtyczki w formacie JSON.';
  }

  getPluginFiltersTip(): string {
    return 'Wybierz filtry, które chcesz zastosować, aby określić, które polecenia/powiadomienia otrzyma wtyczka. ' +
      'Pozostawienie pustego pola jest równoważne "dowolne".';
  }

  getPluginNamesTip(): string {
    return 'Rozdzielana przecinkami lista nazw poleceń/powiadomień, które wtyczka powinna zaakceptować.';
  }

  /*
  Command
   */
  getCommandNameTip(): string {
    return 'Dowolna nazwa. Nie musi być wyjątkowa.';
  }

  getCommandTimeTip(): string {
    return 'Czas UTC jest zapisywany w bazie danych.';
  }

  getCommandParametersTip(): string {
    return 'Powinien zostać wysłany jako prawidłowy format JSON.';
  }

  getCommandStatusTip(): string {
    return 'Zgłoszone przez urządzenie lub infrastrukturę.';
  }

  getCommandResultTip(): string {
    return 'Wynik wykonania, który może być wysłany przez urządzenie.';
  }

  /*
  Notification
   */
  getNotificationNameTip(): string {
    return 'Dowolna nazwa. Nie musi być wyjątkowa.';
  }

  getNotificationTimeTip(): string {
    return 'Czas UTC jest zapisywany w bazie danych.';
  }

  getNotificationParametersTip(): string {
    return 'Powinien zostać wysłany jako prawidłowy format JSON.';
  }
}
