import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            user:JwtPayload,
            files: {
                certificateFile: Express.Multer.File[];
              };
        }
    }
}