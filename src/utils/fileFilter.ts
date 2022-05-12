export const imageFileFilter = (req: any, file: any, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(new Error('Only pdf files allowed!'), false);
  }
  callback(null, true);
};
