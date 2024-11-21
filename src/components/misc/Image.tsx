const Image = ({
  src,
  alt,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  className: string | undefined;
  onClick?: () => void;
}) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
    />
  );
};

export default Image;
