import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonChannelComponent } from '@shared/button-channel/button-channel.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessageManagerComponent } from './chat-message-manager/chat-message-manager.component';
import { CitizenInformationComponent } from './citizen-information/citizen-information.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CHANNELS, Channels } from '@interfaces/features/main/omnichannel-inbox/omnichannel-inbox.interface';
import { ChannelRoomSocketService } from '@services/channel-room-socket.service';


@Component({
  selector: 'app-omnichannel-inbox',
  imports: [
    CardModule,
    ChatListComponent,
    ButtonModule,
    InputTextModule,
    ButtonChannelComponent,
    CitizenInformationComponent,
    ChatMessageManagerComponent,
    DividerModule,
    FormsModule,
    SelectButtonModule,
    CommonModule,
    AvatarModule,
    OverlayBadgeModule
],
  templateUrl: './omnichannel-inbox.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `

  `
})
export class OmnichannelInboxComponent implements OnInit, OnDestroy {


  channelSelected: string = "all"

  CHANNEL_BUTTONS = [
    {
      label: 'General',
      key: CHANNELS.ALL,
      selected: true,
      icon: 'ant-design:message-outlined',
      textColor: 'text-gray-500',
      hoverColor: 'hover:bg-gray-50',
      backgroundColor: 'bg-terciario !shadow-md',
      isGradient: false,
      activeTextColor: 'text-gray-700',
      activeHoverColor: 'hover:bg-gray-100',
      activeGradientClass: '',
      activeBackgroundColor: 'bg-gray-100',
    },
    {
      label: 'Telegram',
      key: CHANNELS.TELEGRAM,
      selected: false,
      icon: 'logos:telegram',
      textColor: 'text-sky-500',
      hoverColor: 'hover:bg-sky-50',
      backgroundColor: 'bg-terciario',
      isGradient: false,
      activeTextColor: 'text-sky-700',
      activeHoverColor: 'hover:bg-sky-100',
      activeGradientClass: '',
      activeBackgroundColor: 'bg-sky-50',
    },
    {
      label: 'Whatsapp',
      key: CHANNELS.WHATSAPP,
      selected: false,
      icon: 'logos:whatsapp-icon',
      textColor: 'text-green-500',
      hoverColor: 'hover:bg-green-50',
      backgroundColor: 'bg-terciario',
      isGradient: false,
      activeTextColor: 'text-green-700',
      activeHoverColor: 'hover:bg-green-100',
      activeGradientClass: '',
      activeBackgroundColor: 'bg-green-50',
    },
    /* {
      label: 'ChatSat',
      key: CHANNELS.CHATSAT,
      selected: false,
      icon: null,
      image: 'https://freepngimg.com/thumb/chat/1-2-chat-png-image-thumb.png',
      textColor: 'text-gray-500',
      hoverColor: 'hover:bg-gray-50',
      backgroundColor: 'bg-terciario',
      isGradient: false,
      activeTextColor: 'text-sky-700',
      activeHoverColor: 'hover:bg-sky-100',
      activeGradientClass: '',
      activeBackgroundColor: 'bg-sky-50',
    } */
    {
      label: 'Chat',
      key: CHANNELS.CHATSAT,
      selected: false,
      icon: 'bytesize:message', // ícono genérico de chat
      image: null,
      textColor: 'text-sky-500',
      hoverColor: 'hover:bg-sky-50',
      backgroundColor: 'bg-terciario',
      isGradient: false,
      activeTextColor: 'text-sky-700',
      activeHoverColor: 'hover:bg-sky-100',
      activeGradientClass: '',
      activeBackgroundColor: 'bg-sky-50',
    }

  ];

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private channelRoomSocketService: ChannelRoomSocketService
    ){}


    ngOnDestroy(): void {
        // this.channelRoomSocketService.disconnectSocket();
    }

    ngOnInit(): void {
        // this.channelRoomSocketService.connectSocket();
    }

    navigateInChannels(channel: Channels): void
    {
       this.CHANNEL_BUTTONS = this.CHANNEL_BUTTONS.map((button) => ({
        ...button,
        selected: button.key === channel
      }));
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { channel }
      });
      // this.router.navigate([`/inbox-multi-channel/${channel}`]);
    }

}
