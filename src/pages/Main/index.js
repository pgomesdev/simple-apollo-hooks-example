import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useDebouncedQuery } from '../../services/useDebouncedQuery';

import { Container, Form, SubmitButton, List } from './styles';

const GET_REPOSITORY_NAME = gql`
  query GET_REPOSITORY_NAME($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      nameWithOwner
    }
  }
`;

export default function Main() {
  const [repository, setRepository] = useState('');
  const [repositories, setRepositories] = useState([]);
    const [getRepositoryName, { data, loading, error }] = useDebouncedQuery(
      GET_REPOSITORY_NAME
    );

    useEffect(() => {
      if (data && data.repository && !loading) {
        setRepositories(repos => {
          if (repos.findIndex(r => r.id === data.repository.id) > -1) {
            return repos;
          }

          return [...repos, data.repository];
        });

        setRepository('');
      }
    }, [data, loading]);

  async function handleSubmit(e) {
    e.preventDefault();

    const [owner, name] = repository.split('/');

    getRepositoryName({
      variables: { name, owner }
    });
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt /> Type the owner and repository name
      </h1>
      <Form onSubmit={handleSubmit} error={error}>
        <input
          type="text"
          name="repo"
          placeholder="Type here"
          value={repository}
          onChange={e => setRepository(e.target.value)}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {!loading ? (
            <FaPlus color="#FFF" size={14} />
          ) : (
            <FaSpinner color="#fff" />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.nameWithOwner}</span>
            <Link
              to={`/repository/${encodeURIComponent(repository.nameWithOwner)}`}
            >
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
