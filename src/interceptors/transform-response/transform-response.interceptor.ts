import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// definisikan formatnya terlebih dahulu
export interface StandardResponse<T>{
  success: boolean,
  message: string,
  statusCode: number,
  data: T
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {
    // update context
    const httpContext = context.switchToHttp()
    const response = httpContext.getResponse()
    const currentStatusCode = response.statusCode

    return next.handle().pipe(
      map((originalData: T) => ({
        success: true,
        message: 'success',
        statusCode: currentStatusCode,
        data: originalData
      }))
    );
  }
}
