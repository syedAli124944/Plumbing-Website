import { IsString, IsEmail, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ServiceType } from '../../appointments/dto/appointment.dto';

const SERVICE_TYPES: ServiceType[] = ['EMERGENCY', 'DRAIN_CLEANING', 'WATER_HEATER', 'LEAK_DETECTION', 'TOILET_REPAIR', 'SEWER_LINE', 'PIPE_REPLACEMENT', 'COMMERCIAL', 'OTHER'];

export class CreateQuoteDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty() @IsEmail() email!: string;
  @ApiProperty() @IsString() phone!: string;
  @ApiProperty() @IsString() address!: string;
  @ApiProperty({ enum: SERVICE_TYPES }) @IsEnum(SERVICE_TYPES) serviceType!: ServiceType;
  @ApiPropertyOptional() @IsOptional() @IsDateString() preferredDate?: string;
  @ApiProperty() @IsString() description!: string;
}
