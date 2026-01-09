import { ComponentLoader } from 'adminjs';
import IncomeSourcesEdit from './IncomeSourcesEdit.js';

const componentLoader = new ComponentLoader();

const Components = {
  ShowUserAction: componentLoader.add('ShowUserAction', './show-user/show-user.action'),
  NewMatchAction: componentLoader.add('NewMatchAction', './new-match.action'),
  ShowArrayEnumsAction: componentLoader.add('ShowArrayEnumsAction', './show-array-enums.action'),
  EditArrayEnumsAction: componentLoader.add('EditArrayEnumsAction', './edit-array-enums.action'),
  EnumArrayEditAction: componentLoader.add('EnumArrayEditAction', './EnumArrayEdit'),
  IncomeSourcesEditAction: componentLoader.add('IncomeSourcesEditAction', './IncomeSourcesEdit'),
};

export { componentLoader, Components };
