import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash/debounce';

export function useDebouncedQuery(schema) {
  const [doQuery, { ...rest }] = useLazyQuery(schema);

  const query = useCallback(debounce(doQuery, 1000), []);

  return [
    query,
    {
      ...rest
    }
  ];
}
