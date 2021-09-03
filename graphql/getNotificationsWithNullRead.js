const { gql } = require("graphql-request");

const GET_NOTIFICATIONS_WITH_NULL_READ = gql`
  query {
    notifications(where: { is_read_null: true }) {
      id
    }
  }
`;

module.exports = GET_NOTIFICATIONS_WITH_NULL_READ;
