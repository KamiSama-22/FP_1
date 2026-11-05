import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-cust.dto.js';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}