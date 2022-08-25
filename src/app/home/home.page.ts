import { Component } from '@angular/core';

import { register } from 'vue-advanced-chat/dist/vue-advanced-chat.es.js';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public currentUserId = '1234';
  public rooms = [
    {
      roomId: '1',
      roomName: 'My Room',
      avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
      users: [
        { _id: '1234', username: 'John Doe' },
        { _id: '4321', username: 'John Snow' },
      ],
    },
  ];
  public messages = [];
  public messagesLoaded = false;

  constructor() {}

  fetchMessages({ options }) {
    setTimeout(() => {
      if (options?.reset) {
        this.messages = this.addMessages(true);
      } else {
        this.messages = [...this.addMessages(), ...this.messages];
        this.messagesLoaded = true;
      }
    });
  }

  addMessages(reset = false) {
    const messages = [];

    for (let i = 0; i < 30; i++) {
      messages.push({
        _id: reset ? i : this.messages.length + i,
        content: `${reset ? '' : 'paginated'} message ${i + 1}`,
        senderId: '4321',
        username: 'John Doe',
        date: '13 November',
        timestamp: '10:20',
      });
    }

    return messages;
  }

  sendMessage(message) {
    this.messages = [
      ...this.messages,
      {
        _id: this.messages.length,
        content: message.content,
        senderId: this.currentUserId,
        timestamp: new Date().toString().substring(16, 21),
        date: new Date().toDateString(),
      },
    ];
  }
}
