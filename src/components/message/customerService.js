import React, { useState } from 'react';
import { Launcher } from "popup-chat-react";

export function CustomerService() {
  const [state, setState] = useState({
    messageList: [],
    newMessagesCount: 0,
    isOpen: false,
    fileUpload: true,
  });

  function onMessageWasSent(message) {
    setState(state => ({
      ...state,
      messageList: [...state.messageList, message]
    }));
  }

  function onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);

    setState(state => ({
      ...state,
      messageList: [
        ...state.messageList,
        {
          type: 'file', author: 'me',
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          }
        }
      ]
    }));
  }

  function onClick() {
    setState(state => ({
      ...state,
      isOpen: !state.isOpen,
      newMessagesCount: 0
    }));
  }

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'Midea Team',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={onMessageWasSent}
        onFilesSelected={onFilesSelected}
        messageList={state.messageList}
        newMessagesCount={state.newMessagesCount}
        onClick={onClick}
        isOpen={state.isOpen}
        showEmoji
        fileUpload={state.fileUpload}
        pinMessage={{
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          title: 'Any question for us?',
          text: 'We will get back to you as soon as we can!'
        }}
        placeholder='write a message here ...'
      > 
      <p>hi</p>
      </Launcher>
    </div>
  );
}
