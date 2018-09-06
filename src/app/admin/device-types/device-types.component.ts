import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DeviceTypeService} from '../../core/device-type.service';
import {DeviceType} from '../../shared/models/device-type.model';
import {plainToClass} from 'class-transformer';
import {NotifierService} from 'angular-notifier';
import {UtilService} from '../../core/util.service';
import {UserService} from '../../core/user.service';
import {UserRole} from '../../shared/models/user.model';
import {HelpService} from '../../core/help.service';

@Component({
  selector: 'dh-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {

  isAdmin = false;
  deviceTypes: Array<DeviceType>;

  newDeviceType: DeviceType;
  selectedDeviceType: DeviceType;
  isSendingRequest = false;
  activeModal: NgbModalRef;
  @ViewChild('deleteDeviceTypeModal') deleteDeviceTypeModal: ElementRef;

  constructor(public helpService: HelpService,
              private deviceTypeService: DeviceTypeService,
              private userService: UserService,
              private modalService: NgbModal,
              private notifierService: NotifierService) {
  }

  async ngOnInit(): Promise<void> {
    const currentUser = await this.userService.getCurrentUser();
    this.isAdmin = currentUser.role === UserRole.ADMIN;

    const deviceTypesPlain = await this.deviceTypeService.getAllDeviceTypes();
    this.deviceTypes = plainToClass(DeviceType, deviceTypesPlain);
  }

  async openDeviceTypeModal(content, selectedDeviceType?: DeviceType): Promise<void> {
    if (selectedDeviceType) {
      this.selectedDeviceType = new DeviceType(selectedDeviceType.id, selectedDeviceType.name, selectedDeviceType.description);
    }

    this.newDeviceType = new DeviceType();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content);
      await this.activeModal.result;
    } catch (dismissReason) {
      // User dismissed modal, no need for any extra action
    }
  }

  async createDeviceType(): Promise<void> {
    const inputError = UtilService.getDeviceTypeInputErrors(this.newDeviceType);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;
    try {
      const createdDeviceType = await this.deviceTypeService.createDeviceType(this.newDeviceType);

      this.newDeviceType.id = createdDeviceType.id;
      this.deviceTypes.push(this.newDeviceType);

      this.newDeviceType = null;
      this.activeModal.close();
      this.isSendingRequest = false;
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async deleteDeviceType(deviceType: DeviceType): Promise<void> {
    try {
      await this.deviceTypeService.deleteDeviceType(deviceType.id);

      const index = this.deviceTypes.indexOf(deviceType);
      if (index > -1) {
        this.deviceTypes.splice(index, 1);
      }
    } catch (error) {
      this.isSendingRequest = false;
      this.openDeviceTypeModal(this.deleteDeviceTypeModal, deviceType);
    }
  }

  async deleteDeviceTypeForce(): Promise<void> {
      try {
        const deviceTypeId = this.selectedDeviceType.id;
        await this.deviceTypeService.deleteDeviceType(deviceTypeId, true);

        const index = this.deviceTypes.findIndex(deviceType => deviceType.id === deviceTypeId);
        if (index > -1) {
          this.deviceTypes.splice(index, 1);
        }
        this.activeModal.close();
      } catch (error) {
        this.isSendingRequest = false;
        this.notifierService.notify('error', error.message);
      }
  }

  async updateSelectedDeviceType(): Promise<void> {
    const inputError = UtilService.getDeviceTypeInputErrors(this.selectedDeviceType);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.deviceTypeService.updateDeviceType(this.selectedDeviceType);

      const oldDeviceType = this.deviceTypes.find(i => i.id === this.selectedDeviceType.id);
      const index = this.deviceTypes.indexOf(oldDeviceType);
      if (index > -1) {
        this.deviceTypes[index] = this.selectedDeviceType;
      }

      this.activeModal.close();
    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }
}
