import * as React from 'react';
import { IMicroFeedbackQuestion, VoteType } from '../MicroFeedback.types';
import { MicroFeedback } from '../MicroFeedback';

// tslint:disable:jsx-no-lambda

export class MicroFeedbackStackExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const followUpOnDislike: IMicroFeedbackQuestion = {
      options: ['Translation is incorrect', 'Context is incorrect', 'Language can be better'],
      question: 'Please help us improve',
      id: 'dislike'
    };

    const followUpOnLike: IMicroFeedbackQuestion = {
      options: ['Translation is great', 'Context is great'],
      question: 'Please help us improve',
      id: 'like'
    };

    const sendFeedbackCallback = (vote: VoteType) => {
      console.log('Logged vote type:', vote);
    };

    const sendFollowupIndexCallback = (id: string, index: number) => {
      console.log('Logged selection index:', index, 'with id:', id);
    };

    return (
      <MicroFeedback
        inline
        dislikeQuestion={followUpOnDislike}
        likeQuestion={followUpOnLike}
        likeIconTitle="Like"
        dislikeIconTitle="Dislike"
        sendFeedback={sendFeedbackCallback}
        sendFollowUpIndex={sendFollowupIndexCallback}
        thanksText="Thank you!"
        tokens={{ followUpBackgroundColor: 'lightgrey' }}
      />
    );
  }
}