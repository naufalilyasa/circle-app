export const convertImageToWebp = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (!reader.result) return reject("Failed to read image");
      img.src = reader.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Failed to get canvas context");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Conversion to WebP failed");
          const webpFile = new File(
            [blob],
            file.name.replace(/\.\w+$/, ".webp"),
            {
              type: "image/webp",
            }
          );
          resolve(webpFile);
        },
        "image/webp",
        0.8 // quality (0–1)
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
