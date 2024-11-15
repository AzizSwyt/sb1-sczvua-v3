import { AppLibraryItem, AppCategory } from '../types';

export const APP_CATEGORIES: AppCategory[] = [
  {
    id: 'communication',
    name: 'Communication',
    description: 'Team chat and video conferencing',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/chat-2639493-2187526.png'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Office tools and document management',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/office-2639487-2187520.png'
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Code and development tools',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/code-2639484-2187517.png'
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Design and creative tools',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/design-2639488-2187521.png'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Security and access management',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/security-2639492-2187525.png'
  }
];

export const APP_LIBRARY: AppLibraryItem[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration platform',
    category: 'communication',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/slack-2752072-2284889.png',
    defaultSteps: [
      {
        id: 'slack-1',
        title: 'Create Slack Account',
        description: 'Generate user account with company email',
        automated: true
      },
      {
        id: 'slack-2',
        title: 'Add to Channels',
        description: 'Add to #general, #announcements, and team channels',
        automated: true
      },
      {
        id: 'slack-3',
        title: 'Configure Profile',
        description: 'Set up profile picture and details',
        automated: false
      }
    ]
  },
  
  {
    id: 'gsuite',
    name: 'Google Workspace',
    description: 'Email, calendar, and document collaboration',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/google-2752069-2284886.png',
    defaultSteps: [
      {
        id: 'gsuite-1',
        title: 'Create Google Account',
        description: 'Set up company email and Google Workspace',
        automated: true
      },
      {
        id: 'gsuite-2',
        title: 'Configure Calendar',
        description: 'Set up calendar sharing and working hours',
        automated: true
      },
      {
        id: 'gsuite-3',
        title: 'Setup Drive Access',
        description: 'Grant access to team drives and shared folders',
        automated: true
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code hosting and version control',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/github-2752068-2284885.png',
    defaultSteps: [
      {
        id: 'github-1',
        title: 'Create GitHub Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'github-2',
        title: 'Add to Organization',
        description: 'Add user to company GitHub organization',
        automated: true
      },
      {
        id: 'github-3',
        title: 'Configure SSH Keys',
        description: 'Set up SSH authentication',
        automated: false
      },
      {
        id: 'github-4',
        title: 'Add to Teams',
        description: 'Add to relevant GitHub teams',
        automated: true
      }
    ]
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative design tool',
    category: 'design',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/figma-2752067-2284884.png',
    defaultSteps: [
      {
        id: 'figma-1',
        title: 'Create Figma Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'figma-2',
        title: 'Add to Organization',
        description: 'Add user to company Figma organization',
        automated: true
      },
      {
        id: 'figma-3',
        title: 'Grant Project Access',
        description: 'Add to relevant Figma projects',
        automated: true
      }
    ]
  },
  
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project and issue tracking',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/jira-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'jira-1',
        title: 'Create Jira Account',
        description: 'Set up account with SSO',
        automated: true
      },
      {
        id: 'jira-2',
        title: 'Configure Dashboard',
        description: 'Set up personal dashboard',
        automated: false
      },
      {
        id: 'jira-3',
        title: 'Add to Projects',
        description: 'Grant access to relevant projects',
        automated: true
      }
    ]
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Cloud infrastructure access',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/aws-2752064-2284881.png',
    defaultSteps: [
      {
        id: 'aws-1',
        title: 'Create IAM User',
        description: 'Set up AWS IAM user account',
        automated: true
      },
      {
        id: 'aws-2',
        title: 'Configure MFA',
        description: 'Set up multi-factor authentication',
        automated: false
      },
      {
        id: 'aws-3',
        title: 'Grant Permissions',
        description: 'Assign relevant IAM policies',
        automated: true
      }
    ]
  },
  {
    id: 'lastpass',
    name: 'LastPass',
    description: 'Password management',
    category: 'security',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/lastpass-2752071-2284888.png',
    defaultSteps: [
      {
        id: 'lastpass-1',
        title: 'Create Account',
        description: 'Set up LastPass Enterprise account',
        automated: true
      },
      {
        id: 'lastpass-2',
        title: 'Configure MFA',
        description: 'Set up multi-factor authentication',
        automated: false
      },
      {
        id: 'lastpass-3',
        title: 'Share Folders',
        description: 'Grant access to shared password folders',
        automated: true
      }
    ]
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Collaboration and communication platform',
    category: 'communication',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/microsoft-teams-2752081-2284898.png',
    defaultSteps: [
      {
        id: 'microsoft-teams-1',
        title: 'Create Teams Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'microsoft-teams-2',
        title: 'Add to Teams and Channels',
        description: 'Add user to relevant teams and channels',
        automated: true
      },
      {
        id: 'microsoft-teams-3',
        title: 'Configure Notifications',
        description: 'Set notification preferences',
        automated: false
      }
    ]
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Visual project management tool',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/trello-2752074-2284891.png',
    defaultSteps: [
      {
        id: 'trello-1',
        title: 'Create Trello Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'trello-2',
        title: 'Add to Boards',
        description: 'Add to relevant project boards',
        automated: true
      },
      {
        id: 'trello-3',
        title: 'Grant Admin Access',
        description: 'Assign board admin permissions if applicable',
        automated: false
      }
    ]
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'File sharing and storage',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/dropbox-2752076-2284893.png',
    defaultSteps: [
      {
        id: 'dropbox-1',
        title: 'Create Dropbox Account',
        description: 'Set up company Dropbox account',
        automated: true
      },
      {
        id: 'dropbox-2',
        title: 'Grant Folder Access',
        description: 'Share access to relevant folders',
        automated: true
      }
    ]
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Git-based source code repository hosting',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/bitbucket-2752077-2284894.png',
    defaultSteps: [
      {
        id: 'bitbucket-1',
        title: 'Create Bitbucket Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'bitbucket-2',
        title: 'Add to Workspace',
        description: 'Add user to company workspace',
        automated: true
      },
      {
        id: 'bitbucket-3',
        title: 'Configure SSH Keys',
        description: 'Set up SSH authentication',
        automated: false
      }
    ]
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Cloud collaboration and database platform',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/airtable-2752075-2284892.png',
    defaultSteps: [
      {
        id: 'airtable-1',
        title: 'Create Airtable Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'airtable-2',
        title: 'Add to Base',
        description: 'Grant access to relevant bases',
        automated: true
      }
    ]
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer support and ticketing platform',
    category: 'support',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/zendesk-2752078-2284895.png',
    defaultSteps: [
      {
        id: 'zendesk-1',
        title: 'Create Zendesk Account',
        description: 'Set up user account with company email',
        automated: true
      },
      {
        id: 'zendesk-2',
        title: 'Grant Ticket Access',
        description: 'Assign access to relevant ticket groups',
        automated: true
      }
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Customer relationship management platform',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/salesforce-2752080-2284897.png',
    defaultSteps: [
      {
        id: 'salesforce-1',
        title: 'Create Salesforce Account',
        description: 'Set up Salesforce user account',
        automated: true
      },
      {
        id: 'salesforce-2',
        title: 'Add to Roles and Profiles',
        description: 'Assign user to relevant roles and profiles',
        automated: true
      }
    ]
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    description: 'Task and project management tool',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/clickup-2752073-2284890.png',
    defaultSteps: [
      {
        id: 'clickup-1',
        title: 'Create ClickUp Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'clickup-2',
        title: 'Grant Workspace Access',
        description: 'Add user to relevant workspaces',
        automated: true
      }
    ]
  },

  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing, sales, and customer service platform',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/hubspot-2752077-2284894.png',
    defaultSteps: [
      {
        id: 'hubspot-1',
        title: 'Create HubSpot Account',
        description: 'Set up HubSpot user account',
        automated: true
      },
      {
        id: 'hubspot-2',
        title: 'Assign Permissions',
        description: 'Assign access based on role',
        automated: true
      }
    ]
  },
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'Work management and collaboration tool',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/monday-2752065-2284882.png',
    defaultSteps: [
      {
        id: 'monday-1',
        title: 'Create Monday Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'monday-2',
        title: 'Add to Workspace',
        description: 'Add to relevant boards and teams',
        automated: true
      }
    ]
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Graphic design and content creation tool',
    category: 'design',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/canva-2752066-2284883.png',
    defaultSteps: [
      {
        id: 'canva-1',
        title: 'Create Canva Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'canva-2',
        title: 'Grant Folder Access',
        description: 'Share relevant design folders',
        automated: true
      }
    ]
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-commerce platform for online stores',
    category: 'e-commerce',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/shopify-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'shopify-1',
        title: 'Create Shopify Account',
        description: 'Set up account with company credentials',
        automated: true
      },
      {
        id: 'shopify-2',
        title: 'Add to Store',
        description: 'Grant access to relevant stores',
        automated: true
      }
    ]
  },
  {
    id: 'zoominfo',
    name: 'ZoomInfo',
    description: 'Sales intelligence platform',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/zoominfo-2752082-2284899.png',
    defaultSteps: [
      {
        id: 'zoominfo-1',
        title: 'Create ZoomInfo Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'zoominfo-2',
        title: 'Configure Searches',
        description: 'Set default search filters and criteria',
        automated: false
      }
    ]
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation platform',
    category: 'marketing',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/mailchimp-2752072-2284889.png',
    defaultSteps: [
      {
        id: 'mailchimp-1',
        title: 'Create Mailchimp Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'mailchimp-2',
        title: 'Grant List Access',
        description: 'Add user to relevant email lists',
        automated: true
      }
    ]
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting software for small businesses',
    category: 'finance',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/quickbooks-2752079-2284896.png',
    defaultSteps: [
      {
        id: 'quickbooks-1',
        title: 'Create QuickBooks Account',
        description: 'Set up account with company credentials',
        automated: true
      },
      {
        id: 'quickbooks-2',
        title: 'Assign Role',
        description: 'Grant accounting or admin access',
        automated: true
      }
    ]
  },
  {
    id: 'intercom',
    name: 'Intercom',
    description: 'Customer communication platform',
    category: 'support',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/intercom-2752080-2284897.png',
    defaultSteps: [
      {
        id: 'intercom-1',
        title: 'Create Intercom Account',
        description: 'Set up user account with company email',
        automated: true
      },
      {
        id: 'intercom-2',
        title: 'Assign Inbox Access',
        description: 'Grant access to specific inboxes',
        automated: true
      }
    ]
  },
  {
    id: 'figjam',
    name: 'FigJam',
    description: 'Online whiteboard for teams',
    category: 'design',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/figjam-2752071-2284888.png',
    defaultSteps: [
      {
        id: 'figjam-1',
        title: 'Create FigJam Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'figjam-2',
        title: 'Grant Access',
        description: 'Share access to relevant boards',
        automated: true
      }
    ]
  },
  {
    id: 'heroku',
    name: 'Heroku',
    description: 'Cloud platform for application deployment',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/heroku-2752067-2284884.png',
    defaultSteps: [
      {
        id: 'heroku-1',
        title: 'Create Heroku Account',
        description: 'Set up account with company credentials',
        automated: true
      },
      {
        id: 'heroku-2',
        title: 'Grant Access to Apps',
        description: 'Add user to relevant Heroku projects',
        automated: true
      }
    ]
  },
  {
    id: 'freshdesk',
    name: 'Freshdesk',
    description: 'Customer support and ticketing platform',
    category: 'support',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/freshdesk-2752068-2284885.png',
    defaultSteps: [
      {
        id: 'freshdesk-1',
        title: 'Create Freshdesk Account',
        description: 'Set up user account with company email',
        automated: true
      },
      {
        id: 'freshdesk-2',
        title: 'Assign Groups',
        description: 'Add user to relevant support groups',
        automated: true
      }
    ]
  },
  {
    id: 'typeform',
    name: 'Typeform',
    description: 'Online survey and form creation',
    category: 'marketing',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/typeform-2752083-2284900.png',
    defaultSteps: [
      {
        id: 'typeform-1',
        title: 'Create Typeform Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'typeform-2',
        title: 'Share Form Access',
        description: 'Grant access to relevant forms',
        automated: true
      }
    ]
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales CRM and pipeline management',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/pipedrive-2752078-2284895.png',
    defaultSteps: [
      {
        id: 'pipedrive-1',
        title: 'Create Pipedrive Account',
        description: 'Set up CRM access for user',
        automated: true
      },
      {
        id: 'pipedrive-2',
        title: 'Assign Pipeline',
        description: 'Add user to specific sales pipelines',
        automated: true
      }
    ]
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    description: 'Design and video editing software suite',
    category: 'design',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/adobe-creative-cloud-2752063-2284880.png',
    defaultSteps: [
      {
        id: 'adobe-1',
        title: 'Assign Creative Cloud License',
        description: 'Grant license for relevant Adobe apps',
        automated: true
      },
      {
        id: 'adobe-2',
        title: 'Set up Application Access',
        description: 'Provide access to specific Adobe tools',
        automated: true
      }
    ]
  },
  {
    id: 'datadog',
    name: 'Datadog',
    description: 'Monitoring and analytics platform',
    category: 'analytics',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/datadog-2752065-2284882.png',
    defaultSteps: [
      {
        id: 'datadog-1',
        title: 'Create Datadog Account',
        description: 'Set up monitoring account with credentials',
        automated: true
      },
      {
        id: 'datadog-2',
        title: 'Grant Dashboard Access',
        description: 'Add user to specific monitoring dashboards',
        automated: true
      }
    ]
  },
  {
    id: 'pagerduty',
    name: 'PagerDuty',
    description: 'Incident management and response tool',
    category: 'operations',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/pagerduty-2752067-2284884.png',
    defaultSteps: [
      {
        id: 'pagerduty-1',
        title: 'Create PagerDuty Account',
        description: 'Set up user account with company email',
        automated: true
      },
      {
        id: 'pagerduty-2',
        title: 'Assign Escalation Policy',
        description: 'Add user to relevant incident response policies',
        automated: true
      }
    ]
  },
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    description: 'Password management platform',
    category: 'security',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/bitwarden-2752068-2284885.png',
    defaultSteps: [
      {
        id: 'bitwarden-1',
        title: 'Create Bitwarden Account',
        description: 'Set up enterprise password manager',
        automated: true
      },
      {
        id: 'bitwarden-2',
        title: 'Grant Vault Access',
        description: 'Share access to password vaults',
        automated: true
      }
    ]
  },
  {
    id: 'confluence',
    name: 'Confluence',
    description: 'Team collaboration and documentation tool',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/confluence-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'confluence-1',
        title: 'Create Confluence Account',
        description: 'Set up user with SSO login',
        automated: true
      },
      {
        id: 'confluence-2',
        title: 'Assign Space Access',
        description: 'Grant access to relevant spaces',
        automated: true
      }
    ]
  },
  
  {
    id: 'new-relic',
    name: 'New Relic',
    description: 'Application performance monitoring tool',
    category: 'analytics',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/new-relic-2752071-2284888.png',
    defaultSteps: [
      {
        id: 'new-relic-1',
        title: 'Create New Relic Account',
        description: 'Set up monitoring user account',
        automated: true
      },
      {
        id: 'new-relic-2',
        title: 'Grant Dashboard Access',
        description: 'Add user to specific monitoring views',
        automated: true
      }
    ]
  },
  {
    id: 'tableau',
    name: 'Tableau',
    description: 'Data visualization and analytics',
    category: 'analytics',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/tableau-2752072-2284889.png',
    defaultSteps: [
      {
        id: 'tableau-1',
        title: 'Create Tableau Account',
        description: 'Set up user account with credentials',
        automated: true
      },
      {
        id: 'tableau-2',
        title: 'Assign Project Access',
        description: 'Grant access to specific dashboards',
        automated: true
      }
    ]
  },
  {
    id: 'workday',
    name: 'Workday',
    description: 'HR and employee management platform',
    category: 'HR',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/workday-2752064-2284881.png',
    defaultSteps: [
      {
        id: 'workday-1',
        title: 'Create Workday Account',
        description: 'Set up employee account',
        automated: true
      },
      {
        id: 'workday-2',
        title: 'Assign Employee Profile',
        description: 'Grant access to HR tools',
        automated: true
      }
    ]
  },
  {
    id: 'sap-successfactors',
    name: 'SAP SuccessFactors',
    description: 'HR and talent management platform',
    category: 'HR',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/sap-2752066-2284883.png',
    defaultSteps: [
      {
        id: 'sap-1',
        title: 'Create SuccessFactors Account',
        description: 'Set up user profile for HR tools',
        automated: true
      },
      {
        id: 'sap-2',
        title: 'Grant Module Access',
        description: 'Add user to specific HR modules',
        automated: true
      }
    ]
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    description: 'Development and CI/CD tools',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/azure-2752062-2284879.png',
    defaultSteps: [
      {
        id: 'azure-devops-1',
        title: 'Create Azure DevOps Account',
        description: 'Set up user account',
        automated: true
      },
      {
        id: 'azure-devops-2',
        title: 'Grant Project Access',
        description: 'Assign to relevant DevOps projects',
        automated: true
      }
    ]
  },
  {
    id: 'jira-service-desk',
    name: 'Jira Service Desk',
    description: 'IT service management tool',
    category: 'support',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/jira-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'jira-service-1',
        title: 'Create Jira Service Desk Account',
        description: 'Set up user account',
        automated: true
      },
      {
        id: 'jira-service-2',
        title: 'Grant Queue Access',
        description: 'Add user to relevant ticket queues',
        automated: true
      }
    ]
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Accounting and invoicing platform',
    category: 'finance',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/xero-2752063-2284880.png',
    defaultSteps: [
      {
        id: 'xero-1',
        title: 'Create Xero Account',
        description: 'Set up accounting access',
        automated: true
      },
      {
        id: 'xero-2',
        title: 'Assign Finance Role',
        description: 'Grant permissions for finance tasks',
        automated: true
      }
    ]
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    description: 'Electronic signature platform',
    category: 'operations',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/docusign-2752064-2284881.png',
    defaultSteps: [
      {
        id: 'docusign-1',
        title: 'Create DocuSign Account',
        description: 'Set up user account for document signing',
        automated: true
      },
      {
        id: 'docusign-2',
        title: 'Grant Document Access',
        description: 'Assign user to relevant folders',
        automated: true
      }
    ]
  },
  {
    id: 'webex',
    name: 'Webex',
    description: 'Video conferencing platform',
    category: 'communication',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/webex-2752061-2284878.png',
    defaultSteps: [
      {
        id: 'webex-1',
        title: 'Create Webex Account',
        description: 'Set up conferencing account',
        automated: true
      },
      {
        id: 'webex-2',
        title: 'Grant Meeting Access',
        description: 'Add user to relevant rooms',
        automated: true
       }
    ]
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Customer relationship management platform',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/zoho-2752078-2284895.png',
    defaultSteps: [
      {
        id: 'zoho-crm-1',
        title: 'Create Zoho CRM Account',
        description: 'Set up CRM access for user',
        automated: true
      },
      {
        id: 'zoho-crm-2',
        title: 'Assign Lead Access',
        description: 'Grant access to lead and contact management',
        automated: true
      }
    ]
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    description: 'Business intelligence and data visualization tool',
    category: 'analytics',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/powerbi-2752069-2284886.png',
    defaultSteps: [
      {
        id: 'powerbi-1',
        title: 'Create Power BI Account',
        description: 'Set up user access to Power BI',
        automated: true
      },
      {
        id: 'powerbi-2',
        title: 'Grant Workspace Access',
        description: 'Add user to relevant workspaces',
        automated: true
      }
    ]
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes and team collaboration',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/notion-2752072-2284889.png',
    defaultSteps: [
      {
        id: 'notion-1',
        title: 'Create Notion Account',
        description: 'Set up user account with email',
        automated: true
      },
      {
        id: 'notion-2',
        title: 'Grant Workspace Access',
        description: 'Add user to relevant team spaces',
        automated: true
      }
    ]
  },
  {
    id: 'keka',
    name: 'Keka',
    description: 'HRMS and payroll software',
    category: 'HR',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/keka-2752082-2284900.png',
    defaultSteps: [
      {
        id: 'keka-1',
        title: 'Create Keka Account',
        description: 'Set up employee profile',
        automated: true
      },
      {
        id: 'keka-2',
        title: 'Grant Role Access',
        description: 'Add user to relevant HR modules',
        automated: true
      }
    ]
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'Web performance and security',
    category: 'operations',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/cloudflare-2752065-2284882.png',
    defaultSteps: [
      {
        id: 'cloudflare-1',
        title: 'Create Cloudflare Account',
        description: 'Set up user account for access',
        automated: true
      },
      {
        id: 'cloudflare-2',
        title: 'Grant Domain Permissions',
        description: 'Add user to domain and DNS management',
        automated: true
      }
    ]
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Video conferencing platform',
    category: 'communication',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/zoom-2752083-2284900.png',
    defaultSteps: [
      {
        id: 'zoom-1',
        title: 'Create Zoom Account',
        description: 'Set up user account with credentials',
        automated: true
      },
      {
        id: 'zoom-2',
        title: 'Configure Meeting Preferences',
        description: 'Set up default settings',
        automated: true
      }
    ]
  },
  {
    id: 'splunk',
    name: 'Splunk',
    description: 'Data monitoring and security tool',
    category: 'analytics',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/splunk-2752063-2284880.png',
    defaultSteps: [
      {
        id: 'splunk-1',
        title: 'Create Splunk Account',
        description: 'Set up monitoring user account',
        automated: true
      },
      {
        id: 'splunk-2',
        title: 'Grant Dashboard Access',
        description: 'Assign access to relevant logs and dashboards',
        automated: true
      }
    ]
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery platform',
    category: 'marketing',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/sendgrid-2752079-2284896.png',
    defaultSteps: [
      {
        id: 'sendgrid-1',
        title: 'Create SendGrid Account',
        description: 'Set up user access for email delivery',
        automated: true
      },
      {
        id: 'sendgrid-2',
        title: 'Grant API Key Access',
        description: 'Provide API keys for integrations',
        automated: true
      }
    ]
  },
  {
    id: 'gusto',
    name: 'Gusto',
    description: 'Payroll and HR software',
    category: 'HR',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/gusto-2752064-2284881.png',
    defaultSteps: [
      {
        id: 'gusto-1',
        title: 'Create Gusto Account',
        description: 'Set up payroll and benefits access',
        automated: true
      },
      {
        id: 'gusto-2',
        title: 'Add Employee Information',
        description: 'Input employee details for payroll',
        automated: false
      }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Online payment processing',
    category: 'finance',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/stripe-2752073-2284890.png',
    defaultSteps: [
      {
        id: 'stripe-1',
        title: 'Create Stripe Account',
        description: 'Set up payment processing account',
        automated: true
      },
      {
        id: 'stripe-2',
        title: 'Grant Finance Role',
        description: 'Assign permissions for payment management',
        automated: true
      }
    ]
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Version control and CI/CD',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/gitlab-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'gitlab-1',
        title: 'Create GitLab Account',
        description: 'Set up version control account',
        automated: true
      },
      {
        id: 'gitlab-2',
        title: 'Add to Project',
        description: 'Grant user access to relevant repositories',
        automated: true
      }
    ]
  },

  {
    id: 'mural',
    name: 'Mural',
    description: 'Collaborative online whiteboard platform',
    category: 'collaboration',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/mural-2752063-2284880.png',
    defaultSteps: [
      {
        id: 'mural-1',
        title: 'Create Mural Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'mural-2',
        title: 'Grant Workspace Access',
        description: 'Add user to team workspaces',
        automated: true
      }
    ]
  },
  {
    id: 'miro',
    name: 'Miro',
    description: 'Online whiteboard for team collaboration',
    category: 'collaboration',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/miro-2752064-2284881.png',
    defaultSteps: [
      {
        id: 'miro-1',
        title: 'Create Miro Account',
        description: 'Set up account with company credentials',
        automated: true
      },
      {
        id: 'miro-2',
        title: 'Add to Team Boards',
        description: 'Grant access to relevant boards',
        automated: true
      }
    ]
  },
  {
    id: 'evernote',
    name: 'Evernote',
    description: 'Note-taking and task management app',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/evernote-2752065-2284882.png',
    defaultSteps: [
      {
        id: 'evernote-1',
        title: 'Create Evernote Account',
        description: 'Set up account with company email',
        automated: true
      },
      {
        id: 'evernote-2',
        title: 'Grant Notebook Access',
        description: 'Add user to shared notebooks',
        automated: true
      }
    ]
  },
 
  {
    id: 'box',
    name: 'Box',
    description: 'Cloud file storage and sharing platform',
    category: 'file storage',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/box-2752067-2284884.png',
    defaultSteps: [
      {
        id: 'box-1',
        title: 'Create Box Account',
        description: 'Set up cloud storage account',
        automated: true
      },
      {
        id: 'box-2',
        title: 'Grant Folder Access',
        description: 'Add user to shared folders',
        automated: true
      }
    ]
  },
  {
    id: 'okta',
    name: 'Okta',
    description: 'Identity and access management platform',
    category: 'security',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/okta-2752068-2284885.png',
    defaultSteps: [
      {
        id: 'okta-1',
        title: 'Create Okta Account',
        description: 'Set up user identity profile',
        automated: true
      },
      {
        id: 'okta-2',
        title: 'Grant Application Access',
        description: 'Add user to required applications',
        automated: true
      }
    ]
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Task management and team collaboration tool',
    category: 'productivity',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/asana-2752069-2284886.png',
    defaultSteps: [
      {
        id: 'asana-1',
        title: 'Create Asana Account',
        description: 'Set up user task management profile',
        automated: true
      },
      {
        id: 'asana-2',
        title: 'Assign Project Access',
        description: 'Grant access to relevant team projects',
        automated: true
      }
    ]
  },
  {
    id: 'freshsales',
    name: 'Freshsales',
    description: 'Sales automation and CRM platform',
    category: 'sales',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/freshsales-2752070-2284887.png',
    defaultSteps: [
      {
        id: 'freshsales-1',
        title: 'Create Freshsales Account',
        description: 'Set up user CRM profile',
        automated: true
      },
      {
        id: 'freshsales-2',
        title: 'Assign Lead Access',
        description: 'Grant user access to lead management',
        automated: true
      }
    ]
  },
  {
    id: 'adobe-sign',
    name: 'Adobe Sign',
    description: 'Electronic signature platform',
    category: 'operations',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/adobe-sign-2752071-2284888.png',
    defaultSteps: [
      {
        id: 'adobe-sign-1',
        title: 'Create Adobe Sign Account',
        description: 'Set up electronic signature access',
        automated: true
      },
      {
        id: 'adobe-sign-2',
        title: 'Grant Document Access',
        description: 'Add user to relevant workflows',
        automated: true
      }
    ]
  },
  {
    id: 'microsoft-powerapps',
    name: 'Microsoft PowerApps',
    description: 'Low-code application development platform',
    category: 'development',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/powerapps-2752072-2284889.png',
    defaultSteps: [
      {
        id: 'powerapps-1',
        title: 'Create PowerApps Account',
        description: 'Set up low-code development access',
        automated: true
      },
      {
        id: 'powerapps-2',
        title: 'Grant App Permissions',
        description: 'Add user to app development teams',
        automated: true
      }
    ]
  },
  {
    id: 'atlassian-access',
    name: 'Atlassian Access',
    description: 'Enterprise-wide identity and access management',
    category: 'security',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/atlassian-2752073-2284890.png',
    defaultSteps: [
      {
        id: 'atlassian-access-1',
        title: 'Create Atlassian Access Account',
        description: 'Set up user identity profile',
        automated: true
      },
      {
        id: 'atlassian-access-2',
        title: 'Assign Product Access',
        description: 'Add user to required Atlassian tools',
        automated: true
      }
    ]
  },
  

];