import React, { useCallback } from "react";

interface AsyncImageProps {
  loadingView?: React.ReactNode;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const AsyncImage = (props: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);

  const handleLoad = useCallback(async () => {
    // simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoadedSrc(props?.imageProps?.src as string);
  }, [props.imageProps?.src]);

  React.useEffect(() => {
    setLoadedSrc(null);
    if (props.imageProps?.src) {
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.imageProps.src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.imageProps?.src, handleLoad]);

  if (loadedSrc === props.imageProps?.src) {
    return <img {...props.imageProps} />;
  }

  return props.loadingView || null;
};

export default AsyncImage;
