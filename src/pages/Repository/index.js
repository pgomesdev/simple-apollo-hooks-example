import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { Container, IssueList, Label, Owner } from './styles';

const GET_REPOSITORY_INFO = gql`
  query GET_REPOSITORY_INFO($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      nameWithOwner
      description
      owner {
        login
        avatarUrl
      }
      issues(last: 5) {
        nodes {
          id
          title
          url
          author {
            avatarUrl
            login
          }
          labels(first: 5) {
            nodes {
              id
              color
              name
            }
          }
        }
      }
    }
  }
`;

export default function Repository({ match }) {
  const repoName = decodeURIComponent(match.params.repository);
  const [owner, name] = repoName.split('/');
  const {
    loading,
    error,
    data: { repository }
  } = useQuery(GET_REPOSITORY_INFO, {
    variables: { owner, name }
  });

  if (loading) {
    return (
      <Container>
        <h1>Loading</h1>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1>Error</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar à listagem</Link>
        <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
        <h1>{repository.nameWithOwner}</h1>
        <p>{repository.description}</p>
      </Owner>
      <IssueList>
        {repository.issues.nodes.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.author.avatarUrl} alt={issue.author.login} />
            <div>
              <strong>
                <a href={issue.url}>{issue.title}</a>
                {issue.labels.nodes.map(label => (
                  <Label key={String(label.id)} color={label.color}>
                    {label.name}
                  </Label>
                ))}
              </strong>
              <p>{issue.author.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}
