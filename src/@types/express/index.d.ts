import 'express-fileupload';
import { UploadedFile } from 'express-fileupload';

declare module 'express-serve-static-core' {
  interface Request {
    user_id: string;
    files: {
      [fieldname: string]: UploadedFile | UploadedFile[];
    };
  }
}
