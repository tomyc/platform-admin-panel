import {Injectable} from '@angular/core';
import {User} from '../shared/models/user.model';
import {Network} from '../shared/models/network.model';
import {DeviceType} from '../shared/models/device-type.model';
import {Device} from '../shared/models/device.model';
import {Command} from '../shared/models/command.model';
import {Notification} from '../shared/models/notification.model';
import {isNumeric} from 'rxjs/util/isNumeric';
import {Plugin} from '../shared/models/plugin.model';

@Injectable()
export class UtilService {

  constructor() {
  }

  static getUserInputErrors(user: User): string {
    if (!user.login || user.login.length < 3) {
      return 'Login musi mieć co najmniej 3 znaki';
    }

    if (!user.password || user.password.length < 6) {
      return 'Hasło musi mieć co najmniej 6 znaków';
    }

    if (user.password !== user.passwordConfirmation) {
      return 'Hasło musi być takie samo jak potwierdzenie hasła';
    }

    if (user.data != null && user.data.length > 0 && !this.isValidJson(user.data)) {
      return 'Pole Dane musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    return null;
  }

  static getUserDetailsInputErrors(user: User): string {
    if (!user.login || user.login.length < 3) {
      return 'Login musi mieć co najmniej 3 znaki';
    }

    if (user.password && user.password.length < 6) {
      return 'Hasło musi mieć co najmniej 6 znaków';
    }

    if (user.password && user.password !== user.passwordConfirmation) {
      return 'Hasło musi być takie samo jak potwierdzenie hasła';
    }

    if (user.data != null && user.data.length > 0 && !this.isValidJson(user.data)) {
      return 'Pole Dane musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    return null;
  }

  static getNetworkInputErrors(network: Network): string {
    if (!network.name || network.name.length < 1) {
      return 'Nazwa sieci nie może być pusta';
    }

    if (network.name.length > 128) {
      return 'Nazwa sieci nie może być dłuższa niż 128 znaków';
    }

    if (network.description && network.description.length > 128) {
      return 'Opis nie może być dłuższy niż 128 znaków';
    }

    return null;
  }

  static getDeviceTypeInputErrors(deviceType: DeviceType): string {
    if (!deviceType.name || deviceType.name.length < 1) {
      return 'Nazwa typu urządzenia nie może być pusta';
    }

    if (deviceType.name.length > 128) {
      return 'Nazwa typu urządzenia nie może być dłuższa niż 128 znaków';
    }

    if (deviceType.description && deviceType.description.length > 128) {
      return 'Opis nie może być dłuższy niż 128 znaków';
    }

    return null;
  }

  static getDeviceInputErrors(device: Device): string {
    if (!device.name || device.name.length < 1) {
      return 'Nazwa urządzenia nie może być pusta';
    }

    if (device.name.length > 128) {
      return 'Nazwa urządzenia nie może być dłuższa niż 128 znaków';
    }

    if (!device.networkId) {
      return 'Wybierz sieć';
    }

    if (!device.deviceTypeId) {
      return 'Wybierz typ urządzenia';
    }

    if (device.data != null && device.data.length > 0 && !this.isValidJson(device.data)) {
      return 'Pole Dane musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    return null;
  }

  static getCommandInputErrors(command: Command): string {
    if (!command.command || command.command.length < 1) {
      return 'Polecenie nie może być puste';
    }

    if (command.parameters != null && command.parameters.length > 0 && !this.isValidJson(command.parameters)) {
      return 'Pole Parametry musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    return null;
  }

  static getNotificationInputErrors(notification: Notification): string {
    if (!notification.notification || notification.notification.length < 1) {
      return 'Powiadomienie nie może być puste';
    }

    if (notification.parameters != null && notification.parameters.length > 0 && !this.isValidJson(notification.parameters)) {
      return 'Pole Parametry musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    return null;
  }

  static getPluginInputErrors(plugin: Plugin): string {
    if (!plugin.name || plugin.name.length < 3) {
      return 'Nazwa wtyczki powinna mieć co najmniej 3 znaki';
    }

    if (plugin.name.includes(' ')) {
      return 'Nazwa wtyczki nie może zawierać spacji';
    }

    if (!plugin.description || plugin.description.length < 3) {
      return 'Opis wtyczki powinien mieć co najmniej 3 znaki';
    }

    if (plugin.parameters != null && plugin.parameters.length > 0 && !this.isValidJson(plugin.parameters)) {
      return 'Pole Parametry musi być puste lub zawierać poprawnie stormatowany typ json';
    }

    if (!plugin.returnCommands && !plugin.returnUpdatedCommands && !plugin.returnNotifications) {
      return 'Polecenia, zaktualizowane polecenia i powiadomienia nie mogą być wszystkie niezaznaczone. Wybierz co najmniej jedeno.';
    }
  }

  static isValidJson(str: string): boolean {
    if (isNumeric(str)) {
      return false;
    }

    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
