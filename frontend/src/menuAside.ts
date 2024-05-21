import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/community_forum_posts/community_forum_posts-list',
    label: 'Community forum posts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiForum ? icon.mdiForum : icon.mdiTable,
    permissions: 'READ_COMMUNITY_FORUM_POSTS',
  },
  {
    href: '/downloads/downloads-list',
    label: 'Downloads',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDownload ? icon.mdiDownload : icon.mdiTable,
    permissions: 'READ_DOWNLOADS',
  },
  {
    href: '/feedback_and_surveys/feedback_and_surveys-list',
    label: 'Feedback and surveys',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCommentAlert ? icon.mdiCommentAlert : icon.mdiTable,
    permissions: 'READ_FEEDBACK_AND_SURVEYS',
  },
  {
    href: '/knowledge_base_articles/knowledge_base_articles-list',
    label: 'Knowledge base articles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBookOpenPageVariant
      ? icon.mdiBookOpenPageVariant
      : icon.mdiTable,
    permissions: 'READ_KNOWLEDGE_BASE_ARTICLES',
  },
  {
    href: '/organizations/organizations-list',
    label: 'Organizations',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDomain ? icon.mdiDomain : icon.mdiTable,
    permissions: 'READ_ORGANIZATIONS',
  },
  {
    href: '/support_tickets/support_tickets-list',
    label: 'Support tickets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTicket ? icon.mdiTicket : icon.mdiTable,
    permissions: 'READ_SUPPORT_TICKETS',
  },
  {
    href: '/training_and_tutorials/training_and_tutorials-list',
    label: 'Training and tutorials',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchool ? icon.mdiSchool : icon.mdiTable,
    permissions: 'READ_TRAINING_AND_TUTORIALS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/settings/settings-list',
    label: 'Settings',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_SETTINGS',
  },
  {
    href: '/mail/mail-list',
    label: 'Mail',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_MAIL',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
