/** @jsx withSlots */
import { Callout, IconButton, FocusZone, FocusZoneDirection, List, Stack, Text } from 'office-ui-fabric-react';
import { Button } from '../Button/Button';
import { withSlots, getSlots } from '../../Foundation';

import { IMicroFeedbackComponent, IMicroFeedbackProps, IMicroFeedbackSlots } from './MicroFeedback.types';

export const MicroFeedbackView: IMicroFeedbackComponent['view'] = props => {
  const {
    children,
    sendFollowUpIndex,
    thumbsUpTitle,
    thumbsDownTitle,
    thumbsUpQuestion,
    thumbsDownQuestion,
    vote,
    isFollowUpVisible,
    likeRef,
    dislikeRef,
    onCalloutDismiss,
    onLikeVote,
    onDislikeVote
  } = props;

  const likeIcon = vote === 'like' ? 'LikeSolid' : 'Like';
  const dislikeIcon = vote === 'dislike' ? 'DislikeSolid' : 'Dislike';
  const hideThumbsDownCallout = vote !== 'dislike' || !isFollowUpVisible;
  const hideThumbsUpCallout = vote !== 'like' || !isFollowUpVisible;

  const Slots = getSlots<IMicroFeedbackProps, IMicroFeedbackSlots>(props, {
    root: Stack,
    iconContainer: Stack,
    followUpContainer: Callout,
    followUpQuestion: Text,
    followUpOption: Button
  });

  const onRenderLikeCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      onCalloutDismiss();
      if (sendFollowUpIndex && index && thumbsUpQuestion) {
        sendFollowUpIndex(thumbsUpQuestion!.id, index);
      }
    };

    return (
      <Slots.followUpOption data-is-focusable={true} onClick={listOption}>
        <Text>{`${item}`}</Text>
      </Slots.followUpOption>
    );
  };

  const onRenderDislikeCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      onCalloutDismiss();
      if (sendFollowUpIndex && index && thumbsDownQuestion) {
        sendFollowUpIndex(thumbsDownQuestion!.id, index);
      }
    };

    return (
      <Slots.followUpOption data-is-focusable={true} onClick={listOption}>
        <Text>{`${item}`}</Text>
      </Slots.followUpOption>
    );
  };

  return (
    <Slots.root>
      <Slots.iconContainer horizontal>
        {children}
        <div ref={likeRef}>
          <IconButton menuIconProps={{ iconName: likeIcon }} title={thumbsUpTitle} onClick={onLikeVote} />
        </div>
        <div ref={dislikeRef}>
          <IconButton menuIconProps={{ iconName: dislikeIcon }} title={thumbsDownTitle} onClick={onDislikeVote} />
        </div>
      </Slots.iconContainer>
      {thumbsUpQuestion && (
        <Slots.followUpContainer
          gapSpace={0}
          hidden={hideThumbsUpCallout}
          onDismiss={onCalloutDismiss}
          role="alertdialog"
          setInitialFocus={true}
          target={likeRef.current}
        >
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {thumbsUpQuestion.question}
            </Slots.followUpQuestion>
            <List items={thumbsUpQuestion.options} onRenderCell={onRenderLikeCalloutItem} />
          </FocusZone>
        </Slots.followUpContainer>
      )}
      {thumbsDownQuestion && (
        <Slots.followUpContainer
          gapSpace={0}
          hidden={hideThumbsDownCallout}
          onDismiss={onCalloutDismiss}
          role="alertdialog"
          setInitialFocus={true}
          target={dislikeRef.current}
        >
          <FocusZone direction={FocusZoneDirection.vertical}>
            <Slots.followUpQuestion block variant="small">
              {thumbsDownQuestion.question}
            </Slots.followUpQuestion>
            <List items={thumbsDownQuestion.options} onRenderCell={onRenderDislikeCalloutItem} />
          </FocusZone>
        </Slots.followUpContainer>
      )}
    </Slots.root>
  );
};
