import { ClientError, RequestDocument, Variables } from 'graphql-request';
import { useCallback, useEffect, useRef, useState } from 'react';
import { graphqlClient } from './client';

const cache = new Map<RequestDocument, Object>();

export function useGraphQL<T>() {
  const abortControllerRef = useRef(new AbortController());

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | ClientError>(null);

  const request = useCallback(
    async (document: string, variables?: Variables) => {
      const inCache = cache.get(document);
      if (inCache) {
        setData(inCache as T);
      } else {
        setLoading(true);
        try {
          const response = await graphqlClient.request({
            document,
            signal: abortControllerRef.current.signal,
            variables,
          });
          setData(response);
          cache.set(document, response);
        } catch (error) {
          setError(error as ClientError);
        } finally {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => () => abortControllerRef.current.abort(), []);

  return { request, data, error, isLoading, setLoading };
}
