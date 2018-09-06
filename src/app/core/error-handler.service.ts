import {Injectable} from '@angular/core';
import { NOT_A_PLUGIN_CREATOR, UPDATE_ACTIVE_PLUGIN } from '../shared/constants/errors';

@Injectable()
export class ErrorHandlerService {
    public static handleErrorFromServer(error) {
        if (error.indexOf(NOT_A_PLUGIN_CREATOR) !== -1) {
            return 'Wtyczka została stworzona przez innego użytkownika. Nie masz uprawnień do generowania tokenów.';
        }
        if (error.indexOf(UPDATE_ACTIVE_PLUGIN) !== -1) {
            return 'Przed wprowadzeniem zmian ustaw stan wtyczki na Nieaktywny.';
        }
        return error;
    }
}
