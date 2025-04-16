const response = (statusCode, data, message, res, metadata = {}) => {
  res.status(statusCode).json({
    message,
    metadata: {
      prev: metadata.prev || "",
      next: metadata.next || "",
      current: metadata.current || "",
      totalPages: metadata.totalPages || 0,
      totalRecords: metadata.totalRecords || 0,
    },
    payload: data,
  });
};

export default response;
