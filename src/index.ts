export class ChatWidget {
  open: boolean;
  position: { [x: string]: string };
  chatIcon!: HTMLImageElement;
  closeIcon!: HTMLImageElement;
  messageContainer!: HTMLDivElement;

  constructor({ position }: { position: string }) {
    this.position = this.getPosition(position); // {bottom : 30px , right : "30px"}
    this.open = false;
    this.initialise();
    this.createStyle();
    this.createMessageContainerContent();
  }

  getPosition(position: string) {
    const [vertical, horizontal] = position.split('-');
    return {
      [vertical]: '30px',
      [horizontal]: '30px',
    };
  }

  initialise() {
    const container = document.createElement('div');
    container.style.position = 'fixed';

    Object.keys(this.position).forEach(
      (key: string) => (container.style[key as unknown as number] = this.position[key]),
    );

    document.body.appendChild(container);
    const buttonContainer = document.createElement('div');

    buttonContainer.classList.add('button-container');

    const chatIcon = document.createElement('img');
    chatIcon.src = './assets/chat.svg';
    chatIcon.classList.add('icon');
    this.chatIcon = chatIcon;

    const closeIcon = document.createElement('img');
    closeIcon.src = './assets/close.svg';
    closeIcon.classList.add('icon', 'hidden');
    this.closeIcon = closeIcon;

    this.messageContainer = document.createElement('div');
    this.messageContainer.classList.add('hidden', 'message-container');

     // Todo create all the container of the message here

  
    buttonContainer.appendChild(this.chatIcon);
    buttonContainer.appendChild(this.closeIcon);

    buttonContainer.addEventListener('click', this.toggleOpen.bind(this));

    container.appendChild(buttonContainer);
    container.appendChild(this.messageContainer);
  }

  createMessageContainerContent() {
    this.messageContainer.innerHTML = ''; // deleting all the previous messages
    const botAvtar = document.createElement('img');
    botAvtar.src = './assets/bot.svg';

    const text = document.createElement('p');
    text.innerHTML = 'Well Well! is this a new project we have been talking about ??';
    text.classList.add("text-message")

    const message = document.createElement('div');

    message.classList.add('message');
    message.appendChild(botAvtar);
    message.appendChild(text);

    this.messageContainer.appendChild(message);
  }
  // Adding Style to the Widget

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.chatIcon.classList.add('hidden');
      this.closeIcon.classList.remove('hidden');
      this.messageContainer.classList.remove('hidden');
    } else {
      this.createMessageContainerContent();
      this.chatIcon.classList.remove('hidden');
      this.closeIcon.classList.add('hidden');
      this.messageContainer.classList.add('hidden');
    }
  }
  createStyle() {
    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);

    styleTag.innerHTML = `
      .icon {
          cursor : pointer;
          width: 70%;
          position : absolute ;
          top : 9px;
          left : 9px;
          transition : transform .3s ease;
      }

      .hidden {
          transform : scale(0);
      }

      .button-container {
          background : #04b73f;
          width : 60px;
          height : 60px;
          border-radius : 50%;
      }

      .message-container {
          box-shadow : 5px 5px 5px 5px #c5c6d0;
          min-width : 350px;
          right : 10px;
          bottom : 75px;
          padding : 10px;
          min-height : 200px;
          max-height : 400px;
          border-radius : 14px;
          position : absolute;
          transition : max-height .2s ease;
          font-family : Helvetica , Arial ,sans-serif
      }

      .message-container.hidden {
          max-height : 0px
      }

      .message {
          display : flex;
          aling-items : center;
          padding : 10px;
          height : auto;
      }

      .text-message {
        padding : 0px 5px;
        width : 100%;

      }
  
  `;
  }
}
