import { ClientError, RequestDocument, Variables } from 'graphql-request';
import { useCallback, useEffect, useRef, useState } from 'react';
import { graphqlClient } from './client';

const cache = new Map<RequestDocument, Object>();

type UseGraphQLProps<T> = {
  setData?: (data: T) => void;
  setLoading?: (arg: boolean) => void;
  cacheExpiresSec?: number;
};

export function useGraphQL<T>(props?: UseGraphQLProps<T>) {
  const abortControllerRef = useRef(new AbortController());

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<null | ClientError>(null);

  const changeDataHandler = useCallback((data: T) => {
    if (props && props.setData) {
      props.setData(data);
    } else {
      setData(data);
    }
  }, [props]);

  const setLoadingHandler = useCallback((isLoading: boolean) => {
    if (props && props.setLoading) {
      props.setLoading(isLoading);
    } else {
      setLoading(isLoading);
    }
  }, [props]);

  const request = useCallback(
    async (document: string, variables?: Variables) => {
      if (cache.has(document)) {
        changeDataHandler(cache.get(document) as T);
      } else {
        setLoadingHandler(true);
        try {
          const response = await graphqlClient.request({
            document,
            signal: abortControllerRef.current.signal,
            variables,
          });
          changeDataHandler(response);
          cache.set(document, response);
        } catch (error) {
          setError(error as ClientError);
        } finally {
          setLoadingHandler(false);
        }
      }
    },
    [changeDataHandler, setLoadingHandler],
  );

  useEffect(() => () => abortControllerRef.current.abort(), []);

  return { request, data, error, isLoading, setLoading };
}
