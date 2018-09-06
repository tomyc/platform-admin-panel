import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../core/help.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { Plugin } from '../../shared/models/plugin.model';
import { UserService } from '../../core/user.service';
import { PluginService } from '../../core/plugin.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { UserRole } from '../../shared/models/user.model';
import { plainToClass } from 'class-transformer';
import { DeviceTypeService } from '../../core/device-type.service';
import { DeviceService } from '../../core/device.service';
import { NetworkService } from '../../core/network.service';
import { DeviceType } from '../../shared/models/device-type.model';
import { Network } from '../../shared/models/network.model';
import { Device } from '../../shared/models/device.model';
import { PluginCredentials } from '../../shared/models/plugin-credentials.model';
import { UtilService } from '../../core/util.service';

@Component({
  selector: 'dh-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  isAdmin = true;
  plugins: Array<Plugin>;

  networks: Array<Network>;
  deviceTypes: Array<DeviceType>;
  devices: Array<Device>;

  newPlugin: Plugin;
  newPluginCredentials: PluginCredentials;

  selectedPlugin: Plugin;
  selectedPluginOriginal: Plugin;
  selectedPluginCredentials: PluginCredentials;

  isSendingRequest = false;
  activeModal: NgbModalRef;

  constructor(public helpService: HelpService,
    private userService: UserService,
    private pluginService: PluginService,
    private networkService: NetworkService,
    private deviceTypeService: DeviceTypeService,
    private deviceService: DeviceService,
    private modalService: NgbModal,
    private notifierService: NotifierService) {
  }

  async ngOnInit(): Promise<void> {
    const currentUser = await this.userService.getCurrentUser();
    this.isAdmin = currentUser.role === UserRole.ADMIN;

    const pluginsPlain = await this.pluginService.getAllPlugins();
    this.plugins = plainToClass(Plugin, pluginsPlain);

    this.networks = await this.networkService.getAllNetworks();
    this.deviceTypes = await this.deviceTypeService.getAllDeviceTypes();
    this.devices = await this.deviceService.getAllDevices();
  }

  async openPluginModal(content, selectedPlugin?: Plugin): Promise<void> {
    if (selectedPlugin) {
      this.selectedPluginOriginal = Plugin.fromObject(Plugin.fromPluginApiResponse(selectedPlugin));
      this.selectedPlugin = Plugin.fromObject(Plugin.fromPluginApiResponse(selectedPlugin));
    }

    this.newPlugin = new Plugin();
    this.isSendingRequest = false;
    try {
      this.activeModal = this.modalService.open(content, { size: 'lg' });
      await this.activeModal.result;
    } catch (dismissReason) {
      this.newPlugin = null;
      this.newPluginCredentials = null;

      this.selectedPlugin = null;
      this.selectedPluginCredentials = null;
    }
  }

  async createPlugin(): Promise<void> {
    const inputError = UtilService.getPluginInputErrors(this.newPlugin);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    this.isSendingRequest = true;

    try {
      this.newPluginCredentials = await this.pluginService.registerPlugin(this.newPlugin);
      const pluginsPlain = await this.pluginService.getAllPlugins();
      this.plugins = plainToClass(Plugin, pluginsPlain);

      this.newPlugin = null;
      this.isSendingRequest = false;

    } catch (error) {
      this.isSendingRequest = false;
      this.notifierService.notify('error', error.message);
    }
  }

  async updateSelectedPlugin(): Promise<void> {
    const inputError = UtilService.getPluginInputErrors(this.selectedPlugin);
    if (inputError) {
      this.notifierService.notify('error', inputError);
      return;
    }

    try {
      await this.pluginService.updatePlugin(this.selectedPlugin);
      const pluginsPlain = await this.pluginService.getAllPlugins();
      this.plugins = plainToClass(Plugin, pluginsPlain);

      this.notifierService.notify('success', 'Wtyczka zaktualizowana');
    } catch (error) {
      this.isSendingRequest = false;
      const message = error.message ? error.message : ErrorHandlerService.handleErrorFromServer(error);
      this.notifierService.notify('error', message);
    }
  }

  async generateNewTokens(): Promise<void> {
    try {
      const result = await this.pluginService.generateNewTokens(this.selectedPlugin.topicName);
      this.selectedPluginCredentials = new PluginCredentials(result.accessToken, result.refreshToken, this.selectedPlugin.topicName);
    } catch (error) {
      this.isSendingRequest = false;
      const message = error.message ? error.message : ErrorHandlerService.handleErrorFromServer(error);
      this.notifierService.notify('error', message);
    }
  }

  async deletePlugin(plugin: Plugin): Promise<void> {
    if (confirm('Czy na pewno chcesz usunąć tę wtyczkę?')) {
      try {
        await this.pluginService.deletePlugin(plugin.topicName);

        const index = this.plugins.indexOf(plugin);
        if (index > -1) {
          this.plugins.splice(index, 1);
        }
      } catch (error) {
        this.notifierService.notify('error', error.message);
      }
    }
  }
}
