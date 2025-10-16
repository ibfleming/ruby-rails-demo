import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Automatically import all React components from the components folder.
 * Uses Vite's glob import with eager loading for synchronous access.
 */
const componentModules = import.meta.glob('../components/*.jsx', { eager: true });

/**
 * Build component registry from imported modules.
 * Maps component names (filenames without extension) to their default exports.
 */
const COMPONENTS = Object.entries(componentModules).reduce((registry, [path, module]) => {
  const componentName = path.split('/').pop().replace('.jsx', '');
  
  if (!module.default) {
    console.warn(`Component at ${path} does not have a default export`);
    return registry;
  }
  
  registry[componentName] = module.default;
  return registry;
}, {});

// Log available components in development
if (import.meta.env.DEV) {
  console.log('Registered React components:', Object.keys(COMPONENTS));
}

/**
 * Mounts React components on DOM elements with data-react-component attribute.
 * Each component receives props from data-props attribute (JSON format).
 */
const mountReactComponents = () => {
  const containers = document.querySelectorAll('[data-react-component]');
  
  if (containers.length === 0) {
    return;
  }
  
  containers.forEach((container) => {
    const componentName = container.dataset.reactComponent;
    
    if (!componentName) {
      console.error('Component container missing data-react-component attribute', container);
      return;
    }
    
    const Component = COMPONENTS[componentName];
    
    if (!Component) {
      console.error(
        `React component "${componentName}" not found in registry. Available: ${Object.keys(COMPONENTS).join(', ')}`
      );
      return;
    }
    
    // Prevent double mounting
    if (container.hasAttribute('data-react-mounted')) {
      return;
    }
    
    try {
      const propsData = container.dataset.props;
      const props = propsData ? JSON.parse(propsData) : {};
      
      const root = createRoot(container);
      root.render(<Component {...props} />);
      
      // Mark as mounted
      container.setAttribute('data-react-mounted', 'true');
    } catch (error) {
      console.error(`Failed to mount component "${componentName}":`, error);
      console.error('Container:', container);
      console.error('Props data:', container.dataset.props);
    }
  });
};

// Mount components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountReactComponents);
} else {
  // DOM already loaded (e.g., script loaded async)
  mountReactComponents();
}
