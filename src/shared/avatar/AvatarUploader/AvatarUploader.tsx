import React, { useRef, useState } from 'react';
import { classes } from '../../../helpers/style/classes';
import Image from 'next/image';

type Avatar = {
  avatar: File;
  url: string;
};

export function AvatarUploader() {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAvatar({
        avatar: file,
        url: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div
      className={classes(
        'h-40 w-40 border rounded-full border-light-primary dark:border-dark-primary cursor-pointer bg-cover',
      )}
      onClick={() => inputRef.current?.click()}
    >
      {avatar ? (
        <Image
          src={avatar.url}
          height={100}
          width={100}
          alt='avatar'
        />
      ) : (
        <input
          ref={inputRef}
          type="file"
          onChange={changeHandler}
          accept="image/*"
          className="hidden"
        />
      )}
    </div>
  );
}
