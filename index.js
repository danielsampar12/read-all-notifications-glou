require("dotenv").config();

const { GraphQLClient } = require("graphql-request");

const GET_NOTIFICATIONS_WITH_NULL_READ = require("./graphql/getNotificationsWithNullRead");
const READ_NOTIFICATION = require("./graphql/readNotifications");

const graphQLClient = new GraphQLClient(
  `https://glou-homolog.herokuapp.com/graphql`,
  {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  }
);

async function readAllNotifications() {
  try {
    const response = await graphQLClient.request(
      GET_NOTIFICATIONS_WITH_NULL_READ
    );

    const parsedResponse = JSON.parse(JSON.stringify(response, undefined, 2));

    if (!parsedResponse.notifications.length) return;

    const notifications = parsedResponse.notifications;

    for (notification of notifications) {
      const variables = {
        notificationId: notification.id,
      };

      const readResponse = await graphQLClient.request(
        READ_NOTIFICATION,
        variables
      );

      console.log(
        `Notification #${readResponse.updateNotification.notification.id} read`
      );
    }

    readAllNotifications();
  } catch (error) {
    console.log(error);
  }
}

readAllNotifications();
