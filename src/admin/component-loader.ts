import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  MyCustomAction: componentLoader.add('MyCustomAction', './my-custom-action'),
  // other custom components
};

export { componentLoader, Components };
