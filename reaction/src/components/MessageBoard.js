import React from 'react';
import { useAppContext } from './hooks';
import CreateReaction from './CreateReaction';
import MessageReactions from './MessageReactions';

function MessageBoard() {
  const { state: { messages, reactionsMap } } = useAppContext();

  return (
    <div>
      {
        messages.map(messageItem => {
          const { id, text, username, timestamp } = messageItem;

          return (
            <div key={id}>
              <h4>{new Date(timestamp).toLocaleString()}</h4>
              <p>{text}</p>
              <h4>- {username}</h4>
              <CreateReaction messageId={id} />
              <MessageReactions messageReactions={reactionsMap[id]} />
              <hr />
            </div>
          )
        })
      }
    </div>
  )
}

export default MessageBoard;
