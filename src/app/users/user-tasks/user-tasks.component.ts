import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [FormsModule],
})
export class UserTasksComponent implements OnInit {
  private mockMessages: { [key: string]: Message[] } = {
    u1: [
      {
        id: 1,
        text: 'Ciao Jasmine! Ho visto la tua presentazione sul nuovo progetto',
        sender: 'user',
        timestamp: '09:30',
      },
      {
        id: 2,
        text: 'Grazie! Sono contenta che ti sia piaciuta. Hai qualche feedback da darmi?',
        sender: 'other',
        timestamp: '09:32',
      },
      {
        id: 3,
        text: "Mi è piaciuto particolarmente l'approccio innovativo che hai proposto",
        sender: 'user',
        timestamp: '09:35',
      },
      {
        id: 4,
        text: 'Apprezzo molto il tuo feedback! Sto già lavorando su alcuni miglioramenti',
        sender: 'other',
        timestamp: '09:37',
      },
      {
        id: 5,
        text: "Fantastico! Non vedo l'ora di vedere gli sviluppi",
        sender: 'user',
        timestamp: '09:40',
      },
    ],
    u2: [
      {
        id: 1,
        text: 'Emily, hai un momento per discutere del report settimanale?',
        sender: 'user',
        timestamp: '10:15',
      },
      {
        id: 2,
        text: 'Certo! Dammi 5 minuti per finire una call',
        sender: 'other',
        timestamp: '10:17',
      },
      {
        id: 3,
        text: 'Perfect, grazie! Nel frattempo ti invio i dati che ho raccolto',
        sender: 'user',
        timestamp: '10:18',
      },
      {
        id: 4,
        text: 'Ho finito la call, possiamo procedere',
        sender: 'other',
        timestamp: '10:23',
      },
    ],
    u3: [
      {
        id: 1,
        text: 'Marcus, come procede lo sviluppo del nuovo feature?',
        sender: 'user',
        timestamp: '11:00',
      },
      {
        id: 2,
        text: 'Procede bene! Ho completato il 70% del lavoro',
        sender: 'other',
        timestamp: '11:05',
      },
      {
        id: 3,
        text: 'Ottimo! Hai bisogno di supporto per completare?',
        sender: 'user',
        timestamp: '11:07',
      },
      {
        id: 4,
        text: 'Sì, mi servirebbe aiuto con i test di integrazione',
        sender: 'other',
        timestamp: '11:10',
      },
    ],
    u4: [
      {
        id: 1,
        text: 'David, hai ricevuto la mail con la documentazione?',
        sender: 'user',
        timestamp: '14:20',
      },
      {
        id: 2,
        text: "Sì, l'ho appena letta. Mi sembra tutto chiaro",
        sender: 'other',
        timestamp: '14:25',
      },
      {
        id: 3,
        text: 'Perfetto! Quando pensi di poter iniziare?',
        sender: 'user',
        timestamp: '14:27',
      },
      {
        id: 4,
        text: 'Posso iniziare già da domani mattina',
        sender: 'other',
        timestamp: '14:30',
      },
    ],
    u5: [
      {
        id: 1,
        text: 'Priya, come sta andando con il cliente?',
        sender: 'user',
        timestamp: '15:45',
      },
      {
        id: 2,
        text: 'Molto bene! Sono entusiasti della nostra proposta',
        sender: 'other',
        timestamp: '15:48',
      },
      {
        id: 3,
        text: 'Fantastico! Hai già programmato il follow-up?',
        sender: 'user',
        timestamp: '15:50',
      },
      {
        id: 4,
        text: 'Sì, ci incontriamo la prossima settimana',
        sender: 'other',
        timestamp: '15:52',
      },
    ],
    u6: [
      {
        id: 1,
        text: 'Arjun, ho visto le modifiche al codice. Ottimo lavoro!',
        sender: 'user',
        timestamp: '16:30',
      },
      {
        id: 2,
        text: 'Grazie! Ho implementato anche alcune ottimizzazioni',
        sender: 'other',
        timestamp: '16:33',
      },
      {
        id: 3,
        text: 'Ho notato! La performance è migliorata significativamente',
        sender: 'user',
        timestamp: '16:35',
      },
      {
        id: 4,
        text: 'Sì, ho ridotto il tempo di caricamento del 40%',
        sender: 'other',
        timestamp: '16:38',
      },
    ],
  };

  userId = signal<string>('');
  private activatedRoute = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  newMessage = '';
  messages = signal<Message[]>([]);

  ngOnInit(): void {
    const subscription = this.activatedRoute.params.subscribe((data) => {
      this.userId.set(data['userId']);
      this.messages.set(this.mockMessages[this.userId()]);
    });
  }

  userName = computed(() => {
    return this.usersService.users.find((user) => user.id === this.userId())
      ?.name;
  });

  userAvatar = computed(() => {
    console.log(
      this.usersService.users.find((user) => user.id === this.userId())?.avatar
    );
    return (
      'users/' +
      this.usersService.users.find((user) => user.id === this.userId())?.avatar
    );
  });

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: Message = {
        id: this.messages.length + 1,
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      this.messages.update((messages) => [...messages, message]);
      this.newMessage = '';
    }
  }
}
