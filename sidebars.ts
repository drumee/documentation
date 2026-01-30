import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started with Drumee',
        description: 'Learn how to install, configure, and deploy Drumee in minutes.',
        slug: '/getting-started',
      },
      items: [
        'getting-started/own-cloud',
        'getting-started/playground',
        'getting-started/plugins',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      link: {
        type: 'generated-index',
        title: 'Drumee Core Concepts',
        description: 'Understand the fundamental concepts behind Drumee Meta OS.',
        slug: '/concepts',
      },
      items: [
        'concepts/overview',
        'concepts/acl-system',
        'concepts/mfs',
        'concepts/letc-engine',
        'concepts/fig-styling',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'generated-index',
        title: 'Step-by-Step Guides',
        description: 'Practical guides for building with Drumee.',
        slug: '/guides',
      },
      items: [
        'guides/creating-widget',
        'guides/creating-service',
        'guides/permission-management',
        'guides/real-example-erp',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
        title: 'API Reference',
        description: 'Complete API documentation for Drumee components.',
        slug: '/api-reference',
      },
      items: [
        'api-reference/backend-api',
        'api-reference/frontend-sdk',
        'api-reference/stored-procedures',
        'api-reference/acl-spec',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      items: [
        'resources/glossary',
        'resources/faq',
        'resources/troubleshooting',
      ],
    },
  ],
};

export default sidebars;