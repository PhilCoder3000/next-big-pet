import { gql } from 'graphql-request';
import React from 'react';
import { useGraphQL } from '../../src/helpers/graphql/useGraphQL';
import { BaseButton } from '../../src/shared/buttons/BaseButton';
import { BaseTextField } from '../../src/shared/fields/BaseTextField';
import { useForm } from '../../src/shared/hooks/useForm';

interface WriteProps {
  uuid?: string;
}

type Value = {
  title: string;
  content: string;
};

export default function Write({ uuid }: WriteProps) {
  const { request, data, isLoading } = useGraphQL();

  const onSubmit = (value: Value) => {
    const { title, content } = value;
    request(
      gql`
        mutation ($data: PostCreateInput!) {
          createPost(data: $data) {
            id
            title
          }
        }
      `,
      {
        data: {
          title,
          content,
          author: {
            connect: {
              id: 'cld5tcrk80000csyohpgos9o8',
            },
          },
        },
      },
    );
  };

  const { value, changeHandler, submitHandler } = useForm(
    {
      title: '',
      content: '',
    },
    onSubmit,
  );

  return (
    <div className="flex flex-col">
      <BaseTextField
        className="mb-5"
        value={value.title}
        onChange={changeHandler}
        name="title"
      />
      <BaseTextField
        className="mb-5"
        value={value.content}
        onChange={changeHandler}
        name="content"
      />
      <BaseButton onClick={submitHandler}>Create</BaseButton>
    </div>
  );
}
