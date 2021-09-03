const { gql } = require("graphql-request");

const READ_NOTIFICATION = gql`
  mutation ReadNotification($notificationId: ID!) {
    updateNotification(
      input: { where: { id: $notificationId }, data: { is_read: true } }
    ) {
      notification {
        id
      }
    }
  }
`;

module.exports = READ_NOTIFICATION;
