import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  ShowUserAction: componentLoader.add('ShowUserAction', './actions/show-user/show-user.action'),
  NewMatchAction: componentLoader.add('NewMatchAction', './actions/new-match/new-match.action'),
};

export { componentLoader, Components };
