import { FontWeights, getFocusOutlineStyle, IStyleFunction } from 'office-ui-fabric-react/lib/index';
import { appPaddingSm, uhfScreenMaxLg } from '../../styles/constants';
import { ISideRailStyleProps, ISideRailStyles } from './SideRail.types';

export const sideRailClassNames = {
  isActive: 'SideRail-isActive'
};

export const getStyles: IStyleFunction<ISideRailStyleProps, ISideRailStyles> = props => {
  const theme = props.theme!;
  return {
    root: {},
    section: {
      marginBottom: appPaddingSm,
      selectors: {
        '&:last-child': {
          marginBottom: 0
        }
      }
    },
    sectionTitle: {
      fontSize: theme.fonts.mediumPlus.fontSize,
      fontWeight: FontWeights.semibold,
      color: theme.palette.neutralSecondary,
      marginTop: 0,
      paddingLeft: 8
    },
    link: {
      display: 'flex',
      fontSize: theme.fonts.medium.fontSize,
      selectors: {
        a: [
          {
            display: 'block',
            flex: '1',
            padding: '4px 8px',
            selectors: {
              '&:hover': { background: theme.palette.neutralLight }
            }
          },
          getFocusOutlineStyle(theme, 1)
        ]
      }
    },
    markdownList: {
      selectors: {
        'ul li': [
          {
            fontSize: theme.fonts.medium.fontSize,
            padding: '4px 8px',
            selectors: {
              '&:hover': { background: theme.palette.neutralLight }
            }
          },
          getFocusOutlineStyle(theme, 1)
        ]
      }
    },
    jumpLink: {
      position: 'relative',
      selectors: {
        a: {
          color: theme.palette.neutralPrimary,
          borderLeft: '2px solid transparent',
          paddingLeft: 6, // 8px - 2px border
          selectors: {
            '&:focus': {
              color: theme.palette.neutralPrimary
            }
          }
        }
      },
      [`&.${sideRailClassNames.isActive} a`]: {
        borderLeftColor: theme.palette.themePrimary
      }
    },
    jumpLinkSection: {
      selectors: {
        [`@media screen and (max-width: ${uhfScreenMaxLg}px)`]: {
          display: 'none'
        }
      }
    }
  };
};
