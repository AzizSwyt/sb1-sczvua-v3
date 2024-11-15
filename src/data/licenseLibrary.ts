import { LicenseLibraryItem } from '../types';

export const LICENSE_LIBRARY: LicenseLibraryItem[] = [
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro',
    provider: 'Microsoft',
    type: 'perpetual',
    cost: 199.99,
    description: 'Professional edition of Windows 11',
    features: [
      'BitLocker encryption',
      'Remote desktop',
      'Windows Sandbox',
      'Hyper-V'
    ]
  },
  {
    id: 'office-365-e3',
    name: 'Microsoft 365 E3',
    provider: 'Microsoft',
    type: 'subscription',
    period: 'monthly',
    cost: 32.00,
    description: 'Enterprise Microsoft 365 suite',
    features: [
      'Office desktop apps',
      'Exchange Online',
      'SharePoint Online',
      'Teams'
    ]
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud',
    provider: 'Adobe',
    type: 'subscription',
    period: 'monthly',
    cost: 79.99,
    description: 'Complete creative suite',
    features: [
      'Photoshop',
      'Illustrator',
      'InDesign',
      'Premier Pro'
    ]
  },
  {
    id: 'jetbrains-all',
    name: 'JetBrains All Products Pack',
    provider: 'JetBrains',
    type: 'subscription',
    period: 'annual',
    cost: 649.00,
    description: 'Complete IDE suite',
    features: [
      'IntelliJ IDEA Ultimate',
      'WebStorm',
      'PyCharm Professional',
      'All other IDEs'
    ]
  },
  {
    id: 'vmware-workstation',
    name: 'VMware Workstation Pro',
    provider: 'VMware',
    type: 'perpetual',
    cost: 199.99,
    description: 'Professional virtualization software',
    features: [
      'Run multiple VMs',
      'Snapshot support',
      'Virtual networking',
      'High performance graphics'
    ]
  },
   {
    id: 'aws-ec2',
    name: 'AWS EC2 Reserved Instance',
    provider: 'Amazon Web Services',
    type: 'subscription',
    period: 'monthly',
    cost: 50.00,
    description: 'Reserved virtual servers in the cloud',
    features: [
      'Scalable compute capacity',
      'Flexible configurations',
      'Discounted pricing',
      'High availability'
    ]
  },
  {
    id: 'google-workspace-business',
    name: 'Google Workspace Business',
    provider: 'Google',
    type: 'subscription',
    period: 'monthly',
    cost: 12.00,
    description: 'Google’s suite of business tools',
    features: [
      'Gmail for business',
      'Google Drive storage',
      'Meet and Chat',
      'Docs, Sheets, Slides'
    ]
  },
  {
    id: 'slack-pro',
    name: 'Slack Pro',
    provider: 'Slack',
    type: 'subscription',
    period: 'monthly',
    cost: 7.25,
    description: 'Pro version of Slack for team collaboration',
    features: [
      'Unlimited message archive',
      'Group video calls',
      'Screen sharing',
      'Third-party integrations'
    ]
  },
  {
    id: 'github-enterprise',
    name: 'GitHub Enterprise',
    provider: 'GitHub',
    type: 'subscription',
    period: 'monthly',
    cost: 21.00,
    description: 'Advanced GitHub services for enterprises',
    features: [
      'Advanced auditing',
      'Code security features',
      'Customizable workflows',
      'Priority support'
    ]
  },
  {
    id: 'zoom-business',
    name: 'Zoom Business',
    provider: 'Zoom',
    type: 'subscription',
    period: 'monthly',
    cost: 19.99,
    description: 'Business-tier video conferencing',
    features: [
      '300 participant meetings',
      'Recording transcription',
      'Branding options',
      'Admin dashboard'
    ]
  },
  {
    id: 'salesforce-sales-cloud',
    name: 'Salesforce Sales Cloud',
    provider: 'Salesforce',
    type: 'subscription',
    period: 'monthly',
    cost: 75.00,
    description: 'CRM for sales teams',
    features: [
      'Lead management',
      'Opportunity tracking',
      'Custom dashboards',
      'Mobile app'
    ]
  },
  {
    id: 'asana-premium',
    name: 'Asana Premium',
    provider: 'Asana',
    type: 'subscription',
    period: 'monthly',
    cost: 10.99,
    description: 'Premium task and project management',
    features: [
      'Timeline view',
      'Custom fields',
      'Task dependencies',
      'Advanced reporting'
    ]
  },
  {
    id: 'notion-team',
    name: 'Notion Team Plan',
    provider: 'Notion',
    type: 'subscription',
    period: 'monthly',
    cost: 8.00,
    description: 'Collaboration and knowledge management',
    features: [
      'Unlimited team members',
      'Custom permissions',
      'Version history',
      'Integrations'
    ]
  },
  {
    id: 'monday-com-pro',
    name: 'Monday.com Pro',
    provider: 'Monday.com',
    type: 'subscription',
    period: 'monthly',
    cost: 16.00,
    description: 'Advanced work management platform',
    features: [
      'Private boards',
      'Time tracking',
      'Advanced reporting',
      'Custom integrations'
    ]
  },
  {
    id: 'tableau-desktop',
    name: 'Tableau Desktop',
    provider: 'Tableau',
    type: 'perpetual',
    cost: 999.00,
    description: 'Business intelligence software',
    features: [
      'Interactive dashboards',
      'Data blending',
      'Advanced analytics',
      'Server publishing'
    ]
  },
  {
    id: 'aws-rds',
    name: 'AWS RDS Instance',
    provider: 'Amazon Web Services',
    type: 'subscription',
    period: 'monthly',
    cost: 20.00,
    description: 'Managed database service',
    features: [
      'Automatic backups',
      'Multi-AZ deployment',
      'High availability',
      'Scalable database'
    ]
  },
  {
    id: 'zoom-phone-pro',
    name: 'Zoom Phone Pro',
    provider: 'Zoom',
    type: 'subscription',
    period: 'monthly',
    cost: 15.00,
    description: 'Professional phone system',
    features: [
      'Call management',
      'Voicemail transcription',
      'International calling',
      'CRM integrations'
    ]
  },
  {
    id: 'autodesk-autocad',
    name: 'Autodesk AutoCAD',
    provider: 'Autodesk',
    type: 'subscription',
    period: 'annual',
    cost: 1690.00,
    description: 'CAD software for 2D and 3D design',
    features: [
      '2D drafting',
      '3D modeling',
      'Cloud storage',
      'DWG format support'
    ]
  },
  {
    id: 'dropbox-business',
    name: 'Dropbox Business Standard',
    provider: 'Dropbox',
    type: 'subscription',
    period: 'monthly',
    cost: 15.00,
    description: 'Business-focused cloud storage',
    features: [
      '5 TB storage',
      'File recovery',
      'Team folders',
      'Third-party integrations'
    ]
  },
  {
    id: 'figma-team',
    name: 'Figma Team Plan',
    provider: 'Figma',
    type: 'subscription',
    period: 'monthly',
    cost: 12.00,
    description: 'Collaborative interface design',
    features: [
      'Team libraries',
      'Prototyping',
      'Version history',
      'Unlimited projects'
    ]
  },
  {
    id: 'hubspot-marketing-pro',
    name: 'HubSpot Marketing Hub Pro',
    provider: 'HubSpot',
    type: 'subscription',
    period: 'monthly',
    cost: 800.00,
    description: 'Advanced marketing platform',
    features: [
      'Lead generation',
      'Marketing automation',
      'Custom reporting',
      'Ad management'
    ]
  },
  {
    id: 'freshdesk-pro',
    name: 'Freshdesk Pro',
    provider: 'Freshdesk',
    type: 'subscription',
    period: 'monthly',
    cost: 49.00,
    description: 'Customer support software',
    features: [
      'Custom ticket fields',
      'Helpdesk automation',
      'Customer portal',
      'SLA management'
    ]
  },
  {
    id: 'bitbucket-premium',
    name: 'Bitbucket Premium',
    provider: 'Atlassian',
    type: 'subscription',
    period: 'monthly',
    cost: 6.00,
    description: 'Advanced Git repository management',
    features: [
      'Merge checks',
      'Deployment permissions',
      'Advanced security',
      'Unlimited repositories'
    ]
  },
  {
    id: 'zendesk-support-pro',
    name: 'Zendesk Support Pro',
    provider: 'Zendesk',
    type: 'subscription',
    period: 'monthly',
    cost: 59.00,
    description: 'Customer support software',
    features: [
      'Multi-channel support',
      'Macros and triggers',
      'Customer satisfaction ratings',
      'API access'
    ]
  },
  {
    id: 'sap-business-one',
    name: 'SAP Business One',
    provider: 'SAP',
    type: 'perpetual',
    cost: 4000.00,
    description: 'ERP software for small and midsize businesses',
    features: [
      'Financial management',
      'Inventory control',
      'Sales and customer management',
      'Reporting tools'
    ]
  },
  {
    id: 'quickbooks-online-plus',
    name: 'QuickBooks Online Plus',
    provider: 'Intuit',
    type: 'subscription',
    period: 'monthly',
    cost: 85.00,
    description: 'Cloud-based accounting software',
    features: [
      'Expense tracking',
      'Invoicing and payments',
      'Inventory management',
      'Time tracking'
    ]
  },
  {
    id: 'twilio-flex',
    name: 'Twilio Flex',
    provider: 'Twilio',
    type: 'subscription',
    period: 'monthly',
    cost: 150.00,
    description: 'Cloud-based contact center',
    features: [
      'Programmable UI',
      'Omnichannel support',
      'Real-time analytics',
      'CRM integration'
    ]
  },
  {
    id: 'atlassian-jira-software-premium',
    name: 'Atlassian Jira Software Premium',
    provider: 'Atlassian',
    type: 'subscription',
    period: 'monthly',
    cost: 14.50,
    description: 'Advanced project tracking software',
    features: [
      'Advanced roadmaps',
      'Automation rules',
      'Insight asset management',
      '24/7 premium support'
    ]
  },
  {
    id: 'confluence-premium',
    name: 'Atlassian Confluence Premium',
    provider: 'Atlassian',
    type: 'subscription',
    period: 'monthly',
    cost: 10.50,
    description: 'Team collaboration platform',
    features: [
      'Analytics insights',
      'Advanced permissions',
      'Team calendars',
      'Priority support'
    ]
  },
  {
    id: 'trello-enterprise',
    name: 'Trello Enterprise',
    provider: 'Atlassian',
    type: 'subscription',
    period: 'monthly',
    cost: 17.50,
    description: 'Advanced project management tool',
    features: [
      'Unlimited workspaces',
      'Power-up integrations',
      'Admin controls',
      'Automation'
    ]
  },
  {
    id: 'docusign-business-pro',
    name: 'DocuSign Business Pro',
    provider: 'DocuSign',
    type: 'subscription',
    period: 'monthly',
    cost: 40.00,
    description: 'Electronic signature platform',
    features: [
      'Signer authentication',
      'Custom branding',
      'Document routing',
      'Audit trail'
    ]
  },
  {
    id: 'okta-identity-cloud',
    name: 'Okta Identity Cloud',
    provider: 'Okta',
    type: 'subscription',
    period: 'monthly',
    cost: 15.00,
    description: 'Identity management and SSO',
    features: [
      'SSO for apps',
      'MFA security',
      'Lifecycle management',
      'Access monitoring'
    ]
  },
  {
    id: 'workday-hcm',
    name: 'Workday Human Capital Management',
    provider: 'Workday',
    type: 'subscription',
    period: 'annual',
    cost: 600.00,
    description: 'HR and workforce management',
    features: [
      'Payroll integration',
      'Talent management',
      'Time tracking',
      'Employee analytics'
    ]
  },
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    provider: 'Amazon Web Services',
    type: 'pay-as-you-go',
    cost: '0.20 per million requests',
    description: 'Serverless computing',
    features: [
      'Event-driven execution',
      'No server management',
      'Scalable performance',
      'Multiple runtimes'
    ]
  },
  {
    id: 'kaspersky-endpoint-security',
    name: 'Kaspersky Endpoint Security',
    provider: 'Kaspersky',
    type: 'subscription',
    period: 'annual',
    cost: 55.00,
    description: 'Advanced endpoint security',
    features: [
      'Anti-malware',
      'Firewall protection',
      'Data encryption',
      'Mobile device management'
    ]
  },
  {
    id: 'lastpass-business',
    name: 'LastPass Business',
    provider: 'LastPass',
    type: 'subscription',
    period: 'monthly',
    cost: 6.00,
    description: 'Password management for businesses',
    features: [
      'Centralized admin control',
      'Secure password sharing',
      'SAML SSO integration',
      'Dark web monitoring'
    ]
  },
  {
    id: 'linkedin-sales-navigator',
    name: 'LinkedIn Sales Navigator',
    provider: 'LinkedIn',
    type: 'subscription',
    period: 'monthly',
    cost: 79.99,
    description: 'Sales prospecting and lead generation',
    features: [
      'Advanced lead filters',
      'CRM integrations',
      'InMail messaging',
      'Team collaboration'
    ]
  },
  {
    id: 'airtable-pro',
    name: 'Airtable Pro',
    provider: 'Airtable',
    type: 'subscription',
    period: 'monthly',
    cost: 20.00,
    description: 'Flexible database for teams',
    features: [
      'Advanced reporting',
      'Custom views',
      'Increased storage',
      'Automation features'
    ]
  },
  {
    id: 'splunk-cloud',
    name: 'Splunk Cloud',
    provider: 'Splunk',
    type: 'subscription',
    period: 'monthly',
    cost: 150.00,
    description: 'Cloud-based log management',
    features: [
      'Real-time monitoring',
      'Custom dashboards',
      'Log analytics',
      'Data visualization'
    ]
  },
  {
    id: 'shopify-plus',
    name: 'Shopify Plus',
    provider: 'Shopify',
    type: 'subscription',
    period: 'monthly',
    cost: 2000.00,
    description: 'Enterprise e-commerce platform',
    features: [
      'Custom checkout',
      'High-volume sales',
      'Advanced automation',
      'API access'
    ]
  },
  {
    id: 'matlab-standard',
    name: 'MATLAB Standard',
    provider: 'MathWorks',
    type: 'subscription',
    period: 'annual',
    cost: 940.00,
    description: 'Numerical computing software',
    features: [
      'Data analysis',
      'Visualization tools',
      'Algorithm development',
      'Simulink support'
    ]
  },
  {
    id: 'autodesk-revit',
    name: 'Autodesk Revit',
    provider: 'Autodesk',
    type: 'subscription',
    period: 'annual',
    cost: 2250.00,
    description: 'Building information modeling (BIM)',
    features: [
      'Architectural design',
      'MEP modeling',
      'Structural engineering',
      'Cloud collaboration'
    ]
  },
  {
    id: 'sap-analytics-cloud',
    name: 'SAP Analytics Cloud',
    provider: 'SAP',
    type: 'subscription',
    period: 'annual',
    cost: 250.00,
    description: 'Business intelligence platform',
    features: [
      'Data visualization',
      'Predictive analytics',
      'Planning tools',
      'Enterprise integration'
    ]
  },
  {
    id: 'microsoft-azure-vm',
    name: 'Microsoft Azure Virtual Machines',
    provider: 'Microsoft',
    type: 'pay-as-you-go',
    cost: 'Variable',
    description: 'Scalable virtual machines on Azure',
    features: [
      'Custom configurations',
      'High availability',
      'Secure network',
      'Disaster recovery'
    ]
  },
  {
    id: 'bluejeans-meetings',
    name: 'BlueJeans Meetings',
    provider: 'BlueJeans',
    type: 'subscription',
    period: 'monthly',
    cost: 12.49,
    description: 'Video conferencing platform',
    features: [
      'HD video quality',
      'Virtual backgrounds',
      'Meeting transcription',
      'Calendar integrations'
    ]
  },
  {
    id: 'box-business',
    name: 'Box Business Plan',
    provider: 'Box',
    type: 'subscription',
    period: 'monthly',
    cost: 15.00,
    description: 'Secure cloud content management',
    features: [
      'Unlimited storage',
      'Advanced collaboration',
      'File encryption',
      'Admin controls'
    ]
  },
  {
    id: 'vimeo-premium',
    name: 'Vimeo Premium',
    provider: 'Vimeo',
    type: 'subscription',
    period: 'monthly',
    cost: 50.00,
    description: 'Advanced video hosting and marketing',
    features: [
      'Unlimited live streaming',
      'Custom branding',
      'Advanced analytics',
      'Collaboration tools'
    ]
  },
  {
    id: 'adobe-acrobat-pro',
    name: 'Adobe Acrobat Pro',
    provider: 'Adobe',
    type: 'subscription',
    period: 'monthly',
    cost: 14.99,
    description: 'Professional PDF tools',
    features: [
      'PDF editing',
      'E-signatures',
      'File compression',
      'OCR functionality'
    ]
  },
  {
    id: 'autodesk-maya',
    name: 'Autodesk Maya',
    provider: 'Autodesk',
    type: 'subscription',
    period: 'annual',
    cost: 1620.00,
    description: '3D modeling and animation software',
    features: [
      '3D rendering',
      'Character animation',
      'Motion graphics',
      'Simulation tools'
    ]
  },
  {
    id: 'datadog-pro',
    name: 'Datadog Pro',
    provider: 'Datadog',
    type: 'subscription',
    period: 'monthly',
    cost: 15.00,
    description: 'Cloud monitoring and security',
    features: [
      'Infrastructure monitoring',
      'Log management',
      'APM tools',
      'Real-time dashboards'
    ]
  },
  {
    id: 'zoom-events',
    name: 'Zoom Events',
    provider: 'Zoom',
    type: 'subscription',
    period: 'monthly',
    cost: 99.99,
    description: 'Platform for hosting virtual events',
    features: [
      'Event hubs',
      'Multi-session events',
      'Brand customization',
      'Analytics dashboard'
    ]
  },
  {
    id: 'google-cloud-storage',
    name: 'Google Cloud Storage',
    provider: 'Google',
    type: 'pay-as-you-go',
    cost: '0.02 per GB',
    description: 'Scalable cloud storage',
    features: [
      'Global availability',
      'Multi-region redundancy',
      'Advanced security',
      'Flexible pricing'
    ]
  },
  {
    id: 'asana-enterprise',
    name: 'Asana Enterprise',
    provider: 'Asana',
    type: 'subscription',
    period: 'monthly',
    cost: 24.99,
    description: 'Enterprise-grade project management',
    features: [
      'Advanced security',
      'Custom templates',
      'Workflow automation',
      'Priority support'
    ]
  },
  {
    id: 'trellix-endpoint-security',
    name: 'Trellix Endpoint Security',
    provider: 'Trellix',
    type: 'subscription',
    period: 'annual',
    cost: 65.00,
    description: 'Comprehensive endpoint protection',
    features: [
      'Anti-virus',
      'Threat prevention',
      'Encryption management',
      'Behavioral analytics'
    ]
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    provider: 'Canva',
    type: 'subscription',
    period: 'monthly',
    cost: 12.99,
    description: 'Design and publishing platform',
    features: [
      'Unlimited content',
      'Brand kit',
      'Magic Resize',
      'Team collaboration'
    ]
  },
  {
    id: 'pluralsight-business',
    name: 'Pluralsight Business',
    provider: 'Pluralsight',
    type: 'subscription',
    period: 'monthly',
    cost: 39.00,
    description: 'Tech and skill training for teams',
    features: [
      'Skill assessments',
      'Course tracking',
      'Team analytics',
      'Certifications'
    ]
  },
  {
    id: 'cisco-webex-premium',
    name: 'Cisco Webex Premium',
    provider: 'Cisco',
    type: 'subscription',
    period: 'monthly',
    cost: 29.95,
    description: 'Secure video conferencing',
    features: [
      'HD meetings',
      'End-to-end encryption',
      'Team messaging',
      'File sharing'
    ]
  },
  {
    id: 'shopify-basic',
    name: 'Shopify Basic Plan',
    provider: 'Shopify',
    type: 'subscription',
    period: 'monthly',
    cost: 29.00,
    description: 'Basic e-commerce platform',
    features: [
      'Online store',
      'Unlimited products',
      'Staff accounts',
      'Discount codes'
    ]
  },
  {
    id: 'oracle-database-cloud',
    name: 'Oracle Database Cloud',
    provider: 'Oracle',
    type: 'subscription',
    period: 'monthly',
    cost: 300.00,
    description: 'Cloud-based database services',
    features: [
      'Data warehousing',
      'Auto scaling',
      'Advanced analytics',
      'Integrated security'
    ]
  },
  {
    id: 'zendesk-chat-premium',
    name: 'Zendesk Chat Premium',
    provider: 'Zendesk',
    type: 'subscription',
    period: 'monthly',
    cost: 14.00,
    description: 'Live chat software for support teams',
    features: [
      'Real-time chat',
      'File sharing',
      'Chat triggers',
      'Customer analytics'
    ]
  },
  {
    id: 'splunk-security-cloud',
    name: 'Splunk Security Cloud',
    provider: 'Splunk',
    type: 'subscription',
    period: 'monthly',
    cost: 250.00,
    description: 'Security analytics platform',
    features: [
      'Threat detection',
      'Log monitoring',
      'Real-time alerts',
      'AI-driven insights'
    ]
  },
  {
    id: 'aws-s3',
    name: 'AWS S3 Storage',
    provider: 'Amazon Web Services',
    type: 'pay-as-you-go',
    cost: '0.023 per GB',
    description: 'Highly scalable object storage',
    features: [
      'Versioning',
      'Data lifecycle policies',
      'Multi-region availability',
      'Advanced security'
    ]
  },
  {
    id: 'microsoft-power-bi-pro',
    name: 'Microsoft Power BI Pro',
    provider: 'Microsoft',
    type: 'subscription',
    period: 'monthly',
    cost: 9.99,
    description: 'Data visualization and reporting tool',
    features: [
      'Interactive dashboards',
      'Cloud data connections',
      'Collaboration tools',
      'Mobile app access'
    ]
  },
  {
    id: 'tableau-server',
    name: 'Tableau Server',
    provider: 'Tableau',
    type: 'subscription',
    period: 'annual',
    cost: 840.00,
    description: 'Enterprise analytics platform',
    features: [
      'Secure sharing',
      'Data governance',
      'Collaborative dashboards',
      'Server automation'
    ]
  },
  {
    id: 'norton-360-premium',
    name: 'Norton 360 Premium',
    provider: 'Norton',
    type: 'subscription',
    period: 'annual',
    cost: 124.99,
    description: 'Comprehensive security solution',
    features: [
      'Anti-virus',
      'VPN',
      'Password manager',
      'Dark web monitoring'
    ]
  },
  {
    id: 'figma-enterprise',
    name: 'Figma Enterprise',
    provider: 'Figma',
    type: 'subscription',
    period: 'monthly',
    cost: 45.00,
    description: 'Collaborative design tool for enterprises',
    features: [
      'Advanced admin controls',
      'Audit logs',
      'Private plugins',
      'Enterprise-level security'
    ]
  },
  {
    id: 'bitdefender-gravityzone',
    name: 'Bitdefender GravityZone',
    provider: 'Bitdefender',
    type: 'subscription',
    period: 'annual',
    cost: 89.99,
    description: 'Endpoint security and threat detection',
    features: [
      'Advanced threat defense',
      'Ransomware protection',
      'Firewall',
      'Risk management'
    ]
  },
  {
    id: 'aws-elastic-beanstalk',
    name: 'AWS Elastic Beanstalk',
    provider: 'Amazon Web Services',
    type: 'pay-as-you-go',
    cost: 'Varies by usage',
    description: 'Platform for deploying and managing apps',
    features: [
      'Auto-scaling',
      'Integrated monitoring',
      'Managed updates',
      'Load balancing'
    ]
  },
  {
    id: 'adobe-premiere-pro',
    name: 'Adobe Premiere Pro',
    provider: 'Adobe',
    type: 'subscription',
    period: 'monthly',
    cost: 20.99,
    description: 'Professional video editing software',
    features: [
      'Timeline editing',
      'Motion graphics',
      'Color grading',
      'Audio mixing'
    ]
  },
  {
    id: 'sap-successfactors',
    name: 'SAP SuccessFactors',
    provider: 'SAP',
    type: 'subscription',
    period: 'annual',
    cost: 600.00,
    description: 'Cloud-based HR management',
    features: [
      'Employee central',
      'Performance management',
      'Learning and development',
      'Analytics and reporting'
    ]
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    provider: 'GitHub',
    type: 'pay-as-you-go',
    cost: 'Varies by usage',
    description: 'CI/CD pipeline automation',
    features: [
      'Custom workflows',
      'Event triggers',
      'Docker support',
      'Integration with repositories'
    ]
  },
  {
    id: 'freshworks-crm',
    name: 'Freshworks CRM',
    provider: 'Freshworks',
    type: 'subscription',
    period: 'monthly',
    cost: 35.00,
    description: 'Customer relationship management platform',
    features: [
      'Lead scoring',
      'Email campaigns',
      'Sales automation',
      'Pipeline management'
    ]
  },
  {
    id: 'microsoft-visual-studio-enterprise',
    name: 'Microsoft Visual Studio Enterprise',
    provider: 'Microsoft',
    type: 'subscription',
    period: 'annual',
    cost: 599.00,
    description: 'Comprehensive IDE for enterprises',
    features: [
      'Code profiling',
      'Advanced debugging',
      'Cloud integration',
      'DevOps support'
    ]
  },
  {
    id: 'aws-cloudfront',
    name: 'AWS CloudFront',
    provider: 'Amazon Web Services',
    type: 'pay-as-you-go',
    cost: 'Varies by data transfer',
    description: 'Content delivery network',
    features: [
      'Low-latency delivery',
      'DDoS protection',
      'Global edge locations',
      'Custom SSL'
    ]
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    provider: 'LinkedIn',
    type: 'subscription',
    period: 'monthly',
    cost: 29.99,
    description: 'Online learning platform for professionals',
    features: [
      'Skill assessments',
      'Certificates of completion',
      'Offline viewing',
      'Custom learning paths'
    ]
  },
  {
    id: 'zoom-rooms',
    name: 'Zoom Rooms',
    provider: 'Zoom',
    type: 'subscription',
    period: 'monthly',
    cost: 49.00,
    description: 'Virtual meeting rooms',
    features: [
      'Room scheduling display',
      'Wireless screen sharing',
      'Meeting analytics',
      'HD video conferencing'
    ]
  },
  {
    id: 'autodesk-inventor',
    name: 'Autodesk Inventor',
    provider: 'Autodesk',
    type: 'subscription',
    period: 'annual',
    cost: 1985.00,
    description: '3D CAD software for product design',
    features: [
      'Parametric modeling',
      'Simulation tools',
      'Sheet metal design',
      'Assembly visualization'
    ]
  },
  {
    id: 'fortinet-fortigate',
    name: 'Fortinet FortiGate Firewall',
    provider: 'Fortinet',
    type: 'perpetual',
    cost: 995.00,
    description: 'Enterprise firewall solution',
    features: [
      'Web filtering',
      'Intrusion prevention',
      'Application control',
      'VPN support'
    ]
  },
  {
    id: 'dropbox-professional',
    name: 'Dropbox Professional',
    provider: 'Dropbox',
    type: 'subscription',
    period: 'monthly',
    cost: 16.58,
    description: 'Cloud storage for professionals',
    features: [
      '3 TB storage',
      'Smart Sync',
      'File version history',
      'Priority support'
    ]
  },
  {
    id: 'paloalto-globalprotect',
    name: 'Palo Alto GlobalProtect',
    provider: 'Palo Alto Networks',
    type: 'subscription',
    period: 'annual',
    cost: 99.00,
    description: 'Enterprise-grade VPN solution',
    features: [
      'Secure remote access',
      'Threat protection',
      'Device management',
      'Zero Trust security'
    ]
  },
  {
    id: 'monday-com-enterprise',
    name: 'Monday.com Enterprise',
    provider: 'Monday.com',
    type: 'subscription',
    period: 'monthly',
    cost: 49.00,
    description: 'Project management for large organizations',
    features: [
      'Advanced automation',
      'Enterprise-grade security',
      'Custom integrations',
      'Priority support'
    ]
  },
  {
    id: 'newrelic-one',
    name: 'New Relic One',
    provider: 'New Relic',
    type: 'subscription',
    period: 'monthly',
    cost: 99.00,
    description: 'Application performance monitoring',
    features: [
      'Full-stack observability',
      'Real-time alerts',
      'Custom dashboards',
      'Log management'
    ]
  },
  {
    id: 'oracle-erp-cloud',
    name: 'Oracle ERP Cloud',
    provider: 'Oracle',
    type: 'subscription',
    period: 'annual',
    cost: 1200.00,
    description: 'Cloud-based ERP system',
    features: [
      'Financial management',
      'Procurement',
      'Risk management',
      'Project planning'
    ]
  },
  {
    id: 'aws-glue',
    name: 'AWS Glue',
    provider: 'Amazon Web Services',
    type: 'pay-as-you-go',
    cost: '0.44 per DPU-hour',
    description: 'Serverless data integration service',
    features: [
      'ETL automation',
      'Schema discovery',
      'Data cataloging',
      'Workflow orchestration'
    ]
  }
];