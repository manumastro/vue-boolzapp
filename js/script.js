dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);

const dB = [
  {
      name: 'Michele',
      avatar: '_1',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
          },
          {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
          }
      ],
  },
  {
      name: 'Fabio',
      avatar: '_2',
      visible: true,
      messages: [
          {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
          },
          {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
          },
          {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
          }
      ],
  },
  {
      name: 'Samuele',
      avatar: '_3',
      visible: true,
      messages: [
          {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
          },
          {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
          },
          {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
          }
      ],
  },
  {
      name: 'Alessandro B.',
      avatar: '_4',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
          }
      ],
  },
  {
      name: 'Alessandro L.',
      avatar: '_5',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
          }
      ],
  },
  {
      name: 'Claudia',
      avatar: '_6',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novit???',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
          },
          {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
          }
      ],
  },
  {
      name: 'Federico',
      avatar: '_7',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
          }
      ],
  },
  {
      name: 'Davide',
      avatar: '_8',
      visible: true,
      messages: [
          {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
          },
          {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
              status: 'sent'
          },
          {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
          }
      ],
  },
]



const app = new Vue({

  el: '#app',

  data: {
      
    dataBase: dB,
    user: {
        name: 'Manu',
        avatar: '_io'
    },
    selectedUserIndex: 0,

    messageToPush: '',

    searchUser: '',
    
    currenTime: dayjs().format('DD/MM/YYYY HH:mm:ss'),

    eliminateMessageToggle: false,

    selectedMessageIndex: '',

  },
  methods: {
    
    pushMessage(){
        const msgCopy = 
        {
            date: this.currenTime,
            message: this.messageToPush,
            status: 'sent',
        }
        console.log(msgCopy.message);

        if(msgCopy.message.length > 0){
            this.dataBase[this.selectedUserIndex].messages.push(msgCopy);
            this.messageToPush = '';
            const clear = setInterval(() => {
                if(this.messageToPush === ''){
                    const msgReply = 
                    {
                        date: this.currenTime,
                        message: 'OK!!!',
                        status: 'received',
                    }
                    this.dataBase[this.selectedUserIndex].messages.push(msgReply);
                    clearInterval(clear);
                }
        }, 1000);
        }
    },

    /* filteredContacts(){
        return this.dataBase.filter(contatto => {
            return contatto.name.toLowerCase().includes(this.searchUser.toLowerCase())
        })
    }, */

    search(){
        this.dataBase.forEach(contact => {
            contact.visible = contact.name.toUpperCase().includes(this.searchUser.toUpperCase());
        })
    },

    getLastMessage(contatto){

        if(contatto.messages.length - 1 < 0){
            return null;
        }else{
            return contatto.messages[contatto.messages.length - 1].message;
        }
    },

    getLastDate(contatto){

        if(contatto.messages.length - 1 < 0){
            return null;
        }else{
            return contatto.messages[contatto.messages.length - 1].date;
        }
    },

    chevronClick(index){
        this.eliminateMessageToggle = !this.eliminateMessageToggle;
        this.selectedMessageIndex = index;
    },

    selectedEliminate(selectedMessageIndex, selectedUserIndex, messaggio, index){

        console.log('IL MESSAGGIO DA ELIMINARE E:      ',
        this.dataBase[selectedUserIndex].messages[selectedMessageIndex].message
        );

        this.dataBase[selectedUserIndex].messages.splice(index, 1);
    }
    

  },
  
})