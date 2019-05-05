import * as React from 'react';
import { Stack } from '../../Stack';
import { classNamesFunction } from '../../Utilities';
import { IconButton, DefaultButton, FocusZone, FocusZoneDirection, List, Text } from 'office-ui-fabric-react';
import { IMicroFeedbackProps, IMicroFeedbackStyleProps, IMicroFeedbackStyles, VoteType } from './MicroFeedback.types';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

const getClassNames = classNamesFunction<IMicroFeedbackStyleProps, IMicroFeedbackStyles>();

export interface IMicroFeedbackState {
  vote: VoteType;
  isFollowupVisible: boolean;
}

export class MicroFeedbackBase extends React.Component<IMicroFeedbackProps, IMicroFeedbackState> {
  // ref's will be linked to each of the icons for callout placement
  private classNames: IProcessedStyleSet<IMicroFeedbackStyles>;

  constructor(props: IMicroFeedbackProps) {
    super(props);

    this.state = {
      // initial state of icons is neutral and followup is not visible
      vote: 'no_vote',
      isFollowupVisible: false
    };
  }

  public render() {
    const likeIcon = this.state.vote === 'like' ? 'LikeSolid' : 'Like';
    const dislikeIcon = this.state.vote === 'dislike' ? 'DislikeSolid' : 'Dislike';
    const hideThumbsDownCallout = this.state.vote !== 'dislike' || !this.state.isFollowupVisible;
    const hideThumbsUpCallout = this.state.vote !== 'like' || !this.state.isFollowupVisible;

    this.classNames = getClassNames(this.props.styles, {
      theme: this.props.theme
    });

    return (
      <Stack className={this.classNames.root}>
        <Stack horizontal>
          <IconButton menuIconProps={{ iconName: likeIcon }} title={this.props.thumbsUpTitle} onClick={this._likeVote} />
          <IconButton menuIconProps={{ iconName: dislikeIcon }} title={this.props.thumbsDownTitle} onClick={this._dislikeVote} />
        </Stack>
        {this.props.thumbsUpQuestion && !hideThumbsUpCallout ? (
          <Stack className={this.classNames.followUpContainer} role="alertdialog" gap={0}>
            <FocusZone direction={FocusZoneDirection.vertical}>
              <Text block={true} className={this.classNames.followUpQuestion} variant="small">
                {this.props.thumbsUpQuestion.question}
              </Text>
              <List
                items={this.props.thumbsUpQuestion.options}
                className={this.classNames.followUpOptionText}
                onRenderCell={this._onRenderCalloutItem}
              />
            </FocusZone>
          </Stack>
        ) : null}
        {this.props.thumbsDownQuestion && !hideThumbsDownCallout ? (
          <Stack className={this.classNames.followUpContainer} role="alertdialog" gap={0}>
            <FocusZone direction={FocusZoneDirection.vertical}>
              <Text block={true} className={this.classNames.followUpQuestion} variant="small">
                {this.props.thumbsDownQuestion.question}
              </Text>
              <List
                items={this.props.thumbsDownQuestion.options}
                className={this.classNames.followUpOptionText}
                onRenderCell={this._onRenderCalloutItem}
              />
            </FocusZone>
          </Stack>
        ) : null}
      </Stack>
    );
  }

  private _onCalloutDismiss = (): void => {
    this.setState({ isFollowupVisible: false });
  };

  private _onRenderCalloutItem = (item: string, index: number | undefined): JSX.Element => {
    const listOption = (): void => {
      this._onCalloutDismiss();
      if (this.props.sendFollowupIndex && index !== undefined) {
        const id: string = this.state.vote === 'dislike' ? this.props.thumbsDownQuestion!.id : this.props.thumbsUpQuestion!.id;
        this.props.sendFollowupIndex(id, index);
      }
    };

    return (
      <DefaultButton data-is-focusable={true} className={this.classNames.followUpOptionContainer} onClick={listOption}>
        <Text className={this.classNames.followUpOptionText}>{`${item}`}</Text>
      </DefaultButton>
    );
  };

  private _vote(vote: VoteType): void {
    // If the vote that is already selected is picked, then toggle off
    const updatedVote: VoteType = this.state.vote === vote ? 'no_vote' : vote;
    this.setState({ isFollowupVisible: true, vote: updatedVote });
    if (updatedVote !== 'no_vote' && this.props.sendFeedback) {
      this.props.sendFeedback(vote);
    }
  }

  private _likeVote = () => {
    this._vote('like');
  };
  private _dislikeVote = () => {
    this._vote('dislike');
  };
}
