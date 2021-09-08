 import { ChatEngine } from 'react-chat-engine';
 import './Message.css'
 import { ChatFeed } from './ChatFeed';
 import { LoginForm } from './LoginForm';

 const projectID = '1b7801d6-8a66-4be4-a442-89219d833dfc';

 export const Message = () => {
//   if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="90vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

// infinite scroll, logout, more customizations...

