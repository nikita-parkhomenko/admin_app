
// outsource dependencies
import React, { memo } from 'react';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/**
 * As main Icon component we will use the font-awesome really awesome component
 * @example
 * <Icon icon={['far', icon]} {...attr} />
 */
export const Fa = FontAwesomeIcon;
export default FontAwesomeIcon;

/**
 * Preparing icons
 * @returns {React.NamedExoticComponent<object>}
 */
function create (src, name) {
  const icon = src[name];
  if (!icon || !icon.iconName || !icon.prefix) {
    throw new Error(`Invalid Icon ${name}`);
  }
  // NOTE add to fontawesome library
  library.add(icon);
  // NOTE create component to use in React
  const Icon = memo((props) => <FontAwesomeIcon icon={[icon.prefix, icon.iconName]} { ...props } />);
  // NOTE Name for profiler and test for component
  Icon.displayName = `${icon.prefix}-${icon.iconName}-icon`;
  return Icon;
}
// console.log('fas', fas);
// @see https://fontawesome.com/v5/search
export const CogIcon = create(fas, 'faCog');
export const ListIcon = create(fas, 'faList');
export const UserIcon = create(fas, 'faUser');
export const BarsIcon = create(fas, 'faBars');
export const SortIcon = create(fas, 'faSort');
export const PlusIcon = create(fas, 'faPlus');
export const MinusIcon = create(fas, 'faMinus');
export const TrashIcon = create(fas, 'faTrash');
export const TimesIcon = create(fas, 'faTimes');
export const SearchIcon = create(fas, 'faSearch');
export const EditIcon = create(fas, 'faPencilAlt');
export const ListAltIcon = create(fas, 'faListAlt');
export const UserCogIcon = create(fas, 'faUserCog');
export const SignOutIcon = create(fas, 'faSignOutAlt');
export const EllipsisHIcon = create(fas, 'faEllipsisH');
export const ArrowRightIcon = create(fas, 'faArrowRight');
export const SortAmountUpIcon = create(fas, 'faSortAmountUp');
export const GraduationCapIcon = create(fas, 'faGraduationCap');
export const SortAmountDownIcon = create(fas, 'faSortAmountDown');
export const ExclamationTriangleIcon = create(fas, 'faExclamationTriangle');
