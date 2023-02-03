import { ClientError, Variables } from 'graphql-request';
import { useCallback, useEffect, useRef, useState } from 'react';
import { graphqlClient } from './client';

export function useGraphQL<T>() {
  const abortControllerRef = useRef(new AbortController());
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | ClientError>(null);

  const request = useCallback(
    async (
      document: string,
      variables?: Variables,
    ): Promise<T | ClientError> => {
      setLoading(true);
      try {
        const response = await graphqlClient.request({
          document,
          signal: abortControllerRef.current.signal,
          variables,
        });
        return response;
      } catch (error) {
        setError(error as ClientError);
        return error as ClientError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => () => abortControllerRef.current.abort(), []);

  return { request, error, isLoading, setLoading };
}
