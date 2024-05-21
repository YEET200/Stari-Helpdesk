const db = require('../models');
const Users = db.users;

const CommunityForumPosts = db.community_forum_posts;

const Downloads = db.downloads;

const FeedbackAndSurveys = db.feedback_and_surveys;

const KnowledgeBaseArticles = db.knowledge_base_articles;

const Organizations = db.organizations;

const SupportTickets = db.support_tickets;

const TrainingAndTutorials = db.training_and_tutorials;

const Settings = db.settings;

const Mail = db.mail;

const CommunityForumPostsData = [
  {
    title: 'Welcome to the community!',

    content: 'Introduce yourself and get to know other members...',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Tips for using our product',

    content: 'Share your tips and tricks for using our product...',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Feature requests',

    content: 'Suggest new features you would like to see...',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'General discussion',

    content: 'Discuss anything related to our product...',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Troubleshooting common issues',

    content: 'Share solutions to common issues faced by users...',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const DownloadsData = [
  {
    title: 'Latest Software Update',

    // type code here for "files" field

    category: 'drivers',
  },

  {
    title: 'Driver for XYZ Hardware',

    // type code here for "files" field

    category: 'mobile_apps',
  },

  {
    title: 'Template for Reports',

    // type code here for "files" field

    category: 'software_updates',
  },

  {
    title: 'Mobile App for Android',

    // type code here for "files" field

    category: 'mobile_apps',
  },

  {
    title: 'Mobile App for iOS',

    // type code here for "files" field

    category: 'drivers',
  },
];

const FeedbackAndSurveysData = [
  {
    title: 'Product Feedback',

    content: 'Please provide your feedback on our product.',

    type: 'surveys',

    // type code here for "relation_one" field
  },

  {
    title: 'Customer Satisfaction Survey',

    content:
      'We value your opinion. Please take a moment to complete our survey.',

    type: 'surveys',

    // type code here for "relation_one" field
  },

  {
    title: 'Feature Request Feedback',

    content:
      'Let us know what features you would like to see in future updates.',

    type: 'surveys',

    // type code here for "relation_one" field
  },

  {
    title: 'Support Experience Survey',

    content:
      'How was your recent support experience? Please share your thoughts.',

    type: 'customer_feedback',

    // type code here for "relation_one" field
  },

  {
    title: 'Website Usability Feedback',

    content: 'Help us improve our website by providing your feedback.',

    type: 'customer_feedback',

    // type code here for "relation_one" field
  },
];

const KnowledgeBaseArticlesData = [
  {
    title: 'How to reset your password',

    content: 'Follow these steps to reset your password...',

    category: 'product_guides',

    // type code here for "relation_one" field
  },

  {
    title: 'Troubleshooting login issues',

    content: 'If you are facing login issues, try these solutions...',

    category: 'troubleshooting',

    // type code here for "relation_one" field
  },

  {
    title: 'Getting started with our product',

    content: 'Here is a guide to get you started...',

    category: 'best_practices',

    // type code here for "relation_one" field
  },

  {
    title: 'Best practices for data security',

    content: 'Follow these best practices to ensure data security...',

    category: 'faqs',

    // type code here for "relation_one" field
  },

  {
    title: 'Understanding your account settings',

    content: 'Learn how to manage your account settings...',

    category: 'product_guides',

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'TechCorp',

    description: 'Leading technology solutions provider.',
  },

  {
    name: 'HealthPlus',

    description: 'Innovative healthcare services.',
  },

  {
    name: 'EduWorld',

    description: 'Global education platform.',
  },

  {
    name: 'FinServe',

    description: 'Financial services and consulting.',
  },

  {
    name: 'RetailHub',

    description: 'Comprehensive retail solutions.',
  },
];

const SupportTicketsData = [
  {
    title: 'Unable to login',

    description: 'I am unable to login to my account.',

    status: 'resolved',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "files" field

    comments: 'Heike Kamerlingh Onnes',
  },

  {
    title: 'Software installation issue',

    description: 'Facing issues while installing the software.',

    status: 'resolved',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "files" field

    comments: 'Albrecht von Haller',
  },

  {
    title: 'Payment not processed',

    description: 'My payment did not go through.',

    status: 'closed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "files" field

    comments: 'Emil Fischer',
  },

  {
    title: 'Feature request',

    description: 'Requesting a new feature for the product.',

    status: 'in_progress',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "files" field

    comments: 'Ludwig Boltzmann',
  },

  {
    title: 'Account suspension',

    description: 'My account has been suspended without notice.',

    status: 'closed',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "files" field

    comments: 'John von Neumann',
  },
];

const TrainingAndTutorialsData = [
  {
    title: 'Introduction to Our Product',

    description: 'A video tutorial to get you started with our product.',

    type: 'e_learning_courses',

    start_date: new Date('2023-10-10T10:00:00Z'),

    end_date: new Date('2023-10-10T11:00:00Z'),
  },

  {
    title: 'Advanced Features Webinar',

    description: 'Join our webinar to learn about advanced features.',

    type: 'video_tutorials',

    start_date: new Date('2023-10-15T14:00:00Z'),

    end_date: new Date('2023-10-15T15:30:00Z'),
  },

  {
    title: 'Hands-on Workshop',

    description: 'Register for our hands-on workshop to enhance your skills.',

    type: 'e_learning_courses',

    start_date: new Date('2023-10-20T09:00:00Z'),

    end_date: new Date('2023-10-20T12:00:00Z'),
  },

  {
    title: 'E-learning Course on Data Security',

    description: 'Enroll in our self-paced e-learning course on data security.',

    type: 'e_learning_courses',

    start_date: new Date('2023-10-01T00:00:00Z'),

    end_date: new Date('2023-12-31T23:59:59Z'),
  },

  {
    title: 'Product Update Webinar',

    description: 'Learn about the latest updates to our product.',

    type: 'workshops',

    start_date: new Date('2023-10-25T16:00:00Z'),

    end_date: new Date('2023-10-25T17:00:00Z'),
  },
];

const SettingsData = [
  {
    Database_user: 'Alfred Kinsey',

    Database_Password: 'Tycho Brahe',

    Database_Port: 'John Bardeen',

    Databose_Host: 'Charles Lyell',
  },

  {
    Database_user: 'Michael Faraday',

    Database_Password: 'Frederick Sanger',

    Database_Port: 'Thomas Hunt Morgan',

    Databose_Host: 'Paul Dirac',
  },

  {
    Database_user: 'William Herschel',

    Database_Password: 'Max Born',

    Database_Port: 'Rudolf Virchow',

    Databose_Host: 'Ernest Rutherford',
  },

  {
    Database_user: 'Nicolaus Copernicus',

    Database_Password: 'Marcello Malpighi',

    Database_Port: 'Marie Curie',

    Databose_Host: 'Albert Einstein',
  },

  {
    Database_user: 'Thomas Hunt Morgan',

    Database_Password: 'Isaac Newton',

    Database_Port: 'Edwin Hubble',

    Databose_Host: 'Paul Dirac',
  },
];

const MailData = [{}, {}, {}, {}, {}];

// Similar logic for "relation_many"

async function associateCommunityForumPostWithAuthor() {
  const relatedAuthor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost0 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CommunityForumPost0?.setAuthor) {
    await CommunityForumPost0.setAuthor(relatedAuthor0);
  }

  const relatedAuthor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost1 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CommunityForumPost1?.setAuthor) {
    await CommunityForumPost1.setAuthor(relatedAuthor1);
  }

  const relatedAuthor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost2 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CommunityForumPost2?.setAuthor) {
    await CommunityForumPost2.setAuthor(relatedAuthor2);
  }

  const relatedAuthor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost3 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CommunityForumPost3?.setAuthor) {
    await CommunityForumPost3.setAuthor(relatedAuthor3);
  }

  const relatedAuthor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost4 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CommunityForumPost4?.setAuthor) {
    await CommunityForumPost4.setAuthor(relatedAuthor4);
  }
}

async function associateCommunityForumPostWithModerator() {
  const relatedModerator0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost0 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CommunityForumPost0?.setModerator) {
    await CommunityForumPost0.setModerator(relatedModerator0);
  }

  const relatedModerator1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost1 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CommunityForumPost1?.setModerator) {
    await CommunityForumPost1.setModerator(relatedModerator1);
  }

  const relatedModerator2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost2 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CommunityForumPost2?.setModerator) {
    await CommunityForumPost2.setModerator(relatedModerator2);
  }

  const relatedModerator3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost3 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (CommunityForumPost3?.setModerator) {
    await CommunityForumPost3.setModerator(relatedModerator3);
  }

  const relatedModerator4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const CommunityForumPost4 = await CommunityForumPosts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (CommunityForumPost4?.setModerator) {
    await CommunityForumPost4.setModerator(relatedModerator4);
  }
}

async function associateFeedbackAndSurveyWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const FeedbackAndSurvey0 = await FeedbackAndSurveys.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (FeedbackAndSurvey0?.setCustomer) {
    await FeedbackAndSurvey0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const FeedbackAndSurvey1 = await FeedbackAndSurveys.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (FeedbackAndSurvey1?.setCustomer) {
    await FeedbackAndSurvey1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const FeedbackAndSurvey2 = await FeedbackAndSurveys.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (FeedbackAndSurvey2?.setCustomer) {
    await FeedbackAndSurvey2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const FeedbackAndSurvey3 = await FeedbackAndSurveys.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (FeedbackAndSurvey3?.setCustomer) {
    await FeedbackAndSurvey3.setCustomer(relatedCustomer3);
  }

  const relatedCustomer4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const FeedbackAndSurvey4 = await FeedbackAndSurveys.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (FeedbackAndSurvey4?.setCustomer) {
    await FeedbackAndSurvey4.setCustomer(relatedCustomer4);
  }
}

async function associateKnowledgeBaseArticleWithAuthor() {
  const relatedAuthor0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const KnowledgeBaseArticle0 = await KnowledgeBaseArticles.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (KnowledgeBaseArticle0?.setAuthor) {
    await KnowledgeBaseArticle0.setAuthor(relatedAuthor0);
  }

  const relatedAuthor1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const KnowledgeBaseArticle1 = await KnowledgeBaseArticles.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (KnowledgeBaseArticle1?.setAuthor) {
    await KnowledgeBaseArticle1.setAuthor(relatedAuthor1);
  }

  const relatedAuthor2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const KnowledgeBaseArticle2 = await KnowledgeBaseArticles.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (KnowledgeBaseArticle2?.setAuthor) {
    await KnowledgeBaseArticle2.setAuthor(relatedAuthor2);
  }

  const relatedAuthor3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const KnowledgeBaseArticle3 = await KnowledgeBaseArticles.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (KnowledgeBaseArticle3?.setAuthor) {
    await KnowledgeBaseArticle3.setAuthor(relatedAuthor3);
  }

  const relatedAuthor4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const KnowledgeBaseArticle4 = await KnowledgeBaseArticles.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (KnowledgeBaseArticle4?.setAuthor) {
    await KnowledgeBaseArticle4.setAuthor(relatedAuthor4);
  }
}

async function associateSupportTicketWithCustomer() {
  const relatedCustomer0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket0 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SupportTicket0?.setCustomer) {
    await SupportTicket0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket1 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SupportTicket1?.setCustomer) {
    await SupportTicket1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket2 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SupportTicket2?.setCustomer) {
    await SupportTicket2.setCustomer(relatedCustomer2);
  }

  const relatedCustomer3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket3 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (SupportTicket3?.setCustomer) {
    await SupportTicket3.setCustomer(relatedCustomer3);
  }

  const relatedCustomer4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket4 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (SupportTicket4?.setCustomer) {
    await SupportTicket4.setCustomer(relatedCustomer4);
  }
}

async function associateSupportTicketWithAssigned_agent() {
  const relatedAssigned_agent0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket0 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SupportTicket0?.setAssigned_agent) {
    await SupportTicket0.setAssigned_agent(relatedAssigned_agent0);
  }

  const relatedAssigned_agent1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket1 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SupportTicket1?.setAssigned_agent) {
    await SupportTicket1.setAssigned_agent(relatedAssigned_agent1);
  }

  const relatedAssigned_agent2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket2 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SupportTicket2?.setAssigned_agent) {
    await SupportTicket2.setAssigned_agent(relatedAssigned_agent2);
  }

  const relatedAssigned_agent3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket3 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (SupportTicket3?.setAssigned_agent) {
    await SupportTicket3.setAssigned_agent(relatedAssigned_agent3);
  }

  const relatedAssigned_agent4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const SupportTicket4 = await SupportTickets.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (SupportTicket4?.setAssigned_agent) {
    await SupportTicket4.setAssigned_agent(relatedAssigned_agent4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await CommunityForumPosts.bulkCreate(CommunityForumPostsData);

    await Downloads.bulkCreate(DownloadsData);

    await FeedbackAndSurveys.bulkCreate(FeedbackAndSurveysData);

    await KnowledgeBaseArticles.bulkCreate(KnowledgeBaseArticlesData);

    await Organizations.bulkCreate(OrganizationsData);

    await SupportTickets.bulkCreate(SupportTicketsData);

    await TrainingAndTutorials.bulkCreate(TrainingAndTutorialsData);

    await Settings.bulkCreate(SettingsData);

    await Mail.bulkCreate(MailData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCommunityForumPostWithAuthor(),

      await associateCommunityForumPostWithModerator(),

      await associateFeedbackAndSurveyWithCustomer(),

      await associateKnowledgeBaseArticleWithAuthor(),

      await associateSupportTicketWithCustomer(),

      await associateSupportTicketWithAssigned_agent(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('community_forum_posts', null, {});

    await queryInterface.bulkDelete('downloads', null, {});

    await queryInterface.bulkDelete('feedback_and_surveys', null, {});

    await queryInterface.bulkDelete('knowledge_base_articles', null, {});

    await queryInterface.bulkDelete('organizations', null, {});

    await queryInterface.bulkDelete('support_tickets', null, {});

    await queryInterface.bulkDelete('training_and_tutorials', null, {});

    await queryInterface.bulkDelete('settings', null, {});

    await queryInterface.bulkDelete('mail', null, {});
  },
};
