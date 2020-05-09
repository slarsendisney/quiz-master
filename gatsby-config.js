const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `QuizMaster`,
    description: `Lets get quizzing`,
    author: `@sld, @mbp`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/quiz.png`,
      },
    },
  ],
};
