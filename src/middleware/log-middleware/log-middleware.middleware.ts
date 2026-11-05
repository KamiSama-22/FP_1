import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddlewareMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const useragent = req.get('user-agent') || 'tidak diketahui';
    const starttime = Date.now();

    // jika sudah selesai
    res.on('finish', () => {
      // status code, berhasil atau tidak
      const { statusCode } = res;

      // durasi
      const duration = Date.now() - starttime;

      // tentukan pesannya
      const logmessage = `
      [
        ${method}
        ${originalUrl}
        --
        Status : ${statusCode}
        --
        Durasi : ${duration}
        --
        IP address : ${ip}
        --
        Agent : ${useragent}
      ]
      `
      
      if(statusCode >= 500){
        this.logger.error(logmessage);
      } else if (statusCode >= 400){
        this.logger.warn(logmessage)
      }else{
        this.logger.log(logmessage)
      }
    });

    next();
  }
}
