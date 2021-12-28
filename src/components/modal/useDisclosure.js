import * as React from 'react';

export const useDisclosure = isDefaultOpen => {
  const [isOpen, setOpen] = React.useState(isDefaultOpen);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { isOpen, onOpen, onClose };
};
