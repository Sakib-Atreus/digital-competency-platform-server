import { TErrorSource } from '../constants';

const duplicateErrorHandler = (err: any) => {
  const match = err.errorResponse.errmsg.match(/"([^"]*)"/);
  const errorMessage = match ? match[1] : 'No match found';

  const statuscode = 400;
  const message = 'duplicate entry error';
  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${errorMessage} already exist`,
    },
  ];
  return {
    statuscode,
    message,
    errorSource,
  };
};

export default duplicateErrorHandler;
