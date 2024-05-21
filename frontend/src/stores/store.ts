import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import community_forum_postsSlice from './community_forum_posts/community_forum_postsSlice';
import downloadsSlice from './downloads/downloadsSlice';
import feedback_and_surveysSlice from './feedback_and_surveys/feedback_and_surveysSlice';
import knowledge_base_articlesSlice from './knowledge_base_articles/knowledge_base_articlesSlice';
import organizationsSlice from './organizations/organizationsSlice';
import support_ticketsSlice from './support_tickets/support_ticketsSlice';
import training_and_tutorialsSlice from './training_and_tutorials/training_and_tutorialsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import settingsSlice from './settings/settingsSlice';
import mailSlice from './mail/mailSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    community_forum_posts: community_forum_postsSlice,
    downloads: downloadsSlice,
    feedback_and_surveys: feedback_and_surveysSlice,
    knowledge_base_articles: knowledge_base_articlesSlice,
    organizations: organizationsSlice,
    support_tickets: support_ticketsSlice,
    training_and_tutorials: training_and_tutorialsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    settings: settingsSlice,
    mail: mailSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
