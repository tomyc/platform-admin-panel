import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AppTourService {

  isTourActive = false;

  private adminSteps = [
    {
      target: 'tour.start',
      content: 'Witamy w konsoli administracyjnej!',
      placement: 'bottom',
      title: 'Witaj'
    },
    {
      target: 'menu.devices',
      content: 'To jest lista urządzeń, do których masz dostęp. Urządzenie to \
                dowolna jednostka IoT komunikująca się z interfejsem API Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'Urządzenia'
    },
    {
      target: 'menu.networks',
      content: 'To jest lista dostępnych sieci. Sieć jest izolowanym obszarem, w którym znajdują się urządzenia.',
      placement: 'bottom',
      title: 'Sieci'
    },
    {
      target: 'menu.device-types',
      content: 'Oto lista istniejących typów urządzeń.',
      placement: 'bottom',
      title: 'Typy urządzeń'
    },
    {
      target: 'menu.users',
      content: 'To jest lista użytkowników, którzy są zarejstrowani na Platformie.',
      placement: 'bottom',
      title: 'Użytkownicy'
    },
    {
      target: 'menu.jwt',
      content: 'Ta sekcja pozwala na generowanie tokenów JWT służących do zabezpieczenia Platformy przed \
                nieuprawnionym dostępem. Urządzenia potrzebują tokena JWT, aby uzyskać dostęp do Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'JSON WEB TOKEN'
    },
    {
      target: 'menu.plugins',
      content: 'Ta sekcja pozwala zarządzaą wtyczkami. Rozszerzenia pozwalają rozszerzyć funkcjonalność Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'Rozszerzenia'
    },
    {
      target: 'tour.start',
      content: 'Więcej pomocy znjdziesz w podpowiedziach kontekstowych i dokumentacji Platformy Integracyjnej',
      placement: 'bottom',
      title: 'Miłej pracy!'
    }
  ];

  private clientSteps = [
     {
      target: 'tour.start',
      content: 'Witamy w konsoli administracyjnej!',
      placement: 'bottom',
      title: 'Witaj'
    },
    {
      target: 'menu.devices',
      content: 'To jest lista urządzeń, do których masz dostęp. Urządzenie to \
                dowolna jednostka IoT komunikująca się z interfejsem API Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'Urządzenia'
    },
    {
      target: 'menu.networks',
      content: 'To jest lista dostępnych sieci. Sieć jest izolowanym obszarem, w którym znajdują się urządzenia.',
      placement: 'bottom',
      title: 'Sieci'
    },
    {
      target: 'menu.device-types',
      content: 'Oto lista istniejących typów urządzeń.',
      placement: 'bottom',
      title: 'Typy urządzeń'
    },
    {
      target: 'menu.jwt',
      content: 'Ta sekcja pozwala na generowanie tokenów JWT służących do zabezpieczenia Platformy przed \
                nieuprawnionym dostępem. Urządzenia potrzebują tokena JWT, aby uzyskać dostęp do Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'JSON WEB TOKEN'
    },
    {
      target: 'menu.plugins',
      content: 'Ta sekcja pozwala zarządzaą wtyczkami. Rozszerzenia pozwalają rozszerzyć funkcjonalność Platformy Integracyjnej.',
      placement: 'bottom',
      title: 'Rozszerzenia'
    },
    {
      target: 'tour.start',
      content: 'Więcej pomocy znjdziesz w podpowiedziach kontekstowych i dokumentacji Platformy Integracyjnej',
      placement: 'bottom',
      title: 'Miłej pracy!'
    }
  ];

  constructor(private userService: UserService) {

  }

  startTour(isAdmin: boolean): void {
    const that = this;
    const tour = {
      id: 'devicehive-tour',
      onClose: function () {
        that.setTourFinished();
      },
      onEnd: function () {
        that.setTourFinished();
      },
      steps: []
    };

    if (isAdmin) {
      tour.steps = this.adminSteps;
    } else {
      tour.steps = this.clientSteps;
    }

    hopscotch.startTour(tour);
  }

  async setTourFinished(): Promise<void> {
    await this.userService.finishTourForCurrentUser();
  }
}

