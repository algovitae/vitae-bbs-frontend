import {gql} from '@apollo/client';

const appQuery = gql`
  query App {
      app {
        title,
        maintainer,
        user_title_label  
      }
    }
`;
