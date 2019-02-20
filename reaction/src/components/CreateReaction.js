import React from 'react';
import { REACTION_OBJECTS } from '../state/types';
import { useAppContext } from './hooks';
import { createReaction } from '../state/actions';

function CreateReaction({ messageId }) {
  const { state: { username }, pubsub: { publish } } = useAppContext();

  const publishReaction = ({ type, emoji }) => () => {
    publish(createReaction({ type, emoji, username, messageId }));
  }

  return (
    <div className='CreateReaction'>
      {
        REACTION_OBJECTS.map(REACTION_OBJECT => {
          const { type, emoji } = REACTION_OBJECT;

          return (
            <span
              key={type}
              onClick={publishReaction({ type, emoji })}
            >
              {emoji}
            </span>
          )
        })
      }
    </div>
  )
}

export default CreateReaction;
