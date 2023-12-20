const decodeToken = (token) => {
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const decodedPayload = JSON.parse(
        Buffer.from(parts[1], 'base64').toString('utf-8')
      );
      return decodedPayload;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

export default decodeToken;
